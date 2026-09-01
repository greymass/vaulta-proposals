# Vaulta RFP Platform — Product Requirements & Gap Analysis

**Status: v1.0 — requirements complete, current-state assessment complete**
**Assessed against:** `eosrio/vaulta-rfp` @ `9344411`, 108 commits, last commit 5 Aug 2026 · ~21,900 LOC across 6 apps, 3 packages and one Antelope contract
**Date: [___]**

---

## 1. What This Document Is

A build specification for the RFP Portal, derived from the governance framework and assessed against the platform an external team has already built.

**It is not a governance document.** MSIG #5 and the RFP Framework are the source of truth for policy; this PRD only implements them. Every requirement below carries a **Source** column pointing at the clause it comes from. Where this PRD and those documents disagree, they win and this document is wrong.

**Why it is separate from the Framework.** The RFP Framework is **Exhibit A** to MSIG #5 and is what block producers approve at 15/21. It should stay stable. This PRD should be obsolete once the platform ships. Merging them would make block producers vote on endpoints and force re-approval every time a build decision changes.

### How to read the tables

| Column | Meaning |
|---|---|
| **ID** | Stable identifier — cite these in tickets and in conversation with the platform team |
| **Requirement** | What the platform must do |
| **Source** | Governing clause: `FW` = RFP Framework, `M5` = MSIG #5, `Sched A` = the Schedule A template at Exhibit F. **Every `FW` pointer has been verified to resolve to a section that exists in the current Framework.** The former **`~`** convention — marking pointers carried over from the superseded Charter and Program Design — is retired; 47 such pointers were resolved, of which 22 had cited Framework sections that did not exist |
| **Priority** | `P0` blocks cycle 1 · `P1` needed within cycle 1 · `P2` can follow |
| **State** | To be filled from the codebase: `Exists` · `Partial` · `Absent` · `Conflicts` |
| **Disposition** | `Keep` · `Change` · `Build` · `Drop` |

**State and Disposition are filled from the code.** Assessed 31 August 2026 against the repository named above. Two rows — **R-88** and **R-142** — carry `Superseded` / `Drop` because they were merged into other rows during review, not because of anything found in the code. Where a whole area is absent the assessment is by area and the evidence is stated in the gap analysis; where a row says `Partial` or `Conflicts` the specific code was read. A guessed gap analysis sends the team chasing gaps that do not exist and misses the ones that do.

---

## 2. The Risk Worth Naming First

The platform was built before this governance model existed, and the model changed substantially in recent revisions. Three changes are structural rather than cosmetic:

1. **Block producers do not vote on individual awards.** If the platform models per-award BP voting, that is a core flow to remove, not a setting to toggle.
2. **Funds move on-chain through a 4-of-5 Steering Committee permission.** If the platform records payments made elsewhere rather than proposing and tracking on-chain transactions, the payment path is a build, not a change.
3. **Milestone approval belongs to a named Manager of record per RFP.** If the platform has a generic admin role, the entire permission model needs the concept of per-RFP role assignment.

"Essentially fully functional" may be accurate for a different program than the one MSIG #5 describes. The purpose of the State column is to find that out before anyone commits to a timeline.

---

## 3. Actors and Roles

The platform must express these as distinct roles with distinct permissions. Generic "admin" is not sufficient.

| ID | Actor | Platform needs | Source |
|---|---|---|---|
| A-01 | **Steering Committee member** | Named individual, one of five seats, each with a functional portfolio; holds a signing key; votes on awards; signs disbursements | FW 2.1, 2.6 |
| A-02 | **Chair** | A Committee member with agenda and contact responsibilities; **no additional vote**. Holds the **ministerial MSIG submission right** under FW 9.2 — may send a matter that falls within FW 9.1 by operation of the rules without a Committee vote; any member may do so where there is no Chair (R-56). By default the At-Large member chairs, unless the Committee elects otherwise | FW 5.8, 2.1, 9.2 |
| A-03 | **RFP Program Manager** | Pool of managers; **exactly one Manager of record per RFP**, reassignable; approves milestones. **Never a Committee member** (R-04a0). Has no signing key — approval does not move money | FW 12.2, 12.2a |
| A-04 | **Technical Reviewer** | Assigned per RFP **where the published statement says a Reviewer is engaged** — including on a Service award, which has no built deliverable; submits written scores and milestone assessments. **May be the same person as a Committee member (A-01)** — unlike the Manager (A-03), who never may under FW 12.2a — the role model must not treat the two as mutually exclusive, and a dual-role user carries the 12.6 restrictions (R-04a–e) | FW 12, 12.6 |
| A-05 | **Block producer** | 21 active. **Not a platform user** — no account, no login, no per-award vote. Identity is **the producer's name plus their on-chain account**, a reference the platform displays and never a credential it issues. BPs act through the chain: signed objections during the delay and signed withdrawals, cancellation at 15/21, the owner permission, revocation of the mandate | FW 10.5, 10.8, 15.4 |
| A-06 | **Proposer / Awardee** | Submits proposals; receives debriefs; delivers milestones | FW 21, 23 |
| A-07 | **VS LLC / LLC Manager — platform administrator** | Contracts with awardees and role-holders; ministerial check before contracting. **The administrator role**: manages role assignments and configuration, executing what the Committee has decided. VS LLC operates the platform the VST owns (FW 15.2a) | FW 15.2, 15.2a, 15.3 |
| A-08 | **Public reader** | Unauthenticated read access to everything published | FW 27, 12.4 |

