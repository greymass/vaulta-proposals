---
lang: zh
source: bdd9086538f73f6f89319b83041503765bc92868
translator: Claude (agent translation)
msigs:
    - step: 1
      title: 将 max_inline_action_size 设为 1,048,576 字节，其余所有链参数保持现值
---

# 提高内联动作大小上限

[English](proposal.md) | [한국어](proposal.ko.md) | [中文](proposal.zh.md)

## 摘要

MSIG 只能在合约代码小于约 512 KB 时升级合约，这只是账户自身密钥所能部署大小的一半。本提案将该上限提高到 1 MB，使只能由治理升级的合约（例如比现行上限小 16,620 字节的 EOS EVM 运行时）能够以密钥持有者可部署的任何大小进行升级。

本提案请出块节点批准一个 MSIG，即 `vp5setparams`。它调用 `eosio::setparams`，将链参数 `max_inline_action_size` 从 524,287 字节提高到 1,048,576 字节，并按现值重新提交其余 16 个参数。MSIG 以内联动作执行每个已批准的动作，而一旦代码超过 524,238 字节，Spring 便拒绝内联 `setcode`。一次 Spring tester 运行显示，994,058 字节的 MSIG `setcode` 在现行值下失败，而在本提案自身的 `setparams` 经由 `eosio.msig` 执行之后得以执行；在 Jungle 4 上，一个 MSIG 已在提议值下执行了 765,700 字节的 `setcode`。该变更在 MSIG 执行时生效，无需节点升级或协议特性。

## 理由

