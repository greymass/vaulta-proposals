---
lang: ko
source: 5b597a35ccc1b57ebd6eab2df426a388340c7895
---

# gift 컨트랙트 보안 검토

이 문서는 VP-0001이 RAM 기금을 보유하는 네트워크 소유 계정 `gift.vaulta`에 배포하는 `gift` 컨트랙트, 그리고 BP 8명에게 생성자별 중단 권한을, BP 11명에게 프로그램 전체 중단 권한을 부여하는 권한 설계에 대한 두 차례의 보안 검토 결과를 정리한 것입니다. 검토 작업은 Anthropic의 Claude Mythos, Fable 및 Opus가 수행했습니다. 이들은 문제를 발견하고, 각 문제를 테스트로 입증했으며, 모든 테스트를 다시 실행하여 각 발견 사항을 확인, 수정 또는 반박했습니다. 두 검토 모두 치명(critical) 또는 높음(high) 등급의 문제를 발견하지 않았습니다. 두 검토를 합쳐 중간 등급 2건, 낮음 등급 11건, 정보 등급 15건이 발견되었으며, 모든 항목은 제안서 본문, 시행 단계 또는 운영 규칙으로 해결되었거나, 이 문서에 제시된 사유와 함께 수용되었습니다. 중간 등급 두 건은 모두 권한 설계에 속합니다. 첫 번째는 시행 단계의 `limitauthchg` 단계로 해결되며, 두 번째는 BP 11명이 BP 8명에 대해 할 수 있는 일의 한계로서 제안서에 명시되어 있습니다. 요약 표를 먼저 읽고, 이어서 중간 등급 두 섹션을 읽으십시오.

## 검토 수행 주체

검토 작업은 가장 큰 세 Claude 모델이 수행했습니다. Claude Mythos, Fable 및 Opus는 발견자였습니다. 각 모델은 하나의 공격 관점을 맡아, 수정 전 코드에 대해 각 발견 사항을 입증하는 테스트를 작성했고, 테스트하지 않은 모든 단서를 후속 검토 단계로 넘겼습니다. Mythos는 각 라운드를 조율하고 발견 사항을 취합하는 역할도 맡았습니다. Fable과 Opus는 반박자였습니다. 각 모델은 발견 사항의 한 그룹을 맡아 모든 테스트를 다시 실행하고, 인용된 모든 코드 줄을 다시 읽고, 모든 비용을 다시 계산하여, 해당 발견 사항을 확인하거나 수정하거나 반박했습니다. Claude Sonnet은 실시간 체인 데이터를 수집하고, 본문이 제시하는 주장의 표를 작성하고, 기존 테스트 스위트를 다시 실행했습니다. Sonnet의 작업에만 근거한 발견 사항은 없습니다.

Greymass가 VP-0001과 gift 컨트랙트를 작성하고 두 검토를 모두 수행했으므로, 어느 검토도 작성자로부터 독립적이지 않습니다. BP들이 네트워크 자금으로 추가 검토를 지원하는 것을 환영하며, 어떤 팀이든 컨트랙트 소스를 검토할 수 있습니다.

## 검토 대상

| | 1라운드 | 2라운드 |
|---|---|---|
| 날짜 | 2026-10-17 | 2026-10-19 |
| 컨트랙트 커밋 | `a23b756` | `a9a9a59`, VP-0001이 그 코드를 고정함 |
| 이전 라운드 이후 컨트랙트 변경 사항 | | `suspend`, `resume`, 1,972바이트 쿼터 하한 |
| 권한 설계 | `disable`에 연결된 단일 비상(break-glass) 권한 | `disable` 및 `resume`에 연결된 21명 중 11명의 `halt`, `suspend`에 연결된 21명 중 8명의 `suspend`, 둘 다 `limitauthchg`로 제한됨 |
| 본문 | 제안서의 권한 설계 | 제안서 개정 4판, FAQ, 생성자 템플릿 및 그 README, 검토 시작 시점의 해시 기준으로 읽음 |
| 발견 사항을 입증하는 테스트 | 80개: 컨트랙트 에뮬레이터 32개, Spring C++ 테스터 48개 | 73개: 에뮬레이터 21개, Spring 테스터 52개 |
| 발견 사항 | 중간 1건, 낮음 7건, 정보 5건 | 중간 1건, 낮음 4건, 정보 10건 |

두 라운드 모두 Vaulta 메인넷이 실행하는 시스템 컨트랙트인 `VaultaFoundation/system-contracts`의 `9edc8bc`를 대상으로 Spring v1.0.5에서 수행되었습니다. 이 커밋의 컨트랙트 파일은 2025-07-15 Vaulta 전환 MSIG가 `eosio`에 배포한 릴리스 v3.10.0과 동일합니다. 2라운드에서는 실제 `eosio.msig`, `eosio.wrap` 및 `eosio.assert` 코드도 테스트했습니다. 고정된 빌드는 `gift.wasm` sha256 `27ed7ecee18f1a81ec7e9ed4aeacdd76de6e1431f66eb62d363067480ddd3072`(20,977바이트) 및 `gift.abi` sha256 `17d1ccd52f99782cee42a619dd02cd75c9567d1f716969334ec7f7cf7fbc07f8`이며, Antelope CDT 4.1.1로 `make build/gift/production`을 통해 빌드되었고, macOS와 Linux에서 동일한 바이트로 빌드됩니다.

`gift.vaulta` 계정은 메인넷에 존재하지 않으므로, 각 라운드는 제안서가 기술한 방식대로 Spring 테스트 체인에 이 계정을 구성했습니다. 즉 BP 21명 중 15명으로 설정된 `owner`와 `active`, 컨트랙트의 `eosio.code`를 포함하는 `active`, 해당 라운드 설계의 하위 권한들, 그리고 코드, ABI 및 `enable`입니다. 2라운드는 두 시행 MSIG를 그대로 사용하여 계정을 구성했습니다. 이 문서의 권한에 관한 모든 서술은 해당 체인에서 측정된 것입니다. 두 라운드 모두 계정 이름을 `ram.vaulta`로 사용했으며, VP-0001은 이후 이를 `gift.vaulta`로 변경했습니다. 컨트랙트는 실행 시점에 자신의 계정 이름을 읽으므로, 어떤 발견 사항도 이름에 의존하지 않습니다.

