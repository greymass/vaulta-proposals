---
lang: zh
source: 5b597a35ccc1b57ebd6eab2df426a388340c7895
---

# gift 合约安全审查

本文档汇总了两轮安全审查的发现，审查对象是 VP-0001 部署到 `gift.vaulta`（一个持有 RAM 捐赠资金的网络所有账户）的 `gift` 合约，以及赋予八名 BP 按创建者停止、赋予十一名 BP 全计划停止的权限设计。审查工作由 Anthropic 的 Claude Mythos、Fable 和 Opus 完成：它们发现问题，用测试展示每个问题，并重新运行每个测试以确认、修正或驳回每项发现。两轮审查均未发现严重或高危问题。两轮共发现两个中危问题、十一个低危问题和十五个信息性问题，每一项都已在提案文本、实施步骤或运营规则中关闭，或已按本文给出的理由接受。两个中危问题都位于权限设计中：第一个由实施中的 `limitauthchg` 步骤关闭，第二个是十一名 BP 对抗八名 BP 时所能做之事的限制，提案对此已作说明。请先阅读摘要表，再阅读两个中危问题的章节。

## 审查执行者

三个最大的 Claude 模型完成了审查工作。Claude Mythos、Fable 和 Opus 担任发现者：每个模型负责一个攻击角度，针对未修复的代码编写测试以展示每项发现，并将每条未经测试的线索移交给后续轮次。Mythos 还协调每一轮并汇总发现。Fable 和 Opus 担任驳证者：每个模型负责一组发现，重新运行每个测试，重新阅读每一行被引用的代码并重新计算每项成本，然后确认、修正或驳回该发现。Claude Sonnet 收集链上实时数据，建立了文本所作声明的列表，并重新运行了现有的测试套件。没有任何发现仅依赖 Sonnet 的工作。

Greymass 撰写了 VP-0001 和 gift 合约，并执行了两轮审查，因此两轮审查都不独立于作者。欢迎 BP 由网络出资进行进一步审查，任何团队都可以审查合约源代码。

## 审查测试的内容

| | 第 1 轮 | 第 2 轮 |
|---|---|---|
| 日期 | 2026-10-17 | 2026-10-19 |
| 合约提交 | `a23b756` | `a9a9a59`，VP-0001 锁定其代码 |
| 自上一轮以来的合约变更 | | `suspend`、`resume`、1,972 字节的额度下限 |
| 权限设计 | 一个链接到 `disable` 的紧急（break-glass）权限 | `halt`（11/21）链接到 `disable` 和 `resume`，`suspend`（8/21）链接到 `suspend`，二者均受 `limitauthchg` 限制 |
| 文本 | 提案的权限设计 | 提案第 4 版修订、FAQ、创建者模板及其 README，按审查开始时它们所处的哈希读取 |
| 展示发现的测试 | 80 个：32 个在合约模拟器中，48 个在 Spring C++ 测试器中 | 73 个：21 个在模拟器中，52 个在 Spring 测试器中 |
| 发现 | 1 个中危、7 个低危、5 个信息性 | 1 个中危、4 个低危、10 个信息性 |

两轮审查都针对 Vaulta 主网运行的系统合约进行，即 `VaultaFoundation/system-contracts` 的 `9edc8bc`，其合约文件与 v3.10.0 版本相同，该版本由 2025-07-15 的 Vaulta 过渡 MSIG 部署到 `eosio`，运行于 Spring v1.0.5。第 2 轮还测试了真实的 `eosio.msig`、`eosio.wrap` 和 `eosio.assert` 代码。锁定的构建为 `gift.wasm` sha256 `27ed7ecee18f1a81ec7e9ed4aeacdd76de6e1431f66eb62d363067480ddd3072`（20,977 字节）和 `gift.abi` sha256 `17d1ccd52f99782cee42a619dd02cd75c9567d1f716969334ec7f7cf7fbc07f8`，使用 Antelope CDT 4.1.1 通过 `make build/gift/production` 构建，在 macOS 和 Linux 上构建出相同的字节。

账户 `gift.vaulta` 在主网上不存在，因此每轮都按提案描述的方式在 Spring 测试链上构建它：`owner` 和 `active` 由 BP 的 15/21 控制，`active` 带有合约的 `eosio.code`，加上该轮设计的子权限，然后是代码、ABI 和 `enable`。第 2 轮完全按照两个实施 MSIG 构建该账户。本文档中关于权限的每一项陈述都是在该链上测得的。两轮审查都将该账户命名为 `ram.vaulta`，VP-0001 此后将其更名为 `gift.vaulta`。合约在运行时读取自身的账户名，因此没有任何发现依赖于该名称。