`eosio.msig::exec` 执行已批准的提案时，会以内联方式发送每个提议的动作。Spring 的 `send_inline` 仅在打包后的动作数据小于 `max_inline_action_size` 时才接受（[`transaction.cpp`](https://github.com/AntelopeIO/spring/blob/04bdb089edc7e3c3f954e0aab4a7f3cb48635788/libraries/chain/webassembly/transaction.cpp#L6-L13)）。打包后的 `setcode` 动作比其携带的代码大 49 字节，因此在 524,287 下，MSIG 能部署的最大代码为 524,238 字节。账户密钥通过顶层动作部署代码，Spring 以压缩交易上的 `max_transaction_net_usage` 和解压时的 1 MiB 上限对其加以限制（[`transaction.cpp`](https://github.com/AntelopeIO/spring/blob/04bdb089edc7e3c3f954e0aab4a7f3cb48635788/libraries/chain/transaction.cpp#L210)），因此密钥可部署约 1 MiB 的代码。大小介于两者之间的合约可以由其密钥升级，却无法通过 `eosio.msig`、`eosio.wrap` 或其他合约的任何途径升级。

受影响最大的是只能由治理升级的合约。`eosio`（409,053 字节）由 `eosio.prods` 控制，`eosio.evm`（507,618 字节）归 `eosio` 所有，其 active 权限由 `enf` 与五个出块节点共享，因此两者都只能通过 MSIG 变更代码。以上大小于 2026-10-20 从 EOS 主网读取。EOS EVM 开发者曾在 AntelopeIO/spring 第 1730 号 issue 中提出同一上限问题，其中一位于 2025-07-17 写道："The evm runtime contract is closed to 512K uncompressed size. We need the increase the transaction limit and inline action size limit to 1MB (or something between 512K and 1 MB)." 该 issue 还要求提高 `max_transaction_net_usage`。本提案仅提高内联上限；只要 EVM 运行时的部署交易经过 zlib 压缩，这便已足够。

这一差距是在 Shipload 的游戏合约 `eon.shipload` 上暴露出来的，其在 Jungle 4 上 994,058 字节的构建正是复现测试所部署的代码。

## 参数变更

`vp5setparams` 在引用动作之后携带一个动作：由 `eosio@active` 授权的 `eosio::setparams`，包含 `blockchain_parameters` 的全部 17 个字段。其中 16 个复制自 2026-10-20 读取的 EOS 主网 `eosio` `global` 表，`max_inline_action_size` 从 524,287 改为 1,048,576。该动作省略可选字段 `max_action_return_value_size`，其值保持 256。

新值涵盖一笔交易所能携带的所有 `setcode`。Spring 只接受严格小于上限的内联数据，因此 1,048,576 允许 1,048,575 字节；解压后为 1 MiB 的 propose 交易所能容纳的最大 `setcode` 携带 1,048,426 字节代码，作为打包后的内联动作为 1,048,475 字节。

与密钥的对等性在 zlib 压缩的提案上成立。Spring 按压缩后的交易计收 NET，因此携带超过约 512 KB 代码的 propose 必须经过 zlib 压缩，正如密钥持有者直接 `setcode` 同样的代码时一样。除非指定 `--compression zlib`，cleos 会以未压缩形式发送交易。在复现测试中，携带 994,058 字节代码的 propose 压缩后约为 307 KB，而未压缩的 994,208 字节则以 `tx_net_usage_exceeded` 失败。

### 批准前检查 MSIG

`setparams` 会写入全部 17 个字段，因此若在链上另一参数变更之后执行 `vp5setparams`，该变更将被撤销。在批准或执行之前，每位批准者在本仓库中不带 `--broadcast` 运行 `bun run propose VP-0005 vp5setparams`。该命令打印 17 个参数的现值与提议值，若 `max_inline_action_size` 之外的任一字段不同则失败。在其失败期间，出块节点不执行 `vp5setparams`，Greymass 会取消该 MSIG 并以刷新后的值重新提出。

## 技术说明

- **安全性**：Spring 仅在 `send_inline` 与 `send_context_free_inline` 中检查 `max_inline_action_size`，且在校验链参数时不对其设上限，因此 `setparams` 无需协议特性或节点升级即可应用新值。内联动作数据只计入 CPU：部署 994,058 字节代码的 exec 计收 120 NET。每笔交易和每个区块的 CPU 上限限制了内联动作所产生的 trace、历史与内存量，本提案不改变这两项上限。输入动作已可通过 zlib 达到约 1 MiB，因此历史与 trace 的消费者已在处理这种大小的动作。每有一个此大小的内联动作在处理中，节点峰值内存约增加 1.5 MB。
- **复现测试**：[msig-setcode-repro.txt](assets/msig-setcode-repro.txt) 包含测试源码、其 CMake 项目、输入哈希、命令及记录的输出。测试在 v1.2.2（提交 `04bdb089edc7e3c3f954e0aab4a7f3cb48635788`）的 Spring tester 中运行，使用线上 EOS 主网的 `eosio.system`（SHA-256 `34cbdf2a9c41b0a182f235018753110ca2cdcdd4c274b17dd8b7ea9f444fd043`）与 `eosio.msig` WASM，以及 2026-10-20 从主网 `global` 读取的 17 个参数。它提议一个 `setcode`，部署 Jungle 4 `eon.shipload` 的代码（SHA-256 `e687392df235a1bd582f6ba56143b5a2399b070b45d67df7641fb511d7378c59`，于交易 `13e25df040fff5ca692db70b015582ae84e1fb7dbb48f29a132816f7e509a3df` 中部署），并表明其 exec 失败。随后它经由 `eosio.msig` 提议并执行一个 `eosio::setparams` 动作，原样携带 `vp5setparams` 所含的 68 字节（SHA-256 `0a08486aeca09d1075ecd9b2345132e9b1ddef0aef71d9d55e0f5955b20807f0`），并要求 `max_inline_action_size` 读数为 1,048,576、其余 16 个字段为主网值。最后它执行该 `setcode`，再以填充至最大可提议大小的代码重复一次。每次 exec 成功后，已部署代码的哈希均与提议的代码一致。

CPU 以微秒计，每种运行时在一台 x86_64 Linux 主机上各运行一次：

| 情形 | eos-vm | eos-vm-jit | eos-vm-oc |
| --- | --- | --- | --- |
| Propose，zlib，994,058 字节代码 | 50,367 | 11,379 | 8,034 |
| 在 524,287 下 exec | `inline_action_too_big` | `inline_action_too_big` | `inline_action_too_big` |
| `vp5setparams` 动作的 exec | 307 | 113 | 100 |
| 在 1,048,576 下 exec，994,058 字节 | 超过 150,000 | 36,976 | 20,601 |
| 在 1,048,576 下 exec，1,048,426 字节 | 超过 150,000 | 38,397 | 20,467 |
| 密钥直接 `setcode`，zlib，994,058 字节 | 未运行 | 25,393 | 20,620 |

每次 exec 均计收 120 NET。"超过 150,000"表示该交易在 `setcode` 内超出了 150 ms 的 `max_transaction_cpu_usage`。

## 测试网演示

Jungle 4 出块节点在交易 `465454494c08feafbad77c972ca7ae13c53f93428b1d5221f562a0bc8facaf62`（区块 293,267,367，2026-10-21）中将 `max_inline_action_size` 提高到 1,048,576。这是一次对 `eosio::setparams` 的 `eosio.sudo::exec`，其数据与 `vp5setparams` 携带的 68 字节逐字节相同。其他所有参数以及 `max_action_return_value_size`（256）均保持原值。该变更经由 `eosio.sudo` 执行，因此 `setparams` 经由 `eosio.msig` 执行的证据是复现测试。

随后 Greymass 通过 `eosio.msig` 升级了 Jungle 4 账户 `box.shipload`，两个提案均以 zlib 压缩推送。`setcode` 携带 765,700 字节代码（SHA-256 `9d88d0be6342549be707439c4f9367b2bb4b1feb54ce6bda9130abe06125e3a5`），比 524,238 字节的上限多 241,462 字节；其 exec 在交易 `425375911d0a6da27401846bd61448ff2b29470053253705ccaa1054d5b68376`（区块 293,275,646）中计收 32.7 ms CPU。对应的 `setabi` 在同一区块的交易 `836b4e574aa7a77469276a5b0ed011730aebb5dd92a9175eb85490d5bdb73921` 中执行。`box.shipload` 上的代码哈希与提议的代码一致。

## 利益披露

本提案由 Greymass 撰写。Greymass 开发 Shipload，其 `eon.shipload` 合约大于现行上限，并将从此变更中受益。截至 2026-10-21，Greymass 不在前 30 名出块节点之列，因此不签署任何 `setparams` MSIG。

## 待决问题

无。

## 后续步骤

1. Greymass 从 `aaron@propose` 提出 `vp5setparams`，引用合并后的正文，请求前 30 名出块节点批准，到期时间设为 180 天后。引用之后的唯一动作是 `eosio::setparams`，其中 `max_inline_action_size` 设为 1,048,576，其余 16 个字段不变。
2. 出块节点审阅正文与复现测试，执行"批准前检查 MSIG"中的检查，然后批准。21 个中有 15 个批准后，任何人都可以执行它。
