# VS LLC Operational and Vendor Onboarding SOP — Fit Analysis

**Reviewing:** Restored Law, PLLC — *Vaulta Stewardship LLC Operational SOP and Vendor Onboarding SOP*, Draft v2, 15 July 2026
**Against:** MSIG #5, the Vaulta Network RFP Framework, the Schedule A Templates (Exhibit F), and the RFP Platform PRD

---

## Summary

The SOP is well built for what it was scoped to do: onboard vendors, verify payment details, process invoices, and keep VS LLC's own house in order. Several of its controls are stronger than anything in our documents, and one of its conclusions independently confirms a position we reached separately.

**But it was drafted for the world before MSIG #5.** It refers throughout to the *Oversight Committee*, and it does not mention the RFP program, the Program Account, awards, the Steering Committee, Managers of record, Technical Reviewers, on-chain payment, or the delay window. Read as it stands and applied to RFP awards, it would break the standing mandate.

The fix is not a rewrite. It is a **scope boundary plus about eight targeted edits**. The cleanest structural change is a new section early in the SOP saying which of VS LLC's activities the SOP governs and which are governed by MSIG #5 and the Framework, followed by carve-outs where the two touch.

Three things need decisions rather than drafting, and one of them is a question for counsel that has not yet been put to them.

---

## Part 1 — Required changes, by severity

### CRITICAL

#### C-1. "Oversight Committee" is superseded, and the role description is wrong post-MSIG #5

**SOP §3:** *"Oversight Committee | Reviews Trust-scoped records and may request audits or records consistent with the Trust Agreement, but does not direct VS LLC operations or bind VS LLC."*

MSIG #5 replaces the 3-seat Oversight Committee with a 5-seat **Steering Committee** holding a standing mandate to allocate Program Account funds. That Committee **does** direct specific VS LLC actions:

| Framework | What the Committee directs |
|---|---|
| 12.3 | Assigns and reassigns the Manager of record on each RFP |
| 23.3, 15.2 | Its award decision is what VS LLC contracts on |
| 15.3 | VS LLC refuses to contract **only** where the decision is outside the mandate — so it must contract where the decision is within it |
| 13.3a | Approves the Program Cost payment schedule VS LLC pays against |

**Required:** rename throughout, and replace the role line with something like — *"Steering Committee: holds a standing mandate under MSIG #5 to allocate Program Account funds. It does not direct VS LLC's general operations and cannot bind VS LLC outside that mandate. Within it, VS LLC contracts on the Committee's award decisions and administers the role assignments it makes, subject to the refusal check in Framework 15.3."*

Note the SOP is **correct** as to VS LLC's own operations. The carve-out is only for the RFP program.

---

#### C-2. The $25,000 / $50,000 thresholds would destroy the standing mandate

**SOP §2:** *"Any expenditure or commitment exceeding USD $25,000 requires MSIG approval unless expressly covered by a time-limited and purpose-specific MSIG-approved allocation."* And $50,000 for transfers or dispositions.

Our Per-Award Limit is **USD 100,000** total contract value, and awards up to it are made by the Committee under a standing mandate with **no per-award MSIG**. That is the central design decision block producers are being asked to approve. If the SOP's thresholds applied, every award over $25,000 would need its own MSIG — the mandate would exist on paper only.

The SOP already contains the escape: *"unless expressly covered by a time-limited and purpose-specific MSIG-approved allocation."* MSIG #5 is exactly that — four cycles, stated purpose, stated limits. But this should be **express, not inferred**, because it is the single provision most likely to be read the wrong way by someone applying the SOP literally two years from now.

**Required:** name MSIG #5 in §2 as a qualifying allocation, and add a line to the effect that RFP awards within the Cycle Ceiling and Per-Award Limit, and Program Costs within the approved schedule, are covered by it and do not require separate MSIG approval.

**One mismatch to resolve while doing it:** the SOP's escape requires the allocation to be *time-limited*. MSIG #5's **funding** is time-limited (four cycles at a time). Its **mandate** is indefinite until block producers revoke it. Confirm counsel is comfortable that the funding authorization satisfies the test, or adjust the wording.

---

#### C-3. Vendor classification routes entity awardees to the wrong agreement

**SOP §4** sends an "Entity service provider — core development team, marketing agency, infrastructure provider" to a **B2B Services Agreement**.

**Framework 23.3** requires every awardee agreement to *"be the standard VS LLC Independent Contractor Agreement with an award-specific Schedule A."* Not sometimes — every award. The award-specific Schedule A is Exhibit F to MSIG #5 and carries the milestone schedule, the USD denomination, the A conversion formula, the delay-window condition, the clawback, the ban-register warranty, and the work-product provisions in section 7.

A core development team winning an RFP is an entity, so under the SOP as drafted it would be contracted on a B2B agreement that carries none of that.

**Required:** add a distinct classification row — *"RFP awardee (MSIG #5 program): Independent Contractor Agreement plus the award-specific Schedule A at Exhibit F, whether the awardee is an individual or an entity."* Then confirm the B2B Services Agreement route is for VS LLC's **own** vendors only.

