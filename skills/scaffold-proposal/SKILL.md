---
name: scaffold-proposal
description: Use when starting a new Vaulta proposal (VP) from an idea, spec, or request, before any proposal file exists.
---

# Scaffold a Proposal

Creates `proposals/vp-0000-<slug>/` with a conforming English document and
required translations. The maintainer assigns the real number at merge; always
scaffold as `vp-0000`. All paths in this file are relative to the repository
root.

## Steps

1. **Slug**: short, lowercase, hyphenated, descriptive (`vp-0000-ram-gifting`).
   Create the directory under `proposals/`.
2. **Copy the template**: `cp template/proposal.md proposals/vp-0000-<slug>/proposal.md`.
   Copy only `proposal.md`, not the whole `template/` directory (see step 6 for
   the template's msig code, whose import depth differs). The template ships the
   three-language nav line. Until `proposal.ko.md` and `proposal.zh.md` exist,
   `bun run verify` reports that the nav line should list English only and that
   the two sibling links do not resolve. Ignore all three; do not edit the nav
   line. They clear when step 7 creates the translations.
3. **Frontmatter**: fill every field. For rules on any field, read the
   Frontmatter section of [standard/VPS-1.md](../../standard/VPS-1.md). Leave
   `msigs`/`sentiment` empty unless on-chain items already exist for this
   proposal. The template's field set is exact: do not invent keys, and do not
   add `replaces` at scaffold time. `revisions` is an available optional field
   that the template omits on purpose: a freshly scaffolded proposal has no
   revision history, so add the field later, once a merged change to this
   proposal earns its first entry. Reciprocity is linted (`replaces` on A
   requires `superseded-by` on B, which in turn requires B's status to be
   `Superseded`), and a placeholder `VP-0000` cannot be written into another
   proposal. If this proposal supersedes an existing one, say so in prose and in
   Next Steps; the maintainer wires `replaces` and `superseded-by` together when
   the real number is assigned.
4. **Write the body**: keep `## Summary` first and `## Open Questions` /
   `## Next Steps` last. Replace or delete the suggested middle sections
   (Rationale, Mechanics) freely; use whatever `##` sections fit the
   proposal. Every core section must have content; "None." is acceptable.
5. **Substance requirements** the linter cannot check:
   - Summary must let a busy reader decide relevance in one paragraph.
   - Every on-chain fact (accounts, txids) appears as backticked names or
     full 64-hex txids, and anything the proposal asserts about itself also
     lives in frontmatter.
   - No promises without a Next Steps entry that carries them.
   - Vendor any needed external material into `assets/` (check the standard's
     format allowlist) instead of linking out.
6. **Msig code** (only if this proposal already has an on-chain msig): copy
   `template/msig/index.ts` to `proposals/vp-0000-<slug>/msig/index.ts` and
   change its import to `../../../lib/types` (one level deeper than the
   template). Do not copy the whole `template/` directory; the template's import
   depth is wrong for a proposal directory and fails `bun run check`. Skip this
   step entirely when `msigs` is empty; msig code is optional at submission
   time.
7. **Translations**: follow [translate-proposal](../translate-proposal/SKILL.md)
   to produce `proposal.ko.md` and `proposal.zh.md`. A proposal without them
   fails CI.
8. **Validate**: run `bun run verify`; fix every error and rerun until it prints
   `all proposals conform`. `bun run index` refuses to run until this is clean.
   If you added or edited any `.ts` file, also run `bun run check && bun test`;
   CI runs both before it runs verify.
9. **Index**: run `bun run index` last, after the final fix, so `index.json`
   reflects the finished state. CI rejects a stale index. Do not commit; leave
   the working tree for review.