공격자는 임의의 일반 계정 집합, 단독으로 행동하는 등록된 생성자 하나, 또는 단독으로 행동하는 BP 하나입니다. BP 21명 중 15명, `eosio.wrap` 및 시스템 컨트랙트는 신뢰 대상입니다. `halt`와 `suspend`를 보유한 BP들은 제안서가 그들에게 명시한 범위까지 신뢰되므로, 두 그룹 중 어느 쪽에 대한 발견 사항이든 그 명시된 범위를 넘어 설계가 해당 그룹에 허용하는 행위를 보고합니다. 어떤 체인에도 아무것도 브로드캐스트하지 않았습니다. EOS 단위의 수치는 각 발견 사항의 라운드 날짜의 RAM 가격을 사용합니다. 2026-10-17에는 KiB당 0.346930 EOS, 2026-10-19에는 KiB당 0.346854 EOS입니다.

이 문서가 열거하는 본문 수정 사항은 2라운드가 개정 4판을 읽은 이후에 반영되었으므로, 아래에 인용된 문장은 제안서에 더 이상 나타나지 않을 수 있습니다.

## 요약

| Id | 제목 | 심각도 | 라운드 | 해결 방법 |
|---|---|---|---|---|
| M1 | BP 8명이 BP 11명에 맞서 생성자를 정지 상태로 유지할 수 있음 | 중간 | 2 | 제안서 본문 및 운영 규칙 |
| M2 | 중단 권한이 기금을 권한 객체에 묶어 둘 수 있음 | 중간 | 1 | 시행 단계(`limitauthchg`) |
| L1 | BP 8명이 프로그램이 활성화된 것으로 표시되는 상태에서 MSIG 하나로 모든 생성자를 중단할 수 있음 | 낮음 | 2 | 제안서 본문 |
| L2 | 승인된 `giftacct` MSIG 제안을 제3자가 자신의 키로 실행할 수 있음 | 낮음 | 2 | 제안서 본문 및 생성자 안내 |
| L3 | `binary_extension` 없이 테이블 필드를 추가하는 이후 업그레이드는 기존 행을 읽을 수 없게 만듦 | 낮음 | 2 | 운영 규칙 |
| L4 | 제안서가 후보가 아닌 커밋으로 컨트랙트 소스를 고정했음 | 낮음 | 2 | 제안서의 고정 |
| L5 | 중단 권한이 자신의 권한 구성과 연결을 다시 쓸 수 있음 | 낮음 | 1 | 시행 단계(`limitauthchg`) |
| L6 | 중단 권한 단독으로 서명한 중단은 스테이킹되지 않은 `gift.vaulta`에 청구됨 | 낮음 | 1 | 시행 단계(중단은 `eosio.msig`를 통해 실행) |
| L7 | 중단이 준비되는 동안의 노출이 본문에 기재된 것보다 쿼터 하나만큼 큼 | 낮음 | 1 | 제안서 본문 |
| L8 | `giftram`으로 `gift.vaulta`에 보낸 RAM은 묶임 | 낮음 | 1 | 제안서 본문 및 운영 규칙 |
| L9 | 기금은 계정 자체 사용량에서 끝나며, 그 시점에 `addcreator`가 실패함 | 낮음 | 1 | 제안서 본문 및 운영 규칙 |
| L10 | 프로그램 계정은 NET 또는 CPU 없이 시작함 | 낮음 | 1 | 제안서 본문 |
| L11 | `giftacct`가 인라인 액션으로 수락됨 | 낮음 | 1 | 설계로서 수용 |
| I1 | `setcode` 이전에 배치된 `enable`은 성공하지만 프로그램을 비활성 상태로 남김 | 정보 | 2 | 시행 빌더 |
| I2 | 비축된 `disable` 제안은 어떤 계정이든 실행하여 소진할 수 있음 | 정보 | 2 | 운영 규칙 |
| I3 | 한 트랜잭션에서 하나의 새 계정에 두 번 기증하면 생성자에게 과다 청구됨 | 정보 | 2 | 수용 |
| I4 | 계정의 출범 시 사용량은 216,918바이트이며, 약 200 KB로 기재되어 있었음 | 정보 | 2 | 제안서 본문 |
| I5 | 권한 변경은 `authorized_by`에 지정된 권한으로 승인되어야 함 | 정보 | 2 | 제안서 본문 |
| I6 | 트랜잭션 스캔은 체인의 트랜잭션 크기 상한에서 완료됨 | 정보 | 2 | 수용 |
| I7 | 시스템 컨트랙트는 기증당 두 번, 반환당 두 번 알림을 보냄 | 정보 | 2 | 수용 |
| I8 | 생성자 템플릿의 MSIG 명령이 드라이런을 출력했음 | 정보 | 2 | 생성자 템플릿 |
| I9 | 본문이 별도의 검토와 테스트 수를 출처 없이 인용했음 | 정보 | 2 | 이 문서 |
| I10 | 에뮬레이터 테스트 두 개가 체인이 거부하는 시퀀스에 대해 단언함 | 정보 | 2 | 수용(테스트 하네스) |
| I11 | 새 체인의 첫 기증은 쿼터가 계산하는 것보다 112바이트 더 청구함 | 정보 | 1 | 수용(테스트넷 한정) |
| I12 | 에뮬레이터 테스트는 컨트랙트 로직을 입증하고, 체인 관련 주장은 Spring 테스터에 근거함 | 정보 | 1 | 테스트 하네스 |
| I13 | 새 수증자의 리소스 행이 기증이 도달하기 전에 삭제될 수 있음 | 정보 | 1 | 수용 |
| I14 | `gift.vaulta`에 대한 관리형 RAM 한도는 한도를 잔액과 분리함 | 정보 | 1 | 운영 규칙 |
| I15 | `sellram`은 판매자의 토큰 잔액 행을 청구함 | 정보 | 1 | 수용 |

## 테스트 발췌

중간 등급 발견 사항과, 트랜잭션 시퀀스에서 비롯되는 낮음 등급 발견 사항에는 각각 이를 입증하는 Spring 테스터 케이스의 발췌가 포함됩니다. 각 발췌는 해당 동작을 보여 주는 단계만 남기고 설정 부분을 제거했으며, 테스트 이름을 명시합니다. 전체 테스트는 요청 시 Greymass에서 제공합니다. 발췌에서는 다음 헬퍼를 사용합니다.