If counsel prefers a B2B form for entity awardees, that is a change to Framework 23.3 and needs to go the other way — it cannot be done in the SOP.

---

#### C-4. "Manager" means two different people

The SOP's **Manager** is the VS LLC Manager. The Framework's **Manager of record** is the RFP Program Manager — a per-RFP contractor who approves milestones, and who under **Framework 12.2a may never be a Committee member**. They are different roles held by different people with different authority.

This is not pedantry. **SOP §8** says *"Manager confirms services were performed, invoice matches contract... If Manager is unable to review, the review should be escalated to the Trustee."* For an RFP milestone, the person who confirms the work was performed is the **Manager of record** under Framework 11.1, and escalation to the Trustee is not a path that exists — the Trustee has no role in the program at all.

**Required:** define both terms explicitly in §1 or §3, and in §8 carve out RFP milestones: the Manager of record makes the delivery determination under Framework 11.1; the VS LLC Manager's review is limited to the ministerial contract-and-authority check.

---

### HIGH

#### H-1. Monthly invoice cadence does not fit award payments

**SOP §8:** invoices by the 5th, payment on the 15th.

That works for **Program Costs** — Committee retainers, Manager and Reviewer fees, Portal and administration — which Framework 13.3a already runs on a published schedule paid monthly in arrears.

It does not work for **awards**. A milestone payment is event-driven: milestone approved → 4-of-5 Committee signature → 168-hour delay (72 if urgent) → execution. It is not invoiced monthly and cannot be held to a payment date.

**Required:** state that §8's cadence applies to Program Costs and VS LLC's own vendors, and that award and milestone payments follow Framework sections 10 and 11.

---

#### H-2. The Manager's urgent-need exception cannot reach RFP payments

**SOP §5:** *"No vendor should be paid until the onboarding file is complete, unless the Manager determines there is an urgent operational need and documents the exception in writing."*

For RFP awards there is no such discretion. Framework 23.3 requires the contract first; Framework 7.2 requires four of five signatures; the delay window cannot be waived by anyone, and the only shortening (168 → 72 hours) requires a Committee urgency vote at the award threshold with publication completed first.

**Required:** exclude program payments from the §5 and §13 exception paths.

---

#### H-3. The IP position is the pre-carve-out one, and counsel has not been asked the question

**SOP §2 and §10** state that all Work Product vests in VST *"regardless of funding source"*, with no carve-out.

Our documents introduce **award shapes** (Framework 20.2a) and, in Awardee Schedule A section 7, a **pre-existing IP carve-out** (7.2) with a **licence back** (7.3a) over pre-existing IP embedded in the work product. That mechanism is what makes an Embedded award — new work inside software the awardee already owns — contractible at all, and what stops a Service awardee's own platform being swept into the vesting clause.

**Framework Appendix C item 10 asks counsel to confirm that section 9 of the Independent Contractor Agreement permits that carve-out by Schedule A.** This SOP, from the same counsel, states the unqualified position. That means either the question has not reached them, or their answer is that no carve-out is available.

**This is the most consequential open item in the package.** If section 9 cannot be narrowed by Schedule A, then either the agreement itself needs amending or the Embedded shape does not work, and Service awards need a different mechanism. Until it is answered, no Service or Embedded RFP may be published.

**Required:** put the question to counsel directly, with Awardee Schedule A sections 7.1–7.6 attached, before this SOP is finalised. Then align §2 and §10 to the answer.

---

#### H-4. Onboarding-before-payment and contract-before-proposal need sequencing

The SOP's workflow is: onboard → contract → invoice → pay. Ours is: award decision → contract → propose on-chain → delay → execute. They are compatible but not identical, and two cases need express handling.

**Cancellation after contracting.** Under Framework 23.3 and Awardee Schedule A section 6, the agreement is *conditional on the disbursement clearing its delay window* — if block producers cancel it, or the Committee cancels it following objections, the agreement terminates with no liability on either side. The SOP's vendor file and payment process do not contemplate a fully executed agreement that then produces no payment. §11 offboarding should have a limb for it.

**Bounties.** Under Framework 26a the work is delivered **before** any contract exists — first acceptable delivery wins, then contracting, then the delay. Onboarding therefore happens after the work, which inverts §5. Worth a sentence so it does not read as a process violation.

---

### MEDIUM

#### M-1. Trustee role

**SOP §3** gives the Trustee a coordination role. Framework Appendix A says the Trustee decides **"Nothing in this program."** Not a conflict for VS LLC's general operations, but the SOP should say the Trustee has no role in RFP awards, scoping, milestone approval, or Program Account payments — otherwise §8's escalation-to-Trustee path invites the wrong answer.

#### M-2. Digital asset custody and the `disc.vst` key

**SOP §2:** *"VS LLC may not custody, hold, or transfer digital assets except pursuant to a valid MSIG Resolution and appropriate controls."*