| ID | Requirement | Source | Priority | State | Disposition |
|---|---|---|---|---|---|
| R-01 | **The permission model is hybrid — three kinds of role, not one.** (a) **Seat-based, global:** the five Committee members hold their permissions by seat, for the whole program, and are **tagged onto records by portfolio** rather than assigned to them (R-01a). (b) **Per-record:** Manager of record and Technical Reviewer are assigned **per RFP, bounty, and grant** — the same person may hold a role on several and none of the others. (c) **Administrator:** VS LLC (A-07) manages assignments and configuration. A single global role table cannot express this | FW 12.2, 2.1 | P0 | Partial | Change |
| R-01a | **Committee members are tagged by portfolio, not assigned.** Every RFP, bounty, and unsolicited proposal carries a category (R-14, R-15), and the category maps to a seat under FW 2.1. The portfolio holder is **tagged automatically** on that record as the responsible member — At-Large where it spans categories or fits none. Tagging is derived, not manual, so a category change re-tags and nothing depends on someone remembering | FW 2.1, 19.2, 26 | P1 | Absent | Build |
| R-01b | Portfolio tagging **confers responsibility, not exclusivity**. All five members still vote; a tagged member leads scoping and assessment for that record. Tagging never restricts who may vote and never substitutes for recusal | FW 2.1, 5.3 | P1 | Absent | Build |
| R-01c | Supports a **transition state**: a three-member body exercising oversight only, with the mandate, RFP publication, and awards disabled until all five seats are filled | FW 1.1 | P1 | Absent | Build |
| R-02 | Committee seats are modelled as five named seats with portfolios, not as an undifferentiated member list | FW 2.1 | P1 | Conflicts | Change |
| R-03 | Role assignment, reassignment, and revocation are logged with actor and timestamp | FW 12.3 | P0 | Partial | Change |
| R-03f | **The administrator executes decisions; it does not make them.** Assigning or reassigning a Manager of record or Technical Reviewer requires a **reference to the Committee decision authorizing it** (FW 12.3, 5.3 — simple majority, minimum 3). The platform records the decision reference alongside the actor and timestamp. Without this the administrator becomes a shadow decision-maker in a system whose whole record depends on decisions being attributable | FW 12.3, 5.3 | P0 | Absent | Build |
| R-03g | **Administrator discretion covers configuration, not locked fields.** It may not alter a field locked at publication (R-20a, R-21a), an MSIG-set figure, a recorded vote, an approval record, or anything already written on-chain. Config changes are logged and attributable like role changes | FW 11.8, 20.2a | P0 | Absent | Build |
| R-03h | **No retroactive effect.** Changing a role assignment today never rewrites who held it yesterday. Historical records keep the point-in-time holder (R-83c), and a reassignment is a new state with its own effective date, not an edit to the old one | FW 11.3a, 12.3 | P0 | Absent | Build |
| R-03i | **The administrator cannot self-assign** a Manager of record or Technical Reviewer role, nor assign one to a person connected to VS LLC within the meaning of FW 6.2 as applied by FW 15.2b | FW 15.2b, 6.2 | P1 | Absent | Build |
| R-03a | **Public seat register**: who holds each seat, the appointing proposal name, and its execution transaction. Canonical over on-chain state, since ineffective appointments can exist | FW 3.1 | P1 | Absent | Build |
| R-03b | Seat register handles **multi-seat appointment proposals**: one proposal may fill several seats, so the register keys on seat and records the source proposal per seat, with the same proposal name appearing against more than one seat | FW 3.1 | P1 | Absent | Build |
| R-03c | Register records the proposal's **resolution mode** (seat by seat / all or nothing) and marks seats a proposal named but did not fill, with the reason — already filled, duplicate person, affiliation rule, Treasury affiliation, ban register, or (all-or-nothing) another named seat failed | FW 3.1 | P1 | Absent | Build |
| R-03d | Internal conflicts within one proposal resolve by **Candidates-table row order** — first row wins, later row has no effect. The register records the order applied | FW 3.1 | P1 | Absent | Build |
| R-03e | Register entries recording a seat as unfilled on any ground other than an earlier execution carry **VS LLC's published reasons and an MSIG referral flag**; the seat shows as vacant pending MSIG. The platform does not present VS LLC's entry as an eligibility determination | FW 3.1 | P1 | Absent | Build |
| R-04 | A conflicted Manager can be swapped on a single RFP without affecting their other RFPs | FW 12.3, 12.2 | P0 | Absent | Build |
| R-04a | A person may hold **both a Committee seat and a Reviewer engagement**; the role model must allow it rather than treating the two as mutually exclusive | FW 12.6 | P1 | Absent | Build |
| R-04a0 | A person may **never** hold both a Committee seat and the **Manager of record** role. The platform blocks assigning a seated member as Manager on any RFP, and **flags a seating that collides**: a person seated while holding a live Manager engagement ceases to be Manager of record on execution, so the platform raises a blocking reassignment task on each of their RFPs, due in 5 business days. It does **not** claim to block the seating itself — seating is an on-chain MSIG act and FW 3.1 reserves eligibility to MSIG. **No override, no waiver path** on the bar itself | FW 12.2a, 3.1 | P0 | Absent | Build |
| R-04a0b | Where **no unconflicted Manager** is available on an RFP, the platform blocks assignment, records and publishes the fact, and routes the milestone or evaluation to MSIG under FW 9.1. It never offers a Committee member as the fallback | FW 12.3, 9.1 | P0 | Absent | Build |
| R-04a1 | **Engagement is blocked entirely until both MSIG caps — per-cycle fee and concurrent engagements — are configured.** Absent values mean blocked, not unlimited; the caps are the only control on the arrangement | FW 12.6.1 | P0 | Absent | Build |
| R-04a2 | Engaging a member as Reviewer additionally requires: a recorded and published **"no suitable external reviewer available" finding**; **all five seats filled**; no other member already reviewing that RFP; and the member within both caps. The platform blocks on each | FW 12.6.1 | P0 | Absent | Build |
| R-04a3 | An existing member-Reviewer engagement is **automatically suspended while any seat is vacant**. It resumes when the seat is filled **unless a substitute was engaged**, in which case resumption requires a Committee decision; absent it the substitute remains the engaged Reviewer and the member's fee is prorated. The platform never leaves two engaged Reviewers on one RFP | FW 12.6.1 | P1 | Absent | Build |
| R-04a3b | Where the suspended member is the **only engaged Reviewer on a published RFP or a live award**, the platform raises a blocking task to **engage a substitute Reviewer**; failing that it routes a not-yet-awarded RFP to the Manager for the scored assessment (R-40a) and a live award's milestone to MSIG. The published "Reviewer engaged" field records **that** one is engaged, not who, so a substitute satisfies R-81 without reopening the locked field (R-21a) | FW 12.6.1, 20.2 | P0 | Absent | Build |
| R-04a4 | The member is **excluded from the availability finding vote and from the vote engaging them**; both are simple majority, minimum 3, on non-recused seats | FW 12.6.2, 5.3 | P1 | Absent | Build |
| R-04b | For a member-Reviewer on that RFP the platform **blocks them from drafting acceptance criteria and the milestone schedule**; **disables proposal scoring and score reconciliation** and offers a written-note field instead (see R-40a); **disables their vote on any termination recommendation, recovery plan, or strike decision concerning that award regardless of who filed it, and keeps that block after the engagement ends or is suspended** — escalating to MSIG where **recusals of any kind** leave fewer than four non-recused members; and leaves their award vote and milestone signature enabled | FW 12.6.3, 11.10a | P0 | Absent | Build |
| R-04c | Reviewer fees payable to a member are scheduled as a **separate Program Cost line and their own separate payment — one per member-Reviewer, never combined** — with that member excluded from their own schedule-line vote and from signing their own payment only. Two member-Reviewers sharing one payment would leave three signers against a 4-of-5 permission | FW 13.3a, 12.6 | P0 | Absent | Build |
| R-04c1 | The fee is read from the **Exhibit B rate card** and is not editable in the platform; there is no Committee rate-setting flow to recuse from | FW 12.6.5 | P1 | Absent | Build |
| R-04d | Cycle report lists every member-Reviewer engagement and fee, by member and by RFP, and totals each member's Reviewer fees against the per-cycle cap; the platform **blocks a new engagement that would breach either cap** | FW 12.6.5, 13.5 | P1 | Absent | Build |
| R-04e | Taking an engagement requires a **disclosure questionnaire update filed before the engagement begins** — a hard gate, not the 10-business-day change window | FW 6.3c, 12.6.5 | P1 | Absent | Build |
| R-05 | Technical Reviewer assignment is optional per RFP, set by the Committee at scoping. The **published "Reviewer engaged: yes/no" field is set at publication and locked thereafter** — it is the single source for whether an assessment is required at any milestone or signature on that award | FW 11.2, 20.2 | P1 | Absent | Build |

---

## 4. RFP Lifecycle

### 4.1 Needs intake and backlog

| ID | Requirement | Source | Priority | State | Disposition |
|---|---|---|---|---|---|
| R-10 | Public needs backlog with statuses: `new`, `under review`, `prioritized`, `drafting`, `published`, `deferred`, `declined` | FW 18.3 | P1 | Absent | Build |
| R-11 | Intake accepts submissions from block producers, Committee, Trustee/LLC Manager, ecosystem teams, and the community | FW 18.1 | P1 | Absent | Build |
| R-12 | Declined items require a reason before status can be set — the field is not optional | FW 18.3 | P1 | Absent | Build |
| R-13 | Nothing is deletable from the backlog; status changes are append-only and visible | FW 18.3 | P1 | Absent | Build |
| R-14 | Items are taggable to the MSIG #4 proposal categories and thereby to a seat portfolio. **Categorization applies to all three instruments — directed RFPs, bounties, and unsolicited proposals — not only backlog items**, and drives the portfolio tag in R-01a | M5 Part B, FW 2.1 | P1 | Partial | Change |
| R-15 | **Unsolicited (open call) proposals are categorized on arrival** using the same categories, routing them to the portfolio holder — At-Large where they span categories or fit none | FW 26 | P2 | Absent | Build |
| R-16 | Category budget shares and the cycle report cover **all three channels** — directed RFPs, open call, bounties — in one breakdown, as amounts and as shares of the Cycle Ceiling. With no sub-limits between them, this breakdown is the only place drift is visible | FW 19.2, 26, 13.5 | P1 | Absent | Build |
| R-16a | Cycle report **flags where bounties exceed 25% of awards committed** in a cycle and requires the Committee's stated reason before the report can be published. Comply-or-explain, not a cap — the platform never blocks a bounty on this ground | FW 13.5, 26a | P1 | Absent | Build |

### 4.2 RFP drafting and publication