- `enact()`는 투표를 받은 BP 21명과 함께 두 시행 MSIG로 `gift.vaulta`를 구성합니다.
- `propose(p, trx)`, `approve(p, n)` 및 `exec(p, account)`는 `eosio.msig` 제안 `p`를 제안하고, BP `n`명으로 승인하고, `account`에서 실행합니다.
- `pass(p, trx, n, first)`는 제안하고, `first`번 BP부터 시작하여 BP `n`명으로 승인한 뒤 실행합니다. `n`이 없으면 15를 사용합니다.
- `gp(halt)`, `gp(susp)` 및 `ga()`는 각각 `gift.vaulta@halt`, `gift.vaulta@suspend` 및 `gift.vaulta@active`입니다.
- `expect_fail(f, message)`는 `f`가 `message`와 함께 실패할 것을 요구합니다.
- `stranger`는 `gift.vaulta`에 대한 어떤 승인이나 권한도 보유하지 않은 계정입니다.
- `gift_trx(giftee, bytes)`는 생성자의 `giftee`에 대한 `newaccount`와 `bytes`에 대한 `giftacct`를 담은 하나의 트랜잭션입니다.
- 1라운드에서 `bg_push(...)`는 단일 비상 권한만으로 서명한 트랜잭션을 전송하고, `native(...)`는 네이티브 권한 액션을 구성합니다.

## 중간

### M1: BP 8명이 BP 11명에 맞서 생성자를 정지 상태로 유지할 수 있음

제안서는 `suspend`를 임의의 BP 8명에게, `resume`을 임의의 BP 11명에게 부여합니다. 2라운드는 제안서가 8명이 "11명이 재개에 동의할 때까지" 생성자를 정지 상태로 유지할 수 있으며 "한 소수 그룹이 다른 그룹의 정지를 되돌릴 수 없다"고 말하는 것으로 읽었습니다. 컨트랙트는 이미 정지된 생성자에 대한 `suspend`만 거부하며(`contracts/gift/src/gift.cpp:90`) 과거 정지 기록을 보관하지 않으므로, 어떤 `resume` 이후에도 같은 8명이 새로운 `suspend`를 승인하고 실행할 수 있습니다. 테스트 체인에서 새로운 `suspend`는 `resume`과 같은 트랜잭션에서 실행되었으므로, 분쟁 중인 생성자는 기증할 수 있는 블록을 한 번도 보지 못할 수 있습니다.

`eosio.msig`의 승인에는 자체 만료가 없으며, 제안은 실행이 실패해도 유지됩니다(`contracts/eosio.msig/src/eosio.msig.cpp:56`, `:223-237`). 따라서 BP 8명은 여러 개의 `suspend` 제안을 한 번에 승인해 둘 수 있으며, 각 `resume` 이후 어떤 계정이든 다음 제안을 실행합니다. 이러한 제안은 승인 이후에 등록된 생성자에게도 적용됩니다. 그 반대도 성립합니다. `resume` 제안을 비축해 둔 BP 11명은 모든 `suspend`를 되돌립니다.

분쟁 중인 정지 상태를 끝내려면 BP 21명 중 15명이 필요하며, 21명 중 어떤 15명이든 8명 중 최소 2명을 포함합니다. 지속적인 해결책은 `authorized_by`를 `active`로 설정하여 `suspend` 권한의 권한 구성 또는 임계값을 변경하는 것, 또는 투표자에 의한 BP 스케줄 변경으로, 그 이후 상위 21위에서 벗어난 승인자는 더 이상 집계되지 않습니다. Spring은 권한을 이름으로 식별하므로, 권한을 삭제하고 같은 이름으로 다시 생성하면 유지 중인 모든 제안이 되살아납니다. `eosio.wrap`을 통해 8명의 승인을 무효화하면 그들이 비축한 제안이 정리되며, 해당 BP들이 체인에서 보유한 다른 모든 승인도 무효가 됩니다.

기금의 바이트는 전혀 이동하지 않으며, 정지된 생성자는 여전히 자신의 계정을 위해 RAM을 구매할 수 있습니다. 8명이 거부하는 것은 생성자의 보조금입니다. 기본 쿼터 기준으로 하루 262,144바이트, 약 88.8 EOS입니다. 유지 중인 각 제안은 제안자에게 852바이트의 RAM 비용을 발생시키며, 이는 실행 또는 취소 시 반환됩니다.

```cpp
// SEC_2026_10_19_B6_eight_keep_a_creator_suspended_against_eleven
for (name pn : {"s1"_n, "s2"_n, "s3"_n, "s4"_n, "s5"_n}) {
   propose(pn, make_trx({suspend_act(c1, gp(susp))}, year));
   approve(pn, 8);                                     // eight approve five suspends once
}
exec("s1"_n, stranger);                                // suspended
expect_fail([&] { exec("s2"_n, stranger); }, "creator already suspended");
pass("r1"_n, make_trx({resume_act(c1, gp(halt))}), 11, 10);   // eleven resume
exec("s2"_n, stranger);                                // suspended again, no new approval
BOOST_REQUIRE(suspended(c1));

pass("unl"_n, make_trx({ula("suspend"_n, ga(), config::active_name)}));  // 15/21 unlinks suspend
pass("r3"_n, make_trx({resume_act(c1, gp(halt))}), 11, 10);
expect_fail([&] { exec("s4"_n, stranger); }, "transaction authorization failed");
BOOST_REQUIRE(!suspended(c1));                         // the hold ends at 15/21
```

해결 방법: 코드 변경 없이 제안서 본문 및 운영 규칙으로 해결. 제안서는 임의의 BP 8명이 추가 `suspend`를 계속 승인하는 한 정지가 지속되고, BP 11명의 `resume`은 다음 `suspend`까지만 유효하며, 두 그룹 간의 분쟁은 `suspend` 권한을 변경함으로써 21명 중 15명으로 해결된다고 명시합니다. 운영 규칙은 중단 MSIG에 짧은 만료 기간을 설정하고, `gift.vaulta`를 지정하는 유지 중인 제안이 있는지 `eosio.msig`를 감시하고, 하위 권한은 새 이름으로 폐기하며, `eosio.wrap` 무효화는 무효화된 BP들의 승인을 모든 곳에서 무효로 만드는 것으로 취급합니다. `suspend`와 `resume`에 생성자별 버전 번호를 두는 방안도 검토되었으나 기각되었습니다. 이 방안은 마지막 상태 변경 이전에 승인된 제안을 무효화할 뿐, 계속 승인하는 BP 8명에 대해서는 아무 효과가 없기 때문입니다.