攻击者可以是任意一组普通账户、单独行动的一个已注册创建者，或单独行动的一名 BP。15/21 BP、`eosio.wrap` 和系统合约是受信任的。持有 `halt` 和 `suspend` 的 BP 在提案为其规定的权限范围内受信任，因此针对任一群体的发现报告的是设计允许该群体在该规定之外所能做的事。没有向任何链广播任何内容。以 EOS 计的数字使用该发现所属轮次日期的 RAM 价格：2026-10-17 为每 KiB 0.346930 EOS，2026-10-19 为每 KiB 0.346854 EOS。

本文档所列的文本修正是在第 2 轮读取第 4 版修订之后对其作出的，因此下文引用的句子可能已不再出现在提案中。

## 摘要

| 编号 | 标题 | 严重程度 | 轮次 | 关闭方式 |
|---|---|---|---|---|
| M1 | 八名 BP 可以对抗十一名 BP，使某个创建者保持暂停 | 中危 | 2 | 提案文本和运营规则 |
| M2 | 停止权限可以将捐赠资金锁定在权限对象中 | 中危 | 1 | 实施（`limitauthchg`） |
| L1 | 八名 BP 可以在一个 MSIG 中停止所有创建者，而计划仍显示为已启用 | 低危 | 2 | 提案文本 |
| L2 | 已批准的 `giftacct` MSIG 提案可以由陌生人使用其自己的密钥执行 | 低危 | 2 | 提案文本和创建者指引 |
| L3 | 之后的升级若追加表字段而不使用 `binary_extension`，会使旧行无法读取 | 低危 | 2 | 运营规则 |
| L4 | 提案将合约源代码锁定在候选版本以外的提交上 | 低危 | 2 | 提案锁定 |
| L5 | 停止权限可以改写自身的授权结构及其链接 | 低危 | 1 | 实施（`limitauthchg`） |
| L6 | 仅由停止权限签名的停止操作会计费到未质押的 `gift.vaulta` | 低危 | 1 | 实施（停止操作通过 `eosio.msig` 执行） |
| L7 | 停止操作集签期间的暴露量比文本所述多一个额度 | 低危 | 1 | 提案文本 |
| L8 | 通过 `giftram` 发送到 `gift.vaulta` 的 RAM 会被锁定 | 低危 | 1 | 提案文本和运营规则 |
| L9 | 捐赠资金在账户自身用量处耗尽，此时 `addcreator` 失败 | 低危 | 1 | 提案文本和运营规则 |
| L10 | 计划账户初始没有 NET 或 CPU | 低危 | 1 | 提案文本 |
| L11 | `giftacct` 可作为内联操作被接受 | 低危 | 1 | 作为设计接受 |
| I1 | 置于 `setcode` 之前的 `enable` 会成功并使计划保持关闭 | 信息性 | 2 | 实施构建器 |
| I2 | 预备的 `disable` 提案可以被任何账户执行并消耗 | 信息性 | 2 | 运营规则 |
| I3 | 在一个交易中对同一新账户进行两次赠送会向创建者多扣额度 | 信息性 | 2 | 已接受 |
| I4 | 账户的启动用量为 216,918 字节，文本表述为约 200 KB | 信息性 | 2 | 提案文本 |
| I5 | 授权变更必须由其在 `authorized_by` 中指名的权限授权 | 信息性 | 2 | 提案文本 |
| I6 | 交易扫描在链的交易大小上限下完成 | 信息性 | 2 | 已接受 |
| I7 | 系统合约每次赠送发送两条通知，每次返还发送两条 | 信息性 | 2 | 已接受 |
| I8 | 创建者模板的 MSIG 命令输出的是试运行 | 信息性 | 2 | 创建者模板 |
| I9 | 文本引用了单独的审查和测试数量但未给出出处 | 信息性 | 2 | 本文档 |
| I10 | 两个模拟器测试对链会拒绝的序列进行断言 | 信息性 | 2 | 已接受（测试框架） |
| I11 | 新链上的第一笔赠送比额度计入的多计费 112 字节 | 信息性 | 1 | 已接受（仅限测试网） |
| I12 | 模拟器测试证明合约逻辑，链上声明依赖 Spring 测试器 | 信息性 | 1 | 测试框架 |
| I13 | 新受赠者的资源行可能在赠送到达之前被清除 | 信息性 | 1 | 已接受 |
| I14 | 对 `gift.vaulta` 设置受管 RAM 上限会使其上限与余额脱钩 | 信息性 | 1 | 运营规则 |
| I15 | `sellram` 对卖方的代币余额行计费 | 信息性 | 1 | 已接受 |

