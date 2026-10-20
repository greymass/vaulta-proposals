---
lang: zh
source: a3ded3e797611d03d9914c411702d5cd6ffca966
translator: Claude (agent translation)
excerpt: 获批的创建者可动用网络所有的账户 gift.vaulta 持有的 RAM 捐赠资金，向自己创建的账户赠送 RAM，从而无需承担 RAM 成本即可为用户开通账户。系统启动时没有任何已注册的创建者，每个创建者都通过各自的 15/21 BP MSIG 获得准入。
revisions:
    - version: 1
      date: 2026-08-02
      summary: 初稿。
    - version: 2
      date: 2026-08-26
      summary: 列明账户权限，将初始注资固定为 1,000,000,000 字节，披露耗尽情形，关闭待解决问题，并更新固定的提交。
    - version: 3
      date: 2026-08-27
      summary: 新增 enabled 标志及其紧急停止权限，设定额度下限，并说明 newaccount 的签名者不必是付费的创建者。
    - version: 4
      date: 2026-10-19
      summary: 将账户更名为 gift.vaulta，新增 halt 与 suspend 权限，设定 256 KiB 的默认额度，并新增创建者申请。
msigs:
    - step: 1
      title: 创建 gift.vaulta 账户并为其购买 4,096 字节 RAM
    - step: 2
      title: 为 gift.vaulta 注资，创建并关联其 halt 与 suspend 权限，限制其权限变更，部署 gift 合约并启用
---

# 网络出资的账户开通
[English](proposal.md) | [한국어](proposal.ko.md) | [中文](proposal.zh.md)

## 摘要

本计划让钱包和应用免费、即时地为其用户提供 Vaulta 账户。每个新账户所需的 RAM 由网络所有的捐赠资金赠送，因此钱包或应用无需为此付费。任何钱包或应用都可以申请成为创建者，区块生产者以各自独立的 15/21 MSIG 逐一准入，并为每个创建者设定每日字节额度（默认 256 KiB），以限制其可赠送的量。

本提案请求区块生产者批准两个 15/21 MSIG。二者共同创建账户 `gift.vaulta`，从 `admin.grants` 向其转入 1,000,000,000 字节 RAM（按 2026-10-17 的价格约值 338,800 EOS），并部署一个合约，让获批的创建者将这些 RAM 赠送给他们创建的账户。`admin.grants` 是原基金会账户，持有用网络资金购买的 RAM。被赠送的 RAM 永远不会进入市场：接收方既不能出售也不能转让，其唯一的退出途径是返还给 `gift.vaulta`，后者可以再次赠送。针对该合约及其权限的两次[安全审查](documents/security-review.md)均未发现严重或高危问题。计划启动时没有任何创建者。[问答](documents/faq.md)涵盖本计划对 RAM 价格、`fund.wram` 以及账户批量注册（account farming）的影响。

## 理由

- **免费账户**：一个空账户占用 2,996 字节 RAM，其中 1,400 字节免费，因此创建者至少需要购买 1,596 字节，按 2026-10-17 的价格约 0.54 EOS；按本提案建议的 3,000 字节计算约 1.0 EOS。被准入为创建者的钱包或应用可以立即免费为其用户提供账户，费用由 `admin.grants` 中持有的网络所有 RAM 支付。
- **市场中立**：无论创建者还是接收方，都无法出售被赠送的 RAM，因此它永远不会重新进入 RAM 市场，大规模创建账户也无法变现为代币。创建者仍可能将其额度导向自己控制的账户并将这些 RAM 用作存储，而每日额度限制了这种情况的发生速度。
- **按实际创建量计算的成本**：截至 2026-10-17 的 90 天内，Vaulta 上共创建了 11,082 个账户；若这些账户全部通过本计划创建，按每个账户实际获得的 RAM 加上 136 字节开销计算，本计划将花费 28.4 MB，即初始注资的 2.8%。

## 实施

实施包括两个 MSIG，各为 15/21，由 Greymass 提出并按顺序执行：

1. `vp1create` 通过 `eosio::newaccount` 创建 `gift.vaulta`，并为其购买 4,096 字节 RAM，由 `eosio` 付费。
2. `vp1deploy` 在 `gift.vaulta` 存在后提出，通过 `ramtransfer` 从 `admin.grants` 转入 1,000,000,000 字节的初始注资，创建 `halt` 与 `suspend` 权限并关联其操作，执行 `limitauthchg`，设置合约代码和 ABI，最后执行 `enable`。