### M2: 중단 권한이 기금을 권한 객체에 묶어 둘 수 있음

1라운드는 당시 설계에 있던 단일 비상 권한에 대해 이 문제를 발견했고, 2라운드는 수정 사항이 설계의 두 하위 권한인 `halt`와 `suspend` 모두에 대해 유효함을 확인했습니다. 연결(link)은 일반 액션에 필요한 권한을 제한합니다. 체인은 네이티브 권한 액션(`updateauth`, `deleteauth`, `linkauth`, `unlinkauth`)을 대신 권한 트리에 대해 검사하며, 권한은 자신의 하위에 자식 권한을 생성할 수 있습니다(Spring `libraries/chain/authorization_manager.cpp:341-347`). 체인은 새 권한의 객체와 그 권한 구성의 비용을 그 권한을 소유한 계정에 청구하므로(`libraries/chain/eosio_contract.cpp:315-323`), `disable`에만 연결된 중단 권한이라도 `gift.vaulta`가 비용을 부담하는 권한 객체를 생성할 수 있었습니다.

Spring 테스터에서 새 권한은 대기(wait) 항목당 `gift.vaulta`의 RAM 16바이트를 소비했고, 체인의 권한 구성 상한인 65,536개 항목에 이르는 `updateauth` 하나가 1,048,864바이트를 묶었으며, 1,000,000,000바이트의 초기 기금 전체를 약 950개의 이러한 트랜잭션으로 소진할 수 있었고, 체인의 블록 한도상 이는 약 95초 만에 가능합니다. RAM은 계정에 남아 있으며 누구도 이를 판매할 수 없습니다. BP 21명 중 15명이 불필요한 권한들을 삭제할 때까지, 즉 약 천 개의 `deleteauth` 액션이 실행될 때까지 모든 생성자의 기증이 실패하며, `enable`로는 이 묶임이 해소되지 않습니다. 영향은 프로그램 전체의 중단과, 정리될 때까지 약 338,800 EOS 상당의 RAM이 기증 불가능해지는 것입니다. 이 권한을 BP 한 명이 보유했다면 높음 등급이었을 것입니다. 설계가 두 하위 권한을 모두 BP 그룹에 부여하므로 중간 등급입니다.

```cpp
// SEC_2026_10_17_D2_breakglass_locks_endowment_ram_in_permissions
bg_push(native(bgp(), updateauth{gift, "junk1"_n, bg, waits_authority(30000, 1)}));
// ... repeated until gift.vaulta's RAM is used up
auto blocked = gift_trx("giftee111112"_n, 3000);
expect_fail([&] { push_transaction(blocked); }, "insufficient ram");
base_tester::push_action(gift, "enable"_n, gift, mvo());
expect_fail([&] { push_transaction(still); }, "insufficient ram");   // enable does not help

// SEC_2026_10_17_D2_fix_limitauthchg_confines_breakglass
base_tester::push_action(config::system_account_name, "limitauthchg"_n, gift,
   mvo()("account", gift)("allow_perms", vector<name>{"owner"_n, "active"_n})("disallow_perms", vector<name>{}));
expect_fail([&] { bg_push(native(bgp(), updateauth{gift, "junk1"_n, bg, authority(get_public_key(gift, "junk"))})); },
            "authorized_by is required");
bg_push(gift_act("disable"_n, {bgp()}));               // the stop itself still works
```

해결 방법: 시행 단계. `vp1deploy`의 마지막 권한 단계는 `eosio::limitauthchg(gift.vaulta, [owner, active], [])`입니다. 그 시점부터 `gift.vaulta`에 대한 모든 `updateauth`, `deleteauth`, `linkauth` 및 `unlinkauth`는 `owner` 또는 `active`의 `authorized_by`를 포함해야 하며, 하위 권한의 시도는 RAM이 청구되기 전에 중단됩니다. 2라운드는 `eosio.msig`와 `eosio.wrap`을 통해 `halt`와 `suspend`에 대해 이 제한이 유효함을 입증했습니다. 이후 `gift.vaulta`에 대한 21명 중 15명의 모든 권한 변경은, `eosio.wrap`을 통해 실행되는 것을 포함하여, `authorized_by`를 `active` 또는 `owner`로 설정합니다(I5 참고).

## 낮음

### L1: BP 8명이 프로그램이 활성화된 것으로 표시되는 상태에서 MSIG 하나로 모든 생성자를 중단할 수 있음

`suspend`는 액션당 생성자 하나에 작용하며, MSIG 하나에 담을 수 있는 액션 수에는 제한이 없으므로, BP 8명은 하나의 트랜잭션으로 등록된 모든 생성자를 정지할 수 있습니다. 제안서는 프로그램 전체 중단을 `disable`을 통해 BP 11명에게 할당하고, `enable`을 통해 15명이 이를 되돌리도록 합니다. 생성자별 경로는 8명으로 같은 상태에 도달하고 11명으로 되돌려지며, 그동안 컨트랙트의 `enabled` 플래그는 여전히 true로 표시됩니다. 생성자 등록 이전에 승인된 `suspend`는 `addcreator` 다음 블록에서 실행됩니다. 기금의 바이트는 전혀 이동하지 않으며, 영향은 등록된 쿼터의 하루 합계로, 기본 쿼터 생성자 하나당 약 88.8 EOS입니다.

```cpp
// SEC_2026_10_19_B7_eight_stop_every_creator
pass("sall"_n, make_trx({suspend_act(c1, gp(susp)), suspend_act(c2, gp(susp))}), 8);
BOOST_REQUIRE(enabled());                              // the program still reads as enabled
gift_fails(c1, "giftee111111"_n, "creator is suspended");
gift_fails(c2, "giftee111112"_n, "creator is suspended");
pass("admit3"_n, make_trx({addcreator_act(c3)}));
exec("sfut"_n, stranger);                              // approved before c3 was admitted
gift_fails(c3, "giftee111113"_n, "creator is suspended");
```

해결 방법: 제안서 본문. 제안서는 BP 8명이 임의의 생성자 또는 모든 생성자를 정지할 수 있으며, 클라이언트는 기증이 작동하는지 판단하기 위해 각 생성자의 `suspended` 필드를 `enabled` 플래그와 함께 읽는다고 명시합니다. 고정된 커밋의 컨트랙트 README는 `suspended` 필드를 설명합니다.

