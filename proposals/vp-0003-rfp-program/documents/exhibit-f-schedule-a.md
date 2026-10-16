# Schedule A Templates — RFP Program Roles

**Exhibit F to MSIG #5**
**For use with the Vaulta Stewardship LLC Independent Contractor Agreement**
**Status: DRAFT v1.8**

---

## How these work

Everyone the program pays — Steering Committee members, RFP Program Managers, Technical Reviewers, and awardees — is engaged by VS LLC on the **standard Independent Contractor Agreement**. Only Schedule A differs.

The main agreement already handles the things each role would otherwise need drafted separately:

| Provision | Effect |
|---|---|
| §2 | The agreement covers services, pay, confidentiality, and IP; it **does not create a governance role**. A Committee seat comes from an MSIG appointment. |
| §5 | Services tied to an MSIG-appointed role **end automatically when MSIG removes the person**. |
| §6 | The contract grants no authority to bind the Company, Trust, or Network. Committee signing authority comes from the on-chain permission. |
| §7 | Compensation may not be a distribution, profit participation, private benefit, or token-based incentive; success fees are prohibited. |
| §8 | Confidentiality covers proposal contents and evaluation deliberations and survives for **2 years**. |
| §9 | Work product vests in the **VST regardless of funding source**, for every role. Awardee Schedule A section 7 defines work product by award shape; section 9 is **never disapplied**. |
| §11 | On termination, return or securely delete credentials and cooperate in their rotation and revocation. |
| §13 | Contractor indemnifies; any indemnification available for authorized governance roles under the Trust Agreement or an MSIG-approved agreement is preserved. Committee protection depends on the **Trustee Compensation and Indemnification Acknowledgment**, which remains unreviewed; resolve this before Part H is final. |
| §15 | VS LLC holds the legal name for tax and banking; a public handle is permitted, subject to the pseudonymity requirements below. |

**A note on the permanent ban.** Framework section 6.6 makes a **material** conflict breach — self-dealing, an undisclosed interest, taking payment from a proposer, misusing proposal information, breaching confidentiality, or signing while recused — grounds for a **permanent ban** from every role in and every payment from the RFP program, confirmed at 15/21 and liftable only at 15/21. Each Schedule below carries the acknowledgment, so nobody signs without having read it. Minor or procedural lapses are corrected and recorded, not banned.

**A note on pseudonymity.** Section 15 lets a contractor use a handle publicly while VS LLC holds their legal name for tax and payment purposes, and bars contractors from disclosing each other's legal names. That is compatible with the Framework, which requires vote counts, recusals, and approvals to be **attributable** — attribution can be to a consistent public identity. What it cannot be is anonymous or rotating. Each Schedule A below requires a single stable public identity for the term.

---

## Schedule A — Steering Committee Member

**1. Contractor Role / Internal Title:** Vaulta Network Steering Committee Member — [Core Development / Marketing / Business Development / General (At-Large) / Community] seat.

**2. Services:**

- Attend Committee meetings, at least monthly and at least twice monthly during an open RFP cycle.
- Lead needs triage, RFP scoping, and category diligence for the seat's portfolio.
- Evaluate proposals against published criteria; vote on RFP publication, awards, withholding, and termination.
- Hold one signing key on the `rfp.vst` Committee permission and sign disbursements the Committee has approved.
- Comply with the Vaulta Network RFP Framework in full, including its conflict, recusal, publication, and reporting requirements.
- Contribute to cycle reports, the annual review, and the Committee self-review.

**3. Payment Structure:**

- **USD [2,500] per month**, paid in arrears, **in A** at the Reference Rate **when payment is proposed**, calculated as A-units = ⌊USD-cents × 10^6 ÷ median⌋. The same 24-hour staleness check and CoinMarketCap fallback rate apply as to any other conversion (**Framework 13.4–13.4a**).
- Start date for payments: the **later of** the date this Agreement is signed and the date funds are received in the Program Account.
- Payment frequency: monthly. Invoice cadence: monthly, in arrears.
- **If the rate source fails**, payment is suspended under Framework 13.4a along with every other payment from the Program Account. Entitlement **continues to accrue** and is paid on resumption at the rate then current.

**4. Reimbursable Expenses:** Reasonable, documented, **pre-approved** expenses only — travel to network events and role-specific tooling.