This is right and our design already conforms: VS LLC never holds program funds; the Committee's 4-of-5 permission on `rfp.vst` moves them. But VS LLC **does** now hold a writing key for the `disc.vst` registers (Framework 6.3b and 7.6a). That key has no weight on the Program Account and cannot move funds — but it is a key, held by VS LLC, authorized by MSIG #5 Part E. Worth naming so the §2 rule and the register do not appear to conflict, and so the Exhibit D configuration is recognised as the "appropriate controls."

#### M-3. Conflict disclosure runs alongside, not instead of, the questionnaire

**SOP §6** requires vendors with governance roles or network affiliations to disclose. Framework 6.3a requires every Committee member, Manager and Reviewer to file a structured **disclosure questionnaire** published on-chain. Different populations, both needed. Add a cross-reference so nobody treats the vendor disclosure as satisfying the questionnaire, or vice versa.

#### M-4. Licence regime absent

**Appendix F** says of open source contributions only: *"Respect applicable open source license, but capture VST-owned work where appropriate."* Our regime is specific — Apache-2.0 for code, CC-BY-4.0 for non-code, and three licence modes (Required / Proposer's choice / Default) fixed at publication under Framework 20.2a. Appendix F should point to it rather than paraphrase.

---

## Part 2 — What the SOP has that we should adopt

These are gaps in **our** documents that the SOP exposes. Listed for decision; no changes made.

### A-1. Payment instruction verification — the most valuable thing in this document

**SOP §9** is materially better than anything we have. Our documents say a milestone is paid to the awardee's *"verified receiving account"* and never say what verifies it.

The SOP's controls transfer directly and matter **more** for us than for a bank transfer, because our own documents repeat that on-chain payments cannot be reversed:

- initial payment instructions verified through a trusted **non-email** channel
- any change verified through a **separate channel** from the one that requested it
- change requests **held one business day** unless urgency is documented
- a **test transaction** before full payment for crypto

A test transaction to an awardee's A account before a large milestone payment is a real control we do not have, and it costs nothing.

### A-2. Tax forms — W-9 / W-8

**Zero mentions** across all four of our documents. Awardees, Managers, Reviewers, and Committee members are all paid by VS LLC and all need this. Straightforward gap.

### A-3. Identity verification, and what it does for the ban register

**Zero mentions** in our documents. The SOP requires identity or entity verification at onboarding.

This matters beyond fraud. Framework 6.6 creates a **permanent ban** confirmed at 15/21 and a published ban register checked at proposal submission and before any role assignment. **A ban is only enforceable against someone you can identify.** Without verification, a banned person resubmits under another name and the register does nothing. The SOP's step is what makes our most serious sanction real.

The SOP's Appendix A also anticipates a *"preferred public name or pseudonym"* alongside the legal name, which fits our Framework 11.3a definition of "by name" — a legal name or registered handle, with VS LLC holding the legal identity.

### A-4. Asset register

**SOP §7 and §10** refer to an asset register for critical platforms and access changes. We have a seat register, a ban register, an objection register, a delivery register, and two on-chain registers — but no asset register. For `vst`, `rfp.vst`, `disc.vst`, domains, and repositories, that is a sensible addition, and it pairs with Framework 15.2a's requirement that the platform sit in a VST-controlled repository.

### A-5. Access removal on offboarding

**SOP §11.** We cover key surrender for Committee members (Framework 7.4) but not repository, platform, or credential access for awardees, Managers, and Reviewers when an engagement ends.

### A-6. Monthly reporting package

**SOP §12 / Appendix E** is monthly and operational; our cycle report (Framework 13.5) is quarterly and governance-facing. They complement each other. Worth deciding deliberately which facts live in which, so the two are not maintained twice with different numbers.

---

## Part 3 — Independent corroboration worth noting

**SOP §10:** *"Repository admin access does not equal IP ownership. Agreements must expressly transfer underlying rights, not just account access."*

This is the same conclusion, reached independently by counsel, as Framework 15.2a's requirement for a **written assignment** of the existing platform code in addition to the repository transfer — *"moving a repository is not an assignment of copyright."*

It is worth putting in front of EOS Rio alongside the transfer request. Counsel's own SOP says the transfer of admin access does not do the job, which makes the ask a standard operational step rather than a sign of distrust.

---

## Recommended sequence

1. **Put the section 9 carve-out question to counsel now** (H-3, Framework Appendix C item 10). It gates two of the three award shapes, it is cheap to answer, and the answer changes what §2 and §10 of the SOP should say.
2. **Add the scope boundary section** to the SOP, then make C-1 through C-4 and H-1, H-2, H-4.
3. **Decide on A-1 to A-6** — which belong in the SOP, which in our documents, and which in both. My recommendation: A-1, A-2 and A-3 belong in the Framework and Schedule A because they touch award payments and the ban register; A-4, A-5 and A-6 belong in the SOP as operational controls, with a cross-reference from Framework 13.5.
4. **Re-review the SOP once the Steering Committee is seated**, since §14 sets a quarterly review cycle during stabilisation anyway.
