# Vaulta Network RFP Framework

**Exhibit A to MSIG #5**
**Status: DRAFT v5.4**
**Date: [___]**

This is the final RFP Framework required by MSIG #4. It has two parts.

- **Part 1 — The Steering Committee and the Mandate.** Who decides, how they are chosen, how they vote, and how money moves.
- **Part 2 — Running an RFP.** How a single RFP goes from an idea to a paid deliverable.

Part 2 may be amended by MSIG without reopening Part 1. **Part 1 governs any conflict**, and Part 2 may vary a Part 1 rule **only where Part 1 expressly permits it**. *Terms used throughout* forms part of Part 1.

**Terms used throughout.** *Business day* = Monday to Friday, measured in UTC; no public holidays are excluded. *Reference Rate* = the Delphi Oracle `datapoints.median` for `eosusd`, read at the time of the relevant action and converted per section 13.4, or the fallback rate in 13.4 where it applies. *Award Commitments* = amounts committed to awardees, constrained by the Cycle Ceiling. *Program Costs* = everything the program spends on itself — Committee pay, Manager and Reviewer fees, Portal and administration — constrained by the Program Cost Ceiling. *Program Cost Ceiling* = the per-cycle cap on Program Costs, set in MSIG #5, with internal caps on Committee pay and on everything else. *Total Program Spend* = Award Commitments and Program Costs together. *Committee* = the Vaulta Network Steering Committee. *Threshold* = 15 of 21 active block producers. *Program Account* = the on-chain account holding program funds. *Manager of record* = the RFP Program Manager assigned to one RFP. *Portal* = the RFP portal. *VS LLC* = Vaulta Stewardship LLC. *Delay window* = the on-chain waiting period before a payment executes.

---

# PART 1 — THE STEERING COMMITTEE AND THE MANDATE

## 1. What the Committee is

**1.1** The Oversight Committee is renamed the **Vaulta Network Steering Committee**, retaining its records and indemnification rights.

MSIG #5 fills **none of the five seats**; all members must be appointed by **future MSIG Resolutions at the Threshold using Exhibit E**, with the Community seat selected under section 4; block producers decide when to fill the seats.

**Dafeng Guo, Ross Dold, and Francis Sangkuan** continue performing **Trust oversight only** until all five seats are filled, when their transition service ends; Ross may be separately appointed, while Dafeng remains subject to the Treasury exclusion in section 2.4a.

Until all five seats are filled, **the RFP mandate must not be exercised, no RFP may be published, and no award may be made**.

**The Program Account must not be funded and the Committee permission must not be activated** until all five seats are filled and every member has signed their contract, filed their declaration, and registered a signing key.

**1.2** The Committee oversees the Trust and makes RFP funding decisions for the Network under separate rules:

| | **Trust oversight** | **Network RFP funding** |
|---|---|---|
| Authority | Trust Agreement | MSIG #5 |
| Assets | Trust Property | Network funds in the Program Account |
| Role | Monitors and reports | Decides who receives funding |
| Accountability | Records required by the Trust Agreement | Publication, payment delays, reports, and funding approval every four cycles |

**1.3** Program funds are **not Trust Property**, the RFP program is not a Trust activity, and the Trustee has no role in it.

**1.4** Every decision and record must state whether it relates to **Trust oversight** or the **Network RFP program**.

**1.5** The Committee must not use **Trust oversight** to pressure decisions in the **Network RFP program**, or vice versa; any communication involving both roles must be written and recorded in the minutes.

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

## 3. Choosing members and terms

**3.1** The **Core Development, Marketing, Business Development, and General (At-Large) seats** must be filled by MSIG Resolutions at the Threshold using **Exhibit E to MSIG #5**; each proposal may cover **one or more seats**.

Block producers may approve competing proposals for a seat, but the **first appointment executed by block time** fills it; later executions have no effect for that seat.

Each proposal must state its **resolution mode**:

- **Seat by seat** (default): Each appointment is considered independently; an appointment that cannot take effect does not affect the others.
- **All or nothing**: No appointments take effect if any listed appointment cannot take effect.

An appointment has **no effect** if, at execution:

1. The seat is already filled.
2. The candidate already holds another seat, including one filled by the same Resolution.
3. The appointment would breach the affiliation rule in **section 2.4**.
4. The candidate is Treasury-affiliated without an express waiver at the Threshold.
5. The candidate is on the ban register under **section 6.6**.

If candidates in the same proposal conflict under the one-seat or affiliation rules, **Candidates table order sets priority**: the first appointment takes effect, and conflicting later appointments have no effect, subject to the chosen resolution mode.

**3.1a Network vision statements.** Every appointment proposal must include a statement **written by each candidate about their seat’s portfolio**, covering:

1. The Network’s needs during the term.
2. What they would prioritize funding and what they would decline.
3. How they would measure the program’s success by the end of their term.
4. Positions or commitments block producers should know about.

Aim for **300–800 words in plain language**, with a translation where helpful; declare interests separately in the disclosure questionnaire under **6.3a**. A slate may include a shared statement, but each candidate must still provide their own.

**Missing statements.** A proposal missing a statement is incomplete and should not be proposed or approved; if it executes, the appointment remains valid, but VS LLC must record the omission in the seat register, and **pay and signing weight cannot begin until the statement and the contract, questionnaire, and signing key required by MSIG #5 Part B are complete**.

**Publication and reappointment.** Statements must be recorded in the **`publications` register (7.6a)**, displayed on the Portal with the proposal, and linked from the seat register throughout the term; they are **non-binding** but inform reappointment, and members seeking another term should explain how their year compared with their statement.

**Seat register.** VS LLC must maintain a seat register in the **`publications` table (7.6a)** and display it on the Portal, recording:

- Each member’s name and on-chain account, matching their identity under **6.3a**.
- The proposal name, execution transaction, and resolution mode.
- A link to each member’s vision statement.
- Any proposed seat left unfilled and the reason.

The register is the **official record of executed appointments and any conditions identified by VS LLC**; eligibility is decided by **MSIG**. If VS LLC records a seat as unfilled for any reason other than an earlier execution, it must publish its reasons and refer the matter to MSIG; the seat remains vacant until MSIG decides.

**3.2** Members serve a **one-year term** and may be reappointed without limit.

**3.3 Continuation.** Members continue month to month after their term ends and **keep their signing key** until a successor is seated or MSIG replaces them.

**3.4 Staggering.** Initial terms for the **Core Development, Marketing, Business Development, and General (At-Large) seats begin when the Program Account receives funds**; a **Community member appointed by MSIG** under 4.2 or 4.7 serves **one year from execution of their appointment Resolution**.

| Seat | Initial term |
|---|---|
| Core Development | 14 months |
| Marketing | 14 months |
| Business Development | 8 months |
| General (At-Large) | 8 months |
| Community | See section 4 |

All later terms are **12 months**.

**3.5 Removal.** An MSIG Resolution may remove a member at any time, with or without cause; their **signing weight ends immediately on removal**. The Committee may refer members to MSIG for removal but **cannot remove them itself**.

**3.6 Resignation.** A member may resign by giving written notice to the Chair and block producers, effective on the date stated or, if none, on delivery. Their **signing weight ends and their seat becomes vacant when the resignation takes effect**.

**3.7 Vacancies.** A vacant seat is filled for the rest of the term using the process for that seat.

**3.8 Signing requirements.** Payments require **4 of 5 signatures**, with one unit of signing weight per seated member.

With fewer than four members, **no payment can execute**; the Committee may still meet, decide, publish, and escalate, but MSIG must fill a seat or change the permission.

An award goes to **MSIG** if fewer than four members can sign (section 9).

## 4. The Community seat

**4.1** The **EOS Community Foundation (ECF)** runs the Community seat vote and sets candidate and voter eligibility, the voting method, and how results are published.

**4.1a** ECF is **independent of the program**; neither ECF nor its members receive funding under this Framework or MSIG #5. ECF must seek funding through **its own MSIG**, decided by block producers, rather than a Committee award.

**4.1b ECF may bid.** ECF is a **connected organization** under 6.2 whenever the Community member is engaged by, receives a stipend from, or holds a position in ECF. The member must declare the connection **in writing before the RFP is published**, recuse from scoping, drafting, evaluation, scoring, discussion, and voting, and must not help set its budget or criteria. The connection and recusal must be minuted and published.

Any ECF stipend or engagement must also be disclosed on-chain under **Part 2 of the questionnaire (6.3a)**.

**4.2** The ECF vote nominates a candidate, who must then be appointed by MSIG like every other Committee member.