**5. Reporting / Deliverables:** Attendance and votes recorded in published minutes. The **standard disclosure questionnaire under Framework 6.3a, filed on-chain** within 30 days — this is the conflict-of-interest declaration, not an additional item — updated within 10 business days of any change and refiled annually. An annual refiling more than 30 days overdue suspends pay until filed.

**6. Special Authority Limits:**

- Contractor holds **one of five** signing units on `rfp.vst`. Four signatures are required to move funds. Contractor has **no unilateral authority** over any account.
- The key is **personal**. It may not be shared, delegated, or held by an employer or affiliate. Contractor may not sign on behalf of another member, including a recused one.
- Contractor may not approve milestones — that is the Manager of record's role — and **may not serve as Manager of record on any RFP**, without exception (Framework 12.2a). Contractor may be engaged as a **Technical Reviewer** under 12.6; the Manager role is closed to Contractor for as long as Contractor holds a seat.
- Contractor may not bid on any Vaulta RFP during the term and for **6 months** afterwards, directly or through an entity in which they hold a material interest.
- Contractor may not be affiliated with the Vaulta Treasury, and must disclose within **10 business days** if that changes during the term — signing weight is suspended immediately and the matter goes to MSIG.
- Contractor must maintain a single stable public identity for attribution of votes and recusals.

#### Separate Technical Reviewer engagements

Contractor may be separately engaged as a Technical Reviewer **only under Framework 12.6**, using a separate Schedule A:

- **Eligibility:** MSIG must first set the concurrent-engagement cap, and the engagement must leave Contractor within it. There is **no cap on total fees**. The Committee must publish a finding that no suitable unconflicted external reviewer was available; Contractor recuses from that finding and the engagement vote.
- **Seats and vacancies:** All five seats must be filled. The engagement is suspended during any vacancy. If Contractor is the only engaged Reviewer on a published RFP or live award, engage a substitute Reviewer or have the Manager write the scored assessment.
- **One member per RFP:** No more than one Committee member may review the same RFP.
- **Scoping and scoring:** Contractor must not draft acceptance criteria or the milestone schedule, or score proposals. Contractor provides a written note to the Committee instead and takes no part in score reconciliation. If Contractor is the only engaged Reviewer, the Manager of record writes the scored assessment (Framework 22.3).
- **Award decisions:** Contractor keeps the seat’s award vote and may sign the milestone payment.
- **Termination-related recusals:** Contractor must not vote on any termination recommendation, recovery plan, or strike decision concerning the award, **whoever filed it and even after the Reviewer engagement ends or is suspended**.
- **Fees and payment:** Use the Exhibit B rate card amount, which the Committee cannot vary. Recuse from the schedule line and from signing payment of Contractor’s own Reviewer fee. Make **one separate payment per member-Reviewer**, never combined with another member’s payment.
- **Cost classification and reporting:** Reviewer fees are **Program Costs, not Committee pay**. Publish fees by member and RFP in the cycle report, including Contractor’s cumulative fees for the cycle.
- **Disclosure before starting:** Contractor must file a disclosure questionnaire update **before the engagement begins**. The 10-business-day change window in Framework 6.3 does not apply (Framework 6.3c).

**7. Additional terms:**

- The contract must assign **all work product to the VST under section 9** of the standard Independent Contractor Agreement and include the **confidentiality, conflict, recusal, and post-service bidding restrictions in Framework section 6**, and the **secure key handling and custody duties in Framework 7.4**.
- The contract must apply the **payment suspension, accrual, and resumption rules in Framework 13.4a**.
- The contract terminates on **removal or replacement**, or at the **term’s end unless month-to-month continuation applies under Framework 3.3**.
- Contractor acknowledges that a **material breach of the conflict rules carries a permanent ban** from every role in and every payment from the RFP program, confirmed at 15/21 and liftable only at 15/21 (Framework 6.6), and that Contractor will be given the allegation in writing and 10 business days to respond before MSIG votes.
- **Pay is suspended automatically** if Contractor is referred to MSIG for removal, or misses three consecutive meetings without excuse, pending resolution. Role, signing weight, and pay are suspended immediately on referral for a material conflict breach.
- Signing weight and pay commence only when **all required items are filed**, this Agreement is signed, and a signing key is registered, under **Framework 3.1b**, including the **on-chain disclosure questionnaire**. The 30-day period for the contract, questionnaire, and key runs from the later of the appointment Resolution's execution and the date VS LLC publishes the disclosure register as open for filing.
- Key weight is surrendered on removal or replacement, but **retained** during authorized month-to-month continuation after a term ends.
- Loss or suspected compromise of a key must be reported to the Chair and block producers immediately, and Contractor must not sign until it is replaced.

