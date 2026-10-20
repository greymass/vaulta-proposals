# Creator application template

Use these files to apply for a creator registration under VP-0001, or to request a quota change after admission. VP-0001 lets you publish an application anywhere and recommends a creator VP in the `greymass/vaulta-proposals` GitHub repository, which gives producers a reviewable document and gives your msig a citation.

## Applying with a creator VP

1. Scaffold a proposal with the repository's `scaffold-proposal` skill, copying `template/creator/proposal.md` in place of `template/proposal.md`.
2. Copy `template/creator/msig/` into the proposal directory, and set `CREATOR` and `DAILY_QUOTA_BYTES`. The msig's proposal name (`addcreator` in the template) must be unique to your proposer account.
3. Answer every section. A weak answer stated plainly serves you better than a missing one.
4. Open a pull request. Once merged, broadcast with `bun run propose <vp> addcreator --commit <sha> --broadcast`.

## Applying without a VP

Publish the same six sections (Identity, Use and quota, Real users, Transaction shape, Self-dealing, Accountability) anywhere public and stable. The first action of your `addcreator` msig must be a `msigmessager::message` carrying the link.

## Requesting a quota change or re-admission

Fill in `change-request.md`, publish it anywhere, and link it from the first action of the `setquota` or `addcreator` msig. A request that lowers a quota needs no change request.

## What producers check

- Every required section is answered, and the requested quota matches the volume evidence.
- The Real users section names each cap, the identifier it keys on, and which of those identifiers a client could forge.
- The transaction is a top-level `newaccount` followed by `giftacct`, the route `giftacct` takes is stated, a contract route names what bounds its callers, an msig route sends the last approval, the `newaccount` and the execution in one transaction or gifts only suffixed names, and the flow is ideally shown on Jungle 4.
- The applicant's own accounts stay off gifted RAM.
- You have a way to reach the operator, from the application or given to you privately, before you approve.
