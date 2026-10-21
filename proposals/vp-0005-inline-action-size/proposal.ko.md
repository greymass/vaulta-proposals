---
lang: ko
source: 81a622c9b4d735435dc4e657864f0d1f5407e7d3
translator: Claude (agent translation)
msigs:
    - step: 1
      title: max_inline_action_size를 1,048,576바이트로 설정하고 나머지 체인 파라미터는 모두 현재 값으로 유지
---

# 인라인 액션 크기 제한 상향

[English](proposal.md) | [한국어](proposal.ko.md) | [中文](proposal.zh.md)

## 요약

MSIG는 코드가 약 512 KB 미만일 때에만 컨트랙트를 업그레이드할 수 있으며, 이는 계정 자체의 키로 배포할 수 있는 크기의 절반입니다. 이 제안은 그 제한을 1 MB로 상향합니다. 이를 통해 현재 제한보다 16,620바이트 작은 EOS EVM 런타임처럼 거버넌스만 업그레이드할 수 있는 컨트랙트도 키 보유자가 배포할 수 있는 모든 크기로 업그레이드할 수 있습니다.

프로듀서에게는 하나의 MSIG, `vp5setparams`의 승인을 요청합니다. 이 MSIG는 `eosio::setparams`를 호출하여 체인 파라미터 `max_inline_action_size`를 524,287바이트에서 1,048,576바이트로 상향하고, 나머지 16개 파라미터는 현재 값으로 다시 제출합니다. MSIG는 승인된 각 액션을 인라인 액션으로 실행하며, Spring은 코드가 524,238바이트를 넘는 인라인 `setcode`를 거부합니다. Spring tester 실행에서 994,058바이트의 MSIG `setcode`는 현재 값에서 실패하고, 이 제안의 `setparams`가 `eosio.msig`를 통해 실행된 후에는 실행됩니다. Jungle 4에서는 제안된 값에서 MSIG가 765,700바이트의 `setcode`를 실행했습니다. 이 변경은 MSIG가 실행되는 시점에 적용되며 노드 업그레이드나 프로토콜 기능이 필요하지 않습니다.

## 근거

