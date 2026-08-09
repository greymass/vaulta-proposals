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
    - admin.grants
    - fund.wram
msigs: []
sentiment: []
requires: []
---

# Self-Serve Account Creation
[English](proposal.md) | [한국어](proposal.ko.md) | [中文](proposal.zh.md)

## Summary

`new.vaulta` is a self-serve, payment-driven account creation contract: a user pays in the network token and the contract creates their account and buys its RAM in a single step, with no operator involved. It is the counterpart to the creator-driven, network-funded path in [VP-0001](../vp-0001-ram-gifting/proposal.md); the two are independent, and a `new.vaulta` user funds their own account rather than receiving a gift. Deploying the contract under the `new.vaulta` account requires 15/21 BP approval.

## Mechanics

### Account and authority

- `new.vaulta` is created via BP MSIG (15/21), following the same pattern as other `*.vaulta` accounts.
- `owner` and `active` are held by network governance: `eosio.prods` or `eosio`, both of which resolve to 15/21 BP consensus. `active` additionally includes `new.vaulta@eosio.code` so the contract can send inline `eosio::newaccount` and `core.vaulta::buyram` under its own authority.
- Every future `setcode`/`setabi` therefore requires the same 15/21 approval. No lower-threshold administrative permission exists, and the contract exposes no admin actions that would need one.
- All contract parameters (the payment token, the byte provisioning, the proxy contract) are compile-time constants. Changing any of them is a code change: a new published commit and hash, approved by a 15/21 `setcode`. There is no configuration action.

### Contract interface

The contract is driven by a token-transfer notification rather than a directly called action.

| Action | Auth | Purpose |
|---|---|---|
| `transfer` notification (`*::transfer`) | token sender | On receiving the payment token from `core.vaulta`, parse the memo, create the account, buy its RAM, refund any excess |
| `parsememo(memo)` (read-only) | none | Parse `accountname-PUBLICKEY` into an account name and a single-key authority |
| `estimatecost()` (read-only) | none | Return the current token cost of one account creation |
| `logcreation(account, excess, ram, timestamp)` | `new.vaulta` | Inline log action emitted per creation for indexing |

The memo format is `accountname-PUBLICKEY` (both `PUB_` and legacy key formats accepted). Each creation provisions 3,260 bytes (3,000 for the account plus 260 for a token balance row). The cost is the RAM cost of those bytes plus the system fee; the user must send at least that, and any excess is transferred to the new account. Payment is accepted only in the designated token (`A`, 4 decimals) from `core.vaulta`; transfers of any other token are ignored, as are the contract's own RAM purchases.

### Funding and running costs

- **One-time**: the RAM for the `new.vaulta` account itself and its deployed code is network-funded as part of the creation MSIG, following the common pattern for new contract accounts. The RAM can be sent from network holdings (`admin.grants` or `fund.wram`) via `ramtransfer`, or bought from the market, whichever the MSIG specifies. The contract stores no tables, so the footprint is the code and ABI.
- **Ongoing**: operations are fully user-funded. CPU and NET for each creation are billed to the paying user as the transaction's first authorizer, and the created account's RAM is bought inside the transaction from the user's own payment. The account needs no staking and holds no balance.

### Bounds

The contract imposes no rate or size limits, and this is deliberate:

- Nothing is subsidized. The user pays the full RAM cost plus the system fee; there is no endowment or quota pool a spammer could drain (that concern belongs to [VP-0001](../vp-0001-ram-gifting/proposal.md), which bounds it with quotas).
- Account creation is already permissionless at the protocol level for anyone willing to pay. Mass-creating paid accounts through `new.vaulta` is exactly as possible, and exactly as costly, as doing it through raw `newaccount` + `buyram` today. The contract adds convenience, not capability.
- Size is inherently fixed: every creation provisions exactly 3,260 bytes, one account per transfer, and excess payment refunds to the new account.
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

The contract source is published at [`contracts/create`](https://github.com/aaroncox/vaulta-contracts/tree/746cdef811814b455f7eb4a0c6c58849f3462863/contracts/create).

- [ ] When the deployment MSIG is proposed, record in this section the code hash, the commit it builds from, and the CDT version that reproduces it, so BPs can rebuild and compare.
- [ ] Prepare the MSIG sequence: create `new.vaulta`, fund its RAM from network holdings, deploy the published-hash code, add `eosio.code` to `active`.