| ID | Requirement | Source | Priority | State | Disposition |
|---|---|---|---|---|---|
| R-20 | RFP record carries every required field: scope in/out, deliverables, acceptance criteria, milestone schedule, budget, timeline, evaluation criteria **and weights**, eligibility, conflict rules, IP terms, decision timeline, named Manager of record, whether a Technical Reviewer is engaged | FW 20.2 | P0 | Partial | Change |
| R-21 | Evaluation criteria and weights are **locked at publication** and cannot be edited afterwards | FW 22.1, 20.2 | P0 | Absent | Build |
| R-20a | RFP record carries an **award shape** field — Deliverable / Service / Embedded — and — **on Deliverable and Embedded awards only** — a **licence mode** field: Required (with the named licence), Proposer's choice (with the permitted set), or Default. A **Service** award has no licence mode; its handover set vests outright. Both are **locked at publication** on the same path as R-21 — **no edit, no admin override**, and no change route through the FW 11.8 change table. Shape drives the contract terms (R-20b), the closing test (R-20c), and the completion checklist | FW 20.2a | P0 | Absent | Build |
| R-20b | Contract-generation applies the shape's required terms: Deliverable → vesting plus Network-repository delivery; Service → **service levels and term**, handover set vesting in the VST with successor-provider rights, no-exclusivity, data export on request; Embedded → named-deliverable vesting, pre-existing-IP schedule, licence-back | FW 23.3a | P1 | Absent | Build |
| R-20c | **Closing checklist is shape-specific.** A Service award's checklist must **not** ask for a **built-deliverable** handover — there is none; the operational handover set **is** the work product and it vests. It asks for the handover set and data export confirmation. A Deliverable or open-source Embedded award requires a **tagged source copy in a Network-controlled repository**; a link to the awardee's own repository does not satisfy it. A **non-code Deliverable** award requires final files and working materials in a Network-controlled store under the **licence recorded in the award decision** (R-53a). Every Deliverable close also confirms credentials, domains, and documentation. A **closed-source Embedded** award requires written confirmation that the licence or alternative named in the RFP is in force, plus a record of any escrow deposit | FW 25.1 | P0 | Absent | Build |
| R-20c1 | A **terminated** award closes on its shape's handover items alone — final acceptance and final payment are not required, or a terminated Service award could never close | FW 25.1, 11.10 | P1 | Absent | Build |
| R-20f | Until the **counsel confirmation on section 9** is recorded, the platform **blocks publishing a Service or Embedded RFP**, and **blocks contracting any award with a populated pre-existing-IP schedule**. A Deliverable award with an empty schedule proceeds | FW 23.3a | P0 | Absent | Build |
| R-20d | **Every** award captures a **structured pre-existing-IP schedule** (item, owner, how it appears) at contracting — not Embedded only. An empty schedule means none. The platform does not accept a pre-existing-IP claim raised after contracting | FW 23.3a, Sched A 7.2 | P1 | Absent | Build |
| R-20d1 | Where the schedule is populated, the contract carries the **licence back** over pre-existing IP as embedded in the work product, irrevocable and surviving termination, on any shape | FW 23.3a, Sched A 7.3a | P1 | Absent | Build |
| R-20d2 | A **Service** award requires the awardee's retained service software to be listed on the pre-existing-IP schedule, and captures the **independent-usability warranty** on the handover set | FW 23.3a, Sched A 7.5 | P1 | Absent | Build |
| R-20e | Where an RFP departs from the default licence, or a deliverable is closed-source, the platform requires the **reason and the alternative** as published fields before publication. Silence resolves to the default | FW 20.2a | P1 | Absent | Build |
| R-20e1 | **Required mode:** a proposal offering a licence other than the one named is **non-compliant at the screen** (R-33) and cannot be scored | FW 20.2a | P1 | Absent | Build |
| R-20e2 | **Proposer's choice mode:** the proposal form requires a licence selected **from that RFP's permitted set** — no free text, and no standing list to fall back on. The set is a **required field on the RFP record**, entered per RFP and **blocking at publication** in this mode | FW 20.2a | P1 | Absent | Build |
| R-20e2a | Where a Proposer's-choice RFP nonetheless carries no set, the platform offers **permissive licences only, branched by deliverable type** — Apache-2.0, MIT, BSD-3-Clause for code; CC-BY-4.0, CC0-1.0 for non-code — and flags the RFP as defective. A data-integrity backstop, not a supported path | FW 20.2a | P2 | Absent | Build |
| R-20e3 | The **mode, the permitted set, and — in Required mode — the licence named all lock at publication** (R-20a). In Proposer's choice mode the **licence itself is fixed at the award decision**, recorded in the decision record (R-53a) and carried into the agreement — it is not a publication-locked field, because there is nothing to lock at publication | FW 20.2a, 11.8 | P1 | Absent | Build |
| R-20e4 | Licence may be scored **only where "licence offered" is published as a criterion in its own right with its own weight** before submissions open. Where it is not, the **scoring form carries no licence dimension** — the licence stays visible as part of the proposal (it cannot be hidden), but there is nothing to score it against, and the standing "openness" criterion does not supply one | FW 20.2a, 22.1 | P1 | Absent | Build |
| R-20e5 | **Closed-source RFPs are Required mode only** — the platform blocks Default and Proposer's choice on them, both resolving to an open-source release the RFP has said is impossible | FW 20.2a | P1 | Absent | Build |
| R-20e6 | Compliance screen (R-33) rejects a proposal offering a licence other than the Required one, or — in Proposer's choice mode — outside the permitted set or naming none | FW 22.2, 20.2a | P1 | Absent | Build |
| R-20e7 | **Clarification under FW 22.8 cannot change the licence offered** in Proposer's choice mode; the platform locks that field after submission | FW 22.8 | P1 | Absent | Build |
| R-21a | The **"Reviewer engaged" field is locked at publication** on the same path as R-21 — no edit, no admin override. It is the award's permanent answer for every milestone and signature (R-05, R-81, R-82, R-86) | FW 20.2, 11.2 | P0 | Absent | Build |
| R-22 | Budget ceiling is a published field, not internal-only | FW 20.3, 20.2 | P0 | Exists | Keep |
| R-23 | Publication requires a Committee vote record meeting the threshold (simple majority, floor of 3) | FW 20.4, 5.3 | P0 | Conflicts | Change |
| R-24 | Minimum open period enforced: 21 days standard, 10 days with a recorded rationale | FW 20.5 | P1 | Absent | Build |
| R-25 | Material amendments are published as numbered amendments and **auto-extend the deadline by ≥7 days** | FW 21.3 | P1 | Absent | Build |
| R-26 | Platform blocks publication where the expected award exceeds the per-award limit or remaining cycle headroom, unless an MSIG escalation record is attached | FW 20.4, 9.1 | P1 | Absent | Build |

### 4.3 Q&A and submission

| ID | Requirement | Source | Priority | State | Disposition |
|---|---|---|---|---|---|
| R-30 | All questions and answers are **published to all proposers**, anonymised as to asker. No private substantive channel may exist in the product. **Applies to every instrument** — directed RFP, open call, and bounty (R-151g) — since FW 27 rule 2 applies throughout and 26a creates no exception | FW 21.2, 27 r2 | P0 | Absent | Build |
| R-31 | Submission deadline is hard-enforced; late submissions rejected with no override path except a documented channel failure | FW 21.4 | P1 | Absent | Build |
| R-32 | Proposal contents are confidential until award announcement, with access limited to Manager of record, assigned Reviewers, and non-recused Committee members | FW 6.5, 5.6 | P0 | Conflicts | Change |
| R-33 | Compliance screen recorded separately from merit assessment, with written rejection reasons | FW 22.2 | P1 | Absent | Build |

### 4.4 Evaluation

| ID | Requirement | Source | Priority | State | Disposition |
|---|---|---|---|---|---|
| R-40 | Technical Reviewers submit **independent written scores**; the platform must prevent visibility of other reviewers' scores before submission. **Does not apply to a member-Reviewer** — see R-04b and R-40a, which override this row for that case | FW 22.3 | P0 | Absent | Build |
| R-40a | Where the only engaged Reviewer on an RFP whose Reviewer-engaged field is "yes" is a Committee member, the **Manager of record writes the scored assessment** against the published criteria and the member's written note is published alongside it. Without this the award path is blocked, since the member may not score | FW 22.3, 12.6 | P0 | Absent | Build |
| R-41 | Where the award's **Reviewer-engaged field is "no"**, the Manager of record produces the written assessment in the same format. Keyed to the field, never to a technicality judgment — otherwise an RFP the Committee thinks technical but published as "no" falls between R-40 and this row and gets no assessment at all | FW 22.3 | P0 | Absent | Build |
| R-42 | Score reconciliation after independent submission is recorded, not overwritten | FW 22.3 | P1 | Absent | Build |
| R-43 | Where the Committee awards against the scores, a **written justification is mandatory** and blocks the award until supplied | FW 22.5 | P0 | Absent | Build |
| R-44 | Recused members are excluded from proposal materials and from the vote tally automatically | FW 5.6, 27 r3 | P0 | Partial | Change |
| R-45 | Unsuccessful proposers can retrieve their own scores and debrief | FW 23.4 | P2 | Absent | Build |

---

## 5. Award Decision

| ID | Requirement | Source | Priority | State | Disposition |
|---|---|---|---|---|---|
| R-50 | Award vote threshold: two-thirds of filled non-recused seats rounded up, **floor of 3 affirmative** | FW 5.3 | P0 | Conflicts | Change |
| R-51 | Platform computes the threshold dynamically from filled seats and recusals, rather than hard-coding 4 | FW 5.3, 5.6 | P0 | Conflicts | Change |
| R-52 | Where recusals or vacancies leave **fewer than four able to sign**, the platform blocks the payment and flags it as a reserved matter. This covers **any payment, not only an award** — a Program Cost payment can hit the same wall on a vacancy or an unrelated recusal. Also blocks and escalates a **termination recommendation on an award reviewed by a Committee member** where **recusals of any kind** leave fewer than four non-recused members — **not only FW 12.6 recusals**. An ordinary conflict recusal counts, and the outcome must never turn on the unanimity of three | FW 5.6, 9.1, 11.10a | P0 | Absent | Build |
| R-53a | Decision record and award publication both carry the **award shape** and the **licence** — the one the RFP required, the one the awardee offered where the choice was open, or the applicable default stated expressly in Default mode | FW 23.2, 10.3 | P1 | Absent | Build |
| R-53 | Decision record captures: awardee, scope, total, milestone schedule and amounts, vote count, recusals, departure reasoning, **and the oracle median, block, transaction id, and datapoint timestamp at the decision** (the collar measures against it) | FW 23.2 | P0 | Partial | Change |
| R-54 | Incomplete decision records cannot progress to contracting | FW 23.2 | P0 | Absent | Build |
| R-55 | **Block producers have no per-award vote.** If such a flow exists, it is removed | M5 Part C | P0 | Conflicts | Drop |
| R-56 | Reserved matters route to an MSIG escalation record with a 10-business-day submission clock and a 30-day deemed-declined clock. **Two exceptions to the deemed decline:** where the escalated matter is a **payment or a milestone under an executed agreement**, MSIG inaction does **not** decline it — the matter stays open, the **reservation is not released** (R-101, R-102), and the platform raises a re-submission task rather than closing the record. Declining a delivered milestone because MSIG did not act would penalize the awardee for the Network's own delay **Two routes in, and submission is ministerial on one of them:** where a matter falls within FW 9.1 by operation of the rules rather than by a vote to escalate, **no Committee vote is required to send it** and the **Chair — or any member where there is no Chair — submits**. Without this a Committee that had lost quorum to recusals could not escalate the matter the recusals created | FW 9.1, 9.2 | P0 | Absent | Build |

---

## 6. Publication and the Delay Window

