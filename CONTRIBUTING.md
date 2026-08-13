# Contributing

## Submitting a proposal

1. Fork this repository.
2. Copy `template/proposal.md` to `proposals/vp-0000-your-slug/proposal.md`. Copy that one file, not the whole `template/` directory. Use `0000` as a placeholder; the maintainer assigns the real VP number at merge, and the directory is renamed at that point.
3. Fill in `proposal.md`. Keep `standard: VPS-1` in the frontmatter. There is no `updated` key to declare: the rendered date comes from git history, or from the latest `revisions` entry when the proposal has one. See [standard/VPS-1.md](standard/VPS-1.md) for the full frontmatter and section rules.
4. Write the required `proposal.ko.md` and `proposal.zh.md` sibling translations. Write them yourself, work with a community translator, or use an agent following [skills/translate-proposal/SKILL.md](skills/translate-proposal/SKILL.md). Each needs its own frontmatter with `lang`, `source` (the 40-hex git blob hash of the English `proposal.md` the translation was made from, printed by `git hash-object proposals/<dir>/proposal.md`), and an optional `translator`. See the "Languages and Translations" section of [standard/VPS-1.md](standard/VPS-1.md) for the navigation-line and section-mirroring rules.
5. Run `bun run verify` and fix every error until it passes.
6. Run `bun run index` last, after verify is clean, and include the updated `index.json` in your PR. CI runs `bun run check`, `bun test`, `bun run verify`, and an `index.json` freshness check; a green local `verify` alone does not cover the freshness check.
7. Open a pull request.

Msig code (`msig/index.ts`) is optional at submission time: a proposal can be discussed and reviewed as a document alone. Reviewing a proposal must never require broadcasting a transaction. If you do add it, copy `template/msig/index.ts` into your proposal directory and change its import to `../../../lib/types` (one level deeper than the template's own path); the template's depth fails `bun run check` from a proposal directory.

When a change to a proposal touches a requirement, an account, a threshold, or the proposal's scope, add an entry to `revisions` in the same commit as the change. See the Revisions section of [standard/VPS-1.md](standard/VPS-1.md) for what counts and the entry shape. Typo and formatting fixes do not need an entry.

## Status changes

Status changes are pull requests too. The git history is the audit trail for how a proposal moved from `Draft` through to `Executed` (or `Rejected`/`Withdrawn`).

## Review expectations

Maintainers check completeness and technical accuracy; approval happens on-chain. Block producers signal approval by signing the msig, not by reviewing on GitHub.

## Refreshing the demo branch

The `demo` branch carries everything on `master` plus one extra demo proposal, VP-9999. A maintainer refreshes it by merging `master` into `demo` and regenerating the index:

```
git checkout demo
git merge master
```

`index.json` lists a different set of proposals on each branch, so this merge conflicts in `index.json` every time. The conflict is expected. Resolve it by regenerating the file, never by editing the conflict markers by hand:

```
bun run index
```

This overwrites `index.json` wholesale with the entries from the merged tree, including VP-9999, and clears the conflict. Confirm the file is clean, then commit and push the refresh:

```
grep -c '<<<<<<<' index.json         # expect 0
bun scripts/build-index.ts --check   # expect: index.json is current
git add index.json
git commit -m "Merge master into demo and refresh the index"
git push origin demo
git checkout master
```