两者均在 `msigs` 中声明为 `planned` 条目，由本提案的 `msig/index.ts` 构建，并各自以 180 天的有效期提出。

合约为 [`contracts/gift`](https://github.com/greymass/vaulta-contracts/tree/6fad4b08cebfc922b80d09f86cb2590505c22a06/contracts/gift) 处的源代码，提交为 `6fad4b08cebfc922b80d09f86cb2590505c22a06`，该提交与第二次安全审查所读取的提交 `a9a9a59` 之间仅 README 不同。使用 Antelope CDT v4.1.1 通过 `make build/gift/production` 构建该提交，会生成一个 20,977 字节、sha256 为 `27ed7ecee18f1a81ec7e9ed4aeacdd76de6e1431f66eb62d363067480ddd3072` 的 `gift.wasm`，以及一个 sha256 为 `17d1ccd52f99782cee42a619dd02cd75c9567d1f716969334ec7f7cf7fbc07f8` 的 `gift.abi`。`vp1deploy` 设置的正是该代码，其设置的二进制 ABI 的 sha256 为 `4f39f95e9c4d7d0efb65407ea599f4336656b5075d3d72b3447289b8107590ab`，即 `vp1deploy` 执行后链上为 `gift.vaulta` 报告的 ABI 哈希。任何拥有 Docker 和 `make` 的人都可以复现这些字节：在该提交下，`make build/gift/production` 会在一个包含官方 CDT 4.1.1 发布包的容器内构建，并将 `gift.wasm` 和 `gift.abi` 写入 `contracts/gift/build/`。同一构建已在 Jungle 4 测试网的 `gift.gm` 上运行。

Greymass 对合约和权限设计进行了两次安全审查，分别针对提交 `a23b756` 和固定的提交。Anthropic 的 Claude Mythos、Fable 和 Opus 发现了这些问题并用测试演示了每一个问题，Fable 和 Opus 重新运行了每项测试，以确认、修正或驳回每项发现。Greymass 编写了合约并主持了两次审查，因此两次审查都不独立于作者。两次审查均未发现严重或高危问题，每项发现都已在本提案的正文、实施步骤或运营规则中关闭，或在说明理由后被接受。[安全审查](documents/security-review.md)列出了全部发现。欢迎区块生产者从网络出资进行进一步审查，任何团队都可以在固定的提交处审查源代码。

## 赠送如何运作

创建者在一笔交易中创建账户并向其赠送 RAM：

1. `eosio::newaccount`，由按照常规高级名称规则拥有新名称后缀的账户签名（`gm` 创建 `foo.gm`）。
2. `gift.vaulta::giftacct(creator, account, bytes, memo)`，由创建者签名。合约检查创建者及其额度，然后从 `gift.vaulta` 向新账户发送一笔 `bytes` 字节的内联 `eosio::giftram`。

合约仅接受向同一交易中由顶层 `newaccount` 创建的账户进行的赠送，因此本计划只能触及新账户，由合约代码创建或在 msig `exec` 内创建的账户无法获得赠送（`giftacct` 本身可以以内联方式到达；参见「技术说明」）。合约不检查谁签署了 `newaccount`。因此，只要某个后缀的所有者签名，创建者就可以为该后缀下的名称提供资金，即使它并不拥有该后缀；一个创建者也可以针对同一份额度使用任意数量的后缀：注册为 `gm` 且同时拥有 `jm` 的创建者，以 `jm` 身份签署 `newaccount`、以 `gm` 身份签署 `giftacct` 来创建 `bob.jm`，该赠送扣减 `gm` 的额度。

能创建账户的最小赠送为 1,596 字节，因为一个空账户占用 2,996 字节，而账户一旦持有任何 RAM，系统就会额外提供 1,400 字节免费额度。创建者应至少赠送 3,000 字节，这同时覆盖账户自身的 EOS 和 A 代币余额（240 和 241 字节）以及首次 REX 质押（489 字节），还余约 434 字节。每笔赠送的大小由创建者选择，创建者也可以赠送更多，例如足以容纳某个应用自身状态的量。

新账户初始没有 NET 或 CPU，因为赠送只提高其 RAM。创建者像对待自己创建的任何账户一样，为其用户质押、执行 powerup 或代付交易。

### 额度

每个创建者有一个每日字节额度，每笔赠送从中扣减赠送字节数加 136 字节，即系统合约就每个受赠者向赠送方计费的那一行，在合约中为固定常数。因此额度限制的是捐赠资金的实际支出。

- 新准入创建者的默认额度为每天 262,144 字节（256 KiB）：按最小赠送约 150 个账户，按 3,000 字节约 83 个账户。截至 2026-10-17 的 90 天内，Vaulta 上最繁忙的稳定账户创建者 `pcash` 单日最多创建 59 个账户，按其每个 1,600 字节加 136 字节计算，将用掉 102,424 字节额度；`gm` 单日最多创建 29 个、每个 3,000 字节，将用掉 90,944 字节。表明有更大需求的创建者在申请中请求更大的额度，此后的任何调整都是一项 15/21 的 `setquota`。
- 额度必须至少为 1,972 字节：一笔 1,836 字节的赠送（可创建一个空账户，并留出容纳一个自身代币余额的空间）加 136 字节。
- 创建者的 24 小时窗口从其第一笔赠送开始，并在 24 小时或更久之后的第一笔赠送时重置，以整秒计。因此创建者可以在一个出块间隔内花掉两份完整额度，一份在重置之前，一份在重置之后。
- 不存在跨创建者的上限。本计划单日最多可花费的量是所有额度之和，而这一数值只有在区块生产者准入创建者或提高额度时才会增长，两者均需 15/21。
- 移除后重新准入创建者，会重置其当前窗口的用量并清除任何暂停状态，而 `setquota` 两者都保留。
- 当某笔赠送将超出剩余额度，或计划已停用、创建者已被暂停时，创建者以传统方式创建账户，并通过 `buyrambytes` 或其自身的 `giftram` 自行支付 RAM，使其用户的注册得以继续。

### 合约操作

| 操作 | 权限 | 用途 |
|---|---|---|
| `giftacct(creator, account, bytes, memo)` | `creator` | 从 `gift.vaulta` 向同一交易中创建的账户赠送 `bytes`，并扣减创建者的额度 |
| `addcreator(creator, daily_quota_bytes)` | `gift.vaulta@active` (15/21) | 注册一个创建者并设定每日额度 |
| `rmcreator(creator)` | `gift.vaulta@active` (15/21) | 移除一个创建者 |
| `setquota(creator, daily_quota_bytes)` | `gift.vaulta@active` (15/21) | 调整创建者的额度 |
| `enable()` | `gift.vaulta@active` (15/21) | 允许已注册的创建者赠送 RAM |
| `disable()` | `gift.vaulta@halt` (11/21) | 停止所有赠送，并保留每一项注册 |
| `suspend(creator)` | `gift.vaulta@suspend` (8/21) | 停止某一创建者的赠送，并保留其注册 |
| `resume(creator)` | `gift.vaulta@halt` (11/21) | 解除创建者的暂停 |

合约维护一个 `enabled` 标志，部署时为关闭状态，因此在 `enable` 通过之前不会赠送任何 RAM。`giftacct` 先检查创建者的权限，再检查该标志，因此 `disable` 会同时停止所有创建者。被暂停创建者的赠送会失败。其注册、额度、用量和窗口起始时间保持不变，`resume` 使其可以再次赠送，`rmcreator` 则删除其记录行。每个创建者的额度、用量和 `suspended` 字段都公开在合约的 `creators` 表中，每笔赠送都是一个公开的 `giftacct` 操作。

## 捐赠资金

初始注资为 1,000,000,000 字节，通过 `ramtransfer` 从 `admin.grants` 转入。它占 `admin.grants` 在 2026-10-17 所持 2,812,891,144 字节 RAM 额度的三分之一以上；截至该日，`admin.grants` 已通过 `ramtransfer` 向其他账户转移 RAM 281 次。此后的每次补充也使用 `ramtransfer`，因为通过 `giftram` 发送给 `gift.vaulta` 的 RAM 会锁定在那里，无法再赠送出去。释放这类 RAM 需要一项 15/21 的 `ungiftram`，它会将整笔赠送返还给其赠送方。如果此后 `gift.vaulta` 自身的 RAM 不再能覆盖其超出 1,400 字节的用量，则同一交易会先通过 `ramtransfer` 向其发送这部分 RAM。

一个空账户需要约 1,600 字节的赠送，而为用户留出操作空间的创建者最多赠送约 3,300 字节，因此计入 136 字节开销后，初始注资可覆盖约 290,000 至 580,000 个账户。赠送越大，覆盖的账户越少：按 `signup.xsat` 通过 `giftram` 为其资助的每个账户提供的 6,144 字节计算，约为 159,000 个。按截至 2026-10-17 的 90 天内 Vaulta 全链所有创建者的创建量计算，初始注资可维持近九年。最坏情况是自我交易，即每个创建者每天都将全部额度花在自己控制的账户上：十个按 256 KiB 默认额度运行的创建者约 380 天即可耗尽初始注资，而区块生产者可以在此之前很早就暂停其中任何一个。

补充将是另一项 15/21 MSIG，根据其自身的理由单独决定。区块生产者也可以通过 `disable` 结束本计划，并通过从 `gift.vaulta` 发起的 15/21 `ramtransfer` 将其 RAM 返还给 `admin.grants`。该操作转移除以下两个数量中较大者之外的全部 RAM：覆盖 `gift.vaulta` 超出其 1,400 字节免费额度的自身用量的字节（其代码、ABI 和表，以及每笔未返还赠送对应的 136 字节记录行），或赠送给它的任何 RAM。此后返还的赠送会落入 `gift.vaulta`，再通过另一次 `ramtransfer` 转移。

额度限制每日的消耗，初始注资用尽后赠送即停止。`gift.vaulta` 为其自身的代码、ABI 和表付费，启动时为 216,918 字节，因此能够成功的最大赠送为 `gift.vaulta` 的 RAM 余额加上其 1,400 字节免费额度，再减去该用量和 136 字节开销，`gift.vaulta` 余额中有 215,654 字节永远无法赠送。大一个字节的赠送会以 `account gift.vaulta has insufficient ram` 失败。届时每个创建者的赠送都会同时停止，因此一个创建者的支出可能终止另一个创建者的服务。`addcreator` 也会失败，因为新的注册表记录行需要 RAM，而 `disable`、`enable`、`suspend`、`resume`、`setquota` 和 `rmcreator` 仍可正常运行。

## 成为创建者

准入需要一项通过的 15/21 BP MSIG，其中携带 `addcreator(creator, daily_quota_bytes)`，且其第一个操作是链接到该创建者申请的 `msigmessager::message`。

申请可以在任何地方发布。建议将其作为创建者 VP 提交到 `greymass/vaulta-proposals` GitHub 仓库，因为 VP 为区块生产者提供可审阅的永久文档，并为 msig 提供引用依据；该仓库的 `template/creator/` 中包含申请表和一个 `addcreator` msig 构建器。每份申请都须回答六个必填部分：

1. **身份**：拟注册的账户及其运营者。
2. **用途与额度**：将调用 `giftacct` 的产品、计划为每个账户赠送的字节数及其理由、预期创建量中免费与付费的比例，以及所请求的每日额度和当前创建量的证据。
3. **真实用户**：终端用户必须出示什么，以及创建者的服务器如何验证；按每人、每台设备、每个 IP 地址和每天施加的上限，以及每项上限所依据的标识符；如何处理别名身份和一次性身份；以及所执行的命名规则。
4. **交易结构**：顶层 `eosio::newaccount` 之后紧跟 `giftacct`；`giftacct` 如何发送（由创建者的密钥签名、通过其批准的 msig 发送，或由其部署的合约发送；若为合约，谁可以调用它，以及对这些调用者有何限制）；创建者是否为由第三方签署 `newaccount` 的账户提供资金；如何保证重试的幂等性，使一个请求永远不会两次消耗额度；以及创建者如何为超出其额度的账户付费。
5. **自我交易**：如何将运营者自身、员工和合作伙伴的账户与被赠送的 RAM 隔离开。
6. **问责**：在创建量异常时触发的警报、创建者自身的停止机制，以及其对签名密钥泄露的应对措施和所需时间。

每位区块生产者根据申请对这些部分的回答进行评判。

建议提供一笔 Jungle 4 交易，展示创建者的生产流程调用 `giftacct`。固定提交处 gift 合约的 [README](https://github.com/greymass/vaulta-contracts/blob/6fad4b08cebfc922b80d09f86cb2590505c22a06/contracts/gift/README.md) 即为集成指南，并附有一个完整的交易示例。

额度提升或重新准入使用一份简短的变更请求，可在任何地方发布，并从其 msig 的第一个操作中链接：包括原申请的链接、当前额度和请求额度、准入以来的用量、理由，以及任何有变化的回答。重新准入还需补充导致移除的原因以及已修复的内容。降低额度、暂停创建者和恢复创建者无需变更请求。

## 停止创建者或计划

`gift.vaulta@active` 的两个子权限让较少数量的区块生产者即可停止赠送，每个子权限都通过 `eosio::linkauth` 绑定到各自的操作：

- `gift.vaulta@halt` 只有一个权限条目 `eosio.prods@prod.major`（21 名生产者中的 11 名），关联到 `disable` 和 `resume`。
- `gift.vaulta@suspend` 只有一个权限条目 `eosio.prods@prod.minor`（21 名生产者中的 8 名），关联到 `suspend`。

两者都通过 `eosio.msig` 使用，这是 `prod.major` 和 `prod.minor` 的签名方式，因此执行停止操作的账户支付其 CPU 和 NET。`active`（15/21）可以运行任何操作，而 `enable`、`addcreator`、`rmcreator` 和 `setquota` 需要它。

- **暂停单个或全部创建者**：八名区块生产者可以暂停任何创建者，一个为每个创建者各携带一个 `suspend` 的 msig 可以停止所有创建者。在该 msig 收集批准期间，密钥泄露的创建者可花费 `(days the msig takes + 1) × quota`，因为已经开启的窗口会额外增加一份额度：按默认额度和五天的 msig 计算，为 1,572,864 字节（约 1.5 MiB），属于已接受的损失。创建者被暂停期间，`enabled` 标志仍为 true，因此客户端需同时读取创建者的 `suspended` 字段和 `enabled`，以判断该创建者的赠送能否执行。
- **停用计划**：十一名区块生产者可以 `disable` 整个计划。以 `enable` 重新启动需要 15/21。
- **移除创建者**：通过 15/21 的 `rmcreator` 移除恶意或已停止运营的创建者，`setquota` 用于降低额度。由于额度不能低于 1,972 字节，停止单个创建者的方式是 `suspend` 和 `rmcreator`。
- **创建者密钥泄露**：创建者自行更换密钥，即可立即驱逐攻击者，其注册保持不变。
- **少数派停止**：快速停止机制也让少数派能够维持停止状态。只要任意八名区块生产者持续批准新的 `suspend`，暂停就会持续：十一名生产者执行的 `resume` 只能维持到下一个 `suspend` 执行为止，而后者可能在同一个区块内执行；并且任何账户都可以执行这八名生产者事先批准的 `suspend` 提案，包括针对在其批准之后才被准入的创建者。储备了 `resume` 提案的十一名区块生产者同样可以撤销每一个 `suspend`。两组之间的争议以 15/21 解决，方法是更改 `suspend` 权限的权限设置或关联，并将 `authorized_by` 设为 `active`（参见「账户权限」）。21 名中的任意 15 名至少包含这八名中的两名，因此八名区块生产者联合行动也可以阻止该更改，此时这种维持状态会在投票者改变生产者排程时结束。七名区块生产者可以通过拒绝批准 `enable`，使已停用的计划保持关闭。区块生产者接受这一点，以换取无需等待完全共识的停止机制。
- **回收**：赠送只能通过 `ungiftram` 离开账户，该操作会将整笔赠送返还给 `gift.vaulta`，且仅在账户持有自己的 RAM 后才可进行（参见「已知限制」）。区块生产者可以通过 `eosio.wrap` 以 15/21 的 `ungiftram` 强制返还，但同一 msig 必须先向该账户提供这部分 RAM。对于向空账户进行的 3,000 字节赠送，需补充 1,596 字节，因此网络收回该赠送所花费 3,136 字节中的 1,540 字节，而账户持有者最终拥有其账户所占用的 1,596 字节。对批量注册的账户强制返还，会让批量注册者获得由其自己拥有的 RAM 支撑的账户，因此本计划在创建者层面应对滥用，而在停止生效之前已赠送并被占用的每个字节都将保持已花费状态。

计划运行期间无需任何 msig。区块生产者在创建者加入、请求更多额度或行为不当时采取行动：每次准入一项 15/21 msig，每次额度提升一项。任何区块生产者或社区成员都可以通过「赠送如何运作」中所述的公开记录监督不当行为。

## 账户权限

- `owner` 和 `active` 都委托给 `eosio.prods@active`，后者解析为 15/21 BP 共识。`active` 还包含 `gift.vaulta@eosio.code`，因此合约可以以自身权限发送其内联 `giftram`。`owner` 不包含它，因此合约代码永远无法驱动该账户的最高权限。
- `gift.vaulta` 是一个普通的非特权账户。`giftram` 只要求赠送方的权限，合约不调用任何特权宿主函数。本提案不要求对 `eosio.system` 进行任何修改。
- 创建者在 `gift.vaulta` 上不持有任何权限。它们是合约注册表中的记录行，由 MSIG 通过管理操作进行管理。
- `vp1deploy` 的最后一个权限步骤是 `eosio::limitauthchg(gift.vaulta, [owner, active], [])`。关联（link）限制的是普通操作所需的权限，而原生权限操作仍保持开放，因此若没有这一步，任一子权限都可以更改自身的权限、重新关联其操作，或创建由 `gift.vaulta` 付费的更多权限。有了这一步，`gift.vaulta` 上的每一项 `updateauth`、`deleteauth`、`linkauth` 和 `unlinkauth` 都必须携带值为 `owner` 或 `active` 的 `authorized_by`，并由其所指名的权限授权，否则系统合约将拒绝：由 `active` 授权却指名 `owner` 的更改会失败。这将 `halt` 和 `suspend` 限制在其关联的操作内，并适用于此后每一次 15/21 权限变更，包括通过 `eosio.wrap` 执行的变更。
- 区块生产者可以通过一项 15/21 MSIG 将本计划的治理移交给另一机构，该 MSIG 更改 `gift.vaulta` 的 `owner` 和 `active` 权限；如果停止机制也随之移交，则同时更改 `halt` 和 `suspend` 权限。合约只检查 `gift.vaulta` 自身的权限，因此无需更改。

## 运营规则

区块生产者以及为其组装 msig 的人遵守以下规则，[安全审查](documents/security-review.md)援引这些规则作为关闭其发现的依据：

- 每次向 `gift.vaulta` 的转入都使用 `ramtransfer`，且 `gift.vaulta` 保持非托管状态：不对其使用 `setacctram` 固定 RAM 上限，否则该上限将不再跟随其余额变化。
- `disable`、`suspend` 和 `resume` 的 msig 设置较短的有效期，区块生产者监视 `eosio.msig` 中指名 `gift.vaulta` 的未决提案。
- 执行 `enable` msig 的账户先在同一交易中执行每一个未决的 `disable` 提案，使其中没有一个留下来撤销该启用。任何设置代码或 `enabled` 标志的 msig 执行后，其提出者读取该标志。
- `gift.vaulta` 的子权限退役时，后续权限改用新名称。删除一个子权限后再以相同名称重新创建，会使在旧权限下批准的每个提案重新生效，因为 Spring 按名称解析权限。
- 通过 `eosio.wrap` 使某个区块生产者的批准失效，会作废该生产者在链上持有的所有批准，因此区块生产者将其作为全链范围的行为加以权衡。
- 每次更改表结构的合约升级都使用 `binary_extension` 或附带迁移，且每个升级 msig 都以对每张表的状态保留操作结束：计划开启时先 `disable` 再 `enable`，计划关闭时先 `enable` 再 `disable`，并以某一创建者自身的额度对其执行 `setquota`。这样一旦出现结构破坏，整个升级就会回滚。
- 一旦捐赠资金接近耗尽，补充 msig 先于任何准入 msig 执行。

## 技术说明

- **`giftacct` 的发送途径**：`giftacct` 可以作为顶层操作或内联操作发送：由创建者的密钥、由创建者批准的 `eosio.msig` 提案、由持有 `creator@eosio.code` 的创建者合约，或由区块生产者以 15/21 通过 `eosio.wrap::exec` 发送。每种途径都扣减所指名创建者的额度，因此创建者对以其权限进行的每笔赠送负责。任何账户都可以执行已批准的 msig 提案（包括 `eosio.wrap` 提案），而执行它的账户写入顶层 `newaccount` 并选择新账户的密钥，因此使用 msig 途径的创建者在一笔交易中发送最后一项批准、`newaccount` 和执行，或者只为由后缀所有者自行签署 `newaccount` 的名称进行赠送。
- **索引**：索引器所需的每个字段都是 `giftacct` 的显式输入，无论通过哪种途径发送，它都会指名创建者。索引器既从交易自身的操作中读取 `giftacct`，也从内联 trace 中读取，并且需要内联 trace 来核对 RAM 余额，因为 `giftram` 是以内联方式发送的。`newaccount` 记录的 `creator` 指名的是签名者，它可能与支付额度的创建者不同，因此捐赠资金的支出从 `giftacct` 读取。
- **向同一账户的两次赠送**：同一交易中针对同一账户的第二个 `giftacct` 会再次被计入 136 字节，尽管系统合约只保留一行，因此额外的计费只会高估支出。
- **无恶意干扰**：创建交易之外的任何人都无法抢先向新账户赠送，本计划也无法触及已有账户。`gift.vaulta` 无法被阻断：其他方向它发起的 `giftram` 只会增加被锁定的 RAM，且合约没有通知处理器，因此它从不拒绝受赠方的返还。
- **验证**：已对照 Spring 源码以及 v3.10.0 版本的系统合约进行核查，该版本由 2025-07-15 的 Vaulta 转换 msig 部署到 `eosio`，并与每处引用所链接的提交一致。`giftram` 只要求赠送方的权限（[`delegate_bandwidth.cpp`](https://github.com/VaultaFoundation/system-contracts/blob/9edc8bcfd128f382ae11b88655d958d07f5230d2/contracts/eosio.system/src/delegate_bandwidth.cpp#L164-L165)），合约通过 `eosio.code` 以内联方式满足这一要求；`giftram` 还检查接收方是否存在，这由交易中先执行的 `newaccount` 保证。新账户的 RAM 在交易结束时检查（Spring [`transaction_context::finalize`](https://github.com/AntelopeIO/spring/blob/e6a99f68b67abc4d89fe716755b2e1394a4991f7/libraries/chain/transaction_context.cpp#L386-L409)），因此内联赠送可覆盖该账户的占用，这与 `newaccount` 加 `buyrambytes` 所依赖的机制相同。1,400 字节免费额度即系统的 [`ram_gift_bytes`](https://github.com/VaultaFoundation/system-contracts/blob/9edc8bcfd128f382ae11b88655d958d07f5230d2/contracts/eosio.system/include/eosio.system/eosio.system.hpp#L75)。136 字节的记录行开销已在主网交易 `f2c6200c1add5ffc74837bcae1731ff5a66e259376eee6a4d4d7580f044a0b4c` 中确认，其中一笔 3,000 字节的赠送恰好向赠送方计费 136 字节。

## 利益披露

Greymass 撰写了本提案和 gift 合约，并运营 `gm`，即 Anchor 和 Greymass 账户门户背后的账户创建服务。截至 2026-10-17，Greymass 不在前 30 名区块生产者之列，因此不签署任何准入 msig，包括其自身的准入 msig。Greymass 打算按「后续步骤」所述为 `gm` 申请成为创建者。

## 范围边界

- 赠送仅在账户创建时发生，并由合约强制执行，因此创建者无法为已有账户补充 RAM。
- 本计划服务于已注册的创建者，由网络承担 RAM。自助式付费账户创建为 `new.vaulta`（[VP-0002](../vp-0002-account-creation/proposal.md)）。

## 已知限制

- **每个账户仅限一个赠送方**：系统合约在任一时刻只允许每个账户有一个 RAM 赠送方。在本计划下创建的账户，在全额返还网络的赠送之前，无法接收其他方（例如某个应用）的 `giftram`。自行购买 RAM 或通过 `ramtransfer` 接收 RAM 不受影响。
- **仅支持全额返还**：`ungiftram` 会返还整笔赠送。受赠方只有在持有覆盖其超出 1,400 字节用量的自有 RAM，以及签署返还所需的 NET 和 CPU 后，才能返还其赠送。

## 待解决问题

无。

## 后续步骤

1. Greymass 提出 `vp1create`。该步骤在其执行时完成。
2. Greymass 在 `gift.vaulta` 存在后提出 `vp1deploy`。该步骤在其以 `enable` 作为最后一个操作执行时完成。
3. Greymass 发布 `gm` 的创建者申请。其准入 MSIG 只能在 `vp1deploy` 之后执行。
4. 其他创建者按「成为创建者」所述提出申请，每个创建者由各自的 15/21 MSIG 准入。
