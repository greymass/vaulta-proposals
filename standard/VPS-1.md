---
standard: VPS-1
status: Draft
---

# VPS-1: Vaulta Proposal Standard

## Summary

VPS-1 defines the format, structure, languages, reference policy, and on-chain linkage of Vaulta network proposals (VPs) in this repository. English is the sole normative text of any proposal; the proposal's frontmatter is the sole canonical assertion of its on-chain bindings.

## Proposal Numbers and Lifecycle

Each proposal lives in its own directory, `proposals/vp-NNNN-slug/`. An author submits under the placeholder number `vp-0000-slug`; the maintainer assigns the real number and renames the directory at first merge, when the proposal lands as `Draft`. Numbers are sequential and are never reused, including for proposals that are later rejected or withdrawn; those keep the number they were assigned.

A proposal's `status` field is one of:

- **Draft**: still being written and not ready for review.
- **Review**: open for community and BP review; no msig has been submitted.
- **Proposed**: submitted on-chain as an `eosio.msig` proposal awaiting BP signatures.
- **Executed**: signed and executed on-chain.
- **Rejected**: did not gain enough support; will not proceed.
- **Withdrawn**: withdrawn by its authors before execution.
- **Superseded**: replaced by one or more later proposals.

Once a proposal reaches `Executed`, `Rejected`, `Withdrawn`, or `Superseded`, its English document body and assets are frozen: no further edits to `proposal.md`'s body or the `assets/` directory. Corrections to a frozen proposal ship as a new proposal that supersedes or amends it, never as edits to the approved text. Three things remain live after the freeze: frontmatter's on-chain-tracking fields (`status` transitions, append-only additions to `msigs` and `sentiment`, a `planned` msig entry gaining the binding proposed for it, and the fields those transitions require, such as `commit`, `resolution`, and `superseded-by`); translation files, which are informative rather than normative and may be corrected indefinitely against the frozen English source; and nothing else.

## Document Structure

This section governs the root document, `proposal.md`, and its translations. A file listed in the `documents` frontmatter field is exempt from all of it; see Document Sets.

A proposal body (the markdown after the frontmatter block) is a single `#` title heading followed by `##` sections. Exactly one `#` heading is allowed, and it must be the first heading in the document; nothing may precede it.

The `##` section roster is partially fixed:

- The first `##` section MUST be `Summary`.
- `Summary`'s first paragraph is the fallback source of the proposal's index-card excerpt, used when frontmatter carries no `excerpt` field: it is extracted as plain text, with inline markdown formatting removed. A proposal that relies on this fallback SHOULD write that paragraph to stand alone as a one-to-two-sentence abstract of the proposal.
- The last two `##` sections MUST be `Open Questions` then `Next Steps`, in that order. Nothing may follow `Next Steps`.
- `Summary`, `Open Questions`, and `Next Steps` are the only required sections. Each MUST contain at least one non-whitespace line; the literal text "None." satisfies this for a section with nothing to say.
- Any number of free-form `##` sections may appear between `Summary` and `Open Questions`. `Rationale` (why this is needed) and `Mechanics` (how it works on-chain) are suggested but not required, and may be renamed, reordered, split, or omitted to fit the proposal.
- Heading matching is exact and case-sensitive: `## summary` or `## SUMMARY` does not satisfy the `Summary` requirement.
- Subheadings (`###` and deeper) are unrestricted.

## Frontmatter

Every proposal begins with a YAML frontmatter block delimited by `---` lines. The allowed keys are exactly: `vp`, `title`, `standard`, `status`, `authors`, `created`, `accounts`, `msigs`, `sentiment`, `requires`, `documents`, `replaces`, `superseded-by`, `resolution`, `excerpt`, `revisions`. Any other key is an error. There is no `updated` key: a proposal's rendered last-modified date is derived from git history, or, when the proposal has `revisions`, from the latest entry's date.

