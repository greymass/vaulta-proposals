# Agent Guide

This repository holds Vaulta network proposals (VPs) governed by
[the VPS-1 standard](standard/VPS-1.md). Read the standard for any rule
question; this file only routes.

## Hard rules

- English (`proposal.md`) is the sole normative text. Korean (`proposal.ko.md`)
  and Chinese (`proposal.zh.md`) must be updated in the same change as any
  English edit. "Any edit" is literal: the freshness check is a hash of the
  whole English file, so a frontmatter-only change such as a status transition
  makes both translations stale and requires restamping their `source` values.
- A proposal may be a document set: the root `proposal.md` lists supporting
  documents in a `documents` frontmatter field, and the files live under
  `documents/`. Listed documents are vendored verbatim and never rewritten,
  reformatted, or normalized; the standard relaxes around them instead. Only
  the root's `ko` and `zh` are required: document translations are optional,
  and a stale one warns without blocking. Editing a document stales only that
  document's own translations, never the root's.
- No external links except commit-pinned `github.com` URLs. No UI/explorer
  links anywhere.
- Frontmatter is canonical for all on-chain assertions; body prose is
  informative only.
- Never commit. Leave changes in the working tree for human review.
- Never broadcast. `bun run propose <vp> <name>` without flags is a safe dry run
  that only prints the transaction; never pass `--broadcast`, which submits an
  `eosio.msig::propose` on-chain and cannot be undone. Broadcasting is a human
  action.
- Always finish by running `bun run verify` until it is clean, then `bun run
  index` so `index.json` matches the final state. CI runs `bun run check`,
  `bun test`, `bun run verify`, and `bun scripts/build-index.ts --check`; verify
  alone does not cover the last one.

## Skills by task

| Task | Skill |
| --- | --- |
| Create a new proposal | `skills/scaffold-proposal/SKILL.md` |
| Produce or refresh translations | `skills/translate-proposal/SKILL.md` |
| Review a proposal before submission | `skills/review-proposal/SKILL.md` |
| Change a proposal's status | `skills/translate-proposal/SKILL.md` (restamp `source`), then `bun run verify && bun run index` |

## Commands

- `bun run verify`: standard conformance checks. CI runs this, but it is not the
  whole of CI (see the hard rules).
- `bun run verify VP-NNNN`: conformance plus on-chain msig comparison.
- `bun run index`: regenerate `index.json`. Required after any proposal change,
  translations included, since the index records each translation's path and
  freshness.
- `bun run check && bun test`: typecheck, lint, unit tests.
- `test/` holds one test file per lint rule; read the relevant one when a verify
  error is unclear.
