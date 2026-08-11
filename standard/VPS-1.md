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

Once a proposal reaches `Executed`, `Rejected`, `Withdrawn`, or `Superseded`, its English document body and assets are frozen: no further edits to `proposal.md`'s body or the `assets/` directory. Corrections to a frozen proposal ship as a new proposal that supersedes or amends it, never as edits to the approved text. Three things remain live after the freeze: frontmatter's on-chain-tracking fields (`status` transitions, append-only additions to `msigs` and `sentiment`, and the fields those transitions require, such as `resolution` and `superseded-by`); translation files, which are informative rather than normative and may be corrected indefinitely against the frozen English source; and nothing else.

## Document Structure

A proposal body (the markdown after the frontmatter block) is a single `#` title heading followed by `##` sections. Exactly one `#` heading is allowed, and it must be the first heading in the document; nothing may precede it.

The `##` section roster is partially fixed:

- The first `##` section MUST be `Summary`.
- `Summary`'s first paragraph is extracted as plain text, with inline markdown formatting removed, to serve as the proposal's index-card excerpt. It SHOULD stand alone as a one-to-two-sentence abstract of the proposal.
- The last two `##` sections MUST be `Open Questions` then `Next Steps`, in that order. Nothing may follow `Next Steps`.
- `Summary`, `Open Questions`, and `Next Steps` are the only required sections. Each MUST contain at least one non-whitespace line; the literal text "None." satisfies this for a section with nothing to say.
- Any number of free-form `##` sections may appear between `Summary` and `Open Questions`. `Rationale` (why this is needed) and `Mechanics` (how it works on-chain) are suggested but not required, and may be renamed, reordered, split, or omitted to fit the proposal.
- Heading matching is exact and case-sensitive: `## summary` or `## SUMMARY` does not satisfy the `Summary` requirement.
- Subheadings (`###` and deeper) are unrestricted.

## Frontmatter

Every proposal begins with a YAML frontmatter block delimited by `---` lines. The allowed keys are exactly: `vp`, `title`, `standard`, `status`, `authors`, `created`, `accounts`, `msigs`, `sentiment`, `requires`, `replaces`, `superseded-by`, `resolution`. Any other key is an error. There is no `updated` field: a proposal's last-modified date is derived from git history rather than declared.

- **`vp`** (required, string): matches `VP-NNNN` (four digits). Must agree with the proposal's directory name: `vp-NNNN-slug` and `VP-NNNN` share the same number.
- **`title`** (required, non-empty string): the proposal's title; conventionally the same text as the `#` heading (not lint-enforced).
- **`standard`** (required, string): matches `VPS-N`, the standard version this proposal is written against. Must name a file that exists at `standard/VPS-N.md`.
- **`status`** (required, string): one of the seven lifecycle statuses.
- **`authors`** (required, non-empty list of strings): proposal authors.
- **`created`** (required, string): a `YYYY-MM-DD` date.
- **`accounts`** (required, list of strings, may be empty): Antelope account names relevant to the proposal.
- **`msigs`** (required, list, may be empty): bindings to on-chain `eosio.msig` proposals. Each entry is a mapping of `proposer`, `proposal` (both Antelope names), `status` (one of `active`, `expired`, `executed`, `cancelled`), and `txid` (optional). `txid` is a 64-hex string and is required exactly when an entry's `status` is `executed`; it is an error to include `txid` for any other status. No other keys are allowed within an entry; an unknown key inside a `msigs` entry is an error. The list is append-only: entries already merged are never edited or removed, only added to or updated in place as a given msig's own status changes (e.g. `active` becoming `executed`).
- **`sentiment`** (required, list, may be empty): bindings to off-chain sentiment-signaling topics. Each entry is a mapping of `contract` and `topic`, both Antelope names, and no other keys; an unknown key inside a `sentiment` entry is an error. Sentiment bindings carry no `status` field; sentiment topics do not have an on-chain lifecycle the way msig proposals do.
- **`requires`** (required, list, may be empty): `VP-NNNN` identifiers of proposals this one depends on. Every listed identifier must resolve to a proposal in this repository.
- **`replaces`** (optional, list): `VP-NNNN` identifiers of proposals this one replaces.
- **`superseded-by`** (optional, list): `VP-NNNN` identifiers of proposals that replace this one. Allowed only when `status` is `Superseded`, and required to be non-empty in that case. `replaces` and `superseded-by` are reciprocal: if A's `replaces` lists B, B's `superseded-by` must list A, and vice versa.
- **`resolution`** (optional, string): a 64-hex txid. Allowed only when `status` is `Executed`, and required in that case. When the proposal also has `msigs` entries with `status: executed`, `resolution` must match one of their `txid` values.

Frontmatter is the canonical source of truth for a proposal's on-chain bindings. Any mention of an account, msig, or transaction in the proposal body is an informative echo of the frontmatter: if body prose and frontmatter ever disagree, frontmatter governs.

## Languages and Translations

English is the canonical language of every proposal; only the English text is normative. Korean (`ko`) and Simplified Chinese (`zh`, the bare tag with no region subtag) are required translations, kept in lockstep with the English source at every merge, starting from a proposal's first `Draft` landing.