- **`vp`** (required, string): matches `VP-NNNN` (four digits). Must agree with the proposal's directory name: `vp-NNNN-slug` and `VP-NNNN` share the same number.
- **`title`** (required, non-empty string): the proposal's title; conventionally the same text as the `#` heading (not lint-enforced).
- **`standard`** (required, string): matches `VPS-N`, the standard version this proposal is written against. Must name a file that exists at `standard/VPS-N.md`.
- **`status`** (required, string): one of the seven lifecycle statuses.
- **`authors`** (required, non-empty list of strings): proposal authors.
- **`created`** (required, string): a `YYYY-MM-DD` date.
- **`accounts`** (required, list of strings, may be empty): Antelope account names relevant to the proposal.
- **`msigs`** (required, list, may be empty): the proposal's enactment steps, written in the order they are intended to execute, each bound to an on-chain `eosio.msig` proposal once one exists. Each entry is a mapping of `status` (one of `planned`, `active`, `expired`, `executed`, `cancelled`), `proposer` and `proposal` (both Antelope names), `commit` (a 40-character lowercase hex commit sha), `txid` (optional), `title` (optional), and `supersedes` (optional). `proposer`, `proposal`, and `commit` are required for every status other than `planned`, and are an error on a `planned` entry, which names a step whose msig has not been proposed yet. `commit` records the commit of the proposal text that the msig's citation action pins, so that rebuilding the entry's actions reproduces the transaction the chain holds; see Back-References for the citation itself. `txid` is a 64-hex string and is required exactly when an entry's `status` is `executed`; it is an error to include `txid` for any other status. `title` is a single line of plain text, 1 to 140 characters counted in Unicode code points, under the same plain-text rule as `excerpt`, naming what the step does; see Languages and Translations for how it is translated. `supersedes` is a mapping of `proposer` and `proposal` naming an earlier entry that this one replaces: the named entry must appear earlier in the list, must have `status` `expired` or `cancelled`, and no two entries may supersede the same entry. No other keys are allowed within an entry; an unknown key inside a `msigs` entry is an error. The list is append-only: entries already merged are never removed or reordered, and are edited only as a step advances, meaning a `status` change and, exactly once per entry, a `planned` entry gaining the `proposer`, `proposal`, and `commit` of the msig proposed for it.
- **`sentiment`** (required, list, may be empty): bindings to off-chain sentiment-signaling topics. Each entry is a mapping of `contract` and `topic`, both Antelope names, and no other keys; an unknown key inside a `sentiment` entry is an error. Sentiment bindings carry no `status` field; sentiment topics do not have an on-chain lifecycle the way msig proposals do.
- **`requires`** (required, list, may be empty): `VP-NNNN` identifiers of proposals this one depends on. Every listed identifier must resolve to a proposal in this repository.
- **`documents`** (optional, list, may be empty): declares the proposal as a document set. Each entry is a path relative to the proposal directory of the form `documents/<stem>.md`, where the stem matches `[a-z0-9-]+` and is the document's identifier. The list is ordered, and its order is the set's order. Every listed file must exist, and a duplicate entry is an error. A proposal without the field, or with an empty list, is a single-document proposal. See Document Sets for what listing a document means.
- **`replaces`** (optional, list): `VP-NNNN` identifiers of proposals this one replaces.
- **`superseded-by`** (optional, list): `VP-NNNN` identifiers of proposals that replace this one. Allowed only when `status` is `Superseded`, and required to be non-empty in that case. `replaces` and `superseded-by` are reciprocal: if A's `replaces` lists B, B's `superseded-by` must list A, and vice versa.
- **`resolution`** (optional, string): a 64-hex txid. Allowed only when `status` is `Executed`, and required in that case. When the proposal also has `msigs` entries with `status: executed`, `resolution` must match one of their `txid` values.
- **`excerpt`** (optional, string): supplies the proposal's index-card excerpt directly. It is 280 characters or fewer, counted in Unicode code points; a single paragraph, so any newline is an error; and plain text, so backticks, square brackets, and `{@` are errors. Omit it and the excerpt falls back to the extraction from `Summary`'s first paragraph.
- **`revisions`** (optional, list): a record of authored changes to the proposal. Each entry is a mapping of `version` (an integer, starting at 1 and increasing by exactly 1 with each entry), `date` (a `YYYY-MM-DD` date, non-decreasing across the list and never earlier than `created`), and `summary` (a single line of plain text, 1 to 140 characters counted in Unicode code points, under the same plain-text rule as `excerpt`). No other keys are allowed within an entry. When the field is present, the list holds at least one entry; an empty list is an error. See Revisions for what a revision entry is and when to add one.

