---
vp: VP-0000
title: Register youraccount as a VP-0001 Creator
standard: VPS-1
status: Draft
authors:
    - Your Name (Affiliation)
created: 2026-01-01
accounts:
    - youraccount
msigs:
    - status: planned
      title: Register youraccount as a creator with its daily quota
sentiment: []
requires:
    - VP-0001
---

# Register youraccount as a VP-0001 Creator

[English](proposal.md) | [한국어](proposal.ko.md) | [中文](proposal.zh.md)

## Summary

This proposal registers `youraccount` as a creator under [VP-0001](../vp-0001-ram-gifting/proposal.md) with a daily quota of N bytes. One paragraph: who operates it, which products will create accounts with it, and why producers should grant it network RAM.

## Identity

The account to be registered and the person or organization that operates it. Producers will want a way to reach you before they approve. List a public channel here if you have one, or give producers a contact privately.

## Use and quota

The products or flows that will call `giftacct`. The bytes you plan to gift per account and why that figure, per product if they differ; VP-0001 recommends at least 3,000 bytes so an account can hold its own token balances and stake. The share of expected volume that is free and the share that is paid. The requested daily quota, with evidence of current creation volume (on-chain account creations, sales figures, or user counts).

## Real users

What an end user must present before you call `giftacct`, and how your server verifies it without trusting the client. The caps you apply per person, per device, per IP address and per day, and the identifier each cap keys on. Say which of these identifiers a client could forge. How you stop aliased, relayed or disposable identities from defeating those caps. The naming rules you enforce beyond a badword list, such as reserved and brand names, similarity to high-value accounts, and bulk or sequential patterns.

## Transaction shape

How you build the creation transaction. VP-0001 requires a top-level `eosio::newaccount` followed by `giftacct`; accounts created inline by a contract or inside an `eosio.msig` `exec` cannot receive a gift. How you send `giftacct`: signed by your key, through an msig you approve, or by a contract you deploy, and for a contract, who can call it and what bounds those callers, since every call spends your quota. Any account can execute an approved msig proposal and write the `newaccount` with its own keys, so on the msig route send the last approval, the `newaccount` and the execution in one transaction, or gift only names under a suffix whose owner signs the `newaccount`. Whether you fund accounts whose `newaccount` another party signs, and for which suffixes. How a retried, dropped or replayed request is handled so it never spends quota twice. How you create accounts once the day's quota is spent, the program is disabled, or you are suspended: VP-0001 expects a creator to pay for that overflow with its own RAM, by `buyrambytes` or its own `giftram`, so its users' sign-ups continue.

## Self-dealing

How accounts for yourself, your staff and your partners are kept apart from gifted RAM, and how many such accounts you expect to create.

## Accountability

The alerts that fire on unusual creation volume, who receives them, and your own switch to stop gifting without waiting for producers. How you respond if the key that signs `giftacct` is compromised, and how long that takes.

## Testnet demonstration

Recommended: a Jungle 4 transaction id showing your production flow creating an account and calling `giftacct` against a deployment of the code VP-0001 pins. Delete this section if you have none.

## Open Questions

None.

## Next Steps

1. Producers review this application.
2. The proposer broadcasts the msig carrying `addcreator(youraccount, N)` on `gift.vaulta`, with this proposal cited as its first action.
3. Producers approve; once 15 of 21 approve, anyone may execute it.
