---
vp: VP-0002
title: Self-Serve Account Creation
standard: VPS-1
status: Draft
authors:
    - Aaron Cox (Greymass)
created: 2026-02-16
accounts:
    - new.vaulta
    - eosio
    - eosio.prods
    - core.vaulta
msigs:
    - status: planned
      title: Create new.vaulta with network governance authorities and fund its RAM
    - status: planned
      title: Deploy the create contract code and ABI to new.vaulta at the published hash
sentiment: []
requires: []
revisions:
    - version: 1
      date: 2026-02-16
      summary: Initial draft.
    - version: 2
      date: 2026-08-15
      summary: Re-derived against the contract source, corrected transfer handling and RAM figures, and declared the two-step enactment sequence.
excerpt: "new.vaulta is a self-serve account creation contract: a user pays in the network token and the contract creates the account and buys its RAM in one step, with no operator involved. It is the user-funded counterpart to VP-0001."
---

# Self-Serve Account Creation
[English](proposal.md) | [한국어](proposal.ko.md) | [中文](proposal.zh.md)

## Summary

`new.vaulta` is a self-serve, payment-driven account creation contract: a user pays in the network token and the contract creates their account and buys its RAM in a single step, with no operator involved. It is the counterpart to the creator-driven, network-funded path in [VP-0001](../vp-0001-ram-gifting/proposal.md); the two are independent, and a `new.vaulta` user funds their own account rather than receiving a gift.

## Mechanics

### Account and authority

- `new.vaulta` is created via BP MSIG (15/21), following the same pattern as other `*.vaulta` accounts. Both authorities are set in the creating `eosio::newaccount` action, so no `updateauth` follows.
- `owner` and `active` both delegate to `eosio.prods@active`, which resolves to 15/21 BP consensus. `active` additionally carries `new.vaulta@eosio.code`, so the contract can send its inline actions under its own authority: `eosio::newaccount`, `core.vaulta::buyram`, the `core.vaulta::transfer` that returns excess payment, and its own `logcreation`.
- Every future `setcode`/`setabi` therefore requires the same 15/21 approval. No lower-threshold administrative permission exists, and the contract exposes no admin actions that would need one.
- All contract parameters (the payment token, the byte provisioning, the proxy contract) are compile-time constants. Changing any of them is a code change: a new published commit and hash, approved by a 15/21 `setcode`. There is no configuration action.

### Contract interface

The contract is driven by a token-transfer notification rather than a directly called action.

| Action | Auth | Purpose |
|---|---|---|
| `transfer` notification (`*::transfer`) | token sender | On receiving the payment token issued by `core.vaulta`, parse the memo, create the account, buy its RAM, refund any excess |
| `parsememo(memo)` (read-only) | none | Parse `accountname-PUBLICKEY` into an account name and a single-key authority |
| `estimatecost()` (read-only) | none | Return the current token cost of one account creation |
| `logcreation(account, excess, ram, timestamp)` | `new.vaulta` | Inline log action emitted per creation for indexing |

The memo format is `accountname-PUBLICKEY` (both `PUB_` and legacy key formats accepted). Each creation spends the RAM cost of 3,260 bytes plus the system fee, and the user must send at least that much. Any excess is transferred to the new account. The RAM the account receives is what that payment buys at the market rate, which lands near 3,260 bytes rather than exactly on it, and the network's standard per-account allowance applies on top of it.

Payment is accepted only in the designated token (`A`, 4 decimals) issued by `core.vaulta`. A transfer of any other token is rejected, and the sending transaction fails. Two transfers are passed over rather than rejected: the contract's own RAM purchases, and the leg `core.vaulta` returns to the contract while unwrapping the payment during `buyram`. A transfer carrying the memo `bypass` is accepted and retained, without creating an account, which is how the contract is funded directly; the contract exposes no action to move those funds out, so a balance sent this way rests there until a 15/21 `setcode` gives it a path.

If the requested account name already exists, the transfer fails and the payer keeps their tokens.

### Funding and running costs

- **One-time**: the RAM for the `new.vaulta` account itself and its deployed code is network-funded as part of the creation MSIG, following the common pattern for new contract accounts. The creation step buys 204,800 bytes with `eosio` as payer, the provisioning used for other network contract accounts. The contract stores no tables, so the footprint is the code and ABI.
- **Ongoing**: operations are fully user-funded. CPU and NET for each creation are billed to the paying user as the transaction's first authorizer, and the created account's RAM is bought inside the transaction from the user's own payment. A creation leaves the contract's own token balance unchanged and adds nothing to its RAM usage, since `core.vaulta` carries the balance row for the refunded excess. The account needs no staking, and the only balance it holds is what arrives through the `bypass` memo.

### Bounds

The contract imposes no rate or size limits, and this is deliberate:

- Nothing is subsidized. The user pays the full RAM cost plus the system fee; there is no endowment or quota pool a spammer could drain (that concern belongs to [VP-0001](../vp-0001-ram-gifting/proposal.md), which bounds it with quotas).
- Account creation is already permissionless at the protocol level for anyone willing to pay. Mass-creating paid accounts through `new.vaulta` is exactly as possible, and exactly as costly, as doing it through raw `newaccount` + `buyram` today. The contract adds convenience, not capability.
- Size is inherently fixed: every creation spends the cost of 3,260 bytes, one account per transfer, and excess payment refunds to the new account.
- Name rules are unchanged: as creator, `new.vaulta` can only make regular names; premium suffixes still require the suffix owner's authority.

### Usage pattern

A user creates an account with a single token transfer:

1. Call `estimatecost` (read-only) to get the current price.
2. Transfer at least that amount of the network token to `new.vaulta` with memo `foo-PUB_K1_...`.
3. The contract creates `foo` with the given key as its single `owner`/`active` authority, buys `foo`'s RAM through `core.vaulta`, and refunds any overpayment to `foo`.

## Scope Boundaries

- This is the self-serve, user-funded path. The creator-driven, network-funded gifting path is [VP-0001](../vp-0001-ram-gifting/proposal.md) (`ram.vaulta`); the two are independent and a `new.vaulta` user buys their own RAM rather than receiving a gift.
- The other `*.vaulta` names previously grouped with this proposal (messaging, chat, forum, fee sharing, voting, polling, and the read-only API) are out of scope. Each is proposed as its own VP when its contract, code hash, and authority scheme are ready.
- No revenue mechanism: the contract charges only the RAM cost plus the system fee and refunds any excess to the created account.

## Open Questions

None.

## Next Steps

The contract source is published at [`contracts/create`](https://github.com/greymass/vaulta-contracts/tree/1d38e7aca622707888942a093bc45fa4ac3893df/contracts/create).

- [ ] The authors record the code hash, the commit it builds from, and the CDT version that reproduces it in this section before the deployment step is proposed, so BPs can rebuild and compare.
- [ ] The authors add the back-reference citation to each step's transaction, pinned to the commit carrying this proposal's final text.
