---
vp: VP-0003
title: Network Steering Committee, RFP Framework Approval, and On-Chain Program Funding
standard: VPS-1
status: Draft
authors:
    - Adam Zientarski (VST)
created: 2026-09-01
accounts:
    - rfp.vst
    - disc.vst
    - eosio.prods
    - delphioracle
msigs: []
sentiment:
    - contract: sentiment.gm
      topic: rfp
requires: []
documents:
    - documents/msig-5.md
    - documents/rfp-framework.md
    - documents/exhibit-b-rate-card.md
    - documents/exhibit-c-trust-agreement-amendments.md
    - documents/exhibit-d-account-configuration.md
    - documents/exhibit-e-seat-appointment.md
    - documents/exhibit-f-schedule-a.md
    - documents/disclosure-questionnaire.md
revisions:
    - version: 1
      date: 2026-09-01
      summary: Initial draft.
    - version: 2
      date: 2026-09-29
      summary: Ingests MSIG #5 v6.13, Framework v5.3, and PRD v1.6, and adds Exhibits B, D, E, F and four supporting documents.
    - version: 3
      date: 2026-09-30
      summary: Removes the PRD, the Program Administration Register, and the SOP Fit Analysis, which are working documents outside the vote.
    - version: 4
      date: 2026-10-06
      summary: Rewrites the Documents section as a review guide for voters and adds a placeholder explaining the unused Exhibit C.
    - version: 5
      date: 2026-10-06
      summary: Ingests MSIG #5 v6.14, Framework v5.4, Exhibit D v2.4 and Exhibit F v1.8: a CoinMarketCap fallback rate and a 30/10-day long-stop.
---

# Network Steering Committee, RFP Framework Approval, and On-Chain Program Funding
[English](proposal.md) | [한국어](proposal.ko.md) | [中文](proposal.zh.md)

## Summary

This proposal asks block producers to approve the Vaulta Network RFP Framework, continue the Oversight Committee as an expanded Network Steering Committee with a mandate to decide RFP funding, and authorize an on-chain program fund under limits that block producers keep. Its seven documents, distributed for review by the VST and block producers, are carried here verbatim, alongside a placeholder explaining the unused Exhibit C.

The resolution itself states everything being voted on, in full context: read [MSIG #5](documents/msig-5.md).

## Documents

The documents are listed in the order a voter should read them, each with a suggested depth of review. Three need careful reading: MSIG #5, Part 1 of the Framework, and the Exhibit B fee table. The rest can be skimmed for the specific points named below.

Read in full:

- [MSIG #5 resolution](documents/msig-5.md) (about 67 minutes): the resolution block producers would approve. It continues the Oversight Committee as a five-seat Network Steering Committee, gives it a standing mandate to allocate funds from the `rfp.vst` Program Account, and requests a first transfer of A worth USD 284,375. No funds move until all five seats are filled, every member has signed their contract, filed their disclosure, and registered a signing key, and Exhibit D is published complete. If the Delphi Oracle price goes stale for 24 hours or disappears, payments are priced from a CoinMarketCap fallback (Vaulta, ID 36462: the average of the previous UTC day's high and low), and payments stop only if both sources fail. Its stated status is DRAFT v6.14, for VST and block producer review.
- [Exhibit A: Vaulta Network RFP Framework](documents/rfp-framework.md) (Part 1, about 85 minutes): the framework the resolution's first decision approves. Part 1 (sections 1 to 16) is the governance rulebook: seats, voting, conflicts, signing, the mandate, spending limits, and suspension, and it is the part to read. Part 2 (sections 17 to 27) is the step-by-step RFP process, and MSIG may amend it later without reopening Part 1; Part 1 governs where the two disagree. Its stated status is DRAFT v5.4.
- [Exhibit B: Manager and Reviewer Rate Card and Scope](documents/exhibit-b-rate-card.md) (scan the fee tables, about 5 minutes): fees for RFP Program Managers (USD 350 a milestone, or 600 on the assessment variant) and Technical Reviewers (USD 450 a milestone). Committee members serving as Reviewers are capped at 3 concurrent engagements. The figures change only by MSIG. Committee members' own pay is set in MSIG #5, not here. Its stated status is DRAFT v3.4, settled.

Skim for specific points:

- [Exhibit D: Program Account, Permission, and Register Configuration](documents/exhibit-d-account-configuration.md) (about 5 minutes): a technical specification, published by VS LLC before the Program Account is funded. Voters should check the permission design: 4 of 5 Committee signatures to pay and 3 of 5 to cancel, a 7-day delay on payments (3 days if urgent), and owner control kept by block producers at 15 of 21. It also carries worked examples for the oracle rate and the CoinMarketCap fallback rate. Its stated status is DRAFT v2.4; its deployment values are filled before publication.
- [Exhibit F: Schedule A Templates](documents/exhibit-f-schedule-a.md) (about 10 minutes): contract schedules for Committee members, Program Managers, Technical Reviewers, and awardees under VS LLC's Independent Contractor Agreement, with VS LLC as the contracting party. Most of it is standard contract text. Check four points: Committee pay of USD 2,500 a month, matching MSIG #5; work product vesting in the VST, with a carve-out for pre-existing IP that awaits counsel's confirmation and until then blocks Service and Embedded RFPs; an awardee's right to exit once payments have been suspended for 30 business days, on 10 business days' notice that lapses if payments resume; and the permanent program-wide ban for a material conflict breach, confirmed and lifted only at 15 of 21. Its stated status is DRAFT v1.8.

Reference only:

- [Exhibit E: Seat Appointment MSIG Template](documents/exhibit-e-seat-appointment.md): the required format for the later resolutions that fill Committee seats, each voted on separately. Every candidate needs a network vision statement of 300 to 800 words and declared conflicts. Its stated status is TEMPLATE v2.1.
- [Exhibit C: Trust Agreement Conforming Amendments](documents/exhibit-c-trust-agreement-amendments.md): a placeholder, with nothing to review. MSIG #5 attaches Exhibits A, B, D, E, and F and has no Exhibit C: the Trust Agreement amendments once attached under that letter are administered off-chain, and the remaining letters are kept so that existing citations stay correct.

A supporting document, published alongside the resolution and not approved by it:

- [Disclosure Questionnaire, Version 1](documents/disclosure-questionnaire.md) (skim the disclosure rules, about 5 minutes): the conflict-of-interest form every decision-maker files before taking up a role, published by VS LLC alongside Exhibit D, questionnaire version `VQ1`. The full text of each filing is written permanently to `disc.vst`. Positions are reported only as USD bands, never exact figures; holdings of A are not asked for; and individuals are never named. The Program Account is not funded until every Committee member has filed. Its stated status is DRAFT v1.4, settled.

The `[___]` blanks and draft version lines throughout are the documents as distributed; every distributed document is carried verbatim, and the Exhibit C placeholder is the only document written for this repository.

## Open Questions

The open items of this proposal are tracked inside the resolution itself: MSIG #5's [Blanks to fill](documents/msig-5.md#blanks-to-fill) section lists each remaining decision, several marked blocking, together with the part of the resolution each belongs to.

## Next Steps

This proposal is a draft and is open for review: feedback from block producers and all community members is welcome. The documents carry the status each states for itself and remain drafts under their own versioning. Revised versions replace the current ones verbatim as they are distributed, with a `revisions` entry recording each ingestion. Advancing beyond Draft follows the VPS-1 lifecycle and is not scheduled by this document; the resolution takes effect only if block producers execute it.