**4.3** Block producers should refuse to appoint an ECF winner only for **disqualifying cause**: a proven conflict of interest, a legal bar, a serious failure in the vote, or conduct that would be Cause under the Trust Agreement. Anyone refusing for another reason should publish it; this commitment is not enforceable under this Framework.

**4.4** If MSIG refuses to appoint the winner, ECF nominates the runner-up if its process provides one; otherwise ECF runs the vote again.

**4.5 Initial appointment.** MSIG #5 appoints **no interim Community seat holder**; the seat must be filled by a **future MSIG Resolution at the Threshold using Exhibit E**, following the selection process in this section.

**4.7** If ECF **stops running the process or ceases to exist**, MSIG may name another administrator or **fill the Community seat at the Threshold** like any other seat.

MSIG may continue filling the Community seat under 4.7 indefinitely, or return selection to a community process if one emerges; it is not required to do so.

The seat retains its **Community portfolio, categories under 2.1, vote, signing weight, pay, and status**, however it is filled.

**4.8** Every MSIG appointment to the Community seat must use **Exhibit E** and follow **3.1**, including resolution modes, first execution by block time, eligibility conditions, and row-order priority; its term is **one year from execution** under 3.4.

The **vision statement requirement in 3.1a** applies. A statement produced through ECF’s process satisfies it if it covers those requirements and is filed with the proposal.

## 5. Meetings and voting

**5.1 Meetings.** At least monthly, and whenever the Chair or any two members call one. At least twice monthly while an RFP solicitation is open for submissions or under evaluation.

**5.2 Quorum.** Three filled seats, and at least three members present who are not recused. Quorum allows decisions. It does **not** allow payment, which needs four signers.

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
| Cancel a payment proposal on-chain | **3 signatures.** See sections 7 and 10.7 |
| Refer a member to MSIG for removal | Simple majority, minimum 3 |
| Escalate a matter to MSIG | Simple majority, minimum 3 |
| Reassign an RFP to another Manager | Simple majority, minimum 3 |
| Engage a Manager or Technical Reviewer | Simple majority, minimum 3 |
| Record that no unconflicted external reviewer was available (12.6.1) | Simple majority, minimum 3 |
| Recommend a Framework amendment | Two-thirds, rounded up, minimum 3 |
| **Sign a payment on-chain** | **4 signatures.** See section 7 |

**5.5** The **Manager of record approves milestones**, not the Committee, except for the rate-check referrals below (section 11).

**Rate-check referrals.** If the collar check in 13.4 triggers, or the rate is stale and the fallback is unavailable, the Committee may approve payment at **simple majority, minimum 3**; it does not reopen the Manager’s determination.

**5.6 Recusal.** Where a member has a conflict, recusal is required, not optional. A recused member is excluded from the materials, the quorum, and the count.

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

**6.2 Connected companies.** A company connected to a member — their employer, a company they work for, one under common control, or one they hold a material interest in — may bid only if the member: declares the connection in writing **before the RFP is published**; recuses fully from scoping, drafting, evaluation, scoring, discussion, and voting on that RFP; and the connection and recusal are minuted and published. The member may not help set the budget or the criteria for an RFP their connected company later bids on.

**6.3 Declarations.** Every member, Manager, and Technical Reviewer must declare connections, employment, **Vaulta-ecosystem positions other than A**, and any **Vaulta Treasury connection** within **30 days of appointment**; members’ deadline runs under 6.3c. Declarations must be updated within **10 business days** of a change and refiled annually.

**6.3a The disclosure questionnaire.** All declarations must use the **same standard questionnaire, with the same questions in the same order**; free-form declarations do not qualify.

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

**What is written.** For each filing: the filer's account, role, questionnaire version, filing date, the **coded answers** to Parts 2 to 8, and the **full text of the filing** — the organizations named in Part 5, the nature of each connection, and every reason and explanation given. The filer signs their own submission; **VS LLC writes the record and cannot alter its content.**

**No hash is kept**; the full filing is held on-chain.

Records are **append-only**: updates must reference the previous record; nothing may be edited or removed.

**Filing privacy.** Positions must be stated **by band**, not exact figure. Filings must name organizations but **must not name other individuals**, including family members, colleagues, or counterparties; records cannot be withdrawn.

**Pre-write screening.** VS LLC must return filings that name other individuals or give figures where bands are required. This is a mechanical screen, not a review of substance.

**6.3c Filing gates.** The questionnaire **is the conflict-of-interest declaration** required by appointment and engagement documents, rather than an additional item.

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

**A ban can only be lifted at the same Threshold:** fifteen of twenty-one to confirm it and fifteen of twenty-one to overturn it; no Committee vote, passage of time, or change in membership reduces or expires it.

**Before MSIG votes**, the person must receive the allegation in writing and **10 business days** to respond; their response is published with the referral.

**The ban register.** VS LLC must maintain the ban register in the **`publications` table (7.6a)** and display it on the Portal, recording the person, date, confirming MSIG transaction, and any named entity. A lifting at the Threshold is added alongside the ban, not substituted for it. The register must be checked at proposal submission and before any role is assigned.

**6.7** A Committee member may hold a paid Technical Reviewer engagement **only under section 12.6**, including its preconditions and recusals.

## 7. The Program Account and signing

**7.1** All program funds must be held in the on-chain **Program Account, `rfp.vst`**, and nowhere else.

**Only block producers may name the account holding program funds.**

**The VST has no authority over program funds**; permissions are governed by 7.2, not the account name.

**7.2** The account carries a Committee permission:

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

**7.6** The platform **never holds a key with any authority over the Program Account, and never holds a member's signing key.** Members sign with their own wallets. VS LLC operates a key of its own for writing the disclosure register on `disc.vst` (section 6.3b); that key has no weight on the Program Account and cannot move funds.

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

## 8. The mandate

**8.1** MSIG grants the Committee a **standing mandate to allocate Program Account funds on behalf of the Network**; block producers do not vote on individual RFPs or awards, and a Committee decision within the limits below is the Network's decision.

**8.3 The Committee decides:** which needs become RFPs; their scopes, deliverables, criteria, budgets, and timelines; **awardees and award terms**; Managers of record and Technical Reviewers; and whether to withhold payment or terminate an engagement.

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

## 9. Matters that go to MSIG instead

**9.1** These are outside the mandate:

- a single award above the Per-Award Limit;
- an award that would take total Award Commitments above the Cycle Ceiling;
- an award extending beyond the end of the authorized funding period;
- an award where recusals leave fewer than three non-recused members, or fewer than four able to sign;
- **any payment**, including a Program Cost payment, where recusals or vacancies leave fewer than four able to sign;
- **any administrative action that 10.7 or 11.10a makes mandatory** — a cancellation above all — where recusals, vacancies, or suspensions leave **fewer than three able to sign**. Block producers may cancel through the owner permission in the meantime, and **the removal ground in 10.7 does not run where three signatures were not available**;
- a **termination recommendation on an award reviewed by a Committee member**, where **recusals of any kind** leave fewer than four non-recused members;
- a **milestone on an award whose published statement under 20.2 says a Reviewer is engaged**, where no Reviewer is engaged and no substitute has been engaged;
- a **milestone, evaluation, or post-award review under 25.2 on an RFP where no unconflicted Manager of record is available** (section 12.3). MSIG may direct the engagement of a named Manager or another basis of approval;
- an **award for work on the RFP system** where the Committee records that no other capable provider exists (section 15.2b);
- an award the conflict rules would otherwise forbid;
- an award that fails the coverage test in section 13.4;
- **any Program Cost that would take the cycle above the Program Cost Ceiling, or above either of its internal caps** (section 13.1). The Committee must stop publishing RFPs when the Manager and Reviewer budget is exhausted; it must not use the Committee-pay allocation to continue;
- the creation of any company, foundation, association, trust, or other entity;
- any change to the denomination convention;
- the **designation of a replacement rate source** where the existing one has failed (section 13.4a). The Committee may not make this designation itself;
- any change to the mandate, the Cycle Ceiling, the Per-Award Limit, the cycle length, the permission, or the funding source;
- anything the Committee votes to escalate.

**9.2 Timing.** Submit the record and a draft Resolution to MSIG within **10 business days**. For a replacement rate source under **13.4a**, submit the failure record and a request for designation, **without choosing a source**, within **5 business days** of the Manager or Chair recording and publishing the failure. Unless an exception below applies, MSIG inaction for **30 days** means the matter is **declined**, the reservation returns to the Cycle Ceiling, and the Committee may rework it.

