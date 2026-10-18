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
    - documents/msig-5-review-notes.md
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
    - version: 6
      date: 2026-10-16
      summary: Shortens MSIG #5 and separates its review notes while retaining operative requirements.
    - version: 7
      date: 2026-10-16
      summary: Aligns payment, appointment, contract, and disclosure rules; consolidates duplicates and requires payment-control verification.
    - version: 8
      date: 2026-10-16
      summary: Aligns Schedule A exceptions and references, restores testnet rehearsals and safeguards, and clarifies pricing summaries.
    - version: 9
      date: 2026-10-18
      summary: "Proposes revised drafts: MSIG 6.15, Framework 5.5, B 3.5, D 2.5, E 2.2, F 1.9 and questionnaire 1.5/VQ2."
    - version: 10
      date: 2026-10-18
      summary: Requires future MSIGs for all five seats, unpaid oversight transition and a nine-month Community-seat fallback.
    - version: 11
      date: 2026-10-18
      summary: Keeps award-specific Service handovers and express IP licences; providers retain pre-existing IP and disclose switching limits.
    - version: 12
      date: 2026-10-18
      summary: Restores ECF funding and key-security safeguards; aligns resignation, onboarding, suspension, privacy and oracle recovery.
    - version: 13
      date: 2026-10-18
      summary: Defines Committee and BP cancellation routes, distinguishes payment delays and preserves contract-cancellation exceptions.
    - version: 14
      date: 2026-10-18
      summary: Moves launch tasks to review notes, makes administration instructions self-contained and refreshes references and review guidance.
    - version: 15
      date: 2026-10-18
      summary: Restores Exhibit B's prior version and blank date; no rate-card content changed in the review-fix commit.
---

# Network Steering Committee, RFP Framework Approval, and On-Chain Program Funding
[English](proposal.md) | [한국어](proposal.ko.md) | [中文](proposal.zh.md)

## Summary

This proposal asks block producers to approve the Vaulta Network RFP Framework, continue the Oversight Committee as a five-seat Network Steering Committee, and authorize a bounded RFP funding mandate and on-chain program fund. Published decisions, conflict rules, payment delays, and recurring funding approval keep the Committee accountable to the Network.

The proposed limits are **USD 150,000 in awards and USD 77,500 in Program Costs per cycle**, with a **USD 100,000 total-contract-value limit per award**. The first four quarterly cycles authorize **USD 910,000** in spending; the requested first transfer is **A worth USD 284,375**, including a 25% funding margin that creates no spending authority.

All five seats require **future MSIG appointments**. Dafeng Guo, Ross Dold, and Francis Sangkuan continue **unpaid Trust oversight only** until all five are filled. The initial Community selection has the nine-month deadline and fallback in Framework 4.6; its term starts at appointment and can run before funding.

This draft intentionally changes **Service-award IP terms**: providers retain pre-existing IP, while licences, handover materials, and material limits on switching providers must be expressly agreed and published. The automatic embedded-IP licence back applies only to Deliverable and Embedded awards. Network-data export, agreed handover rights, and counsel’s confirmation remain required.

## Documents

These are **proposed revised drafts for VST and block producer review**, not versions already issued or approved by VST. The root revisions record the proposed replacements and policy changes. VST’s upstream review and issuance remain outstanding; earlier comments and citations still refer to their original snapshots. Exhibit C remains unchanged.

Read together:

- [MSIG #5 resolution](documents/msig-5.md), **6.15**: approvals, settings, funding and transition. Funding and permission activation wait for all five appointments, each member’s required filings, contract and signing key, and the completed Exhibit D deployment evidence.
- [Exhibit A: Vaulta Network RFP Framework](documents/rfp-framework.md), **5.5**: the operating rules. Part 1 covers governance and funding; Part 2 covers the RFP process. Part 1 governs conflicts between them; Part 2 may be amended separately but may vary a Part 1 rule only where expressly permitted.
- [Exhibit B: Manager and Reviewer Rate Card and Scope](documents/exhibit-b-rate-card.md), **3.4**: Manager fees of USD 350 per milestone, or USD 600 for the assessment variant, and Technical Reviewer fees of USD 450 per milestone. Other fees and responsibilities are in the rate card. Only block producers may change the figures by MSIG Resolution. Committee pay of USD 2,500 per month and the cap of three concurrent member-Reviewer engagements are set in **MSIG #5 Part H**, not Exhibit B.
- [Exhibit D: Program Account, Permission, and Register Configuration](documents/exhibit-d-account-configuration.md), **2.5**: four-of-five payment authority, separate three-of-five cancellation, owner control with block producers at 15/21, seven-day ordinary and three-day urgent waits, rates, registers, and deployment records. Its proposer and cancellation design must be verified against deployed code. A held-proposal procedure is not an automatic timelock; funding and activation require evidence that the execution guards work.
- [Exhibit E: Seat Appointment MSIG Template](documents/exhibit-e-seat-appointment.md), **2.2**: the required format for future appointments, including each candidate’s own 300–800-word vision statement and conflict disclosures.
- [Exhibit F: Schedule A Templates](documents/exhibit-f-schedule-a.md), **1.9**: role-specific schedules to VS LLC’s Independent Contractor Agreement. Check pay and onboarding, conflict sanctions, initial-payment cancellation and surviving contract obligations, Service-IP terms, and the suspension long-stop: over 30 business days of suspension permits 10 business days’ notice, which lapses if payments resume. Counsel’s pre-existing-IP confirmation remains a gate for Service and Embedded RFPs and any populated pre-existing-IP schedule.
- [Exhibit C: Trust Agreement Conforming Amendments](documents/exhibit-c-trust-agreement-amendments.md): unchanged placeholder. MSIG #5 attaches A, B, D, E, and F; counsel’s Trust amendments are handled off-chain under Part J. The lettering is retained for existing citations.

Published alongside the resolution as reference documents, **not approved by it**:

- [Disclosure Questionnaire](documents/disclosure-questionnaire.md), **1.5 / VQ2**: required disclosures before decision rights begin. Public filings are permanent on-chain; positions use bands, A holdings are excluded, and legal identification is collected privately. VQ1 records retain their interpretation and validity; no early refiling is required solely for this revision.
- [MSIG #5 — Review Notes](documents/msig-5-review-notes.md), **1.0**: historical reasoning, disclosed policy changes, and the launch checklist. Market figures are undated historical illustrations, not current evidence. The checklist adds no rules or approvals.

## Open Questions

MSIG #5’s [Blanks to fill](documents/msig-5.md#blanks-to-fill) and the Review Notes’ launch checklist identify remaining tasks and their existing gates. Actual payment-control deployment and rehearsals remain unverified. The source account, ECF dates, counsel confirmations, and complete deployment and member-key records must be resolved as the governing clauses require.

## Next Steps

VST and block producers review the proposed replacement drafts and their disclosed policy changes. Revised upstream versions must be issued and ingested verbatim before these can be treated as updated upstream documents under the repository guidelines. Record that ingestion in revisions and refresh translations. Advancing beyond Draft follows VPS-1; the resolution takes effect only if block producers execute it. This PR does not broadcast transactions or complete deployment or funding.
