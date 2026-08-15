---
name: review-proposal
description: Use when a proposal draft is believed complete and is about to be submitted or merged, or when asked to review a VP.
---

# Review a Proposal

CI checks form; this skill checks substance. Run `bun run verify` first:
if it fails, fix conformance before reviewing content.

## Review passes

Make each pass separately; do not blend them.

1. **The skeptical BP.** Read only Summary, then the frontmatter. Could a
   block producer decide what they are approving and what it costs the
   network? List every question they would have to ask; each one is a gap
   in the document.
2. **The adversary.** Assume the proposal executes. How could its
   mechanism be abused for profit or spam? Does the text address each
   vector, or at least acknowledge it in Open Questions? Check authorities
   especially: who can act, who can change who can act, what happens if a
   listed account is compromised.
3. **The auditor.** For every factual claim (balances, RAM figures,
   account states, contract behavior), ask: is it verifiable, is it
   current, is it sourced from frontmatter/chain rather than asserted
   loosely in prose? Flag any number that will silently go stale.
4. **The implementer.** Is Next Steps executable as written: does each
   step have an actor and a definition of done? Does anything promised in
   the body lack a step? Do `msigs`/`accounts` entries match what the
   mechanics describe, including the `msigs` list's order, which must match
   the execution order the mechanics describe? If a step was re-proposed
   after the earlier attempt lapsed or was withdrawn, does the new entry
   carry `supersedes` naming the entry it replaces, rather than appearing as
   an unrelated new step? If the frontmatter lists any `msigs` entry, run
   `bun run verify VP-NNNN`: it rebuilds the actions from
   `proposals/<slug>/msig/index.ts` and byte-compares them against the chain,
   and a mismatch is automatically blocking. A raw "Cannot find module
   .../msig/index.ts" error means the proposal asserts an msig binding it has
   no reproducible code for, which is itself a blocking finding. The command
   needs network access; if it is unavailable, say so in the review rather than
   passing the proposal silently.
5. **The translator's check.** Skim `proposal.ko.md` / `proposal.zh.md`
   against the English for meaning drift in normative passages (numbers,
   authorities, obligations). Structure is linted; meaning is not. Check that
   every English `msigs` entry carrying a `title` has a matching translated
   title in each translation's `msigs` list.
6. **The standard's unlinted rules.** Read the diff, not just the file. Is a
   frozen proposal (`Executed`, `Rejected`, `Withdrawn`, `Superseded`) having
   its body or `assets/` edited? Has any existing `msigs` entry been rewritten
   to a different `{proposer, proposal}` pair rather than appended or advanced
   in status? A `planned` entry gaining its `proposer` and `proposal` is the
   only other in-place edit allowed to an existing entry; anything beyond a
   status change or that one binding is blocking. If the proposal has an msig
   binding, check the back-reference citation: `VP-NNNN` plus a commit-pinned GitHub URL, sole
   content of exactly one `msigmessager::message` action, first action of the
   transaction, VP number matching the URL path. A missing citation is
   advisory, never blocking. If the proposal carries `revisions`, does each
   entry describe a change a returning reader would notice (a requirement,
   account, threshold, or scope change), and was it added in the same commit
   as that change? The linter checks the field's shape, not this judgment;
   a missing or undeserved entry is advisory, never blocking.

## Output

Write findings as a numbered list, most serious first, each with the
section it concerns and a concrete suggested fix. Distinguish **blocking**
(wrong, unverifiable, or exploitable) from **advisory** (unclear or
incomplete). Do not rewrite the proposal; the review is the deliverable.
Return the findings directly rather than writing them to a file. If you were
separately asked to apply a fix, run `bun run verify` and then `bun run index`
afterward.