---

## Schedule A — RFP Program Manager

**1. Contractor Role / Internal Title:** RFP Program Manager. *(Contractor must not be a seated Steering Committee member — Framework 12.2a.)*

**2. Services:** For each RFP **or bounty** where Contractor is the **Manager of record**:

- Drafting support, publication, and the public Q&A channel — all questions and answers published to every proposer, with no private guidance.
- Submission intake and the compliance screen.
- Evaluation logistics; **for RFPs whose published Reviewer-engaged field is "no"** — and for RFPs where the only engaged Technical Reviewer is a Committee member under Framework 12.6 — the written **scored** assessment against published criteria, informed by but not bound by that member's written note. *(Rate card to price this variant.)*
- Maintenance of the objection register during the delay window, with the count fixed at its close.
- The working relationship with the awardee team, including check-ins at least fortnightly on active work.
- **Approval of milestones for payment**, recording the milestone, the criteria applied, the determination and reasons, any Technical Reviewer assessment, the amount payable, and the awardee's verified receiving account.
- **Written recommendation of termination** to the Committee where the milestone work product delivered, **or the service performed**, is materially below the standard the RFP required — including **persistent failure to meet published service levels** on a Service award — on the grounds and in the form set out in Framework 11.10a. Contractor is expected to make such a recommendation where the grounds are met and not to carry a failing engagement to term.
- **A short post-award review** on any award at or above the threshold set by MSIG #5 Part D, measured on total contract value — whether it met the need, whether the budget was right, whether the Network would do it again — written **within 20 business days** of final acceptance, or, on a **terminated** award, of publication of the termination decision, or, on a **bounty**, of Contractor's written acceptance determination. Given to the awardee **5 business days** before publication with a window to respond, and published on the Portal with any response. **The award does not close until the review is published** (Framework 25.2). *(Rate card to price this.)*
- Written handover of approval history and open items if an RFP is reassigned.

**3. Payment Structure:** Fixed fees under the **published Exhibit B rate card**: not hourly, not a percentage of an award, and not dependent on whether a milestone is approved.

| Fee | When payable and limits |
|---|---|
| RFP milestone | Fixed fee on Contractor’s determination, **whether the milestone is approved or rejected**. |
| Recovery-plan reassessment | Covered by the original milestone fee; **no separate payment** (Framework 11.9). |
| Bounty | One-time fee on Contractor’s written acceptance determination. |
| Evaluation | **No separate fee.** Scoping support, publication, public Q&A, intake, compliance screening, evaluation logistics, and the scored assessment where clause 2 requires it are covered by the milestone fees of the resulting award. |
| No-award | Once per engagement that ends without a further milestone, at one milestone’s rate. It **replaces a milestone fee for the same determination and is never additional to it**. The qualifying cases are listed below. |
| Recovery instead of termination | If the Committee declines to terminate and directs a recovery plan under Framework 11.9, the engagement continues. Pay the determination as an ordinary milestone determination, **not a no-award fee**. |

The **no-award fee** applies when:

- an RFP closes without an award;
- an award is terminated under Framework 11.10 or 11.10a;
- an award decision expires before contracting under Framework 10.10; or
- a bounty lapses unclaimed under Framework 26a rule 5.

Pay milestones determined before that point; do not pay milestones that will no longer run. The no-award fee covers the determination ending the engagement, including the termination recommendation required by Framework 11.10a.

**If the rate source fails**, payment is suspended under Framework 13.4a; entitlement continues to accrue and is paid on resumption at the rate then current.

**4. Reimbursable Expenses:** Pre-approved and documented only.

