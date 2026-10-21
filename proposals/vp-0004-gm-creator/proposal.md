---
vp: VP-0004
title: Register gm as a VP-0001 Creator
standard: VPS-1
status: Review
authors:
    - Aaron Cox (Greymass)
created: 2026-10-18
accounts:
    - gm
    - gift.vaulta
    - eosio.assert
msigs:
    - status: planned
      title: Register gm as a creator with a daily quota of 262,144 bytes
sentiment: []
requires:
    - VP-0001
---

# Register gm as a VP-0001 Creator
[English](proposal.md) | [한국어](proposal.ko.md) | [中文](proposal.zh.md)

## Summary

This proposal registers `gm` as a creator under [VP-0001](../vp-0001-ram-gifting/proposal.md) with a daily quota of 256 KiB. Greymass operates `gm` through Sextant, the account creation service behind Anchor for iOS and Android and Web Authenticator, and uses it to give new users a free account after a Google or Apple sign-in. `gm` already gifts RAM to every free account it creates; with the endowment, that RAM comes from the network, and Greymass's own RAM covers any account above the quota.

## Identity

The account to be registered is `gm`, operated by Greymass Inc. Producers can reach Greymass at support@greymass.com.

## Use and quota

Only Greymass's free account products call `giftacct`. They are the same products on every platform: Anchor for iOS, Anchor for Android and Web Authenticator all create through them. Greymass's paid products keep paying for their own RAM, so every gifted account is a free one.

Each free account receives 4,000 bytes. With the 1,400 bytes the system gives every account holding RAM, an account has 5,400 bytes, of which a bare account uses 2,996, leaving its owner about 2,400 bytes for token balances and other rows. That is above the 3,000 bytes VP-0001 recommends. Each gift costs 4,136 bytes of quota with the 136-byte overhead, so the quota covers about 63 accounts a day.

The requested quota is 262,144 bytes (256 KiB) a day, VP-0001's default. In the 90 days to 2026-10-17, `gm` created 1,331 accounts, a mean of 14.8 a day and a peak of 29, 91% of them with a 3,000-byte `giftram`. Those figures cover free and paid accounts together, so they are an upper bound on free volume. At 4,136 bytes each, the peak day would have used 119,944 bytes, under half the quota.

## Real users

`gm` gifts RAM only to free accounts. Anchor for iOS and Android and Web Authenticator issue them after a Google or Apple sign-in, which gives Greymass the account's email address. Greymass's server keeps a SHA-256 hash of that address, never the address itself, and refuses a second free account for a hash that has already created one. Because the address comes from the identity provider, a second free account needs a second Google or Apple account, so the email address is the identifier the cap keys on and a client cannot forge it. Greymass applies no IP address limit or captcha.

Account names are 12 characters or end in `.gm`. Sextant rejects names beginning with `eosio`, names on a badword list and about 40 reserved names, including `vaulta`. It runs no similarity or bulk-pattern check.

## Transaction shape

Sextant builds each account in one transaction: a top-level `eosio::newaccount` signed by `gm`, followed by a top-level `gift.vaulta::giftacct(gm, account, 4000, "")` signed by `gm`. `gm` funds only accounts it creates itself and signs no `giftacct` for a `newaccount` another party signs.

Before each account, Sextant reads `gift.vaulta`'s config and `gm`'s row in `creators`, and uses `giftacct` only when the program is enabled and the gift fits the quota left in the window. Otherwise, and when the chain rejects a gifted transaction, Sextant builds the account with `gm`'s own `giftram`, so users can still sign up once the quota is spent, the program is disabled or `gm` is suspended.

A request never spends quota twice. The gift and the account are created in the same transaction, so quota is debited only when that name is created, and a name can be created once. Sextant tracks each account from pending to irreversible, reverts it if the push fails, and spends the user's ticket only once an account is attached. Its finality job rebroadcasts the same signed transaction and treats an existing account as success.

## Self-dealing

Greymass creates its own, its staff's and its partners' accounts through products with no gift contract, so they never draw on the endowment. Greymass does not issue tickets without an email address for a free product.

## Accountability

Every account Sextant creates is posted to a Slack channel that Greymass staff read, and an hourly watchdog alerts Greymass when `gm`'s token balance or RAM runs low. No alert fires on the creation rate. The daily quota caps a spike at 256 KiB.

Greymass stops gifting without waiting for producers by clearing the gift contract setting on its free products, after which Sextant pays with `gm`'s own RAM from the next account onward. If the key that signs for `gm` is compromised, Greymass replaces it with one `updateauth` signed by `gm@owner` and clears the same setting, which takes minutes.

## Testnet demonstration

Sextant's production flow created `foijhpiz3.gm` on the Jungle 4 testnet in transaction `a9c6c2b5323b67fe9d415d0d4dad433b888db69db97f788a2a4f28c1fbc4b3d0` (block 292,934,156, 2026-10-19). The transaction holds a top-level `newaccount` and a top-level `gift.gm::giftacct(gm, foijhpiz3.gm, 4000, "")`, both signed by `gm@active`; the contract sent an inline `giftram` of 4,000 bytes and debited `gm`'s quota by 4,136 bytes. On Jungle 4 the gift contract runs at `gift.gm`, from the commit the second security review read, which builds the same `gift.wasm` as the commit VP-0001 pins.

With `gm` suspended, the next account Sextant created, `phkfktgax.gm`, took a 4,000-byte `giftram` from `gm`'s own RAM in transaction `3fe180b02f57a0c263341f5f5d9eeeb11feeb0a73e28cf09c538d10e19754d83`, and `gm`'s quota use did not change.

## Open Questions

None.

## Next Steps

1. Producers review this application.
2. Greymass broadcasts the msig carrying `addcreator(gm, 262144)` on `gift.vaulta`, with this proposal cited as its first action. Its second action, `eosio.assert::require`, fails unless `gift.vaulta` has the gift contract's ABI installed, so an attempt to execute it before VP-0001's enactment deploys the contract fails and the msig stays open. Before the msig executes, `gm` registers the `eosio.assert` manifest that action requires.
3. Producers approve; once 15 of 21 approve, anyone may execute it.
4. Greymass sets the gift contract on its free products, and `gm` begins gifting.
