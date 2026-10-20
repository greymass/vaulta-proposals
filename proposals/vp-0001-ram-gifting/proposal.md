---
vp: VP-0001
title: Network-Funded Account Onboarding
standard: VPS-1
status: Review
authors:
    - Aaron Cox (Greymass)
created: 2026-08-02
accounts:
    - gift.vaulta
    - admin.grants
    - eosio.prods
    - eosio.wrap
    - eosio
msigs:
    - status: planned
      title: Create the gift.vaulta account and buy it 4,096 bytes of RAM
    - status: planned
      title: Seed gift.vaulta, create and link its halt and suspend permissions, limit its authority changes, deploy the gift contract and enable it
sentiment: []
requires: []
documents:
    - documents/faq.md
    - documents/security-review.md
revisions:
    - version: 1
      date: 2026-08-02
      summary: Initial draft.
    - version: 2
      date: 2026-08-26
      summary: Named the account authorities, fixed the seed at 1,000,000,000 bytes, disclosed exhaustion, closed the open questions, repointed the pin.
    - version: 3
      date: 2026-08-27
      summary: Added the enabled flag and its break-glass permission, set a quota floor, and stated the newaccount signer need not be the paying creator.
    - version: 4
      date: 2026-10-19
      summary: Renamed the account gift.vaulta, added halt and suspend permissions, set a 256 KiB default quota, added the creator application.
excerpt: Approved creators draw on a RAM endowment held by the network-owned account gift.vaulta to gift RAM to accounts they create, onboarding users without carrying the RAM cost. The system launches with no registered creators, and each creator is admitted by its own 15/21 BP MSIG.
---

# Network-Funded Account Onboarding
[English](proposal.md) | [한국어](proposal.ko.md) | [中文](proposal.zh.md)

## Summary

This program lets wallets and applications give their users Vaulta accounts free and instantly. The RAM each new account needs is gifted from a network-owned endowment, so the wallet or app pays nothing for it. Any wallet or app can apply to become a creator, and producers admit each one with its own 15/21 MSIG and a daily byte quota, 256 KiB by default, that caps what it can gift.

Producers are asked to approve two 15/21 MSIGs. Together they create the account `gift.vaulta`, move 1,000,000,000 bytes of RAM (worth about 338,800 EOS at the 2026-10-17 price) to it from `admin.grants`, and deploy a contract that lets approved creators gift that RAM to the accounts they create. `admin.grants` is the former Foundation account, holding RAM bought with network funds. Gifted RAM never reaches the market: a recipient cannot sell or transfer it, and its only exit is a return to `gift.vaulta`, which can gift it again. Two [security reviews](documents/security-review.md) of the contract and its permissions found no critical or high issue. The program launches with no creators. [Questions and answers](documents/faq.md) covers the program's effect on RAM price, `fund.wram`, and account farming.

## Rationale

- **Free accounts**: A bare account uses 2,996 bytes of RAM, 1,400 of them free, so whoever creates it buys at least 1,596 bytes, about 0.54 EOS at the 2026-10-17 price, or about 1.0 EOS for the 3,000 bytes this proposal recommends. A wallet or app admitted as a creator gives its users accounts free and at once, paid from network-owned RAM held in `admin.grants`.
- **Market neutrality**: Nobody can sell gifted RAM, creator or recipient, so it never re-enters the RAM market and mass account creation cannot be turned into tokens. A creator could still direct its quota into accounts it controls and use the RAM as storage, and the daily quota caps how fast that can happen.
- **Cost at observed volume**: If every one of the 11,082 accounts created on Vaulta in the 90 days to 2026-10-17 had been created through this program, at the RAM each actually received plus the 136-byte overhead, the program would have spent 28.4 MB, which is 2.8% of the seed.

## Enactment

Enactment is two MSIGs, each 15/21, proposed by Greymass and executed in order:

1. `vp1create` creates `gift.vaulta` with `eosio::newaccount` and buys it 4,096 bytes of RAM paid by `eosio`.
2. `vp1deploy`, proposed once `gift.vaulta` exists, transfers the 1,000,000,000-byte seed from `admin.grants` with `ramtransfer`, creates the `halt` and `suspend` permissions and links their actions, runs `limitauthchg`, sets the contract code and ABI, and ends with `enable`.

Both are declared as `planned` `msigs` entries and built by this proposal's `msig/index.ts`, and each is proposed with a 180-day expiration.