## 测试摘录

中危发现以及由一系列交易产生的低危发现，各自附有展示该问题的 Spring 测试器用例摘录。每段摘录都裁剪到展示该行为的步骤，去掉了准备步骤，并标明其测试名称。完整测试可应要求向 Greymass 索取。摘录使用以下辅助函数：

- `enact()` 通过两个实施 MSIG 构建 `gift.vaulta`，并有 21 名已投票的 BP。
- `propose(p, trx)`、`approve(p, n)` 和 `exec(p, account)` 分别发起 `eosio.msig` 提案 `p`、由 `n` 名 BP 批准该提案、以及从 `account` 执行该提案。
- `pass(p, trx, n, first)` 发起提案，从编号为 `first` 的 BP 开始由 `n` 名 BP 批准，然后执行；未给出 `n` 时使用 15。
- `gp(halt)`、`gp(susp)` 和 `ga()` 分别为 `gift.vaulta@halt`、`gift.vaulta@suspend` 和 `gift.vaulta@active`。
- `expect_fail(f, message)` 要求 `f` 以 `message` 失败。
- `stranger` 是一个在 `gift.vaulta` 上不持有任何批准和任何权限的账户。
- `gift_trx(giftee, bytes)` 是一个交易，包含创建者对 `giftee` 的 `newaccount` 及其 `bytes` 字节的 `giftacct`。
- 在第 1 轮中，`bg_push(...)` 发送一个仅由单一紧急权限签名的交易，`native(...)` 构建一个原生权限操作。

## 中危

### M1：八名 BP 可以对抗十一名 BP，使某个创建者保持暂停

提案将 `suspend` 赋予任意八名 BP，将 `resume` 赋予任意十一名 BP。第 2 轮将其解读为：八名 BP 可以让某个创建者保持暂停“直到十一名 BP 同意恢复它”，以及“一个少数群体不能撤销另一个少数群体的暂停”。合约只拒绝对已处于暂停状态的创建者执行 `suspend`（`contracts/gift/src/gift.cpp:90`），且不保存任何过去暂停的记录，因此在任何 `resume` 之后，同样的八名 BP 都可以批准并执行一次新的 `suspend`。在测试链上，新的 `suspend` 与 `resume` 在同一个交易中执行，因此一个有争议的创建者可能永远看不到一个它能够赠送的区块。

`eosio.msig` 上的批准本身没有有效期，且提案在执行失败后仍然存在（`contracts/eosio.msig/src/eosio.msig.cpp:56`、`:223-237`）。因此八名 BP 可以一次性批准多个 `suspend` 提案，任何账户都可以在每次 `resume` 之后执行下一个。这样的提案也会作用于在其被批准之后才获得准入的创建者。反之亦然：预备了 `resume` 提案的十一名 BP 可以撤销每一次 `suspend`。

结束有争议的暂停需要 15/21 BP，而任意 15/21 都至少包含这八名中的两名。持久的补救办法是：在 `authorized_by` 设为 `active` 的情况下更改 `suspend` 权限的授权结构或阈值，或者由投票者改变 BP 排程，此后离开前 21 名的批准者不再计数。删除该权限并以相同名称重新创建会使每个现存提案重新生效，因为 Spring 按名称解析权限。通过 `eosio.wrap` 使这八名 BP 的批准失效会清除他们预备的提案，同时作废这些 BP 在链上持有的所有其他批准。

没有任何捐赠资金字节被转移，被暂停的创建者仍可以为自己的账户购买 RAM。这八名 BP 剥夺的是创建者的补贴：按默认额度每天 262,144 字节计算，约 88.8 EOS。每个现存提案花费其发起者 852 字节 RAM，在执行或取消时返还。

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

关闭方式：提案文本和运营规则，无代码变更。提案说明：只要任意八名 BP 持续批准新的 `suspend`，暂停就会持续；十一名 BP 的 `resume` 只维持到下一次 `suspend`；两个群体之间的争议通过更改 `suspend` 权限以 15/21 解决。运营规则要求：停止 MSIG 设置短有效期，监视 `eosio.msig` 中指名 `gift.vaulta` 的现存提案，退役子权限时改用新名称，并将 `eosio.wrap` 失效操作视为在所有地方作废被失效 BP 的批准。曾考虑并否决了在 `suspend` 和 `resume` 上加入按创建者计的版本号：它会作废在上一次状态变化之前批准的提案，而对持续批准的八名 BP 毫无作用。

