# Vaulta Network RFP Framework

**Exhibit A to MSIG #5**
**Status: DRAFT v4.2**
**Date: [___]**

This is the final RFP Framework required by MSIG #4. It has two parts.

- **Part 1 — The Steering Committee and the Mandate.** Who decides, how they are chosen, how they vote, and how money moves.
- **Part 2 — Running an RFP.** How a single RFP goes from an idea to a paid deliverable.

Part 2 may be amended by MSIG without reopening Part 1. Part 1 governs where the two disagree.

**Terms used throughout.** *Business day* = Monday to Friday, measured in UTC; no public holidays are excluded, because no single holiday calendar fits a global block producer set. *Reference Source* = the on-chain price source the Reference Rate is read from — the Delphi Oracle (`delphioracle`) unless the Committee designates a replacement under 13.4a. *Reference Rate* = the Reference Source's `datapoints.median` for `eosusd`, read at the time of the relevant action and converted per section 13.4. *Award Commitments* = amounts committed to awardees, constrained by the Cycle Ceiling. *Program Costs* = Committee pay, Manager and Reviewer fees, Portal and administration. *Total Program Spend* = the two together. *Committee* = the Vaulta Network Steering Committee. *Threshold* = 15 of 21 active block producers. *Program Account* = the on-chain account holding program funds. *Manager of record* = the RFP Program Manager assigned to one RFP. *Portal* = the RFP portal. *VS LLC* = Vaulta Stewardship LLC. *Coverage Margin* = the minimum margin the coverage test in 13.4 requires, set in MSIG #5 Part D. *Delay window* = the on-chain waiting period before a payment executes.

---

# PART 1 — THE STEERING COMMITTEE AND THE MANDATE

## 1. What the Committee is

**1.1** The Oversight Committee is renamed the **Vaulta Network Steering Committee**. It is the same body, continued. Existing members, records, and indemnification rights carry over.

**Francis Sangkuan** (1DEX) is the only carry-over **into a Steering Committee seat**, holding the Community seat on an interim basis (section 4).

**Dafeng Guo** (Vaulta Treasury) and **Ross Dold** (EOSphere) continue to serve temporarily, in the capacity of the original Oversight Committee, until the four remaining seats are filled. During that time the three of them exercise **only the Trust oversight responsibilities** in this Part — **the mandate in section 8 is not exercised, no RFP is published, and no award is made.** When the four seats are filled they cease to serve. Ross Dold may be separately appointed to a seat; Dafeng Guo may not while affiliated with the Vaulta Treasury (section 2.4a).

No date is set for filling the four seats — that rests with block producers. The program supplies its own pressure, because nothing operates until they are filled.

**The Program Account is not funded and the Committee permission is not activated until all five seats are filled** and every member has signed their contract, filed their declaration, and registered a key. The permission needs four of five signatures; a three-member body cannot operate it.

**1.2** The Committee has **two separate jobs**:

| | **Trust oversight** | **Network RFP program** |
|---|---|---|
| Authority comes from | The Trust Agreement | MSIG #5 |
| Assets involved | Trust Property | Network funds in the Program Account |
| What the Committee does | Monitors and reports | Decides what is funded and to whom |
| Accountability | Trust Agreement records | Publication, delay window, reporting, four-cycle funding authorization |

**1.3** Program funds are **not Trust Property**. The RFP program is not a Trust activity. The Trustee has no role in it.

**1.4** Every decision and every record must say which job it belongs to.

**1.5** The Committee must not use one job as leverage in the other. It may suspend the Trustee under the Trust Agreement. It depends on VS LLC for program contracting. Neither may be used to influence the other. Any communication touching both must be written and recorded in the minutes.

## 2. Seats

**2.1** Five seats. Each carries a portfolio. Every member also shares the oversight duties equally.