**5. Reporting / Deliverables:** Status reports to the Committee; the approval record for each milestone; **the post-award review under Framework 25.2** where the award is at or above the threshold; concurrent RFP load reported for the cycle report. The **standard disclosure questionnaire under Framework 6.3a, filed on-chain**, updated within 10 business days of any change and refiled annually. **Filing is a precondition to being recorded as Manager of record on any RFP**, and an overdue refiling bars new assignments until filed.

**6. Special Authority Limits:**

- Contractor **may not be a seated Steering Committee member**, on any RFP and without exception — there is no availability finding and no waiver (Framework 12.2a). **This engagement terminates automatically as to every RFP if Contractor is seated on the Committee**, and those RFPs are reassigned within 5 business days.
- Contractor **has no vote** on awards and no signing key.
- Contractor may not approve or assess milestones for an awardee they are conflicted on, and must notify the Committee so the RFP can be reassigned. **Conflicted** has the meaning given in **Framework 6.4**, which applies 6.1 and 6.2 to Managers and Reviewers and picks up anything Contractor declared in Parts 3, 5, or 7 of the disclosure questionnaire under 6.3a. The Vaulta Treasury bar in 2.4a applies separately and absolutely.
- Contractor may not bid on any RFP they work on, during the engagement and for **6 months** afterwards.
- Contractor may not be affiliated with the Vaulta Treasury.
- Milestone approval does not authorize payment on its own. Payment requires four Committee signatures and the on-chain delay.
- Contractor acknowledges that a **material breach of the conflict rules carries a permanent ban** from every role in and every payment from the RFP program, confirmed at 15/21 and liftable only at 15/21 (Framework 6.6).
- Contractor **may not approve alone** where the oracle's newest datapoint is more than **24 hours** old and the CoinMarketCap fallback rate under MSIG #5 Part D is also unavailable, or where the rate differs by more than **15%** from the rate used at the previous payment under that award. Both cases go to the Committee.
- **Termination authority:** A recommendation does not terminate the engagement. Only the Committee may terminate, at **two-thirds, minimum 3**.
- **Prohibited actions:** Contractor may not terminate, stop work, withhold delivered work product, suspend the service, refuse a data export, or tell an awardee the engagement is over.
- **Payment cancellation:** Filing does not itself cancel anything on-chain. The Committee cancels at **3 of 5 within 2 business days**.
- Contractor **may not file** a termination recommendation on an award Contractor is conflicted on, or on an RFP where Contractor is no longer engaged in the role, and shall notify the Committee instead. The Committee may **strike** a recommendation filed in breach of this, at simple majority.
- Making a termination recommendation in good faith is **not a ground for ending or not renewing this engagement**, and the fee under clause 3 is unaffected by whether the Committee acts on it.

---

## Schedule A — Technical Reviewer

**1. Contractor Role / Internal Title:** Technical Reviewer — [RFP reference].

**2. Services:** Engaged **where the published RFP's statement under Framework 20.2 says a Technical Reviewer is engaged** — a question the Committee settles at scoping by whether the work is technical, and one that reaches **Service awards too**, which have no built deliverable but may well need technical assessment. That published statement, fixed at publication, determines whether Contractor's assessment is required at each milestone under the award.

- Independent written scoring of compliant proposals against the published criteria, submitted without sight of other reviewers' scores.
- Participation in reconciliation of large divergences after initial scores are submitted, on the record.
- *Where Contractor also holds a Steering Committee seat under Framework 12.6, the two bullets above **do not apply**: Contractor submits a written note to the Committee instead of a score and takes no part in reconciliation. Where Contractor is the only engaged Reviewer, the Manager of record writes the scored assessment.*
- A **written determination** on each milestone under an award whose published Reviewer-engaged field is "yes": accept, accept with conditions, or reject with specified remediation.
- **Written recommendation of termination** filed **directly with the Committee** where the work product delivered, **or the service performed**, is materially below the standard the RFP required — including **persistent failure to meet published service levels** on a Service award, on the grounds and in the form set out in Framework 11.10a. This is filed independently of the Manager of record, who may not withhold it; where Contractor and the Manager disagree, both positions are filed and published.

**3. Payment Structure:** Fixed fees under the **published Exhibit B rate card**: not hourly, not a percentage of an award, and **not dependent on the determination reached**.