| ID | Requirement | Source | Priority | State | Disposition |
|---|---|---|---|---|---|
| R-60 | Award decision publishes to the Portal **within 2 business days**, in two stages — decision detail first, on-chain transaction reference appended when the disbursement is proposed | FW 10.3, 23.4 | P0 | Absent | Build |
| R-61 | **Objection register**: attributable to the block producer, timestamped, publicly visible, withdrawable | FW 10.5, 10.6a | P0 | Absent | Build |
| R-62 | Objection count is **fixed at the close of the delay window**; later objections do not change the band | FW 10.6 | P0 | Absent | Build |
| R-63 | Banding computed and displayed: 0–3 proceeds · 4–6 cancel and MSIG confirmation · 7+ cancel and lapse | FW 10.5 | P0 | Absent | Build |
| R-64 | Withdrawal that moves an award from 7+ into 4–6 recomputes the band before the close | FW 10.5, 10.6 | P0 | Absent | Build |
| R-65 | Delay clock starts on **complete** publication; material correction restarts it | FW 10.4 | P0 | Absent | Build |
| R-66 | Urgent (shortened) delay requires a **two-thirds vote with a minimum of 3**, a recorded reason, and completed publication before proposal. Supports the **72-hour tier as a distinct path** from the standard 168 hours, both configured from MSIG #5 Part E rather than hard-coded | M5 Part E | P1 | Absent | Build |
| R-67 | 30-day MSIG confirmation clock on 4–6 band awards, with automatic lapse | FW 10.9 | P1 | Absent | Build |
| R-68 | Manager of record maintains the register for their RFP | FW 10.6 | P1 | Absent | Build |

---

## 7. On-Chain Integration

**The highest-risk area.** If the platform records payments rather than proposing transactions, this section is a build.

| ID | Requirement | Source | Priority | State | Disposition |
|---|---|---|---|---|---|
| R-70 | Platform composes and submits **msig proposals** against the Program Account for award and milestone disbursements | M5 Part E | P0 | Partial | Change |
| R-71 | Displays live approval state — which members have signed, how many remain to reach four | FW 7.2 | P0 | Exists | Keep |
| R-72 | Tracks the delay window and surfaces time remaining. Must support **both** mechanisms: a protocol-enforced delay, or a held msig proposal left unexecuted for the window | M5 Part E | P0 | Absent | Build |
| R-73 | Supports **cancellation** of a proposal as a 3-of-5 administrative action | FW 10.7, 7.2 | P0 | Partial | Change |
| R-74 | Detects and displays block producer cancellation of a delayed transaction | M5 Part C | P1 | Absent | Build |
| R-75 | Reads Program Account balance and reconciles it to platform state | M5 Part E | P1 | Partial | Change |
| R-76 | **Awardee receiving account is a verified field** on the agreement, and is the only address a disbursement can target. Verification is defined in FW 23.3b and gates contracting — an unverified account blocks the agreement, and therefore blocks any proposal under R-77 | FW 23.3b, 11.3 | P0 | Absent | Build |
| R-76a | **Initial verification, three gates, all required**: the account resolves on chain and can receive A; a **signed challenge message from that account** is captured, proving key control; and a **non-email confirmation** against the contact recorded at contracting is logged. The platform stores the signature and can re-verify it later | FW 23.3b | P0 | Absent | Build |
| R-76b | **Change flow**: a change request is verified through a **channel different from the one it arrived on** — the platform records both and **blocks where they match** — requires a **fresh signed challenge** from the new account, and holds **one business day** before the account becomes payable. **No urgency override and no admin bypass**, unlike the R-03g configuration path | FW 23.3b | P0 | Absent | Build |
| R-76c | **A change during a live delay window never redirects a payment.** The proposal targets the old account, so the platform blocks the substitution, and requires **cancellation under R-73** (3-of-5) and a **fresh proposal with a fresh delay** once the new account is verified. It never edits the target of a proposed transaction | FW 23.3b, 7.2, 10.7 | P0 | Absent | Build |
| R-76d | Verification records — date, channel, signed proof, verifying person — are **append-only and retained per account**, so a past payment stays attributable to the account verified at the time rather than to the current one (R-83c, R-03h) | FW 23.3b, 11.3a | P1 | Absent | Build |
| R-77 | No disbursement can be proposed until the executed agreement is recorded — the contract-first rule is enforced in the product, not by convention | FW 10.1, 10.2 | P0 | Absent | Build |
| R-78 | Key management is **out of scope for the platform** — members sign with their own wallets. The platform **never holds a key with any authority over the Program Account and never holds a member's signing key.** The VS LLC `disc.vst` register key under R-114f and R-70d is the sole exception and has no weight on the Program Account | FW 7.6, 6.3b | P0 | Exists | Keep |
| R-78a | **Declared key loss or compromise suspends payment proposals programme-wide.** On a recorded declaration under FW 7.5 the platform marks that member **unable to sign** and **blocks composition of any new payment proposal** until the key is replaced — “the Committee proposes no payments in the meantime” is a programme-wide state, not a per-member one. Distinct from R-78: the platform still never holds a key, it only records that one is unusable | FW 7.5 | P0 | Absent | Build |
| R-78b | An unable-to-sign member feeds the **fewer-than-four-signers test in R-52**, so a compromise during a live delay window surfaces as a reserved matter rather than a silently stalled payment. Clearing the flag requires a recorded key replacement, and the seat register (R-83c) records the rotation as a new point-in-time state without rewriting who signed earlier payments (R-03h) | FW 7.5, 5.6, 3.1 | P1 | Absent | Build |
| R-79 | Transaction references stored and surfaced on every published award and milestone | FW 10.3, 13.5 | P1 | Partial | Change |

---

### 7.1 On-chain decision records

Decisions are recorded on-chain, not only published. Same append-only register as the disclosure questionnaires (`disc.vst`), separate decisions table, same VS LLC key with no weight on the Program Account.

| ID | Requirement | Source | Priority | State | Disposition |
|---|---|---|---|---|---|
| R-70a | Writes an **on-chain decision record** for: award decisions; milestone approvals; payment signatures; and Committee resolutions with an external effect — terminations, recovery plans, strikes, engagements, reserved-matter escalations | FW 7.6a | P0 | Partial | Change |
| R-70b | Each record carries the **coded fields plus a SHA-256 hash of the published record**, and the Portal displays the hash and transaction id with one-click verification — same pattern as R-114f/g | FW 7.6a | P0 | Partial | Change |
| R-70c | Records are **append-only**; a correction is a new record referencing the prior transaction. No edit or delete path in the platform or the contract | FW 7.6a | P0 | Partial | Change |
| R-70d | Written with the **`disc.vst` key**, which has no weight on the Program Account (R-78). The decisions table is separate from the disclosures table on the same account | FW 7.6a, 6.3b | P0 | Absent | Build |
| R-70e | If the Portal is unavailable, the on-chain record plus its hash is sufficient to prove what was decided and when. The platform is not the system of record for decisions — the chain is | FW 7.6a | P1 | Partial | Change |

### 7.2 The `disc.vst` registers — contract scope

**Serviced by the EOS Rio team.** Everything above and in section 10.1 *writes to* these contracts; nothing so far *builds* them. They are a separate deliverable from the web platform — two on-chain contracts on `disc.vst`, one register each for disclosures (FW 6.3b) and decisions (FW 7.6a).

**VS LLC remains accountable** under MSIG #5 Part E and publishes the configuration as Exhibit D. Rio doing the work does not move that accountability, and Exhibit D must describe what was actually deployed.

| ID | Requirement | Source | Priority | State | Disposition |
|---|---|---|---|---|---|
| R-160 | Two tables on `disc.vst`: **disclosures** and **decisions**. Separate tables, one account, one contract or two — the split that matters is the table, so a decisions query never scans disclosure rows | FW 6.3b, 7.6a | P0 | Absent | Build |
| R-161 | **Append-only enforced in the contract**, not only in the platform. No modify action, no erase action, no admin path. R-70c and R-114h say "no edit or delete path in the platform **or the contract**" — that is a contract requirement, and an app-layer-only guarantee does not satisfy it | FW 6.3b, 7.6a | P0 | Absent | Build |
| R-162 | A correction is a **new row referencing the prior row's transaction id**, with a reason field. The contract accepts the reference; it never rewrites the referenced row | FW 6.3b, 7.6a | P0 | Absent | Build |
| R-163 | **Write authority is a single named VS LLC permission** with no weight on `rfp.vst`. The contract rejects writes from any other authority. Deployment (`setcode`) authority is stated in Exhibit D and is **not** the writing key | FW 6.3b, 7.6 | P0 | Absent | Build |
| R-164 | Rows carry a **schema version** — questionnaire version for disclosures, decisions-schema version for decisions — so a later version never invalidates or reinterprets an earlier row (R-114a) | FW 6.3a, 7.6a | P0 | Absent | Build |
| R-165 | **Hash field is SHA-256** over a **defined serialization of the published record**, and the serialization is specified — canonical byte form, encoding, and what is included — so an independent verifier reproduces the same digest. A hash nobody else can recompute proves nothing | FW 6.3b, 7.6a | P0 | Absent | Build |
| R-166 | **Published test vectors**: at least one disclosure record and one decision record with their source documents and expected digests, so anyone can verify the implementation without trusting the Portal | FW 6.3b, 7.6a | P1 | Absent | Build |
| R-167 | **Public read access.** Tables readable by anyone through standard chain APIs with no permission and no gatekeeping through the Portal. The chain is the system of record for decisions (R-70e), which only holds if the records are readable when the Portal is not | FW 7.6a | P0 | Absent | Build |
| R-168 | **ABI published** and matching the deployed code; Exhibit D carries it | M5 Part E | P0 | Absent | Build |
| R-169 | **RAM provisioning and a growth plan.** An append-only register that never deletes grows monotonically for the life of the program — every filing, correction, award, milestone, and signature is a permanent row. Estimate the annual row count and byte cost, provision accordingly, and name who tops it up. A register that stops accepting writes for want of RAM stops the program: filings gate pay and signing weight (R-114k), and decisions gate the record | FW 6.3b, 7.6a | P0 | Absent | Build |
| R-170 | `disc.vst` **holds no program funds** and no meaningful token balance. It is a record account; there should be nothing on it worth attacking | FW 6.3b | P1 | Absent | Build |
| R-171 | **Upgrade path stated**: who may `setcode`, what happens to existing rows on upgrade, and confirmation that an upgrade cannot rewrite or drop history. An append-only guarantee that a redeploy can erase is not one | FW 6.3b, 7.6a | P0 | Absent | Build |
| R-172 | **Testnet deployment first**, with the test vectors in R-166 reproduced against it, before mainnet | — | P1 | Exists | Keep |
| R-173 | Contract source is **VST-owned work product** in a **VST-controlled repository**, under the default code licence (Apache-2.0). Same rule as the platform itself (FW 15.2a) — it is not exempt for being small or on-chain | FW 15.2a, 20.2a | P0 | Absent | Build |
| R-174 | **Classification under FW 15.2b:** building or materially reworking these contracts is an **award**; running them unchanged — RAM top-ups, monitoring, key custody — is an **operating cost**. The Committee classifies by recorded vote. Worth settling before the work starts, not after the invoice | FW 15.2b | P1 | Absent | Build |