**Existing awardee obligations.** An escalated **payment or milestone under an executed awardee agreement** remains open if MSIG does not act; reservations under 13.2 remain and the Committee must re-submit. This exception does not cover Program Costs escalated for exceeding their ceiling or internal caps.

**Payments the Committee cannot sign.** At the Threshold, MSIG may direct payment through the **block producers’ owner permission** or **temporarily rebuild the Committee permission for named payments**; confirmation alone does not execute a payment.

**Replacement rate source.** A designation request under 13.4a remains open, affected reservations continue, and the Committee must re-submit until MSIG acts.

**Automatic escalation.** A matter falling under 9.1 without a vote to escalate needs no Committee vote for submission; the Chair, or any member if there is no Chair, must submit it.

## 10. How an award gets paid

**10.1 The sequence.** Each step must finish before the next begins.

```
1  Committee votes to award            two-thirds, minimum 3
2  Publish on the Portal               within 2 business days
3  VS LLC signs the agreement          nothing moves before this
4  Committee proposes payment on-chain 4 of 5 signatures
5  Delay window runs                   block producers may object or cancel
6  Payment executes
7  Later milestones repeat steps 4-6, one proposal each
```

**10.3 Publication happens in two stages.** Within 2 business days, publish the awardee, scope, **award shape**, **licence**, amount, milestone schedule, **each member's vote — for, against, or recused — by name and on-chain account**, and any reason for departing from the reviewers' scores; add the **on-chain transaction reference** when payment is proposed.

**10.4 The delay window** starts when publication is complete and **cannot be waived**; incomplete or corrected publication requires cancellation and a new proposal, restarting the delay; the shorter urgent delay requires a Committee urgency vote **at the award threshold — two-thirds of filled non-recused seats, minimum 3** — with the reason recorded and publication complete before proposing payment.

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

Block producers may also cancel through the owner permission.

**10.8** Block producers may cancel **any payment at the Threshold during its delay**, regardless of the objection count.

**10.9** After cancellation in the 4-to-6 band, the Committee must submit the record and a draft confirming Resolution to MSIG within **10 business days**; if MSIG does not confirm within **30 days of submission**, the award ends and its reservation is released.

**MSIG confirmation restores the award decision, not the agreement**; cancellation terminated the agreement, so VS LLC must sign a **fresh agreement on identical terms** before proposing disbursement again, within the 60 days in section 10.10 measured from confirmation.

**10.10 Unused award decisions.** Sign the agreement within **60 days** of the award decision, or MSIG confirmation following a 4-to-6-band cancellation, and **before the cycle closes**. Otherwise the decision expires and the Committee must vote again.

## 11. Milestone approval and payment

**11.1** The **Manager of record approves each milestone for payment**, deciding whether it has been met; awards are paid in milestones under the schedule proposed, settled, and contracted under 11.1a.

**11.1a Milestone schedules.**

Every RFP award must have **at least two milestones**; it cannot be paid as a single completion payment.

**The schedule originates with the proposer.** Four steps:

| Step | Who | What |
|---|---|---|
| **The RFP sets expectations, not the schedule** | The Committee, at scoping | The published RFP states what must be staged, any checkpoint it requires, the budget ceiling, and the **two-milestone minimum** (20.2). It must **not** fix the schedule |
| **The proposal proposes the schedule** | The proposer | Every proposal carries a **milestone schedule of at least two milestones**, each with its deliverable, acceptance criteria, amount, and date. Fewer than two is a **non-compliant submission and is rejected at the compliance screen** (22.2). The schedule is then scored under *timeline and milestone structure* (22.1) |
| **The Committee may modify it** | The Committee, before the award decision | The Committee may change the **number, order, content, dates, or amounts** of milestones so that the schedule **makes sense, fits the budget, and is fair to both sides**. It may not take the count below two. **Material changes must be agreed with the proposer before the award decision**, and the decision record states what changed from the proposal as submitted (23.2) |
| **The agreement enumerates it** | VS LLC, at contracting | The awarded schedule is **enumerated in the agreement**: each milestone **numbered**, with its deliverable, acceptance criteria, amount, and date, matching the published decision record exactly (23.3). **What is in the agreement governs.** Nothing is paid against a milestone that is not enumerated there |

**Schedule review.** When modifying a schedule, look for inspectable deliverables, achievable dates, amounts proportionate to the work rather than front-loaded payments, and no excessive subdivision. Mobilization advances remain subject to their cap.

**After award**, any change to milestone scope or dates runs through **11.8** — Committee approval at majority, minimum 3, a contract amendment, and publication. The two-milestone minimum survives every such change.

**Bounties are excluded from 11.1a** and follow section 26a.

**Determination and payment approval.** “Approval” normally includes both the Manager’s determination and approval for payment. During a suspension under 13.4a, the determination must still be made and published; payment approval follows on resumption.

**11.2 Technical Reviewer.** A Technical Reviewer's **written assessment** — accept, accept with conditions, or reject with stated fixes — is **required at every milestone under an award whose published statement under 20.2 says a Reviewer is engaged**, and the Manager's determination must record it. Where the approval for payment is completed later under 13.4a, it records the assessment as it stood at the determination; a Reviewer whose engagement has since ended does not re-file. Where the statement says one is not engaged, none is required and its absence is not a defect in the approval record; the Manager approves on their own assessment.

**11.3 The approval record** must state the milestone, criteria applied, the **Manager of record's name and on-chain account**, decision and reasons, the **Technical Reviewer's name, account, and assessment where required**, amount payable, and the awardee’s verified receiving account; the approval and amount must be **published**.

Where the determination is made while payments are suspended under 13.4a, **the determination, its date, and everything in this section except the amount payable are published when the determination is made**. The record is completed with the rate data and the amount on resumption, and republished. A suspension does not make a milestone determination private.

**11.3a Named decision-makers.** Publish each person’s **name and on-chain account** in the following records and write both to the register under 7.6a:

| Record | Who is named |
|---|---|
| Milestone approval | The **Manager of record**, and the **Technical Reviewer** where one gave an assessment — **by name and on-chain account** |
| Payment signature | **Each Committee member who signed**, by **name and on-chain account** — both, not the account alone |
| Award decision | Every member voting for, against, and recused, **by name and account** (sections 10.3, 13.5, 23.2) |

**Name and account** must match Part 1 of the disclosure questionnaire (6.3a). The name is a **single stable public identity — a legal name or registered handle — that does not change during the term**; the seat register must carry the same pair. Neither may be redacted under 5.9.

**11.4 Administrative signatures.** Four members must sign after checking only that:

1. a complete approval record exists;
2. the amount matches the published milestone schedule;
3. a Technical Reviewer assessment is present **where the RFP's published statement under 20.2 says one is engaged** — and is not required where it says one is not;
4. the payment is within the award;
5. **no termination recommendation under 11.10a is open on the award.**

**The Committee does not judge the work again.**

**11.4a Initial disbursement.** After the award vote and signed agreement, signers check only that the decision record is complete, the agreement matches it, the amount is within the limits, the delay has run, and no termination recommendation under 11.10a is open.

A member who voted against the award **must still sign**, unless a required check fails or there is credible evidence of misrepresentation or a conflict-rule breach.

**11.5 Refusing to sign.** A member may refuse only for a failed check under 11.4 or credible evidence that approval was obtained by misrepresentation or a conflict-rule breach; they must give written reasons for the minutes. **Disagreement with the Manager’s judgment is not a valid reason.**

A member must not refuse because they disagree with the RFP’s published **Reviewer setting**; that setting cannot be reopened for the award.

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

**11.10a Recommending termination.**

**The Manager of record may recommend termination** of an award. **A Technical Reviewer may recommend termination** of an award they are engaged on. Either may do so where the work product delivered, **or the service performed**, against a milestone is **materially below the standard the RFP required**, and in particular where:

1. the deliverable fails acceptance criteria in ways that go to the substance rather than to detail;
2. remediation specified in an earlier determination has not been carried out, or has been carried out inadequately;
3. the quality of what has been delivered gives no reasonable prospect that the remaining milestones will be met;
4. the work is not what the awardee represented it to be;
5. on a **Service** award, the published service levels are **persistently not met**.

A recommendation must be **written**, identify the grounds, attach the milestone determination, and be **published in the `decisions` register (7.6a)**. Retain it for every outcome, including decline, deemed decline, or strike; add a strike alongside it. A Reviewer files **directly with the Committee** and the Manager must not withhold it. If the Manager and Reviewer disagree, publish both positions.