Frontmatter is the canonical source of truth for a proposal's on-chain bindings. Any mention of an account, msig, or transaction in the proposal body is an informative echo of the frontmatter: if body prose and frontmatter ever disagree, frontmatter governs.

## Revisions

A revision entry records a change to the proposal that a returning reader should notice: a change to a requirement, an account, a threshold, or the proposal's scope. Typo fixes and formatting commits do not warrant an entry.

Entry 1 SHOULD record the proposal's initial draft, dated `created`. The list is authored oldest first and appended to as the proposal changes; an entry SHOULD be added in the same commit as the change it describes, so the `revisions` list and the diff that prompted it land together in the git history.

The linter enforces the field's shape (key names, version sequence, date ordering, summary length) but not this authoring guidance: nothing stops a change that deserves an entry from merging without one, or an entry from being added for a change that doesn't deserve it.

## Languages and Translations

English is the canonical language of every proposal; only the English text is normative. Korean (`ko`) and Simplified Chinese (`zh`, the bare tag with no region subtag) are required translations of the root document, kept in lockstep with the English source at every merge, starting from a proposal's first `Draft` landing. The root document is the only file in a proposal whose `ko` and `zh` translations are required; a listed document's translations are optional (see Document Sets).

Translations live as sibling files in the same proposal directory: `proposal.ko.md`, `proposal.zh.md`, and so on for any additional language. A root translation's frontmatter has six keys: `lang` (must match the file's language tag), `source` (the 40-hex git blob hash of the English `proposal.md` content the translation was made from), `translator` (optional), `excerpt` (optional), which holds a translated excerpt under the same rules as the English field: 280 characters or fewer counted in Unicode code points, a single paragraph, plain text, `revisions` (optional), present exactly when the English file's `revisions` is present, and `msigs` (optional), present exactly when at least one entry in the English file's `msigs` carries a `title`. Unknown keys are errors, same as proposal frontmatter.

A translation's `revisions` list mirrors the English list exactly: the same number of entries, with matching `version` and `date` per entry. `summary` text is deliberately not compared, since it is translated: each file's summaries are validated independently under the length and plain-text rules above.

A translation's `msigs` list carries the translated step titles, and holds one entry for each English entry that has a `title`, in ascending `step` order. Each entry is a mapping of `step` (an integer, the 1-based position of the entry it translates within the English `msigs` list) and `title`, and no other keys. Every `step` must be within range and must name an English entry that carries a `title`; a duplicated `step` is an error. Translated titles are validated independently under the same single-line, 140-character, plain-text rules as the English field, and are not compared against the English text. Positions are used rather than the `{proposer, proposal}` pair because a `planned` entry has no pair to match on.

A translation's `excerpt` supplies that language's card excerpt, falling back to extraction from the translation's own body. Cards are resolved per language, so a translation may carry an `excerpt` where the English proposal does not, and the English may carry one where a translation does not.

A translation is current when its `source` hash matches the current English blob hash, and outdated otherwise. For the required languages (`ko`, `zh`), an outdated translation is a lint error. For any additional, optional language, an outdated translation is a warning only and never blocks a merge.

Every translation's body must mirror the English source's section structure: the same count of `##` sections, in the same order, though heading text is translated freely (there is no requirement that a translated heading correspond word-for-word to its English counterpart, only that the same number of sections exist in the same positions).

The first non-blank line after the `#` title, in every language file (English and every translation), is a language navigation line listing all present languages by file, in the fixed order English first then the rest alphabetically by tag. For a proposal with English, Korean, and Chinese, the line is exactly:

```
[English](proposal.md) | [한국어](proposal.ko.md) | [中文](proposal.zh.md)
```

Translations may be produced by anyone: proposal authors, community translators, or agents. Human correction is welcome at any time, but there is no native-speaker review gate before a translation may merge.