## 8. Milestone Approval and Payment

| ID | Requirement | Source | Priority | State | Disposition |
|---|---|---|---|---|---|
| R-80 | **Manager of record approves each milestone** — not the Committee, not a generic admin | FW 11.1 | P0 | Conflicts | Change |
| R-81 | Where the award's locked **"Reviewer engaged" field is yes**, a Technical Reviewer's written assessment is **mandatory** and blocks approval until present. The platform reads the field, never re-infers technicality from deliverable text | FW 11.2, 20.2 | P0 | Absent | Build |
| R-82 | Where the field is **no**, no Reviewer is required, approval proceeds on the Manager's assessment, and the absence of an assessment is **not** flagged as an incomplete record | FW 11.2 | P0 | Absent | Build |
| R-83a | **Named attribution is mandatory on every decision record.** Milestone approval names the **Manager of record** and any **Technical Reviewer** by name and on-chain account; a payment names **each signing Committee member by name and on-chain account**; an award names members voting for, against, and recused **by name and account**. The account alone never satisfies a name field | FW 11.3a | P0 | Partial | Change |
| R-83b | Name and account are **captured as separate fields and both published**, and both are written to the on-chain record under R-70a. Accounts rotate and permissions get rebuilt by block producers; a record with only an account becomes unattributable | FW 11.3a, 7.3 | P0 | Partial | Change |
| R-83c | Signer identity is resolved from the **seat register at the time of signing** — which carries name and on-chain account (FW 3.1) — and stored as a **point-in-time snapshot**, not a live lookup. A later seat change, key rotation, or handle change must not rewrite who signed a past payment | FW 11.3a, 3.1 | P0 | Absent | Build |
| R-83 | Approval record captures: milestone, criteria applied, determination and reasons, Reviewer assessment where the award's "Reviewer engaged" field is yes, amount payable, verified receiving account | FW 11.3 | P0 | Partial | Change |
| R-84 | Approval and amount are **published**; milestones carry the **normal delay** but no objection banding | FW 11.6 | P1 | Absent | Build |
| R-85 | Committee signature on a milestone is **ministerial** — the UI should present it as verification of the **five conditions in FW 11.4** (see R-89d1), not as a merit review | FW 11.4 | P1 | Absent | Build |
| R-86 | A member declining to sign must record a written ground; the platform captures it. Grounds are chosen from the five checks in FW 11.4 — **"the work should have had a Reviewer" is not among them** on an award whose field is no | FW 11.4, 11.5 | P1 | Absent | Build |
| R-87 | A conflicted Manager cannot approve; the platform blocks and prompts reassignment. **Conflicted is not a judgment call by the platform.** The single definition is **FW 6.4**, which applies 6.1 and 6.2 to Managers and Reviewers as if references to a member were references to them, and picks up anything the person declared in **Parts 3, 5, or 7** of their questionnaire (FW 6.3a). Platform triggers, in order: an entity match under R-114o against a Part 3/5/7 declaration; the **FW 2.4a Treasury bar**, which is absolute; the **ban register** (R-119c); and a manual flag raised by the Manager or the Committee, which is **never removable by the Manager**. The same definition governs who may file a termination recommendation (R-89g3) | FW 6.4, 2.4a, 6.3a | P0 | Absent | Build |
| R-88 | *Merged into **R-150**, which carries the 15% cap.* Retained as a stable citation; no separate requirement. | — | — | Superseded | Drop |
| R-89 | Milestone slippage triggers a **recovery plan** record within 10 business days, managed by the Manager of record; a second consecutive miss flags Committee review. Terminology follows FW 11.9 — a **recovery plan**, not a remediation plan; FW 11.10a uses "remediation" for something else (fixes specified in an earlier determination) and the two are not interchangeable | FW 11.9 | P2 | Partial | Change |
| R-89a | **Termination recommendation** can be filed by the Manager of record or by an engaged Technical Reviewer against an award, stating which of the FW 11.10a grounds apply and attaching the milestone determination it arises from | FW 11.10a | P1 | Partial | Change |
| R-89b | A Reviewer files **directly to the Committee**. The Manager has no hold, edit, or suppress path over a Reviewer's recommendation, and the platform does not route it through them | FW 11.10a | P0 | Partial | Change |
| R-89c | Where Manager and Reviewer disagree on the same award, **both positions are recorded and published** side by side | FW 11.10a | P1 | Absent | Build |
| R-89d | Filing raises a **cancellation task for the Committee due within 2 business days**, executed through the 3-of-5 cancellation path in R-73 — the filer has no key and the platform cancels nothing itself — and **blocks further milestone approval** on that award until the Committee decides. Overdue cancellation is surfaced as a referral ground under FW 10.7 | FW 11.10a, 10.7 | P0 | Partial | Change |
| R-89d1 | Signing UI shows a **fifth ministerial check** — "no termination recommendation open on this award" — so a member withholding signature during a freeze records a valid ground under R-86 | FW 11.4, 11.5 | P0 | Absent | Build |
| R-89e | Awardee response window of **10 business days** opens on filing; the response is captured and published with the recommendation | FW 11.10a | P1 | Partial | Change |
| R-89f | Committee decision due **15 business days** after the response window closes, tracked as an overdue item; decision published with reasons **including a decision not to terminate** | FW 11.10a | P0 | Partial | Change |
| R-89g | Committee outcomes on a recommendation: terminate (two-thirds, minimum 3), direct a recovery plan under FW 11.9 (simple majority, minimum 3) with a reassessment date, or decline (simple majority, minimum 3) | FW 11.10a, 5.3 | P1 | Partial | Change |
| R-89g1 | **Where the recommendation has not been escalated:** if no outcome reaches its threshold within 15 business days the recommendation is **automatically deemed declined**, the freeze lifts, and the vote counts publish. No manual step, and no state in which an unescalated award stays frozen indefinitely. **Escalation suspends this row — see R-89g1a** | FW 11.10a | P0 | Absent | Build |
| R-89g1a | **Escalation suspends the clock and holds the freeze.** Where the recommendation goes to MSIG under FW 12.6.1(3) or 9.1 — including on the R-52 route — the 15-business-day clock and the R-89g1 deemed decline are **suspended from the date of escalation**, and the freeze on payment proposals and further milestone approvals **continues while MSIG holds it**. The platform must never lift a freeze or resume payment on an award MSIG is still deciding whether to terminate. On MSIG inaction after the 30 days in FW 9.2 the recommendation is **deemed declined and the freeze lifts** — FW 11.10a's own express rule, not displaced by R-56's exception, which protects the underlying milestone payment rather than the recommendation | FW 11.10a, 9.2 | P0 | Absent | Build |
| R-89g2 | Committee may **strike** a recommendation filed by a conflicted person or by someone not then Manager of record / an engaged Reviewer, at simple majority, lifting the freeze immediately and publishing reasons | FW 11.10a | P1 | Partial | Change |
| R-89g3 | Platform **blocks filing** by a person conflicted on that award (per R-87's definition) or not currently in the role, and offers a notify-the-Committee path instead | FW 11.10a, 6.4 | P1 | Absent | Build |
| R-89g4 | On decline, the cancelled proposal is **re-proposable without a further award vote**, with a fresh delay and no objection banding; any FW 10.10 60-day clock is **extended by the freeze duration**, computed by the platform | FW 11.10a, 10.10 | P1 | Absent | Build |
| R-89g5 | A termination recommendation **does not release the reservation** — only the termination does. Released amounts return to the ceiling of the cycle in which release occurs | FW 13.3 | P0 | Absent | Build |
| R-89h | Recommendations and their outcomes are **not** surfaced as a performance metric on the filer, and the filer's fee record is unaffected by the outcome | FW 11.10a | P2 | Absent | Build |
| R-90 | Award amount increases require the full award threshold, a contract amendment, and a **fresh proposal and delay** | FW 11.8 | P0 | Absent | Build |

---

## 9. Ceiling, Reservation, and Accounting

| ID | Requirement | Source | Priority | State | Disposition |
|---|---|---|---|---|---|
| R-100 | Cycle ceiling and per-award limit are configurable per cycle, **held in USD** | M5 Part D | P0 | Absent | Build |
| R-101 | An award **reserves** its full amount at decision, through publication, contracting, delay, and any confirmation window | FW 13.2 | P0 | Absent | Build |
| R-102 | Reservation releases on lapse, expiry, BP cancellation, termination as to unearned amounts, or a lower contracted amount — **not** on a Committee cancellation with MSIG confirmation pending | FW 13.3 | P0 | Absent | Build |
| R-103 | Platform blocks any decision that would take cumulative **Award Commitments** above the Cycle Ceiling, and flags it as a reserved matter | FW 8.4, 9.1 | P0 | Absent | Build |
| R-104 | Remaining headroom is visible to the Committee at all times, not only in reporting | FW 13.2 | P1 | Absent | Build |
| R-105 | **60-day contracting expiry** from decision (or from MSIG confirmation), and in any event at cycle close, with automatic expiry | FW 10.10 | P1 | Absent | Build |
| R-106 | All amounts held in **USD**; A calculated from the **Reference Source in force** — `delphioracle` `datapoints.median` scoped to the pair, unless a replacement has been designated under FW 13.4a (R-106f) — **at each milestone approval**; stores USD amount, A amount, oracle value, **block number, transaction id, and the identity of the source read** — the table is a rolling 21 rows and cannot be re-read later, and a payment computed on a superseded source must stay attributable to it | FW 13.4, 13.4a | P0 | Absent | Build |
| R-106a | Records and publishes the **newest datapoint timestamp** on every approval. Where it exceeds **24 hours**, blocks Manager-only approval and routes to the Committee, which approves at **simple majority, minimum 3** (FW 5.3) — does not block payment outright | FW 13.4, 5.3 | P0 | Absent | Build |
| R-106b | Computes A-units = ⌊USD-cents × 10^6 ÷ median⌋ in **integer arithmetic**, truncated. No floating point anywhere in the payment path — the published amount and the on-chain transfer must match exactly | FW 13.4 | P0 | Absent | Build |
| R-106c | **15% collar**: where the approval rate differs by more than 15% from the rate at the **previous payment under that award** (or the award decision, for the first), block Manager-only approval and route to the Committee, which approves at **simple majority, minimum 3** (FW 5.3) | FW 13.4, 5.3 | P0 | Absent | Build |
| R-106d | **Reference Source failure detection and suspension.** Where the pair or the source contract is unavailable, renamed, or deprecated, the platform **suspends composition of every payment proposal** and surfaces the reason. It never infers a rate, carries the last one forward, or falls back to a source that has not been designated. Distinct from the R-106a staleness path, which routes to the Committee and does not suspend | FW 13.4a | P0 | Absent | Build |
| R-106e | **Technical continuity path**: where the same data remains available under a changed name — pair renamed, contract redeployed, `quoted_precision` altered — the platform accepts a new pointer on a recorded Committee vote at **simple majority, minimum 3**, and resumes. The precision is read from the recorded configuration, never assumed to be 4 | FW 13.4a, 5.3 | P0 | Absent | Build |
| R-106f | **Replacement designation**: blocked unless a recorded Committee vote at the **award threshold** (two-thirds, minimum 3) exists and the designation record affirms all five FW 13.4a tests — on-chain and publicly readable, no party to the transaction, multiple independent submitters, datapoint timestamp present, USD price at a stated integer precision. The platform **blocks payment on an undesignated source** and **cannot alter the formula, the denomination, or the truncation rule** (R-106b), which stay reserved matters | FW 13.4a, 9.1 | P0 | Absent | Build |
| R-106g | **After a designation**: the platform publishes the designation with reasons and the vote by name and account **before any payment is made on it**, writes it to the decisions register (R-70a), raises a 5-business-day MSIG **notice** task — notice, not an escalation awaiting approval, so it never blocks payment — and forces **Committee approval of the first payment under each award** on the new source — simple majority, minimum 3 (FW 5.3) — whatever the collar shows, with the R-106c collar measuring against the rate last used under that award on the previous source | FW 13.4a, 7.6a | P0 | Absent | Build |
| R-107 | Anti-structuring: platform surfaces multiple awards to the same awardee within a cycle, and flags any post-award increase that would cross the per-award limit | FW 8.4 | P1 | Absent | Build |
| R-108 | **Coverage test before every award**: A balance at the Reference Rate must cover outstanding Award Commitments and Program Costs due before the next instalment, plus the proposed award, with at least the **configured Coverage Margin** — read from configuration, never hard-coded, and never confused with the larger funding margin in FW 13.1. Platform blocks the award and flags it as a reserved matter if it fails | FW 13.4, 9.1 | P0 | Absent | Build |
| R-109 | Coverage percentage displayed continuously, with an alert **as it approaches the Coverage Margin**, not after it is breached | FW 13.4 | P1 | Absent | Build |
| R-108a | **Coverage breach is a programme state, not a per-award outcome.** On falling below the Coverage Margin the platform enters a recorded breach state that **stops all new awards, bounties and open-call awards at once** — not award-by-award blocking under R-108, which would read as a scoping problem rather than the funding problem it is | FW 13.4 | P0 | Absent | Build |
| R-108b | **Milestones keep paying.** The breach state must **not** suspend milestone payments under executed agreements — it stops new commitments only. This is the inverse of the oracle-failure state (R-106d), which stops milestones because no rate is computable; the two must not share one halt flag. An approved milestone the balance cannot cover is **never paid in part**: the approval stands, the amount stays reserved, it escalates under R-56 on FW 9.1's insufficient-balance ground — where FW 9.2's exception keeps it open — the awardee is notified and the position published, and waiting milestones are paid **in order of approval** | FW 13.4, 9.2, 23.3 | P0 | Absent | Build |
| R-108c | On entering the breach the platform raises a **5-business-day MSIG notification task** carrying the top-up request, tracked as overdue like any other clock. **Exit is a recorded Committee decision** (simple majority, minimum 3) once coverage is back above the margin — never automatic on a price recovery, or the programme would flicker in and out of the stop with the market | FW 13.4, 5.3 | P0 | Absent | Build |
| R-110 | **Multi-cycle awards**: per-award limit tested on total contract value; only the in-cycle portion reserved against the current ceiling | FW 13.2 | P0 | Absent | Build |
| R-110a | **Service awards carry a term end date**, and the platform surfaces it ahead of expiry so the Committee can scope the re-competition in time. **A renewal is a new award, never an amendment**: the platform opens a fresh RFP record with its own decision, threshold and reservation, and **blocks any attempt to extend the term or raise the value of the existing award** through the FW 11.8 change path. The incumbent may bid like anyone else | FW 13.2, 11.8 | P1 | Absent | Build |
| R-111 | **Forward commitments** tracked per award per future cycle, automatically reducing each future cycle's available ceiling, and listed in the cycle report | FW 13.2 | P0 | Absent | Build |
| R-112 | Platform blocks any award whose term extends **beyond the end of the authorized funding period**, and flags it as a reserved matter | FW 13.2 | P0 | Absent | Build |
| R-113 | Funding period modelled as four cycles with quarterly instalments; platform tracks authorized, transferred, and remaining across the period | FW 13.1 | P1 | Absent | Build |

---

## 10. Conflicts and Disclosure

### 10.1 The disclosure questionnaire

Every person with a decision or management right in the program — Committee member, RFP Program Manager, Technical Reviewer — files the same structured questionnaire, and the result is published on-chain. Free-form declarations are out of scope: the platform holds the instrument, validates it, and writes it.

| ID | Requirement | Source | Priority | State | Disposition |
|---|---|---|---|---|---|
| R-114a | **Versioned questionnaire definition** held as data, not hard-coded: parts, questions, answer types, and required/optional flags. A new version does not invalidate filings made against an earlier one | FW 6.3a | P1 | Absent | Build |
| R-114b | Questionnaire covers Parts 1–9 of FW 6.3a: identity and role, employment and engagements, Vaulta Treasury relationship, holdings by band, connections to likely proposers, other funding roles, family and household, history of removal or ban, attestation | FW 6.3a | P1 | Absent | Build |
| R-114c | Answers are **structured** — enumerated values, banded amounts, and named-organization lists — with free text only as supporting detail on a structured answer | FW 6.3a | P1 | Absent | Build |
| R-114d | Holdings captured as **bands**, never exact balances; band set is part of the questionnaire version | FW 6.3a | P1 | Absent | Build |
| R-114e | Validation rejects submission unless every part 2–8 carries an explicit answer or an explicit **"None"**. A blank is not a filing | FW 6.3a | P1 | Absent | Build |
| R-114f | On submission an **on-chain disclosure record** is written to the **`disc.vst` disclosure contract** — never to the Program Account: filer account, role, questionnaire version, filing date, coded answers to parts 2–8, and **SHA-256 hash of the full submission including free text**. The **filer signs their own submission**; the write is signed by a VS LLC key that has **no weight on the Program Account**, which keeps R-78 intact | FW 6.3b | P0 | Absent | Build |
| R-114g | Full submission published on the Portal; page displays the hash and the transaction id, and offers a **one-click verification** recomputing the hash from the published document | FW 6.3b | P1 | Absent | Build |
| R-114h | Disclosure records are **append-only**. An update writes a new record referencing the prior record's transaction; no edit or delete path exists in the platform or the contract | FW 6.3b | P0 | Absent | Build |
| R-114i | Full disclosure history per person is publicly viewable as a timeline, with a diff between consecutive filings | FW 6.3b | P2 | Absent | Build |
| R-114j | Pre-submission warning that the record is permanent and public, with the on-chain fields shown before signing | FW 6.3b | P1 | Absent | Build |
| R-114k | **Gate: signing weight and pay do not begin** for a Committee member until their questionnaire is filed on-chain; the appointment shows as incomplete until then. This is the "conflict declaration" item of the 30-day checklist, **not a fourth item**, and the 30-day clock starts at the **later of** appointment execution and the date the disclosure register opens for filing | FW 6.3c | P0 | Absent | Build |
| R-114l | **Gate: role assignment blocked** — a Manager cannot be set as Manager of record and a Reviewer cannot be assigned to an RFP without a **current** filing. **Current means filed and not overdue.** It expressly does **not** mean filed against the latest questionnaire version — per R-114a a version change does not invalidate an existing filing | FW 6.3c, 6.3a | P0 | Absent | Build |
| R-114m | **Change duty**: 10-business-day clock from a declared change, tracked and surfaced as an overdue item | FW 6.3 | P1 | Absent | Build |
| R-114n | **Annual refiling** prompted ahead of the anniversary. More than 30 days overdue: for a **Committee member**, pay is suspended automatically and the seat register shows them non-current; for a **Manager or Reviewer** — who are paid per engagement and are not on the seat register, save a member-Reviewer under FW 12.6, to whom the member limb and the **new-assignment** limb apply, a member never being designatable as Manager of record (R-04a0) — **no new assignment and no Manager-of-record designation** until filed, flagged on the role register. Work already assigned continues | FW 6.3c | P1 | Absent | Build |
| R-114o | Organizations and persons named in **Parts 3, 5 and 7** are stored as **entity references** — Part 7 included, so a Manager whose household member works for the awardee is visible to the platform rather than invisible | FW 6.3a, 6.4 | P1 | Absent | Build |
| R-114o1 | Entity match produces a **hard block** where the filer is Manager of record or engaged Reviewer on an RFP whose awardee or proposer matches, and a **soft prompt** for every other filer. R-87's block is this hard case | FW 6.4 | P0 | Absent | Build |
| R-114o2 | Part 5's "would you recuse" answer is captured and shown with the match, and a **"no"** against a matched entity is surfaced to the Committee for decision rather than silently accepted | FW 6.3a | P2 | Absent | Build |
| R-114p | Treasury-affiliation answer in Part 3 drives the eligibility check in R-119a rather than being captured separately | FW 6.3a, 2.4a | P1 | Absent | Build |
| R-114q | Compliance dashboard: who has filed, who is overdue, whose filing predates the current questionnaire version | FW 6.3c | P2 | Absent | Build |

### 10.2 Recusal, bars, and bans

| ID | Requirement | Source | Priority | State | Disposition |
|---|---|---|---|---|---|
| R-115 | Standing disclosure records for Committee members, Managers, and Reviewers; filed within 30 days of appointment — for a member the clock runs per R-114k — updated within 10 business days of change, refiled annually | FW 6.3, 6.3c | P1 | Absent | Build |
| R-116 | Disclosures are **published**, on the Portal and on-chain per R-114f | FW 6.3, 6.3b | P1 | Absent | Build |
| R-117 | Recusal is recorded per matter and is **self-executing** — recused users lose access to that matter's confidential materials | FW 5.6, 27 r3 | P0 | Partial | Change |
| R-118 | Six-month post-term bidding bar enforced at submission — **Committee members: any Vaulta RFP; Managers and Reviewers: only RFPs they worked on** | FW 6.1, 6.4 | P1 | Absent | Build |
| R-119a | Eligibility check blocks assignment of a Treasury-affiliated person to a seat, Manager, or Reviewer role, with an override only on a recorded MSIG waiver | FW 2.4a | P1 | Absent | Build |
| R-119b | **Ban register**: published list of permanently banned persons and named entities, with date and confirming MSIG transaction | FW 6.6 | P0 | Absent | Build |
| R-119c | Ban register is **checked at proposal submission and before any role assignment**, and blocks both. No manual override outside a recorded MSIG lift | FW 6.6 | P0 | Absent | Build |
| R-119d | Material-breach workflow: immediate suspension of role, signing weight and pay on Committee vote; referral record published; 10-business-day response window captured and published with the referral | FW 6.6 | P1 | Absent | Build |
| R-119 | Affiliate declarations captured before RFP publication, not at award | FW 6.2 | P1 | Absent | Build |

---

## 11. Reporting and Records

| ID | Requirement | Source | Priority | State | Disposition |
|---|---|---|---|---|---|
| R-120 | Cycle report generated from platform data covering every element in FW 13.5, including Program Account balances reconciled to chain, load per Manager, and reassignments | FW 13.5 | P1 | Partial | Change |
| R-121 | Minutes published within 10 business days. **Never redactable:** vote counts, recusals, and the **name, role, seat, and on-chain account** of anyone exercising a decision right, acting in that capacity. Redaction is limited to confidential proposal content before award, legal advice, and personal data that is none of the above | FW 5.9 | P1 | Absent | Build |
| R-70f | Any **correction or lawful redaction** of a published record already hashed on-chain writes a **new decision record** referencing the prior transaction, with the new hash and the stated reason. Without it a redaction silently breaks verification of a record nobody can withdraw | FW 7.6a, 5.9 | P0 | Absent | Build |
| R-122 | Full audit log: who did what, when, on which record | FW 27, 12.4 | P0 | Partial | Change |
| R-123 | Published content is publicly readable without authentication | FW 27, 12.4 | P0 | Exists | Keep |
| R-124 | Records are append-only where the governance documents require permanence | FW 18.3, 5.9, 6.3b, 7.6a | P1 | Partial | Change |
| R-125 | **Post-award review (F-21).** On closing an award under R-20c whose **total contract value** exceeds the configured FW 25.2 threshold, the platform raises a review task on the **Manager of record at closing**, due in **15 business days**, publishes the review with the completion note, and lists it — and any overdue — in the cycle report (R-120). Tested on total contract value, never the in-cycle amount, so a multi-cycle service award is always caught | FW 25.2, 13.2 | P2 | Absent | Build |
| R-125a | Applies to a **terminated** award as well as a completed one, the review additionally recording why the engagement ended. Absent threshold configuration the platform raises **no** task and flags the threshold as unset — it never guesses a figure or falls back to the Per-Award Limit | FW 25.2, 11.10 | P2 | Absent | Build |

---

## 12. Non-Functional

| ID | Requirement | Source | Priority | State | Disposition |
|---|---|---|---|---|---|
| R-130 | The Portal is the **canonical venue** — it must be durably addressable and archived | M5 Part A | P0 | Partial | Change |
| R-131 | Availability sufficient that a delay window is never effectively shortened by downtime | FW 10.4 | P1 | Absent | Build |
| R-132 | Chain reorg and RPC failure handling in the on-chain integration | — | P1 | Partial | Change |
| R-133 | Data retention and export, so records survive a platform change | — | P2 | Partial | Change |

### 12.1 Requirements added after the full review

| ID | Requirement | Source | Priority | State | Disposition |
|---|---|---|---|---|---|
| R-140 | **Program Cost payment path**: published per-cycle schedule approved by the Committee, then individual payments at 4-of-5 with the standard delay and no objection banding, reported cumulatively | FW 13.3a | P0 | Absent | Build |
| R-141 | Publishes the **funding date** on the Portal and computes **four** periods from it — the cycle, pay accrual, **the initial terms of the four MSIG-appointed seats**, and the **9-month self-review** (R-145, FW 16.1). A Community seat filled by MSIG runs from **execution** instead, as does the FW 4.5 interim holding — a separate nine-month clock of the same length on a different anchor, which the platform must not conflate with the self-review | FW 13.1, 3.4, 16.1 | P0 | Absent | Build |
| R-142 | *Superseded by **R-66**, which now carries the 72-hour tier.* Retained as a stable citation; no separate requirement. | — | — | Superseded | Drop |
| R-143 | Models the **4-of-5 vs 3-of-5** permission split across all actions, not only cancellation | FW 7.2 | P0 | Absent | Build |
| R-144 | Records **Treasury-affiliation waivers** and continuing-eligibility disclosures, with automatic suspension of signing weight pending MSIG | FW 2.4a | P1 | Absent | Build |
| R-145 | Generates the **annual review** (FW 14.3) and the **9-month self-review** (FW 16.1) from platform data, the latter dated from the **funding date** published under R-141, never from MSIG execution | FW 14.3, 16.1 | P2 | Absent | Build |
| R-146 | **Objections and withdrawals are both signed by the block producer's on-chain account**, with the register mirrored to an append-only public record. The platform **validates the signing account against the active producer schedule at the time of signing** and records which schedule it used; a signature from an account not then in the active set is recorded but **not counted toward the band** — the 4–6 and 7+ bands turn an award back to MSIG or end it, on a count of exactly these signatures | FW 10.6a | P0 | Absent | Build |
| R-147 | Enforces the **mandatory cancellation** duty in the 4–6 and 7+ bands within 2 business days, and flags failure | FW 10.7 | P1 | Absent | Build |
| R-148 | Handles **award revival after MSIG confirmation**: a fresh agreement must be recorded before re-proposal, with a 60-day clock from confirmation | FW 10.9 | P1 | Absent | Build |
| R-149 | Supports **resignation** as a distinct event from removal, with immediate key surrender and vacancy | FW 3.6 | P2 | Absent | Build |
| R-150 | **Advance payments**: blocked unless approved by the Committee at the **award threshold** and published with the award decision, and **capped at 15% of the award total**, enforced. Not a milestone, so the Manager of record does not approve it | FW 11.7 | P1 | Absent | Build |
| R-150a | Platform code and content are **VST-owned**. EOS Rio has committed to transferring the code and the rights. **Two artifacts complete it, not one:** a recorded **written assignment of copyright** (or perpetual, irrevocable, sublicensable licence) covering every party that authored the pre-existing code, **and** transfer to a **VST-controlled repository**. Moving a repository is not an assignment, so clearing the second does not clear the first. Tracked as a handover deliverable | FW 15.2a | P1 | Absent | Build |
| R-150b | Awards for **work on the RFP system itself** run through the ordinary flow, categorized **Core Development** and counted against the Cycle Ceiling. No special path, no exemption | FW 15.2b | P1 | Absent | Build |
| R-150c | Such awards are **flagged self-referential** and totalled in the cycle report. Building or materially reworking the system is an **award**; keeping it running unchanged — hosting, domains, certificates, monitoring, backups, administration — is an **operating cost** under FW 13.3a. The test is **whether the engagement changes what the system does**, and the **Committee classifies by recorded vote**; the platform records the classification and the vote, it does not decide it | FW 15.2b, 13.5 | P1 | Absent | Build |
| R-150d | **VS LLC and connected entities are blocked from bidding** on work on the RFP system. Where the Committee records that no other capable provider exists, the platform routes the award to MSIG as a reserved matter | FW 15.2b, 9.1 | P1 | Absent | Build |
| R-151 | **Bounty instrument** — published fixed-price task, open entry, first acceptable delivery wins, no scoring round. **No per-bounty cap and no per-cycle sub-limit** — the platform must not impose either. Bounded by the Per-Award Limit and the Cycle Ceiling like any other award | FW 26a | P1 | Partial | Change |
| R-151j | **Minimum open period enforced before any delivery may be accepted**: 21 days, or 10 days below USD 5,000 or where urgency is recorded. The platform blocks acceptance before it elapses, whatever the delivery register shows | FW 26a, 20.5 | P1 | Absent | Build |
| R-151k | Publication captures a **sole-source declaration** — whether the Committee expects only one party to deliver, with reasons — published with the bounty and listed separately in the cycle report | FW 26a, 13.5 | P1 | Absent | Build |
| R-151a | Bounty publication carries acceptance criteria, fixed price, **award shape, licence mode — Required or Default only**, Reviewer-engaged field, named Manager, and closing date — all locked at publication like R-20a/R-21a. Proposer's choice is unavailable: the award decision is the publication vote, at which no proposal exists | FW 26a, 20.2a | P1 | Absent | Build |
| R-151b | **The publication vote is the award decision**, recorded at the award threshold (two-thirds, min 3), and the bounty **reserves its fixed price against the Cycle Ceiling at publication** | FW 26a, 13.2 | P1 | Absent | Build |
| R-151c | Bounty **lapses** at its closing date or at cycle end, whichever is earlier, releasing the reservation — **unless a delivery has been accepted**, in which case the reservation continues through contracting, delay, and any MSIG confirmation, with any amount payable after cycle end carried as a forward commitment. The platform blocks a closing date leaving no room inside the cycle for acceptance, contracting, and the full delay | FW 26a, 13.1, 13.2 | P1 | Absent | Build |
| R-151d | Deliveries recorded in a **public register with receipt timestamps**; the Manager assesses **in strict order of receipt** and the platform **stops the queue at the first acceptance**, marking later deliveries unsuccessful with a written reason | FW 26a | P1 | Absent | Build |
| R-151e | A bounty payment is an **initial award disbursement** — **FW 11.4a's checks apply, not 11.4's** — carrying objection banding, contract-first, normal signature and delay, all conflict and ban checks, and a pre-existing-IP schedule at contracting. Where the Reviewer-engaged field is yes, the **Reviewer's assessment gates the Manager's acceptance determination**, there being no milestone for it to gate | FW 26a, 10.5, 11.4a | P1 | Absent | Build |
| R-151h | The **FW 10.3 publication happens on acceptance**, not at the publication vote, and the **FW 10.4 delay runs from it**. The FW 10.10 60-day clock runs from the acceptance determination | FW 26a, 10.3, 10.10 | P1 | Absent | Build |
| R-151i | On cancellation of a bounty payment, the platform **reopens the delivery queue** at the next delivery in order of receipt where the bounty has not lapsed, reinstating any delivery closed only because an earlier one was accepted | FW 26a | P1 | Absent | Build |
| R-151f | On cancellation of a bounty payment, the platform records that **no work product vested** and the deliverer retains their work | FW 26a | P1 | Absent | Build |
| R-151g | Bounties **skip the scoring flow** — FW 22.1, 22.2, 22.4 and 22.5 do not apply, so R-40, R-41 and R-43 are out of scope. **FW 22.3 still applies** and is satisfied by the Manager's written acceptance determination. **FW 21.2 also still applies** — R-30 governs a bounty in full, with questions accepted at any time while it is open rather than in a discrete question period. There is no bounty exception to the no-private-channel rule | FW 26a, 22.3, 21.2 | P1 | Absent | Build |
| R-152 | **The open call has no sub-limit.** It draws on the Cycle Ceiling alongside directed RFPs; the platform must not cap it by channel | FW 26 | P2 | Absent | Build |

---

## 13. Questions for the Platform Team

**Six of the nine** are answered by the working group and have become requirements, along with one they raised themselves. **Three remain** and need the repository.

### Answered — these are settled and drive the requirements above

| # | Question | Answer |
|---|---|---|
| 1 | Do block producers vote on individual awards? | **No.** BPs approve the Framework and the funding; they never vote on an award. What they retain is stronger and sits outside the app: objections during the delay, cancellation at 15/21, the owner permission, and revocation of the mandate. **They are the network's consensus mechanism and can ultimately override the Committee** — but through the chain, not through a screen in this product. Any per-award BP voting flow in the current build is a **Drop** |
| 2 | Does the platform propose on-chain transactions, or record payments made elsewhere? | **It proposes them.** Transactions are on-chain, and **decisions are recorded on-chain too** — not merely published. Section 7 is a **build**, and it is larger than first scoped: see R-70a–f |
| 4 | Is milestone approval attributable to a named individual? | **It must be.** Approval names the **Manager of record** and any **Technical Reviewer**; disbursement names **each signing Committee member by name and on-chain account** — both, not the account alone. See R-83a–c |
| 5 | Is there any concept of BP identity? | **BP identity is simply their name**, paired with their on-chain producer account. No BP user accounts, no BP login, no BP voting UI. BPs touch the system only where the chain does: signed objections and cancellations. See A-05 |
| 8 | Is there existing data to migrate? | **None.** No draft RFPs, no users, no submissions. Nothing to preserve, and no migration work to scope |
| 3 | What is the permission model — global roles or per-record? | **Hybrid, three kinds.** **Seat-based:** the five Committee members hold permissions by seat for the whole program and are **tagged onto records by portfolio**, derived from the category, not manually assigned. **Per-record:** Manager of record and Technical Reviewer, assigned per RFP, bounty, and grant. **Administrator:** VS LLC manages assignments and configuration, executing Committee decisions rather than making them. A single global role table cannot express this — see R-01, R-01a/b, R-03f–i |
| + | Who owns the platform? *(raised by the working group, not in the original nine)* | **The VST.** VS LLC operates it, does not own it. EOS Rio has committed to transferring the code and the rights. Two artifacts complete it: a written copyright assignment covering its authors, and transfer to a VST-controlled repository — moving a repository is not an assignment, so both are needed. The Committee may fund further work on the system through the ordinary RFP process. See R-150a–d |

### Answered from the repository — 31 August 2026

| # | Question | Answer |
|---|---|---|
| 6 | **What is stubbed versus working?** | **Working, and better engineered than expected.** Not a screen-deep prototype: an Antelope C++ contract (~2,100 LOC) is the source of truth, the web app renders live from contract-table reads, and the test harness boots a chain running the **real** deployed `eosio.system` / `eosio.token` / `eosio.msig` / `core.vaulta` contracts rather than stubs. Seven Playwright e2e suites plus per-feature substrate tests. The team's own tracker records adversarial audits per track. **The problem is not quality — it is that the working system implements a different governance model** |
| 7 | **What is the stack, and who maintains it after handover?** | Bun + TypeScript monorepo; **Angular** web app (Wharfkit for signing); **Fastify** API — read-only over chain state plus IPFS pinning; **Antelope C++** contract `rfp.fund`; SQLite for analytics; Docker Compose for the whole substrate; Playwright e2e; an MCP server; i18n in 4 languages; signed release manifests for decentralised hosting. Maintained by **EOS Rio**. Handover still needs both artifacts in **R-150a** — the copyright assignment and the VST-controlled repository — neither of which is in the repo |
| 9 | **What did they build that is not in this document?** | A great deal, and it splits cleanly. **Adopt:** IPFS content-addressed metadata with on-chain hashes (a working answer to R-70b); the msig payout witness and `payout_hash` (R-70); the real-system substrate test harness; signed release manifests and decentralised hosting (stronger than R-130); i18n. **Drop or decide:** stake-weighted voting on bids (**R-55**), a soulbound **reputation** system with decay, **stake-to-bid bonds**, a **strikes/appeal** regime, and **KYC** gating. None of the five appears in MSIG #5 or the Framework, and the first is the per-award vote the mandate removes |

All nine questions are now answered. Original numbering retained.

---

## 14. What Happens Next

1. ~~Repo access → read the code and fill **State** for every requirement.~~ **Done** — 249 rows assessed.
2. ~~Disposition assigned per requirement.~~ **Done** — 202 Build, 39 Change, 5 Keep, 3 Drop.
3. **Decide the five governance conflicts** listed in the gap analysis before any build sequencing. They are not implementation choices: stake-weighted bid voting, the council shape, milestone approval authority, the reputation system, and the strikes regime each contradict MSIG #5 rather than fall short of it.
4. **Then** sequence the P0 set. 89 of 118 P0 requirements are Absent, so cycle 1 scoping is a question about what the first cycle genuinely cannot run without — not about closing the whole gap.

---

*Requirements derived from MSIG #5 and the Vaulta Network RFP Framework. Those documents govern; this one implements.*