### L2: 승인된 `giftacct` MSIG 제안을 제3자가 자신의 키로 실행할 수 있음

생성자가 승인한 `eosio.msig` 제안은 생성자가 `giftacct`를 보낼 수 있는 경로 중 하나입니다. 컨트랙트는 생성자의 권한과, 누구든 수행한 해당 계정의 최상위 `newaccount`를 요구하며(`gift.cpp:100`, `:120`), `eosio.msig::exec`는 실행자의 권한만 요구합니다. 제안 내부의 `newaccount`는 인라인이므로 컨트랙트의 검사를 결코 충족하지 못하며, 따라서 MSIG 경로의 모든 기증에서는 실행을 전송하는 계정이 `newaccount`를 작성하고 키를 선택합니다. 승인된 제안을 본 제3자는 하나의 트랜잭션에서 자신의 키로 지정된 계정을 생성하고 기증을 실행할 수 있습니다. 기증은 제3자의 계정에 도달하고, 생성자의 쿼터가 차감되며, 생성자의 고객은 그 이름을 잃습니다. 이러한 기증 하나당 생성자에게 3,136바이트, 약 1.06 EOS가 청구되며, 제3자의 비용은 0.01 EOS 미만입니다. 기금은 생성자가 승인한 만큼만 정확히 지출하며, 등록되었거나 신청 중인 생성자 중 MSIG 경로를 사용하는 생성자는 없습니다.

```cpp
// SEC_2026_10_19_D1_approved_msig_giftacct_is_a_bearer_gift_for_the_named_account
propose_and_approve(alice, "giftone"_n, proposed({giftacct_act(alice, g, 3000)}), {alice, config::active_name});
auto trx = make_trx({newaccount_act(bob, g), msig_exec_act(alice, "giftone"_n, bob)}, {bob});
push_transaction(trx);                                 // bob creates g with bob's keys
BOOST_REQUIRE_EQUAL(gifted_row(g)["ram_bytes"].as_int64(), 3000);
BOOST_REQUIRE_EQUAL(used(alice), 3136);                // alice's quota pays

// SEC_2026_10_19_D1b_suffixed_name_defeats_the_hijack
const name g = "user.alice"_n;
auto trx = make_trx({newaccount_act(bob, g), msig_exec_act(alice, "gifttwo"_n, bob)}, {bob});
BOOST_REQUIRE_EXCEPTION(push_transaction(trx), eosio_assert_message_exception,
                        eosio_assert_message_is("only alice may create user.alice"));
```

해결 방법: 제안서 본문 및 생성자 안내. 제안서와 생성자 템플릿은 MSIG 경로를 사용하는 생성자가 마지막 승인, `newaccount` 및 실행을 하나의 트랜잭션으로 보내거나, 접미사의 소유자가 최상위 `newaccount`에 직접 서명하는 해당 접미사 아래의 이름에만 기증한다고 명시합니다. 두 방어 방법 모두 테스트 체인에서 입증되었습니다. 기증을 `newaccount` 서명자에 결속하거나 인라인 `giftacct`를 거부하는 코드상의 대안은 각각 제안서가 명시한 설계를 뒤집습니다(L11 참고).

### L3: `binary_extension` 없이 테이블 필드를 추가하는 이후 업그레이드는 기존 행을 읽을 수 없게 만듦

컨트랙트의 두 테이블 모두 `binary_extension` 없이 필드를 추가합니다(`contracts/gift/include/gift/gift.hpp:22-26`, `:30-39`). CDT는 행을 반환하기 전에 행 전체를 읽으므로, 이전 레이아웃으로 작성된 행은 이후 레이아웃에서 역직렬화에 실패합니다. 생성자 행에 필드를 추가하는 업그레이드는 그 이전에 등록된 모든 생성자에 대해 `giftacct`, `setquota`, `suspend`, `resume` 및 `rmcreator`를 되돌립니다. 설정 행에 필드를 추가하는 업그레이드는 `disable`, `enable` 및 모든 기증을 되돌리므로, BP 11명의 중단이 기증과 함께 실패합니다. 두 경우 모두 안전하게 실패(fail closed)하며 RAM을 이동시키지 않습니다. 메인넷 레지스트리는 비어 있는 상태로 시작하므로 출범 시 노출되는 행은 없습니다. Jungle 4 프로토타입은 고정된 빌드로 재배포되기 전에 기존 코드에서 유일한 구 레이아웃 행을 제거했습니다.

```cpp
// SEC_2026_10_19_B14_upgrade_with_appended_config_field_breaks_the_stop
pass("upgrade"_n, make_trx({setcode_act(UPG_WASM), setabi_act(UPG_ABI, ga())}));
propose("d1"_n, make_trx({disable_act(gp(halt))}));
approve("d1"_n, 11);
expect_fail([&] { exec("d1"_n); }, "datastream attempted to read past the end");
gift_fails(c1, "giftee111111"_n, "datastream attempted to read past the end");
```

해결 방법: 모든 업그레이드에 대한 운영 규칙. 이후의 모든 스키마 변경은 `binary_extension`을 사용하거나 마이그레이션과 함께 배포되며, 업그레이드 MSIG는 각 테이블에 대한 상태 보존 액션으로 끝납니다(프로그램이 켜져 있을 때는 `disable` 후 `enable`, 꺼져 있을 때는 `enable` 후 `disable`, 그리고 생성자 하나에 대해 자신의 쿼터로 `setquota`). 이를 통해 스키마 손상이 발생하면 업그레이드 전체가 되돌려집니다.

### L4: 제안서가 후보가 아닌 커밋으로 컨트랙트 소스를 고정했음

2라운드는 제안서가 컨트랙트 소스를 커밋 `d103fdce`로 링크하고 있음을 발견했습니다. 이 커밋은 후보보다 14커밋 뒤처진 조상 커밋으로, enabled 플래그, 쿼터 하한, 정지 기능 및 README가 없습니다. 후보 `a9a9a59`는 당시 어떤 공개 브랜치에도 없었습니다. 시행 단계의 `setcode`는 바이트를 담고 있으므로, 잘못된 고정은 BP가 검증할 수 있는 대상을 바꾸었을 뿐 배포되는 대상은 결코 바꾸지 않았습니다.