### M2：停止权限可以将捐赠资金锁定在权限对象中

第 1 轮针对当时设计中的单一紧急权限发现了这一问题，第 2 轮确认该修复对设计中的两个子权限 `halt` 和 `suspend` 都有效。链接限制普通操作所需的权限。而链对原生权限操作（`updateauth`、`deleteauth`、`linkauth`、`unlinkauth`）则依据权限树进行检查，并且一个权限可以在自身之下创建子权限（Spring `libraries/chain/authorization_manager.cpp:341-347`）。链将新权限的对象及其授权结构计费给拥有它的账户（`libraries/chain/eosio_contract.cpp:315-323`），因此一个仅链接到 `disable` 的停止权限仍然可以创建由 `gift.vaulta` 付费的权限对象。

在 Spring 测试器上，新权限每个等待项花费 `gift.vaulta` 16 字节 RAM，一次达到链 65,536 项授权上限的 `updateauth` 锁定了 1,048,864 字节，整个 1,000,000,000 字节的初始注资可在约 950 个这样的交易中被耗尽，链的区块限制允许在约 95 秒内完成。这些 RAM 留在账户上，任何人都无法出售。在 15/21 BP 删除这些垃圾权限（约一千个 `deleteauth` 操作）之前，每个创建者的赠送都会失败，而 `enable` 不会解除锁定。其影响是整个计划无法提供服务，约 338,800 EOS 的 RAM 在清理之前无法被赠送。若该权限由单个 BP 持有，此问题将为高危；设计将两个子权限都交给 BP 群体，因此为中危。

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

关闭方式：实施。`vp1deploy` 的最后一个授权步骤是 `eosio::limitauthchg(gift.vaulta, [owner, active], [])`。从此以后，`gift.vaulta` 上的每个 `updateauth`、`deleteauth`、`linkauth` 和 `unlinkauth` 都必须携带值为 `owner` 或 `active` 的 `authorized_by`，子权限的尝试会在任何 RAM 被计费之前中止。第 2 轮表明这一点对通过 `eosio.msig` 和 `eosio.wrap` 使用的 `halt` 和 `suspend` 均成立。此后 `gift.vaulta` 上的每个 15/21 授权变更，包括通过 `eosio.wrap` 执行的变更，都将 `authorized_by` 设为 `active` 或 `owner`（见 I5）。

## 低危

### L1：八名 BP 可以在一个 MSIG 中停止所有创建者，而计划仍显示为已启用

`suspend` 每个操作作用于一个创建者，而一个 MSIG 可以携带的操作数量没有限制，因此八名 BP 可以在一个交易中暂停所有已注册的创建者。提案将全计划停止保留给十一名 BP，通过 `disable` 执行，并由十五名 BP 通过 `enable` 撤销。按创建者暂停的途径在八名 BP 时就能达到相同状态，需十一名 BP 才能撤销，而合约的 `enabled` 标志仍显示为 true。在某个创建者准入之前批准的 `suspend` 可在 `addcreator` 之后的下一个区块执行。没有捐赠资金字节被转移；影响为每天已注册额度的总和，一个默认额度的创建者约为 88.8 EOS。

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

关闭方式：提案文本。提案说明八名 BP 可以暂停任意一个或全部创建者，并说明客户端需同时读取每个创建者的 `suspended` 字段和 `enabled` 标志来判断赠送是否在运行；锁定提交中的合约 README 描述了 `suspended` 字段。

### L2：已批准的 `giftacct` MSIG 提案可以由陌生人使用其自己的密钥执行

创建者已批准的 `eosio.msig` 提案是创建者发送 `giftacct` 的途径之一。合约要求创建者的授权，以及由任何人发起的、针对所指名账户的顶层 `newaccount`（`gift.cpp:100`、`:120`），而 `eosio.msig::exec` 只要求执行者的授权。提案内部的 `newaccount` 是内联的，永远无法满足合约的检查，因此在每一笔通过 MSIG 途径的赠送中，发送执行操作的账户负责写入 `newaccount` 并选择密钥。看到已批准提案的陌生人可以在一个交易中用自己的密钥创建所指名的账户并执行赠送：赠送落到陌生人的账户上，创建者的额度被扣减，创建者的客户失去该名称。每笔这样的赠送向创建者扣除 3,136 字节，约 1.06 EOS，而陌生人的成本不到 0.01 EOS。捐赠资金的支出恰好等于创建者所批准的数额，且没有任何已准入或正在申请的创建者使用 MSIG 途径。

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