| Seat | Portfolio | RFP categories (from MSIG #4) |
|---|---|---|
| **Core Development** | Protocol, node software, tooling, security, technical roadmap | Core network infrastructure (APIs, history nodes, snapshots); core and supplemental development |
| **Marketing** | Brand, communications, content, events | Core and supplemental marketing services |
| **Business Development** | Integrations, partnerships, exchanges, adoption | Business and project incubation grants |
| **Community** | Builders, holders, user-facing programs | Educational initiatives; community engagement and advocacy |
| **General (At-Large)** | Cross-cutting matters, process integrity; chairs the Committee | Any category, and matters spanning categories |

**2.2** A portfolio decides who **leads** work in that category. It gives no power to approve, block, or award alone.

**2.3** Members set direction and evaluate. They do not deliver funded work — **other than a Technical Reviewer engagement under section 12.6, which is a Program Cost, not an award**.

**2.4** No more than one member may be connected to the same block producer, company, or corporate group. Members must be individuals. They serve personally and may not send substitutes.

**2.4a The Vaulta Treasury is excluded.** A person **affiliated with the Vaulta Treasury may not** hold a Steering Committee seat, serve as an RFP Program Manager, or serve as a Technical Reviewer.

"Affiliated with the Vaulta Treasury" means employed by it, an officer or director of it, under contract to provide services to it, holding authority over Treasury funds, or otherwise acting under its direction in respect of its treasury functions.

The Treasury has stated it will not take part in allocation decisions once funds reach the Network. This exclusion holds it to that, and protects both sides: the Treasury from appearing to direct what it funds, and the program from appearing to be directed. It is a **default**, and MSIG may waive it expressly at the Threshold with published reasons.

**Eligibility is continuing, not just tested at appointment.** A member, Manager, or Reviewer who becomes Treasury-affiliated during their term shall disclose it within **10 business days**. Their signing weight, if any, is suspended immediately and the matter goes to MSIG, which may waive the exclusion or remove them.

The transition arrangement in section 1.1 is unaffected. Dafeng Guo's service there is in the Trust oversight capacity only, does not touch the RFP mandate, and ends when the four seats are filled.

**2.5** Members are **not employees of the Trust**. Each signs a written contract with VS LLC.

**2.6** Each member holds one unit of signing weight on the Program Account (section 7). A member who cannot hold a signing key securely cannot serve.

## 3. Choosing members and terms

**3.1 The Core Development, Marketing, Business Development, and General (At-Large) seats** are appointed by MSIG at the Threshold, using the template at Exhibit E to MSIG #5. A single Resolution may name **one candidate for one seat, a full slate of all four, or any subset** — whichever grouping reflects how the candidates were put forward.

Every rule below operates **per seat**, not per proposal.

Block producers may approve more than one proposal covering the same seat. Where more than one reaches the Threshold, the seat goes to whichever proposal is **executed first by block time**. Once a seat is filled, later executions have no effect for that seat.

Each Exhibit E proposal states a **resolution mode**:

- **Seat by seat** (default) — each seat named is treated independently. A slate executing when one of its seats is already filled seats the others and has no effect for the filled one.
- **All or nothing** — the Resolution has no effect for **any** seat if any seat it names would not be filled by it, **for any of the reasons below** and not only because the seat is already taken. Used where the candidates were chosen to balance each other, so a partial slate is worse than none.

An appointment has no effect for a given seat if, at the moment of execution:

1. that seat is already filled by an earlier executed appointment;
2. the named individual already holds another seat, including under the same Resolution;
3. seating them would breach the one-member-per-affiliation rule in section 2.4;
4. they are affiliated with the Vaulta Treasury absent an express waiver at the Threshold;
5. they appear on the register of bans under section 6.6.

**Internal conflicts resolve by order of appearance.** Where a single Resolution names the same individual for more than one seat, or names two candidates who would breach the affiliation rule against each other, the seats are tested **in the order they appear in the Candidates table of the proposal**: the appointment takes effect for the first and has no effect for the later. The table's row order is therefore the proposer's priority order, and proposers should set it deliberately.

VS LLC maintains a **published seat register** on the Portal recording who holds each seat **by name and on-chain account** — the name being the Part 1 identity under 6.3a, so the register and the questionnaire cannot diverge — the proposal name, the execution transaction, the resolution mode, and any seat a proposal named but did not fill together with the reason.

The register is the canonical **record of what was executed** and of any condition VS LLC has identified. It is **not a determination of eligibility.** Where VS LLC records a seat as unfilled on any ground other than an earlier execution, it publishes its reasons and refers the matter to MSIG, and the seat is treated as vacant until MSIG resolves it. VS LLC does not decide who is eligible; MSIG does.

**3.2 Term** is **one year**. Members may be reappointed without limit.

The vstcreation MSIG appointed the initial members "effective upon formation of the Trust" and set no term length. MSIG #5 therefore **sets** this term rather than extending an earlier one.

**3.3 Continuation.** Each appointment allows the member to continue month to month after the term ends, until a successor is seated or MSIG replaces them. A continuing member **keeps their signing key**. Without this the Committee would fall below four signers and payments would stop.

**3.4 Staggering.** **All initial terms for the Core Development, Marketing, Business Development, and General (At-Large) seats run from the date funds are received in the Program Account**, not from the date each appointment Resolution is executed. A **Community seat filled by MSIG** — whether seating an ECF winner under 4.2 or filling the seat under 4.6 or 4.7 — instead runs one year from the execution of that Resolution.

The four seats may be filled by Resolutions executing at different times. If each term ran from its own execution the stagger would drift, and could collapse entirely — a Business Development member seated six months after Core Development would finish an 8-month term at the same moment Core Development finished a 14-month one. One anchor keeps the spacing, stops a member's term running down while the Committee is incomplete, and matches the cycle and pay clocks.

Initial terms are staggered so all five seats do not end together:

| Seat | Initial term |
|---|---|
| Core Development | 14 months |
| Marketing | 14 months |
| Business Development | 8 months |
| General (At-Large) | 8 months |
| Community | See section 4 |

All later terms run the full 12 months.

**3.5 Removal.** MSIG may remove a member at any time, with or without cause. The Committee cannot remove its own members. It may refer a member to MSIG for removal. Removal ends the member's signing weight immediately.

**3.6 Resignation.** A member may resign on written notice to the Chair and to block producers. Resignation takes effect on the date stated in the notice or, if none, on delivery. **Key weight is surrendered immediately**, and the seat becomes vacant.

**3.7 Vacancies.** A vacancy — by removal, resignation, incapacity, or death — is filled for the rest of the term by the process for that seat.

**3.8 Below four filled seats the Committee cannot pay anyone.** The signing permission is fixed at 4 of 5, one unit per seated member.

**With three filled seats no payment can execute.** The Committee may still meet, decide, publish, and escalate, but nothing can be signed. MSIG must fill a seat or change the permission.

**With four filled seats payments can execute, but all four must sign** — there is no margin for a recusal, an absence, or a lost key. Any award where fewer than four members are able to sign goes to MSIG instead (section 9).

## 4. The Community seat

**4.1** The **EOS Community Foundation (ECF)** designs and runs the community vote for this seat. ECF decides candidate eligibility, voter eligibility, voting method, and publication of results.

**4.1a ECF is independent of this program, and is not funded by it.** Nothing in this Framework or MSIG #5 pays ECF or its members, and recognizing ECF as the administrator of the vote creates no funding obligation. If ECF seeks Network funding it proposes **its own MSIG**, which block producers vote on directly — not an award under this program, and not the Committee's decision.

That separation is deliberate. ECF selects the person who fills one of the Committee's five seats; a Committee that also set ECF's budget would be funding the body that seats one of its own members.

**4.1b ECF may bid, but the Community member recuses.** ECF is a plausible and often the best-qualified bidder on Community and Education RFPs, so barring it would cost the Network more than it protects. Instead, **ECF is a connected organization** of the Community seat holder for the purposes of section 6.2 wherever that member is engaged by, paid a stipend by, or holds a position in ECF. The 6.2 machinery then applies in full: the connection is declared **in writing before the RFP is published**, the member **recuses** from scoping, drafting, evaluation, scoring, discussion, and voting on it, and the connection and recusal are minuted and published. The member **may not help set the budget or the criteria** for an RFP ECF later bids on.

Any stipend or engagement from ECF is also a **Part 2 disclosure** under 6.3a — "other paid engagements in the Vaulta or wider Antelope ecosystem" — so it is filed on-chain and published like any other, whoever pays it.

**4.2** The ECF vote produces a **nomination**. MSIG then seats the winner, because all Committee members are appointed by MSIG.

**4.3** Block producers should refuse to seat an ECF winner only for **disqualifying cause**: a proven conflict of interest, a legal bar to service, a serious failure in the vote itself, or conduct that would be Cause under the Trust Agreement. A block producer refusing on any other basis should say so publicly and give reasons. This is a commitment, not a rule this document can enforce.

**4.4** If MSIG refuses to seat the winner, ECF seats the runner-up if its process has one. If not, ECF runs the vote again.

**4.5 Interim holder.** Francis Sangkuan holds this seat until the first ECF winner is seated, or until **9 months from the execution of MSIG #5**, whichever comes first. The interim holder has full voting rights, full signing weight, and full pay.

This period runs from execution rather than from funding, so ECF is not held up waiting for the program to be funded — its process runs in parallel. MSIG may extend it once, at the Threshold, on ECF's request.

**4.6** If the outer date passes with no ECF winner, MSIG fills the seat at the Threshold. Leaving it empty would stop payments (section 3.8).

**4.7 If ECF stops running the process — or ceases to exist —** MSIG may name another administrator, or **fill the seat at the Threshold like any other seat**.

**Filling it that way is durable, not a holding pattern.** MSIG may keep filling the Community seat indefinitely, appointment after appointment, exactly as it fills the other four. Block producers are the Network's ultimate consensus, and where a community process no longer exists they take it over rather than leaving the seat empty or the program waiting for a body that may never return. If a community process emerges later, MSIG may hand selection back to it — but nothing obliges it to, and nothing lapses if it does not.

**The seat does not change character.** It keeps its Community portfolio, its category assignments under section 2.1, its vote, its signing weight, and its pay. Only the selection method changes. A seat MSIG fills is not a lesser seat.

**4.8** Where MSIG seats a Community member — whether seating an ECF winner under 4.2 or filling the seat under 4.6 or 4.7 — it uses the **Exhibit E template** and **the rules in section 3.1 apply**: resolution modes, first execution by block time, the five conditions, and the row-order tie-break. The term runs one year from execution (section 3.4).

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
| **Record a technical continuity change to the Reference Source** (13.4a) | Simple majority, minimum 3 |
| **Designate a replacement Reference Source** (13.4a) | Two-thirds, rounded up, minimum 3 |
| Recommend a Framework amendment | Two-thirds, rounded up, minimum 3 |
| Declare urgency for the shortened delay (10.4) | Two-thirds, rounded up, minimum 3 |
| Approve an advance payment (11.7) | Two-thirds, rounded up, minimum 3 |
| Approve the Program Cost payment schedule (13.3a) | Simple majority, minimum 3 |
| Resume a suspended member-Reviewer engagement where a substitute was engaged (12.6.1) | Simple majority, minimum 3 |
| Lift a coverage stop once coverage is back above the margin (13.4) | Simple majority, minimum 3 |
| **Approve a milestone routed to the Committee** by 13.4 or 13.4a — a stale rate, a rate outside the collar, or the first payment after a change of Reference Source | Simple majority, minimum 3 |
| **Sign a payment on-chain** | **4 signatures.** See section 7 |

Two-thirds rounded up: 5 seats = 4 votes. 4 seats = 3 votes. 3 seats = 2 votes.

**This table is the complete list.** Every Committee vote this Framework requires appears here. Where another section states a threshold, it restates a row above rather than creating one — and where a section says "at the threshold in 5.3", the row it means is in this table.

**5.4 Why there is a minimum of 3.** Without it, two-thirds of three rounds to two, and an award would pass on fewer votes than publishing the RFP required. The Trustee suspension row has no minimum, so that a reduced Committee is not weakened against the Trustee.

**5.5 The Committee does not vote on milestones.** Milestone approval belongs to the Manager of record (section 11).

**One narrow exception**, and it is not about the work. Sections 13.4 and 13.4a route a milestone to the Committee where the **rate** is doubtful — a datapoint older than 24 hours, a rate outside the collar, or the first payment after a change of Reference Source. The Committee then approves at the threshold in 5.3. What it is approving is **the rate and the payment, not the delivery**: the Manager's determination that the milestone was met stands untouched, and 11.4's ministerial checks are unaffected.

**5.6 Recusal.** Where a member has a conflict, recusal is required, not optional. A recused member is excluded from the materials, the quorum, and the count.

A recused member also **does not sign** the payment. Because the permission is fixed at 4 of 5, one recusal leaves exactly four signers and no margin. If recusals or vacancies leave fewer than four able to sign, the award goes to MSIG instead (section 9). Recusal is never satisfied by signing and objecting afterwards.

**5.7 No substitutes.** Members vote personally. Written or cryptographically signed consent counts as a vote.

**5.8 Chair.** The At-Large member chairs unless the Committee elects otherwise. The Chair sets agendas and is the contact point for the Trustee, VS LLC, and MSIG. The Chair has no extra vote and no casting vote.

**5.9 Minutes.** Every meeting is minuted with attendance, decisions, vote counts, and recusals. Minutes are published within 10 business days. Only three things may be removed: confidential proposal content before award, legal advice, and personal data. **Vote counts and recusals are never removed.**

**"Personal data" does not include** the name, role, seat, or on-chain account of any member, Manager, Reviewer, or other person exercising a decision right in the program, **acting in that capacity**. Those are never removed. Without this the redaction ground would reach exactly what section 11.3a requires to be published, and would break the hash of any decision already recorded on-chain.

## 6. Conflicts of interest

This section matters more than any other. The Committee chooses what is funded and who is paid, and its members come from the same small group that would want to bid.

**6.1** A member may not, during their term and for **6 months** afterwards:

- submit a proposal, alone or through a company they hold a material interest in;
- be named on any proposal as a participant, subcontractor, or paid adviser;
- accept any payment, fee, equity, token allocation, or referral from a proposer or awardee connected to a Vaulta RFP.

**6.2 Connected companies.** A company connected to a member — their employer, a company they work for, one under common control, or one they hold a material interest in — may bid only if the member: declares the connection in writing **before the RFP is published**; recuses fully from scoping, drafting, evaluation, scoring, discussion, and voting on that RFP; and the connection and recusal are minuted and published. The member may not help set the budget or the criteria for an RFP their connected company later bids on.

**6.3 Declarations.** Every member, Manager, and Technical Reviewer files a declaration of connections, employment, and Vaulta-related token or equity holdings within 30 days of appointment. For a Committee member the 30 days run as set out in 6.3c. This includes any connection to the **Vaulta Treasury**, which is the source of the funds this Committee allocates. They update it within 10 business days of any change and refile every year.

**6.3a The disclosure questionnaire.** Declarations are made on a **single standard questionnaire**, not as free-form statements. Everyone who decides or manages answers the same questions in the same order, so answers can be compared across people and across years, and so a missing answer is visible as a gap rather than an omission nobody noticed.

**Who files:** every Steering Committee member, every RFP Program Manager, and every Technical Reviewer. Any other person given a decision or approval right in the program files the same questionnaire before that right takes effect.

**What it asks:**

| Part | Questions |
|---|---|
| 1. Identity and role | Name, role, seat or RFPs covered, on-chain account, date |
| 2. Employment and engagement | Current employer; other paid engagements in the Vaulta or wider Antelope ecosystem — **including any Technical Reviewer or Program Manager engagement in this program, by RFP**; block producer affiliation; board, officer, or advisory positions |
| 3. Vaulta Treasury | Any employment, contract, consulting, advisory, board, or equity relationship with the Vaulta Treasury or any entity it controls, now or in the previous 12 months |
| 4. Holdings | A holdings **by band**, not exact figure; any other Vaulta-ecosystem token, equity, or option position; any position taken on behalf of another person |
| 5. Connections to likely proposers | Named organizations the filer is connected to that plausibly bid; the nature of each connection; whether the filer would recuse |
| 6. Other funding roles | Roles in any other grant, funding, or treasury body in this ecosystem or another |
| 7. Family and household | Connections in Parts 2 to 5 held by an immediate family member or household member |
| 8. History | Any prior removal, ban, or sanction from a funding, governance, or treasury role anywhere |
| 9. Attestation | That the answers are complete and true; acknowledgment of the update duty and of section 6.6 |

Parts 2 to 8 each require an explicit **"None"** where there is nothing to declare. A blank is treated as an unfiled questionnaire.

**6.3b Publication on-chain.** A filed questionnaire is **published on-chain**, not only on the Portal.

**Where it is written.** Disclosures are **not** written to the Program Account. That account holds funds, its owner permission sits with `eosio.prods`, and VS LLC has no weight on it. Disclosures go to a **separate account, `disc.vst`**, carrying a small append-only disclosure contract deployed and controlled by VS LLC. VS LLC configures and publishes it under the same Exhibit D process as the Program Account, and MSIG #5 Part E includes it in that scope. Keeping the two apart means the disclosure register can be written routinely without anyone holding a key that can move money.

**What is written.** For each filing: the filer's account, role, questionnaire version, filing date, the **coded answers** to Parts 2 to 8, and a **SHA-256 hash of the full submission** including free text. The full submission is published on the Portal, and the hash lets anyone confirm the Portal copy is the one that was filed. The filer signs their own submission; **VS LLC writes the record and cannot alter its content.**

Records are **append-only**. An update files a new record referencing the previous one; nothing is edited or removed. The history of what a person disclosed and when is therefore permanent and public, which is the point — a conflict that surfaces later can be checked against what was declared at the time.

Because on-chain records cannot be withdrawn, the questionnaire asks for holdings by band rather than by figure, and asks filers not to name third parties beyond the organizations already named in Part 5.

**6.3c Filing gates.** The questionnaire **is** the conflict-of-interest declaration referred to in the appointment and engagement documents — it is one item, not an additional one.

| Who | Gate |
|---|---|
| Committee member | **Signing weight and pay do not begin** until the questionnaire is filed on-chain. This is the "file the conflict declaration" item in the 30-day appointment checklist |
| Program Manager | Cannot be recorded as **Manager of record** on any RFP before filing |
| Technical Reviewer | Cannot be **assigned to an RFP** before filing |
| A member taking a Reviewer engagement (12.6) | Files an **update** under 6.3 **before the engagement begins**. The engagement may not begin until it is filed, and the 10-business-day change window in 6.3 does not apply to it |

**When the 30-day clock starts.** For a Committee member, the 30 days run from the **later of** the execution of their appointment Resolution and the date VS LLC publishes the disclosure register as open for filing. Nobody is replaced for missing a deadline the program made impossible to meet.

**Overdue annual refiling.** More than 30 days overdue: a **member's pay is suspended** until filed; a **Manager or Reviewer takes no new assignment and cannot be recorded as Manager of record** until filed. Work already assigned continues, since a lapsed refiling is a procedural breach under 6.6, not a material one.

**6.4 Managers and Reviewers.** They may not bid on any RFP they work on, during the engagement and for 6 months afterwards. They may not approve or assess milestones for an awardee they are conflicted on.

**What "conflicted" means for a Manager or Reviewer.** Sections 6.1 and 6.2 are written about members. For a Manager or Reviewer they apply **as if references to a member were references to them** — so a connected company, an employer, common control, a material interest, or any payment, fee, equity, token allocation, or referral from the proposer or awardee all count. In addition, they are conflicted on any awardee that is, or is connected to, an organization or person they declared in **Part 3, Part 5, or Part 7** of their questionnaire (section 6.3a). This is the definition every other document points to. The normal remedy is reassignment (section 12.3). They must also not be affiliated with the Vaulta Treasury (section 2.4a) — the Manager of record approves payments, which is exactly the kind of active decision the Treasury has said it will stay out of.

**6.5 Confidentiality.** Proposal contents, prices, and evaluation discussions stay confidential until the award is announced. Members may not share proposal content with competitors or use what they learn for their own or a connected company's benefit.

**6.6 Consequences.** Consequences run on two levels, because a late filing and a concealed self-dealing award are not the same thing.

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

**A ban can only be lifted by the same Threshold.** Fifteen of twenty-one confirmed it, and fifteen of twenty-one are required to overturn it. Nothing else — not a Committee vote, not the passage of time, not a change in the Committee's membership — reduces or expires it.

**Before MSIG votes**, the person shall be given the allegation in writing and **10 business days** to respond, and their response is published with the referral. A permanent exclusion decided without hearing the person would not survive its first contested application.

**The ban register.** VS LLC maintains a **published register of bans** on the Portal, listing the person, the date, the MSIG transaction that confirmed it, and any entity named in it. The register is checked at proposal submission and before any role is assigned. A ban that only exists in a minute from two years ago is a ban nobody enforces.

**6.7 Committee members as Technical Reviewers.** A member may hold a paid Technical Reviewer engagement. That is a conflict this section does not otherwise reach — a member cannot bid, so 6.1 and 6.2 never bite — and it is governed instead by **section 12.6**, which sets its own preconditions and recusals.

## 7. The Program Account and signing

**7.1** Program funds sit in the on-chain **Program Account**, `rfp.vst`. They sit nowhere else.

The name reads as belonging to the VST, but it confers no authority. A parent account has no standing control over a subaccount once created, and the permissions in 7.2 govern: the owner permission sits with `eosio.prods` and moving funds needs 4 of 5 Committee signatures. **The VST cannot move program funds.**

**7.2** The account carries a Committee permission:

| Setting | Value |
|---|---|
| Weight per seated member | 1 unit, 5 units total |
| Threshold to move funds | **4 of 5** |
| Threshold for administrative actions that move no funds | **3 of 5** |
| Owner permission | Held by `eosio.prods` |
| Delay before a payment executes | Set in MSIG #5 |

**7.3** Because the owner permission stays with block producers, they can replace a removed member's key, rebuild the permission, or recover the account.

**7.4 Keys are personal.** No member may share, delegate, or let an employer hold their key. No member may sign for another member, including a recused one. Keys are registered on appointment and given up on removal or replacement — but **not** during authorized month-to-month continuation (section 3.3).

**7.5 Lost or compromised keys.** A member must tell the Chair and block producers **immediately**, and must not sign until the key is replaced. The Committee proposes no payments in the meantime.

**7.6** The platform **never holds a key with any authority over the Program Account, and never holds a member's signing key.** Members sign with their own wallets. VS LLC operates a key of its own for writing the disclosure register on `disc.vst` (section 6.3b); that key has no weight on the Program Account and cannot move funds.

**7.6a Decisions are recorded on-chain, not only published.** Payments are already on-chain because that is how money moves. The **decisions behind them are recorded on-chain too**, on the same append-only register as the disclosure questionnaires (`disc.vst`, section 6.3b), in a separate decisions table.

| What is written | For each |
|---|---|
| Award decisions | RFP reference, awardee, USD amount, vote counts, members voting for, against, and recused **by name and account**, and a SHA-256 hash of the published decision record |
| Milestone approvals | Award reference, milestone, the Manager of record and any Technical Reviewer **by name and account**, amount, the oracle read, and a hash of the approval record |
| Payment signatures | The proposal, and **each signing member by name and account** |
| Committee resolutions with an external effect | Terminations, recovery plans, strikes, engagements, and reserved-matter escalations, with vote counts and a hash of the minute |

Records are **append-only**; a correction is a new record referencing the old one. **The hash is taken of the record as published**; where a published record is later corrected or lawfully redacted, a **new** decision record is written referencing the prior one, carrying the new hash and the reason — otherwise a redaction would silently break verification of a record nobody can withdraw. The full text stays on the Portal and the hash proves the Portal copy is the one that was recorded. A Portal that goes down, changes hands, or is quietly edited then cannot take the decision history with it.

These records are written with the same `disc.vst` key described in 7.6.

## 8. The mandate

**8.1** MSIG grants the Committee a standing mandate to **allocate Program Account funds on behalf of the Network**. Block producers do not vote on individual RFPs or individual awards. Within the limits below, the Committee's decision is the Network's decision.

**8.2** This is the separate authorization MSIG #4 required before anyone could award funds.

**8.3 The Committee decides:** what becomes an RFP; scopes, deliverables, criteria, budgets, and timelines; **who wins and on what terms**; who serves as Manager of record and Technical Reviewer; and whether to withhold payment or terminate an engagement.

**8.4 What the Committee may not do:**

1. reserve or commit more in a cycle than the **Cycle Ceiling**;
2. make a single award above the **Per-Award Limit**;
3. make an award the conflict rules forbid;
4. change the funding source, extend the cycle, or widen the program's scope;
5. split, stage, combine, or later top up awards to get around points 1 to 4;
6. act after the mandate is suspended or revoked;
7. **form, register, or join any company, foundation, association, trust, or other entity** on behalf of the Network. That requires a separate MSIG Resolution.

An action outside these limits is **void**. VS LLC must not contract on it. Block producers should cancel any matching payment during its delay window.

**8.5 What replaced the old safeguard.** In most funding systems, the body that decides never touches the money. **That is no longer true here** — the Committee decides and also signs. These controls replace it, and they only work together:

| Control | Effect |
|---|---|
| 4-of-5 signing | No two members can move funds |
| Contract before payment | Money cannot move before a signed agreement exists |
| Delay window | Every payment is visible before it settles, and the Committee cannot waive the wait |
| Block producer cancellation | Block producers can stop any payment at the Threshold during the delay |
| Everything on-chain | Balances and transactions are public and checkable at any time |
| Owner permission with block producers | Block producers can rebuild the permission or recover the account |
| Funding is authorized a year at a time | The Committee can only ever spend what block producers have authorized, and any instalment can be stopped at the Threshold |

Removing any one of these — a lower threshold, a token delay, paying before contracting, or transferring the whole funding period at once — removes a necessary part of the structure.

## 9. Matters that go to MSIG instead

**9.1** These are outside the mandate:

- a single award above the Per-Award Limit;
- an award that would take total Award Commitments above the Cycle Ceiling;
- an award extending beyond the end of the authorized funding period;
- an award where recusals leave fewer than three non-recused members, or fewer than four able to sign;
- **any payment**, including a Program Cost payment, where recusals or vacancies leave fewer than four able to sign;
- a **termination recommendation on an award reviewed by a Committee member**, where **recusals of any kind** leave fewer than four non-recused members;
- a **milestone on an award whose published statement under 20.2 says a Reviewer is engaged**, where no Reviewer is engaged and no substitute has been engaged.
- a **milestone or evaluation on an RFP where no unconflicted Manager of record is available** (section 12.3). MSIG may direct the engagement of a named Manager or another basis of approval;
- an **award for work on the RFP system** where the Committee records that no other capable provider exists (section 15.2b);
- an award the conflict rules would otherwise forbid;
- an award that fails the coverage test in section 13.4;
- a **milestone approved under an executed agreement that the Program Account balance cannot cover** (section 13.4). The approval stands and the reservation is not released; 9.2's exception applies, so MSIG inaction does not decline it;
- the creation of any company, foundation, association, trust, or other entity;
- any change to the **denomination convention** — the USD denomination, the payment of A, the conversion formula, or the truncation rule. This does **not** reach the designation of a replacement **Reference Source** under 13.4a, which is the Committee's;
- any change to the mandate, the Cycle Ceiling, the Per-Award Limit, the cycle length, the permission, or the funding source;
- anything the Committee votes to escalate.

**9.2 Timing.** The Committee sends the record and a draft resolution to MSIG within **10 business days**. If MSIG does not act within **30 days**, the matter is **treated as declined**, the reserved amount returns to the Cycle Ceiling, and the Committee may rework it.

**Two exceptions to the declined default.** Where the escalated matter is a **payment or a milestone under an executed agreement**, MSIG inaction does **not** decline it: the matter stays open, the reservation is not released, and the Committee re-submits. Declining to pay a delivered milestone because MSIG did not act would penalize an awardee for the Network's own delay.

**Submission is ministerial.** Where a matter falls within 9.1 by operation of these rules rather than by a vote to escalate, no Committee vote is needed to send it. The Chair — or any member if there is no Chair — makes the submission. Otherwise a Committee that had lost quorum to recusals could not escalate the very matter the recusals created.

**9.3** Escalation is a normal use of the mandate, not a failure of it.

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

**10.2 Why step 3 comes before step 4.** An awardee who has signed nothing has no obligations, no acceptance criteria, and nothing to recover against. This is the last cheap point to stop a bad decision.

**10.3 Publication happens in two stages.** The decision is published within 2 business days: awardee, scope, **award shape**, **licence**, amount, milestone schedule, **each member's vote — for, against, or recused — by name and on-chain account**, and the reasons where the Committee did not follow the reviewers' scores. The **on-chain transaction reference is added later**, when the payment is proposed.

Publication is required. The chain shows that money moved; the Portal shows why.

**10.4 The delay window** runs from the moment publication is complete. If publication is incomplete or has to be corrected, the Committee cancels the proposal and starts again, which restarts the delay. The delay cannot be waived. A shorter urgent delay may be used only where the Committee votes to declare urgency **at the award threshold — two-thirds of filled non-recused seats, minimum 3** — records the reason, and completes publication before the proposal is made.

**10.5 Objections.** Block producers may object during the delay. Objections are recorded in a public register on the Portal, are attributed to the block producer who made them, and may be withdrawn.

| Objections | Result |
|---|---|
| **0 to 3** | Payment goes ahead when the delay ends. Objections are published and answered in the cycle report |
| **4 to 6** | Committee **cancels** the payment. It may only be proposed again if MSIG confirms the award |
| **7 or more** | Committee **cancels** and the award **ends**. No MSIG vote is held |

**Why 7.** Seven block producers can block a 15-of-21 decision. An award with seven objections could never be confirmed by MSIG, so no vote is held. If withdrawals bring the number below seven before the count closes, the award moves into the 4-to-6 group and MSIG may vote.

**10.6 Counting.** The Manager of record keeps the register. The count is **fixed when the delay window closes**. Withdrawals must be recorded before that moment. Objections arriving later do not change the result.

**10.7 Cancelling is itself an on-chain action.** It is a **3-of-5** administrative action and is **mandatory** in the 4-to-6 and 7-or-more groups. The Committee shall cancel within **2 business days** of the count closing, and **failure to cancel is an express ground for referral to MSIG for removal**.

Block producers can also cancel through the owner permission. That is the backstop, not the primary route — 4 to 6 objectors are by definition short of the Threshold, so a Committee that simply declined to act could not otherwise be stopped.

**10.6a Objections are signed, and only eligible signatures count.** An objection and any withdrawal are **signed by the block producer's on-chain account**. A signature counts toward the band only if that account is in the **active producer set at the time of signing**; one that is not is recorded but not counted, and the register states which schedule was used. The bands turn an award back to MSIG or end it outright on a count of exactly these signatures, so who is eligible has to be settled before the count, not after.

**10.8 Block producers may cancel any payment at the Threshold during its delay**, whatever the objection count. The register records opinion; the chain enforces it.

**10.9 After a cancellation in the 4-to-6 group**, the Committee sends the record and a draft confirming resolution to MSIG within **10 business days**. If MSIG does not confirm within **30 days of that submission**, the award ends and its reservation is released.

**MSIG confirmation revives the decision, not the agreement.** The awardee agreement terminated on cancellation, so VS LLC executes a **fresh agreement on identical terms** before the disbursement is proposed again — within the 60 days in section 10.10, running from confirmation.

**10.10 Time limit on an unused decision.** The agreement must be signed within **60 days** of the award decision, or of MSIG confirmation if the award was cancelled into the 4-to-6 group — and in any case before the cycle closes. After that the decision expires and the Committee must vote again. Late in a cycle the 60 days may in practice be shorter, so contract quickly or hold the award over.

## 11. Milestone approval and payment

**11.1** Awards are paid in milestones. The **Manager of record approves each milestone for payment**. The Committee decides what the milestones are when it makes the award. The Manager decides whether they have been met.

**11.2 Technical Reviewer.** A Technical Reviewer's **written assessment** — accept, accept with conditions, or reject with stated fixes — is **required at every milestone under an award whose published statement under 20.2 says a Reviewer is engaged**, and the Manager's approval must record it. Where the statement says one is not engaged, none is required and its absence is not a defect in the approval record; the Manager approves on their own assessment.

The test is the published field, not a judgment about the work. That matters because a **Service** award has no built deliverable at all (20.2a) yet may well need technical assessment — a history API or an indexer is technical whether or not anything is handed over.

**Whether an assessment is "required" is settled by the RFP itself.** Section 20.2 obliges every published RFP to state **whether a Technical Reviewer is engaged**. That published statement is the answer, fixed at publication, for the whole life of the award. If the RFP says a Reviewer is engaged, an assessment is required at every milestone under that award; if it says one is not, none is required and its absence is not a defect in the approval record.

The judgment about whether the work is technical is therefore made **once, at scoping**, by the Committee — not again at each signature. A hosted service, a history API, or anything else on the line between technical and operational is decided when the RFP is written, and recorded there for everyone to see. Nobody has to re-argue it later.

**11.3 The approval record** must contain: the milestone, the criteria applied, the **Manager of record by name and on-chain account**, their decision and reasons, the **Technical Reviewer by name and account** and their assessment where required, the amount payable, and the awardee's verified receiving account. The approval and amount are **published**.

**11.3a Every decision is attributable to named people.** Approvals and disbursements are not the acts of an institution; they are the acts of individuals who can be asked about them afterwards.

| Record | Who is named |
|---|---|
| Milestone approval | The **Manager of record**, and the **Technical Reviewer** where one gave an assessment — **by name and on-chain account** |
| Payment signature | **Each Committee member who signed**, by **name and on-chain account** — both, not the account alone |
| Award decision | Every member voting for, against, and recused, **by name and account** (sections 10.3, 13.5, 23.2) |

The account alone is not enough. Accounts can be rotated, renamed, or read by nobody, and a permission rebuilt by block producers under 7.3 leaves a record nobody can attach to a person years later. The name is what makes the record answerable; the account is what makes it verifiable. Both are published, and both are written to the on-chain record under 7.6a.

**"By name" means the person's single stable public identity** registered under Part 1 of their disclosure questionnaire (6.3a) — a legal name or a registered handle — which does not change during their term. **Part 1 is also where the on-chain account is registered**, and it is the source for both fields wherever this Framework asks for name and account. For a Committee member the seat register (3.1) carries the same pair. Section 5.9's personal-data redaction ground does not reach it.

**11.4 The Committee's signature is administrative.** Four members must sign, because that is how funds move. The signature confirms five things only:

1. a complete approval record exists;
2. the amount matches the published milestone schedule;
3. a Technical Reviewer assessment is present **where the RFP's published statement under 20.2 says one is engaged** — and is not required where it says one is not;
4. the payment is within the award;
5. **no termination recommendation under 11.10a is open on the award.**

**The Committee does not judge the work again.**

**11.4a Signing an award disbursement is administrative too.** Once the Committee has voted to award and the agreement is executed, signing confirms only that the decision record is complete, the agreement matches it, the amount is within the limits, the delay has run, and no termination recommendation under 11.10a is open on the award.

**A member who voted against an award still signs its disbursement**, absent one of those failures or credible evidence of misrepresentation or conflict. One recusal leaves exactly four available signers, so a dissenting member withholding a signature could otherwise veto a properly passed award alone. Disagreement belongs at the vote, not at the signature.

**11.5 Refusing to sign.** A member may refuse only if one of those five checks fails, or if there is credible evidence that the approval was obtained by misrepresentation or in breach of the conflict rules. The member states the reason in writing and it is minuted. **Disagreeing with the Manager's judgment is not a valid reason.** That disagreement belongs at the award stage.

**Nor is disagreeing with the RFP's Reviewer setting.** A member may not refuse to sign on the ground that the work *ought* to have been treated as technical when the published RFP said no Reviewer was engaged. That call was made at scoping under 20.2 and the awardee bid on it. The remedy is to set the next RFP differently.

**11.6 Milestone payments have no objection process.** They carry the normal delay, but they carry out a commitment the Network already made and already published.

**11.7 Advance payments** before delivery are capped at **15%** of the award total, and only where the awardee genuinely cannot fund the first milestone. An advance is **approved by the Committee at the award threshold and published with the award decision** — it is not a milestone, so the Manager of record does not approve it.

**11.8 Changes.**

| Change | What is needed |
|---|---|
| Milestone scope or dates | Committee approval (majority, minimum 3), contract amendment, publication |
| **Increase in award amount** | Award threshold, contract amendment, publication, **new proposal and new delay** |
| **Award shape, licence mode, permitted set, or the licence named in Required mode** | **Cannot be changed.** Fixed at publication under 20.2a; the remedy is the next RFP. In Proposer's choice mode the licence itself is fixed at the award decision and cannot change after it |
| Anything else | Logged by the Manager and reported |

The rule on increases prevents an award being set below the Per-Award Limit and topped up past it later.

**11.9 Late delivery.** A missed milestone requires a written recovery plan within 10 business days, managed by the Manager. A second consecutive miss triggers a Committee review.

**11.10 Termination for cause** needs a two-thirds vote, minimum 3, and is published with reasons. Accepted milestones are paid. Unearned amounts are not proposed. Delivered work product stays with the VST. Any pending payment proposal is cancelled.

**What termination leaves behind, by shape** (20.2a): for a **Service** award, the **operational handover set and the data export fall due on termination**; for an **Embedded** award, the **licence back over embedded pre-existing IP survives termination**. Termination is exactly when the Network most needs both.

**11.10a Recommending termination.** Rejecting a milestone and ending an engagement are different judgments, but the person closest to the work is often the first to know the second one is needed. So:

**The Manager of record may recommend termination** of an award. **A Technical Reviewer may recommend termination** of an award they are engaged on. Either may do so where the work product delivered, **or the service performed**, against a milestone is **materially below the standard the RFP required**, and in particular where:

1. the deliverable fails acceptance criteria in ways that go to the substance rather than to detail;
2. remediation specified in an earlier determination has not been carried out, or has been carried out inadequately;
3. the quality of what has been delivered gives no reasonable prospect that the remaining milestones will be met;
4. the work is not what the awardee represented it to be;
5. on a **Service** award, the published service levels are **persistently not met**.

A recommendation is made **in writing**, states which of the grounds apply, attaches the milestone determination it arises from, and is **published**. A Technical Reviewer files it directly with the Committee; it does not pass through the Manager, and the Manager may not withhold it. Where the Manager and the Reviewer disagree, both positions are filed and published.

**Who may not file.** A Manager or Reviewer who is **conflicted on that award** (section 6.4) may not file a recommendation, and shall notify the Committee instead. A person who is no longer Manager of record, or whose Reviewer engagement on that RFP has ended, may not file on it.

**Effect of filing:**

1. **the Committee shall cancel any payment proposal pending on that award within 2 business days of filing.** Cancellation is a 3-of-5 administrative action (section 7.2) — the filer has no signing key and cancels nothing themselves. Failure to cancel within 2 business days is an express ground for referral to MSIG for removal, as under 10.7. The fifth ministerial check in 11.4 means a member may lawfully withhold signature on that proposal while the recommendation is open;
2. **no further milestone under that award is approved for payment** until the Committee has decided;
3. the awardee is given the recommendation and **10 business days** to respond in writing, and the response is published with it;
4. the Committee **must decide within 15 business days** of the close of that window and **publish its decision with reasons — including where it declines to terminate.** A recommendation the Committee does not act on is not left open.

**The three outcomes and their thresholds:**

| Outcome | Threshold |
|---|---|
| **Terminate**, under 11.10 | Two-thirds, rounded up, minimum 3 |
| **Direct a recovery plan** under 11.9, setting the date it is reassessed | Simple majority, minimum 3 |
| **Decline** | Simple majority, minimum 3 |

**Where the matter is escalated.** Where the recommendation goes to MSIG under 12.6.1(3) or 9.1, the 15-business-day clock and the deemed-decline below are **suspended from the date of escalation**, and the freeze in points 1 and 2 **continues** while MSIG holds it. If MSIG does not act within the 30 days in 9.2, the recommendation is deemed declined and the freeze lifts. Without this, the clock would expire mid-escalation and payments would resume on an award MSIG might then terminate.

**If nothing carries.** If no outcome reaches its threshold within the 15 business days, the recommendation is **deemed declined**, the freeze in points 1 and 2 lifts, and the Committee publishes the vote counts and any reasons given. A split Committee cannot freeze an award indefinitely by failing to decide. The awardee remains contractually obliged to deliver and the reservation stands.

**Where a Committee member reviews the award.** A member engaged as Technical Reviewer under 12.6 **recuses from every vote concerning a termination recommendation on an award they are or were engaged to review** — the decision itself, any recovery plan directed in its place, and any vote to strike the recommendation. This holds **whether they filed it or the Manager did**, and **whether or not the engagement has since ended or been suspended**: either way their own assessments are the evidence, and on a strike vote it is their own conduct in issue.

At five filled seats, two-thirds of the remaining four is 3, so every outcome carries. **Where recusals of any kind leave fewer than four non-recused seats, the recommendation goes to MSIG** under 12.6.1(3) and 9.1, rather than turning on the unanimity of three.

**Striking an improper filing.** The Committee may, at simple majority with a minimum of 3, **strike a recommendation** filed by someone who was conflicted or who was not the Manager of record or an engaged Reviewer when they filed. Striking lifts the freeze immediately and is published with reasons. Nothing in this section limits the Committee's power to reassign an RFP under 12.3, and reassignment does not by itself withdraw a filed recommendation.

**Getting back to payment where the Committee declines.** A proposal cancelled under this section may be **re-proposed without a further award vote** once the freeze lifts. It carries a fresh delay window and, being a milestone or a previously decided disbursement, no new objection banding. Any 60-day clock under 10.10 is **extended by the length of the freeze**, since the delay was not the awardee's or VS LLC's doing.

**A recommendation is not a termination.** Only the Committee terminates. Neither the Manager nor the Reviewer may stop work, withhold delivered work product, **suspend the service, refuse a data export,** or tell the awardee the engagement is over.

**Making a recommendation in good faith is protected.** It is not a ground for ending or not renewing the Manager's or Reviewer's engagement, and a recommendation the Committee declines is not a mark against the person who made it. The fee is fixed and unaffected by the outcome either way, which is why it is fixed.

## 12. Program Managers and Technical Reviewers

**12.1** Both are outside contractors, **except where a Committee member is engaged as Technical Reviewer under 12.6**. The Committee **selects** them. **VS LLC contracts** them on the standard Independent Contractor Agreement, using the Schedule A at Exhibit F to MSIG #5, under a published rate card.

**12.2 Managers are a pool. Each RFP has exactly one Manager of record**, named and published with that RFP. One Manager may run several RFPs at once.

One Manager per RFP keeps milestone approval a single accountable decision. Many Managers across the program means a conflicted or unavailable Manager can be replaced on one RFP without stopping it.

**12.2a No Committee member may serve as Manager of record.** Not on any RFP, and not under any circumstances. There is no availability finding that unlocks it and **no MSIG waiver is available** — unlike the Vaulta Treasury exclusion in 2.4a, this is not a default that MSIG may waive at the Threshold. It sits in Part 1 and can be changed only by amending Part 1 under 16.2. Section 12.6 permits a member to review; it does **not** permit a member to manage, and the silence there is deliberate.

**If the two roles collide, the seat wins.** A person appointed to a Committee seat while holding a Manager of record engagement **ceases to be Manager of record on execution of that appointment**. The appointment itself is unaffected — holding a Manager engagement is not one of the conditions in 3.1 that makes an appointment ineffective, and eligibility for a seat is MSIG's decision, not VS LLC's. The Committee reassigns each of their RFPs under 12.3 within **5 business days**, and their Manager engagement terminates as to those RFPs.

The reason is that milestone approval is the one judgment in the program that the Committee deliberately does not make. Section 11.4 reduces the Committee's signature to five mechanical checks precisely because someone else has already decided whether the work was delivered. If a member held that decision too, the signature would be checking the member's own approval and the separation would be gone — and unlike the Reviewer case, there is no second gate behind it. A Reviewer's assessment still has to pass a Manager; a Manager's approval passes straight to signature.

So on every award, including one reviewed by a member under 12.6, **the milestone is approved by a Manager of record who is not on the Committee.**

**12.3 Reassignment.** The Committee assigns the Manager when it approves an RFP for publication and may reassign at any time by majority. Reassignment is published. The outgoing Manager hands over the approval history, correspondence, and open items in writing. The incoming Manager must have no conflict on that RFP.

**Where no unconflicted Manager is available**, the Committee records and publishes that fact and **escalates under 9.1**. MSIG may direct the engagement of a named Manager or another basis of approval. **Section 12.2a is not lifted in any case** — the answer to an empty Manager pool is a new Manager, never a member.

This is the one place the bar in 12.2a can leave nobody able to act: only a Manager may approve a milestone (11.1), and on a technical RFP reviewed by a member the Manager also writes the scored assessment (22.3). The Reviewer side has three fallbacks; this side has one, and it runs through MSIG.

**12.4 Workload.** The Committee tracks how many RFPs each Manager holds and reports it. A Manager holding too many will approve milestones on paperwork rather than on knowledge of the work.

**12.5 Neither role's pay may depend on** milestone approval, or on the size, number, or outcome of any award.

**12.6 A Committee member may serve as Technical Reviewer.** The pool of people who can competently assess Antelope code is small, and the person best placed to read it is often the Core Development seat holder. Excluding them would mean either no competent assessment or a less competent one bought from outside. So this is permitted — but expressly and on terms, not by silence. This section is the complete statement of those terms.

**It reaches the Reviewer role only.** A member may **never** serve as Manager of record (section 12.2a). Nothing below unlocks that, and the two roles are not alike: a Reviewer's assessment must still pass an independent Manager before any payment is approved, whereas a Manager's approval goes straight to signature with nothing behind it.

**12.6.1 Preconditions.** A member may be engaged as Technical Reviewer only where all of the following hold:

1. **MSIG has set both caps** — the per-cycle cap on Reviewer fees a member may earn, and the cap on concurrent engagements (**MSIG #5 Part H**; open item at Appendix C item 11). Until **both** are set, no member may be engaged. They are the only control on this arrangement and they should exist before the arrangement does;
2. the Committee has recorded that **no suitable unconflicted external reviewer was available**, minuted and published with the engagement;
3. **all five seats are filled.** An existing engagement is **suspended for the duration of any vacancy**.

   Where the suspended member is the **only engaged Reviewer on a published RFP or a live award**, the Committee shall engage a **substitute Technical Reviewer** for that RFP at the threshold in 5.3. The published statement under 20.2 records **that** a Reviewer is engaged, not who, so a substitute satisfies it — otherwise a single resignation would freeze an awardee's payments, or strand an RFP mid-evaluation, for a reason entirely outside anyone's control.

   **If no substitute is engaged:** for a published RFP not yet awarded, the **Manager of record writes the scored assessment** under 22.3 as though the member were still the only engaged Reviewer; for a live award, the affected **milestone goes to MSIG** under 9.1.

   **When the seat is refilled**, the member's engagement resumes — **unless a substitute was engaged**, in which case it resumes only if the Committee so decides at the threshold in 5.3. Absent that decision the substitute remains the engaged Reviewer for that RFP and the member's fee is prorated to work actually performed. Two engaged Reviewers on one RFP would leave no rule about which assessment governs;

   Every recusal below is costed against **five** filled seats. The recusal in 11.10a survives the suspension or ending of an engagement, because the member's assessments remain the evidence either way; **where it would leave fewer than four non-recused seats, the termination recommendation goes to MSIG under 9.1** rather than turning on the unanimity of three;
4. **no other member already reviews that RFP**, and the member is **within the cap** on concurrent engagements and on fees.

**12.6.2 The member recuses from the decision to engage themselves** — both the availability finding under 12.6.1(2) and the vote engaging them. They are the sole beneficiary of a finding only they are expert enough to contradict. Both decisions are taken at simple majority, minimum 3, on non-recused seats (section 5.3).

**12.6.3 What the member-Reviewer does not do on that RFP.**

| | Why |
|---|---|
| **Does not draft the acceptance criteria or milestone schedule** | Otherwise they judge delivery against a standard they wrote. The Manager of record or the At-Large member drafts them; the member may advise, on the record. Section 6.2 draws the same line for connected companies |
| **Does not score proposals** | Their technical input goes to the Committee as a **written note, not a score**. A member who both scores and votes has their judgment counted twice — once weighted in the evaluation, once as a vote — and rule 6 of section 27 would make their own score the thing the Committee needs a written reason to depart from. They also take **no part in the reconciliation of divergent scores** under 22.3, which would otherwise let them shape scores they may not produce. Where they are the only engaged Reviewer, the Manager of record writes the scored assessment (section 22.3) |
| **Does not vote on any termination recommendation, recovery plan, or strike decision concerning that award** | Whether the recommendation is theirs or the Manager's, they are a fact witness on the substance: their own assessments are the evidence either way. Two-thirds of the remaining four seats is 3, so every outcome still carries |
| **Does not vote on, or sign, the payment of their own fee** | Section 13.3a |

**12.6.4 What they still do.** They **keep their award vote** on that RFP — the fee is a fixed rate-card figure, unaffected by who wins, and removing the portfolio expert from the award decision would defeat the point of having portfolios. They **may sign the milestone payment** on an award they reviewed: the third check in 11.4 confirms an assessment is *present*, not that it is right, and the three other signers make that check independently. Barring their signature would put every technical milestone payment permanently at zero margin under the 4-of-5 permission.

**12.6.5 Pay and disclosure.** The fee is the **published rate card amount at Exhibit B to MSIG #5**. The rate card is set by MSIG and is **not within the Committee's gift**, so there is no rate to negotiate and no rate-card vote to recuse from. Every engagement and every fee is listed in the cycle report by member and by RFP (section 13.5), and the member **files an update to their disclosure questionnaire before the engagement begins** — not within the usual 10-business-day window, since the engagement itself is the thing being disclosed (section 6.3c).

**12.6.6 One thing this decides that the working group has not.** MSIG #5 Part H sets member pay equal across all five seats and defers the question of whether category leads should earn more. Reviewer fees sit outside that retainer, so allowing them makes pay unequal in practice, and in favour of whichever seat does the technical reviewing. That may well be the right answer — but it should be chosen, not discovered. That is what the two caps in 12.6.1(1) are for.

## 13. Money: ceiling, reservation, reporting

**13.1 Limits and funding periods.** MSIG sets the **Cycle Ceiling**, the **Per-Award Limit**, the **cycle length**, and the **program scope**. The Cycle Ceiling is a maximum, not a target. Unspent amounts do not carry over.

**Funding is authorized four cycles at a time**, covering one year — the **authorized funding period**. Funds are transferred quarterly under that single authorization, each instalment topping the Program Account up to **the level set in MSIG #5 Part I** — a margin above the coming cycle's Total Program Spend, held because commitments are in USD while the account holds A, and not available to commit against. Forward commitments are not added on top, because they already sit inside that cycle's Cycle Ceiling.

**Block producers may change any amount, the cycle length, or any limit at any time** by MSIG Resolution, and may stop, reduce, or re-time any instalment. Authorizing a year at a time is a convenience, not a commitment that binds them for the year.

**The first cycle begins on the day funds arrive in the Program Account**, not on the day MSIG #5 passes. Committee pay accrues from the later of contract signature and that date. The Committee publishes the funding date on the Portal, because **four** periods are counted from it: the cycle, the pay period, the initial terms of the four MSIG-appointed seats (section 3.4), and the nine-month self-review (section 16.1). The Community seat is the exception throughout — a Community member seated by MSIG runs from execution (section 3.4), as does the interim holding in 4.5.

**13.2 Reservation.** An award **reserves** its full **USD** amount against the Cycle Ceiling from the moment of decision, through publication, contracting, the delay window, and any MSIG confirmation. Reservation is not payment. No money moves until an agreement exists and the delay ends. But the amount is unavailable to other awards in the meantime.

Without this the Committee could commit past the ceiling while every payment sat unexecuted.

**Awards running longer than one cycle.** The **Per-Award Limit applies to total contract value across the whole term**, not to what is payable in one cycle. A service at USD 7,000 a month for twelve months is a USD 84,000 award.

For such an award, only the amount **payable in the current cycle** is reserved against the current Cycle Ceiling. The rest becomes a **forward commitment**, which:

- automatically reduces the available ceiling in each future cycle it falls into;
- is listed in every cycle report, by award, showing the amount landing in each future cycle;
- counts towards the coverage test in section 13.4 for amounts falling due before the next expected transfer.

**An award extending beyond the end of the authorized funding period is a reserved matter** (section 9) and needs an MSIG Resolution. An award may span cycles inside that period under the mandate, with its value recorded as a forward commitment against the cycles it falls into.

This protects the awardee. A team signing a twelve-month agreement at the start of a funding year is contracting against funding block producers have already authorized, not against a future decision. It also means long awards are best started early in a funding period — one proposed late in the period will need to be shorter, or escalated.

Recurring service awards — history APIs, snapshots, and similar infrastructure — are the expected use of this. Structure them as **Service awards** under 20.2a, with **a fixed term after which the service is re-competed** rather than one long term, so the Network can re-compete a service instead of inheriting it — and so the operational handover set is contracted for from the start — a service the Network cannot migrate away from is one it will renew forever whether or not it is still the best available.

A renewed service is a **new award**: a fresh RFP under Part 2, a fresh Committee decision at the award threshold, and a fresh reservation. It is not an extension of the old agreement, and section 11.8's bar on increasing an award applies to the old one regardless. The incumbent may bid and may well win — the point is that they have to.

**13.3 Release.** A reservation is released when the award ends, expires, is cancelled by block producers, is terminated as to unearned amounts, is contracted for less than reserved, or — for a bounty — **lapses unclaimed under 26a rule 5**. It is **not** released while MSIG confirmation is still pending, and it is **not** released by a termination recommendation under 11.10a — only by the termination itself.

A released amount returns to the ceiling of the **cycle in which the release occurs**, not the cycle the reservation was made in.

**13.3a Paying Program Costs.** Committee pay, Manager and Reviewer fees, Portal and administration costs are paid from the Program Account like this:

1. the Committee approves a **published payment schedule** once per cycle — simple majority, minimum 3 — listing each recipient, amount, and cadence;
2. individual payments under it are signed **4 of 5** and carry the **same delay** as any other disbursement;
3. **no objection banding applies**, because the schedule was published in advance and the amounts are fixed;
4. every payment appears in the cycle report, with cumulative Program Costs against the cycle allocation.

A payment not on an approved schedule needs a fresh Committee approval at the same threshold and its own published record.

**Reviewer fees payable to a Committee member** under section 12.6 are approved as a separate line and **paid on a separate payment** from the rest of the schedule — **one payment per member-Reviewer**, never a combined one. Each is signed by the other four. The member recuses from their own schedule line and from signing their own payment only.

One payment each, not one payment for all of them: if two members held engagements and their fees shared a payment, both would recuse and only three could sign, and a 4-of-5 permission cannot be met by three. Splitting per member also confines each recusal to one small payment per cycle instead of putting every Program Cost payment at zero signing margin.

**The retainer needs no such treatment.** All five members vote on and sign the line paying their own **retainer**, because that figure is set by MSIG at Part H, identical for every seat, and nothing the Committee does can change it. A Reviewer fee is different in kind: it varies with engagements the Committee itself awards.

**13.4 Denomination and price movement.**

**Everything is denominated in USD. Everything is paid in A.** The Cycle Ceiling, the Per-Award Limit, every award, every reservation, Committee pay, and operating costs are all USD figures. The Program Account holds A.

The amount of A paid against a milestone is calculated **at the time the milestone is approved**, using the **Delphi Oracle** (`delphioracle`) — the on-chain price oracle operated by block producers.

The rate is the **`median` field of the `datapoints` table**, scoped to the **`eosusd`** pair. The contract computes it as the median of the last 21 submissions from qualified oracles, so moving it requires collusion by a majority of the oracle set. It is supplied by **no party to the transaction** — not the Committee, not VS LLC, not the awardee.

**How the number converts.** The oracle stores prices as integers. The actual price is `median` ÷ 10^`quoted_precision`, and for `eosusd` the precision is **4** — the stored integer is in ten-thousandths of a dollar.

| Step | Example |
|---|---|
| Oracle `median` | 766 |
| ÷ 10^4 | USD 0.0766 per A |
| Milestone amount | USD 10,000 |
| A payable, truncated | ⌊1,000,000 × 10^6 ÷ 766⌋ = 1,305,483,028 A-units = **130,548.3028 A** |

**The calculation is done in integer arithmetic and truncated:**

**A-units = ⌊ USD-cents × 10^6 ÷ median ⌋**, where one A-unit is 0.0001 A.

Truncation is used because it needs no tie-breaking rule, it is the default of integer division in most languages, and it can never pay more than was reserved. The largest possible difference between rounding rules is 0.0001 A — under one hundredth of a cent. The rule is specified for **reproducibility, not materiality**: the platform, the awardee, and any later auditor must reach the same integer, and floating-point arithmetic is the real hazard, not the choice of rule.

**A note on granularity.** Because the precision is fixed at 4 decimals of a dollar, the smallest step the oracle can express is USD 0.0001. At around USD 0.0766 that is about 0.13% of the price, which is immaterial. If the price of A fell substantially, the same absolute step would become a larger share of it, and the rounding error on a payment would grow with it. The Committee should note this in the cycle report if it becomes material.

Three practical consequences follow from how the contract works:

| | |
|---|---|
| **It is near-real-time, not an average** | The oracle publishes no time-weighted average. This matters less than it sounds: awards are in USD, so an awardee receives their contracted value whatever A is doing. The volatility lands on the program's A outflow, which the coverage test and margin already manage |
| **It keeps no history** | Only 21 rows exist per pair and the oldest is overwritten on each submission. A rate read today cannot be re-read from the table later, so **the approval record must capture the oracle value, the block number, and the transaction id** of the read. That is what makes the figure provable afterwards |
| **A read never fails, even when the data is old** | The contract holds 21 rows from the moment a pair is created and modifies them in place. It never empties and never errors. If oracles stopped submitting, a read would still return a `median` — just an old one. The timestamp is the only thing that distinguishes a live price from a frozen one |

**Two checks on the rate, both handled the same way.** Neither blocks a payment outright — each moves the decision from the Manager of record to the Committee, which may approve **at the threshold in 5.3** with the fact recorded, or defer. The Committee is approving the rate, not re-judging the work (5.5).

| Check | Trigger | Why |
|---|---|---|
| **Staleness** | Newest datapoint older than **24 hours** | A frozen oracle underpays or overpays without any error to catch. Note the collar below will not detect this — if the oracle froze before both reads, the two rates agree perfectly |
| **Collar** | Approval rate differs by more than **15%** from the rate used at the **previous payment under that award** — or, for the first payment, from the rate recorded at the award decision | Catches a momentary spike or crash. Measured against the previous payment rather than the award decision, so that ordinary drift across a long engagement does not send every late milestone to the Committee |

The timestamp of the newest datapoint is **recorded and published with every approval**, whether or not it triggers the check. That costs nothing and makes the age auditable after the fact.

A halt would be the wrong response to a quiet oracle: awardees would go unpaid for something entirely outside their control. Escalation forces a conscious decision instead, on the record.

The Exhibit D configuration published by VS LLC under MSIG #5 confirms the pair, precision, and a worked example. The pair is `eosusd` and its `quoted_precision` is 4.

**13.4a If the Reference Source fails.** The two checks above handle a rate that is *wrong*. This handles a rate that is *gone* — the pair renamed, the contract redeployed or deprecated, the oracle set wound down.

**Payments suspend** from the moment the Reference Source becomes unavailable until one is in force again. There is no way to compute an A amount without a rate, and no rate is inferred, carried forward, or supplied by anyone to the transaction.

**The Committee restores it, not MSIG.** An outage is a technical failure with no policy content, and a program that had to wait for a 15-of-21 vote before it could pay anyone would leave awardees unpaid for a failure entirely outside their control. Two paths, and the difference between them is whether anything is actually being chosen:

| Path | When | Threshold |
|---|---|---|
| **Technical continuity** | The same price data remains available under a changed name — pair renamed, contract redeployed to another account, `quoted_precision` altered | Simple majority, minimum 3. Recorded, not chosen |
| **Replacement source** | The data is genuinely gone and a different source must be used | **Two-thirds, rounded up, minimum 3** — the award threshold |

**A replacement must meet all five tests**, which are the properties that made the Delphi Oracle acceptable in the first place. A source failing any of them may not be designated:

1. **on-chain and publicly readable**, so anyone can recompute any payment from it without permission;
2. supplied by **no party to the transaction** — not the Committee, not VS LLC, not any awardee or proposer;
3. derived from **multiple independent submitters**, none able to move the published figure alone;
4. carrying a **datapoint timestamp**, so the 24-hour staleness check keeps working;
5. expressing a **USD price of A at a stated integer precision**, so the truncation formula is unchanged.

**What this power does not reach.** The Committee may change **where the rate is read from** and nothing else. The USD denomination, the payment in A, the conversion formula, and the truncation rule are the *denomination convention* and remain reserved matters under section 9. Section 9's entry is drawn accordingly.

**What is published.** The designation goes on the Portal with the Committee's reasons and the vote **by name and on-chain account, before any payment is made on it**; it is written to the decisions register under 7.6a; it is **reported to MSIG within 5 business days as notice, not for approval**; and VS LLC republishes Exhibit D describing the source actually in use, with a fresh worked example.

**Block producers keep every control over the result.** They may cancel any payment made at the new rate during its delay window at the Threshold, may direct a different source by MSIG Resolution at any time, and may suspend or revoke the mandate. This section restores the program's ability to pay. It does not put the rate beyond their reach.

**The first payment under each award after a designation is approved by the Committee** at the threshold in 5.3, not by the Manager of record alone, whatever the collar shows — and the collar on that payment measures against the rate last used under that award on the previous source. A change of source is exactly when a mispriced rate would pass unnoticed, the collar otherwise having nothing comparable to measure against.

RFP budgets, award decisions, and approval records are stated in **USD**. The A amount and the rate used are recorded at each payment.

**The program carries the price risk, not the awardee.** A team contracted for a USD amount receives that USD value at every milestone, whatever A has done since. This is deliberate: awardees budget in fiat, and making them absorb A's movement across a multi-month engagement would produce padded bids and fewer good teams bidding.

**Coverage.** Because commitments are in USD and the account holds A, a fall in the price of A reduces what the program can pay. So:

| Rule | |
|---|---|
| **Before every award** | Confirm the A balance, at the Reference Rate, covers all outstanding Award Commitments and Program Costs **falling due before the next scheduled instalment**, plus the proposed award, **with at least the Coverage Margin** (Appendix B). An award failing this test cannot be made and is a reserved matter under section 9 |
| **Every cycle** | Report outstanding USD commitments, the A balance, the rate used, and the resulting coverage percentage |
| **If coverage falls below the Coverage Margin** | Stop awarding. Notify MSIG within **5 business days** and request a top-up. Milestones under existing agreements continue to be paid while funds allow |
| **If A rises** | Report the surplus. It is not swept at cycle end — it reduces the next quarterly instalment, and any final balance is returned at the end of the funding period (section 14.6) |

**Two things the table above does not settle, and both bite in exactly the situation it describes.**

**When awarding resumes.** The stop is entered automatically — coverage is arithmetic — but it is **lifted only by a recorded Committee decision**, at simple majority with a minimum of 3, once coverage is back above the Coverage Margin. It does not lift on its own when the price of A recovers. Automatic resumption would have the program flickering in and out of a stop with every price movement, and would let an award be made on a rate that re-breaches the floor days later. Entry is arithmetic; exit is a decision, on the record, in the minutes.

**What "while funds allow" means at the boundary.** A milestone that has been approved but which the balance cannot cover **is not paid in part.** Partial payment would break the milestone structure, the acceptance criteria, and the recovery clause in 23.3, all of which treat a milestone as a single unit. Instead the approval stands, the amount stays reserved, the matter is escalated under 9.1 with the top-up request, and it is paid in full when funds arrive. The exception in 9.2 is what makes that safe: a milestone under an executed agreement is not deemed declined by MSIG inaction, so the awardee's claim does not expire while the Network sorts out its funding. Where more than one approved milestone is waiting, they are paid **in order of approval**.

**Awardees are told.** Where a milestone is approved and unpaid for want of funds, the awardee is notified and the position is published with the approval record. An awardee who has delivered should not discover a funding problem from the absence of a payment.

**A change in the A amount paid is not a top-up** — it is the peg working. But the **USD amount of an award may never be increased past the Per-Award Limit**, and any increase in a USD award amount needs the award threshold, a contract amendment, publication, and a fresh proposal and delay (section 11.8).

**13.5 Cycle report.** Published on the Portal and sent to MSIG each cycle:

- RFPs published and proposals received;
- every award, with amount, **each member's vote — for, against, or recused — by name and on-chain account**, and transaction reference;
- **awards for work on the RFP system itself**, flagged as self-referential, with the cycle total (section 15.2b);
- **Program Account opening and closing balances**, reconciled to the chain;
- total reserved and committed against the Cycle Ceiling, and what remains;
- objections by block producer, and outcomes;
- payments cancelled, and awards ended or expired, and why;
- milestones approved and rejected, **each with the approving Manager and any Reviewer by name and account**, and the signing members by name and account; terminations;
- committed against actually paid;
- **post-award reviews written under 25.2**, and any that are overdue;
- spending by category against the planned shares;
- **bounties recorded as sole-source under 26a rule 14**, listed separately with their reasons;
- **spending by channel — directed RFPs, open call, bounties — as amounts and as shares of the Cycle Ceiling.** There are no sub-limits between the three, so this breakdown is how drift becomes visible. Where bounties exceed **25%** of the awards committed in a cycle, the Committee states why. That is a comply-or-explain trigger, not a cap: block producers can change any limit at the Threshold at any time, and the number they need in order to decide is this one;
- matters escalated to MSIG and their outcomes;
- RFP load per Manager, and any reassignments;
- **every Technical Reviewer engagement held by a Committee member and every fee paid**, by member and by RFP, with each member's cumulative total against the per-cycle cap (section 12.6);
- disclosure questionnaires filed, updated, or overdue, with the on-chain transaction for each.

**13.6** Because the Program Account is on-chain, anyone can audit it directly. The cycle report explains and reconciles; it is not the only record.

## 14. Expiry, suspension, revocation

**14.1** The mandate **runs until MSIG suspends or revokes it**. It has no end date.

The recurring point of block producer control is **funding, not authority**. Funding is authorized four cycles at a time, so the Committee can only ever spend what block producers have authorized. Declining to authorize the next period needs no confrontation and no revocation vote, and any instalment inside a period can be stopped or reduced at the Threshold.

**14.2** MSIG may **suspend or revoke** the mandate at any time, without cause, and may rebuild the Committee permission through the owner permission.

**14.3 Annual review.** The Committee publishes an annual review of the program: awards made, outcomes, conflict incidents, coverage history, and whether the limits remain appropriate. This is the scheduled moment at which performance goes on the record, whether or not anyone calls a vote.

**14.4** When the mandate ends, by suspension or revocation:

| Status of an award | What happens |
|---|---|
| Agreement signed | Continues. Remaining milestones are still paid |
| Payment still in its delay window | Cancelled |
| Decided but no signed agreement | Cannot proceed |

**14.5 Someone must still be able to sign.** Paying the surviving agreements needs 4 signatures. The resolution that ends the mandate must either keep the Committee permission alive for those payments only, or instruct block producers to build a replacement permission. Ending the mandate without doing one of these leaves the Network owing money it cannot pay.

**14.6 Unspent funds** do not carry into the next funding period. At the end of a funding period, the balance remaining after all contracted obligations are met is returned or swept through the owner permission as MSIG directs. Nothing is swept at the end of an individual cycle — the quarterly top-up assumes a carried balance.

## 15. Relationship with the Trustee and VS LLC

**15.1 The Trustee** acts only as an executor and has **no role in the RFP program**. No program funds pass through the Trust.

**15.2 VS LLC** does the program's contracting and administration: it contracts with awardees, Managers, Reviewers, and Committee members using the standard Independent Contractor Agreement, and runs the Portal.

**Funds sit outside the Trust; work product sits inside it.** Program money is Network money in `rfp.vst`, not Trust Property. But **work product vests in the VST** under section 9 of that agreement. This is deliberate rather than inconsistent: holding intellectual property for the Network is an express purpose of the Trust, while allocating Network funds is not.

**What "work product" *is* depends on the award's shape** (section 20.2a) — but it always vests. A Deliverable award vests what was built. An Embedded award vests the named deliverable and carves out the awardee's identified pre-existing IP. A Service award vests the **operational handover set**, which is what a successor provider needs to take the service over. The shape narrows the definition; it never disapplies section 9.

VS LLC does not choose awardees, does not vote, and does not control the Program Account. The Committee does not manage VS LLC.

**15.2a The RFP platform belongs to the Network, through the VST.** The Portal and the RFP system's code are **VST-owned work product** — the same rule as any Deliverable award (20.2a), applied to the program's own tooling. VS LLC **operates** it; it does not own it. Where the code was written before this Framework it was **not** written under an agreement that vests it — there was no Independent Contractor Agreement and so no section 9. **Moving a repository is not an assignment of copyright.** Two things therefore complete the transfer: a **written assignment of copyright** from every party that authored it in favour of the VST — or, failing that, a perpetual, irrevocable, sublicensable licence — and **transfer to a VST-controlled repository**. EOS Rio has committed to both. They matter because the VST cannot release the code under 20.2a's default licence unless it holds the rights to release, and because an assignment is what still shows chain of title years later, when the people who agreed it have moved on.

This matters for the same reason section 25.1 refuses a link to an awardee's repository as delivery: a program whose own tooling sits in someone else's account is one bad week away from having no tooling.

**15.2b The Committee may fund work on the RFP system itself**, through the ordinary process — a published RFP, a Committee decision at the award threshold, a contract, a delay, and a signature. It is **categorized to Core Development** and counts against the **Cycle Ceiling** like any other award. Nothing about it being the program's own tooling exempts it from the process the program applies to everyone else.

**VS LLC may not bid on work on the RFP system**, nor may any entity connected to it. **Section 6.2 applies as if references to a member were references to VS LLC** — an entity under common control with it, one in which it holds a material interest, or one holding a material interest in it. **MSIG may lift this bar at the Threshold with published reasons**; unlike 12.2a it is a default, not an absolute. VS LLC operates the system, holds its code and deployment access, contracts with the awardee, runs the Portal the RFP is published on, performs the 15.3 refusal check, and holds the key that records the decision. On this one class of award it sits on every side at once, and section 6 does not reach it — section 6 is written about members, Managers, and Reviewers. Where the Committee considers no other capable provider exists, the award is a **reserved matter under section 9**.

**Where the line falls.** Building, extending, or materially reworking the system is an **award**. Keeping the existing system running unchanged — hosting, domains, certificates, monitoring, backups, administration — is an **operating cost** under 13.3a.

**The test is whether the engagement changes what the system does**, not whether it produces work product. A work-product test would fail: under 20.2a a Service award's work product is the operational handover set, and routine hosting generates exactly that, so the test would classify the clearest operating cost as an award.

**The Committee makes the classification by recorded vote** — majority, minimum 3 — not VS LLC. VS LLC is the party being paid on one side of the line.

Every such award is flagged as **self-referential in the cycle report** — not because it is improper, but because a program that spends steadily on itself should have to look at that number each cycle.

**15.3 VS LLC must refuse to contract** on a Committee decision that is plainly outside the mandate, above the Cycle Ceiling or Per-Award Limit, or missing a complete record. This is a check on authority, not on quality. VS LLC tells the Committee and MSIG in writing why it refused.

**15.4 Block producers** set the limits, seat and remove members, decide escalated matters, hold the owner permission, and may cancel any payment at the Threshold during its delay. They do not vote on individual awards.

## 16. Reviews and amendment

**16.1** The Committee publishes a written self-review **9 months after the funding date** — not from the execution of MSIG #5, which is the anchor for the different nine-month period in 4.5. The two are the same length and run from different dates on purpose: 4.5 runs from execution so ECF's process is not held up waiting for the program to be funded, while this review measures the program, which does not exist until it is funded. The review covers RFP throughput, results, conflict incidents, and whether five seats is working.

**16.2** This Framework may be amended by MSIG. The Committee may propose amendments by two-thirds, minimum 3. **Part 2 may be amended without reopening Part 1.**

---

# PART 2 — RUNNING AN RFP

## 17. What the program does

The Network states what it needs, publishes that need, invites competing proposals, awards against published criteria, and pays against delivered milestones.

This is an RFP program, not a grants program. In a grants program, applicants propose what they want to build. Here the Network says what it needs. The Committee's central job is **deciding what should become an RFP**.

## 18. Stage 1 — Collecting needs

**18.1 Who can submit.** Block producers, Committee members, the Trustee and LLC Manager, ecosystem teams, and the community.

**18.2 What a need looks like.** The problem, who it affects, what happens if nothing is done, what has been tried, and a rough sense of size.

**A need is not a solution.** "We need faster finality" is a need. "Fund team X to build module Y" is a proposal in disguise and is returned to the sender.

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

**19.2 Category shares.** Each cycle sets indicative shares by category, covering **both the directed program and any open call**. They are guidance, not limits. The Committee may depart from them with a recorded reason. The purpose is to make imbalance visible.

**19.3 Output.** A published shortlist of what becomes an RFP this cycle and what is deferred.

## 20. Stage 3 — Writing and publishing an RFP

**20.1** The portfolio holder sponsors the draft — except where they are engaged as Technical Reviewer on that RFP, when 12.6.3 applies and someone else drafts the acceptance criteria and milestone schedule. A Manager of record is assigned when the RFP is approved for publication, and may be assigned earlier to draft it. On technical RFPs, Technical Reviewers may advise on feasibility and realistic budgets.

**20.2 Every published RFP must contain:**

- title and category;
- background and the problem;
- scope — what is included and what is excluded;
- deliverables, specific enough to inspect;
- acceptance criteria for each deliverable;
- milestone schedule;
- **budget ceiling** — published, not hidden;
- timeline: submission deadline, question period, evaluation period, target award date, delivery deadline;
- **evaluation criteria and weights**, published before submissions open;
- eligibility and conflict rules;
- **award shape** — Deliverable, Service, or Embedded (section 20.2a);
- IP and delivery terms (section 20.2a): what vests in the VST, and — on any shape — what is expected to be **carved out as pre-existing IP**; **for Deliverable and Embedded awards**, the **licence mode** — Required (with the licence named), Proposer's choice (with the permitted set), or Default — under 20.2a; **for Service awards**, the **service levels**, the **term**, and the contents of the **operational handover set**;
- decision timeline: award date, contracting step, delay window, expected first payment;
- submission format and channel;
- named **Manager of record** and contact, and **whether a Technical Reviewer is engaged**.

**20.2a Award shape, work product, and licence.** Not every award produces a thing that can be handed over. Three shapes exist, and **every RFP declares which one it is, at publication, and the declaration is fixed like the Reviewer statement.** Everything downstream — what the agreement must contain (23.3a), what closing means (25.1), what the Network actually owns — follows from it.

| Shape | What it is | What the work product is |
|---|---|---|
| **Deliverable** | New code, designs, research, or content built for the Network | **What was built**, released under the licence recorded in the award decision under 23.2 — the one the RFP required, the one the awardee offered from the permitted set, or the applicable default under 20.2a |
| **Service** | A hosted or operated service — history APIs, snapshots, indexers, monitoring | **The operational handover set, and nothing else**: configuration, deployment tooling, runbooks and operating documentation, and an export of any Network data the service holds, in a documented format. The running service itself is performed, not delivered |
| **Embedded** | New work built inside software the awardee already owns | **The named deliverable, excluding identified pre-existing IP** — with an **irrevocable licence back, surviving termination**, over any pre-existing IP embedded in it, wide enough for the Network to use, modify, and have others operate the deliverable |

**Work product is always defined, never switched off.** Every agreement vests work product in the VST under section 9. The shape does not disapply that clause — it says **what the work product is** for this award. A Schedule cannot turn off a clause it sits under, and trying would put the whole vesting arrangement in doubt.

**Why the Service shape needs its own definition.** A hosted service has no built artifact to hand over, so vesting "the deliverable" is meaningless. But the configuration, tooling and runbooks are real work product, and the Network needs them outright — it must be able to **re-compete the service**, which section 13.2 assumes it will do, and a successor cannot run what it may not copy or modify. Vesting the handover set is what makes that possible. A service the Network cannot migrate away from is one it will renew forever whether or not it is still the best available.

**Why the Embedded shape needs a carve-out.** An awardee improving their own product cannot assign their whole product, and a vesting clause read literally would demand it. The carve-out names what actually transfers. The **licence back matters more than the ownership** — owning a deliverable the Network cannot lawfully run, because it depends on the awardee's surrounding code, is worth nothing.

**Default licences.** Code is released under **Apache-2.0**; everything else — designs, research, curricula, written and media content — under **CC-BY-4.0**. Apache-2.0 rather than MIT because it carries an express patent grant, which matters where the Network funds infrastructure others will build on. Three of the five portfolios produce non-code deliverables, so the second default is not an edge case.

**Licence mode.** Every **Deliverable and Embedded** RFP declares one of three, **at publication**:

| Mode | Effect |
|---|---|
| **Required** | The RFP names the licence and it is binding. A proposal offering anything else is **non-compliant at the screen** (22.2) |
| **Proposer's choice** | The RFP names a **permitted set** and the proposer picks from it in their proposal. The licence they name becomes a term of the award. A proposal naming a licence **outside the set, or naming none, is non-compliant at the screen** (22.2) |
| **Default** | Silence. The defaults above apply |

**A Service award declares no licence mode.** Its work product is the operational handover set, which **vests outright** — the Network owns it and may modify it and give it to a successor (20.2a, 23.3a). There is nothing to licence, and the default licences do not apply to it.

**Who decides what.** The **Committee decides the mode and, in Required mode, the licence** — at the publication threshold, in the RFP, not later and not by the awardee. Where the Committee opens the choice, it still decides the **permitted set**; a proposer never picks from the whole universe of licences.

**The set is decided per RFP. There is no standing list.** It is named in the RFP at scoping, alongside the mode, because the right set depends on the work: a library other teams will embed argues for permissive licences only, while a standalone end-user tool can tolerate copyleft without spreading the obligation. A single published list would have to be drawn wide enough for the loosest case and would then be too wide for the tightest.

**Stating the set is part of publishing in this mode.** An RFP in Proposer's choice mode that names no set is defective. Where one is nonetheless published, the set falls back to **permissive licences only**: for code, **Apache-2.0, MIT, or BSD-3-Clause**; for non-code, **CC-BY-4.0 or CC0-1.0** — the proposer selecting from the branch matching the deliverable. That is a backstop against a drafting slip, not an alternative to naming the set. A copyleft obligation on Network infrastructure is a decision the Committee should take deliberately, not inherit from a proposal.

**What locks when.** The **mode, the permitted set, and — in Required mode — the licence named** all **lock at publication**, like the shape and the Reviewer field. Teams price against them. In Proposer's choice mode the **licence itself is fixed at the award decision** and recorded in the agreement; there is nothing to lock at publication because there is nothing yet to lock.

**Licence as a scoring factor.** In Proposer's choice mode the Committee may treat the licence offered as an evaluation criterion, **but only if "licence offered" is published as a criterion in its own right, with its own weight, before submissions open** (22.1). Where it is not, the licence may not influence scoring — otherwise the choice is a trap.

**The standing "ecosystem fit, openness, maintainability" criterion in 22.1 does not by itself permit the licence to be scored.** It is too easy to read openness as covering the licence, mark a proposal down for choosing the least open option in a set the Committee itself published as acceptable, and call that a published criterion. To score the licence, name it and re-publish the weights.

**Departures from the default** in Required mode are stated in the RFP with the reason.

**The shape cannot change after publication.** Like the Reviewer statement, it is fixed at publication and not reopened at contracting, at signing, or by a change under 11.8. If it was wrong, the remedy is the next RFP.

**Closed-source deliverables.** Where a deliverable **cannot be released as usable open source** — because it only runs inside the awardee's product — the RFP must say so **at publication** and state what the Network gets instead: a licence, a service commitment, a source escrow, or a combination. An RFP that is silent is an open-source RFP. This is settled at scoping, on the record, so nobody discovers it at contracting.

**Such an RFP is published in Required mode**, and the licence named is the licence to the Network stated in the alternative. **Default and Proposer's choice are unavailable on it** — both resolve to an open-source release, which is the one outcome the RFP has already said is impossible.

**The Reviewer statement is fixed at publication.** Like the evaluation criteria and weights, it cannot be changed once proposals may be submitted. It settles for the whole life of the award whether an assessment is required at each milestone and at each signature (sections 11.2, 11.4). Teams price and scope against it, so changing it afterwards would change the deal. If the Committee gets it wrong, the fix is the next RFP, not this one.

**20.3 Publish the budget in USD.** Hidden budgets make teams guess, and reward those with inside information. A published ceiling moves the competition to scope and quality.

**20.4 Approval to publish.** Majority, minimum 3. Before publishing, the Committee confirms the expected award fits within the Per-Award Limit and the remaining Cycle Ceiling. If an escalation to MSIG will be needed, get it before publishing, not after proposals arrive.

**20.5 Minimum open period.** 21 days normally. 10 days for small or urgent RFPs with a recorded reason. Short windows favour teams who knew in advance.

## 21. Stage 4 — Questions and submissions

**21.1** The RFP is published on the **Portal**, which is the canonical venue. Anything published elsewhere mirrors the Portal. The Marketing portfolio holder is responsible for reach. An RFP only two teams see is not a competition.

**21.2 Questions.** All questions go to the Manager of record through the published channel. **All questions and answers are published to everyone**, without naming who asked. No private guidance of any kind.

This is the single most effective rule against favouritism in the program.

**21.3 Changes.** Material changes to scope, budget, or deadline are published as numbered amendments, and the deadline extends by at least 7 days.

**21.4 Late submissions** are rejected, with no exception unless the submission channel itself failed and that is documented.

## 22. Stage 5 — Evaluation

**22.1 Criteria and weights are fixed before submissions open** and cannot change afterwards. Default weights:

| Criterion | Weight |
|---|---|
| Technical approach | 30% |
| Team capability and track record | 25% |
| Cost realism and value | 20% |
| Timeline and milestone structure | 15% |
| Ecosystem fit, openness, maintainability | 10% |

Weights may differ by category, but the version used must be published with the RFP.

**22.2 Compliance check.** The Manager first checks completeness, eligibility, conflicts, and **licence compliance with the RFP's licence mode** (20.2a). Non-compliant submissions are rejected with a written reason. This check involves no judgment about quality.

**22.3 Scoring.**

- **RFPs whose published statement says a Reviewer is engaged:** Technical Reviewers score independently and in writing. They do not see each other's scores before submitting. They may discuss afterwards to resolve large differences, and the discussion is recorded.
- **RFPs whose published statement says one is not:** the Manager of record writes the assessment, in the same format, against the same published criteria.
- **Where the only engaged Reviewer is a Committee member** (section 12.6): the **Manager of record writes the scored assessment** against the published criteria, informed by but not bound by the member's written note. The note is published alongside it. Without this limb a technical RFP reviewed by a member could never be awarded, because the member may not score and nobody else would be scoring.

In every case a written assessment against published criteria must exist before any award.

**22.4 Committee discussion.** The Committee receives the scores and reasoning, discusses, records recusals, and may interview shortlisted proposers — provided every shortlisted proposer gets the same opportunity and the same questions.

**22.5 Departing from the scores.** The Committee may award to a proposal that did not score highest, but must publish a written reason. Under a mandate there is no public approval debate, so this written reason is the only account of the decision anyone outside the room will see.

**22.6 Too many recusals.** If fewer than three non-recused members remain, or fewer than four can sign, the award goes to MSIG with the written scores and a statement of the recusals. In an ecosystem this size that will happen sometimes. It is normal, not a failure.

**22.7 No good proposals.** The Committee may decline to award, change the scope, and republish. Awarding weak work because a budget exists is worse than not awarding.

**22.8 Negotiation.** Limited clarification with the preferred proposer is allowed **before** the award decision, and what is agreed goes into the decision record. **Clarification may not change the licence offered** under a Proposer's choice RFP — the licence named in the proposal is the one that becomes a term of the award. Otherwise the Committee could obtain by private clarification what 20.2a forbids it to obtain by scoring. Changes after the decision follow section 11.8.

## 23. Stage 6 — Award and contracting

**23.1** The award decision, publication, contracting, on-chain proposal, delay window, and payment follow **Part 1, sections 10 and 11**. That sequence is not repeated here.

**23.2 The decision record must state:** awardee, scope, **award shape** (20.2a), **the licence — the one required by the RFP, the one the awardee offered where the choice was open, or, in Default mode, the applicable default stated expressly**, total amount, milestone schedule and amounts, **each member's vote — for, against, or recused — by name and on-chain account**, any reason for departing from the scores, and the **oracle `median`, block number, transaction id, and newest-datapoint timestamp read at the decision** — the collar in section 13.4 measures against it. An incomplete record cannot go to contracting.

**23.3 Every awardee agreement must:**

- be the standard **VS LLC Independent Contractor Agreement** with an award-specific Schedule A, under which **work product — as defined for the award's shape under 20.2a — vests in the VST** (section 9);
- state the milestone schedule, acceptance criteria, and amounts, **matching the published decision exactly**;
- **depend on the on-chain payment clearing its delay**, with no liability on either side if it is cancelled;
- allow termination for non-delivery and for cause, with a period to fix problems;
- include a **recovery clause** for money paid against milestones later found undelivered or misrepresented, enforced by VS LLC — on-chain payments cannot be reversed, so milestone sizing is the real protection;
- require disclosure of any other Network funding for the same work;
- state the award value in **USD**, the **verified receiving account** for payment in A, and that each milestone is paid in A calculated at the reference rate on the date of approval;
- confirm the awardee is an independent contractor, not an agent of the Network, the Trust, or VS LLC.

**23.3a What the agreement must contain, by shape** (section 20.2a):

| Shape | Additional required terms |
|---|---|
| **Deliverable** | Work product vests in the VST; released under the licence recorded in the award decision under 23.2 — the one the RFP required, the one the awardee offered from the permitted set, or the applicable default under 20.2a. **Where it is code**, source delivered to a **Network-controlled repository**; **otherwise**, final files and any working materials delivered into a Network-controlled store |
| **Service** | **Service levels and the term**; the **operational handover set vests in the VST** and is deliverable at the end of the term or on termination, whichever comes first; the Network may modify it and give it to a successor provider; the awardee's **retained service software is identified as pre-existing IP** and carries the licence back above; a warranty that the handover set is **independently usable** — deployable by a successor using only the vested materials plus commodity or open-source components; no exclusivity, and nothing preventing the Network re-competing the service; Network data exportable **on request at any time** |
| **Embedded** | The **named deliverable** vests in the VST; **pre-existing IP is carved out and identified**; a **licence back** over pre-existing IP embedded in the deliverable, sufficient for the Network to use, modify, and have others operate it, **irrevocable and surviving termination**; where the deliverable is open source, source delivered to a **Network-controlled repository** under the licence recorded in the award decision under 23.2 — the one the RFP required, the one the awardee offered from the permitted set, or the applicable default under 20.2a; where it is closed-source, the alternative stated in the RFP |

**Pre-existing IP and the licence back apply to every shape, not only Embedded.** An awardee on any shape may bring existing material into the work — a Service awardee almost always does, since the handover set configures software they own and keep.

**Pre-existing IP** means anything the awardee owned or was licensed to use before the award, or developed independently of it. It is identified **in the Schedule A at contracting**, not asserted afterwards — an unlisted item is not pre-existing IP.

**Where pre-existing IP is embedded in the work product, the awardee grants the VST an irrevocable licence back**, surviving termination, sufficient for the Network to use, modify, and have third parties operate the work product. Without it the Network owns something it cannot lawfully run — and on a Service award the handover set would be worthless to the successor it exists to serve.

***Blocking. Counsel must confirm that section 9 of the standard Independent Contractor Agreement permits the pre-existing-IP carve-out and the licence back by Schedule A.*** *Until that confirmation is recorded: no **Service** or **Embedded** RFP may be published, since both rely on the carve-out by their nature; and no award of any shape may be contracted with a populated pre-existing-IP schedule. A **Deliverable** award whose schedule is empty carves nothing out and may proceed.*

*If section 9 does not permit it, the agreement itself needs amending — a Schedule A cannot narrow a vesting clause it is subordinate to. Note that defining what the work product **is** for a shape does not narrow section 9; only the carve-out does.*

**23.3b Verifying the receiving account.** Every award is paid to one on-chain account, and no other (11.3, and the bullet above). Nothing until now said what *verified* meant. It means this, and **VS LLC performs it before the agreement is executed**, as part of its ministerial check under 15.3.

**At contracting, three things together:**

1. the account **exists on chain and can receive A**;
2. the awardee **signs a challenge message from that account**, proving control of its key, and the signature is recorded with the agreement;
3. the account is **confirmed with the awardee through a channel other than email**, against the contact details recorded at contracting.

**Why a signed message and not a test payment.** The obvious control — send a small amount first — cannot work here. Every transfer from the Program Account needs **four of five signatures and the full delay window** (7.2), so a test payment would be a four-signature, seven-day event before each real one. A signed challenge is better in any case: a test payment shows only that an address accepts funds, which is equally true of an address belonging to someone else. A signature shows the awardee holds the key.

**Changing the account.** A change is where the real risk sits, because an award redirected to an attacker's account cannot be undone — this Framework says repeatedly that on-chain payments are irreversible, and 23.3's recovery clause is a claim against a party, not a reversal. So a change requires:

- verification through a channel **different from the one the change request arrived on** — never a reply to the request itself;
- a **fresh signed challenge** from the new account;
- a hold of **one business day** before the new account becomes payable.

**There is no urgency exception to the hold.** Speed is the thing an impersonator needs, and no milestone is urgent enough to justify losing an award to a wrong address.

**A change during a live delay window does not redirect the payment.** A proposal already made targets the old account. The Committee **cancels** it — a 3-of-5 administrative action (7.2, 10.7) — and, once the new account is verified, proposes again with a **fresh delay**. Nothing in this section shortens a delay or moves a payment already in flight.

**What is recorded.** The verification, its date, the channel used, and the signed proof are held with the agreement; a change records the same again, and the account history is retained so a past payment stays attributable to the account that was verified at the time (11.3a).

**23.4 Publication of award.** Published within **2 business days** of the decision, per section 10.3. Unsuccessful proposers may request their own scores and a short written explanation.

## 24. Stage 7 — Delivery

**24.1** The Manager of record is the awardee's contact: check-ins at least every two weeks on active work, status reports to the Committee, early warning of delays, and handling change requests.

**24.2** Milestone approval and payment follow **Part 1, section 11**.

## 25. Stage 8 — Closing and reporting

**25.1 Closing an award.** Final acceptance, final payment, and a short public completion note — plus the closing test for the award's shape (section 20.2a). What is confirmed must have **actually happened**, not been promised.

| Shape | Closes on |
|---|---|
| **Deliverable** | **Where the deliverable is code:** a **tagged source copy in a Network-controlled repository** under the licence recorded in the award decision under 23.2 — the one the RFP required, the one the awardee offered from the permitted set, or the applicable default under 20.2a. **Otherwise:** the final files and any working materials in a Network-controlled store, under the licence recorded in the award decision under 23.2 — the one the RFP required, the one the awardee offered from the permitted set, or the applicable default under 20.2a. Either way, with credentials, domains, and documentation. A link to the awardee's own repository is not delivery — it can be moved, made private, or deleted |
| **Service** | Delivery of the **operational handover set** and confirmation that any **Network data has been exported**. The checklist must not ask for a deliverable handover; there is none |
| **Embedded** | A **tagged source copy of the deliverable** in a Network-controlled repository where it is open source; where it is not, written confirmation that the licence or other alternative named in the RFP is in force, plus any escrow deposit made |

**A terminated award closes on its shape's handover items alone.** Final acceptance and final payment are not required where the award ended under 11.10 — otherwise a terminated Service award could never close. On a terminated **Deliverable** or **Embedded** award the handover items are those covering **work accepted before termination**; where nothing was accepted, the award closes on the published termination record alone.

**25.2 Review after large awards.** Where an award's **total contract value** is above the threshold set in MSIG #5 Part D (Appendix B) — the same measurement basis as the Per-Award Limit under 13.2, so a service priced monthly is measured whole — the **Manager of record writes a short review within 15 business days of the award closing** under 25.1, and it is **published on the Portal** with the completion note and listed in the cycle report (13.5).

It answers three questions: **did it meet the need, was the budget right, would the Network do it again.**

**It applies to a terminated award too**, where it also records why the engagement ended. A large award that failed is the one the Network has most to learn from, and 25.1 already provides that a terminated award closes on its shape's handover items alone.

**Where the RFP was reassigned** under 12.3, the review is written by the Manager of record at closing, drawing on the outgoing Manager's written handover.

**This is the input to re-competition.** Section 13.2 requires a recurring service to run for a fixed term and then be **re-competed rather than renewed**, the incumbent having to bid like anyone else. Whether to re-scope, re-price, or change approach is decided on something, and this review is it — which is why the threshold is measured on total contract value, so that every recurring service award generates one before its term ends.

Writing it is within the Manager's engagement and is covered by the Exhibit B rate card.

**25.3 Cycle report and annual review** follow **Part 1, sections 13.5, 14.3 and 16.1**.

## 26. Optional — open call for unsolicited proposals

A channel for good ideas the Network did not think to ask for.

Unsolicited awards use the same mandate, the same thresholds, the same contract-first rule, the same publication and delay. An open call changes **where proposals come from, not how they are authorized**.

**There is no open call sub-limit.** It draws on the Cycle Ceiling alongside directed RFPs and competes for the same money on the merits. Nothing about an unsolicited award receives weaker scrutiny — it clears the same award threshold, the same Per-Award Limit, the same publication, the same delay window, and the same objection bands. A sub-limit would add no protection the award process does not already give, and would create an artificial cap: in a quarter with few directed RFPs it would block good unsolicited work while money sat unusable. The Cycle Ceiling is the constraint.

**Every unsolicited proposal is categorized on arrival**, using the same MSIG #4 categories as a directed RFP (section 2.1). Categorization is what routes it: the proposal is assigned to the **portfolio holder for that category**, who leads its assessment exactly as they would lead the scoping of an RFP in the same area. A proposal that spans categories, or fits none, goes to the At-Large seat.

This matters more for the open call than for the directed program. A directed RFP is already the product of a portfolio holder's own scoping, so its owner is obvious. An unsolicited proposal arrives without one, and without categorization it lands on whoever happens to read it first — which is how a category quietly ends up with no diligence behind it.

Categorization also keeps the rest of the machinery working. Category budget shares (section 19.2) cover both tracks, so an open call cannot quietly overweight one area. A **Manager of record** is assigned in the same way, and a **Technical Reviewer** is required where the RFP's published statement says one is engaged, exactly as under section 11.2. Unsolicited proposals appear in the public backlog with the same statuses (section 18.3) and in the cycle report under the same category breakdown, so the Network can see both tracks against each other.

**Recommendation: do not run this in cycle 1.** Prove the directed program works first.

## 26a. Bounties — *for confirmation*

The working group has asked that the Committee be able to issue **bounties and grants** as well as RFPs. Two of those three are already here under different names, and one is genuinely new.

| Name used | What it maps to |
|---|---|
| **RFP** | Part 2, sections 18–25. A directed solicitation the Network scopes |
| **Grant** | The **open call** in section 26 — an award on a proposal the Network did not ask for |
| **Bounty** | **New.** Nothing in this Framework currently describes it |

**A bounty**, as drafted here, is a **published, fixed-price task, open to anyone, paid to the first acceptable delivery**. There is no evaluation round and no scoring, because there is nothing to compare — the first submission meeting the published acceptance criteria wins. It suits small, well-specified work: a fix, a tool, a dataset, a translation.

**Minimum rules, so a bounty cannot be used to route around the rest of this document:**

- **Rule 1 —** **published on the Portal** with the **acceptance criteria**, the **fixed price**, the **award shape**, and the **licence — in Required or Default mode only**, Proposer's choice being impossible on a bounty since the award decision is the publication vote and no proposal exists at it, **whether a Technical Reviewer is engaged**, the **named Manager of record**, and a **closing date** — all fixed at publication and locked on the same footing as 20.2a;
- **Rule 2 —** **the publication vote is the award decision**, taken at the **award threshold** — two-thirds, minimum 3 — conditional on an acceptable delivery. There is no second vote, because there is nothing left to decide once the criteria are met. **The 60-day limit in 10.10 runs from the Manager's written acceptance determination, not from the publication vote**, and the publication vote does not expire while the bounty is open. Without this the Manager alone would be committing Network funds, which is the Committee's decision under 8.3 and would leave the 11.4 signature with no award to be ministerial about;
- **Rule 3 —** **bounded by the Per-Award Limit and the Cycle Ceiling, and by nothing else.** There is **no per-bounty cap and no bounty sub-limit** — a bounty is subject to the same two limits as every other award. Neither a cap on size nor a cap on total would add protection those limits do not already give, and both would bite hardest in the quarter when the Committee had the least directed work and the most well-specified small tasks;
- **Rule 3a —** **open for a minimum period before any delivery may be accepted**: **21 days**, or **10 days** for a bounty under USD 5,000 or where urgency is recorded — the same periods as 20.5. "First acceptable delivery wins" is only a contest if a second party had time to enter one. A bounty accepted on day two was never open to anyone but the party already building it;
- **Rule 4 —** **reserves its fixed price against the Cycle Ceiling at publication** (13.2). A bounty published against headroom that is committed by the time someone delivers would leave the deliverer with no ceiling to be paid from;
- **Rule 5 —** **lapses** at its closing date, or at the end of the cycle in which it was published if earlier, releasing its reservation — **unless a delivery has been accepted by then**. On acceptance the reservation continues under 13.2 through contracting, the delay window, and any MSIG confirmation; any amount payable after cycle end is carried as a **forward commitment** against the following cycle. **The closing date must leave room inside the cycle for acceptance, contracting, and the full delay** — the Cycle Ceiling does not carry over (13.1);
- **Rule 6 —** **deliveries are recorded in a public register with a receipt timestamp.** The Manager of record assesses **in order of receipt** and **stops at the first** that meets the published acceptance criteria; later deliveries are recorded as unsuccessful with a written reason. "First" means first received, not first assessed;
- **Rule 7 —** **the section 10.3 publication is made on acceptance**, not at the publication vote — there is no awardee, receiving account, or milestone schedule until then. It states the awardee, the receipt timestamp, the acceptance determination, the price, and the publication vote by name and account, and **the 10.4 delay window runs from it**;
- **Rule 8 —** **contracted before payment**, and paid on the same signature and delay as any other disbursement — a bounty is not exempt for being a bounty. The payment is an **initial award disbursement**, so **11.4a's checks apply, not 11.4's**, and it carries **objection banding** under 10.5. Where the published statement says a Technical Reviewer is engaged, **their written assessment is a condition of the Manager's acceptance determination** — that is what the field does on a bounty, there being no milestone;
- **Rule 9 —** **where a bounty payment is cancelled**, the Manager **resumes assessment at the next delivery in order of receipt**, provided the bounty has not lapsed; a delivery recorded unsuccessful only because an earlier one was accepted is **reinstated**. Otherwise the Network would pay nothing and receive nothing while a second compliant delivery sat closed out;
- **Rule 10 —** **where a bounty payment is cancelled, no work product vests.** The deliverer keeps what they made and nothing in the agreement limits their use of it. Unlike an ordinary award, the work is already done when the delay runs, so the "no liability either side" rule in 23.3 cannot be left to do the work alone;
- **Rule 11 —** every **conflict rule applies**, including the bidding bars in 6.1 and 6.4, the ban register, and the pre-existing-IP schedule at contracting — which on a bounty is written after the work exists, so a deliverer must list what they brought or forfeit it;
- **Rule 12 —** work product handled by shape under 20.2a, normally **Deliverable**;
- **Rule 13 —** **no bounty may be split** out of work that should have been an RFP (rule 5 of section 27 applies unchanged);
- **Rule 14 —** **where the Committee expects that only one party will realistically deliver, it records that expectation and its reasons at publication, and the record is published.** This does not stop the bounty. It names what is happening: a bounty nobody else will attempt is a **sole-source award**, which is a normal and often correct thing to do — but it should be documented as one rather than described as an open contest. The cycle report lists these separately.

**Sections 22.1, 22.2, 22.4 and 22.5 do not apply to a bounty.** There is no scoring round, no weights, and no reconciliation. **Section 22.3 does apply, and is satisfied by** the Manager of record's written acceptance determination against the published acceptance criteria — that is the written assessment 22.3 requires before any award.

**Section 21.2 does apply**, with one adjustment: a bounty has no discrete question period, so questions may be put to the Manager of record at any time while the bounty is open, and answers are published on the bounty's own page. Everything else in 21.2 holds — all questions and answers published to everyone, without naming who asked, and **no private guidance of any kind**.

An earlier draft listed 21.2 among the disapplied sections. That was wrong, and it contradicted **rule 2 of section 27**, which applies throughout and says the same thing. 21.2 contains no scoring machinery to disapply — it is a channel rule, a publication rule, and a prohibition — and the prohibition matters **more** on a bounty than on a scored RFP, not less. Where the first acceptable delivery wins, a private word about what will be accepted tells one party what to build while everyone else guesses, and it is worth more than any scoring advantage could be. That is the same concern rules 3a and 14 address from the other direction.

**What a bounty gives up, stated plainly.** There is no evaluation round, so the Network never compares approaches, prices, or teams. What replaces that is **openness**: anyone may deliver, and the first acceptable delivery wins. That substitution holds well at small sizes, where several people plausibly attempt the same task. **It weakens as the price rises** — nobody speculatively builds a large system hoping to win a race, so a large bounty in practice attracts exactly one attempt, from the party who already knew they would make it.

That is why rules 3a and 14 exist rather than a size cap. A **minimum open period** gives a second party the chance to be real, and the **sole-source record** makes it honest when there was never going to be one. The Committee keeps the flexibility to size a bounty to the work; what it cannot do is call something an open contest when it is not.

**Where a competitive round would genuinely add something — several capable teams, an unsettled approach, a price the Network cannot estimate — the instrument to use is a directed RFP**, not a large bounty. That is a judgment for the Committee, recorded under rule 14, not a limit imposed here.

## 27. Rules that apply throughout

1. **Published criteria, weights, budgets, and results.** Every judgment is written down and attributable.
2. **All questions and answers are public.** No private guidance to any proposer.
3. **Recusal is required, automatic, and published.** Thresholds recalculate on non-recused seats.
4. **Nobody scores, approves, or is paid on an RFP they could bid on.** The one exception is a Committee member engaged as Technical Reviewer under 12.6 — they are paid on an RFP they are barred from bidding on, and 12.6's guards apply in place of this rule. A material breach of the conflict rules carries a **permanent ban** confirmed at 15/21 and liftable only at 15/21 (section 6.6).
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
| **Steering Committee** | What becomes an RFP. Scopes and budgets. Who wins. Withholding and termination. Classifies RFP-system work as award or operating cost (15.2b). **Designates a replacement Reference Source if the oracle fails (13.4a)**. Signs payments 4 of 5 | Approve milestones. **Serve as Manager of record** (12.2a). Hold or manage funds outside the Program Account. **Change the denomination convention** — the USD denomination, the payment in A, the conversion formula, or the truncation rule (13.4a, 9.1) |
| **Manager of record** | Runs one RFP. **Approves its milestones for payment.** Keeps its objection register. **May recommend termination** (11.10a). **Never a Committee member** (12.2a) | Vote on awards. Bid on RFPs they work on. Terminate an award. Sign or disburse anything — payment is the Committee's 4-of-5 |
| **Technical Reviewer** | Written scores and milestone assessments on any RFP whose published statement says a Reviewer is engaged — **including a technical Service award**. **May recommend termination**, filed directly with the Committee (11.10a). **May be a Committee member** on the terms in 12.6 | Vote *(except a member-Reviewer, who keeps their seat's award vote but not the proposal score, does not vote on a termination recommendation, recovery plan, or strike decision on that award, takes no part in score reconciliation, and does not vote on or sign the payment of their own Reviewer fee)*. Work on an RFP whose published statement says no Reviewer is engaged. Approve a milestone. Terminate an award |
| **VS LLC** | Contracts with awardees and role-holders; work product — as defined for each award's shape (20.2a) — vests in the **VST**. Runs the Portal and writes the `disc.vst` disclosure and decisions registers (6.3b, 7.6a). Configures and publishes the Program Account. Refuses to contract outside the mandate | Choose awardees. Control the Program Account. **Own the platform — it operates it** (15.2a). **Bid on work on the RFP system**, nor may any connected entity (15.2b) |
| **Trustee** | Nothing in this program | — |

## Appendix B — Numbers set elsewhere

These are set in MSIG #5, not here, so they can change without amending this Framework.

**The rule this appendix depends on.** Where a figure is listed below, **this Framework does not state it** — it names the thing and points here. Restating a figure would defeat the purpose: MSIG #5 is the instrument block producers vote on and amend, so a number changed there would silently leave this document wrong. The Framework keeps the *reasoning* for each figure and MSIG #5 keeps the *figure*.

**The reverse is not true.** Figures this Framework owns — the evaluation weights in 22.1, the minimum open period in 20.5, the advance cap in 11.7, the bounty comply-or-explain trigger in 13.5 and the small-bounty threshold in 26a — are stated here and are **not** in this table. MSIG #5 restates several of them for the reader; where it does, it points back to the section that owns them.

| Item | Where |
|---|---|
| Cycle Ceiling and Per-Award Limit (in **USD**) | MSIG #5 |
| Delay window length, normal and urgent | MSIG #5 |
| Cycle ceilings and the funding period | MSIG #5 |
| Committee pay — the retainer in 13.3a (in **USD**, paid in A) | MSIG #5, Part H |
| Initial staggered terms | MSIG #5 |
| ECF process publication and first vote dates | MSIG #5 |
| Program Account (`rfp.vst`) permission settings | MSIG #5. Developed, configured, and published by **VS LLC** |
| Manager and Reviewer rate card | MSIG #5, Exhibit B |
| Schedule A terms for every paid role | MSIG #5, Exhibit F |
| **Coverage Margin** — the floor the coverage test in 13.4 applies | MSIG #5, Part D |
| **Instalment top-up level** — the margin each quarterly transfer restores the account to (13.1) | MSIG #5, Part I |
| Caps on member Reviewer fees per cycle and on concurrent engagements (section 12.6) | MSIG #5, Part H |
| **Post-award review threshold** — the total contract value above which 25.2 requires a review | MSIG #5, Part D |

## Appendix C — Still to confirm

**Blocking items are marked.** A blocking item stops something specific from happening until it is resolved.

| # | Item | Blocking? |
|---|---|---|
| 1 | Candidates to propose for the four seats — individually, as a full slate, or in any subset (section 3.1) | — |
| 2 | Source account holding the REX yield and Year 1 pools | — |
| 3 | The **Trustee Compensation and Indemnification Acknowledgment**, approved by vstcreation but not yet reviewed — it may add indemnification terms for compensated governance roles that Committee members should also have | — |
| 4 | Initial Manager pool — **at least three, or at least two who are unconflicted on every open RFP**. Two is only enough while the second is unconflicted, and 12.2a means a member can never fill the gap. Also load-bearing for 11.10a: with one Manager there is no reassignment remedy against a Manager who has frozen an award | — |
| 5 | Technical Reviewer roster for technical categories | — |
| 5a | **Exhibit B rate card** for Managers and Reviewers | **Yes** — no Manager or Reviewer may be contracted without it (12.1), and no member-Reviewer fee has a figure (12.6.5) |
| 6 | Portal readiness to host the backlog, award records, and objection register | — |
| 7 | The **disclosure questionnaire instrument** — version 1 text, the coded-answer schema, and the holdings band set (section 6.3a) | **Yes** — the Program Account is not funded until every member has filed, and nobody can file before the instrument exists |
| 8 | The **`disc.vst` account and its two contracts** — the **disclosure** register (6.3b) and the **decisions** register (7.6a): deployment, ABI, both schemas, the hash algorithm and its serialization, RAM provisioning, the upgrade path, and who signs the writes. **To be built and serviced by the EOS Rio team; VS LLC remains accountable** and covers it in the Exhibit D configuration under MSIG #5 Part E (PRD section 7.2) | **Yes** — the Program Account is not funded until Exhibit D is published |
| 9 | ~~Licences~~ — **closed.** Apache-2.0 for code, CC-BY-4.0 for non-code, three licence modes in 20.2a, and the Proposer's-choice **permitted set named per RFP** — no standing list | — |
| 10 | **Counsel to confirm section 9** of the standard Independent Contractor Agreement permits the pre-existing-IP carve-out and licence back by Schedule A (section 23.3a) | **Yes** — until confirmed, no Service or Embedded RFP may be published, and no award may be contracted with a populated pre-existing-IP schedule |
| 11 | **Two caps under section 12.6**, set by MSIG at Part H: the **per-cycle cap on Reviewer fees** a member may earn, and the **cap on concurrent engagements** | **Yes** — no member may be engaged as Reviewer until both are set |
| 12 | ~~Confirm what "grant" means~~ — **closed: "grant" is the open call in section 26**, not a further instrument. Three instruments only: directed RFP, open call, bounty. *Bounties carry **no per-bounty cap and no sub-limit** — the Per-Award Limit and Cycle Ceiling are the only bounds (26a rule 3)* | — |
| 13 | **Who owns the oracle risk tolerances** — the **15% collar** and the **24-hour staleness period** in 13.4. Both are stated as operative resolutions in MSIG #5 Part D, which suggests block producers set them, but neither appears in Appendix B or in MSIG's list of figures to confirm, which suggests this Framework does. They are treated here as Framework-owned, and MSIG points back to 13.4 accordingly. If they are meant to be block producer dials they move to Appendix B and out of 13.4 | — |
| 14 | **Transfer of the existing platform code and rights to the VST** (section 15.2a). **EOS Rio has committed to transferring both, and that commitment is accepted.** Remaining work is administrative: the executed assignment, confirmation it covers every contributor, and the repository transfer | — |
| 15 | **Post-award review threshold** under 25.2 — set in **MSIG #5 Part D** on total contract value (Appendix B). Confirm or change the figure there, and scope the review as a Manager task in the Exhibit B rate card | — |
| 16 | **Schedule A clause for receiving-account verification** (23.3b) — the awardee-facing counterpart in the **Exhibit F** template: the awardee's obligation to sign the challenge, to notify a change only through the named channel, and to accept the one-business-day hold. 23.3b binds VS LLC; this binds the awardee | — | 