`eosio.msig::exec`가 승인된 제안을 실행할 때, 제안된 모든 액션을 인라인으로 전송합니다. Spring의 `send_inline`은 패킹된 액션 데이터가 `max_inline_action_size`보다 작을 때에만 이를 수락합니다([`transaction.cpp`](https://github.com/AntelopeIO/spring/blob/04bdb089edc7e3c3f954e0aab4a7f3cb48635788/libraries/chain/webassembly/transaction.cpp#L6-L13)). 패킹된 `setcode` 액션은 담고 있는 코드보다 49바이트 크므로, 524,287에서 MSIG가 배포할 수 있는 가장 큰 코드는 524,238바이트입니다. 계정의 키는 최상위 액션으로 코드를 배포하며, Spring은 이를 압축된 트랜잭션에 대한 `max_transaction_net_usage`와 압축 해제 시의 1 MiB 제한으로 제한합니다([`transaction.cpp`](https://github.com/AntelopeIO/spring/blob/04bdb089edc7e3c3f954e0aab4a7f3cb48635788/libraries/chain/transaction.cpp#L210)). 따라서 키로는 약 1 MiB까지의 코드를 배포할 수 있습니다. 두 크기 사이에 있는 컨트랙트는 자신의 키로는 업그레이드할 수 있지만, `eosio.msig`, `eosio.wrap` 또는 다른 컨트랙트를 통해 작동하는 어떤 수단으로도 업그레이드할 수 없습니다.

가장 큰 영향을 받는 컨트랙트는 거버넌스만 업그레이드할 수 있는 컨트랙트입니다. `eosio`(409,053바이트)는 `eosio.prods`가 제어하고, `eosio.evm`(507,618바이트)은 `eosio`가 소유하며 그 active 권한은 `enf`와 다섯 프로듀서가 공유하므로, 두 컨트랙트 모두 MSIG를 통해서만 코드를 변경합니다. 크기는 2026-10-20에 EOS 메인넷에서 읽은 값입니다. EOS EVM 개발자들은 AntelopeIO/spring 이슈 1730에서 같은 제한을 제기했으며, 그중 한 명은 2025-07-17에 다음과 같이 썼습니다: "The evm runtime contract is closed to 512K uncompressed size. We need the increase the transaction limit and inline action size limit to 1MB (or something between 512K and 1 MB)." 해당 이슈는 더 큰 `max_transaction_net_usage`도 요청합니다. 이 제안은 인라인 제한만 상향하며, EVM 런타임의 배포 트랜잭션을 zlib으로 압축하면 이것으로 충분합니다.

이 격차는 Shipload의 게임 컨트랙트 `eon.shipload`에서 드러났으며, Jungle 4에 있는 그 994,058바이트 빌드가 재현 테스트에서 배포하는 코드입니다.

## 파라미터 변경

`vp5setparams`는 인용 액션 다음에 하나의 액션을 담습니다. `eosio@active`가 승인하는 `eosio::setparams`이며, `blockchain_parameters`의 17개 필드를 모두 담습니다. 16개는 2026-10-20에 읽은 EOS 메인넷 `eosio` `global` 테이블에서 복사한 값이고, `max_inline_action_size`는 524,287에서 1,048,576으로 변경됩니다. 이 액션은 선택적 필드인 `max_action_return_value_size`를 생략하며, 그 값은 256으로 유지됩니다.

새 값은 트랜잭션이 담을 수 있는 모든 `setcode`를 수용합니다. Spring은 제한보다 엄격히 작은 인라인 데이터만 수락하므로 1,048,576은 1,048,575바이트까지 허용하며, 압축 해제 시 1 MiB인 propose 트랜잭션에 들어가는 가장 큰 `setcode`는 1,048,426바이트의 코드를 담고, 패킹된 인라인 액션으로는 1,048,475바이트입니다.

키와의 동등성은 zlib으로 압축된 제안에서 성립합니다. Spring은 압축된 트랜잭션에 NET을 청구하므로, 약 512 KB를 넘는 코드를 담는 propose는 같은 코드를 키 보유자가 직접 `setcode`할 때와 마찬가지로 zlib으로 압축해야 합니다. cleos는 `--compression zlib`을 지정하지 않으면 트랜잭션을 압축하지 않고 전송합니다. 재현 테스트에서 994,058바이트 코드의 propose는 압축 시 약 307 KB이며, 압축하지 않은 994,208바이트에서는 `tx_net_usage_exceeded`로 실패합니다.

### 승인 전 MSIG 확인

`setparams`는 17개 필드를 모두 기록하므로, 다른 파라미터가 체인에서 변경된 후에 `vp5setparams`를 실행하면 그 변경이 되돌려집니다. 승인 또는 실행 전에 각 승인자는 이 저장소에서 `--broadcast` 없이 `bun run propose VP-0005 vp5setparams`를 실행합니다. 이 명령은 17개 파라미터의 현재 값과 제안 값을 출력하며, `max_inline_action_size` 이외의 필드가 다르면 실패합니다. 실패하는 동안 프로듀서는 `vp5setparams`를 실행하지 않으며, Greymass는 이를 취소하고 갱신된 값으로 다시 제안합니다.

## 기술 참고 사항

- **안전성**: Spring은 `max_inline_action_size`를 `send_inline`과 `send_context_free_inline`에서만 확인하고, 체인 파라미터를 검증할 때 이 값에 상한을 두지 않으므로, `setparams`는 프로토콜 기능이나 노드 업그레이드 없이 새 값을 적용합니다. 인라인 액션 데이터는 CPU로만 청구됩니다. 994,058바이트의 코드를 배포하는 exec는 120 NET을 청구합니다. 트랜잭션당 및 블록당 CPU 제한이 인라인 액션이 만들어 내는 트레이스, 히스토리 및 메모리의 양을 제한하며, 이 제안은 두 제한을 모두 변경하지 않습니다. 입력 액션은 이미 zlib을 통해 약 1 MiB에 도달하므로, 히스토리 및 트레이스 소비자는 이미 이 크기의 액션을 처리합니다. 이 크기의 인라인 액션이 처리 중일 때마다 노드의 최대 메모리 사용량은 약 1.5 MB 증가합니다.
- **재현 테스트**: [msig-setcode-repro.txt](assets/msig-setcode-repro.txt)에는 테스트 소스, CMake 프로젝트, 입력 해시, 명령 및 기록된 출력이 들어 있습니다. 테스트는 v1.2.2(커밋 `04bdb089edc7e3c3f954e0aab4a7f3cb48635788`)의 Spring tester에서 라이브 EOS 메인넷 `eosio.system`(SHA-256 `34cbdf2a9c41b0a182f235018753110ca2cdcdd4c274b17dd8b7ea9f444fd043`) 및 `eosio.msig` WASM과, 2026-10-20에 메인넷 `global`에서 읽은 17개 파라미터로 실행됩니다. 테스트는 Jungle 4 `eon.shipload` 코드(SHA-256 `e687392df235a1bd582f6ba56143b5a2399b070b45d67df7641fb511d7378c59`, 트랜잭션 `13e25df040fff5ca692db70b015582ae84e1fb7dbb48f29a132816f7e509a3df`에서 배포)의 `setcode`를 제안하고 그 exec가 실패함을 보입니다. 이어서 `vp5setparams`가 담는 68바이트(SHA-256 `0a08486aeca09d1075ecd9b2345132e9b1ddef0aef71d9d55e0f5955b20807f0`)를 그대로 담은 `eosio::setparams` 액션을 `eosio.msig`를 통해 제안하고 실행하며, `max_inline_action_size`가 1,048,576이고 나머지 16개 필드가 메인넷 값인지 확인합니다. 마지막으로 `setcode`를 실행한 다음, 제안 가능한 최대 크기로 패딩한 코드로 반복합니다. 각 exec가 성공한 후 배포된 코드 해시는 제안된 코드와 일치합니다.

CPU(마이크로초), x86_64 Linux 호스트에서 런타임별 1회 실행:

| 구분 | eos-vm | eos-vm-jit | eos-vm-oc |
| --- | --- | --- | --- |
| Propose, zlib, 994,058바이트 코드 | 50,367 | 11,379 | 8,034 |
| 524,287에서 exec | `inline_action_too_big` | `inline_action_too_big` | `inline_action_too_big` |
| `vp5setparams` 액션의 exec | 307 | 113 | 100 |
| 1,048,576에서 exec, 994,058바이트 | 150,000 초과 | 36,976 | 20,601 |
| 1,048,576에서 exec, 1,048,426바이트 | 150,000 초과 | 38,397 | 20,467 |
| 키로 직접 `setcode`, zlib, 994,058바이트 | 실행 안 함 | 25,393 | 20,620 |

모든 exec는 120 NET을 청구합니다. "150,000 초과"는 `setcode` 안에서 150 ms `max_transaction_cpu_usage`를 초과한 트랜잭션을 나타냅니다.

## 테스트넷 시연

Jungle 4 프로듀서들은 트랜잭션 `465454494c08feafbad77c972ca7ae13c53f93428b1d5221f562a0bc8facaf62`(블록 293,267,367, 2026-10-21)에서 `max_inline_action_size`를 1,048,576으로 상향했습니다. 이는 `eosio::setparams`의 `eosio.sudo::exec`이며, 그 데이터는 `vp5setparams`가 담는 68바이트와 바이트 단위로 동일합니다. 나머지 모든 파라미터와 `max_action_return_value_size`(256)는 값을 유지했습니다. 이 변경은 `eosio.sudo`를 통해 실행되었으므로, `eosio.msig`를 통한 `setparams` 실행의 근거는 재현 테스트입니다.

이어서 Greymass는 Jungle 4 계정 `box.shipload`를 `eosio.msig`를 통해 업그레이드했으며, 두 제안 모두 zlib으로 압축하여 전송했습니다. `setcode`는 765,700바이트의 코드(SHA-256 `9d88d0be6342549be707439c4f9367b2bb4b1feb54ce6bda9130abe06125e3a5`)를 담으며, 이는 524,238바이트 상한보다 241,462바이트 큽니다. 그 exec는 트랜잭션 `425375911d0a6da27401846bd61448ff2b29470053253705ccaa1054d5b68376`(블록 293,275,646)에서 32.7 ms의 CPU를 청구했습니다. 대응하는 `setabi`는 같은 블록의 트랜잭션 `836b4e574aa7a77469276a5b0ed011730aebb5dd92a9175eb85490d5bdb73921`에서 실행되었습니다. `box.shipload`의 코드 해시는 제안된 코드와 일치합니다.

## 이해관계 공개

이 제안은 Greymass가 작성했습니다. Greymass는 Shipload를 개발하며, 그 `eon.shipload` 컨트랙트는 현재 제한보다 크고 이 변경의 혜택을 받습니다. 2026-10-21 기준 Greymass는 상위 30개 프로듀서에 속하지 않으므로 `setparams` MSIG에 서명하지 않습니다.

## 미해결 질문

없음.

## 다음 단계

1. Greymass는 병합된 본문을 인용하여 `aaron@propose`에서 `vp5setparams`를 제안하고, 상위 30개 프로듀서에게 승인을 요청하며, 만료 기한은 180일 후로 설정합니다. 인용 다음의 유일한 액션은 `eosio::setparams`이며, `max_inline_action_size`는 1,048,576으로 설정되고 나머지 16개 필드는 변경되지 않습니다.
2. 프로듀서는 본문과 재현 테스트를 검토하고 승인 전 MSIG 확인의 절차를 실행한 다음 승인합니다. 21명 중 15명이 승인하면 누구나 이를 실행할 수 있습니다.