关闭方式：提案文本和创建者指引。提案和创建者模板说明：使用 MSIG 途径的创建者在一个交易中发送最后一个批准、`newaccount` 和执行操作，或者只赠送某个后缀下的名称，且该后缀的所有者自己签署顶层 `newaccount`。两种防御都已在测试链上得到验证。代码层面的替代方案，即将赠送绑定到 `newaccount` 的签名者，或拒绝内联 `giftacct`，都会推翻提案所述的设计（见 L11）。

### L3：之后的升级若追加表字段而不使用 `binary_extension`，会使旧行无法读取

合约的两个表都在不使用 `binary_extension` 的情况下追加字段（`contracts/gift/include/gift/gift.hpp:22-26`、`:30-39`）。CDT 在返回一行之前会读取整行，因此按早期布局写入的行在后期布局下无法反序列化。为创建者行追加字段的升级会使在其之前准入的每个创建者的 `giftacct`、`setquota`、`suspend`、`resume` 和 `rmcreator` 回滚。为配置行追加字段的升级会使 `disable`、`enable` 和每笔赠送回滚，因此十一名 BP 的停止操作与赠送一同失效。两种情况都以安全关闭的方式失败，不转移任何 RAM。主网注册表起始为空，因此没有启动时的行暴露于此问题。Jungle 4 原型在从锁定构建重新部署之前，已用旧代码移除了其唯一一个旧布局的行。

```cpp
// SEC_2026_10_19_B14_upgrade_with_appended_config_field_breaks_the_stop
pass("upgrade"_n, make_trx({setcode_act(UPG_WASM), setabi_act(UPG_ABI, ga())}));
propose("d1"_n, make_trx({disable_act(gp(halt))}));
approve("d1"_n, 11);
expect_fail([&] { exec("d1"_n); }, "datastream attempted to read past the end");
gift_fails(c1, "giftee111111"_n, "datastream attempted to read past the end");
```

关闭方式：适用于每次升级的运营规则。之后的每次模式（schema）变更都使用 `binary_extension` 或附带迁移，且升级 MSIG 以对每个表执行一次保持状态的操作结束（计划开启时先 `disable` 再 `enable`，计划关闭时先 `enable` 再 `disable`，以及对一个创建者按其自身额度执行 `setquota`），从而使模式破坏导致整个升级回滚。

### L4：提案将合约源代码锁定在候选版本以外的提交上

第 2 轮发现提案将合约源代码链接到提交 `d103fdce`，这是落后于候选版本十四个提交的祖先提交，不含启用标志、额度下限、暂停功能或 README。候选版本 `a9a9a59` 当时不在任何公开分支上。实施中的 `setcode` 携带的是字节，因此错误的锁定改变的是 BP 能够验证的内容，而从未改变部署的内容。

关闭方式：锁定。`a9a9a59` 已推送，提案将其代码锁定在 `6fad4b0`（该提交只修改 README），并给出 WASM 和 ABI 哈希、工具链和构建目标。Jungle 4 原型运行相同的字节。

### L5：停止权限可以改写自身的授权结构及其链接

在与 M2 相同的链规则下，停止权限可以轮换自己的密钥并驱逐共同持有者，将其链接重新指向自己选择的权限，或移除链接使该操作恢复为 15/21（`authorization_manager.cpp:395-404`、`:417-429`）。其影响范围止于其链接的操作和自身子树：`enable`、注册表操作和内联赠送仍需 `active`，子权限永远无法满足。后果是丧失紧急停止能力。

```cpp
// SEC_2026_10_17_D1_breakglass_reaches_native_permission_actions
bg_push(native(bgp(), updateauth{gift, "child"_n, bg, authority(get_public_key(gift, "child"))}));
bg_push(native(bgp(), linkauth{gift, gift, "disable"_n, "child"_n}));   // re-points disable
bg_push(native(bgp(), updateauth{gift, bg, config::active_name, authority(get_public_key(gift, "rotated"))}));
expect_fail([&] { bg_push(gift_act("disable"_n, {bgp()})); }, "signatures");   // old key locked out
```

