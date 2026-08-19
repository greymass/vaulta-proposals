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
   The Summary's first sentence must state the governance action itself; a Summary that only describes what the proposal would create is a gap even when nothing else is.
   The document must answer why the network should put its support behind it, and each justifying claim must be provable against chain state, contract source, or protocol rules. No provable why, or a why resting on unproven claims, is a gap.
   A reference to planning history, sibling workstreams, or anything else the document does not itself introduce is also a gap: the proposal stands alone.
2. **The adversary.** Assume the proposal executes. How could its
   mechanism be abused for profit or spam? Does the text address each
   vector, or at least acknowledge it in Open Questions? Check authorities
   especially: who can act, who can change who can act, what happens if a
   listed account is compromised.
   Check authority phrasing as well as authority facts: wording like "create X with authority Y" is ambiguous between Y acting and Y being assigned, in body prose and in `msigs` titles alike.
3. **The auditor.** For every factual claim (balances, RAM figures,
   account states, contract behavior), ask: is it verifiable, is it
   current, is it sourced from frontmatter/chain rather than asserted
   loosely in prose? Flag any number that will silently go stale. When the
   proposal pins a contract commit, check that the commit is on that
   repository's default branch and is the newest one touching the pinned
   path.
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
   and a mismatch is automatically blocking. An entry that names a `proposer`
   and a `proposal` but has no builder reports that
   `proposals/<slug>/msig/index.ts` is missing or that the file holds no msig of
   that name; the proposal asserts a binding it has no reproducible code for, so
   that is blocking. An entry still lacking `proposer`, `proposal`, and
   `commit` is skipped
   with a `○ ... not yet proposed on-chain` line, and a proposal whose entries
   are every one of them planned reports that no on-chain comparison was made.
   A declared sequence with no code behind it conforms to VPS-1, because msig
   code is written when a step is proposed rather than at submission, so read
   those lines as expected output and not as a finding. The command
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
   in status? A `planned` entry gaining its `proposer`, `proposal`, and
   `commit` is the
   only other in-place edit allowed to an existing entry; anything beyond a
   status change or that one binding is blocking. If the proposal has an msig
   binding, check the back-reference citation: `VP-NNNN` plus a commit-pinned GitHub URL, sole
   content of exactly one `msigmessager::message` action, first action of the
   transaction, VP number matching the URL path. The entry's `commit` is what
   `verify` replays into the rebuild, so check it against the SHA in the
   citation the chain holds; a disagreement between the two is blocking. A missing citation is
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
