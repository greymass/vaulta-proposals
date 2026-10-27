---
vp: VP-0005
title: Raise the Inline Action Size Limit
standard: VPS-1
status: Proposed
authors:
    - Aaron Cox (Greymass)
created: 2026-10-20
accounts:
    - eosio
    - eosio.msig
msigs:
    - status: active
      proposer: aaron
      proposal: vp5setparams
      commit: 718e51bd2fc1877faa57c1c973eff11d74e749eb
      title: Set max_inline_action_size to 1,048,576 bytes, leaving every other chain parameter at its value
sentiment: []
requires: []
---

# Raise the Inline Action Size Limit

[English](proposal.md) | [한국어](proposal.ko.md) | [中文](proposal.zh.md)

## Summary

An msig can upgrade a contract only while its code stays under about 512 KB, half the size an account's own keys can deploy. This proposal raises that limit to 1 MB, so contracts that only governance can upgrade, such as the EOS EVM runtime, which sits 16,620 bytes below the current limit, can be upgraded at any size a key holder could deploy.

Producers are asked to approve one msig, `vp5setparams`, which calls `eosio::setparams` to raise the chain parameter `max_inline_action_size` from 524,287 to 1,048,576 bytes and resubmits the other 16 parameters at their values. An msig executes each approved action as an inline action, and Spring refuses an inline `setcode` once the code passes 524,238 bytes. A Spring tester run shows an msig `setcode` of 994,058 bytes failing at the current value and executing after this proposal's own `setparams` runs through `eosio.msig`, and on Jungle 4 an msig has executed a 765,700-byte `setcode` at the proposed value. The change takes effect when the msig executes and needs no node upgrade or protocol feature.

## Rationale

