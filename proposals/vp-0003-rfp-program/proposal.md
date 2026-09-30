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
---

# Network Steering Committee, RFP Framework Approval, and On-Chain Program Funding
[English](proposal.md) | [한국어](proposal.ko.md) | [中文](proposal.zh.md)

## Summary

This proposal asks block producers to approve the Vaulta Network RFP Framework, continue the Oversight Committee as an expanded Network Steering Committee with a mandate to decide RFP funding, and authorize an on-chain program fund under limits that block producers keep. It consists of seven documents, distributed for review by the VST and block producers and carried here verbatim.

The resolution itself states everything being voted on, in full context: read [MSIG #5](documents/msig-5.md).

## Documents

The resolution and its exhibits:

- [MSIG #5 resolution](documents/msig-5.md): the resolution block producers would approve. Its stated status is DRAFT v6.13, for VST and block producer review.
- [Vaulta Network RFP Framework](documents/rfp-framework.md): Exhibit A to MSIG #5, the framework its first decision approves. Its stated status is DRAFT v5.3, and it is amendable by the Committee under its own Part 2 rule.
- [Manager and Reviewer Rate Card and Scope](documents/exhibit-b-rate-card.md): Exhibit B, the rate card for RFP Program Managers and Technical Reviewers. Its stated status is DRAFT v3.4, settled.
- [Program Account, Permission, and Register Configuration](documents/exhibit-d-account-configuration.md): Exhibit D, the configuration of the Program Account, the Committee Permission, and the `disc.vst` registers, which VS LLC publishes before the Program Account is funded. Its stated status is DRAFT v2.3, a specification whose deployment values are filled before publication.
- [Seat Appointment MSIG Template](documents/exhibit-e-seat-appointment.md): Exhibit E, the template for the resolutions that fill Committee seats. Its stated status is TEMPLATE v2.1.
- [Schedule A Templates](documents/exhibit-f-schedule-a.md): Exhibit F, the Schedule A templates for Committee members, Program Managers, Technical Reviewers, and awardees. Its stated status is DRAFT v1.7.

MSIG #5 attaches Exhibits A, B, D, E, and F. The resolution explains that it has no Exhibit C: the Trust Agreement amendments once attached under that letter are administered off-chain.

A supporting document, published alongside the resolution and not approved by it:

- [Disclosure Questionnaire, Version 1](documents/disclosure-questionnaire.md): the disclosure instrument VS LLC publishes alongside Exhibit D, questionnaire version `VQ1`. Its stated status is DRAFT v1.4, settled.

The `[___]` blanks and draft version lines throughout are the documents as distributed; every document is carried verbatim.

## Open Questions

The open items of this proposal are tracked inside the resolution itself: MSIG #5's [Blanks to fill](documents/msig-5.md#blanks-to-fill) section lists each remaining decision, several marked blocking, together with the part of the resolution each belongs to.

## Next Steps

This proposal is a draft and is open for review: feedback from block producers and all community members is welcome. The documents carry the status each states for itself and remain drafts under their own versioning. Revised versions replace the current ones verbatim as they are distributed, with a `revisions` entry recording each ingestion. Advancing beyond Draft follows the VPS-1 lifecycle and is not scheduled by this document; the resolution takes effect only if block producers execute it.
