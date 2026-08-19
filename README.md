# Vaulta Network Proposals

Public proposals (VPs) for the Vaulta network that require block producer multisig (MSIG) approval. Each proposal is a markdown document plus, where applicable, the reproducible code used to build the msig transaction. This lets anyone independently verify that the transaction a proposer submits, and that BPs sign, matches what the proposal describes.

## Proposals

| VP | Title | Status | Source |
| --- | --- | --- | --- |
| [VP-0001](proposals/vp-0001-ram-gifting/proposal.md) | Network RAM Endowment for Account Onboarding | Draft | [`contracts/gift`](https://github.com/greymass/vaulta-contracts/tree/master/contracts/gift) |
| [VP-0002](proposals/vp-0002-account-creation/proposal.md) | Self-Serve Account Creation | Proposed | [`contracts/create`](https://github.com/greymass/vaulta-contracts/tree/master/contracts/create) |

## Verifying an msig

```
bun install
bun run verify vp-0001
```

Verification rebuilds the msig's actions from the code in this repo and byte-compares them with the msig stored on-chain, so signers need trust nothing but the chain and this public code.

## Contributing a proposal

Every proposal must include Korean (`ko`) and Simplified Chinese (`zh`) translations kept in lockstep with the English source; see [standard/VPS-1.md](standard/VPS-1.md) for the full format. Before opening a pull request, run:

```
bun run verify
```

This is the same check CI runs; see [CONTRIBUTING.md](CONTRIBUTING.md) for the full walkthrough.

## Proposing

```
bun run propose <vp> <name>
```

Run without flags, this prints the transaction as a dry run and broadcasts nothing. `--commit <sha>` sets the commit the citation pins, and `--help` lists it alongside any flag the selected builder declares. Passing `--broadcast` submits the `eosio.msig::propose` transaction on-chain, and requires `PROPOSER_PERMISSION` and `PROPOSER_PRIVATE_KEY` to be set in `.env`.

## Statuses

Each proposal carries a lifecycle status (Draft, Review, Proposed, Executed, Rejected, Withdrawn, or Superseded); their meanings are defined in [standard/VPS-1.md](standard/VPS-1.md).

## Governance

This repository is maintained by Greymass initially. The intent is to move it under network governance as the process matures.

## Licensing

Code in this repository is licensed under MIT (see [LICENSE](LICENSE)). Proposal documents are licensed under [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) (see [LICENSE-docs](LICENSE-docs)); copyright in each proposal remains with its listed authors.
