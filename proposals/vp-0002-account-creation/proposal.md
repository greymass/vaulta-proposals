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
    - create.gm
msigs:
    - status: planned
      title: Create the new.vaulta account and fund its RAM
    - status: planned
      title: Deploy the create contract code and ABI to new.vaulta at the published hash
sentiment: []
requires: []
revisions:
    - version: 1
      date: 2026-02-16
      summary: Initial draft.
    - version: 2
      date: 2026-08-18
      summary: Re-derived against the contract source, corrected transfer handling and RAM figures, and declared the two-step enactment sequence.
excerpt: "A proposal to create the new.vaulta account and deploy an account creation contract to it: one canonical, network-secured home where a user pays in the network token and receives their account and its RAM in one step."
---

# Self-Serve Account Creation
[English](proposal.md) | [한국어](proposal.ko.md) | [中文](proposal.zh.md)

## Summary

This proposal creates the `new.vaulta` account, owned by network governance, and deploys an account creation contract to it. It gives wallets, exchanges, and guides one canonical home for account creation, secured by network consensus rather than an individual operator's keys. The contract is self-serve and payment-driven: a user pays in the network token and it creates their account and buys its RAM in a single step, with no operator involved. Enactment is two BP MSIG (15/21) steps: creating the account, then deploying the contract code at a published hash.

## Rationale

The network should own one canonical home for account creation. An account is the prerequisite for using the chain at all, and a wallet, an exchange, or a guide pointing a new user at `new.vaulta` points at a contract whose behavior is secured by 15/21 BP consensus rather than by any operator's goodwill.

The function itself is proven: the same contract has run in production at `create.gm` since October 2025, creating accounts on Vaulta mainnet. What is missing is network ownership. `create.gm` is controlled by individual keys: whoever holds them can replace the deployed code at any moment with no notice, so an integrator that audited the contract has no guarantee about the code receiving its users' payments; a single operator can abandon the service or lose the key, taking the chain's front door with it; and because the interface is only a token transfer with a memo, nothing but a trusted name separates a genuine creation contract from a lookalike built to take payments and deliver nothing. Under `new.vaulta`, code changes only by an msig that is publicly visible before it executes, the account persists as long as the network does, and the network has named one home as real.

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

Payment is accepted only in the designated token (`A`, 4 decimals) issued by `core.vaulta`. The contract passes over, rather than rejects, any transfer it is not the recipient of, any transfer it sends itself, and any transfer from `eosio.ram` or `core.vaulta`, which covers its own RAM purchases and the leg `core.vaulta` returns to it while unwrapping the payment during `buyram`. A transfer of any other token is rejected and the sending transaction fails, unless its memo is `bypass`.

A transfer carrying the memo `bypass` is accepted and retained without creating an account; this is how the contract is funded directly. The memo is read before the token is checked, so a `bypass` transfer of any token from any token contract is retained. The contract exposes no action to move those funds out, so a balance sent this way rests there until a 15/21 `setcode` gives it a path.

If the requested account name already exists, the transfer fails and the payer keeps their tokens.

### Funding and running costs

- **One-time**: the RAM for the `new.vaulta` account itself and its deployed code is network-funded as part of the creation MSIG, following the common pattern for new contract accounts. The creation step buys 409,600 bytes with `eosio` as payer, sized with headroom above the roughly 390,000 bytes the deployment bills. The contract stores no tables, so the footprint is the code and ABI.
- **Ongoing**: operations are fully user-funded. CPU and NET for each creation are billed to the paying user as the transaction's first authorizer, and the created account's RAM is bought inside the transaction from the user's own payment. A creation leaves the contract's own token balance unchanged and adds nothing to its RAM usage, since `core.vaulta` carries the balance row for the refunded excess. `new.vaulta` needs no staking, and the only balance it holds is what arrives through the `bypass` memo.

### Bounds

The contract imposes no rate or size limits, and this is deliberate:

- Nothing is subsidized. The user pays the full RAM cost plus the system fee; there is no endowment or quota pool a spammer could drain.
- Account creation is already permissionless at the protocol level for anyone willing to pay. Mass-creating paid accounts through `new.vaulta` is exactly as possible, and exactly as costly, as doing it through raw `newaccount` + `buyram`. The contract adds only convenience.
- Size is inherently fixed: every creation spends the cost of 3,260 bytes, one account per transfer, and excess payment refunds to the new account.
- Name rules are unchanged: as creator, `new.vaulta` can only make regular names. The requested name must be exactly 12 characters drawn from `a-z` and `1-5`, with no dots, because a shorter dotless name requires a won name auction, a dotted name requires the suffix owner's authority, and `new.vaulta` holds neither.

### Usage pattern

A user creates an account with a single token transfer:

1. Call `estimatecost` (read-only) to get the current price. RAM price can move between the estimate and the transfer, so the convention is to send the estimate plus a small buffer: a payment at exactly the estimate can fail at the margin, and the buffer refunds to the new account as its starting balance.
2. Transfer at least that amount of the network token to `new.vaulta` with memo `myaccount123-PUB_K1_...`, using a name that meets the rule in Bounds.
3. The contract creates `myaccount123` with the given key as its single `owner`/`active` authority, buys `myaccount123`'s RAM through `core.vaulta`, and refunds any overpayment to `myaccount123`.

A created account holds RAM but no CPU or NET, so it cannot move its refunded balance or run `updateauth` unaided. Wallets are expected to cosign or power up the account's first transactions.

One key serves both authorities by design. A separate owner key, a multisig, or account-based recovery is set up with `updateauth` after creation.

## Scope Boundaries

- This proposal covers the `new.vaulta` account and its account creation contract only.
- No revenue mechanism: the contract charges only the RAM cost plus the system fee and refunds any excess to the created account.

## Open Questions

None.

## Next Steps

The contract source is published at [`contracts/create`](https://github.com/greymass/vaulta-contracts/tree/1d38e7aca622707888942a093bc45fa4ac3893df/contracts/create).

- [ ] The authors record the code hash, the commit it builds from, and the CDT version that reproduces it in this section before the deployment step is proposed, so BPs can rebuild and compare.
- [ ] The authors add the back-reference citation to each step's transaction, pinned to the commit carrying this proposal's final text.