关闭方式：实施中的 `limitauthchg` 步骤，同 M2。

### L6：仅由停止权限签名的停止操作会计费到未质押的 `gift.vaulta`

`gift.vaulta` 不持有 CPU 或 NET。新账户的 NET 上限起始为零（`contracts/eosio.system/src/eosio.system.cpp:660`），链将交易计费给其第一个授权者（`libraries/chain/transaction_context.cpp:173-174`）。一个仅携带停止权限的 `disable` 以 `transaction net usage is too high: 96 > 0` 失败，使计划在需要停止的时刻仍处于启用状态。

```cpp
// SEC_2026_10_17_D3_lone_breakglass_disable_billed_to_unstaked_account
bg_push(gift_act("disable"_n, {bgp()}));               // throws tx_net_usage_exceeded
BOOST_REQUIRE(enabled());
push_signed({gift_act("disable"_n, {{alice, config::active_name}, bgp()})}, {get_private_key(alice, "active"), bgkey()});
BOOST_REQUIRE(!enabled());                             // a funded first authorizer pays
```

关闭方式：实施设计。`halt` 和 `suspend` 由 `eosio.prods@prod.major` 和 `eosio.prods@prod.minor` 持有，并通过 `eosio.msig` 使用，因此执行提案的账户支付交易的 CPU 和 NET。

### L7：停止操作集签期间的暴露量比文本所述多一个额度

创建者的额度窗口在其第一笔赠送时开启，并在至少 24 小时后的第一笔赠送时重置（`contracts/gift/src/gift.cpp:98-101`）。攻击者持有密钥 D 秒期间，在停止生效之前可以花费 `Q × (ceil(D / 86,400) + 1)` 字节，因为密钥被盗时已经开启的窗口会额外增加一个额度。按 256 KiB 默认值和五天的 MSIG 计算，为 1,572,864 字节，约 533 EOS。

关闭方式：提案文本，其中给出了 `(days the msig takes + 1) × quota` 公式和这一数字。

### L8：通过 `giftram` 发送到 `gift.vaulta` 的 RAM 会被锁定

通过 `eosio::giftram` 发送到 `gift.vaulta` 的 RAM 会成为 `gift.vaulta` 持有的一笔赠送，而系统合约阻止被赠送的字节流出（`contracts/eosio.system/src/delegate_bandwidth.cpp:272-273`），因此计划无法将其再赠送出去。在耗尽时以这种方式发送的补充注资只能恢复 L9 所述的尾部，之后创建者的赠送便以 `insufficient quota` 失败。将其返还需要一个由 `gift.vaulta` 签署的 15/21 `ungiftram`，且在同一交易中先执行一个转入 `gift.vaulta`、覆盖其用量的 `ramtransfer`。陌生人向 `gift.vaulta` 进行的小额 `giftram` 会使该账户不再能接受其他赠送方的赠送，但对计划没有任何影响。

```cpp
// SEC_2026_10_17_R2_1_giftram_refill_at_exhaustion
BOOST_REQUIRE_EQUAL(success(), giftram(stranger, gift, 500'000, "refill sent with the wrong action"));
{ auto t = gift_trx(g2, Rx); push_transaction(t); }    // only the old balance can still be gifted
{ auto t = gift_trx(g3, 1596);
  BOOST_REQUIRE_EXCEPTION(push_transaction(t), eosio_assert_message_exception, eosio_assert_message_is("insufficient quota")); }
```

关闭方式：提案文本和运营规则。每一笔转入 `gift.vaulta` 的 RAM，无论是初始注资还是之后的任何补充，都使用 `ramtransfer`。初始注资来源 `admin.grants` 在其历史上只通过 `ramtransfer` 转移过 RAM。

### L9：捐赠资金在账户自身用量处耗尽，此时 `addcreator` 失败

`gift.vaulta` 用其所赠送的 RAM 支付自身的代码、ABI、权限和注册表行。能够成功的最大一笔赠送等于其余额加上 1,400 免费字节，减去其用量和 136 字节的行开销（`delegate_bandwidth.cpp:323`，Spring `resource_limits.cpp:248`）。下一笔赠送以 `account gift.vaulta has insufficient ram` 失败，错误中指名的是计划账户。在锁定构建下测得的启动用量为 216,918 字节，因此捐赠资金中有 215,654 字节（约 73 EOS）永远无法被赠送。在该状态下 `addcreator` 也会失败，因为它会添加一个由 `gift.vaulta` 付费的行，而 `disable`、`enable`、`suspend`、`resume`、`setquota` 和 `rmcreator` 仍可正常工作。

