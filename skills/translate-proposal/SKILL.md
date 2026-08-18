---
name: translate-proposal
description: Use when a proposal's English text or frontmatter has changed, or when a proposal has no ko/zh siblings yet, before running verify.
---

# Translate a Proposal

English is the sole normative text; translations are informative siblings.
`ko` and `zh` (Simplified) are required and must match the current English
file at every merge. Other languages are optional, but adding one is not a
single-file change: the nav line lists every language present, so a new sibling
forces a nav-line edit in the English file and in every existing translation,
and the English edit then invalidates the `ko` and `zh` `source` hashes. Add the
file, update all nav lines, then restamp every `source`. A language without an
entry in `LANG_LABELS` (`lib/types.ts`) appears in the nav line as its bare tag.

## Steps

1. **Finalize English first.** Never translate a moving target; if the
   English text is still changing, stop and finish it.
2. **Compute the source hash** of the final English file:

       git hash-object proposals/<dir>/proposal.md

   (Equivalent: `gitBlobHash` in `lib/translations.ts`.) The hash covers the
   whole file including frontmatter, not just the body.
3. **Write each sibling** `proposal.ko.md` / `proposal.zh.md`:
   - Frontmatter: exactly `lang`, `source` (the hash from step 2), and
     optionally `translator`, `excerpt`, and `revisions`. Nothing else: status,
     bindings, and number live only in the English file. `excerpt` is the
     translated counterpart of the English `excerpt`, under the same rules:
     280 characters or fewer counted in Unicode code points, a single
     paragraph, plain text. `revisions`, when the English file has one,
     mirrors it entry-for-entry: the same `version` numbers and `date`s, with
     each entry's `summary` translated into the target language.
   - Translate the `#` title, keep the language-nav line identical to the
     English file's, and mirror the English `##` sections one-for-one, in
     order, with headings translated.
   - Preserve untouched: code spans and blocks, account names, txids,
     tables' structure, and all link targets. Cross-VP link text stays
     `VP-NNNN`.
4. **Translation fidelity** the linter cannot check:
   - Translate meaning, not words; use the target language's normal
     technical register (Korean 존댓말 formal written style; Chinese plain
     technical prose).
   - Keep established ecosystem terms untranslated where convention does
     (RAM, MSIG, BP, WASM); translate surrounding prose.
   - Never editorialize, soften, or add caveats absent from the English.
     If the English is ambiguous, fix the English first.
5. **When refreshing** after any English change, first identify what changed:
   - Frontmatter only, no translation content: a `status` transition, or a
     `planned` `msigs` entry gaining its `proposer`/`proposal`/`commit` binding. No
     retranslation. The hash covers the whole file, frontmatter included, so
     both translations still go stale. Update `source` in each and stop.
   - A new `msigs` entry that carries a `title`: not frontmatter-only. Add a
     matching entry to each translation's `msigs` list, `{step, title}`, with
     `step` set to the 1-based position of the English entry and `title`
     translated. Then update `source` in each, as above.
   - The English `excerpt` was added or changed: each translation SHOULD carry
     a translated `excerpt` to match. A translation left without one falls back
     to extracting that language's card excerpt from its own body.
   - The English `revisions` list gained an entry: add the matching entry to
     each translation, copying `version` and `date` and translating `summary`.
     This is the same restamp interaction as `excerpt`: the entry changed the
     English file's content, so `source` no longer matches in either
     translation, and the refresh that restamps `source` is the one that
     carries the newly translated summary.
   - Prose changed: retranslate the affected passages only, not the whole file
     blindly, then update `source` in each.

   The restamp rule is the same in every case: the hash covers the whole
   English file, so adding or editing `excerpt` or `revisions` makes every
   translation stale and each `source` must be restamped.
6. **Validate and index**: run `bun run verify` and fix every error until clean,
   then run `bun run index` so `index.json` picks up each translation's path and
   current flag. CI checks the index separately from verify, so skipping this
   passes locally and fails CI. If fixing a verify error required editing
   `proposal.md`, recompute the hash (step 2) and restamp `source` in every
   translation before rerunning: the stale-translation error names the
   translation file, but the cause is usually the English edit you just made. Do
   not commit.