Translations live as sibling files in the same proposal directory: `proposal.ko.md`, `proposal.zh.md`, and so on for any additional language. A translation file's own frontmatter has three keys: `lang` (must match the file's language tag), `source` (the 40-hex git blob hash of the English `proposal.md` content the translation was made from), and `translator` (optional). Unknown keys are errors, same as proposal frontmatter.

A translation is current when its `source` hash matches the current English blob hash, and outdated otherwise. For the required languages (`ko`, `zh`), an outdated translation is a lint error. For any additional, optional language, an outdated translation is a warning only and never blocks a merge.

Every translation's body must mirror the English source's section structure: the same count of `##` sections, in the same order, though heading text is translated freely (there is no requirement that a translated heading correspond word-for-word to its English counterpart, only that the same number of sections exist in the same positions).

The first non-blank line after the `#` title, in every language file (English and every translation), is a language navigation line listing all present languages by file, in the fixed order English first then the rest alphabetically by tag. For a proposal with English, Korean, and Chinese, the line is exactly:

```
[English](proposal.md) | [한국어](proposal.ko.md) | [中文](proposal.zh.md)
```

Translations may be produced by anyone: proposal authors, community translators, or agents. Human correction is welcome at any time, but there is no native-speaker review gate before a translation may merge.

## References and Assets

External links are banned by default. The single allowlisted exception is a commit-pinned GitHub link: `https://github.com/{org}/{repo}/blob/<40-hex-sha>/...` or the `tree/<40-hex-sha>/...` equivalent, with a full 40-character commit SHA (never a branch or tag name). Any other `http(s)://` occurrence in a proposal body (as a markdown link or as bare text), outside a code fence or inline code span, is an error. Links to block explorers or UI front-ends are never permitted, anywhere: rendering clients are expected to derive such links themselves from frontmatter (account names, txids) rather than have them hardcoded into proposal prose.

A proposal body is plain Markdown, and raw HTML in it is an error. Any tag-shaped token outside a code fence or inline code span (a `<` immediately followed by a letter, `/`, or `!`, such as `<script>`, `<img …>`, or an HTML comment) is rejected. A rendering client can therefore treat proposal prose as Markdown alone, with no HTML sanitization of its own. HTML samples that a proposal needs to show belong inside a code fence, where they are displayed rather than interpreted.

Code fences must be balanced. A ```` ``` ```` or `~~~` fence left open at the end of a document is an error, because an unterminated fence hides the remainder of the body from every other content check.

Internal links resolve against two shapes only: a cross-VP link, `../vp-NNNN-slug/proposal.md` (optionally with a `.lang` tag and a `#anchor`), whose link text must be exactly the target's `VP-NNNN`; and an own-directory asset link, `assets/<file>`, which may not reach into subdirectories or escape `assets/`. The language navigation line's own targets (`proposal.md`, `proposal.<lang>.md`) are also legal link targets. Every relative target must resolve to a file that actually exists.

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

An msig binding (`msigs` entries) records a specific `eosio.msig::propose` transaction under a `{proposer, proposal}` pair, tracked through its lifecycle via `status`: `active` while awaiting signatures, `expired` if it lapsed, `cancelled` if withdrawn, or `executed` once it ran on-chain, at which point its `txid` is recorded. Existing entries are never rewritten to a different `{proposer, proposal}` pair: the list only grows or has entries' status advanced.

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

A conforming VP is written so that any external client can render it correctly by applying two rewrite rules, without needing further knowledge of the repository's internal layout:

- A cross-VP link target, `../vp-NNNN-slug/proposal.md`, rewrites to the client's own proposal route for that VP number. The client resolves slug to number (and back) via `index.json`, which carries both.
- An asset link target, `assets/<file>`, rewrites to a raw fetch of that file at the commit the client is rendering.

Heading anchors follow GitHub-Flavored Markdown slugification rules, so clients that generate a table of contents or in-page anchors from `##`/`###` headings can do so without a proposal-specific anchor scheme.

Free-text frontmatter fields (`title`, `authors`) are validated only as non-empty strings and are copied verbatim into `index.json`. A rendering client escapes them as text when it displays them; they carry no markup guarantee.

## Versioning of This Standard

This document's own `status` field is `Draft`, `Active`, or `Superseded`. While `Draft`, VPS-1 may be freely edited in place; if an edit to this standard breaks a proposal that previously conformed to it, that proposal is fixed in the same pull request that changes the standard.

Once this document's `status` becomes `Active`, non-normative edits (typo fixes, clarifying prose that doesn't change what is accepted or rejected) continue to happen in place as errata. Any change that alters what CI accepts or rejects instead requires a new `standard/VPS-2.md`: VPS-1 is frozen as-is and gains a pointer to its successor, rather than being edited underneath proposals that already declare `standard: VPS-1`.

Every proposal declares which standard version it was written against via its `standard` frontmatter field. The tooling checks that the declared standard document exists and applies its single ruleset, which implements this document; per-version rule dispatch keyed on the `standard` field is the committed behavior for the introduction of a second standard, so proposals pinned to VPS-1 will continue to be judged by VPS-1's rules rather than a successor's. The allowlist of external link origins (commit-pinned `github.com` only) is part of this document and is amended, when needed, by editing this file directly.

## Open Questions

None.

## Next Steps

This document's `status` flips from `Draft` to `Active` once the first proposals conforming to VPS-1 have merged.