```cpp
// endowment_last_bytes_fail_on_ram_vaulta_usage
const int64_t headroom = ram_bytes(gift) + 1400 - ram_usage(gift);
auto whole = [&]() { return push({newaccount_action(alice, g1), giftacct_action(alice, g1, bytes0)}, {alice}); };
BOOST_REQUIRE_EXCEPTION(whole(), ram_usage_exceeded, fc_exception_message_contains("insufficient ram"));
push({newaccount_action(alice, g1), giftacct_action(alice, g1, headroom - 136)}, {alice});   // the largest gift that lands
BOOST_REQUIRE_EQUAL(ram_usage(gift), ram_bytes(gift) + 1400);
```

关闭方式：提案文本，其中给出了公式和错误信息，以及一条运营规则：当捐赠资金接近耗尽时，补充注资 MSIG 先于任何准入 MSIG 执行。

### L10：计划账户初始没有 NET 或 CPU

在本计划下创建的账户持有被赠送的 RAM，NET 和 CPU 上限起始为零（`eosio.system.cpp:660`），因为赠送只提高 RAM 上限。一旦创建者、钱包或任何其他方为其质押、为其执行 powerup 或作为第一授权者付费，其所有者即可进行交易。返还赠送也需要账户自身约 1,600 字节的 RAM，因为赠送离开后，账户的占用必须容纳在其 1,400 免费字节加上其自有 RAM 之内。通过 15/21 `eosio.wrap` 交易进行的强制返还，只有在同一交易先给该账户 1,596 字节时才能成功；对于一笔 3,000 字节的赠送，它可收回创建者额度被扣除的 3,136 字节中的 1,540 字节。

关闭方式：提案文本，见「赠送如何运作」一节、「回收」条目和「仅支持全额返还」限制。

### L11：`giftacct` 可作为内联操作被接受

合约要求创建者的授权（`gift.cpp:86`），并在任意深度读取顶层交易（Spring `libraries/chain/webassembly/cf_transaction.cpp:6-17`），因此它接受以内联方式发送的 `giftacct`：通过创建者已批准的 `eosio.msig` 提案、通过持有创建者 `eosio.code` 权限的合约，以及通过 15/21 的 `eosio.wrap::exec`。第 1 轮将文本理解为描述的是顶层操作，并提出了一行检查来拒绝内联调用者。在每种途径中，捐赠资金支付的都不超过创建者的额度。

关闭方式：将内联 `giftacct` 作为设计接受。提案和合约 README 说明：`giftacct` 可以顶层或内联方式发送；创建者对在其授权下进行的每笔赠送负责，无论是通过密钥、已批准的 MSIG 还是已部署的合约；索引器需读取内联追踪。`newaccount` 仍必须是顶层操作，从而将内联创建的账户排除在计划之外。L2 是唯一需要进一步指引的后果。

## 信息性