## Document Sets

A proposal may comprise several markdown documents. `proposal.md` is the root document, and the files its `documents` frontmatter field lists complete the document set. "The proposal" means the whole set; the root document is the file that carries the frontmatter, the required structure, and the required translations, and it names and links each listed document from its prose.

Every listed document lives in the proposal's `documents/` subdirectory, with its translations as siblings there under the `<stem>.<lang>.md` convention. `assets/` keeps its existing meaning: assets are raw-fetch supporting files under their own caps, listed documents are rendered prose subject to content lint, and the two never share a directory.

A listed document enters the repository verbatim, and this standard relaxes around it rather than requiring the text to be normalized. An English document carries no frontmatter: the file is body from its first byte, so a document that opens with a `---` line has that line as content, never as a frontmatter delimiter.

No document carries a declared title, in any form or language. The root document's prose names each document through link text, so translating the root translates the names, and a rendering client wanting chrome derives a label from the document's first `#` heading via `index.json` (see Rendering Contract).

Lint dispatches by position, never by declaration: nothing marks which ruleset a file gets. The root document and its translations are judged by this standard's full ruleset, unchanged. Every listed document, and every translation of one, is judged by a reduced set:

- These rules bind every document in every language: the external-link allowlist, the raw HTML ban, balanced code fences, the ban on link reference definitions and reference-style links, and the 256 KB per-file cap.
- The whole of Document Structure is dropped: no required section roster, no single-`#` rule, and no requirement that a `#` heading exist at all. The language navigation line is likewise dropped, in every language; cross-language navigation for a document is the renderer's job, resolved from `index.json`.
- Relative links are an error. A listed document's permitted link targets are same-page `#anchor` links and allowlisted external links, nothing else.

A document translation is found by the `documents/<stem>.<lang>.md` filename convention, keyed to a listed document; nothing declares it. Its frontmatter holds exactly `lang` and `source`, both required, and an unknown key is an error. `source` pins the 40-hex git blob hash of its own English document, so each document's freshness is independent: editing one document outdates only that document's translations, and restamping them touches no other file. A document translation's body must mirror its own English document's `##` section count and order, under the same rule as a root translation. An outdated document translation is a warning in every language and never blocks a merge.

A markdown file in `documents/` that no entry lists is tolerated but is not part of the set: nothing serves it and nothing checks it. There is no cap on the number of documents in a set; the 256 KB per-file cap is the only bound.

## References and Assets

External links are banned by default. The single allowlisted exception is a commit-pinned GitHub link: `https://github.com/{org}/{repo}/blob/<40-hex-sha>/...` or the `tree/<40-hex-sha>/...` equivalent, with a full 40-character commit SHA (never a branch or tag name). Any other `http(s)://` occurrence in a proposal body (as a markdown link or as bare text), outside a code fence or inline code span, is an error. Links to block explorers or UI front-ends are never permitted, anywhere: rendering clients are expected to derive such links themselves from frontmatter (account names, txids) rather than have them hardcoded into proposal prose.

A proposal body is plain Markdown, and raw HTML in it is an error. Any tag-shaped token outside a code fence or inline code span (a `<` immediately followed by a letter, `/`, or `!`, such as `<script>`, `<img …>`, or an HTML comment) is rejected. A rendering client can therefore treat proposal prose as Markdown alone, with no HTML sanitization of its own. HTML samples that a proposal needs to show belong inside a code fence, where they are displayed rather than interpreted.

Code fences must be balanced. A ```` ``` ```` or `~~~` fence left open at the end of a document is an error, because an unterminated fence hides the remainder of the body from every other content check.

Internal links in the root document resolve against three shapes only: a cross-VP link, `../vp-NNNN-slug/proposal.md` (optionally with a `.lang` tag and a `#anchor`), whose link text must be exactly the target's `VP-NNNN`; an own-directory asset link, `assets/<file>`, which may not reach into subdirectories or escape `assets/`; and a document link, `documents/<file>` (optionally with a `.lang` tag before the `.md` extension, and a `#anchor`), which is constrained the same way and must resolve to a file that exists, whether or not the `documents` field lists it. A listed document's own links are restricted further; see Document Sets. The language navigation line's own targets (`proposal.md`, `proposal.<lang>.md`) are also legal link targets. Every relative target must resolve to a file that actually exists. Every link writes its destination inline, in the `[text](destination)` form; a link reference definition (`[label]: destination`) and any reference-style use of one are errors.