해결 방법: 고정. `a9a9a59`가 푸시되었으며, 제안서는 README만 변경하는 `6fad4b0`에 그 코드를 고정하고, WASM 및 ABI 해시, 툴체인 및 빌드 대상을 함께 명시합니다. Jungle 4 프로토타입은 동일한 바이트를 실행합니다.

### L5: 중단 권한이 자신의 권한 구성과 연결을 다시 쓸 수 있음

M2와 동일한 체인 규칙에 따라, 중단 권한은 자신의 키를 교체하여 공동 보유자를 축출하거나, 자신의 연결을 자신이 선택한 권한으로 재지정하거나, 연결을 제거하여 해당 액션이 21명 중 15명으로 되돌아가게 할 수 있었습니다(`authorization_manager.cpp:395-404`, `:417-429`). 그 범위는 연결된 액션과 자신의 하위 트리에서 끝났습니다. `enable`, 레지스트리 액션 및 인라인 기증은 `active`에 머무르며, 하위 권한은 이를 결코 충족하지 못합니다. 결과는 비상 중단 수단의 상실이었습니다.

```cpp
// SEC_2026_10_17_D1_breakglass_reaches_native_permission_actions
bg_push(native(bgp(), updateauth{gift, "child"_n, bg, authority(get_public_key(gift, "child"))}));
bg_push(native(bgp(), linkauth{gift, gift, "disable"_n, "child"_n}));   // re-points disable
bg_push(native(bgp(), updateauth{gift, bg, config::active_name, authority(get_public_key(gift, "rotated"))}));
expect_fail([&] { bg_push(gift_act("disable"_n, {bgp()})); }, "signatures");   // old key locked out
```

해결 방법: M2와 같이 시행 단계의 `limitauthchg` 단계.

### L6: 중단 권한 단독으로 서명한 중단은 스테이킹되지 않은 `gift.vaulta`에 청구됨

`gift.vaulta`는 CPU나 NET을 보유하지 않습니다. 새 계정은 NET 한도 0으로 시작하며(`contracts/eosio.system/src/eosio.system.cpp:660`), 체인은 트랜잭션 비용을 첫 번째 승인자에게 청구합니다(`libraries/chain/transaction_context.cpp:173-174`). 중단 권한만 포함한 `disable`은 `transaction net usage is too high: 96 > 0`로 실패하여, 중단이 필요한 순간에 프로그램을 활성 상태로 남겼습니다.

```cpp
// SEC_2026_10_17_D3_lone_breakglass_disable_billed_to_unstaked_account
bg_push(gift_act("disable"_n, {bgp()}));               // throws tx_net_usage_exceeded
BOOST_REQUIRE(enabled());
push_signed({gift_act("disable"_n, {{alice, config::active_name}, bgp()})}, {get_private_key(alice, "active"), bgkey()});
BOOST_REQUIRE(!enabled());                             // a funded first authorizer pays
```

해결 방법: 시행 설계. `halt`와 `suspend`는 `eosio.prods@prod.major`와 `eosio.prods@prod.minor`가 보유하며 `eosio.msig`를 통해 사용되므로, 제안을 실행하는 계정이 트랜잭션의 CPU와 NET 비용을 지불합니다.

### L7: 중단이 준비되는 동안의 노출이 본문에 기재된 것보다 쿼터 하나만큼 큼

생성자의 쿼터 윈도우는 첫 기증 시점에 열리고, 그로부터 최소 24시간 이후의 첫 기증에서 리셋됩니다(`contracts/gift/src/gift.cpp:98-101`). 공격자가 D초 동안 보유한 키는 중단이 적용되기 전까지 `Q × (ceil(D / 86,400) + 1)`바이트를 지출할 수 있습니다. 침해 시점에 이미 열려 있던 윈도우가 쿼터 하나를 더하기 때문입니다. 256 KiB 기본값과 5일짜리 MSIG 기준으로 이는 1,572,864바이트, 약 533 EOS입니다.

해결 방법: 제안서 본문. 본문은 `(days the msig takes + 1) × quota` 공식과 이 수치를 제시합니다.

### L8: `giftram`으로 `gift.vaulta`에 보낸 RAM은 묶임

`eosio::giftram`으로 `gift.vaulta`에 보낸 RAM은 `gift.vaulta`가 보유한 기증으로 도달하며, 시스템 컨트랙트는 기증된 바이트가 빠져나가지 못하게 하므로(`contracts/eosio.system/src/delegate_bandwidth.cpp:272-273`), 프로그램은 이를 다시 기증할 수 없습니다. 소진 시점에 이 방식으로 보낸 보충분은 생성자의 기증이 `insufficient quota`로 실패하기 전까지 L9에서 설명한 끝부분만 복원합니다. 이를 반환하려면 `gift.vaulta`가 서명한 21명 중 15명의 `ungiftram`이 필요하며, 같은 트랜잭션에서 그 앞에 `gift.vaulta`의 사용량을 충당하는 `gift.vaulta`로의 `ramtransfer`가 있어야 합니다. 제3자가 `gift.vaulta`에 소량의 `giftram`을 보내면 다른 기증자에 대해 계정이 닫히며, 프로그램에는 아무 변화도 없습니다.

```cpp
// SEC_2026_10_17_R2_1_giftram_refill_at_exhaustion
BOOST_REQUIRE_EQUAL(success(), giftram(stranger, gift, 500'000, "refill sent with the wrong action"));
{ auto t = gift_trx(g2, Rx); push_transaction(t); }    // only the old balance can still be gifted
{ auto t = gift_trx(g3, 1596);
  BOOST_REQUIRE_EXCEPTION(push_transaction(t), eosio_assert_message_exception, eosio_assert_message_is("insufficient quota")); }
```

해결 방법: 제안서 본문 및 운영 규칙. 초기 기금과 이후의 모든 보충을 포함하여 `gift.vaulta`로의 모든 이전은 `ramtransfer`를 사용합니다. 초기 기금의 출처인 `admin.grants`는 그 이력 전체에서 `ramtransfer`로만 RAM을 이동했습니다.

### L9: 기금은 계정 자체 사용량에서 끝나며, 그 시점에 `addcreator`가 실패함