| Fee | When payable and limits |
|---|---|
| RFP milestone | Fixed fee on Contractor’s written assessment, **regardless of its outcome**. |
| Recovery-plan reassessment | Covered by the original milestone fee; **no separate payment** (Framework 11.9). |
| Bounty | One-time fee on Contractor’s written assessment of the delivery. |
| Evaluation | **No separate fee.** Independent proposal scoring is covered by the milestone fees of the resulting award. |
| No-award | Once per engagement that ends without a further milestone, at one milestone’s rate. It **replaces the milestone fee for the same assessment**. The qualifying cases are listed below. |

The **no-award fee** applies when:

- an RFP closes without an award;
- an award is terminated under Framework 11.10 or 11.10a;
- an award decision expires before contracting; or
- a bounty lapses unclaimed.

Pay assessments filed before that point; do not pay milestones that will no longer run. The no-award fee applies **whether or not Contractor filed the termination recommendation**.

**If the rate source fails**, payment is suspended under Framework 13.4a; entitlement continues to accrue and is paid on resumption at the rate then current.

**4. Reimbursable Expenses:** Pre-approved and documented only.

**5. Reporting / Deliverables:** Written scores with reasoning; written milestone determinations. The **standard disclosure questionnaire under Framework 6.3a, filed on-chain**, updated within 10 business days of any change and refiled annually. **Filing is a precondition to assignment to any RFP**, and an overdue refiling bars new assignments until filed.

**6. Special Authority Limits:**

- **No vote** on awards, no signing key, and no authority to approve a milestone for payment — the determination informs the Manager of record, who approves.
- **Termination authority:** A recommendation does not terminate the engagement. Only the Committee may terminate, at **two-thirds, minimum 3**.
- **Prohibited actions:** Contractor may not terminate, stop work, withhold delivered work product, suspend the service, refuse a data export, or tell an awardee the engagement is over.
- **Payment cancellation:** Filing does not itself cancel anything on-chain. The Committee cancels at **3 of 5 within 2 business days**.
- Contractor **may not file** a termination recommendation on an award Contractor is conflicted on, or on an RFP where Contractor is no longer engaged in the role, and shall notify the Committee instead. The Committee may **strike** a recommendation filed in breach of this, at simple majority. **Conflicted** has the meaning given in **Framework 6.4**, which applies 6.1 and 6.2 to Managers and Reviewers and picks up anything Contractor declared in Parts 3, 5, or 7 of the disclosure questionnaire under 6.3a.
- Making a termination recommendation in good faith is **not a ground for ending or not renewing this engagement**, and the fee under clause 3 is unaffected by whether the Committee acts on it.
- May not bid on any RFP they review, during the engagement and for **6 months** afterwards.
- May not be affiliated with the Vaulta Treasury.
- Acknowledges that a **material breach of the conflict rules carries a permanent ban** from every role in and every payment from the RFP program, confirmed at 15/21 and liftable only at 15/21 (Framework 6.6).

#### Additional limits for Reviewers who hold a Steering Committee seat

These conditions apply under **Framework 12.6**:

- **Eligibility and cap:** MSIG must first set the concurrent-engagement cap, and the engagement must leave Contractor within it. There is **no cap on total fees earned in a cycle**. The Committee must record and publish a finding that no suitable unconflicted external reviewer was available; Contractor recuses from that finding and the engagement vote.
- **Disclosure:** File a disclosure questionnaire update **before the engagement begins**.
- **Reporting:** Publish every engagement and fee by member and RFP in the cycle report, including Contractor’s cumulative fees and the number of concurrent engagements against the cap.
- **Separate payment:** Make **one separate payment per member-Reviewer**, never combined with another member’s payment.
- **Seats and vacancies:** All five seats must be filled. Suspend the engagement during any vacancy. If Contractor is the only engaged Reviewer on a published RFP or live award, the Committee must engage a substitute. If none is engaged, the Manager writes the scored assessment on a not-yet-awarded RFP, and a milestone on a live award goes to MSIG.
- **Resumption and fees:** If a substitute is engaged, Contractor’s engagement resumes when the seat is refilled **only if the Committee decides**, and Contractor’s fee is prorated to work performed.
- **Role separation:** Only one Committee member may review a given RFP. The Reviewer role’s limits on voting and signing do not remove the seat’s own award vote or signing key. Contractor **may never serve as Manager of record** while seated (Framework 12.2a).
- **Scoping and scoring:** Contractor must not draft acceptance criteria or the milestone schedule, or score proposals (clause 2).
- **Termination-related recusals:** Contractor must not vote on any termination recommendation, recovery plan, or strike decision concerning the award, **whoever filed it and even after this engagement ends or is suspended**.
- **Own-fee recusals:** Contractor recuses from the schedule line and from signing payment of Contractor’s own fee.