When a proposal's prose needs to reference an on-chain fact directly rather than via a link, it does so as plain backticked text: account names as `` `accountname` `` and transaction IDs as the full 64-hex txid in backticks, not truncated and not linked.

Each proposal directory may have an `assets/` subdirectory holding supporting files, with no further subdirectories inside it. Only regular files are allowed: a symlink is rejected, since it would otherwise read a file outside the proposal directory. An `assets/` directory holds at most 64 files, and each asset file is capped at 1 MB; a proposal's `proposal.md` and each translation are capped at 256 KB. Allowed extensions are `.md`, `.txt`, `.json`, `.csv`, `.png`, `.jpg`, `.webp`, `.svg`; PDFs are not allowed. SVG or XML-shaped content is accepted only in a file named `*.svg`, so a script cannot be smuggled past the SVG checks under a `.png` or `.txt` name.

SVG files are additionally sanitized against the checks below, applied with SVG treated as the XML it is, so a namespace-prefixed spelling such as `<s:script>` is caught alongside the bare form. An SVG is rejected if it contains:

- a `<script>`, `<foreignObject>`, `<style>`, or SMIL animation element (`<animate>`, `<animateTransform>`, `<animateMotion>`, `<set>`);
- an `on*` event-handler attribute, in any attribute-separator form (preceded by whitespace, a `/`, or a quote);
- an `href` or `xlink:href` value that, after trimming leading and trailing whitespace the way a browser does, is anything other than a same-document fragment reference (a bare `#id`, quoted or unquoted);
- a `javascript:` URL, a CSS `@import`, or an external `url(...)` reference;
- a DOCTYPE or entity declaration (`<!DOCTYPE>`, `<!ENTITY>`), which rules out XXE and entity-expansion attacks against server-side renderers.

## On-Chain Bindings

A proposal's frontmatter is the canonical, sole assertion of what it is bound to on-chain. There is deliberately no separate on-chain registry of VP↔binding links that frontmatter must agree with; frontmatter itself is the source of truth (VPS-1 option C).

An msig binding (`msigs` entries) records a specific `eosio.msig::propose` transaction under a `{proposer, proposal}` pair, together with the `commit` of the proposal text its citation action pins, tracked through its lifecycle via `status`: `planned` before the transaction has been proposed, `active` while awaiting signatures, `expired` if it lapsed, `cancelled` if withdrawn, or `executed` once it ran on-chain, at which point its `txid` is recorded. Existing entries are never rewritten to a different `{proposer, proposal}` pair: the list only grows, has an entry's status advanced, or has a `planned` entry filled in with the pair proposed for it and the commit its citation pins, after which those three values are fixed like any other.

The order of the list is the order the steps are meant to execute, and enactment is frequently a sequence rather than a single transaction: one msig creates an account, a second deploys a contract to it, a third sets that contract's configuration. A proposal may therefore declare its steps as `planned` entries before any of them is proposed, so that a reader can see the whole sequence from the proposal's first landing rather than discovering it one transaction at a time.

A step that lapsed or was withdrawn and is then proposed again is recorded as a new entry carrying `supersedes`, which distinguishes a second attempt at one step from a further step in the sequence. Because a lapsed step blocks every step that depends on it, an `eosio.msig` transaction proposed for a VP SHOULD carry an expiration far enough out for the whole sequence to complete, so that a sequence is not interrupted by expiry alone.

A sentiment binding (`sentiment` entries) records a `{contract, topic}` pair used for off-chain-signaled, on-chain-recorded sentiment. Sentiment bindings have no `status` field: a sentiment topic doesn't have the on-chain approve/execute lifecycle an msig does, so there is nothing analogous to track.

There is deliberately no `msg` discussion-channel binding in this schema. The `msg` contract that would host such channels has no mainnet deployment; adding a binding for it is out of scope for VPS-1.