When `eosio.msig::exec` runs an approved proposal, it sends every proposed action inline. Spring's `send_inline` accepts packed action data only when it is smaller than `max_inline_action_size` ([`transaction.cpp`](https://github.com/AntelopeIO/spring/blob/04bdb089edc7e3c3f954e0aab4a7f3cb48635788/libraries/chain/webassembly/transaction.cpp#L6-L13)). A packed `setcode` action is 49 bytes larger than the code it carries, so at 524,287 the largest code an msig can deploy is 524,238 bytes. An account's keys deploy code in a top-level action, which Spring bounds by `max_transaction_net_usage` on the compressed transaction and by a 1 MiB limit on decompression ([`transaction.cpp`](https://github.com/AntelopeIO/spring/blob/04bdb089edc7e3c3f954e0aab4a7f3cb48635788/libraries/chain/transaction.cpp#L210)), so keys deploy code up to about 1 MiB. A contract between those two sizes can be upgraded by its keys and by nothing that acts through `eosio.msig`, `eosio.wrap` or another contract.

The contracts most exposed are the ones only governance can upgrade. `eosio` (409,053 bytes) is controlled by `eosio.prods`, and `eosio.evm` (507,618 bytes) is owned by `eosio`, with an active authority shared by `enf` and five producers, so both change code only through msig. Sizes were read from EOS mainnet on 2026-10-20. The EOS EVM developers raised the same limit in AntelopeIO/spring issue 1730, where one wrote on 2025-07-17: "The evm runtime contract is closed to 512K uncompressed size. We need the increase the transaction limit and inline action size limit to 1MB (or something between 512K and 1 MB)." That issue also asks for a larger `max_transaction_net_usage`. This proposal raises the inline limit alone, which covers the EVM runtime once its deploy transaction is zlib-compressed.

The gap surfaced on Shipload's game contract, `eon.shipload`, whose 994,058-byte build on Jungle 4 is the code the reproduction deploys.

## Parameter change

`vp5setparams` carries one action after its citation: `eosio::setparams`, authorized by `eosio@active`, holding all 17 `blockchain_parameters` fields. Sixteen are copied from the EOS mainnet `eosio` `global` table as read on 2026-10-20, and `max_inline_action_size` changes from 524,287 to 1,048,576. The action omits the optional `max_action_return_value_size` field, which stays at 256.

The new value covers every `setcode` a transaction can carry. Spring accepts inline data strictly smaller than the limit, so 1,048,576 admits 1,048,575 bytes, and the largest `setcode` that fits in a 1 MiB decompressed propose transaction carries 1,048,426 bytes of code, 1,048,475 bytes as a packed inline action.

Parity with keys holds for zlib-compressed proposals. Spring bills NET on the compressed transaction, so a propose carrying more than about 512 KB of code must be zlib-compressed, as a key holder's direct `setcode` of the same code must be. cleos sends transactions uncompressed unless given `--compression zlib`. In the reproduction, the propose of 994,058 bytes of code is about 307 KB compressed and fails with `tx_net_usage_exceeded` at 994,208 bytes uncompressed.

### Checking the msig before approval

`setparams` writes all 17 fields, so executing `vp5setparams` after another parameter has changed on chain would revert that change. Before approving or executing, each approver runs `bun run propose VP-0005 vp5setparams` from this repository without `--broadcast`. It prints the 17 parameters live and proposed, and fails if any field other than `max_inline_action_size` differs. While it fails, producers do not execute `vp5setparams`, and Greymass cancels it and proposes again from refreshed values.

## Technical notes

- **Safety**: Spring checks `max_inline_action_size` only in `send_inline` and `send_context_free_inline`, and places no bound on it when validating chain parameters, so `setparams` applies the new value with no protocol feature or node upgrade. Inline action data is billed as CPU only: the exec that deploys 994,058 bytes of code bills 120 NET. The per-transaction and per-block CPU limits bound the trace, history and memory volume an inline action creates, and this proposal leaves both unchanged. Input actions already reach about 1 MiB through zlib, so history and trace consumers already handle actions of this size. Peak node memory grows by about 1.5 MB for each inline action of this size in flight.
- **Reproduction**: [msig-setcode-repro.txt](assets/msig-setcode-repro.txt) holds the test source, its CMake project, the input hashes, the commands and the recorded output. The test runs in Spring's tester at v1.2.2 (commit `04bdb089edc7e3c3f954e0aab4a7f3cb48635788`) with the live EOS mainnet `eosio.system` (SHA-256 `34cbdf2a9c41b0a182f235018753110ca2cdcdd4c274b17dd8b7ea9f444fd043`) and `eosio.msig` WASM, and the 17 parameters read from mainnet `global` on 2026-10-20. It proposes a `setcode` of the Jungle 4 `eon.shipload` code (SHA-256 `e687392df235a1bd582f6ba56143b5a2399b070b45d67df7641fb511d7378c59`, deployed in transaction `13e25df040fff5ca692db70b015582ae84e1fb7dbb48f29a132816f7e509a3df`) and shows its exec failing. It then proposes and executes through `eosio.msig` an `eosio::setparams` action carrying the 68 bytes `vp5setparams` holds, verbatim (SHA-256 `0a08486aeca09d1075ecd9b2345132e9b1ddef0aef71d9d55e0f5955b20807f0`), and requires `max_inline_action_size` to read 1,048,576 with the other 16 fields at their mainnet values. Finally it executes the `setcode`, then repeats with the code padded to the largest proposable size. After each successful exec the deployed code hash matches the proposed code.

CPU in microseconds, one run per runtime on an x86_64 Linux host:

| Case | eos-vm | eos-vm-jit | eos-vm-oc |
| --- | --- | --- | --- |
| Propose, zlib, 994,058 bytes of code | 50,367 | 11,379 | 8,034 |
| Exec at 524,287 | `inline_action_too_big` | `inline_action_too_big` | `inline_action_too_big` |
| Exec of the `vp5setparams` action | 307 | 113 | 100 |
| Exec at 1,048,576, 994,058 bytes | over 150,000 | 36,976 | 20,601 |
| Exec at 1,048,576, 1,048,426 bytes | over 150,000 | 38,397 | 20,467 |
| Direct key `setcode`, zlib, 994,058 bytes | not run | 25,393 | 20,620 |

Every exec bills 120 NET. "Over 150,000" marks a transaction that exceeded the 150 ms `max_transaction_cpu_usage` inside `setcode`.

## Testnet demonstration

The Jungle 4 producers raised `max_inline_action_size` to 1,048,576 in transaction `465454494c08feafbad77c972ca7ae13c53f93428b1d5221f562a0bc8facaf62` (block 293,267,367, 2026-10-21), an `eosio.sudo::exec` of `eosio::setparams` whose data is byte-identical to the 68 bytes `vp5setparams` carries. Every other parameter, and `max_action_return_value_size` (256), kept its value. That change ran through `eosio.sudo`, so the reproduction is the evidence for `setparams` executing through `eosio.msig`.

Greymass then upgraded the Jungle 4 account `box.shipload` through `eosio.msig`, with both proposals pushed zlib-compressed. The `setcode` carries 765,700 bytes of code (SHA-256 `9d88d0be6342549be707439c4f9367b2bb4b1feb54ce6bda9130abe06125e3a5`), 241,462 bytes more than the 524,238-byte ceiling, and its exec in transaction `425375911d0a6da27401846bd61448ff2b29470053253705ccaa1054d5b68376` (block 293,275,646) billed 32.7 ms of CPU. The matching `setabi` executed in the same block in transaction `836b4e574aa7a77469276a5b0ed011730aebb5dd92a9175eb85490d5bdb73921`. The code hash on `box.shipload` matches the proposed code.

## Disclosure

Greymass wrote this proposal and builds Shipload, whose `eon.shipload` contract is larger than the current limit and benefits from the change. As of 2026-10-21 Greymass is not among the top 30 producers, so it signs no `setparams` msig.

## Open Questions

None.

## Next Steps

1. Greymass proposes `vp5setparams` from `aaron@propose`, citing the merged text, with approvals requested from the top 30 producers and an expiration 180 days out. Its only action after the citation is `eosio::setparams`, with `max_inline_action_size` set to 1,048,576 and the other 16 fields unchanged.
2. Producers review the text and the reproduction, run the check in Checking the msig before approval, then approve. Once 15 of 21 approve, anyone can execute it.
