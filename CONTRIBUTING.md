# Contributing

## Submitting a proposal

1. Fork this repository.
2. Copy `template/proposal.md` to `proposals/vp-0000-your-slug/proposal.md`. Copy that one file, not the whole `template/` directory. Use `0000` as a placeholder; the maintainer assigns the real VP number at merge, and the directory is renamed at that point.
3. Fill in `proposal.md`. Keep `standard: VPS-1` in the frontmatter. There is no `updated` key to declare: the rendered date comes from git history, or from the latest `revisions` entry when the proposal has one. See [standard/VPS-1.md](standard/VPS-1.md) for the full frontmatter and section rules.
4. Write the required `proposal.ko.md` and `proposal.zh.md` sibling translations. Write them yourself, work with a community translator, or use an agent following [skills/translate-proposal/SKILL.md](skills/translate-proposal/SKILL.md). Each needs its own frontmatter with `lang`, `source` (the 40-hex git blob hash of the English `proposal.md` the translation was made from, printed by `git hash-object proposals/<dir>/proposal.md`), and an optional `translator`. See the "Languages and Translations" section of [standard/VPS-1.md](standard/VPS-1.md) for the navigation-line and section-mirroring rules.
5. Run `bun run verify` and fix every error until it passes.
6. Run `bun run index` last, after verify is clean, and include the updated `index.json` in your PR. CI runs `bun run check`, `bun test`, `bun run verify`, and an `index.json` freshness check; a green local `verify` alone does not cover the freshness check.
7. Open a pull request.

Msig code (`msig/index.ts`) is optional at submission time: a proposal can be discussed and reviewed as a document alone. Reviewing a proposal must never require broadcasting a transaction. If you do add it, copy `template/msig/index.ts` into your proposal directory; its `$lib/` imports resolve from any depth, so they need no edit.

When a change to a proposal touches a requirement, an account, a threshold, or the proposal's scope, add an entry to `revisions` in the same commit as the change. See the Revisions section of [standard/VPS-1.md](standard/VPS-1.md) for what counts and the entry shape. Typo and formatting fixes do not need an entry.

## Broadcasting an msig

VPS-1 asks the cited SHA to be the latest commit touching the proposal's directory as of the time the citation is made, and the citation is made when the transaction is proposed. That fixes the order:

1. Get the proposal merged into `greymass/vaulta-proposals` on `master`, then fetch it, so the cited commit exists locally on the canonical `master`.
2. Propose the msig citing that SHA. `bun run propose <vp> <name> --commit <sha>` prints the transaction for review; `--broadcast` sends it. Without `--commit`, the citation carries the all-zero placeholder, which a broadcast refuses.
3. Record the resulting `{proposer, proposal}` on the frontmatter `msigs` entry, alongside `commit`, the SHA cited in step 2, in a later commit.

The cited SHA predates the commit that binds the entry, because the chain assigns the proposer and proposal name only once the transaction is proposed. The recorded `commit` is what lets `bun run verify <vp>` rebuild the entry's actions later and byte-compare them against the chain: the rebuild replays the recorded value rather than reading the citation off the chain, so an entry citing the wrong commit fails verification instead of validating itself.

`propose` refuses to broadcast a citation whose SHA is the all-zero placeholder or is not 40 lowercase hex characters, and one naming an org and repository other than `greymass/vaulta-proposals`. It also refuses a SHA that is not an ancestor of that repository's `master` as the clone last fetched it, which is what makes the citation link permanent. The clone needs one remote whose URL points at `greymass/vaulta-proposals`, under any name, and a clone with no such remote is refused rather than passed. Proposing from a fork works on that basis: keep `origin` on the fork, add the canonical repository as `upstream`, and fetch it. The dry run reports the same problems as warnings, so they are visible while the msig code is being written. Both `propose` and `verify` assemble the citation themselves as the first action of the transaction, authorized by the permission levels the builder declares in `citationAuth`, so the two can never build the array differently. A builder returns only its own actions, and one that returns an `msigmessager::message` action of its own is refused by name.

### Builder flags

`--commit` is shared by every builder. A builder may declare flags of its own, listed by `bun run propose <vp> <name> --help` along with each flag's default. Every flag also reads from an environment variable named `VP_` plus the flag name uppercased with dashes as underscores: `--commit` reads `VP_COMMIT`, `--build-dir` reads `VP_BUILD_DIR`. A value on the command line wins over the environment, which wins over the flag's declared default, and `propose` prints the source of each resolved value before it builds. `verify` has no command line for these, so it resolves declared flags from the environment and defaults, and reports a flag with neither as a failure rather than rebuilding with the wrong input.

A broadcast reads its credentials from a gitignored `.env`, sketched in `.env.example`. Set `PROPOSER_PERMISSION` to the `account@permission` doing the proposing and `PROPOSER_PRIVATE_KEY` to the key that satisfies it. `NODEOS_API_URL` is optional and defaults to `https://vaulta.greymass.com`. The proposer pays the RAM for the proposal row and gets it back when the proposal executes or is cancelled.

Propose from a permission scoped to `eosio.msig` rather than from `active`. Setup is three actions the account owner runs: one `eosio::updateauth` creating the permission under `active` with a single key, then one `eosio::linkauth` for `eosio.msig::propose` and another for `eosio.msig::cancel`. The chain's own documentation covers the argument shapes. `propose` is the only action the tooling signs. `cancel` is linked because the proposer is the only account that can withdraw a proposal before it expires, which the six month lifetime makes a long stretch. `approve` and `unapprove` belong to the requested producers rather than to the proposer, and `exec` is callable by any account, so neither needs a link.

`linkauth` sets the minimum authority for an action: the scoped permission gains the ability to sign `propose`, and `active` and `owner` keep it. Scoping isolates the proposing key rather than locking the account out of its own msigs. A leaked proposing key cannot move funds or change authorities, because a proposal does nothing until it collects approvals, and it can create proposals under the account's name and consume the account's RAM, because `propose` stores the proposal with the proposer as the RAM payer. That bounded but real blast radius is the reason to scope the permission.

Execution needs approvals from 15 of the 21 accounts in `eosio.prods@active`. `propose` requests the top 30 producers by vote, because `eosio.msig::approve` accepts an approval only from an account already in the proposal's requested list: a producer that climbs into the top 21 while the proposal is open cannot approve unless it was requested at proposal time. `exec` re-checks authorization against the current `eosio.prods` membership, so approvals from producers that have since fallen out stop counting.

A proposed transaction expires six months after it is proposed, which gives producers time to coordinate across the rank changes above. Cancellation is asymmetric: before the expiration only the proposer can cancel the proposal, and after it has passed anyone can.

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