Endorsement, whether msig signature or sentiment vote, flows one direction only: from the document to the chain. A proposal's frontmatter records that an on-chain action exists and what its status is; it is never the mechanism by which that action happens. Signing or voting always happens directly against the chain, never through this repository.

## Back-References

An on-chain action taken in support of a VP SHOULD cite the proposal it enacts, but this is advisory: a citation is never required for a proposal to reach any status, and its presence or absence never confers or removes official standing.

The citation, when present, is a single line of the form:

```
VP-NNNN https://github.com/{org}/{repo}/blob/<full-40-hex-sha>/proposals/vp-NNNN-slug/proposal.md
```

The `VP-NNNN` at the start of the line must match the VP number embedded in the URL path. The SHA must identify a commit that exists on the `master` branch and at which the referenced path exists; it should be the latest commit touching the proposal's directory as of the time the citation is made, so the link points at the most current version of the proposal available at that time.

The vehicle for this citation differs by binding type:

- For an msig binding, the citation line is carried as the sole content of exactly one `msigmessager::message` action, which must be the first action of the proposed transaction.
- For a sentiment binding, the citation line is the first line of the topic's description; free text may follow it.

`topic_row` on the sentiment contract has a `reference` field that could eventually replace the description-line convention with a structured pointer. That would be a future VPS revision's concern, not something this standard depends on or anticipates.

## Rendering Contract

A conforming VP is written so that any external client can render it correctly by applying three rewrite rules, all of which appear in the root document only, without needing further knowledge of the repository's internal layout:

- A cross-VP link target, `../vp-NNNN-slug/proposal.md`, rewrites to the client's own proposal route for that VP number. The client resolves slug to number (and back) via `index.json`, which carries both.
- An asset link target, `assets/<file>`, rewrites to a raw fetch of that file at the commit the client is rendering.
- A document link target, `documents/<file>`, rewrites to the client's own view of that document within the proposal.

For a proposal that declares a document set, `index.json` carries a `documents` array in frontmatter order: per document its repo-relative `path`, a best-effort `heading` derived from its first `#` heading (omitted when the document has none, in which case a client falls back to the filename stem), and its `translations`, each with `lang`, `path`, `current`, and the translation's own derived `heading`. The array is present only when the proposal declares a non-empty `documents` field, so the index entry of a single-document proposal is unchanged.

Heading anchors follow GitHub-Flavored Markdown slugification rules, so clients that generate a table of contents or in-page anchors from `##`/`###` headings can do so without a proposal-specific anchor scheme.

Free-text frontmatter fields (`title`, `authors`, and each `msigs` entry's `title`) are validated only as non-empty strings, plus the length and plain-text rules where those apply, and are copied verbatim into `index.json`. A rendering client escapes them as text when it displays them; they carry no markup guarantee.

## Versioning of This Standard

This document's own `status` field is `Draft`, `Active`, or `Superseded`. While `Draft`, VPS-1 may be freely edited in place; if an edit to this standard breaks a proposal that previously conformed to it, that proposal is fixed in the same pull request that changes the standard.

Once this document's `status` becomes `Active`, non-normative edits (typo fixes, clarifying prose that doesn't change what is accepted or rejected) continue to happen in place as errata. Any change that alters what CI accepts or rejects instead requires a new `standard/VPS-2.md`: VPS-1 is frozen as-is and gains a pointer to its successor, rather than being edited underneath proposals that already declare `standard: VPS-1`.

Every proposal declares which standard version it was written against via its `standard` frontmatter field. The tooling checks that the declared standard document exists and applies its single ruleset, which implements this document; per-version rule dispatch keyed on the `standard` field is the committed behavior for the introduction of a second standard, so proposals pinned to VPS-1 will continue to be judged by VPS-1's rules rather than a successor's. The allowlist of external link origins (commit-pinned `github.com` only) is part of this document and is amended, when needed, by editing this file directly.

## Open Questions

None.

## Next Steps

This document's `status` flips from `Draft` to `Active` once the first proposals conforming to VPS-1 have merged.