**Who may not file.** A Manager or Reviewer who is **conflicted on that award** (section 6.4) may not file a recommendation, and shall notify the Committee instead. A person who is no longer Manager of record, or whose Reviewer engagement on that RFP has ended, may not file on it.

**Effect of filing:**

1. **the Committee shall cancel any payment proposal pending on that award within 2 business days of filing.** Cancellation is a 3-of-5 administrative action (section 7.2); the filer cannot cancel it. Failure to cancel within 2 business days is an express ground for referral to MSIG for removal, as under 10.7. The fifth ministerial check in 11.4 means a member may lawfully withhold signature on that proposal while the recommendation is open;
2. **no further milestone under that award is approved for payment** until the Committee has decided;
3. the awardee is given the recommendation and **10 business days** to respond in writing, and the response is published with it;
4. the Committee **must decide within 15 business days** of the close of that window and **publish its decision with reasons — including where it declines to terminate.**

**The three outcomes and their thresholds:**

| Outcome | Threshold |
|---|---|
| **Terminate**, under 11.10 | Two-thirds, rounded up, minimum 3 |
| **Direct a recovery plan** under 11.9, setting the date it is reassessed | Simple majority, minimum 3 |
| **Decline** | Simple majority, minimum 3 |

**Escalation.** On escalation under 12.6.1(3) or 9.1, suspend the **15-business-day decision clock and deemed decline** from the escalation date; the payment freeze continues. If MSIG does not act within **30 days** under 9.2, the recommendation is deemed declined and the freeze lifts.

**If nothing carries.** If no outcome reaches its threshold within the 15 business days, the recommendation is **deemed declined**, the freeze in points 1 and 2 lifts, and the Committee publishes the vote counts and any reasons given. The awardee remains contractually obliged to deliver and the reservation stands.

**Member-Reviewer recusal.** A member must recuse from every termination, recovery-plan, or strike vote concerning an award they **are or were engaged to review**, whoever filed the recommendation and whether their engagement has ended or been suspended.

Where any recusals leave **fewer than four non-recused seats**, the recommendation goes to **MSIG** under 12.6.1(3) and 9.1.

**Striking an improper filing.** The Committee may, at simple majority with a minimum of 3, **strike a recommendation** filed by someone who was conflicted or who was not the Manager of record or an engaged Reviewer when they filed. Striking lifts the freeze immediately and is published with reasons. Nothing in this section limits the Committee's power to reassign an RFP under 12.3, and reassignment does not by itself withdraw a filed recommendation.

**Getting back to payment where the Committee declines.** A proposal cancelled under this section may be **re-proposed without a further award vote** once the freeze lifts. It carries a fresh delay window and, being a milestone or a previously decided disbursement, no new objection banding. Any 60-day clock under 10.10 is **extended by the length of the freeze**.

**A recommendation is not a termination.** Only the Committee terminates. Neither the Manager nor the Reviewer may stop work, withhold delivered work product, **suspend the service, refuse a data export,** or tell the awardee the engagement is over.

**Good-faith protection.** A recommendation is not grounds to end or decline to renew a Manager’s or Reviewer’s engagement; a declined recommendation must not count against them. Their fixed fee is unaffected by the outcome.

## 12. Program Managers and Technical Reviewers

**12.1** Managers and Technical Reviewers are outside contractors, **except Committee members engaged as Reviewers under 12.6**; the Committee selects them, and VS LLC contracts them under the standard Independent Contractor Agreement using the **Schedule A at Exhibit F to MSIG #5**, with a published rate card.

**12.2** Managers are engaged as a pool, with **exactly one Manager of record named and published for each RFP**; a Manager may run several RFPs at once.

**12.2a No Committee member may serve as Manager of record.** There is **no MSIG waiver**; changing this rule requires an amendment to **Part 1 under 16.2**.

A Manager appointed to a Committee seat **ceases to be Manager of record on appointment execution**; the appointment remains valid. Within **5 business days**, the Committee must reassign their RFPs under 12.3 and terminate their Manager engagement for those RFPs.

**12.3 Reassignment.** The Committee assigns a Manager when approving an RFP for publication and may reassign it by majority at any time; the change must be published, the outgoing Manager must hand over the approval history, correspondence, and open items in writing, and the incoming Manager must have no conflict on that RFP.

**No unconflicted Manager.** Record and publish the shortage and **escalate under 9.1**. MSIG may direct engagement of a named Manager or another basis of approval; **the bar in 12.2a still applies**.

**12.4 Workload.** The Committee must track and report each Manager’s RFP workload.

**12.5** Manager and Reviewer pay must not depend on milestone approval or the size, number, or outcome of an award.

**12.6 Committee members as Technical Reviewers.** Members may serve as paid Technical Reviewers only on the following terms.

**12.6.1 Preconditions.** A member may serve as Technical Reviewer only if:

1. **MSIG has set a concurrent-engagement cap** (**MSIG #5 Part H: 3**); no engagement may begin before it is set. There is **no per-member fee cap**; all fees share the **Program Cost Ceiling and internal cap in 13.1**, and exceeding either is reserved to MSIG under **9.1**. Fees use the **MSIG-set Exhibit B rate card** and must be reported under **13.5**; block producers may change the cap or rate card or remove the member.
2. The Committee has recorded that **no suitable unconflicted external Reviewer was available**, and minuted and published that finding with the engagement.
3. **All five seats are filled.** Suspend the engagement during **any vacancy or suspension of the member’s role or signing weight**, including under **6.6 or 2.4a**. A suspended member does not count as an engaged Reviewer under **9.1, 11.2, or 11.4**.
4. **No other Committee member reviews that RFP**, and the member is **within the concurrent-engagement cap**.

**Substitution.** If the suspended member is the only Reviewer on a published RFP or live award, the Committee must engage a substitute at the threshold in **5.3**; a substitute satisfies the Reviewer setting in **20.2**. If none is engaged, the **Manager writes the scored assessment for an unawarded RFP under 22.3**, and an affected **milestone under a live award goes to MSIG under 9.1**.

**Resumption.** When the seat is refilled, the engagement resumes unless a substitute was engaged. If so, resumption requires a Committee decision at the threshold in **5.3**; otherwise the substitute remains and the member’s fee is prorated to work performed.

**Recusals.** These rules assume **five filled seats**. The recusal in **11.10a** continues after suspension or the end of the engagement; if fewer than four non-recused seats remain, the termination recommendation goes to **MSIG under 9.1**.

**12.6.2 The member recuses from both the availability finding and the vote engaging them**, since they benefit from the decision; both require a simple majority of non-recused seats, minimum 3, under section 5.3.

**12.6.3 Member-Reviewer restrictions on that RFP.**

| Restriction | Required process |
|---|---|
| **Must not draft acceptance criteria or the milestone schedule** | The Manager of record or At-Large member drafts them; the member may advise on the record |
| **Must not score proposals or reconcile divergent scores** | Give a written note, not a score. If the member is the only engaged Reviewer, the Manager writes the scored assessment under 22.3 |
| **Must not vote on termination recommendations, recovery plans, or strike decisions** | Applies to that award whether the member or Manager filed the recommendation (11.10a) |
| **Must not vote on or sign payment of their own Reviewer fee** | Follow 13.3a |

**12.6.4** A member-Reviewer **keeps their award vote** and **may sign milestone payments** on the award, subject to the checks in 11.4.

**12.6.5 Pay and disclosure.** Member-Reviewer fees must use the **MSIG-set Exhibit B rate card**; the Committee cannot negotiate or vary them. Report every engagement and fee **by member and RFP** under 13.5. The member must **update their questionnaire before the engagement begins** under 6.3c; the usual 10-business-day window does not apply.

**12.6.6 Reviewer pay.** Reviewer fees are **additional to the Committee retainer**, subject to **12.6.1 and 12.6.5**.

## 13. Money: ceiling, reservation, reporting

**13.1 Limits and funding periods.** MSIG sets the **Cycle Ceiling**, **Per-Award Limit**, **Program Cost Ceiling**, **cycle length**, and **program scope**; ceilings are maxima rather than targets, and unspent allocations do not carry over.

**Award and operating caps.** The **Cycle Ceiling** caps commitments to awardees. The **Program Cost Ceiling** caps program operations, with separate internal caps for **Committee pay** and **Manager and Reviewer fees, Portal, and administration**. Underspend in one must not raise the other; exceeding either is reserved to MSIG under **9.1**. Amounts are set in **MSIG #5 Part D** (Appendix B).

**Funding is authorized four cycles at a time**, covering one year — the **authorized funding period**. Funds are transferred quarterly under that single authorization, each instalment topping the Program Account up to **125% of the coming cycle's Total Program Spend**. Forward commitments are included within that cycle’s Cycle Ceiling, not added to the top-up.

**Block producers may change any amount, cycle length, or limit at any time by MSIG Resolution**, and may stop, reduce, or re-time an instalment; authorizing a year does not bind them to fund the whole year.

**The first cycle starts when the Program Account receives funds**, rather than when MSIG #5 passes; Committee pay accrues from contract signature or that funding date, whichever is later; the Committee must publish the funding date on the Portal. It also starts the **four staggered seats’ initial terms** under 3.4.

**13.2 Reservation.** Reserve an award’s full **USD** value against the Cycle Ceiling from the decision through publication, contracting, the delay, and any MSIG confirmation; that amount is unavailable for other awards. **No payment may move before an agreement exists and the delay ends.** Multi-cycle awards follow the allocation below.

**Multi-cycle awards.** The **Per-Award Limit applies to total contract value over the full term**, not each cycle’s payments.

For such an award, only the amount **payable in the current cycle** is reserved against the current Cycle Ceiling. The rest becomes a **forward commitment**, which:

- automatically reduces the available ceiling in each future cycle it falls into;
- is listed in every cycle report, by award, showing the amount landing in each future cycle;
- counts towards the coverage test in section 13.4 for amounts falling due before the next expected transfer.

**An award extending beyond the end of the authorized funding period is a reserved matter** (section 9) and needs an MSIG Resolution. An award may span cycles inside that period under the mandate, with its value recorded as a forward commitment against the cycles it falls into.

Recurring infrastructure services must use **Service awards under 20.2a**, with a **fixed term followed by re-competition** and a contracted operational handover set.

A service renewal is a **new award**, requiring a fresh RFP, award-threshold decision, and reservation; it is not an extension of the old agreement. The incumbent may bid. The bar on increases under **11.8** still applies to the old award.

**13.3 Release.** A reservation is released when the award ends, expires, is cancelled by block producers, is terminated as to unearned amounts — **including on an awardee's termination under the suspension long-stop in Exhibit F clause 6** — is contracted for less than reserved, or, for a bounty, **lapses unclaimed under 26a rule 5**. It is also released where the **Committee records that an award has been abandoned** — a second consecutive missed milestone with no recovery plan filed, or no response from the awardee for 30 days — which the Committee must record. It is **not** released while MSIG confirmation is still pending, and it is **not** released by a termination recommendation under 11.10a — only by the termination itself.

A released amount returns to the ceiling of the **cycle in which the release occurs**, not the cycle the reservation was made in.

**13.3a Paying Program Costs.** Committee pay, Manager and Reviewer fees, Portal and administration costs are paid from the Program Account like this:

1. the Committee approves a **published payment schedule** once per cycle — simple majority, minimum 3 — listing each recipient, amount, and cadence;
2. individual payments under it are signed **4 of 5** and carry the **same delay** as any other disbursement;
3. **no objection banding applies**;
4. every payment appears in the cycle report, with cumulative Program Costs against the **Program Cost Ceiling** and against **each of its two internal caps**.

A payment outside an approved schedule requires fresh Committee approval at the same threshold and its own published record.

**Reviewer fees payable to a Committee member** under section 12.6 are approved as a separate line and **paid on a separate payment** from the rest of the schedule — **one payment per member-Reviewer**, never a combined one. Each is signed by the other four. The member recuses from their own schedule line and from signing their own payment only.

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

**Oracle evidence.** Every approval record must capture the **oracle value, block number, and transaction ID** of the read.

**Two checks on the rate.** Neither blocks a payment outright. A stale rate is replaced by the **fallback rate** below. A rate outside the collar, or a stale rate when the fallback is unavailable too, moves the decision from the Manager of record to the Committee, which may approve at the ordinary milestone threshold with the fact recorded, or defer.

| Check | Trigger |
|---|---|
| **Staleness** | Newest datapoint older than **24 hours** |
| **Collar** | Approval rate differs by more than **15%** from the previous payment’s rate under that award, or from the award-decision rate for the first payment |

Record and publish the **newest-datapoint timestamp with every approval**, whether or not it triggers a check.

**The fallback rate.** If the newest `eosusd` datapoint is more than **24 hours** old at a read, or the pair or `delphioracle` contract is unavailable, renamed, or deprecated, use the **midpoint of CoinMarketCap's published daily high and low USD prices for Vaulta (A), ID 36462**, for the **UTC calendar day before the read**; add the high and low and divide by two.

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

Suspended payments resume only when the fallback returns or MSIG designates a source, for **payment approvals made after resumption**; completed payments are not reopened. The designation amends the **Reference Rate definition under 16.2** and is not subject to deemed decline under 9.2.

**During suspension, payments and new awards stop**, subject to the exceptions below; work, review, scoping, and evaluation may continue.

| | |
|---|---|
| **Work continues; approval for payment waits** | Milestone submission and the Manager's **written determination** — that the work meets the milestone, or does not — continue as normal, and the 11.9 and 11.10a clocks run from the determination. The **approval for payment** is made when payments resume, using the rate read at that time. The determination and its date are **recorded and published when made** — everything in 11.3 except the amount payable — and the record is completed and republished on resumption |
| **No new awards** | No new awards. Scoping, publication, questions, evaluation, and scoring may continue. Already-published bounties follow the exception below; the coverage test cannot be performed without a rate |
| **Reservations hold, and clocks are extended** | A suspension does not **by itself** release a reservation against the Cycle Ceiling; the release triggers in 13.3 continue to operate, including on a termination or downward variation under the suspension row in 11.8 and on an awardee termination under the Exhibit F long-stop. The **60-day clock in 10.10**, any **bounty closing date under 26a rule 5**, and any cycle-close cut-off applying to an award not yet contracted are **extended by the length of the suspension**, on the same basis as a freeze under 11.10a. A reservation carried past the end of a cycle is carried as a **forward commitment against the cycle in which payments resume**, and counts against that cycle's Ceiling; where the carried commitments plus that cycle's own awards would exceed it, or where an extension would carry an award **beyond the end of the authorized funding period**, the matter is escalated under 9.1 |
| **The awardee is not in default** | No deadline the awardee must meet is shortened, and time spent suspended does not count against them. |
| **Program Costs are suspended too — except the lights** | The suspension reaches **every** payment from the Program Account, including Committee pay and Manager and Reviewer fees (13.3a). Those entitlements **continue to accrue** and are paid on resumption at the rate then current, **charged to the cycle in which they accrued, not the cycle in which they are paid**; that cycle’s Program Cost allocation **survives for that purpose despite 13.1**. Where the accrued amount exceeds what the accruing cycle's allocation can bear, the shortfall is escalated under 9.1. The suspension does **not** reach **Portal hosting and essential administration**: those payments convert at the **last rate read before the failure**, recorded and published with each one; no other payment may use that exception |
| **It goes in every cycle report** | The date the suspension began, the amounts affected, the date MSIG designated a replacement source, and the date payments resumed — in **every** cycle report until it is resolved (13.5) |

**Additional suspension rules:**

- A quarterly instalment into the Program Account due during suspension must be **sized at the Reference Rate and transferred on resumption**, not skipped (MSIG #5 Part I).
- Overlapping freezes under **11.10a** and suspensions under this section extend a clock **once, not twice**.
- An already-published bounty may be delivered, determined, and contracted, but **not paid until resumption**; its award decision was the publication vote.
- A replacement source designated by MSIG must support the **staleness and collar checks**; the designation must state the field, precision, equivalent newest-datapoint timestamp, and how the checks apply.

If an awardee cannot reasonably continue unpaid, use **variation or termination by agreement under 11.8**; do not substitute a rate or increase the award during suspension.

**13.5 Cycle report.** **Written to the `publications` register** (7.6a), rendered on the Portal, and sent to MSIG each cycle:

- RFPs published and proposals received;
- every award, with amount, **each member's vote — for, against, or recused — by name and on-chain account**, and transaction reference;
- **awards for work on the RFP system itself**, flagged as self-referential, with the cycle total (section 15.2b);
- **Program Account opening and closing balances**, reconciled to the chain;
- total reserved and committed against the Cycle Ceiling, and what remains;
- **Program Costs against the Program Cost Ceiling**, broken out against **each internal cap** — Committee pay, and Manager and Reviewer fees with Portal and administration — and what remains of each;
- objections by block producer, and outcomes;
- payments cancelled, and awards ended or expired, and why;
- milestones approved and rejected, **each with the approving Manager and any Reviewer by name and account**, and the signing members by name and account; terminations;
- **post-award reviews published under 25.2**, with the awards they cover and a link to each;
- committed against actually paid;
- spending by category against the planned shares;
- **bounties recorded as sole-source under 26a rule 14**, listed separately with their reasons;
- **spending by channel — directed RFPs, open call, bounties — as amounts and as shares of the Cycle Ceiling.** Where bounties exceed **25%** of cycle Award Commitments, state why; this is a reporting trigger, not a cap;
- **any use of the fallback rate under 13.4**, with the day it began, the day the oracle resumed, and the payments it priced;
- **any suspension of payments under 13.4a**, in every cycle report until it is resolved, with the date it began, the amounts affected, the date MSIG designated a replacement rate source, and the date payments resumed;
- matters escalated to MSIG and their outcomes;
- RFP load per Manager, and any reassignments;
- **every Technical Reviewer engagement held by a Committee member and every fee paid**, by member and by RFP, with each member's **cumulative total for the cycle** and the number of engagements held against the concurrent cap (section 12.6);
- disclosure questionnaires filed, updated, or overdue, with the on-chain transaction for each.

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

**14.6** Unspent funds must not carry into the next funding period; at the end of the funding period, after all contracted obligations are met, the remaining balance is returned or swept through the owner permission as MSIG directs; there is no sweep at individual cycle ends because carried balances reduce the next quarterly top-up.

## 15. Relationship with the Trustee and VS LLC

**15.1** The Trustee acts only as executor and **has no role in the RFP program**; no program funds pass through the Trust.

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

## 16. Reviews and amendment

**16.1** The Committee publishes a written self-review **9 months after the funding date**, covering RFP throughput, results, conflict incidents, and whether five seats is working.

**16.2** The Framework may be amended by MSIG; the Committee may propose amendments by two-thirds, minimum 3; and **Part 2 may be amended without reopening Part 1**.

---

# PART 2 — RUNNING AN RFP

## 17. What the program does

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

**20.1** The portfolio holder sponsors the draft — except where they are engaged as Technical Reviewer on that RFP, when 12.6.3 applies and someone else drafts the acceptance criteria and milestone schedule. A Manager of record is assigned when the RFP is approved for publication, and may be assigned earlier to draft it. On technical RFPs, Technical Reviewers may advise on feasibility and realistic budgets.

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
- IP and delivery terms (section 20.2a): what vests in the VST, and — on any shape — what is expected to be **carved out as pre-existing IP**; **for Deliverable and Embedded awards**, the **licence mode** — Required (with the licence named), Proposer's choice (with the permitted set), or Default — under 20.2a; **for Service awards**, the **service levels**, the **term**, and the contents of the **operational handover set**;
- decision timeline: award date, contracting step, delay window, expected first payment;
- submission format and channel;
- named **Manager of record** and contact, and **whether a Technical Reviewer is engaged**.

**The RFP is written to the `publications` register as published** (7.6a), and each numbered amendment under 21.3 is written alongside it rather than replacing it.

**20.2a Award shape, work product, and licence.** Every RFP must declare its **award shape at publication**; unsolicited proposals do so at **categorization under 26.1**. The declaration is fixed and governs the agreement (23.3a) and closing (25.1).

| Shape | What it is | What the work product is |
|---|---|---|
| **Deliverable** | New code, designs, research, or content built for the Network | **What was built**, released under the licence recorded in the award decision under 23.2 — the one the RFP required, the one the awardee offered from the permitted set, or the applicable default under 20.2a |
| **Service** | A hosted or operated service — history APIs, snapshots, indexers, monitoring | **The operational handover set, and nothing else**: configuration, deployment tooling, runbooks and operating documentation, and an export of any Network data the service holds, in a documented format. The running service itself is performed, not delivered |
| **Embedded** | New work built inside software the awardee already owns | **The named deliverable, excluding identified pre-existing IP** — with an **irrevocable licence back, surviving termination**, over any pre-existing IP embedded in it, wide enough for the Network to use, modify, and have others operate the deliverable |

**Every agreement must vest the work product defined for its shape in the VST under section 9**; Schedule A cannot disapply that clause.

**Default licences.** Release code under **Apache-2.0** and other deliverables under **CC-BY-4.0**.

**Licence mode.** Every **Deliverable and Embedded** RFP declares one of three, **at publication**:

| Mode | Effect |
|---|---|
| **Required** | The RFP names the licence and it is binding. A proposal offering anything else is **non-compliant at the screen** (22.2) |
| **Proposer's choice** | The RFP names a **permitted set** and the proposer picks from it in their proposal. The licence they name becomes a term of the award. A proposal naming a licence **outside the set, or naming none, is non-compliant at the screen** (22.2) |
| **Default** | Silence. The defaults above apply |

**Service awards have no licence mode**: the handover set vests outright, and the Network may modify it and give it to a successor. Default licences do not apply.

**Who decides what.** The **Committee sets the licence mode and, in Required mode, the licence at the publication threshold, in the RFP**; in Proposer's choice mode it sets the **permitted set**, so the awardee chooses only from that set.

The **permitted set is set per RFP**, at scoping; there is no standing list.

**Proposer’s choice must name a permitted set.** If omitted, only the applicable fallback set is permitted: **Apache-2.0, MIT, or BSD-3-Clause for code; CC-BY-4.0 or CC0-1.0 for non-code**.

The **mode, permitted set, and Required licence lock at publication**; in Proposer’s choice mode, the **chosen licence locks at award and must be recorded in the agreement**.

**Licence scoring.** In Proposer’s choice mode, score the licence **only as a separately published criterion with its own weight before submissions open** (22.1); otherwise it must not affect scoring. The standing “ecosystem fit, openness, maintainability” criterion alone does not permit it.

**Departures from the default** in Required mode are stated in the RFP with the reason.

**The shape cannot change after publication.** Like the Reviewer statement, it is fixed at publication and not reopened at contracting, at signing, or by a change under 11.8. If it was wrong, the remedy is the next RFP.

**Closed-source deliverables.** If usable open-source release is impossible, the RFP must state this **at publication** and specify what the Network receives instead: a licence, service commitment, source escrow, or combination. Silence means open-source release.

Such an RFP must use **Required mode**, naming the licence to the Network in the alternative; **Default and Proposer’s choice are unavailable**.

**The Reviewer setting locks at publication**, before submissions open, and governs assessments for the life of the award under **11.2 and 11.4**; it cannot be changed for that award.

**20.3** Publish the **budget ceiling in USD**.

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

**22.2 Compliance check.** The Manager first checks completeness, eligibility, conflicts, **licence compliance with the RFP's licence mode** (20.2a), and that the proposal carries a **milestone schedule of at least two milestones**, each with a deliverable, acceptance criteria, an amount, and a date (11.1a). Non-compliant submissions are rejected with a written reason. Assess schedule quality under **22.1**, not at the compliance screen.

**22.3 Scoring.** *On an unsolicited proposal, "the published statement" and "the published criteria" mean those fixed at categorization under 26.1.*

- **RFPs whose published statement says a Reviewer is engaged:** Technical Reviewers score independently and in writing. They do not see each other's scores before submitting. They may discuss afterwards to resolve large differences, and the discussion is recorded.
- **RFPs whose published statement says one is not:** the Manager of record writes the assessment, in the same format, against the same published criteria.
- **Where the only engaged Reviewer is a Committee member** (section 12.6): the **Manager of record writes the scored assessment** against the published criteria, informed by but not bound by the member's written note. The note is published alongside it.

In every case a written assessment against published criteria must exist before any award.

**22.4 Committee discussion.** The Committee receives the scores and reasoning, discusses, records recusals, and may interview shortlisted proposers — provided every shortlisted proposer gets the same opportunity and the same questions.

**22.5 Departing from the scores.** The Committee may award to a proposal that did not score highest, but must publish a written reason.

**22.6 Too many recusals.** If fewer than three non-recused members remain, or fewer than four can sign, the award goes to MSIG with the written scores and a statement of the recusals.

**22.7 No good proposals.** The Committee may decline to award, change the scope, and republish.

**22.8 Negotiation.** Limited clarification with the preferred proposer is allowed **before** the award decision, and what is agreed goes into the decision record. **Clarification may not change the licence offered** under a Proposer's choice RFP — the licence named in the proposal is the one that becomes a term of the award. Changes after the decision follow section 11.8.

## 23. Stage 6 — Award and contracting

**23.1** The award decision, publication, contracting, on-chain proposal, delay window, and payment follow **Part 1, sections 10 and 11**. That sequence is not repeated here.

**23.2 The decision record must include:**

- Awardee, scope, **award shape (20.2a)**, and total amount.
- The **licence named by the RFP in Required mode**, the proposer’s offered licence in Proposer’s choice mode, or the applicable Default licence stated expressly.
- The awarded **schedule of at least two milestones and their amounts**, any changes from the submitted schedule, and the proposer’s agreement under **11.1a**.
- Every member’s **vote — for, against, or recused — by name and on-chain account**.
- Reasons for departing from the scores.
- The **oracle median, block number, transaction ID, and newest-datapoint timestamp** read at the decision.

**An incomplete record cannot go to contracting.**

**23.3 Every awardee agreement must:**

- be the standard **VS LLC Independent Contractor Agreement** with an award-specific Schedule A, under which **work product — as defined for the award's shape under 20.2a — vests in the VST** (section 9);
- **enumerate the milestone schedule** — each milestone numbered, with its deliverable, acceptance criteria, amount, and date, **at least two of them** (11.1a) — **matching the published decision exactly**. Nothing is paid against a milestone the agreement does not enumerate;
- **depend on the on-chain payment clearing its delay**, with no liability on either side if it is cancelled;
- allow termination for non-delivery and for cause, with a period to fix problems;
- include a **recovery clause** for money paid against milestones later found undelivered or misrepresented, enforced by VS LLC;
- require disclosure of any other Network funding for the same work;
- state the award value in **USD**, the **verified receiving account** for payment in A, and that each milestone is paid in A calculated at the reference rate on the date of **approval for payment**, which is the date of the Manager's determination except where payments are suspended under 13.4a or the approval is referred to the Committee under 13.4;
- confirm the awardee is an independent contractor, not an agent of the Network, the Trust, or VS LLC.

**23.3a What the agreement must contain, by shape** (section 20.2a):

| Shape | Additional required terms |
|---|---|
| **Deliverable** | Work product vests in the VST; released under the **licence recorded under 23.2**. **Where it is code**, source delivered to a **Network-controlled repository**; **otherwise**, final files and any working materials delivered into a Network-controlled store |
| **Service** | **Service levels and the term**; the **operational handover set vests in the VST** and is deliverable at the end of the term or on termination, whichever comes first; the Network may modify it and give it to a successor provider; the awardee's **retained service software is identified as pre-existing IP** and carries the licence back above; a warranty that the handover set is **independently usable** — deployable by a successor using only the vested materials plus commodity or open-source components; no exclusivity, and nothing preventing the Network re-competing the service; Network data exportable **on request at any time** |
| **Embedded** | The **named deliverable** vests in the VST; **pre-existing IP is carved out and identified**; a **licence back** over pre-existing IP embedded in the deliverable, sufficient for the Network to use, modify, and have others operate it, **irrevocable and surviving termination**; where the deliverable is open source, source delivered to a **Network-controlled repository** under the **licence recorded under 23.2**; where it is closed-source, the alternative stated in the RFP |

**Pre-existing-IP rules apply to every award shape.**

**Pre-existing IP** is material the awardee owned or was licensed to use before the award, or developed independently of the award; it must be identified **in Schedule A at contracting**, and unlisted items do not qualify.

**Where pre-existing IP is embedded in the work product, the awardee grants the VST an irrevocable licence back**, surviving termination, sufficient for the Network to use, modify, and have third parties operate the work product.

***Blocking. Counsel must confirm that section 9 of the standard Independent Contractor Agreement permits the pre-existing-IP carve-out and the licence back by Schedule A.*** *Until that confirmation is recorded: no **Service** or **Embedded** RFP may be published, since both rely on the carve-out by their nature; and no award of any shape may be contracted with a populated pre-existing-IP schedule. A **Deliverable** award whose schedule is empty carves nothing out and may proceed.*

*If counsel finds section 9 does not permit the carve-out, amend the agreement itself before using it; Schedule A cannot narrow its vesting clause. Defining work product by shape does not itself narrow section 9.*

**23.4 Publication of award.** Published within **2 business days** of the decision, per section 10.3. Unsuccessful proposers may request their own scores and a short written explanation.

## 24. Stage 7 — Delivery

**24.1** The Manager of record is the awardee's contact: check-ins at least every two weeks on active work, status reports to the Committee, early warning of delays, and handling change requests.

**24.2** Milestone approval and payment follow **Part 1, section 11**.

## 25. Stage 8 — Closing and reporting

**25.1 Closing an award.** Require **final acceptance, final payment, a short public completion note**, the shape-specific handover below, and the **published review under 25.2**, where required. Confirm actual completion.

| Shape | Closes on |
|---|---|
| **Deliverable** | **Code:** a tagged source copy in a **Network-controlled repository**. **Other deliverables:** final files and working materials in a **Network-controlled store**. Both require the **23.2 licence**, credentials, domains, and documentation; a link to the awardee’s repository is insufficient |
| **Service** | Delivery of the **operational handover set** and confirmation that any **Network data has been exported**. The checklist must not ask for a deliverable handover; there is none |
| **Embedded** | A **tagged source copy of the deliverable** in a Network-controlled repository where it is open source; where it is not, written confirmation that the licence or other alternative named in the RFP is in force, plus any escrow deposit made |

**A terminated award closes on its shape's handover items, and, where 25.2 applies, that review.** Final acceptance and final payment are not required where the award ended under 11.10. On a terminated **Deliverable** or **Embedded** award the handover items are those covering **work accepted before termination**; where nothing was accepted, the award closes on the published termination record alone.

**25.2 Review after large awards.** At or above the size set by MSIG at **Part D** (Appendix B), **measured on total contract value as under 13.2**, the **Manager of record** writes a short review: did it meet the need, was the budget right, would the Network do it again.

| | |
|---|---|
| **When** | Within **20 business days** of **final acceptance** — or, on an award that ends any other way, of the **publication of the record that ended it**: a termination under 11.10, a termination or variation by agreement under 11.8, an awardee termination on the suspension long-stop, or an expiry under 10.10. On a **bounty**, of the Manager's written acceptance determination under 26a rule 2. An award at or above the threshold **does not close until the review is published**, where one is due |
| **Scope** | The review sits **within the Manager's scope under the Exhibit B rate card**, which prices it separately, so it is paid work |
| **Who writes it** | The Manager of record. Where there is none — the engagement ended, or the Manager is the person who recommended the termination — the **Committee appoints another Manager from the pool** to write it, at majority, minimum 3, and records why |
| **Terminated awards** | A **terminated** award at or above the threshold is reviewed too, and the review says why it was terminated and what the program would do differently |
| **Bounties** | 26a does not disapply this section. A bounty at or above the threshold is reviewed on the same basis, by the Manager of record for that bounty |
| **Before publication** | The awardee is given the review **5 business days** before it is published and **may file a short response within those 5 business days**, published with it. Publish whether or not a response is filed |
| **Redaction** | Three grounds, and only three: the **awardee's confidential commercial information**, **legal advice**, and **personal data**. The 5.9 carve-out applies — the name, role, seat, and on-chain account of anyone exercising a decision right in the program are **never** removed. Redaction is decided at **majority, minimum 3**, is recorded, and **may not be used to alter the review's conclusions**. Disagreeing with the Manager's judgment is not a ground (11.5). **Redaction is settled before the review is written to the register** (7.6a) — once written it cannot be undone |
| **Publication** | Published on the Portal, and **listed with a link in the next cycle report** (13.5) |

**25.3 Cycle report and annual review** follow **Part 1, sections 13.5, 14.3 and 16.1**.

## 26. Optional — open call for unsolicited proposals

Unsolicited awards follow the **same mandate, thresholds, limits, contract-first rule, publication, delay, and objection bands** as directed RFPs. There is **no open-call sub-limit**; awards share the Cycle Ceiling.

Categorize each proposal on arrival under **2.1** and assign its portfolio holder to lead assessment; cross-category proposals and those fitting no category go to the **At-Large seat**. Assign a **Manager of record** in the same way as directed RFPs. Include proposals in the **public backlog (18.3)** and the **cycle report’s category breakdown**; indicative category shares under **19.2** cover both channels.

**26.1 Terms fixed at categorization.** Before assessment starts, the portfolio holder must settle and publish:

| What is fixed | On the same footing as |
|---|---|
| The **award shape** — Deliverable, Service, or Embedded | 20.2a, and fixed from that moment exactly as a published declaration is |
| The **licence mode** and, in Proposer's-choice mode, the **permitted set** | 20.2a |
| **Whether a Technical Reviewer is engaged** | 20.2; governs for the award’s life under 11.2, 11.4, and 22.3 |
| The **evaluation criteria and weights** | 22.1, which 22.3 requires an assessment to be written against |
| The **scope as accepted**, and any **budget ceiling** the Committee applies to it | 20.2 |

Publish these terms on the **Portal and in the `publications` register (7.6a) before assessment begins**; they lock at publication on the same basis as directed-RFP terms.

**Material changes from the proposal.** Notify the proposer and give them **10 business days to accept or withdraw** if the settled terms materially differ from their proposal.

The Committee must **not re-scope the work**; it settles only the terms needed to evaluate and contract.

**Recommendation:** do not run the open call in cycle 1.

## 26a. Bounties

**A bounty** is a **published fixed-price task, open to anyone, paid for the first acceptable delivery**. No evaluation or scoring round applies.

The **two-milestone minimum in 11.1a does not apply**. For **23.2 and 23.3**, substitute the fixed price and published acceptance criteria for the milestone schedule, and the publication vote for the proposer’s agreement. Take the **award-decision oracle read at the publication vote**, providing the 13.4 collar baseline.

**Bounty rules:**

1. **Publish on the Portal** the acceptance criteria, fixed price, award shape, **licence in Required or Default mode only**, Reviewer setting, named Manager of record, and closing date. All lock at publication as under 20.2a; Proposer’s choice is unavailable;
2. The **publication vote is the award decision**, at **two-thirds, minimum 3**, conditional on acceptable delivery. No second award vote is needed. The **60-day clock in 10.10 starts at the Manager’s written acceptance determination**; the publication vote does not expire while the bounty is open;
3. The **Per-Award Limit and Cycle Ceiling apply**; there is **no additional per-bounty cap or bounty sub-limit**;
3a. No delivery may be accepted until the bounty has been open **21 days**, or **10 days** if under **USD 5,000** or with recorded urgency;
4. **Reserve the fixed price against the Cycle Ceiling at publication** (13.2);
5. **lapses** at its closing date, or at the end of the cycle in which it was published if earlier, releasing its reservation — **unless a delivery has been accepted by then**. On acceptance the reservation continues under 13.2 through contracting, the delay window, and any MSIG confirmation; any amount payable after cycle end is carried as a **forward commitment** against the following cycle. **The closing date must leave room inside the cycle for acceptance, contracting, and the full delay** — the Cycle Ceiling does not carry over (13.1);
6. Record deliveries in a **public register with receipt timestamps**. The Manager assesses in **receipt order**, stopping at the first delivery meeting the published criteria. Record later deliveries as unsuccessful with written reasons; “first” means first received;
7. Make the **10.3 publication on acceptance**, recording the awardee, receipt timestamp, acceptance determination, price, and publication vote by name and account. The **10.4 delay starts from that publication**;
8. **Contract before payment** and use the normal signatures and delay. Payment is an **initial disbursement under 11.4a**, with **objection bands under 10.5**. If the published Reviewer setting requires one, obtain the Reviewer’s written assessment before the Manager’s acceptance determination;
9. **where a bounty payment is cancelled**, the Manager **resumes assessment at the next delivery in order of receipt**, provided the bounty has not lapsed; a delivery recorded unsuccessful only because an earlier one was accepted is **reinstated**;
10. If payment is cancelled, **no work product vests**; the deliverer retains it without restrictions on its use under the agreement;
11. Apply **all conflict rules**, the **6.1 and 6.4 bidding bars**, the **ban register**, and the **pre-existing-IP schedule at contracting**; unlisted pre-existing IP does not qualify for the carve-out;
12. work product handled by shape under 20.2a, normally **Deliverable**;
13. **no bounty may be split** out of work that should have been an RFP (rule 5 of section 27 applies unchanged);
14. If the Committee expects **only one realistic deliverer**, record the expectation and reasons at publication, identify it as **sole-source**, and list it separately in the cycle report. This does not bar the bounty;

**Evaluation rules.** Sections **21.2, 22.1, 22.4, and 22.5 do not apply**. Under **22.2**, the Manager must check each delivery’s completeness, eligibility, conflicts, and ban-register status in receipt order **before acceptance assessment**; the milestone-schedule and licence-mode checks do not apply. The Manager’s **written acceptance determination against published criteria satisfies 22.3**; no scoring, weights, or reconciliation apply.

Use a **directed RFP where competitive evaluation would add value**, such as comparing capable teams, approaches, or prices; the Committee records that judgment under rule 14. This is not a bounty size limit.

## 27. Rules that apply throughout

1. **Published criteria, weights, budgets, and results.** Every judgment is written down and attributable.
2. **All questions and answers are public.** No private guidance to any proposer.
3. **Recusal is required, automatic, and published.** Thresholds recalculate on non-recused seats.
4. **Nobody scores, approves, or is paid on an RFP they could bid on.** The one exception is a Committee member engaged as Technical Reviewer under 12.6 — they are paid on an RFP they are barred from bidding on, and 12.6's guards apply in place of this rule. Material breaches follow **6.6**.
5. **No splitting or staging** to stay under the Per-Award Limit, and no topping up past it later.
6. **Departing from the scores requires a written reason.**
7. **Payment follows delivery**, except for capped, justified advances.
8. **Every award is published before money moves**, is contracted before it is proposed on-chain, and waits out its full delay.
9. **Keys are personal.** No sharing, no delegation, no signing for a recused member.
10. **Every proposal is categorized**, directed or unsolicited, so it reaches the right portfolio holder.
11. **Everything the community submits gets a status**, and a reason if declined.

---

## Appendix A — Who does what

| Role | Decides | Does not |
|---|---|---|
| **Block producers (MSIG)** | Grant, suspend, revoke the mandate. Authorize each four-cycle funding period. Set the limits. Seat and remove members. Decide escalated matters. Cancel payments at the Threshold | Vote on individual RFPs or awards |
| **Steering Committee** | What becomes an RFP. Scopes and budgets. Who wins. Withholding and termination. Classifies RFP-system work as award or operating cost (15.2b). Signs payments 4 of 5 | Approve milestones (except a 13.4 rate-check referral). **Serve as Manager of record** (12.2a). Hold or manage funds outside the Program Account |
| **Manager of record** | Runs one RFP. **Approves its milestones for payment.** Keeps its objection register. **May recommend termination** (11.10a). **Never a Committee member** (12.2a) | Vote on awards. Bid on RFPs they work on. Terminate an award. Sign or disburse anything — payment is the Committee's 4-of-5 |
| **Technical Reviewer** | Written scores and milestone assessments on any RFP whose published statement says a Reviewer is engaged — **including a technical Service award**. **May recommend termination**, filed directly with the Committee (11.10a). **May be a Committee member** on the terms in 12.6 | Vote *(except a member-Reviewer, who keeps their seat's award vote but not the proposal score, does not vote on a termination recommendation, recovery plan, or strike decision on that award, takes no part in score reconciliation, and does not vote on or sign the payment of their own Reviewer fee)*. Work on an RFP whose published statement says no Reviewer is engaged. Approve a milestone. Terminate an award |
| **VS LLC** | Contracts with awardees and role-holders; work product — as defined for each award's shape (20.2a) — vests in the **VST**. Runs the Portal and writes the `disc.vst` disclosure and decisions registers (6.3b, 7.6a). Configures and publishes the Program Account. Refuses to contract outside the mandate | Choose awardees. Control the Program Account. **Own the platform — it operates it** (15.2a). **Bid on work on the RFP system**, nor may any connected entity (15.2b) |
| **Trustee** | Nothing in this program | — |

## Appendix B — Numbers set elsewhere

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

## Appendix C — Still to confirm

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
| 8 | The **`disc.vst` account and its three registers** — **disclosures** (6.3b), **decisions** and **publications** (7.6a), as three tables in one contract or more: deployment, ABI, both schemas, RAM provisioning (**estimated and settled at Exhibit D 8.6 — 16 MB at launch, VST and VS LLC provisioning and topping up**), the upgrade path, and who signs the writes. **Specified at Exhibit D Parts 7 and 8; to be built and serviced by the EOS Rio team, with VS LLC accountable** and covers it in the Exhibit D configuration under MSIG #5 Part E (PRD section 7.2) | **Yes** — the Program Account is not funded until Exhibit D is published |
| 10 | **Counsel to confirm section 9** of the standard Independent Contractor Agreement permits the pre-existing-IP carve-out and licence back by Schedule A (section 23.3a) | **Yes** — until confirmed, no Service or Embedded RFP may be published, and no award may be contracted with a populated pre-existing-IP schedule |
