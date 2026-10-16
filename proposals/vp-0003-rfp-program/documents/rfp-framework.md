# Vaulta Network RFP Framework

**Exhibit A — Vaulta Network RFP Framework**

**Version:** 5.4\
**Status:** Draft\
**Date:** [___]

This RFP Framework is required by MSIG #4 and has two parts.

- **Part 1 — The Steering Committee and the Mandate.** Who decides, how they are chosen, how they vote, and how money moves.
- **Part 2 — Running an RFP.** How a single RFP goes from an idea to a paid deliverable.

Part 2 may be amended by MSIG without reopening Part 1. **Part 1 governs any conflict**, and Part 2 may vary a Part 1 rule **only where Part 1 expressly permits it**. *Definitions* forms part of Part 1.

## Definitions

These definitions form part of Part 1.

| Term | Meaning |
|---|---|
| *Business day* | Monday to Friday, measured in UTC; no public holidays are excluded. |
| *Reference Rate* | the Delphi Oracle `datapoints.median` for `eosusd`, read at the time of the relevant action and converted per section 13.4, or the fallback rate in 13.4 where it applies. |
| *Award Commitments* | amounts committed to awardees, constrained by the Cycle Ceiling. |
| *Program Costs* | everything the program spends on itself — Committee pay, Manager and Reviewer fees, Portal and administration — constrained by the Program Cost Ceiling. |
| *Program Cost Ceiling* | the per-cycle cap on Program Costs, set in MSIG #5, with internal caps on Committee pay and on everything else. |
| *Total Program Spend* | Award Commitments and Program Costs together. |
| *Committee* | the Vaulta Network Steering Committee. |
| *Threshold* | 15 of 21 active block producers. |
| *Program Account* | the on-chain account holding program funds. |
| *Manager of record* | the RFP Program Manager assigned to one RFP. |
| *Portal* | the RFP portal. |
| *VS LLC* | Vaulta Stewardship LLC. |
| *Delay window* | the required waiting period before a payment executes. |

---

# PART 1 — THE STEERING COMMITTEE AND THE MANDATE

## 1. Steering Committee

**1.1** The Committee has two roles, governed by separate rules: **Trust oversight** and **Network RFP funding**.

| | **Trust oversight** | **Network RFP funding** |
|---|---|---|
| Authority | Trust Agreement | MSIG #5 |
| Assets | Trust Property | Network funds in the Program Account |
| Role | Monitors and reports | Decides who receives funding |
| Accountability | Records required by the Trust Agreement | Publication, payment delays, reports, and funding approval every four cycles |

**1.2** Members must be appointed by **MSIG Resolutions at the Threshold using Exhibit E**; the Community seat follows section 4, and block producers decide when seats are filled.

Until all five seats are filled, **the Committee must not exercise the RFP mandate, publish RFPs, or make awards**.

**Program Account funding and Committee permission activation must wait until all five seats are filled** and every member has signed their contract, filed their declaration, and registered a signing key.

**1.3** The RFP program is **not a Trust activity**, its funds are **not Trust Property**, and the Trustee has no role in it.

**1.4** Every decision and record must identify whether it concerns **Trust oversight** or the **Network RFP program**.

**1.5** The Committee must not use either role to pressure decisions in the other; communications involving both roles must be written and recorded in the minutes.

## 2. Seats

**2.1** The Committee has **five seats**, each with a portfolio listed below; all members share **Trust oversight duties equally**.