`gift.vaulta`는 자신의 코드, ABI, 권한 및 레지스트리 행의 비용을 자신이 기증하는 RAM에서 지불합니다. 도달하는 가장 큰 기증은 잔액에 무료 1,400바이트를 더하고, 사용량과 136바이트의 행 오버헤드를 뺀 값입니다(`delegate_bandwidth.cpp:323`, Spring `resource_limits.cpp:248`). 그다음 기증은 프로그램 계정의 이름을 담은 `account gift.vaulta has insufficient ram`으로 실패합니다. 고정된 빌드에서 측정한 출범 시 사용량은 216,918바이트이므로, 기금 중 215,654바이트, 약 73 EOS는 결코 기증될 수 없습니다. 이 상태에서는 `gift.vaulta`가 비용을 부담하는 행을 추가하므로 `addcreator`도 실패하며, `disable`, `enable`, `suspend`, `resume`, `setquota` 및 `rmcreator`는 계속 작동합니다.

```cpp
// endowment_last_bytes_fail_on_ram_vaulta_usage
const int64_t headroom = ram_bytes(gift) + 1400 - ram_usage(gift);
auto whole = [&]() { return push({newaccount_action(alice, g1), giftacct_action(alice, g1, bytes0)}, {alice}); };
BOOST_REQUIRE_EXCEPTION(whole(), ram_usage_exceeded, fc_exception_message_contains("insufficient ram"));
push({newaccount_action(alice, g1), giftacct_action(alice, g1, headroom - 136)}, {alice});   // the largest gift that lands
BOOST_REQUIRE_EQUAL(ram_usage(gift), ram_bytes(gift) + 1400);
```

해결 방법: 공식과 오류를 제시하는 제안서 본문, 그리고 기금이 소진에 가까워지면 보충 MSIG를 어떤 등록 MSIG보다 먼저 실행한다는 운영 규칙.

### L10: 프로그램 계정은 NET 또는 CPU 없이 시작함

프로그램을 통해 생성된 계정은 기증된 RAM을 보유하며, 기증은 RAM 한도만 높이므로 NET 및 CPU 한도 0으로 시작합니다(`eosio.system.cpp:660`). 계정 소유자는 생성자, 지갑 또는 다른 당사자가 스테이킹하거나, 파워업하거나, 첫 번째 승인자로서 비용을 지불하면 트랜잭션을 실행할 수 있습니다. 기증을 반환하려면 계정 자체의 RAM도 약 1,600바이트 필요합니다. 기증이 빠져나간 후 계정의 사용량이 무료 1,400바이트와 계정 자체 RAM 안에 들어가야 하기 때문입니다. 21명 중 15명의 `eosio.wrap` 트랜잭션을 통한 강제 반환은 같은 트랜잭션에서 먼저 계정에 1,596바이트를 제공할 때만 성공하며, 3,000바이트 기증의 경우 생성자의 쿼터에서 차감된 3,136바이트 중 1,540바이트를 회수합니다.

해결 방법: 제안서 본문의 '기증 방식' 섹션, '회수' 항목 및 '전액 반환만 가능' 제약.

### L11: `giftacct`가 인라인 액션으로 수락됨

컨트랙트는 생성자의 권한을 요구하고(`gift.cpp:86`) 최상위 트랜잭션을 어떤 깊이에서든 읽으므로(Spring `libraries/chain/webassembly/cf_transaction.cpp:6-17`), 인라인으로 전송된 `giftacct`를 수락합니다. 즉 생성자가 승인한 `eosio.msig` 제안을 통해, 생성자의 `eosio.code` 권한을 보유한 컨트랙트를 통해, 그리고 21명 중 15명의 `eosio.wrap::exec`를 통해 수락합니다. 1라운드는 본문이 최상위 액션을 설명하는 것으로 읽고, 인라인 호출자를 거부하는 한 줄짜리 검사를 제안했습니다. 모든 경로에서 기금은 생성자의 쿼터를 넘어 지불하지 않습니다.

해결 방법: 인라인 `giftacct`를 설계로서 수용. 제안서와 컨트랙트 README는 `giftacct`가 최상위 또는 인라인으로 전송될 수 있고, 생성자는 키, 승인된 MSIG 또는 배포된 컨트랙트 중 어떤 방식이든 자신의 권한으로 이루어진 모든 기증에 책임을 지며, 인덱서는 인라인 트레이스를 읽는다고 명시합니다. `newaccount`는 여전히 최상위여야 하므로, 인라인으로 생성된 계정은 프로그램에서 제외됩니다. L2는 추가 안내가 필요했던 유일한 결과입니다.

## 정보

