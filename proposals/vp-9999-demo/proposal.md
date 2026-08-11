---
vp: VP-9999
title: Demonstration of the Proposal Rendering System
standard: VPS-1
status: Proposed
authors:
    - Aaron Cox (Greymass)
created: 2026-08-10
accounts:
    - test.gm
msigs:
    - proposer: test.gm
      proposal: ugkuddhb2jwp
      status: active
sentiment:
    - contract: sentiment.gm
      topic: sentiment
requires: []
---

# Demonstration of the Proposal Rendering System

[English](proposal.md) | [한국어](proposal.ko.md) | [中文](proposal.zh.md)

## Summary

This proposal exists on the `demo` branch to exercise every feature of the proposal
rendering system in one document: headings at every level, tables, code, images,
cross-proposal links, non-Latin headings, and live on-chain bindings. It is never
merged to `master` and carries no governance weight.

## Rendering Features

Inline `code`, **bold**, and *italic*.

### Table

| Feature | Source | Rendered by |
| --- | --- | --- |
| Markdown body | `proposal.md` | `VpMarkdown` |
| Msig bindings | frontmatter `msigs` | msig cards |
| Sentiment bindings | frontmatter `sentiment` | topic cards |

### Code

```json
{ "vp": "VP-9999", "purpose": "demonstration" }
```

### Image

![Rendering pipeline](assets/pipeline.svg)

### 한국어 제목

Heading ids must survive Korean text, per the VPS-1 GFM contract.

### 中文标题

The same holds for Chinese text.

#### Deep heading

Levels five and six continue below, completing the heading roster.

##### Deeper heading

A level-five heading renders smaller than level four at the same weight.

###### 最深标题

A level-six heading uses Chinese text here, so the deepest heading id is non-Latin.

## Cross-References

This demo cites [VP-0001](../vp-0001-ram-gifting/proposal.md) and the standard itself at a
pinned revision: [VPS-1](https://github.com/greymass/vaulta-proposals/blob/07a0a53c46c9dc83b295f7471b5738dba244882a/standard/VPS-1.md).

## On-Chain Bindings

The frontmatter binds one active msig and one sentiment topic, so the cards below the
document render live data. Frontmatter governs; this prose is informative.

## Open Questions

None.

## Next Steps

Nothing follows this document. It stays on the `demo` branch as a rendering exercise,
refreshed by merging `master` into `demo` when new proposals land.
