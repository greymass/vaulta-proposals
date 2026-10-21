---
lang: zh
source: 477d5794f99ae99a976bb3cf50ddcb98da905470
translator: Claude (agent translation)
msigs:
    - step: 1
      title: 将 gm 注册为创建者，每日额度为 262,144 字节
---

# 将 gm 注册为 VP-0001 创建者
[English](proposal.md) | [한국어](proposal.ko.md) | [中文](proposal.zh.md)

## 摘要

本提案将 `gm` 注册为 [VP-0001](../vp-0001-ram-gifting/proposal.md) 下的创建者，每日额度为 256 KiB。Greymass 通过 Sextant 运营 `gm`。Sextant 是 iOS 和 Android 版 Anchor 以及 Web Authenticator 背后的账户创建服务，用于在用户通过 Google 或 Apple 登录后为其提供免费账户。`gm` 已经为其创建的每个免费账户赠送 RAM；有了捐赠资金后，这部分 RAM 将来自网络，超出额度的账户则由 Greymass 自己的 RAM 承担。

## 身份

拟注册的账户为 `gm`，由 Greymass Inc. 运营。区块生产者可通过 support@greymass.com 联系 Greymass。

## 用途与额度

只有 Greymass 的免费账户产品会调用 `giftacct`。这些产品在所有平台上相同：iOS 版 Anchor、Android 版 Anchor 和 Web Authenticator 都通过它们创建账户。Greymass 的付费产品继续自行支付 RAM，因此每个被赠送的账户都是免费账户。

每个免费账户获得 4,000 字节。加上系统为每个持有 RAM 的账户提供的 1,400 字节，账户共有 5,400 字节，其中最简账户使用 2,996 字节，为所有者留下约 2,400 字节用于代币余额和其他数据行。这高于 VP-0001 建议的 3,000 字节。加上 136 字节的开销，每次赠送消耗 4,136 字节额度，因此该额度每天可覆盖约 63 个账户。

所请求的额度为每天 262,144 字节（256 KiB），即 VP-0001 的默认值。在截至 2026-10-17 的 90 天内，`gm` 创建了 1,331 个账户，日均 14.8 个，峰值 29 个，其中 91% 获得了 3,000 字节的 `giftram`。这些数字合计了免费账户和付费账户，因此是免费账户创建量的上限。按每个账户 4,136 字节计算，峰值当天将使用 119,944 字节，不到额度的一半。

## 真实用户

`gm` 只向免费账户赠送 RAM。iOS 和 Android 版 Anchor 以及 Web Authenticator 在用户通过 Google 或 Apple 登录后发放免费账户，Greymass 由此获得该账户的电子邮件地址。Greymass 的服务器只保存该地址的 SHA-256 哈希，从不保存地址本身，并拒绝为已创建过免费账户的哈希再创建第二个免费账户。由于地址来自身份提供方，第二个免费账户需要第二个 Google 或 Apple 账户，因此电子邮件地址是该上限所依据的标识符，客户端无法伪造。Greymass 不设 IP 地址限制，也不使用验证码。

账户名为 12 个字符或以 `.gm` 结尾。Sextant 拒绝以 `eosio` 开头的名称、敏感词列表中的名称，以及包括 `vaulta` 在内的约 40 个保留名称。它不进行相似性检查或批量模式检查。

## 交易结构

Sextant 在一笔交易中创建每个账户：先是由 `gm` 签名的顶层 `eosio::newaccount`，随后是同样由 `gm` 签名的顶层 `gift.vaulta::giftacct(gm, account, 4000, "")`。`gm` 只为自己创建的账户提供资金，不会为其他方签署的 `newaccount` 签署 `giftacct`。

在创建每个账户之前，Sextant 读取 `gift.vaulta` 的 config 以及 `gm` 在 `creators` 中的数据行，只有在计划已启用且赠送量不超过当前窗口剩余额度时才使用 `giftacct`。否则，以及当链拒绝一笔赠送交易时，Sextant 使用 `gm` 自己的 `giftram` 创建账户，因此在额度用尽、计划被停用或 `gm` 被暂停之后，用户仍然可以注册。

一个请求永远不会两次消耗额度。赠送与账户在同一笔交易中创建，因此只有在该名称被创建时才会扣除额度，而一个名称只能被创建一次。Sextant 从待处理到不可逆全程跟踪每个账户，推送失败时将其回退，并且只有在账户关联之后才消耗用户的票据。其最终性任务会重新广播同一笔已签名交易，并将已存在的账户视为成功。

## 自我交易

Greymass 通过不使用 gift 合约的产品创建其自身、员工和合作伙伴的账户，因此这些账户从不动用捐赠资金。对于免费产品，Greymass 不会在没有电子邮件地址的情况下发放票据。

## 问责

Sextant 创建的每个账户都会发布到 Greymass 员工阅读的 Slack 频道，每小时运行的监控任务会在 `gm` 的代币余额或 RAM 不足时向 Greymass 发出警报。创建速率不会触发警报。每日额度将激增限制在 256 KiB 以内。

Greymass 可以清除其免费产品上的 gift 合约设置来停止赠送，无需等待区块生产者，此后 Sextant 从下一个账户起使用 `gm` 自己的 RAM 付费。如果为 `gm` 签名的密钥遭到泄露，Greymass 通过一次由 `gm@owner` 签名的 `updateauth` 替换该密钥并清除同一设置，整个过程只需几分钟。

## 测试网演示

Sextant 的生产流程在 Jungle 4 测试网上通过交易 `a9c6c2b5323b67fe9d415d0d4dad433b888db69db97f788a2a4f28c1fbc4b3d0`（区块 292,934,156，2026-10-19）创建了 `foijhpiz3.gm`。该交易包含一个顶层 `newaccount` 和一个顶层 `gift.gm::giftacct(gm, foijhpiz3.gm, 4000, "")`，两者均由 `gm@active` 签名；合约发送了 4,000 字节的内联 `giftram`，并从 `gm` 的额度中扣除了 4,136 字节。在 Jungle 4 上，gift 合约运行于 `gift.gm`，构建自第二次安全审查所审阅的提交，该提交与 VP-0001 固定的提交构建出相同的 `gift.wasm`。

在 `gm` 被暂停期间，Sextant 创建的下一个账户 `phkfktgax.gm` 在交易 `3fe180b02f57a0c263341f5f5d9eeeb11feeb0a73e28cf09c538d10e19754d83` 中从 `gm` 自己的 RAM 获得了 4,000 字节的 `giftram`，`gm` 的额度使用量没有变化。

## 待解决问题

无。

## 后续步骤

1. 区块生产者审阅本申请。
2. Greymass 广播携带 `gift.vaulta` 上 `addcreator(gm, 262144)` 的 msig，并将本提案作为其第一个操作引用。其第二个操作 `eosio.assert::require` 会在 `gift.vaulta` 未安装 gift 合约的 ABI 时失败，因此在 VP-0001 的实施部署该合约之前尝试执行会失败，msig 保持开放。在 msig 执行之前，`gm` 注册该操作所要求的 `eosio.assert` 清单。
3. 区块生产者批准；21 位中有 15 位批准后，任何人都可以执行它。
4. Greymass 在其免费产品上设置 gift 合约，`gm` 开始赠送。