- **I1.** `setcode` 이전에 `gift.vaulta`로 보낸 `enable`은 어떤 핸들러도 실행하지 않고 성공하므로, `enable`의 순서가 잘못된 배포 MSIG는 실행되고, 21명 중 15명의 추가 `enable`이 있을 때까지 프로그램을 비활성 상태로 남깁니다. `vp1deploy` 빌더는 `enable`을 마지막에 배치하며, 운영자는 MSIG 실행 후 `enabled` 플래그를 확인합니다.
- **I2.** `disable` 제안을 비축해 둔 BP 11명은 21명 중 15명의 각 `enable`을 한 블록 뒤에 되돌릴 수 있습니다. `disable`은 프로그램이 이미 비활성 상태일 때도 성공하므로, 어떤 계정이든 유지 중인 모든 `disable`을 먼저 실행하여 비축분 전체를 소진할 수 있으며, 그 이후의 `enable`은 유지됩니다. 운영자는 `enable` 이전에 유지 중인 `disable` 제안들을 하나의 트랜잭션으로 실행합니다.
- **I3.** 두 생성자가, 또는 한 생성자가 두 번, 하나의 트랜잭션에서 같은 새 계정에 기증하면, 시스템 컨트랙트는 행 하나만 유지하는 반면 각 호출에는 136바이트의 행 오버헤드가 청구됩니다. 생성자에게 과다 청구되며, 기금은 쿼터에 기록된 것보다 더 많이 지출하지 않습니다. 수용: 생성자가 한 계정에 두 번 기증할 이유가 없습니다.
- **I4.** 제안서는 `gift.vaulta`의 출범 시 사용량을 약 200 KB로 기재했습니다. 고정된 빌드에서 측정한 값은 216,918바이트이며, 그중 코드가 209,770바이트를 차지합니다. 첫 번째 생성자 등록은 253바이트를, 이후의 각 등록은 141바이트를 추가합니다. 제안서의 공식은 정확했으며, 수치는 교체되었습니다.
- **I5.** 이후 `gift.vaulta`에 대한 모든 권한 변경은 `owner` 또는 `active`의 `authorized_by`를 포함해야 하며, 시스템 컨트랙트는 해당 변경이 그 동일한 권한으로 승인될 것도 요구하므로(`contracts/eosio.system/src/limit_auth_changes.cpp:39-40`), `active`로 선언되었으나 `owner`를 지정하는 변경은 실패합니다. 이 규칙은 안전하게 실패하며, 제안서는 이 짝짓기를 명시합니다.
- **I6.** 생성 트랜잭션에 대한 컨트랙트의 스캔은 체인의 상한인 1,000,247바이트의 압축 트랜잭션에서 완료되었습니다. 큰 트랜잭션은 그것을 보내는 계정에만 비용을 발생시킵니다. 수용.
- **I7.** 시스템 컨트랙트는 기증당 두 번(`giftram`, `logramchange`), 반환당 두 번(`ungiftram`, `logramchange`) `gift.vaulta`에 알림을 보냅니다. 컨트랙트는 알림 핸들러를 선언하지 않으므로 알림은 아무 효과가 없으며, 수증자의 반환은 항상 완료됩니다. 고정된 커밋의 README는 `giftram`과 `ungiftram`만 언급합니다. 수용.
- **I8.** 생성자 템플릿의 MSIG 명령에 `--broadcast` 플래그가 빠져 있어, 작성된 그대로의 명령은 드라이런을 출력했습니다. 템플릿에 해당 플래그가 포함되었습니다.
- **I9.** 제안서와 FAQ는 `suspend`와 `resume`이 "별도로 검토되었다"고 출처 없이 기재했으며, FAQ의 테스트 수는 커밋을 명시하지 않은 채 1라운드를 설명했습니다. 제안서는 이제 2라운드에서 `suspend`와 `resume`을 다루는 이 문서를 인용하며, FAQ는 더 이상 검토를 설명하지 않습니다.
- **I10.** 에뮬레이터 테스트 두 개는 단언된 검사가 실행되기 전에 체인이 거부하는 시퀀스에 대해 단언합니다. 에뮬레이터의 대체 시스템 컨트랙트가 계정을 생성하지 않기 때문이며, 비활성 프로그램을 이름으로 내건 관리자 테스트 하나는 `disable`을 호출하지 않습니다. 이들이 명시하는 속성은 체인에서 성립하며 Spring 테스터 케이스로 입증됩니다. 테스트 하네스 사안으로 수용.
- **I11.** 어떤 계정도 기증된 RAM을 보유하지 않은 체인에서는 첫 기증이 기증을 저장하는 시스템 테이블에 대해 112바이트를 추가로 지불하므로, `gift.vaulta`의 사용량은 쿼터가 계산하는 136바이트 대신 248바이트 증가합니다. Vaulta 메인넷의 테이블에는 이미 7,000건이 넘는 기증이 있으므로, 메인넷의 모든 기증은 정확히 136바이트를 청구합니다. 테스트넷 운영자는 첫 기증에서 248바이트를 보게 됩니다.
- **I12.** 컨트랙트의 단위 테스트는 컨트랙트 코드로 계정을 생성할 수 없고 RAM 한도를 강제하지 않는 에뮬레이터에서 실행되므로, 트랜잭션 스캔, 쿼터 산술 및 입력 검사를 입증합니다. 체인에 의존하는 주장(기증은 같은 트랜잭션이 생성하는 계정에만 도달함, 1,596바이트는 단일 키 계정을 완성하는 최소 기증임, 수증자는 자체 RAM을 충분히 보유하면 기증을 반환할 수 있음, 제3자의 기증은 생성 트랜잭션에 도달할 수 없음)은 Spring 테스터에서 입증됩니다. 테스트 순서에 의존하던 에뮬레이터 테스트 하나는 수정되었으며, 61개의 단위 테스트는 개별적으로 실행해도 통과합니다.
- **I13.** 생성자는 생성 트랜잭션 내에서 새 수증자의 리소스 행을 비울 수 있으며(`delegatebw` 후 `undelegatebw`), 그 후 기증이 수증자에게 청구되는 행을 다시 생성합니다. 최종 상태는 일반 기증과 같습니다. 수용.
- **I14.** `gift.vaulta`에 대한 21명 중 15명의 `setacctram`은 체인 RAM 한도를 고정하여 잔액을 따르지 않게 만듭니다. 기증은 여전히 도달하며 수증자의 한도는 정확하게 유지됩니다. 운영 규칙은 `gift.vaulta`를 비관리 상태로 유지합니다.
- **I15.** `sellram`은 판매자의 토큰 잔액 행을 청구하며 첫 판매 시 240바이트이므로, 기증된 RAM과 자체 RAM을 함께 보유한 수증자는 한 액션에서 최대 자체 RAM에서 240을 뺀 만큼만 판매할 수 있습니다. `ramtransfer`와 `ramburn`은 정확히 자체 바이트만 이동합니다. 이는 `sellram`과 `eosio.token`의 속성입니다. 수용.

## 검토의 한계

M2의 소진 시간은 4코어 테스트 호스트에서 측정되었습니다. 65,536개 항목의 `updateauth`와 천 번의 `deleteauth` 복구에 대한 메인넷 BP CPU는 산출된 것이며 실행되지 않았습니다. M1의 8명과 11명 간의 대립은 `eosio.msig`를 통해 실행되었고, 한 번은 직접 공동 서명한 트랜잭션으로 실행되었습니다. 이전 승인자가 상위 21위에 다시 진입할 때 유지 중인 제안의 동작은 동일한 코드 줄로부터 추론되었습니다. L2는 단일 키 생성자와 2자 생성자에 대해 테스트되었습니다. L9와 I4의 출범 시 사용량 수치는 고정된 빌드의 WASM 크기를 사용하며 이후의 모든 `setcode`에 따라 달라집니다. 검토는 메인넷의 `eosio.msig`가 검토된 소스와 일치하는지 확인하기 위해 이를 다시 빌드하지 않았습니다. Jungle 4 배포, 계정 생성 인덱서, 생성자의 클라이언트 소프트웨어, `fund.wram`, 거버넌스 절차 및 번역은 두 검토의 범위 밖이었으며, 메인넷 드라이런은 수행되지 않았습니다.