The contract is the source at [`contracts/gift`](https://github.com/greymass/vaulta-contracts/tree/6fad4b08cebfc922b80d09f86cb2590505c22a06/contracts/gift), commit `6fad4b08cebfc922b80d09f86cb2590505c22a06`, which differs from `a9a9a59`, the commit the second security review read, only in its README. Built with Antelope CDT v4.1.1 by `make build/gift/production`, that commit produces a 20,977-byte `gift.wasm` with sha256 `27ed7ecee18f1a81ec7e9ed4aeacdd76de6e1431f66eb62d363067480ddd3072` and a `gift.abi` with sha256 `17d1ccd52f99782cee42a619dd02cd75c9567d1f716969334ec7f7cf7fbc07f8`. `vp1deploy` sets that code, and the binary ABI it sets has sha256 `4f39f95e9c4d7d0efb65407ea599f4336656b5075d3d72b3447289b8107590ab`, the ABI hash the chain reports for `gift.vaulta` once `vp1deploy` executes. Anyone with Docker and `make` can reproduce these bytes: at that commit, `make build/gift/production` builds inside a container holding the official CDT 4.1.1 release package and writes `gift.wasm` and `gift.abi` to `contracts/gift/build/`. The same build runs on the Jungle 4 testnet at `gift.gm`.

Greymass ran two security reviews of the contract and the permission design, at commit `a23b756` and at the pinned commit. Anthropic's Claude Mythos, Fable and Opus found the issues and showed each one with a test, and Fable and Opus re-ran every test to confirm, correct or refute each finding. Greymass wrote the contract and ran both reviews, so neither is independent of the author. Neither found a critical or high issue, and every finding is closed in this proposal's text, its enactment steps or its operating rules, or accepted with its reason. The [security review](documents/security-review.md) lists every finding. Producers are welcome to fund a further review from the network, and any team can review the source at the pinned commit.

## How a gift works

A creator creates an account and gifts it RAM in one transaction:

1. `eosio::newaccount`, signed by whichever account owns the new name's suffix under the usual premium-name rules (`gm` creating `foo.gm`).
2. `gift.vaulta::giftacct(creator, account, bytes, memo)`, signed by the creator. The contract checks the creator and its quota, then sends an inline `eosio::giftram` of `bytes` from `gift.vaulta` to the new account.

The contract accepts a gift only for an account that a top-level `newaccount` in the same transaction creates, so the program reaches only new accounts, and accounts created by contract code or inside an msig `exec` cannot receive a gift (the `giftacct` itself may arrive inline; see Technical notes). It does not check who signed the `newaccount`. A creator can therefore fund names under a suffix it does not own when the suffix's owner signs, and one creator can use any number of suffixes against one quota: a creator registered as `gm` that also owns `jm` creates `bob.jm` by signing `newaccount` as `jm` and `giftacct` as `gm`, and the gift debits `gm`'s quota.

The smallest gift that creates an account is 1,596 bytes, because a bare account uses 2,996 bytes and the system adds 1,400 free bytes once an account holds any RAM. Creators should gift at least 3,000 bytes, which also covers the account's own EOS and A token balances (240 and 241 bytes) and a first REX stake (489 bytes) with about 434 bytes to spare. The creator chooses each gift's size and may gift more, for example enough for an app's own state.

A new account starts with no NET or CPU, since the gift raises only its RAM. A creator stakes, powers up or pays for its users' transactions as it does for any account it creates.

### Quota

Each creator has a daily byte quota, and each gift debits it by the gifted bytes plus 136 bytes, the row the system contract bills the gifter for each giftee, a fixed constant in the contract. The quota therefore bounds what the endowment actually spends.

- The default quota for a newly admitted creator is 262,144 bytes (256 KiB) a day: about 150 accounts at the smallest gift, or about 83 at 3,000 bytes. In the 90 days to 2026-10-17 the busiest steady account creator on Vaulta, `pcash`, created at most 59 accounts in a day, which at its 1,600 bytes each plus 136 would use 102,424 bytes of quota, and `gm` created at most 29 at 3,000 bytes each, which would use 90,944. A creator that shows a larger need asks for a larger quota in its application, and any later change is a 15/21 `setquota`.
- A quota must be at least 1,972 bytes: one 1,836-byte gift, which creates a bare account with room for one token balance of its own, plus 136.
- A creator's 24-hour window starts at its first gift and resets at its first gift 24 hours or more later, counted in whole seconds. A creator can therefore spend two full quotas within one block interval, one just before the reset and one just after.
- No cap applies across creators. The most the program can spend in a day is the sum of all quotas, which grows only when producers admit a creator or raise a quota, both at 15/21.
- Removing and re-admitting a creator resets its usage for the current window and clears any suspension, and `setquota` keeps both.
- When a gift would exceed the remaining quota, or the program is disabled or the creator suspended, the creator creates the account the classic way and pays for its RAM itself, by `buyrambytes` or its own `giftram`, so its users' sign-ups continue.

### Contract actions

| Action | Auth | Purpose |
|---|---|---|
| `giftacct(creator, account, bytes, memo)` | `creator` | Gift `bytes` from `gift.vaulta` to an account created in the same transaction, debiting the creator's quota |
| `addcreator(creator, daily_quota_bytes)` | `gift.vaulta@active` (15/21) | Register a creator with a daily quota |
| `rmcreator(creator)` | `gift.vaulta@active` (15/21) | Remove a creator |
| `setquota(creator, daily_quota_bytes)` | `gift.vaulta@active` (15/21) | Change a creator's quota |
| `enable()` | `gift.vaulta@active` (15/21) | Allow registered creators to gift RAM |
| `disable()` | `gift.vaulta@halt` (11/21) | Stop all gifting and keep every registration |
| `suspend(creator)` | `gift.vaulta@suspend` (8/21) | Stop one creator's gifting and keep its registration |
| `resume(creator)` | `gift.vaulta@halt` (11/21) | Lift a creator's suspension |

The contract keeps an `enabled` flag that is off at deployment, so it gifts nothing until `enable` passes. `giftacct` checks the creator's authority and then the flag, so `disable` stops every creator at once. A suspended creator's gifts fail. Its registration, quota, usage and window start are unchanged, `resume` lets it gift again, and `rmcreator` deletes its row. Each creator's quota, usage and `suspended` field are public in the contract's `creators` table, and every gift is a public `giftacct` action.

## Endowment

The seed is 1,000,000,000 bytes, transferred from `admin.grants` with `ramtransfer`. It takes over a third of the 2,812,891,144-byte RAM quota `admin.grants` held on 2026-10-17, and `admin.grants` had moved RAM to other accounts by `ramtransfer` 281 times by that date. Every later refill also uses `ramtransfer`, since RAM sent to `gift.vaulta` with `giftram` stays locked there and cannot be gifted on. Releasing such RAM takes a 15/21 `ungiftram`, which returns the whole gift to its gifter. If `gift.vaulta`'s own RAM would then no longer cover its usage beyond 1,400 bytes, the same transaction first sends it that RAM by `ramtransfer`.

A bare account needs about 1,600 gifted bytes and creators that leave users room to work give up to about 3,300, so with the 136-byte overhead the seed covers about 290,000 to 580,000 accounts. Larger gifts cover fewer: at the 6,144 bytes `signup.xsat` gives each account it funds with `giftram`, about 159,000. At the volume Vaulta saw in the 90 days to 2026-10-17, across every creator on the chain, it lasts nearly nine years. The worst case is self-dealing, where every creator spends its full quota every day on accounts it controls: ten creators at the 256 KiB default drain the seed in about 380 days, and producers can suspend any one of them well before that.

A refill would be a further 15/21 MSIG, decided on its own merits. Producers can also end the program with `disable` and return its RAM to `admin.grants` with a 15/21 `ramtransfer` from `gift.vaulta`. That moves everything except the larger of two amounts: the bytes covering `gift.vaulta`'s own usage beyond its 1,400 free bytes (its code, ABI and tables, and a 136-byte row for each outstanding gift), or any RAM gifted to it. Gifts returned later land in `gift.vaulta` and move with a further `ramtransfer`.

The quotas bound the daily drain, and gifting stops once the seed is spent. `gift.vaulta` pays for its own code, ABI and tables, 216,918 bytes at launch, so the largest gift that lands is `gift.vaulta`'s RAM balance plus its 1,400 free bytes, less that usage and the 136-byte overhead, and 215,654 bytes of `gift.vaulta`'s balance are never giftable. A gift one byte larger fails with `account gift.vaulta has insufficient ram`. Every creator's gifting then stops at once, so one creator's spending can end another's service. `addcreator` fails too, since a new registry row needs RAM, while `disable`, `enable`, `suspend`, `resume`, `setquota` and `rmcreator` keep working.

## Becoming a creator

Admission needs a passed 15/21 BP MSIG carrying `addcreator(creator, daily_quota_bytes)`, whose first action is a `msigmessager::message` linking the creator's application.

An application may be published anywhere. Filing it as a creator VP in the `greymass/vaulta-proposals` GitHub repository is recommended, since a VP gives producers a reviewable, permanent document and gives the msig its citation; that repository's `template/creator/` holds the application form and an `addcreator` msig builder. Every application answers six required sections:

1. **Identity**: the account to be registered and who operates it.
2. **Use and quota**: the products that will call `giftacct`, the bytes it plans to gift per account and why, the free and paid share of expected volume, and the requested daily quota with evidence of current creation volume.
3. **Real users**: what an end user must present and how the creator's server verifies it, the caps applied per person, device, IP address and day with the identifier each keys on, how aliased and disposable identities are handled, and the naming rules enforced.
4. **Transaction shape**: a top-level `eosio::newaccount` followed by `giftacct`; how `giftacct` is sent (signed by the creator's key, through an msig it approves, or by a contract it deploys, and for a contract who can call it and what bounds those callers); whether the creator funds accounts whose `newaccount` a third party signs; how retries stay idempotent so a request never spends quota twice; and how the creator pays for accounts above its quota.
5. **Self-dealing**: how the operator's own, staff and partner accounts are kept apart from gifted RAM.
6. **Accountability**: the alerts that fire on unusual volume, the creator's own stop, and its response to a compromised signing key and how long that takes.

Each producer judges an application on its answers to these sections.

A Jungle 4 transaction showing the creator's production flow calling `giftacct` is recommended. The gift contract's [README](https://github.com/greymass/vaulta-contracts/blob/6fad4b08cebfc922b80d09f86cb2590505c22a06/contracts/gift/README.md) at the pinned commit is the integration guide and carries a worked transaction.

A quota increase or a re-admission uses a short change request, published anywhere and linked from the first action of its msig: a link to the original application, the current and requested quota, usage since admission, the reason, and any changed answers. A re-admission adds what caused the removal and what has been fixed. Lowering a quota, suspending a creator and resuming one need no change request.

## Stopping a creator or the program

Two child permissions of `gift.vaulta@active` let smaller groups of producers stop gifting, each bound to its actions with `eosio::linkauth`:

- `gift.vaulta@halt` has the single authority entry `eosio.prods@prod.major` (11 of 21 producers) and is linked to `disable` and `resume`.
- `gift.vaulta@suspend` has the single authority entry `eosio.prods@prod.minor` (8 of 21 producers) and is linked to `suspend`.

Both are used through `eosio.msig`, which is how `prod.major` and `prod.minor` sign, so the account that executes a stop pays its CPU and NET. `active` (15/21) can run any action, and `enable`, `addcreator`, `rmcreator` and `setquota` need it.

- **Suspending one creator or all**: Eight producers can suspend any creator, and one msig carrying a `suspend` for each can stop every creator. While the msig gathers approvals, a creator whose key is compromised can spend `(days the msig takes + 1) × quota`, because the window already open adds one quota: at the default quota and a five-day msig, 1,572,864 bytes (about 1.5 MiB), an accepted loss. The `enabled` flag still reads true while creators are suspended, so a client reads a creator's `suspended` field together with `enabled` to tell whether that creator's gifts run.
- **Halting the program**: Eleven producers can `disable` the whole program. Restarting it with `enable` takes 15/21.
- **Removing a creator**: `rmcreator` at 15/21 removes a malicious or defunct creator, and `setquota` lowers a quota. Since a quota cannot go below 1,972 bytes, `suspend` and `rmcreator` are how a single creator is stopped.
- **Compromised creator keys**: The creator rotates its own keys, which evicts the attacker at once and leaves its registration intact.
- **Minority stops**: The fast stops also let a minority hold a stop in place. A suspension lasts while any eight producers keep approving a further `suspend`: a `resume` by eleven holds only until the next `suspend` executes, which can be in the same block, and any account can execute a `suspend` proposal the eight approved in advance, including against a creator admitted after they approved it. Eleven producers who stock `resume` proposals can likewise undo every `suspend`. A dispute between the two groups is settled at 15/21 by changing the `suspend` permission's authority or links, with `authorized_by` set to `active` (see Account authority). Any 15 of 21 includes at least two of the eight, so eight producers acting together can also block that change, and the hold then ends when voters change the producer schedule. Seven producers can keep a disabled program off by withholding approval of `enable`. Producers accept this in exchange for stops that do not wait for full consensus.
- **Recovery**: A gift leaves an account only through `ungiftram`, which returns the whole gift to `gift.vaulta`, once the account holds RAM of its own (see Known Constraints). Producers could force a return with a 15/21 `ungiftram` through `eosio.wrap`, but the same msig would have to give the account that RAM first. For a 3,000-byte gift to a bare account the top-up is 1,596 bytes, so the network gets back 1,540 of the 3,136 bytes the gift cost and the account holder ends up owning the 1,596 bytes its account occupies. Forcing returns from farmed accounts would hand the farmer accounts backed by RAM it owns, so the program answers abuse at the creator, and every byte gifted and occupied before a stop lands stays spent.

A running program needs no msigs. Producers act when a creator joins, asks for more, or misbehaves: one 15/21 msig per admission and one per quota increase. Any producer or community member can watch for misbehavior in the public record described in How a gift works.

## Account authority

- `owner` and `active` both delegate to `eosio.prods@active`, which resolves to 15/21 BP consensus. `active` also carries `gift.vaulta@eosio.code`, so the contract can send its inline `giftram` under its own authority. `owner` does not carry it, so the contract's code can never drive the account's highest authority.
- `gift.vaulta` is an ordinary, unprivileged account. `giftram` requires only the gifter's authority, and the contract calls no privileged host function. This proposal requires no change to `eosio.system`.
- Creators hold no permission on `gift.vaulta`. They are rows in the contract's registry, managed by MSIG through the admin actions.
- The last authority step of `vp1deploy` is `eosio::limitauthchg(gift.vaulta, [owner, active], [])`. A link restricts which permission an ordinary action needs and leaves the native permission actions open, so without this step either child permission could change its own authority, re-link its actions, or create further permissions billed to `gift.vaulta`. With it, every `updateauth`, `deleteauth`, `linkauth` and `unlinkauth` on `gift.vaulta` must carry an `authorized_by` of `owner` or `active` and be authorized by the permission it names, or the system contract rejects it: a change authorized by `active` that names `owner` fails. This confines `halt` and `suspend` to their linked actions and applies to every later 15/21 authority change, including any run through `eosio.wrap`.
- Producers can hand governance of the program to another body with one 15/21 MSIG that changes `gift.vaulta`'s `owner` and `active` authorities, and the `halt` and `suspend` permissions if the stops move too. The contract checks only `gift.vaulta`'s own authority, so it needs no change.

## Operating rules

Producers, and whoever assembles their msigs, keep these rules, which the [security review](documents/security-review.md) cites as closing its findings:

- Every transfer into `gift.vaulta` uses `ramtransfer`, and `gift.vaulta` stays unmanaged: no `setacctram` fixes its RAM limit, which would stop the limit tracking its balance.
- `disable`, `suspend` and `resume` msigs carry short expirations, and producers watch `eosio.msig` for standing proposals that name `gift.vaulta`.
- The account executing an `enable` msig executes every standing `disable` proposal first, in the same transaction, so none is left to undo it. After any msig that sets code or the `enabled` flag executes, its proposer reads the flag.
- A child permission of `gift.vaulta` is retired under a new name. Deleting one and re-creating it under the same name revives every proposal approved under the old one, because Spring resolves a permission by name.
- Invalidating a producer's approvals through `eosio.wrap` voids every approval that producer holds on the chain, so producers weigh it as a chain-wide act.
- Every contract upgrade that changes a table's layout uses `binary_extension` or ships with a migration, and every upgrade msig ends with a state-preserving action on each table: `disable` then `enable` when the program is on, `enable` then `disable` when it is off, and `setquota` for one creator at its own quota. A schema break then reverts the whole upgrade.
- Once the endowment nears exhaustion, a refill msig runs before any admission msig.

## Technical notes

- **Routes for `giftacct`**: `giftacct` may be sent as a top-level action or inline: by the creator's key, by an `eosio.msig` proposal the creator approved, by a creator contract holding `creator@eosio.code`, or by producers at 15/21 through `eosio.wrap::exec`. Every route debits the named creator's quota, so the creator answers for every gift made under its authority. Any account can execute an approved msig proposal, an `eosio.wrap` one included, and the account that executes it writes the top-level `newaccount` and chooses the new account's keys, so a creator using the msig route sends the last approval, the `newaccount` and the execution in one transaction, or gifts only names under a suffix whose owner signs the `newaccount` itself.
- **Indexing**: Every field an indexer wants is an explicit input to `giftacct`, which names the creator whichever route sent it. An indexer reads `giftacct` from inline traces as well as from the transaction's own actions, and needs inline traces to reconcile RAM balances, since `giftram` is sent inline. The `creator` that `newaccount` records names the signer, which can differ from the creator whose quota paid, so endowment spending is read from `giftacct`.
- **Two gifts to one account**: A second `giftacct` for the same account in one transaction is charged the 136 bytes again, although the system contract keeps one row, so the extra charge only overstates spending.
- **No griefing**: Nobody outside the creating transaction can gift a new account first, and the program cannot reach existing accounts. `gift.vaulta` cannot be blocked: another party's `giftram` to it only adds locked RAM, and the contract has no notification handlers, so it never refuses a giftee's return.
- **Verification**: Checked against Spring source and the system contracts at release v3.10.0, which the 2025-07-15 Vaulta transition msig deployed to `eosio` and which matches the commit each citation links. `giftram` requires only the gifter's authority ([`delegate_bandwidth.cpp`](https://github.com/VaultaFoundation/system-contracts/blob/9edc8bcfd128f382ae11b88655d958d07f5230d2/contracts/eosio.system/src/delegate_bandwidth.cpp#L164-L165)), which the contract satisfies inline through `eosio.code`, and checks that the recipient exists, which `newaccount` earlier in the transaction ensures. New-account RAM is checked at the end of the transaction (Spring [`transaction_context::finalize`](https://github.com/AntelopeIO/spring/blob/e6a99f68b67abc4d89fe716755b2e1394a4991f7/libraries/chain/transaction_context.cpp#L386-L409)), so the inline gift covers the account's footprint, the same mechanism `newaccount` plus `buyrambytes` relies on. The 1,400 free bytes are the system's [`ram_gift_bytes`](https://github.com/VaultaFoundation/system-contracts/blob/9edc8bcfd128f382ae11b88655d958d07f5230d2/contracts/eosio.system/include/eosio.system/eosio.system.hpp#L75). The 136-byte row overhead was confirmed on mainnet in transaction `f2c6200c1add5ffc74837bcae1731ff5a66e259376eee6a4d4d7580f044a0b4c`, where a 3,000-byte gift billed exactly 136 bytes to the gifter.

## Disclosure

Greymass wrote this proposal and the gift contract, and operates `gm`, the account-creation service behind Anchor and the Greymass account portal. As of 2026-10-17 Greymass is not among the top 30 producers, so it signs no admission msig, its own included. Greymass intends to apply for `gm` as a creator, as Next Steps describes.

## Scope Boundaries

- Gifts happen only at account creation, and the contract enforces it, so creators cannot top up an existing account.
- This program serves registered creators, with the network covering RAM. Self-serve, paid account creation is `new.vaulta` ([VP-0002](../vp-0002-account-creation/proposal.md)).

## Known Constraints

- **One gifter per account**: The system contract allows a single RAM gifter per account at a time. Accounts created under this program cannot receive another party's `giftram` (for example from an app) until they return the network's gift in full. Buying their own RAM, or receiving it by `ramtransfer`, is unaffected.
- **Full-return only**: `ungiftram` returns the entire gift. A giftee can return its gift only once it holds RAM of its own covering its usage beyond 1,400 bytes, and the NET and CPU to sign the return.

## Open Questions

None.

## Next Steps

1. Greymass proposes `vp1create`. It is done when it executes.
2. Greymass proposes `vp1deploy` once `gift.vaulta` exists. It is done when it executes with `enable` as its last action.
3. Greymass publishes `gm`'s creator application. Its admission MSIG can execute only after `vp1deploy`.
4. Further creators apply as described in Becoming a creator, each admitted by its own 15/21 MSIG.