---

## Schedule A — Awardee

**1. Contractor Role / Internal Title:** RFP Awardee — [RFP reference and title].

**2. Services:** The scope, deliverables, and acceptance criteria as published in the RFP and the award decision. **These must match the published decision exactly.**

**Award shape** (Framework 20.2a, as declared in the published RFP): **[Deliverable / Service / Embedded]**. Delete the two clauses in section 7 that do not apply.

**3. Payment Structure:**

- Total award value: **USD [___]**, fixed at the award decision.
- Paid in **A** at the Reference Rate **on the date each milestone is approved for payment**: the Delphi Oracle rate, calculated as A-units = ⌊USD-cents × 10^6 ÷ median⌋, or, where the oracle is stale or unavailable, the CoinMarketCap fallback rate under MSIG #5 Part D, calculated as A-units = ⌊USD-cents × 10^8 ÷ fallback⌋. Contractor receives the contracted USD value at each milestone; movement in the price of A does not change it.
- **Milestone schedule — enumerated, and at least two milestones** (Framework 11.1a). This table is what governs: **nothing is payable against a milestone not listed here**, and it must match the published decision record exactly.

  | # | Deliverable | Acceptance criteria | Amount (USD) | Due |
  |---|---|---|---|---|
  | 1 | [___] | [___] | [___] | [___] |
  | 2 | [___] | [___] | [___] | [___] |
  | [add rows as awarded] | | | | |

  *The schedule was proposed by Contractor and settled with the Committee before award. Any change after this Agreement is signed runs through Framework 11.8 — Committee approval, a contract amendment, and publication — and may not take the count below two.*
- Receiving account (verified): **[___]**.
- Mobilization advance, if any: capped at **15%** of the total, and only where Contractor demonstrably cannot self-finance the first milestone.

**4. Reimbursable Expenses:** None unless separately stated here.

**5. Reporting / Deliverables:** Per milestone, as published. Fortnightly check-ins with the Manager of record on active work. A written remediation plan within 10 business days of any missed milestone.

**6. Special Authority Limits and award-specific terms:**

- **This Agreement is conditional on the corresponding on-chain disbursement clearing its delay window.** If the disbursement is cancelled by block producers, or by the Committee following objections, this Agreement terminates with **no liability on either side**.
- **Clawback.** Contractor shall repay amounts paid against any milestone later found not to have been delivered, or to have been misrepresented. On-chain payments cannot be reversed, so this is a contractual remedy; milestone sizing is the primary protection.
- Contractor shall disclose any **other Network funding** for the same work.
- Contractor warrants that neither Contractor nor any person named on the proposal appears on the **published register of bans**, and acknowledges that a material breach of the conflict rules carries a **permanent ban** from every future award, confirmed at 15/21 and liftable only at 15/21 (Framework 6.6).
#### Termination recommendations

- **Grounds and proposer:** Contractor acknowledges that the Manager of record or an engaged Technical Reviewer may recommend termination to the Committee where delivered milestone work or performed services fall materially below the RFP’s required standard, including persistent failure to meet published service levels on a Service award (Framework 11.10a).
- **Payment freeze:** Cancel any pending payment proposal and approve no further milestone for payment until the Committee decides.
- **Response:** Give Contractor the recommendation in writing and **10 business days to respond**. Publish the response with the recommendation.
- **Decision:** The Committee must decide **within 15 business days after the response window closes** and publish its decision and reasons, including when it declines to terminate. It may direct a recovery plan under Framework 11.9 with a reassessment date. **Only the Committee terminates**.
- **No threshold reached:** If no outcome reaches its threshold within that period, the recommendation is **deemed declined** and the freeze lifts. The cancelled payment may be re-proposed without another award vote, with a **fresh delay window**.
- **Contracting deadline:** Extend any 60-day contracting period under Framework 10.10 by the length of the freeze.

#### Termination outcomes