- **I1.** 在 `setcode` 之前发往 `gift.vaulta` 的 `enable` 不会运行任何处理程序并且会成功，因此一个 `enable` 顺序错误的部署 MSIG 会执行成功，并使计划保持禁用状态，直到再一次 15/21 的 `enable`。`vp1deploy` 构建器将 `enable` 放在最后，运营者在 MSIG 执行后读取 `enabled` 标志。
- **I2.** 预备了 `disable` 提案的十一名 BP 可以在一个区块之后撤销每一次 15/21 的 `enable`。由于 `disable` 在计划已经禁用时也会成功，任何账户都可以先执行每个现存的 `disable` 来消耗全部储备，此后的下一次 `enable` 就能维持。运营者在 `enable` 之前，在一个交易中执行现存的 `disable` 提案。
- **I3.** 当两个创建者，或一个创建者两次，在一个交易中向同一个新账户赠送时，每次调用都会被扣除 136 字节的行开销，而系统合约只保留一行。创建者被多扣额度，而捐赠资金的支出永远不会超过额度所记录的数量。已接受：创建者没有理由对一个账户赠送两次。
- **I4.** 提案给出的 `gift.vaulta` 启动用量约为 200 KB。在锁定构建下测得为 216,918 字节，其中代码占 209,770 字节；第一个创建者准入增加 253 字节，之后每个增加 141 字节。提案的公式是准确的，该数字已被替换。
- **I5.** 此后 `gift.vaulta` 上的每个授权变更都必须携带值为 `owner` 或 `active` 的 `authorized_by`，并且系统合约还要求该变更由同一权限授权（`contracts/eosio.system/src/limit_auth_changes.cpp:39-40`），因此以 `active` 授权却指名 `owner` 的变更会失败。该规则以安全关闭的方式失败，提案说明了这一配对关系。
- **I6.** 合约对创建交易的扫描在 1,000,247 字节的压缩交易（即链的上限）下完成。大型交易只会让发送它的账户付出成本。已接受。
- **I7.** 系统合约每次赠送通知 `gift.vaulta` 两次（`giftram`、`logramchange`），每次返还也通知两次（`ungiftram`、`logramchange`）。合约没有声明通知处理程序，因此这些通知没有效果，受赠者的返还总能完成。锁定提交中的 README 只提到 `giftram` 和 `ungiftram`。已接受。
- **I8.** 创建者模板的 MSIG 命令省略了 `--broadcast` 标志，因此按原文执行的命令只输出一次试运行。模板已带有该标志。
- **I9.** 提案和 FAQ 称 `suspend` 和 `resume`“已单独审查”，但未给出出处，FAQ 的测试数量描述的是第 1 轮，却未指明其提交。提案现在引用本文档，本文档在第 2 轮中涵盖了 `suspend` 和 `resume`，FAQ 不再描述这些审查。
- **I10.** 两个模拟器测试对链在执行被断言的检查之前就会拒绝的序列进行断言，因为模拟器中替代的系统合约不创建账户；另有一个以禁用状态的计划命名的管理测试从未调用 `disable`。它们所指的性质在链上成立，并由 Spring 测试器用例展示。作为测试框架问题接受。
- **I11.** 在没有任何账户持有被赠送 RAM 的链上，第一笔赠送还要为存储赠送记录的系统表支付 112 字节，因此 `gift.vaulta` 的用量增加 248 字节，而额度只计入 136 字节。Vaulta 主网的该表已经持有超过 7,000 笔赠送，因此每笔主网赠送恰好计费 136 字节。测试网运营者在第一笔赠送时会看到 248 字节。
- **I12.** 合约的单元测试在一个无法从合约代码创建账户、也不强制执行 RAM 上限的模拟器中运行，因此它们证明的是交易扫描、额度计算和输入检查。依赖链的声明（赠送只能到达同一交易所创建的账户；1,596 字节是能完成单密钥账户的最小赠送；受赠者在持有足够自有 RAM 后可以返还其赠送；陌生人的赠送无法在创建交易中落地）在 Spring 测试器上得到展示。唯一一个依赖测试顺序的模拟器测试已被修复，61 个单元测试逐一运行均通过。
- **I13.** 创建者可以在创建交易内清空新受赠者的资源行（先 `delegatebw` 再 `undelegatebw`），之后赠送会重新创建该行并计费给受赠者。最终状态与普通赠送相同。已接受。
- **I14.** 对 `gift.vaulta` 执行 15/21 的 `setacctram` 会固定其链上 RAM 上限，使其不再跟随余额变化；赠送仍然能够落地，受赠者的上限仍然准确。运营规则使 `gift.vaulta` 保持非受管状态。
- **I15.** `sellram` 对卖方的代币余额行计费，首次出售时为 240 字节，因此同时持有被赠送 RAM 和自有 RAM 的受赠者在一个操作中最多可以出售其自有 RAM 减去 240 字节。`ramtransfer` 和 `ramburn` 转移的恰好是其自有字节。这是 `sellram` 和 `eosio.token` 的特性。已接受。

## 审查的局限

M2 的耗尽时间是在一台四核测试主机上测得的；主网 BP 执行 65,536 项 `updateauth` 和一千个 `deleteauth` 恢复操作所需的 CPU 是推导得出的，并未实际运行。M1 中八名与十一名 BP 之间的对抗通过 `eosio.msig` 运行，另有一次作为直接共同签名的交易运行。前批准者重新进入前 21 名时现存提案的行为，是根据相同的代码行推理得出的。L2 针对单密钥创建者和双方创建者进行了测试。L9 和 I4 中的启动用量数字使用锁定构建的 WASM 大小，会随之后任何 `setcode` 而变化。审查没有重新构建主网的 `eosio.msig` 以确认其与所审查的源代码一致。Jungle 4 部署、账户创建索引器、创建者的客户端软件、`fund.wram`、治理流程以及各翻译版本都不在两轮审查范围内，也没有进行主网试运行。