| Seat | Portfolio | RFP categories (from MSIG #4) |
|---|---|---|
| **Core Development** | Protocol, node software, tools, security, technical roadmap | Core network infrastructure (APIs, history nodes, snapshots); core and supplemental development |
| **Marketing** | Brand, communications, content, events | Core and supplemental marketing services |
| **Business Development** | Integrations, partnerships, exchanges, adoption | Business and project incubation grants |
| **Community** | Builders, holders, user-facing programs | Educational initiatives; community engagement and advocacy |
| **General (At-Large)** | Chairs the Committee; cross-category work and process integrity | Any category, and matters spanning categories |

**2.2** Each member leads work in their portfolio but **cannot make funding decisions on their own**.

**2.3** Members guide the program and evaluate proposals, but may perform funded work only as **Technical Reviewers under section 12.6**; their Reviewer fees count as **Program Costs, not awards**.

**2.4** Each person may hold **only one seat**; no two members may be connected to the same **block producer, company, or corporate group**; and members must **serve personally, without substitutes**.

**2.4a Treasury exclusion.** Anyone affiliated with the Vaulta Treasury may not serve as a **Steering Committee member, RFP Program Manager, or Technical Reviewer**.

**Affiliation** means being a Treasury employee, officer, or director; providing services under contract; controlling Treasury funds; or acting under its direction on treasury functions.

**MSIG may waive the exclusion at the Threshold, with published reasons.**

Anyone in these roles who becomes Treasury-affiliated must disclose it within **10 business days**; their signing weight, if any, is **suspended immediately**, and the matter goes to MSIG, which may waive the exclusion or remove them.

**2.5** Each member must sign a contract with **VS LLC** and is **not a Trust employee**.

**2.6** Each member has **one unit of signing weight** on the Program Account (section 7) and must keep their signing key secure.

## 3. Member appointments and terms

**3.1** Members must be appointed by **an MSIG Resolution approved at the Threshold that follows Exhibit E to MSIG #5**. Each proposal may cover one or more seats; the Community seat also follows section 4.

Competing proposals may be approved, but the **first appointment executed by block time fills the seat**; later executions have no effect for that seat.

The resolution mode selected in an MSIG that follows Exhibit E determines the outcome:

- **Seat by seat** (default): Appointments stand independently; one failing does not affect the others.
- **All or nothing**: No appointment takes effect unless all can.

An appointment has **no effect** if, at execution:

1. The seat is filled.
2. The candidate holds another seat, including one filled by the same Resolution.
3. It breaches the affiliation rule in **2.4**.
4. The candidate is Treasury-affiliated without an express waiver at the Threshold.
5. The candidate is on the ban register under **6.6**.

Where candidates in the same proposal conflict under the one-seat or affiliation rules, **Candidates table order sets priority**: the first appointment takes effect and conflicting later appointments do not, subject to the resolution mode.

**3.1a Network vision statements.** Each candidate must provide their own **network vision statement meeting Exhibit E’s requirements**, included with the appointment proposal.

**Missing statements.** A proposal missing a statement is incomplete and should not be submitted or approved. If it executes anyway, the appointment remains valid, but VS LLC must record the omission in the seat register. **Pay and signing weight must wait until the statement, contract, questionnaire, and signing-key requirements in 3.1b are complete.**

**Publication and reappointment.** Record statements in the **`publications` register (7.6a)**, display them with the proposal on the Portal, and keep them linked from the seat register throughout the term. Statements are **non-binding** but inform reappointment; members seeking another term should explain how their year compared with their statement.

**Seat register.** VS LLC must maintain the **official record of executed appointments** in the **`publications` table (7.6a)** and display it on the Portal, recording:

- Each member’s name and on-chain account, matching **6.3a**.
- The proposal name, execution transaction, and resolution mode.
- Each member’s vision-statement link.
- Any proposed seat left unfilled and why.
- Any appointment conditions identified by VS LLC.

**MSIG decides eligibility.** If VS LLC records a seat as unfilled for any reason other than an earlier execution, it must publish its reasons and refer the matter to MSIG. The seat remains vacant until MSIG decides.

**3.1b Onboarding.** An incomplete appointment proposal that executes is **not void**. Each appointee must sign their contract, **file the standard on-chain disclosure questionnaire under 6.3a–6.3b**, and register their signing key **within 30 days of appointment execution or VS LLC announcing that the register is open, whichever is later**. **Pay and signing weight begin only after all required items are filed and the contract and key requirements are complete**.

**3.2** Members serve **one-year terms**, except for the initial terms in **3.4** and vacancy appointments in **3.7**, and may be reappointed without limit.

**3.3 Continuation.** Members continue month to month after their term ends and **keep their signing key** until a successor is seated or MSIG replaces them.

**3.4 Initial terms.**

| Seat | Initial term | Starts when |
|---|---|---|
| Core Development | 14 months | The Program Account receives funds |
| Marketing | 14 months | The Program Account receives funds |
| Business Development | 8 months | The Program Account receives funds |
| General (At-Large) | 8 months | The Program Account receives funds |
| Community, appointed by MSIG under 4.2 or 4.7 | 12 months | The appointment Resolution executes |

All later terms are **12 months**.

**3.5 Removal.** An MSIG Resolution may remove a member at any time, with or without cause; their **signing weight ends immediately on removal**. The Committee may refer members to MSIG for removal but **cannot remove them itself**.

**3.6 Resignation.** A member may resign by written notice to the Chair and block producers. Resignation takes effect on the stated date, or on delivery if no date is stated; their **seat becomes vacant and signing weight ends at that time**.

**3.7 Vacancies.** A vacant seat is filled for the rest of the term using the process for that seat.

**3.8 Signing requirements.** Payments follow the **Committee permission in 7.2**.

With fewer than four members, **no payment can execute**; the Committee may still meet, decide, publish, and escalate, but MSIG must fill a seat or change the permission.

An award goes to **MSIG** if fewer than four members can sign (section 9).

## 4. Community seat

**4.1** The **EOS Community Foundation (ECF)** runs the Community seat vote and sets candidate and voter eligibility, the voting method, and how results are published.

**4.1a** ECF is **independent of the program**. Funding for **administering the Community seat vote** requires ECF’s own MSIG, decided by block producers; it cannot be a Committee award. This does not bar ECF from bidding under **4.1b**, or its members from otherwise eligible program roles or awards, subject to the conflict rules.

**4.1b ECF may bid.** ECF is a **connected organization** under 6.2 whenever the Community member is engaged by, receives a stipend from, or holds a position in ECF. The member must declare the connection **in writing before the RFP is published**, recuse from scoping, drafting, evaluation, scoring, discussion, and voting, and must not help set its budget or criteria. The connection and recusal must be minuted and published.

Any ECF stipend or engagement must also be disclosed on-chain under **Part 2 of the questionnaire (6.3a)**.

**4.2** The ECF vote nominates a candidate, who must then be appointed by MSIG like every other Committee member.

**4.3** Block producers should refuse to appoint an ECF winner only for **disqualifying cause**: a proven conflict of interest, a legal bar, a serious failure in the vote, or conduct that would be Cause under the Trust Agreement. Anyone refusing for another reason should publish it; this commitment is not enforceable under this Framework.

**4.4** If MSIG refuses to appoint the winner, ECF nominates the runner-up if its process provides one; otherwise ECF runs the vote again.

**4.5 Initial appointment.** MSIG #5 appoints **no interim Community seat holder**; the seat must be filled by a **future MSIG Resolution at the Threshold using Exhibit E**, following the selection process in this section.

**4.7** If ECF **stops running the process or ceases to exist**, MSIG may name another administrator or **fill the Community seat at the Threshold** like any other seat.

MSIG may continue filling the Community seat under 4.7 indefinitely, or return selection to a community process if one emerges; it is not required to do so.

The seat retains its **Community portfolio, categories under 2.1, vote, signing weight, pay, and status**, however it is filled.

**4.8** Community appointments must follow **3.1 and Exhibit E**; the **one-year term starts when the appointment Resolution executes** (3.4).

The **vision statement requirement in 3.1a** applies. An ECF statement satisfies it if it meets those requirements and is filed with the proposal.

## 5. Meetings and voting

**5.1 Meetings.** The Committee must meet **at least monthly**, **at least twice monthly while an RFP is open for submissions or under evaluation**, and whenever the Chair or any two members call a meeting.

**5.2 Quorum.** Decisions require **at least three filled seats and three non-recused members present**; payment signatures follow **7.2**.

**5.3 Thresholds.** Counted on **filled seats, minus recusals**.

| Decision | Votes needed |
|---|---|
| Suspend the Trustee | Two-thirds, rounded up. No floor |
| Publish an RFP | Simple majority, minimum 3 |
| **Publish a bounty** — this is also its award decision (26a) | Two-thirds, rounded up, minimum 3 |
| Classify RFP-system work as award or operating cost (15.2b) | Simple majority, minimum 3 |
| **Award funding** | Two-thirds, rounded up, minimum 3 |
| Increase an award after decision | Two-thirds, rounded up, minimum 3 |
| Terminate an engagement for cause | Two-thirds, rounded up, minimum 3 |
| Decline a termination recommendation (11.10a) | Simple majority, minimum 3 |
| Direct a recovery plan under 11.9 | Simple majority, minimum 3 |
| Strike a termination recommendation as improperly filed (11.10a) | Simple majority, minimum 3 |
| Cancel a payment proposal on-chain | Administrative signatures under **7.2**; cancellation rules in **10.7** |
| Refer a member to MSIG for removal | Simple majority, minimum 3 |
| Escalate a matter to MSIG | Simple majority, minimum 3 |
| Reassign an RFP to another Manager | Simple majority, minimum 3 |
| Engage a Manager or Technical Reviewer | Simple majority, minimum 3 |
| Record that no unconflicted external reviewer was available (12.6.1) | Simple majority, minimum 3 |
| Recommend a Framework amendment | Two-thirds, rounded up, minimum 3 |
| **Sign a payment on-chain** | Fund-moving signatures under **7.2** |

**5.5** The **Manager of record approves milestones**, not the Committee, except for the rate-check referrals below (section 11).

**Rate-check referrals.** If the collar check in 13.4 triggers, or the rate is stale and the fallback is unavailable, the Committee may approve payment at **simple majority, minimum 3**; it does not reopen the Manager’s determination.

**5.6 Recusal.** A conflicted member must recuse and is excluded from materials, quorum, and the vote count.

A recused member **must not sign the payment**. Awards with fewer than four available signers go to MSIG under section 9.

**5.7 No substitutes.** Members vote personally. Written or cryptographically signed consent counts as a vote.

**5.8 Chair.** The At-Large member chairs unless the Committee elects otherwise. The Chair sets agendas and is the contact point for the Trustee, VS LLC, and MSIG. The Chair has no extra vote and no casting vote.

**5.9 Minutes.** Every meeting is minuted with attendance, decisions, vote counts, and recusals. Minutes are published within 10 business days. Only three things may be removed: confidential proposal content before award, legal advice, and personal data. **Vote counts and recusals are never removed.**

**Personal-data redaction must not remove** the name, role, seat, or on-chain account of any member, Manager, Reviewer, or other person exercising a program decision right, when acting in that capacity.

## 6. Conflicts of interest

**6.1** A member may not, during their term and for **6 months** afterwards:

- submit a proposal, alone or through a company they hold a material interest in;
- be named on any proposal as a participant, subcontractor, or paid adviser;
- accept any payment, fee, equity, token allocation, or referral from a proposer or awardee connected to a Vaulta RFP.

**6.2 Connected companies.** A company connected to a member may bid only if the member:

- Declares the connection **in writing before the RFP is published**;
- Recuses from scoping, drafting, evaluation, scoring, discussion, and voting; and
- Has the connection and recusal minuted and published.

This covers the member’s employer, companies they work for, companies under common control, and companies in which they hold a material interest. The member **must not help set the budget or criteria** for an RFP their connected company later bids on.

**6.3 Declarations.** Every member, Manager, and Technical Reviewer must declare connections, employment, **Vaulta-ecosystem positions other than A**, and any **Vaulta Treasury connection** within **30 days of appointment**; members’ deadline runs under 6.3c. Declarations must be updated within **10 business days** of a change and refiled annually.

**6.3a The disclosure questionnaire.** Use the **standard questionnaire, with its questions in their stated order**; free-form declarations do not qualify.

**Who files:** every Steering Committee member, every RFP Program Manager, and every Technical Reviewer. Any other person given a decision or approval right in the program files the same questionnaire before that right takes effect.

**What it asks:**

| Part | Questions |
|---|---|
| 1. Identity and role | Name, role, seat or RFPs covered, on-chain account, date |
| 2. Employment and engagement | Current employer; other paid engagements in the Vaulta or wider Antelope ecosystem — **including any Technical Reviewer or Program Manager engagement in this program, by RFP**; block producer affiliation; board, officer, or advisory positions |
| 3. Vaulta Treasury | Any employment, contract, consulting, advisory, board, or equity relationship with the Vaulta Treasury or any entity it controls, now or in the previous 12 months |
| 4. Positions | Any **Vaulta-ecosystem token, equity, or option position other than A**, **by band** and not exact figure; any position held **on behalf of another person**; any position **deliberately taken to profit from a fall in the price of A** — a short sale, a put option, or an inverse product, which asks about **intent, not exposure** |
| 5. Connections to likely proposers | Named organizations the filer is connected to that plausibly bid; the nature of each connection; whether the filer would recuse |
| 6. Other funding roles | Roles in any other grant, funding, or treasury body in this ecosystem or another |
| 7. Family and household | Connections in Parts 2 to 5 held by an immediate family member or household member |
| 8. History | Any prior removal, ban, or sanction from a funding, governance, or treasury role anywhere |
| 9. Attestation | That the answers are complete and true; acknowledgment of the update duty and of section 6.6 |

Parts 2 to 8 each require an explicit **"None"** where there is nothing to declare. A blank is treated as an unfiled questionnaire.

**6.3b Publication on-chain.** Questionnaires are published **on-chain in full**, and the Portal displays the register without keeping a separate copy.

**Where it is written.** Disclosures go to **`disc.vst`**, a separate account with an append-only disclosure contract deployed and controlled by VS LLC. VS LLC must configure and publish it under the **Exhibit D process and MSIG #5 Part E**. Its key has no authority over the Program Account.

**What is written.** Record the filer’s **chosen public identity**, account, role, questionnaire version, filing date, **coded answers** to Parts 2 to 8, and **full public filing**, including organizations named in Part 5, connections, reasons, and explanations. **Exclude legal identification collected privately by VS LLC.** The filer signs their own submission; **VS LLC writes the record and cannot alter its content.**

**No hash is kept**; the full filing is held on-chain.

Records are **append-only**: updates must reference the previous record; nothing may be edited or removed.

**Filing privacy.** Positions must be stated **by band**, not exact figure. Filings must name organizations but **must not name other individuals**, including family members, colleagues, or counterparties; records cannot be withdrawn.

**Pre-write screening.** VS LLC must return filings that name other individuals or give figures where bands are required. This is a mechanical screen, not a review of substance.

**6.3c Filing gates.** The questionnaire satisfies the **conflict-of-interest declaration** required by appointment and engagement documents.

| Who | Gate |
|---|---|
| Committee member | **Signing weight and pay do not begin** until the questionnaire is filed on-chain. This is the "file the conflict declaration" item in the 30-day appointment checklist |
| Program Manager | Cannot be recorded as **Manager of record** on any RFP before filing |
| Technical Reviewer | Cannot be **assigned to an RFP** before filing |
| A member taking a Reviewer engagement (12.6) | Files an **update** under 6.3 **before the engagement begins**. The engagement may not begin until it is filed, and the 10-business-day change window in 6.3 does not apply to it |

**Member filing deadline.** The 30 days run from **appointment execution or VS LLC announcing that the register is open, whichever is later**; members cannot be replaced for missing a deadline before filing was possible.

**Annual refiling more than 30 days overdue:** suspend a member’s pay until filed; Managers and Reviewers may take no new assignments or be recorded as Manager of record until filed. Existing assignments continue; this is a procedural breach under 6.6.

**6.4 Managers and Reviewers.** Managers and Reviewers must not bid on an RFP they work on during their engagement or for **6 months afterwards**, or approve or assess milestones for an awardee with whom they have a conflict.

**Manager and Reviewer conflicts.** Sections **6.1 and 6.2** apply as if references to a member referred to the Manager or Reviewer. They are also conflicted on an awardee that is, or is connected to, anyone or any organization declared in **questionnaire Parts 3, 5, or 7**. The normal remedy is reassignment under **12.3**; the **Treasury exclusion in 2.4a** also applies.

**6.5 Confidentiality.** Proposal contents, prices, and evaluation discussions remain confidential until the award is announced, and members must not share them with competitors or use information from them for their own benefit or that of a connected company.

**6.6 Consequences.**

**A minor or procedural breach** — a disclosure filed late, an update missed — is corrected, recorded in the minutes, and reported in the cycle report.

**A material breach** — self-dealing, an undisclosed interest in a proposer or awardee, taking any payment from a proposer or awardee, using proposal information for private advantage, breaching confidentiality, or signing on a matter the person was recused from — carries:

1. **immediate suspension** of the person's role, signing weight, and pay, on a Committee vote at simple majority with a minimum of 3;
2. **referral to MSIG**, with the evidence published on the Portal;
3. **loss of unpaid compensation** under the engagement contract, and **loss of indemnification** for the conduct;
4. a **permanent ban**, if MSIG confirms it at the Threshold.

**The permanent ban.** On confirmation by not fewer than 15 of the 21 active block producers, the person is **permanently barred** from:

- holding any Steering Committee seat;
- serving as an RFP Program Manager or Technical Reviewer;
- submitting or being named on any proposal to the Vaulta RFP program, or receiving any payment from it — directly, or through any entity in which they hold a material interest.

**Only MSIG at the Threshold may lift a ban**; no Committee vote, passage of time, or membership change reduces or expires it.

**Before MSIG votes**, the person must receive the allegation in writing and **10 business days** to respond; their response is published with the referral.

**The ban register.** VS LLC must maintain the ban register in the **`publications` table (7.6a)** and display it on the Portal, recording the person, date, confirming MSIG transaction, and any named entity. A lifting at the Threshold is added alongside the ban, not substituted for it. The register must be checked at proposal submission and before any role is assigned.

**6.7** A Committee member may hold a paid Technical Reviewer engagement **only under section 12.6**, including its preconditions and recusals.

## 7. Program Account and signing

**7.1** All program funds must be held **only in `rfp.vst`, the Program Account**; only block producers may name that account. The VST has no authority over its funds; the permissions in **7.2** govern.

**7.2** The Program Account must enforce the following authorization requirements; **Exhibit D must identify and verify the separate payment and administrative authority routes**. A three-signature cancellation route must not authorize a fund transfer.

| Setting | Value |
|---|---|
| Weight per seated member | 1 unit, 5 units total |
| Threshold to move funds | **4 of 5** |
| Threshold for administrative actions that move no funds | **3 of 5** |
| Owner permission | Held by `eosio.prods` |
| Delay before a payment executes | Set in MSIG #5 |

**7.3** Block producers retain the owner permission and may replace a removed member's key, rebuild the Committee permission, or recover the account.

**7.4 Keys are personal.** Members must not share or delegate their key, let an employer hold it, or sign for another member, including a recused member; keys must be registered on appointment and surrendered on removal or replacement, but retained during authorized month-to-month continuation under section 3.3.

**7.5 Lost or compromised keys.** A member must tell the Chair and block producers **immediately**, and must not sign until the key is replaced. The Committee proposes no payments in the meantime.

**7.6** The platform must not hold **any key with Program Account authority or any member’s signing key**; members sign with their own wallets. VS LLC’s `disc.vst` writing key has no Program Account authority and cannot move funds (6.3b).

**7.6a On-chain records.** The **`disc.vst` append-only register** holds the program’s **disclosures**, **decisions**, and **publications** in three tables (6.3b).

The Portal **reads and displays the register without keeping a separate copy**.

**The `decisions` table**

| What is written | For each |
|---|---|
| Award decisions | RFP reference, awardee, USD amount, scope, the milestone schedule as awarded, vote counts, members voting for, against, and recused **by name and account**, any reason for departing from the scores, and the oracle read — **the full decision record required by 23.2** |
| Milestone approvals | Award reference, milestone, the Manager of record and any Technical Reviewer **by name and account**, the criteria applied, the determination and its reasons, **any Technical Reviewer assessment as screened below**, amount, and the oracle read |
| Payment signatures | The proposal, and **each signing member by name and account** |
| Committee resolutions with an external effect | Terminations, recovery plans, strikes, engagements, and reserved-matter escalations, with vote counts and the substance of the resolution |
| **Termination recommendations (11.10a)** | The recommendation as filed — the grounds relied on, the milestone determination it arises from, the filer **by name and account** — **the awardee's response**, and the Committee's outcome, including a decision to decline, a deemed decline, or a strike |
| Post-award reviews (25.2) | The review as published, with any awardee response |

**The `publications` table**

| What is written | For each |
|---|---|
| **Published RFPs** (20.2) and their numbered amendments (21.3) | The RFP as published, in full |
| **Questions and answers** (21.2) | Each question and its answer, without naming who asked, **within 2 business days of the answer** |
| **The objection register** (10.5, 10.6, 10.6a) | Each objection as received, with the block producer, the time, and the signature; the **count is fixed at the close of the delay window** |
| **The register of bans** (6.6) | Each ban, each lifting, and the confirming Resolution |
| **The seat register** (3.1) | Each seat, its holder **by name and on-chain account**, the proposal and execution transaction, the resolution mode, and any seat a proposal named but did not fill, with the reason |
| **Network vision statements** (3.1a) | Each statement as filed, and the seat and term it attaches to |
| **Cycle reports** (13.5) and the **annual review** (14.3) | As published, in full |

**Records must be written in full and are append-only.** Corrections must reference the old record; nothing may be edited or removed.

**Off-chain records.**

| | |
|---|---|
| **Minutes** (5.9) | Minutes stay off-chain and may be redacted under 5.9; resolutions go on-chain |
| **Proposals** | Confidential until the award is announced (6.5); do not write submissions to the register |
| **The backlog** (18.3) | Publish and maintain on the Portal (18.3) |

**Redaction must finish before writing a record.** The **awardee’s response to a post-award review** is subject to the same redaction process and three grounds as the review (25.2).

**The 6.3b pre-write screen applies to every table.** VS LLC must screen decision records for names of individuals outside the program and figures that should be bands. Program decision-makers remain identifiable under 5.9. Remove names of awardee staff, quoted internal material, and legal advice from **Technical Reviewer assessments** before writing them; record the screened assessment and the Manager’s determination and reasons.

**Additional screening requirements:**

| | |
|---|---|
| **Termination recommendations** (11.10a) | Retain the recommendation whatever the outcome, including decline, deemed decline, or strike; record a strike alongside it |
| **Questions and answers** (21.2) | Remove the questioner’s identity before publication (21.2) |
| **The register of bans** (6.6) | Publish the person and conduct under 6.6; record any lifting at 15/21 alongside the ban |

**Screening is mechanical, not substantive**; VS LLC must not judge whether a determination is correct.

**Write each record within 2 business days of its decision**, using the `disc.vst` key in 7.6. Publication means writing to this register; the delay in 10.4 starts from that publication.

## 8. Committee mandate

**8.1** MSIG grants the Committee a **standing mandate to allocate Program Account funds on behalf of the Network**; block producers do not vote on individual RFPs or awards, and a Committee decision within the limits below is the Network's decision.

**8.3 The Committee decides:**

- Which needs become RFPs and their scope, deliverables, criteria, budgets, and timelines;
- Awardees and award terms;
- Managers of record and Technical Reviewers; and
- Whether to withhold payment or terminate an engagement.

**Funding instruments.** The Committee may use **only three funding instruments**: a **directed RFP** (sections 18–25), an **open call** for unsolicited proposals (section 26), or a **bounty** (section 26a); "**grants**" means the **open call**, not a fourth instrument.

**8.4 What the Committee may not do:**

1. reserve or commit more in a cycle than the **Cycle Ceiling**;
2. make a single award above the **Per-Award Limit**;
3. make an award the conflict rules forbid;
4. change the funding source, extend the cycle, or widen the program's scope;
5. split, stage, combine, or later top up awards to get around points 1 to 4;
6. act after the mandate is suspended or revoked;
7. **form, register, or join any company, foundation, association, trust, or other entity** on behalf of the Network. That requires a separate MSIG Resolution.

An action outside these limits is **void**; VS LLC must not contract on it, and block producers should cancel any related payment during its delay window.

**8.5 Safeguards.** The following controls are required:

| Control | Effect |
|---|---|
| 4-of-5 signing | No two members can move funds |
| Contract before payment | Money cannot move before a signed agreement exists |
| Delay window | Every payment is visible before it settles, and the Committee cannot waive the wait |
| Block producer cancellation | Block producers can stop any payment at the Threshold during the delay |
| Public funds | Program Account balances and transactions must remain publicly auditable |
| Owner permission with block producers | Block producers can rebuild the permission or recover the account |
| Funding is authorized a year at a time | The Committee can only ever spend what block producers have authorized, and any instalment can be stopped at the Threshold |

## 9. Matters requiring MSIG

**9.1 Reserved matters.** The following require MSIG rather than a Committee decision:

| Matter | Trigger or required action |
|---|---|
| **Award limits** | Above the Per-Award Limit, above the remaining Cycle Ceiling, or extending beyond the authorized funding period. |
| **Award votes or signatures** | Fewer than **three non-recused members** or **four available signers**. |
| **Any payment**, including Program Costs | Recusals or vacancies leave fewer than **four available signers**. |
| **Mandatory administrative action** under 10.7 or 11.10a | Recusals, vacancies, or suspensions leave fewer than **three available signers**; block producers may cancel through the owner permission meanwhile. The removal ground in 10.7 does not apply when three signatures were unavailable. |
| **Termination recommendation on a member-reviewed award** | Recusals of any kind leave fewer than **four non-recused members**. |
| **Required Reviewer missing** | A milestone requires a Reviewer under the published setting in 20.2, but no Reviewer or substitute is engaged. |
| **No unconflicted Manager** | A milestone, evaluation, or post-award review under 25.2 lacks an unconflicted Manager of record (12.3); MSIG may direct a named Manager’s engagement or another basis of approval. |
| **RFP-system work** | The Committee records that no other capable provider exists (15.2b). |
| **Conflicts or coverage** | An award would otherwise breach the conflict rules or fails the coverage test in 13.4. |
| **Program Costs** | A cost would exceed the Program Cost Ceiling or either internal cap (13.1); stop publishing RFPs when the Manager and Reviewer budget is exhausted and do not use Committee pay to continue. |
| **Entities** | Creating any company, foundation, association, trust, or other entity. |
| **Rate source or denomination** | Changing the denomination convention or designating a replacement rate source under 13.4a; the Committee cannot choose the replacement. |
| **Program authority** | Changing the mandate, Cycle Ceiling, Per-Award Limit, cycle length, permission, or funding source. |
| **Voluntary escalation** | Any matter the Committee votes to escalate. |

**9.2 Timing.**

| Matter | Submission to MSIG | If MSIG does not act |
|---|---|---|
| **Ordinary referral** | Submit the record and a draft Resolution within **10 business days**. | After **30 days**, the matter is **declined**, its reservation returns to the Cycle Ceiling, and the Committee may rework it, subject to the exceptions below. |
| **Payment or milestone under an executed awardee agreement** | Submit the record and a draft Resolution within **10 business days**. | The matter stays open, reservations under **13.2** remain, and the Committee must re-submit. |
| **Replacement rate source under 13.4a** | Submit the failure record and a request for designation, **without choosing a source**, within **5 business days** of the Manager or Chair recording and publishing the failure. | The request stays open, affected reservations remain, and the Committee must re-submit until MSIG acts. |

The existing-awardee exception **does not cover Program Costs referred for exceeding their ceiling or internal caps**; the ordinary-referral rule applies to those costs.

**Payments the Committee cannot sign.** At the Threshold, MSIG may direct payment through the **block producers’ owner permission** or **temporarily rebuild the Committee permission for named payments**; confirmation alone does not execute a payment.

**Automatic escalation.** A matter falling under 9.1 without a vote to escalate needs no Committee vote for submission; the Chair, or any member if there is no Chair, must submit it.

## 10. Award approval and payment

**10.1 The sequence.** Each step must finish before the next begins.

```
1  Committee votes to award            two-thirds, minimum 3
2  Publish on the Portal               within 2 business days
3  VS LLC signs the agreement          nothing moves before this
4  Committee proposes payment on-chain 4 of 5 signatures
5  Delay window runs                   block producers may object or cancel
6  Payment executes after the delay and objection clearance under 10.7
7  Later milestones repeat steps 4-6, one proposal each
```

**10.3 Publication.** Within **2 business days**, publish:

- Awardee, scope, award shape, licence, amount, and milestone schedule;
- Each member’s vote — for, against, or recused — **by name and on-chain account**; and
- Any reason for departing from Reviewer scores.

Add the **on-chain transaction reference** when payment is proposed.

**10.4 The delay window** starts when publication is complete and **cannot be waived**.

- Incomplete or corrected publication requires cancellation and a new proposal, restarting the delay.
- The urgent delay requires a Committee urgency vote of **two-thirds of filled non-recused seats, minimum 3**, with the urgency reason recorded and publication complete **before payment is proposed**.

**10.5 Objections.** Block producers may object during the delay. Objections are **written to the `publications` register as they are received** (7.6a) and recorded in a public register on the Portal, are attributed to the block producer who made them, and may be withdrawn.

| Objections | Result |
|---|---|
| **0 to 3** | Payment goes ahead when the delay ends. Objections are published and answered in the cycle report |
| **4 to 6** | Committee **cancels** the payment. It may only be proposed again if MSIG confirms the award |
| **7 or more** | Committee **cancels** and the award **ends**. No MSIG vote is held |

Withdrawals reducing the count below seven before it closes move the award into the applicable lower band.

**10.6 Counting.** The Manager of record keeps the register. The count is **fixed when the delay window closes**. Withdrawals must be recorded before that moment. Objections arriving later do not change the result.

**10.6a Signed objections.** Objections and withdrawals must be **signed by the block producer’s on-chain account**. Count only signatures from the **active producer set at signing**; record ineligible signatures without counting them and identify the producer schedule used.

**10.7 Cancellation** is a **3-of-5 on-chain administrative action** and is **mandatory** in the 4-to-6 and 7-or-more objection bands; the Committee must cancel within **2 business days** of the count closing, and failure to do so is an express ground for referral to MSIG for removal.

**Execution guard.** An initial award payment must remain blocked until the full delay has ended, the Manager has published the final objection count, and the outcome permits execution. A count of **4 or more blocks execution**, even during the two-business-day cancellation period. A **4-to-6** outcome requires cancellation and the confirmation and re-proposal process in **10.9**; a **7-or-more** outcome ends the award. These execution restrictions apply to both the `eosio.msig` delay and the held-multisignature fallback in Exhibit D; under the fallback, participants must observe the wait and objection rules. Later milestone and Program Cost payments have no objection banding.

Block producers may also cancel through the owner permission.

**10.8** Block producers may cancel **any payment at the Threshold during its delay**, regardless of the objection count.

**10.9** After a **4-to-6-band cancellation**, the Committee must submit the record and a draft confirming Resolution to MSIG within **10 business days**. If MSIG does not confirm within **30 days of submission**, the award ends and its reservation is released.

**MSIG confirmation restores the award decision, not the terminated agreement.** Before proposing disbursement again, VS LLC must sign a **fresh agreement on identical terms**, within the **60 days from confirmation** in **10.10**.

**Effect of cancellation on contracts:**

| Cancellation | Effect |
|---|---|
| **Initial award disbursement under 10.5 or 10.8**, except the freezes, suspensions, and revocations below | The agreement ends **without liability on either side**. A **4-to-6-band confirmation** requires the fresh agreement above. |
| **Later milestone payment** | Cancellation alone does **not end the agreement or extinguish amounts due for accepted work**. |
| **Termination-recommendation freeze (11.10a)** | Cancellation does **not itself end a signed agreement**, even for an initial disbursement; **11.10a** governs resumption and surviving obligations. |
| **Mandate suspension or revocation (14.4–14.5)** | Cancellation does **not itself end a signed agreement**, even for an initial disbursement; **14.4–14.5** govern resumption and surviving obligations. |

**10.10 Unused award decisions.** Sign the agreement within **60 days** of the award decision, or MSIG confirmation following a 4-to-6-band cancellation, and **before the cycle closes**. Otherwise the decision expires and the Committee must vote again.

## 11. Milestone approval and payment

**11.1** The **Manager of record approves each milestone for payment**, deciding whether it has been met; awards are paid in milestones under the schedule proposed, settled, and contracted under 11.1a.

**11.1a Milestone schedules.** Every RFP award must have **at least two milestones** and follow this process:

| Step | Requirement |
|---|---|
| **RFP — Committee** | State what must be staged, required checkpoints, the budget ceiling, and the two-milestone minimum; **do not fix the schedule** (20.2). |
| **Proposal — proposer** | Submit at least two milestones, each with a deliverable, acceptance criteria, amount, and date. Reject schedules with fewer than two at the compliance screen (22.2); score their quality under 22.1. |
| **Award — Committee** | May change milestone number, order, content, dates, or amounts before the decision, keeping at least two and a sensible, affordable, fair schedule. Agree material changes with the proposer **before the decision** and record departures from the submitted schedule (23.2). |
| **Contract — VS LLC** | Number every milestone and list its deliverable, acceptance criteria, amount, and date, **matching the published decision exactly** (23.3). The agreement governs; nothing may be paid against an unlisted milestone. |

When reviewing changes, require inspectable deliverables, achievable dates, proportionate amounts rather than front-loading, and no excessive subdivision; mobilization advances remain capped.

After award, changes to milestone **scope or dates** follow **11.8**: Committee approval at majority, minimum 3, a contract amendment, and publication. The two-milestone minimum remains. **Bounties instead follow 26a.**

**Determination and payment approval.** “Approval” normally includes both the Manager’s determination and approval for payment. During a suspension under 13.4a, the determination must still be made and published; payment approval follows on resumption.

**11.2 Technical Reviewer.** The **published Reviewer setting (20.2)** governs every milestone:

- **Reviewer engaged:** obtain a written assessment — accept, accept with conditions, or reject with stated fixes — and include it in the Manager’s determination.
- **No Reviewer engaged:** the Manager uses their own assessment; no Reviewer assessment is required.
- **Payment approval deferred under 13.4a:** use the assessment as it stood when the determination was made; a Reviewer whose engagement has ended need not re-file.

**11.3 The approval record** must publish:

- The milestone, criteria applied, decision, and reasons;
- The **Manager of record’s name and on-chain account**;
- Any required **Technical Reviewer’s name, account, and assessment**;
- The amount payable and the awardee’s verified receiving account.

During a suspension under **13.4a**, publish the determination, its date, and the required details **when made, excluding the amount payable**; add the rate data and amount, then republish, on resumption.

**11.3a Named decision-makers.** Record each decision-maker’s **name and on-chain account** as required by **7.6a**.

**Name and account** must match questionnaire Part 1 (6.3a) and the seat register. The name must be a **legal name or registered handle, unchanged during the term**; neither name nor account may be redacted under 5.9.

**11.4 Administrative signatures.** Members must sign under **7.2** after checking only that:

1. A complete approval record exists;
2. The amount matches the published milestone schedule;
3. The Reviewer assessment required by **11.2** is present;
4. The payment is within the award; and
5. No termination recommendation under **11.10a** is open on the award.

**11.4a Initial disbursement.** Before proposing payment, signers check only that the decision record is complete, the signed agreement matches it, the amount is within the limits, and no termination recommendation under **11.10a** is open. **Execution**, rather than proposal, requires the completed delay and objection clearance under **10.7**.

**11.5 Refusing to sign.** Members must sign even if they voted against the award.

They may refuse only if a **required administrative check fails** or there is **credible evidence of misrepresentation or a conflict-rule breach**. Written reasons must be recorded in the minutes.

**Rejudging the work, disagreeing with the Manager’s judgment, or reopening the published Reviewer setting are not grounds for refusal.**

**11.6** Milestone payments carry the normal delay but **no objection process**.

**11.7 Advance payments** before delivery are capped at **15%** of the award total, and only where the awardee genuinely cannot fund the first milestone. An advance is **approved by the Committee at the award threshold and published with the award decision** — it is not a milestone, so the Manager of record does not approve it.

**11.8 Changes.**

| Change | What is needed |
|---|---|
| Milestone scope, dates, or **amounts** (other than an increase in the award total) | Committee approval (majority, minimum 3), contract amendment, publication |
| **Increase in award amount** | Award threshold, contract amendment, publication, **new proposal and new delay** |
| **Award shape, licence mode, permitted set, or the licence named in Required mode** | **Cannot be changed.** Fixed at publication under 20.2a; the remedy is the next RFP. In Proposer's choice mode the licence itself is fixed at the award decision and cannot change after it |
| **Variation, other than an increase in the award amount, where payment is suspended under 13.4a** | Committee approval (majority, minimum 3), contract amendment, publication. No fresh payment proposal is required. **An increase remains governed by the row above and is unavailable during a suspension**, since it needs a fresh payment proposal |
| **Termination by agreement**, whether or not payment is suspended | **Two-thirds, minimum 3** on the **awardee's written consent**, published with the amendment. The Manager cannot treat termination as “anything else” |
| **Termination by the awardee on the suspension long-stop** (Exhibit F clause 6) | No Committee vote. Recorded by the Manager of record and published, and the reservation is released under 13.3 as to unearned amounts |
| Anything else | Logged by the Manager and reported |

**11.9 Late delivery.** A missed milestone requires a written recovery plan within 10 business days, managed by the Manager, and a second consecutive miss triggers a Committee review.

**11.10 Termination for cause** requires a two-thirds vote, minimum 3, and publication of the reasons; accepted milestones are paid, unearned amounts are not proposed, delivered work product stays with the VST, and any pending payment proposal is cancelled.

**What termination leaves behind, by shape** (20.2a): for a **Service** award, the **operational handover set and the data export fall due on termination**; for an **Embedded** award, the **licence back over embedded pre-existing IP survives termination**.

**11.10a Recommending termination.** The Manager of record or an engaged Technical Reviewer may recommend termination where milestone work or services fall **materially below the RFP’s required standard**, particularly when:

1. Deliverables substantively fail acceptance criteria;
2. Required remediation is missing or inadequate;
3. Quality gives no reasonable prospect of meeting remaining milestones;
4. Work is not as represented; or
5. A Service award persistently misses published service levels.

File a **written recommendation** stating the grounds and attaching the milestone determination in the **`decisions` register (7.6a)**. A Reviewer files directly with the Committee; the Manager must not withhold it. Publish both positions if they disagree. Retention and correction follow **7.6a**, including decline, deemed decline, or a strike recorded alongside the recommendation.

**Who may not file.** A Manager or Reviewer who is **conflicted on that award** (section 6.4) may not file a recommendation, and shall notify the Committee instead. A person who is no longer Manager of record, or whose Reviewer engagement on that RFP has ended, may not file on it.

**Effect of filing:**

1. **Within 2 business days of filing**, the Committee must cancel pending payment proposals on that award using the **3-of-5 administrative permission (7.2)**; the filer cannot cancel them. Failure is a removal-referral ground under 10.7, subject to 9.1. Members may withhold signatures while the recommendation is open (11.4).
2. Freeze further milestone payment approvals until a decision.
3. Give the awardee the recommendation and **10 business days** to respond in writing; publish their response with it.
4. Within **15 business days after that response window closes**, the Committee must decide and publish its reasons, including if it declines to terminate.

**The three outcomes and their thresholds:**

| Outcome | Threshold |
|---|---|
| **Terminate**, under 11.10 | Two-thirds, rounded up, minimum 3 |
| **Direct a recovery plan** under 11.9, setting the date it is reassessed | Simple majority, minimum 3 |
| **Decline** | Simple majority, minimum 3 |

**Escalation.** On escalation under 12.6.1(3) or 9.1, suspend the **15-business-day decision clock and deemed decline** from the escalation date; the payment freeze continues. If MSIG does not act within **30 days** under 9.2, the recommendation is deemed declined and the freeze lifts.

**If nothing carries.** If no outcome reaches its threshold within the 15 business days, the recommendation is **deemed declined**, the freeze in points 1 and 2 lifts, and the Committee publishes the vote counts and any reasons given. The awardee remains contractually obliged to deliver and the reservation stands.

**Member-Reviewer recusal.** Apply **12.6.3**, including its continuing recusal after the engagement ends or is suspended. If any recusals leave **fewer than four non-recused seats**, refer the recommendation to **MSIG under 9.1**.

**Striking an improper filing.** The Committee may, at simple majority with a minimum of 3, **strike a recommendation** filed by someone who was conflicted or who was not the Manager of record or an engaged Reviewer when they filed. Striking lifts the freeze immediately and is published with reasons. Nothing in this section limits the Committee's power to reassign an RFP under 12.3, and reassignment does not by itself withdraw a filed recommendation.

**Resuming payment.** Once the freeze lifts, cancelled payments may be **re-proposed without another award vote**, with a fresh delay and no new objection banding. Extend the **60-day clock in 10.10 by the freeze’s length**.

**A recommendation is not a termination.** Only the Committee terminates. Neither the Manager nor the Reviewer may stop work, withhold delivered work product, **suspend the service, refuse a data export,** or tell the awardee the engagement is over.

**Good-faith protection.** A recommendation is not grounds to end or decline to renew a Manager’s or Reviewer’s engagement; a declined recommendation must not count against them. Their fixed fee is unaffected by the outcome.

## 12. Program Managers and Technical Reviewers

**12.1** Managers and Technical Reviewers are outside contractors, **except Committee members engaged as Reviewers under 12.6**; the Committee selects them, and VS LLC contracts them under the standard Independent Contractor Agreement using the **Schedule A at Exhibit F to MSIG #5**, with a published rate card.

**12.2** Managers are engaged as a pool, with **exactly one Manager of record named and published for each RFP**; a Manager may run several RFPs at once.

**12.2a No Committee member may serve as Manager of record.** There is **no MSIG waiver**; changing this rule requires an amendment to **Part 1 under 16.2**.

A Manager appointed to a Committee seat **ceases to be Manager of record on appointment execution**; the appointment remains valid. Within **5 business days**, the Committee must reassign their RFPs under 12.3 and terminate their Manager engagement for those RFPs.

**12.3 Reassignment.** The Committee assigns a Manager when approving an RFP for publication and may reassign it **by majority at any time**.

On reassignment:

- Publish the change.
- The outgoing Manager must hand over the **approval history, correspondence, and open items in writing**.
- The incoming Manager must have **no conflict on that RFP**.

**No unconflicted Manager.** Record and publish the shortage and **escalate under 9.1**. MSIG may direct engagement of a named Manager or another basis of approval; **the bar in 12.2a still applies**.

**12.4 Workload.** The Committee must track and report each Manager’s RFP workload.

**12.5** Manager and Reviewer pay must not depend on milestone approval or the size, number, or outcome of an award.

**12.6 Committee members as Technical Reviewers.** Members may serve as paid Technical Reviewers only on the following terms.

**12.6.1 Preconditions.** A member may serve as Technical Reviewer only if:

1. **MSIG has set a concurrent-engagement cap** (**MSIG #5 Part H: 3**); no engagement may begin before it is set.
2. The Committee has recorded that **no suitable unconflicted external Reviewer was available**, and minuted and published that finding with the engagement.
3. **All five seats are filled.** Suspend the engagement during **any vacancy or suspension of the member’s role or signing weight**, including under **6.6 or 2.4a**. A suspended member does not count as an engaged Reviewer under **9.1, 11.2, or 11.4**.
4. **No other Committee member reviews that RFP**, and the member is **within the concurrent-engagement cap**.

**Substitution.** If the suspended member is the only Reviewer on a published RFP or live award, the Committee must engage a substitute at the threshold in **5.3**; a substitute satisfies the Reviewer setting in **20.2**. If none is engaged, the **Manager writes the scored assessment for an unawarded RFP under 22.3**, and an affected **milestone under a live award goes to MSIG under 9.1**.

**Resumption.** When the seat is refilled, the engagement resumes unless a substitute was engaged. If so, resumption requires a Committee decision at the threshold in **5.3**; otherwise the substitute remains and the member’s fee is prorated to work performed.

**12.6.2 The member recuses from both the availability finding and the vote engaging them**, since they benefit from the decision; both require a simple majority of non-recused seats, minimum 3, under section 5.3.

**12.6.3 Member-Reviewer restrictions on that RFP.**

| Restriction | Required process |
|---|---|
| **Must not draft acceptance criteria or the milestone schedule** | The Manager of record or At-Large member drafts them; the member may advise on the record |
| **Must not score proposals or reconcile divergent scores** | Give a written note, not a score. If the member is the only engaged Reviewer, the Manager writes the scored assessment under 22.3 |
| **Must not vote on termination recommendations, recovery plans, or strike decisions** | Applies to that award whoever filed the recommendation, even after the engagement ends or is suspended. If fewer than four non-recused seats remain, refer the recommendation to **MSIG under 9.1** (11.10a) |
| **Must not vote on or sign payment of their own Reviewer fee** | Follow 13.3a |

**12.6.4** A member-Reviewer **keeps their award vote** and **may sign milestone payments** on the award, subject to the checks in 11.4.

**12.6.5 Pay and disclosure.**

| Requirement | Rule |
|---|---|
| **Rates** | Use the **MSIG-set Exhibit B rate card**; the Committee cannot negotiate or vary it. |
| **Limits** | There is **no per-member fee cap**. All fees share the **Program Cost Ceiling and internal cap in 13.1**; exceeding either is reserved to **MSIG under 9.1**. |
| **Reporting** | Report every engagement and fee **by member and RFP** under **13.5**. |
| **Disclosure** | Update the member’s questionnaire **before engagement begins** under **6.3c**; the usual 10-business-day window does not apply. |
| **Block-producer control** | Block producers may change the concurrent-engagement cap or rate card, or remove the member. |

**12.6.6 Reviewer pay.** Reviewer fees are **additional to the Committee retainer**, subject to **12.6.1 and 12.6.5**.

## 13. Budget limits and reporting

**13.1 Limits and funding periods.**

**Limits.** MSIG sets the **Cycle Ceiling**, **Per-Award Limit**, **Program Cost Ceiling**, **cycle length**, and **program scope**. Ceilings are maxima, not targets; unspent allocations do not carry over.

The **Cycle Ceiling** caps commitments to awardees. The **Program Cost Ceiling** caps program operations, with separate internal caps for **Committee pay** and **Manager and Reviewer fees, Portal, and administration**. Underspend in one must not raise the other; exceeding either is reserved to MSIG under **9.1**. Amounts are set in **MSIG #5 Part D** (Appendix B).

**Quarterly funding.** Funding is authorized **four cycles at a time, covering one year** — the **authorized funding period**. Funds are transferred quarterly under that single authorization, topping the Program Account up to **125% of the coming cycle’s Total Program Spend**. Forward commitments count within that cycle’s Cycle Ceiling and do not increase the top-up.

**Block-producer control.** Block producers may change any amount, cycle length, or limit at any time by **MSIG Resolution**, and may stop, reduce, or re-time an instalment. A year’s authorization does not oblige them to fund the whole year.

**Start dates.** The first cycle starts **when the Program Account receives funds**, not when MSIG #5 passes. That date also starts the **four staggered seats’ initial terms under 3.4**. Committee pay accrues from **contract signature or the funding date, whichever is later**. The Committee must publish the funding date on the Portal.

**13.2 Reservation.** Reserve an award’s full **USD** value against the Cycle Ceiling from the decision through publication, contracting, the delay, and any MSIG confirmation; that amount is unavailable for other awards. **No payment may move before an agreement exists and the delay ends.** Multi-cycle awards follow the allocation below.

**Multi-cycle awards.** The **Per-Award Limit applies to total contract value over the full term**, not each cycle’s payments.

For such an award, only the amount **payable in the current cycle** is reserved against the current Cycle Ceiling. The rest becomes a **forward commitment**, which:

- automatically reduces the available ceiling in each future cycle it falls into;
- is listed in every cycle report, by award, showing the amount landing in each future cycle;
- counts towards the coverage test in section 13.4 for amounts falling due before the next expected transfer.

**An award extending beyond the end of the authorized funding period is a reserved matter** (section 9) and needs an MSIG Resolution. An award may span cycles inside that period under the mandate, with its value recorded as a forward commitment against the cycles it falls into.

Recurring infrastructure services must use **Service awards under 20.2a**, with a **fixed term followed by re-competition** and a contracted operational handover set.

A service renewal is a **new award**, requiring a fresh RFP, award-threshold decision, and reservation; it is not an extension of the old agreement. The incumbent may bid. Any increase to the old award remains subject to **11.8** and the limits in **13.2**; it cannot replace the required fresh RFP for a renewal.

**13.3 Release.** Release a reservation when:

- The award ends, expires, or is cancelled by block producers;
- Unearned amounts are terminated, including under the **Exhibit F clause 6 suspension long-stop**;
- The contract is signed for less than reserved;
- A bounty lapses unclaimed under **26a rule 5**; or
- The Committee records abandonment: a second consecutive missed milestone with no recovery plan, or no awardee response for **30 days**. The Committee must record either event.

Do **not** release while MSIG confirmation is pending or merely because a termination recommendation is filed under 11.10a; termination itself is required. Released amounts return to the ceiling of the **cycle of release**, not the original reservation cycle.

**13.3a Paying Program Costs.** Committee pay, Manager and Reviewer fees, Portal and administration costs are paid from the Program Account like this:

1. the Committee approves a **published payment schedule** once per cycle — simple majority, minimum 3 — listing each recipient, amount, and cadence;
2. individual payments use the **fund-moving signatures in 7.2** and the **same delay** as any other disbursement;
3. **no objection banding applies**;
4. every payment appears in the cycle report, with cumulative Program Costs against the **Program Cost Ceiling** and against **each of its two internal caps**.

A payment outside an approved schedule requires fresh Committee approval at the same threshold and its own published record.

**Member-Reviewer fees (12.6)** require a separate schedule line and **one separate payment per member**, signed by the other four. The recipient recuses from their own line and payment only; members’ Reviewer fees must not be combined.

**Committee retainer.** All five members may vote on and sign their own **USD 2,500 retainer** line, as set equally by MSIG #5 Part H.

**13.4 Denomination and price movement.**

**All amounts are denominated in USD and paid in A**: the Cycle Ceiling, Per-Award Limit, Program Cost Ceiling and internal caps, awards, reservations, and Committee pay; the Program Account holds A.

**Milestone payments convert to A when approved for payment**, using the block-producer-operated **Delphi Oracle (`delphioracle`)**.

The Reference Rate is the **`median` field of `delphioracle`’s `datapoints` table for `eosusd`**, based on the last 21 qualified submissions; **neither the Committee, VS LLC, nor the awardee supplies it**.

**How the number converts.** The oracle stores integer prices; divide `median` by 10^`quoted_precision` to obtain USD per A, using precision **4** for `eosusd`, which expresses prices in ten-thousandths of a dollar.

**The calculation is done in integer arithmetic and truncated:**

**A-units = ⌊ USD-cents × 10^6 ÷ median ⌋**, where one A-unit is 0.0001 A.

**Advances and Program Costs** convert at the **rate read when payment is proposed**, subject to the same 24-hour staleness check and fallback as milestones.

**Oracle precision.** The Committee should note any material effect of the oracle’s fixed **USD 0.0001 price increments** in the cycle report.

**Rate evidence.** For an oracle read, every approval record must capture the **oracle value, block number, transaction ID, and newest-datapoint timestamp**; for a fallback read, use the replacement evidence in the fallback table below.

**Rate checks.** Use the **fallback** for a stale rate. A collar breach, or staleness when the fallback is unavailable, requires a Committee decision at the ordinary milestone threshold: approve with the issue recorded, or defer. Neither check automatically blocks payment.

| Check | Trigger |
|---|---|
| **Staleness** | Newest datapoint older than **24 hours** |
| **Collar** | Approval rate differs by more than **15%** from the previous payment’s rate under that award, or from the award-decision rate for the first payment |

Record and publish the **newest-datapoint timestamp with every approval**, whether or not it triggers a check.

**The fallback rate.** If the newest `eosusd` datapoint is more than **24 hours** old, or the pair or `delphioracle` is unavailable, renamed, or deprecated, use **(daily high + daily low) ÷ 2** from CoinMarketCap’s published **Vaulta (A), ID 36462**, USD prices for the **UTC day before the read**.

| | |
|---|---|
| **How it converts** | fallback = ⌊ (high + low) ÷ 2 × 10^6 ⌋, computed in exact decimal arithmetic from the published figures — an integer in millionths of a dollar. Then **A-units = ⌊ USD-cents × 10^8 ÷ fallback ⌋** |
| **How long it applies** | Once it applies, it applies to **every read** until the `eosusd` pair has received at least one new datapoint in every 24-hour period for **7 consecutive days**. The Chair records and publishes the day the fallback began and the day the oracle resumed |
| **What is recorded** | In place of the oracle value, block number, and transaction id: the timestamp of the newest `eosusd` datapoint, or the fact that the pair or contract could not be read; the CoinMarketCap date; the published high and low; the resulting integer; and a retrieval record of the published figures |
| **The collar still applies** | A fallback rate is measured against the rate used at the previous payment under that award, like any other |
| **If the fallback is unavailable too** | Where CoinMarketCap publishes no high and low for that day, a stale but readable oracle goes to the Committee under the staleness check above, and a missing pair or contract suspends payments under 13.4a |

The Exhibit D configuration published by VS LLC under MSIG #5 confirms the pair, precision, and worked examples for the oracle and the fallback rate. The pair is `eosusd` and its `quoted_precision` is 4.

RFP budgets, award decisions, and approval records are stated in **USD**. The A amount and the rate used are recorded at each payment.

**USD entitlement.** Awardees receive the contracted **USD value at each milestone**, converted to A under this section.

**Coverage requirements:**

| Rule | |
|---|---|
| **Before every award** | Confirm the A balance, at the Reference Rate, covers all outstanding Award Commitments and Program Costs **falling due before the next scheduled instalment**, plus the proposed award, **with at least a 10% margin**. An award failing this test cannot be made and is a reserved matter under section 9 |
| **Every cycle** | Report outstanding USD commitments, the A balance, the rate used, and the resulting coverage percentage |
| **If coverage falls below the 10% floor** | Stop awarding. Notify MSIG within **5 business days** and request a top-up. Milestones under existing agreements continue to be paid while funds allow |
| **If A rises** | Report the surplus. It is not swept at cycle end — it reduces the next quarterly instalment, and any final balance is returned at the end of the funding period (section 14.6) |

**A change in the A payment amount is not a top-up**: it maintains the USD peg; **an award's USD amount must not exceed the Per-Award Limit**, and any increase requires the award threshold, a contract amendment, publication, and a fresh proposal and delay (11.8).

**13.4a Rate-source failure.**

If **`eosusd` or `delphioracle` becomes unavailable, renamed, or deprecated**, use the **13.4 fallback**; suspend payments only if that is unavailable too.

The **Chair must record and publish the failure within 2 business days** of any member or VS LLC becoming aware; the affected award’s Manager is the alternate. Escalate to **MSIG within 5 business days of that record** under 9.2, requesting a replacement source. **The Committee cannot choose a substitute.**

**How payments resume.** Suspended payments resume when the fallback returns, the original oracle satisfies the **7-consecutive-day recovery requirement in 13.4**, or MSIG designates a replacement source. Apply the restored source to **payment approvals made after resumption**; completed payments are not reopened. The designation amends the **Reference Rate definition under 16.2** and is not subject to deemed decline under 9.2.

**What stops and what continues**

| Activity | During suspension |
|---|---|
| **Payments and new awards** | Stop, except for the essential operations below. |
| **Work and evaluation** | Work, review, scoping, publication, questions, evaluation, and scoring may continue. |
| **Milestones** | Submission and written determinations continue, and the **11.9 and 11.10a clocks** run from the determination. Publish its date and all **11.3** information except the amount payable when made; complete payment approval using the rate on resumption and republish. |
| **Reservations** | Suspension alone does not release them; the **13.3** release triggers still apply, including termination, downward variation under 11.8, and awardee termination under the Exhibit F long-stop. |
| **Deadlines** | Extend the **10.10 60-day clock**, **26a rule 5 bounty closing date**, and any cycle-close contracting cut-off by the suspension’s length. Do not shorten awardee deadlines or count suspended time against them. |
| **Carried awards** | Reservations crossing a cycle end become forward commitments against the **resumption cycle’s Ceiling**. Escalate under **9.1** if these plus that cycle’s awards exceed it, or an extension exceeds the authorized funding period. |
| **Program Costs** | Suspend Committee pay and Manager and Reviewer fees too. They accrue and are paid on resumption, using the rate when the resumed payment is proposed under **13.4**, charged to their **accrual cycle**; that allocation survives despite 13.1. Escalate any shortfall above that cycle’s allocation under 9.1. |
| **Essential operations** | Only **Portal hosting and essential administration** continue, using the **last rate read before failure**, recorded and published with each payment; no other payment may use this exception. |
| **Reporting** | Include the suspension details required by **13.5 in every cycle report until resolved**. |

**Timing and replacement-source requirements**

| Area | Rule |
|---|---|
| **Quarterly funding** | A quarterly instalment into the Program Account due during suspension must be **sized at the Reference Rate and transferred on resumption**, not skipped (MSIG #5 Part I). |
| **Overlapping freezes** | Overlapping freezes under **11.10a** and suspensions under this section extend a clock **once, not twice**. |
| **Published bounties** | An already-published bounty may be delivered, determined, and contracted, but **not paid until resumption**; its award decision was the publication vote. |
| **Replacement-source requirements** | A replacement source designated by MSIG must support the **staleness and collar checks**; the designation must state the field, precision, equivalent newest-datapoint timestamp, and how the checks apply. |

If an awardee cannot reasonably continue unpaid, use **variation or termination by agreement under 11.8**; do not substitute a rate or increase the award during suspension.

**13.5 Cycle report.** Each cycle, write the report to the **`publications` register (7.6a)**, display it on the Portal, and send it to MSIG. Include:

| Area | Required information |
|---|---|
| **Activity** | RFPs published, proposals received, spending by category against planned shares, and spending by directed RFP, open call, and bounty channel, both in amounts and as shares of the Cycle Ceiling. If bounties exceed **25% of cycle Award Commitments**, explain why; this is a reporting trigger, not a cap. |
| **Awards** | Every award’s amount, transaction reference, and each member’s vote (for, against, recused) **by name and account**. Flag RFP-system awards as self-referential with their cycle total (15.2b); separately list sole-source bounties and reasons (26a rule 14). |
| **Funds** | Chain-reconciled opening and closing balances; amounts reserved and committed against the Cycle Ceiling and remaining capacity; committed versus paid; Program Costs used and remaining against the overall ceiling and **both internal caps: Committee pay, and Manager/Reviewer fees with Portal and administration**. |
| **Objections and cancellations** | Objections by block producer and outcomes; cancelled payments, ended or expired awards, and reasons. |
| **Delivery** | Approved and rejected milestones, with the approving Manager, any Reviewer, and signing members **by name and account**; terminations; post-award reviews under 25.2 with award references and links. |
| **Rate events** | Fallback start, oracle-resumption dates, and payments priced using fallback (13.4). For suspensions, report the start, affected amounts, MSIG replacement-source designation date, and resumption date **in every cycle report until resolved** (13.4a). |
| **Escalations** | Matters submitted to MSIG and outcomes. |
| **Managers and member-Reviewers** | Each Manager’s RFP load and reassignments; every Committee-member Reviewer engagement and fee paid **by member and RFP**, cumulative cycle fees, and engagement count against the concurrent cap (12.6). |
| **Disclosures** | Questionnaires filed, updated, or overdue, with the on-chain transaction for each. |

**13.6** The Program Account must remain **publicly auditable on-chain**; cycle reports must explain and reconcile its activity.

## 14. Expiry, suspension, revocation

**14.1** The mandate continues **until MSIG suspends or revokes it**, with no fixed expiry date.

Funding remains subject to **four-cycle authorization**; block producers may decline the next period or stop or reduce an instalment at the Threshold.

**14.2** MSIG may **suspend or revoke the mandate at any time, without cause**, and rebuild the Committee permission through the owner permission.

**14.3 Annual review.** The Committee must publish an annual review in the **`publications` register** (7.6a), covering awards, outcomes, conflict incidents, coverage history, and whether the limits remain appropriate.

**14.4** When the mandate ends, by suspension or revocation:

| Status of an award | What happens |
|---|---|
| Agreement signed | Continues. Remaining milestones are still paid |
| Payment still in its delay window | Cancelled |
| Decided but no signed agreement | Cannot proceed |

**14.5 Existing obligations must remain payable.** A Resolution ending the mandate must retain the Committee permission for surviving agreements only or instruct block producers to build a replacement permission.

**14.6** After a funding period ends and all contracted obligations are met, return or sweep the remaining balance through the owner permission as MSIG directs. **Do not carry it into the next funding period**; within a period, balances reduce quarterly top-ups rather than being swept each cycle.

## 15. Trustee and VS LLC roles

**15.1** The Trustee acts only as executor and **has no RFP-program role**; no program funds pass through the Trust (1.3).

**15.2** VS LLC administers the program and runs the Portal, contracting with awardees, Managers, Reviewers, and Committee members under the standard Independent Contractor Agreement.

**Program funds are Network funds in `rfp.vst`, not Trust Property. Work product vests in the VST** under section 9 of the agreement.

**Work product follows the award shape (20.2a)**: Deliverable awards vest what was built; Embedded awards vest the named deliverable with identified pre-existing IP carved out; Service awards vest the **operational handover set**. Every shape remains subject to the vesting clause.

**VS LLC neither chooses awardees, votes, nor controls the Program Account**, and the Committee does not manage VS LLC.

**15.2a Platform ownership.** The Portal and RFP system code are **VST-owned work product** under 20.2a; VS LLC operates them but does not own them. For code written before this Framework, complete the transfer with **a written copyright assignment from every author to the VST**, or failing that a **perpetual, irrevocable, sublicensable licence**, and **transfer to a VST-controlled repository**.

**15.2b RFP-system awards.** The Committee may fund work on the RFP system through the **ordinary RFP, award, contract, delay, and signature process**; categorize it as **Core Development** and charge it to the **Cycle Ceiling**.

**VS LLC and connected entities must not bid on RFP-system work**. Apply **6.2** as if references to a member referred to VS LLC, including common control and material interests in either direction. **MSIG may waive the bar at the Threshold with published reasons.** If the Committee finds no other capable provider, escalate the award under **section 9**.

**Where the line falls.** Building, extending, or materially reworking the system is an **award**. Keeping the existing system running unchanged — hosting, domains, certificates, monitoring, backups, administration — is an **operating cost** under 13.3a.

Classify by **whether the engagement changes what the system does**, not whether it produces work product.

The **Committee**, not VS LLC, must classify the work by **recorded majority vote, minimum 3**.

Flag every RFP-system award as **self-referential in the cycle report**.

**15.3** VS LLC must **refuse to contract** on a Committee decision plainly outside the mandate, above the Cycle Ceiling or Per-Award Limit, or missing a complete record; this checks authority rather than quality, and VS LLC must explain its refusal to the Committee and MSIG in writing.

**15.4 Block producers** set limits, appoint and remove members, decide escalations, hold the owner permission, and may cancel payments at the Threshold during the delay. They do not vote on individual awards within the mandate.

## 16. Reviews and amendments

**16.1** The Committee publishes a written self-review **9 months after the funding date**, covering RFP throughput, results, conflict incidents, and whether five seats is working.

**16.2** The Framework may be amended by MSIG; the Committee may propose amendments by two-thirds, minimum 3; and **Part 2 may be amended without reopening Part 1**.

---

# PART 2 — RUNNING AN RFP

## 17. Program overview

The Committee identifies Network needs, publishes RFPs, invites competing proposals, awards against published criteria, and pays against delivered milestones. Open calls and bounties follow sections **26 and 26a**.

## 18. Stage 1 — Collecting needs

**18.1 Who can submit.** Block producers, Committee members, the Trustee and LLC Manager, ecosystem teams, and the community.

**18.2 What a need looks like.** The problem, who it affects, what happens if nothing is done, what has been tried, and a rough sense of size.

**Needs must describe the problem, not request funding for a named team or solution**; return submissions that do.

**18.3 Public backlog.** Every submission is published with a status: new, under review, prioritized, drafting, published, deferred, or declined. **A declined item must carry a reason.** Nothing disappears without explanation.

**18.4** The Committee reviews new submissions at least monthly. The portfolio holder leads in their category.

## 19. Stage 2 — Choosing what to fund

**19.1 Criteria.**

1. **Impact** — how much does this improve security, usability, adoption, or resilience?
2. **Urgency** — is there a deadline or a closing window?
3. **Feasibility** — can an outside team deliver this against a written specification?
4. **Duplication** — is someone already doing it?
5. **Value for money** — likely cost against likely benefit.
6. **Balance across categories** — so that one category does not absorb everything.

**19.2 Category shares.** Each cycle sets indicative shares by category, covering **both the directed program and any open call**. They are guidance, not limits. The Committee may depart from them with a recorded reason.

**19.3 Output.** A published shortlist of what becomes an RFP this cycle and what is deferred.

## 20. Stage 3 — Writing and publishing an RFP

**20.1 Preparing an RFP.**

| Role | Responsibility |
|---|---|
| **Portfolio holder** | Sponsors the draft. |
| **Committee member engaged as its Reviewer** | Follows **12.6.3**; someone else must draft acceptance criteria and the milestone schedule. |
| **Manager of record** | Must be assigned when publication is approved, or earlier to help draft the RFP. |
| **Technical Reviewers** | May advise on feasibility and budgets for technical RFPs. |
| **Committee** | Must decide **at scoping whether a Technical Reviewer is needed**, based on whether the work is technical, **including Service awards**. |

**20.2 Every published RFP must contain:**

- title and category;
- background and the problem;
- scope — what is included and what is excluded;
- deliverables, specific enough to inspect;
- acceptance criteria for each deliverable;
- **milestone expectations** — what must be staged, any checkpoint the Committee requires, and a statement of the **two-milestone minimum** under 11.1a. The RFP does **not** fix the schedule; proposers submit one and the Committee may modify it before award;
- **budget ceiling** — published, not hidden;
- timeline: submission deadline, question period, evaluation period, target award date, delivery deadline;
- **evaluation criteria and weights**, published before submissions open;
- eligibility and conflict rules;
- **award shape** — Deliverable, Service, or Embedded (section 20.2a);
- IP and delivery terms (section 20.2a): what vests in the VST, and — on any shape — what is expected to be **carved out as pre-existing IP**; **for Deliverable and Embedded awards**, the **licence mode** — Required (with the licence named), Proposer's choice (with the permitted set), or Default — under 20.2a; **for Service awards**, the **service levels**, **term**, and **handover and transition requirements under 20.2a**;
- decision timeline: award date, contracting step, delay window, expected first payment;
- submission format and channel;
- named **Manager of record** and contact, and **whether a Technical Reviewer is engaged**.

**The RFP is written to the `publications` register as published** (7.6a), and each numbered amendment under 21.3 is written alongside it rather than replacing it.

**20.2a Award shape, work product, and licence.** Every RFP must declare its **award shape at publication**; unsolicited proposals do so at **categorization under 26.1**. The declaration is fixed and governs the agreement (23.3a) and closing (25.1).

| Shape | What is funded | Work product |
|---|---|---|
| **Deliverable** | New code, designs, research, or content built for the Network | **What was built**, released under the licence recorded in the award decision under 23.2 — the one the RFP required, the one the awardee offered from the permitted set, or the applicable default under 20.2a |
| **Service** | A hosted or operated service — history APIs, snapshots, indexers, monitoring | **The operational handover set specified in the RFP**, including an export of any Network data the service holds in a documented format, and excluding the provider’s pre-existing software and IP. The running service itself is performed, not delivered |
| **Embedded** | New work built inside software the awardee already owns | **The named deliverable, excluding identified pre-existing IP** — with an **irrevocable licence back, surviving termination**, over any pre-existing IP embedded in it, wide enough for the Network to use, modify, and have others operate the deliverable |

**Every agreement must vest the work product defined for its shape in the VST under section 9**; Schedule A cannot disapply that clause.

**Default licences.** Release code under **Apache-2.0** and other deliverables under **CC-BY-4.0**.

**Licence mode.** Every **Deliverable and Embedded** RFP declares one of three, **at publication**:

| Mode | Effect |
|---|---|
| **Required** | The RFP names the licence and it is binding. A proposal offering anything else is **non-compliant at the screen** (22.2) |
| **Proposer's choice** | The RFP names a **permitted set** and the proposer picks from it in their proposal. The licence they name becomes a term of the award. A proposal naming a licence **outside the set, or naming none, is non-compliant at the screen** (22.2) |
| **Default** | Silence. The defaults above apply |

**Service awards have no licence mode**: the agreed handover materials vest in the VST, and the Network may modify them and give them to a successor. Default licences do not apply.

**Service handover and transition:**

1. Each Service RFP must state the handover and transition requirements—including data exports, deadlines, and payment terms—and any material limits on switching providers; the contract must include those requirements.
2. Providers retain ownership of their pre-existing software and IP; any licences must be expressly agreed in the contract.

**Licence decisions and locks:**

- At the **publication threshold**, the Committee sets the mode and Required licence, or the Proposer’s-choice permitted set, in the RFP.
- Each RFP sets its own permitted set at scoping; there is no standing list. If Proposer’s choice omits it, the fallback set is **Apache-2.0, MIT, or BSD-3-Clause for code; CC-BY-4.0 or CC0-1.0 for non-code**.
- **Mode, permitted set, and Required licence lock at publication**; the proposer’s chosen licence locks at award and must appear in the agreement.
- Score a Proposer’s-choice licence only under a **separate criterion and weight published before submissions open** (22.1); the standing openness criterion alone does not allow it.
- Explain any **departure from default licences** in the RFP: name and justify the licence in **Required mode**, or publish and justify the permitted alternatives in **Proposer’s choice mode**. The proposer’s actual choice is recorded at award under **23.2**.

**Closed-source deliverables.** At publication, state that usable open-source release is impossible and specify the Network’s alternative: a licence, service commitment, source escrow, or combination. Use **Required mode** and name the alternative licence; Default and Proposer’s choice are unavailable. Silence means open-source release.

**Publication locks.** The **award shape and Reviewer setting cannot change** at contracting, signing, or under 11.8; correct an unsuitable setting in the next RFP. The Reviewer setting governs every assessment throughout the award under **11.2 and 11.4**.

**20.4 Approval to publish.** Majority, minimum 3. Before publishing, the Committee confirms the expected award fits within the Per-Award Limit and the remaining Cycle Ceiling. If an escalation to MSIG will be needed, get it before publishing, not after proposals arrive.

**20.5 Minimum open period.** 21 days normally. 10 days for small or urgent RFPs with a recorded reason.

## 21. Stage 4 — Questions and submissions

**21.1** The RFP is published on the **Portal**, which is the canonical venue. Anything published elsewhere mirrors the Portal. The Marketing portfolio holder is responsible for reach.

**21.2 Questions.** All questions go to the Manager of record through the published channel. **All questions and answers are published to everyone**, without naming who asked, and are **written to the `publications` register within 2 business days of the answer** (7.6a). No private guidance of any kind.

**21.3 Changes.** Material changes to scope, budget, or deadline are published as numbered amendments, and the deadline extends by at least 7 days.

**21.4 Late submissions** are rejected, with no exception unless the submission channel itself failed and that is documented.

## 22. Stage 5 — Evaluation

**22.1 Criteria and weights are fixed before submissions open** and cannot change afterwards. On an **unsolicited proposal** they are fixed at categorization under 26.1, there being no submissions window to open. Default weights:

| Criterion | Weight |
|---|---|
| Technical approach | 30% |
| Team capability and track record | 25% |
| Cost realism and value | 20% |
| Timeline and milestone structure | 15% |
| Ecosystem fit, openness, maintainability | 10% |

Weights may differ by category, but the version used must be published with the RFP.

**22.2 Compliance check.** The Manager checks completeness, eligibility, conflicts, licence compliance under **20.2a**, and the **11.1a** schedule: at least two milestones, each with a deliverable, acceptance criteria, amount, and date. Reject non-compliant submissions with written reasons; score schedule quality under **22.1**, rather than at the compliance screen.

**22.3 Scoring.** *On an unsolicited proposal, "the published statement" and "the published criteria" mean those fixed at categorization under 26.1.*

- **RFPs whose published statement says a Reviewer is engaged:** Technical Reviewers score independently and in writing. They do not see each other's scores before submitting. They may discuss afterwards to resolve large differences, and the discussion is recorded.
- **RFPs whose published statement says one is not:** the Manager of record writes the assessment, in the same format, against the same published criteria.
- **Where the only engaged Reviewer is a Committee member** (section 12.6): the **Manager of record writes the scored assessment** against the published criteria, informed by but not bound by the member's written note. The note is published alongside it.

In every case a written assessment against published criteria must exist before any award.

**22.4 Committee discussion.** The Committee receives the scores and reasoning, discusses, records recusals, and may interview shortlisted proposers — provided every shortlisted proposer gets the same opportunity and the same questions.

**22.5 Departing from the scores.** The Committee may award to a proposal that did not score highest, but must publish a written reason.

**22.6 Too many recusals.** If fewer than three non-recused members remain, or fewer than four can sign, the award goes to MSIG with the written scores and a statement of the recusals.

**22.7 No good proposals.** The Committee may decline to award, change the scope, and republish.

**22.8 Negotiation.** Limited clarification with the preferred proposer is allowed **before the award decision** and must be recorded. In Proposer’s choice mode, **the offered licence cannot change** and becomes an award term; later changes follow **11.8**.

## 23. Stage 6 — Award and contracting

**23.1** The award decision, publication, contracting, on-chain proposal, delay window, and payment follow **Part 1, sections 10 and 11**. That sequence is not repeated here.

**23.2 The decision record must include:**

- Awardee, scope, **award shape (20.2a)**, and total amount.
- For **Deliverable and Embedded** awards, state the **Required licence**, the proposer’s offered licence in Proposer’s choice mode, or the applicable Default licence. For **Service** awards, record **no licence mode**, the handover and transition requirements, any material limits on switching providers, and any expressly agreed pre-existing-IP licences under **23.3a**.
- The awarded **schedule of at least two milestones and their amounts**, any changes from the submitted schedule, and the proposer’s agreement under **11.1a**.
- Every member’s **vote — for, against, or recused — by name and on-chain account**.
- Reasons for departing from the scores.
- The **rate evidence at the decision** under **13.4**: oracle median, block number, transaction ID, and newest-datapoint timestamp, or the fallback’s replacement evidence where it applies.

**An incomplete record cannot go to contracting.**

**23.3 Every awardee agreement must:**

- be the standard **VS LLC Independent Contractor Agreement** with an award-specific Schedule A, under which **work product — as defined for the award's shape under 20.2a — vests in the VST** (section 9);
- **enumerate the milestone schedule** — each milestone numbered, with its deliverable, acceptance criteria, amount, and date, **at least two of them** (11.1a) — **matching the published decision exactly**. Nothing is paid against a milestone the agreement does not enumerate;
- make the **initial award disbursement conditional on clearing the delay and objection process**, with the **cancellation consequences and exceptions in 10.9**, including no liability on either side where the agreement terminates under that section;
- allow termination for non-delivery and for cause, with a period to fix problems;
- include a **recovery clause** for money paid against milestones later found undelivered or misrepresented, enforced by VS LLC;
- require disclosure of any other Network funding for the same work;
- state the award value in **USD**, the **verified receiving account** for payment in A, and that each milestone is paid in A calculated at the reference rate on the date of **approval for payment**, which is the date of the Manager's determination except where payments are suspended under 13.4a or the approval is referred to the Committee under 13.4;
- confirm the awardee is an independent contractor, not an agent of the Network, the Trust, or VS LLC.

**23.3a Contract requirements by award shape (20.2a).**

| Shape | Required contract terms |
|---|---|
| **Deliverable** | Vest work product in the VST and release it under the **23.2 licence**; deliver code to a **Network-controlled repository**, or non-code final files and working materials to a **Network-controlled store**. |
| **Service** | State **service levels and term** and include the RFP’s **handover and transition requirements under 20.2a**, including deadlines and payment terms. Vest the agreed handover materials in the VST and deliver them at term-end or termination, whichever is earlier. Record any material limits on switching providers and any expressly agreed pre-existing-IP licences; ownership remains with the provider. Require **no exclusivity or restriction on re-competition**, and Network-data export **on request at any time**. |
| **Embedded** | Vest the named deliverable in the VST, identify and carve out pre-existing IP, and provide the irrevocable licence back below, surviving termination. Deliver open-source code to a **Network-controlled repository under the 23.2 licence**; for closed-source work, provide the RFP’s stated alternative. |

**Pre-existing-IP rules apply to every award shape.**

**Pre-existing IP** is material the awardee owned or was licensed to use before the award, or developed independently of the award; it must be identified **in Schedule A at contracting**. For **Deliverable and Embedded awards**, unlisted items do not qualify for the carve-out. For **Service awards**, omission from the list does not transfer ownership of the provider’s pre-existing software or IP.

**For Deliverable and Embedded awards**, where pre-existing IP is embedded in the work product, the awardee grants the VST an **irrevocable licence back**, surviving termination, sufficient for the Network to use, modify, and have third parties operate the work product. **Service-award licences follow the express contract terms under 20.2a**.

**Blocking — counsel confirmation.** Before using a Schedule A pre-existing-IP carve-out and licence back, record counsel’s confirmation that **section 9 of the standard Independent Contractor Agreement permits them**. Until then:

- Do not publish **Service or Embedded RFPs**.
- Do not contract any award with a **populated pre-existing-IP schedule**.
- A **Deliverable** award with an empty schedule may proceed.

If section 9 does not permit the carve-out, **amend the agreement first**; neither Schedule A nor defining work product by shape may narrow its vesting clause.

**23.4 Unsuccessful proposals.** Unsuccessful proposers may request their own scores and a short written explanation; award publication follows **10.3**.

## 24. Stage 7 — Delivery

**24.1** The Manager of record is the awardee's contact: check-ins at least every two weeks on active work, status reports to the Committee, early warning of delays, and handling change requests.

**24.2** Milestone approval and payment follow **Part 1, section 11**.

## 25. Stage 8 — Closing and reporting

**25.1 Closing an award.** Require **final acceptance, final payment, a short public completion note**, the shape-specific handover below, and the **published review under 25.2**, where required. Confirm actual completion.

| Shape | Required handover at closing |
|---|---|
| **Deliverable** | **Code:** a tagged source copy in a **Network-controlled repository**. **Other deliverables:** final files and working materials in a **Network-controlled store**. Both require the **23.2 licence**, credentials, domains, and documentation; a link to the awardee’s repository is insufficient |
| **Service** | Complete the **contracted handover and transition requirements** and confirm that any **Network data has been exported**. The checklist must not require handover of the provider’s pre-existing platform |
| **Embedded** | A **tagged source copy of the deliverable** in a Network-controlled repository where it is open source; where it is not, written confirmation that the licence or other alternative named in the RFP is in force, plus any escrow deposit made |

**Terminated awards** require their shape’s handover and any review due under **25.2**. Final acceptance and final payment are not required after termination under **11.10**. For **Deliverable and Embedded** awards, hand over only work accepted before termination; if none was accepted, close on the published termination record alone.

**25.2 Review after large awards.** For awards at or above the **MSIG #5 Part D threshold (Appendix B)**, measured on **total contract value (13.2)**, review whether the need was met, the budget was appropriate, and the Network would fund the work again.

- **Deadline:** publish within **20 business days** of final acceptance or publication of the ending record: termination under 11.10, termination or variation by agreement under 11.8, awardee termination under the suspension long-stop, or expiry under 10.10. For bounties, count from the Manager’s **written acceptance determination under 26a rule 2**.
- **Author:** the Manager of record. If none is available, their engagement ended, or they recommended termination, the Committee appoints another Manager from the pool at **majority, minimum 3**, recording why. If no unconflicted Manager is available, follow 9.1 and 12.3.
- **Scope and fee:** reviews are within the Manager’s **Exhibit B scope** and paid separately. Include terminated awards and bounties meeting the threshold; for terminations, explain why the award ended and what the program would change.
- **Awardee response:** provide the review **5 business days before publication**; the awardee may respond within that window and the response is published with it. Publish even without a response.
- **Redaction:** only confidential commercial information of the awardee, legal advice, or personal data may be removed. **Program decision-makers’ names, roles, seats, and accounts remain public under 5.9.** Decide redactions at **majority, minimum 3**, record the decision, and finish before writing to the register (7.6a). Redaction must not alter conclusions or be based on disagreement with the Manager’s judgment (11.5).
- **Publication and closure:** publish on the Portal, link the review from the next cycle report (13.5), and do not close an award requiring a review until it is published.

**25.3 Cycle report and annual review** follow **Part 1, sections 13.5, 14.3 and 16.1**.

## 26. Optional — open call for unsolicited proposals

Unsolicited awards follow the **same mandate, thresholds, limits, contract-first rule, publication, delay, and objection bands** as directed RFPs. There is **no open-call sub-limit**; awards share the Cycle Ceiling.

Categorize each proposal on arrival under **2.1** and assign its portfolio holder to lead assessment; cross-category proposals and those fitting no category go to the **At-Large seat**. Assign a **Manager of record** in the same way as directed RFPs. Include proposals in the **public backlog (18.3)** and the **cycle report’s category breakdown**; indicative category shares under **19.2** cover both channels.

**26.1 Terms fixed at categorization.** Before assessment starts, the portfolio holder must settle and publish:

| What is fixed | Applicable rules |
|---|---|
| **Award shape** — Deliverable, Service, or Embedded | 20.2a; locks at publication |
| **Licence mode** and, in Proposer's-choice mode, the **permitted set** | 20.2a |
| **Whether a Technical Reviewer is engaged** | 20.2; applies throughout the award under 11.2, 11.4, and 22.3 |
| **Evaluation criteria and weights** | 22.1; the written assessment under 22.3 must use them |
| **Scope as accepted** and any **budget ceiling** set by the Committee | 20.2 |

Publish these terms on the **Portal and in the `publications` register (7.6a) before assessment begins**; they lock at publication on the same basis as directed-RFP terms.

**Material changes from the proposal.** Notify the proposer and give them **10 business days to accept or withdraw** if the settled terms materially differ from their proposal.

The Committee must **not re-scope the work**; it settles only the terms needed to evaluate and contract.

## 26a. Bounties

**A bounty** is a **published fixed-price task, open to anyone, paid for the first acceptable delivery**. No evaluation or scoring round applies.

The **two-milestone minimum in 11.1a does not apply**. For **23.2 and 23.3**, substitute the fixed price and published acceptance criteria for the milestone schedule, and the publication vote for the proposer’s agreement. Take the **award-decision oracle read at the publication vote**, providing the 13.4 collar baseline.

### Publication and funding

| Rule | Requirement |
|---|---|
| **1** | **Publish on the Portal** the acceptance criteria, fixed price, award shape, **licence in Required or Default mode only**, Reviewer setting, named Manager of record, and closing date. All lock at publication as under 20.2a; Proposer’s choice is unavailable. |
| **2** | The **publication vote is the award decision**, at **two-thirds, minimum 3**, conditional on acceptable delivery. No second award vote is needed. The **60-day clock in 10.10 starts at the Manager’s written acceptance determination**; the publication vote does not expire while the bounty is open. |
| **3** | The **Per-Award Limit and Cycle Ceiling apply**; there is **no additional per-bounty cap or bounty sub-limit**. |
| **3a** | No delivery may be accepted until the bounty has been open **21 days**, or **10 days** if under **USD 5,000** or with recorded urgency. |
| **4** | **Reserve the fixed price against the Cycle Ceiling at publication** (13.2). |
| **5** | A bounty **lapses** at its closing date, or at the end of the cycle in which it was published if earlier, releasing its reservation — **unless a delivery has been accepted by then**. On acceptance the reservation continues under 13.2 through contracting, the delay window, and any MSIG confirmation; any amount payable after cycle end is carried as a **forward commitment** against the following cycle. **The closing date must leave room inside the cycle for acceptance, contracting, and the full delay** — the Cycle Ceiling does not carry over (13.1). |

### Assessment

| Rule | Requirement |
|---|---|
| **6** | Record deliveries in a **public register with receipt timestamps**. The Manager assesses in **receipt order**, stopping at the first delivery meeting the published criteria. Record later deliveries as unsuccessful with written reasons; “first” means first received. |

**Evaluation rules.** Sections **21.2, 22.1, 22.4, and 22.5 do not apply**. Before acceptance assessment, the Manager checks each delivery’s completeness, eligibility, conflicts, and ban status **in receipt order** under **22.2**; omit milestone-schedule and licence-mode checks. A **written acceptance determination against published criteria satisfies 22.3**; no scoring, weights, or reconciliation apply.

### Acceptance and payment

| Rule | Requirement |
|---|---|
| **7** | Make the **10.3 publication on acceptance**, recording the awardee, receipt timestamp, acceptance determination, price, and publication vote by name and account. The **10.4 delay starts from that publication**. |
| **8** | **Contract before payment** and use the normal signatures and delay. Payment is an **initial disbursement under 11.4a**, with **objection bands under 10.5**. If the published Reviewer setting requires one, obtain the Reviewer’s written assessment before the Manager’s acceptance determination. |

### Cancellation

| Rule | Requirement |
|---|---|
| **9** | **If a bounty payment is cancelled**, the Manager **resumes assessment at the next delivery in order of receipt**, provided the bounty has not lapsed; a delivery recorded unsuccessful only because an earlier one was accepted is **reinstated**. |
| **10** | If payment is cancelled, **no work product vests**; the deliverer retains it without restrictions on its use under the agreement. |

### Safeguards

| Rule | Requirement |
|---|---|
| **11** | Apply **all conflict rules**, the **6.1 and 6.4 bidding bars**, the **ban register**, and the **pre-existing-IP schedule at contracting**; unlisted pre-existing IP does not qualify for the carve-out. |
| **12** | Work product is handled by shape under 20.2a, normally **Deliverable**. |
| **13** | **No bounty may be split** out of work that should have been an RFP (rule 5 of section 27 applies unchanged). |
| **14** | If the Committee expects **only one realistic deliverer**, record the expectation and reasons at publication, identify it as **sole-source**, and list it separately in the cycle report. This does not bar the bounty. |

Use a **directed RFP where competitive evaluation would add value**, such as comparing capable teams, approaches, or prices; the Committee records that judgment under rule 14. This is not a bounty size limit.

## 27. General rules

1. **Published criteria, weights, budgets, and results.** Every judgment is written down and attributable.
2. **All questions and answers are public.** No private guidance to any proposer.
3. **Recusal is required, automatic, and published.** Thresholds recalculate on non-recused seats.
4. **Nobody scores, approves, or is paid on an RFP they could bid on.** The one exception is a Committee member engaged as Technical Reviewer under 12.6 — they are paid on an RFP they are barred from bidding on, and 12.6's guards apply in place of this rule. Material breaches follow **6.6**.
5. **No splitting or staging** to stay under the Per-Award Limit, and no topping up past it later.
6. **Departing from the scores requires a written reason.**
7. **Payment follows delivery**, except for capped, justified advances.
8. **Every award is published before money moves**, is contracted before it is proposed on-chain, and waits out its full delay.
9. **Personal-key restrictions** follow **7.4**.
10. **Every proposal is categorized**, directed or unsolicited, so it reaches the right portfolio holder.
11. **Everything the community submits gets a status**, and a reason if declined.

---

## Appendix A — Roles and responsibilities

This is a role guide; the cited sections contain the full rules and exceptions.

| Role | Responsibilities | Limits |
|---|---|---|
| **Block producers (MSIG)** | Grant, suspend, or revoke the mandate; authorize four-cycle funding periods; set limits; appoint and remove members; decide escalations; cancel payments at the Threshold. | Do not vote on individual RFPs or awards within the mandate (8–9). |
| **Steering Committee** | Select RFPs, scopes, budgets, and awardees; withhold or terminate; classify RFP-system work (15.2b); sign payments under **7.2**. | No milestone approval except **13.4 rate referrals**; no serving as Manager of record (12.2a) or managing funds outside the Program Account. |
| **Manager of record** | Run the RFP, approve milestones, keep the objection register, and recommend termination under 11.10a. | Cannot be a Committee member, vote on awards, bid on their RFP, terminate awards, or sign or disburse payments. |
| **Technical Reviewer** | Provide written scores and milestone assessments when engaged, including for technical Service awards; submit termination recommendations directly to the Committee. | Cannot work where the Reviewer setting says none is engaged, approve milestones, or terminate awards. No vote except as a **member-Reviewer under 12.6**, who keeps their seat’s award vote and may sign milestone payments, subject to that section’s scoring, reconciliation, termination/recovery/strike-vote, and own-fee restrictions. |
| **VS LLC** | Contract with awardees and role-holders; operate the Portal and write the `disc.vst` registers; configure and publish the Program Account; refuse contracts outside the mandate. Work product vests in the **VST** by award shape (20.2a). | Cannot choose awardees, control the Program Account, or own the platform (15.2a); VS LLC and connected entities may not bid on RFP-system work except under **15.2b**. |
| **Trustee** | No RFP-program role (1.3 and 15.1). | — |

## Appendix B — Program settings

The table identifies where each setting is defined. Settings in MSIG #5 can change without amending this Framework.

| Item | Where |
|---|---|
| Cycle Ceiling and Per-Award Limit (in **USD**) | MSIG #5 |
| **Program Cost Ceiling** and its two internal caps — Committee pay, and Manager and Reviewer fees with Portal and administration (section 13.1) | MSIG #5, Part D |
| Delay window length, normal and urgent | MSIG #5, Part E |
| Cycle ceilings and the funding period | MSIG #5 |
| Committee pay (in **USD**, paid in A) | MSIG #5 |
| Initial staggered terms | Framework section 3.4 |
| ECF process publication and first vote dates | MSIG #5 |
| Program Account (`rfp.vst`) permission weights, signature thresholds, and owner | Framework section 7.2. Developed, configured, and published by **VS LLC** under MSIG #5 Part E |
| Manager and Reviewer rate card | MSIG #5, Exhibit B |
| Schedule A terms for every paid role | MSIG #5, Exhibit F |
| Minimum coverage margin (10%) | Framework section 13.4 |
| Cap on concurrent member-Reviewer engagements (section 12.6) | MSIG #5, Part H |
| Post-award review threshold (section 25.2), set as a share of the Per-Award Limit | MSIG #5, Part D |

## Appendix C — Outstanding items

**Blocking items are marked.** A blocking item stops something specific from happening until it is resolved.

**Scope.** The **Program Administration Register** tracks off-chain candidate sourcing, counsel’s conforming amendments and operating-procedure changes, and the EOS Rio code and rights handover. It is **not part of this Framework or approved by MSIG**.

**Item numbers remain fixed.** Delete resolved items without renumbering the rest. These numbers are independent of MSIG #5’s *Blanks to fill*.

| # | Item | Blocking? |
|---|---|---|
| 2 | Source account holding the REX yield and Year 1 pools | — |
| 3 | The **Trustee Compensation and Indemnification Acknowledgment**, approved by vstcreation but not yet reviewed — it may add indemnification terms for compensated governance roles that Committee members should also have | — |
| 4 | Initial Manager pool — **at least three, or at least two unconflicted on every open RFP**. Committee members cannot fill gaps (12.2a) | — |
| 5 | Technical Reviewer roster for technical categories | — |
| 6 | Portal readiness to host the backlog, award records, and objection register | — |
| 7 | The **disclosure questionnaire instrument** — **drafted as version `VQ1`**; text, coded-answer schema and position bands complete (section 6.3a). What remains is publication with the register open for filing | **Yes** — the Program Account is not funded until every member has filed, and nobody can file until the register is open |
| 8 | Deploy **`disc.vst`** with the **disclosures (6.3b), decisions, and publications (7.6a)** tables in one or more contracts; publish the ABI, all three schemas, write authority, upgrade path, and RAM provision. **Exhibit D sections 1.4 and 4** specify the authorities and register design; **section 5 and Appendix B** specify RAM, including **16 MB at launch**, provisioned and topped up by VST and VS LLC. The **EOS Rio team** builds and services it; **VS LLC remains accountable** and records it in Exhibit D under MSIG #5 Part E (PRD 7.2). | **Yes** — no funding before Exhibit D publication |
| 10 | **Counsel to confirm section 9** of the standard Independent Contractor Agreement permits the pre-existing-IP carve-out and licence back by Schedule A (section 23.3a) | **Yes** — until confirmed, no Service or Embedded RFP may be published, and no award may be contracted with a populated pre-existing-IP schedule |