Termination for non-delivery or for cause follows section 5 of the Agreement. *(Counsel to confirm: section 5's automatic-termination limb is written for MSIG-appointed roles and does not fit an awardee — the general for-cause and without-cause limbs are the operative ones here.)*

- Pay accepted milestones; do not propose unearned amounts. Delivered Work Product remains with the VST under section 9.
- On a **Service award**, the Operational Handover Set and data export are due on termination.
- On an **Embedded award**, the licence back in 7.6 survives termination.

#### Rate-source failure and suspension

- **Fallback:** If the Delphi Oracle `eosusd` pair or `delphioracle` contract becomes unavailable, renamed, or deprecated, continue payment using the CoinMarketCap fallback under MSIG #5 Part D.
- **Suspension:** If the fallback is also unavailable, suspend payment until it returns or MSIG designates a replacement source (Framework 13.4a). **Neither party is in breach**.
- **Milestone records and conversion:** The Manager of record continues making and recording written milestone determinations. Approve payment when payments resume, using the rate then current.
- **Deadline extensions:** Extend Contractor’s delivery dates and any 60-day contracting period under Framework 10.10 by the length of the suspension.
- **Termination notice:** After more than **30 business days** of suspension, Contractor may terminate on **10 business days’ written notice**. The notice **lapses if payments resume before it expires**.
- **Pause during a termination recommendation:** The suspension-based termination clock **does not run while a Framework 11.10a termination recommendation is open on the award**.
- **If Contractor terminates:** Pay accepted milestones on resumption; do not propose unearned amounts. Section 7 handover obligations become due. The Manager of record records and publishes the termination (Framework 11.8).
- **Disbursement condition:** Suspension does not change the condition in clause 6’s first bullet: a disbursement that has not been proposed has not been cancelled.

#### Payment currency and price exposure

- Payment currency is A; the award is denominated in USD. **Contractor bears no exposure to the price of A between the award and the milestone approval** — the USD value is fixed and converted at approval.
- **Contractor does bear exposure during the delay window.** The A amount is fixed at approval, but the transfer executes after the delay (168 hours, or 72 if urgent, and longer if cancelled and re-proposed). Contractor receives that fixed quantity of A, whatever its price has done in the meantime.

**7. What is delivered, and what the Network owns:**

**7.1 Work Product** means **the deliverable named in section 2 and in the published RFP**, together with the documentation, configuration, and build tooling needed to use it. It does **not** include Pre-Existing IP.

**7.2 Pre-Existing IP** means anything Contractor owned or was licensed to use before this Agreement, or developed independently of it. **List it here:**

| # | Item | Owner | How it is used in the award |
|---|---|---|---|
| 1 | [___] | [___] | [___] |

*For Deliverable and Embedded awards, unlisted items do not qualify as Pre-Existing IP. For Service awards, omission from this list does not transfer ownership of Contractor’s pre-existing software or IP.*

**7.3 Vesting.** Work Product vests in the **VST** under section 9 of the Agreement. Pre-Existing IP does not vest and remains Contractor's.

**7.3a Licence back.** For **Deliverable and Embedded awards**, where any Pre-Existing IP listed in 7.2 is **embedded in the Work Product**, Contractor grants the VST an **irrevocable, perpetual, royalty-free, worldwide licence** over it as so embedded, sufficient for the Network to **use, modify, and have third parties operate** the Work Product, **surviving termination of this Agreement**. For **Service awards**, any licence over Contractor’s pre-existing software or IP must be **expressly agreed in 7.5**.

*(**Blocking.** Counsel to confirm section 9 permits the 7.2 carve-out and the 7.3a licence back by Schedule A. Until confirmed: **no Service or Embedded RFP may be published**, both relying on the carve-out by their nature; and **no award of any shape may be contracted with a populated 7.2**. A Deliverable award with an empty 7.2 carves nothing out and may proceed. If section 9 does not permit it, the Agreement itself requires amendment — a Schedule cannot narrow a clause it is subordinate to. Defining what the Work Product **is** for a shape does not narrow section 9; only the carve-out does.)*

---

**Delete whichever of 7.4, 7.5, and 7.6 do not match the award shape in section 2.**

**7.4 Deliverable awards.** The Work Product is released under **[___]**, being — as the published RFP's licence mode requires (Framework 20.2a) — the licence **required by the RFP**, the licence **Contractor offered from the permitted set** and which the award accepted, or the **default** (Apache-2.0 for code, CC-BY-4.0 for non-code). The licence recorded here must match the award decision exactly. **Where the deliverable is code**, Contractor delivers a **tagged source copy into a repository the Network controls** — a link to Contractor's own repository is not delivery, since it can be moved, made private, or deleted. **Otherwise**, Contractor delivers the final files and any working materials into a Network-controlled store. Either way, with credentials, domains, and documentation. The award closes on that delivery (Framework 25.1).

**7.5 Service awards.** The running service is **performed, not delivered**. The Work Product under 7.1 is the **Operational Handover Set specified below**, excluding Contractor’s pre-existing software and IP; it vests in the VST under section 9. The Network may use, modify, reproduce, and give those handover materials to a successor provider.

1. **Handover and transition.** The requirements below must match the published RFP, including data exports, deadlines, payment terms, and any material limits on switching providers (Framework 20.2a).
2. **Pre-existing software and IP.** Contractor retains ownership of its pre-existing software and IP. Any licences must be **expressly agreed below**; this contract does not automatically require Contractor’s existing platform to be operable by a successor.

| Item | Agreed terms from the published RFP |
|---|---|
| **Service levels and term** | [___] |
| **Operational Handover Set** | [Specify the handover materials, including an export of any Network data in a documented format.] |
| **Transition assistance, deadlines, and payment terms** | [Specify the assistance, any required service overlap, deadlines, and included or separately priced assistance.] |
| **Material limits on switching providers** | [State the limits published in the RFP, or none.] |
| **Expressly agreed pre-existing-IP licences** | [State the rights, scope, duration, any fees, and any rights for a successor, or none.] |

Contractor delivers the Operational Handover Set at **term-end or termination, whichever is earlier**, and provides Network-data export **on request at any time**. Other transition assistance follows the agreed deadlines and payment terms above.

Contractor grants **no exclusivity or restriction on re-competition**. The award closes when the contracted handover and transition requirements are complete and Network-data export is confirmed (Framework 25.1).

**7.6 Embedded awards.** The deliverable is built inside software Contractor already owns. The Work Product in 7.1 vests in the VST; the Pre-Existing IP listed in 7.2 does not.

The licence in **7.3a** applies to Embedded awards.

Where the deliverable is **open source**, it is released under **[___]** — being, as the published RFP's licence mode requires (Framework 20.2a), the licence **required by the RFP**, the licence **Contractor offered from the permitted set** and which the award accepted, or the **default**; the licence recorded here must match the award decision exactly. Contractor delivers a **tagged source copy into a repository the Network controls** under it; a link to Contractor's own repository is not delivery. Where the deliverable **cannot be released as usable open source**, the published RFP states what the Network receives instead — a licence, a service commitment, a source escrow, or a combination — and it is recorded here: **[___]**. Where the RFP declared Default mode, the licence above is the applicable default under Framework 20.2a.

---

## Open points for counsel

1. **Awardees may be entities rather than individuals.** The main agreement accommodates this ("an individual or entity"), but section 9 assignment by an entity should be confirmed as effective against that entity's own employees and subcontractors.
2. **The conditional-on-disbursement term** in the Awardee Schedule A sits alongside section 18 (entire agreement) and section 19 (amendments). Counsel should confirm a Schedule A condition precedent operates as intended against those clauses.
3. **Section 6** says a contractor has no authority to bind or approve expenditures. A Committee member signing a disbursement is exercising authority granted by MSIG and the on-chain permission, not by the contract. Section 2 appears to cover this, but it is worth an express confirmation given how central it is.
4. **Section 15 pseudonymity** versus the Framework's publication requirements — confirm that a stable public handle satisfies attribution for vote counts, recusals, and milestone approvals.
5. **The rate-source suspension term** in the Awardee Schedule A. Confirm that suspending payment on the failure of a third-party price oracle, with delivery dates extended and neither party in breach, holds against the termination and payment clauses of the main agreement — and that the long-stop, 30 business days of suspension and then 10 business days' notice that lapses if payments resume, operates as intended. A suspension now arises only where the CoinMarketCap fallback rate is unavailable too.
