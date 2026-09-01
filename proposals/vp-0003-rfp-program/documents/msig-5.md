# MSIG #5 — Network Steering Committee, RFP Framework, Program Funding

**Status: DRAFT v6.2 — for VST and block producer review**
**Date: [___]**

---

## Summary — what you are voting on

If you read nothing else, read this page.

| # | Decision | Detail |
|---|---|---|
| 1 | **Approve the RFP Framework** required by MSIG #4 | Exhibit A |
| 2 | **Rename** the Oversight Committee the Network Steering Committee | Same body, continued |
| 3 | **Grow it from 3 seats to 5**, each with a subject area | Core Development, Marketing, Business Development, Community, At-Large |
| 4 | **Set a 1-year term** for members, staggered at the start | Part B |
| 5 | **Give the Committee a mandate to decide RFP funding** on behalf of the Network | Block producers stop voting on individual awards |
| 6 | **Cap that mandate**: Cycle Ceiling **USD 150,000 per cycle**, Per-Award Limit **USD 100,000 total contract value**. The mandate **runs until you cancel it** | Anything larger comes back to you |
| 7 | **Hold program funds on-chain**, moved only by 4 of 5 Committee signatures | Owner permission stays with `eosio.prods` |
| 8 | **Every payment waits 7 days** before it executes, in public | You may cancel any payment at 15/21 during that wait |
| 9 | **Objection rule**: 4–6 block producers objecting sends an award back to you; 7 or more ends it | Part E |
| 10 | **Recognize ECF** to run the community vote for the Community seat | Francis Sangkuan holds it in the meantime |
| 11a | A member engaged as Technical Reviewer under Framework 12.6 also earns rate-card fees **outside** this retainer — see Part H | Capped, and not available until **both caps** are set |
| 11 | **Pay Committee members USD 2,500 per month each**, contracted through VS LLC | No success fees, no per-award pay |
| 12 | **Authorize USD 950,000 over four quarterly cycles**, first instalment A worth USD 296,875 | Gross transferred up to USD 1,009,375 — see note 3 |

**What you keep.** Setting every limit above. **Funding the program a year at a time** — the program cannot spend what you have not authorized, and you may change any amount or cycle length at 15/21 at any time. Seating and removing members. Deciding anything above the limits. Cancelling any payment. Suspending or revoking the mandate at any time, without cause.

**What you give up.** Voting on each RFP and each award. **Designating the price source** if the Delphi Oracle fails — the Committee restores it under Part D so payments are not frozen waiting on a vote, within stated tests it cannot change, and you may direct a different source or cancel any payment made at the new rate at any time.

**What this does not do.** It does not authorize the Committee to create a company, foundation, or any other entity. That needs a separate MSIG. See Part I.

---

## Proposal title

Network Steering Committee, RFP Framework Approval, and On-Chain Program Funding

## Purpose

MSIG #4 authorized a working group to write an RFP Framework, and required that the final Framework be approved by at least 15 of 21 active block producers before it could be used. This MSIG approves that Framework and puts it into effect.

It also reconstitutes the Oversight Committee as the Steering Committee, gives that Committee a bounded mandate to make RFP funding decisions for the Network, and asks the Treasury to fund the program.

The RFP program is a **Network program, not a Trust program**. Program funds are not Trust Property. The Trustee has no role in it. The Trust and VS LLC provide defined support only.

## Definitions

**Committee** — the Vaulta Network Steering Committee.
**Framework** — the Vaulta Network RFP Framework, Exhibit A.
**Program Account** — the on-chain account holding program funds.
**Committee Permission** — the multisignature permission through which the Committee moves those funds.
**Mandate** — the authority granted in Part C.
**Threshold** — approval by not fewer than 15 of the 21 active block producers.
**Business day** — Monday to Friday, measured in UTC. No public holidays are excluded, because the block producer set is global and no single holiday calendar applies to it.
**Reference Source** — the on-chain price source from which the Reference Rate is read. It is the Delphi Oracle (`delphioracle`) unless and until the Committee designates a replacement under Part D.
**Reference Rate** — the Reference Source's `datapoints.median` for the `eosusd` pair, read at the time of the relevant action and converted as set out in Part D.
**Award Commitments** — amounts committed to awardees, constrained by the Cycle Ceiling.
**Program Costs** — Committee pay, Manager and Reviewer fees, Portal and administration costs.
**Total Program Spend** — Award Commitments plus Program Costs.
**Portal** — the RFP portal authorized under MSIG #4.

---

## Resolved clauses

### Part A — Approve the Framework

RESOLVED, that the active block producers **approve the Vaulta Network RFP Framework** attached as **Exhibit A**, which satisfies the requirement in MSIG #4 that the final Framework — covering eligibility, evaluation, conflicts, records, proposal intake, awards, and funding mechanics — be approved by at least 15 of 21 active block producers before implementation.

FURTHER RESOLVED, that the working group convened under MSIG #4 is **discharged**, having delivered the Framework.

FURTHER RESOLVED, that the **Portal** is the canonical place for publishing RFPs, the needs backlog, award decisions, the objection register, minutes, and cycle reports; and that **VS LLC** maintains and administers it, as contemplated by MSIG #4.

FURTHER RESOLVED, that the Framework may be amended by MSIG Resolution, and that **Part 2 of the Framework may be amended without reopening Part 1**.

### Part B — The Steering Committee

RESOLVED, that the **Oversight Committee is renamed the Vaulta Network Steering Committee**, is the same body continued, and that every reference to the "Oversight Committee" in the Trust Agreement, in any prior MSIG, in the VS LLC Operating Agreement, or in any other Trust document is read as a reference to it.

FURTHER RESOLVED, that the Committee is **increased from 3 seats to 5**, with the seats, portfolios, and category assignments set out in Framework Part 1, section 2.

FURTHER RESOLVED, that the Committee keeps in full its **Trust oversight responsibilities**, and that its RFP work is a separate Network capacity, as set out in Framework Part 1, section 1.

**Terms**

FURTHER RESOLVED, that a Committee term is **one (1) year**; that members may be reappointed at the Threshold without limit; and that each appointment authorizes the member to continue month to month after their term ends, **keeping their signing key**, until a successor is seated or MSIG replaces them.

FURTHER RESOLVED, that the vstcreation MSIG appointed the initial Oversight Committee members **without stating a term length**, and that this MSIG therefore **sets** a term rather than extends one. The reference in MSIG #2 to "the remainder of Dario Cesaro's Initial Term" is superseded by the terms set here.

FURTHER RESOLVED, that **the initial terms of the Core Development, Marketing, Business Development, and General (At-Large) seats run from the date funds are received in the Program Account**, not from the date each member's appointment MSIG is executed; and that a **Community seat filled by MSIG** — whether seating an ECF winner or filling the seat under Part F — instead runs one year from the execution of that Resolution.

The four seats may be filled by Resolutions that execute at different times. If each term ran from its own execution, the stagger would drift and could collapse — a Business Development member seated six months after Core Development would finish an 8-month term at the same moment Core Development finished a 14-month one. A single anchor keeps the intended spacing. It also means no member's term runs down while the Committee is waiting to be completed, and it uses the same date as the cycle and pay clocks.

FURTHER RESOLVED, that initial terms are staggered:

| Seat | Initial term |
|---|---|
| Core Development | **14** months |
| Marketing | **14** months |
| Business Development | **8** months |
| General (At-Large) | **8** months |
| Community | See Part F |

FURTHER RESOLVED, that MSIG may **remove a member at any time, with or without cause**, and that removal ends the member's signing weight immediately.

**Appointments**

FURTHER RESOLVED, that the vstcreation MSIG appointed three initial Oversight Committee members — Dario Cesaro (EOS Support), Dafeng Guo (Vaulta Treasury), and Francis Sangkuan (1DEX) — and that MSIG #2 removed Dario Cesaro and appointed **Ross Dold (EOSphere)** in his place. Those three are the current members.

FURTHER RESOLVED, that **Francis Sangkuan (1DEX)** is the **only carry-over into a Steering Committee seat**, and holds the **Community seat** on an interim basis under Part F.

**How the four remaining seats get filled**

FURTHER RESOLVED, that the Core Development, Marketing, Business Development, and At-Large seats are **not filled by this Resolution**. They are filled by separate MSIG Resolutions using the template at **Exhibit E**, and that a single such Resolution may name **one candidate for one seat, a full slate of all four, or any subset of them**.

FURTHER RESOLVED, that every rule in this Part operates **per seat and not per proposal**, and that each Exhibit E proposal states one of two **resolution modes**:

1. **Seat by seat** — the default. Each seat named is treated independently, so a Resolution naming several seats takes effect for those that are open and has no effect for those already filled;
2. **All or nothing** — where marked, the Resolution has **no effect for any seat** if any seat it names would not be filled by it, for any of the five reasons set out in the clause below beginning "an appointment has no effect for a given seat" — not only because that seat is already taken.

FURTHER RESOLVED, that block producers may signal support for more than one candidate by approving more than one proposal, and that where more than one proposal covering the same seat reaches the Threshold, the appointment recognized for that seat is the one whose **execution transaction has the earliest block time**.

FURTHER RESOLVED, that once a seat is filled:

1. every other pending proposal for that seat is **void as to that seat**. Proposers should cancel them and block producers should withdraw approvals. A multi-seat proposal marked seat by seat remains live for its other seats;
2. if such a proposal is nonetheless executed afterwards, it **has no effect for that seat** and does not displace the seated member. Displacing a seated member requires removal by MSIG Resolution.

FURTHER RESOLVED, that an appointment **has no effect for a given seat** if, **at the moment of execution**:

1. that seat is already filled by an earlier executed appointment;
2. the named individual **already holds another seat**;
3. seating them would breach the **one-member-per-affiliation rule** — two members from the same block producer, company, or corporate group;
4. they are **affiliated with the Vaulta Treasury**, absent an express waiver at the Threshold;
5. they appear on the **published register of bans**.

FURTHER RESOLVED, that where a **single Resolution** names the same individual for more than one seat, or names two candidates who would breach the affiliation rule against each other, the seats are tested **in the order they appear in the Candidates table of that proposal**: the appointment takes effect for the first and has **no effect** for the later. The table's row order is the proposer's priority order.

FURTHER RESOLVED, that **VS LLC shall maintain a published seat register on the Portal**, recording for each seat the individual seated **by name and on-chain account**, the proposal name, the execution transaction, the **resolution mode** of that proposal, and **any seat a proposal named but did not fill, together with the reason**. Parallel proposals make it possible for the chain to contain executed appointments that have no effect, and the register is the canonical record of what was executed.

FURTHER RESOLVED, that the register is **not a determination of eligibility**. Where VS LLC records a seat as unfilled on any ground other than an earlier execution, it shall **publish its reasons and refer the matter to MSIG**, and the seat is treated as **vacant until MSIG resolves it**. VS LLC does not decide who is eligible.

FURTHER RESOLVED, that any appointment executed in error may be corrected by a further MSIG Resolution.

FURTHER RESOLVED, that the seats and their initial terms are:

| Seat | How filled | Initial term |
|---|---|---|
| Core Development | Exhibit E MSIG — alone, as a slate, or in a subset | 14 months |
| Marketing | Exhibit E MSIG — alone, as a slate, or in a subset | 14 months |
| Business Development | Exhibit E MSIG — alone, as a slate, or in a subset | 8 months |
| General (At-Large) | Exhibit E MSIG — alone, as a slate, or in a subset | 8 months |
| Community | **Francis Sangkuan** on an interim basis, then the ECF process under Part F | See Part F |

**Transition until the four seats are filled**

FURTHER RESOLVED, that **Dafeng Guo (Vaulta Treasury)** and **Ross Dold (EOSphere)** shall continue to serve **temporarily, in the capacity of the original Oversight Committee**, alongside Francis Sangkuan, until the four seats above are filled by MSIG Resolution.

FURTHER RESOLVED, that during that transition the three of them exercise **only the Trust oversight responsibilities** of the former Oversight Committee. **The RFP mandate is not exercised, no RFP is published, and no award is made**, because the Committee is not yet constituted.

FURTHER RESOLVED, that **transition service by Dafeng Guo and Ross Dold is unpaid**, and that a member appointed before the Program Account is funded **accrues no retainer** until the funding date. Pay begins at the later of contract signature and funding, as set out in Part J.

FURTHER RESOLVED, that **no date is set for filling the four seats**. That timing rests with block producers and cannot be estimated here. The program supplies its own pressure: until all five seats are filled, no RFP is published, no award is made, and the Program Account is not funded.

FURTHER RESOLVED, that when the four seats are filled, **Dafeng Guo and Ross Dold cease to serve**. Ross Dold may be separately appointed to a seat, which nothing in this Resolution prevents. Dafeng Guo is not eligible for a seat while affiliated with the Vaulta Treasury, absent an express MSIG waiver. Their service until then is recognized and thanked.

FURTHER RESOLVED, that **the Program Account shall not be funded, and the Committee Permission shall not be activated, until all five seats are filled** and every member has signed their engagement contract, filed the standard disclosure questionnaire on-chain under Framework 6.3a, and registered a signing key. The permission needs four of five signatures; a three-member body cannot operate it, and funds should not sit in an account nobody can properly use.

FURTHER RESOLVED, that **Dafeng Guo's affiliation with the Vaulta Treasury** shall be recorded as a standing disclosure for so long as he serves in the transition.

**The Vaulta Treasury is excluded from service**

FURTHER RESOLVED, that a person **affiliated with the Vaulta Treasury is not eligible** to hold a Steering Committee seat, to serve as an RFP Program Manager, or to serve as a Technical Reviewer.

FURTHER RESOLVED, that "affiliated with the Vaulta Treasury" means employed by it, an officer or director of it, under contract to provide services to it, holding authority over Treasury funds, or otherwise acting under its direction in respect of its treasury functions.

FURTHER RESOLVED, that this reflects the Treasury's own stated position that it will not participate in allocation decisions once funds are transferred to the Network. It protects the Treasury from any appearance of directing what it funds, and protects the program from any appearance of being directed. It is a **default exclusion**, and **MSIG may waive it expressly at the Threshold, publishing its reasons** — a waiver must be a deliberate decision, not an omission.

FURTHER RESOLVED, that **the transition arrangement is unaffected**: Dafeng Guo continues to serve alongside Ross Dold and Francis Sangkuan in the capacity of the original Oversight Committee until the four seats are filled, as set out above. That service is in the Trust oversight capacity only, does not involve the RFP mandate, and ends when the seats are filled.

FURTHER RESOLVED, that no more than one member may be connected to the same block producer, company, or corporate group; and that each member must within **30 days** sign their engagement contract, **file the standard disclosure questionnaire on-chain** under Framework 6.3a and 6.3b — which is the conflict declaration, not an additional item — and register their signing key; **pay and signing weight begin only when all three are done**; and that the 30 days run from the **later of** the execution of the member's appointment Resolution and the date VS LLC publishes the disclosure register as open for filing.

### Part C — The Mandate

RESOLVED, that the Committee is granted a **standing mandate to allocate Program Account funds on behalf of the Vaulta Network** under the Framework. **Block producers do not vote on individual RFPs or individual awards.** Within the limits in Part D, a recorded Committee decision is the decision of the Network.

FURTHER RESOLVED, that this is the separate authorization MSIG #4 required before anyone could award funds, select vendors, or create payment obligations.

FURTHER RESOLVED, that the mandate covers what the Framework says it covers, and nothing else; that an action outside the limits in Part D is **void**; that VS LLC must not contract on it; and that block producers should cancel any matching payment during its delay window.

FURTHER RESOLVED, that the mandate **continues until MSIG suspends or revokes it**. It does not expire on a date.

FURTHER RESOLVED, that **MSIG may suspend or revoke the mandate at any time, without cause**, and may rebuild the Committee Permission through the owner permission.

FURTHER RESOLVED, that the recurring point of block producer control is **funding, not authority**. Funding is authorized **four cycles at a time** under Part I, and block producers may stop, reduce, or re-time any instalment at the Threshold. A mandate that continues indefinitely is bounded by the fact that the Committee can only ever spend what block producers have chosen to send.

FURTHER RESOLVED, that the Committee shall publish an **annual review** of the program — awards made, outcomes, conflict incidents, coverage history, and whether the limits remain appropriate — so that there is a scheduled moment at which performance is on the record, whether or not anyone calls a vote.

FURTHER RESOLVED, that where the mandate ends, the ending resolution must either keep the Committee Permission alive for payments under agreements already signed, or instruct block producers to build a replacement permission — so that the Network is not left owing money it cannot pay.

### Part D — Limits and denomination

RESOLVED, that the program runs in **quarterly cycles**, and that **four cycles are authorized at a time, covering one year**. The first cycle **begins on the day funds are received in the Program Account**.

FURTHER RESOLVED, that **block producers may change any cycle amount, the cycle length, or any limit at any time by MSIG Resolution at the Threshold**. Authorizing a year at a time is a convenience, not a commitment that binds block producers for that year.

FURTHER RESOLVED, that the following apply to **each cycle**:

| Limit | Amount | Unit |
|---|---|---|
| **Cycle Ceiling** — most the Committee may commit in **awards** | **150,000** *(recommended)* | **USD** |
| **Per-Award Limit** — largest single award without coming back to MSIG, measured on **total contract value** | **100,000** *(recommended)* | **USD** |
| Program operating costs — Manager and Reviewer fees, Portal, administration | **50,000** *(recommended)* | **USD** |
| Committee pay for the cycle — 5 members × 3 months | **37,500** *(recommended)* | **USD** |
| **Total Program Spend for the cycle** | **237,500** | **USD** |

FURTHER RESOLVED, that two terms are used and are not interchangeable: **Award Commitments** are amounts committed to awardees and are constrained by the **Cycle Ceiling**; **Program Costs** are Committee pay, Manager and Reviewer fees, Portal and administration. **Total Program Spend** is the sum of the two and is what the funding request in Part I is sized against.

FURTHER RESOLVED, that the Cycle Ceiling is a **maximum, not a target**, and that unspent amounts do not carry into the next funding period.

FURTHER RESOLVED, that the **post-award review threshold** required by **Framework 25.2** is **USD 25,000** *(recommended)*, **measured on total contract value** — the same basis as the Per-Award Limit, so that a recurring service priced monthly is measured whole rather than by the slice falling in any one cycle.

FURTHER RESOLVED, that this is a **reporting trigger, not a spending limit**. It does not cap, gate, or delay any award; it sets the point above which the Manager of record writes a short review after the award closes. At the figure recommended it catches the upper part of the expected USD 15,000–30,000 band and **every recurring service award**, which is the intent: Framework 13.2 requires a service to be re-competed rather than renewed, and the review is the evidence that re-competition is decided on.

**Everything is denominated in USD. Everything is paid in A.**

FURTHER RESOLVED, that **all figures in this MSIG — the Cycle Ceiling, the Per-Award Limit, every award, every reservation, Committee pay, and operating costs — are denominated in USD**, and that all payments are made in A.

FURTHER RESOLVED, that **the amount of A paid against a milestone is calculated at the time the milestone is approved**, using the **Delphi Oracle** (`delphioracle`), the on-chain price oracle operated by block producers.

FURTHER RESOLVED, that the rate used is the **`median` field of the `datapoints` table, scoped to the `eosusd` pair**, which the contract computes as the median of the last 21 submissions from qualified oracles. Moving it requires control of a **majority of the last 21 submissions**, and the rate is supplied by **no party to the transaction** — not the Committee, not VS LLC, not the awardee. Note that the window is the last 21 *submissions*, not one per oracle, so an unusually high-frequency writer occupies more of it than a low-frequency one. The staleness check below is the control that surfaces an unhealthy submission pattern.

FURTHER RESOLVED, that the oracle stores prices as **integers**, and that the actual price is **`median` divided by 10 to the power of `quoted_precision`**. For `eosusd`, `quoted_precision` is **4**, so the stored integer is in ten-thousandths of a dollar: a stored value of 766 is USD 0.0766.

FURTHER RESOLVED, that the amount of A payable is calculated **in integer arithmetic and truncated**, as:

**A-units = ⌊ USD-cents × 10^6 ÷ median ⌋**, where an A-unit is 0.0001 A.

FURTHER RESOLVED, that this is specified for **reproducibility, not materiality**. The largest possible rounding difference is 0.0001 A, under one hundredth of a cent at current prices. What matters is that the platform, the awardee, and any auditor recomputing the figure later all reach the same integer — a published amount that does not match the on-chain transfer looks like an error in the records even when the sums are trivial. Floating-point arithmetic is the hazard here, not the choice of rounding rule.

FURTHER RESOLVED, that truncation is used because it is the simplest rule to state and reproduce, it requires no tie-breaking, it is the default behaviour of integer division in most languages, and it can never pay more than was reserved.

FURTHER RESOLVED, that **VS LLC shall publish**, in the Exhibit D configuration under Part E, confirmation of the `eosusd` pair and its `quoted_precision`, together with a worked example of the calculation so that anyone can check an implementation against it.

FURTHER RESOLVED, that the approval record shall include the **oracle value, the block number, and the transaction id at which it was read**. The contract keeps only a rolling window of 21 datapoints and overwrites the oldest, so the table cannot be re-read later — recording the block and transaction is what makes the figure provable afterwards from history.

FURTHER RESOLVED, that the approval record shall **always state the timestamp of the newest datapoint**, and that this timestamp shall be published with the approval.

FURTHER RESOLVED, that where that timestamp is older than **24 hours** (Framework 13.4, which sets that period), the Manager of record **may not approve alone**. The matter goes to the Committee, which may approve **at the threshold in Framework 5.3** with the staleness recorded, or defer until a fresh rate is available.

FURTHER RESOLVED, that if the `eosusd` pair or the Reference Source becomes **unavailable, renamed, or deprecated**, **payments are suspended** until a Reference Source is in force — no A amount is computable without a rate — and that **the Committee may restore the Reference Source itself, without a further MSIG Resolution**, on the two paths below.

FURTHER RESOLVED, that this **reverses an earlier position** under which only MSIG could designate a replacement. An oracle outage is a technical failure with no policy content in it. Routing it through a 15-of-21 vote would stop every payment in the program for as long as the vote took, and would penalize awardees for a failure entirely outside their control — the same reasoning that makes a stale rate an escalation rather than a halt. What block producers keep is stated below, and it is the part that matters: they can cancel any payment made at the new rate, and they can direct a different source at any time.

FURTHER RESOLVED, that **a technical continuity change is recorded, not chosen.** Where the same price data remains available under a changed name — the pair renamed, the contract redeployed to another account, or `quoted_precision` altered — the Committee records the change by **simple majority, minimum 3**, VS LLC republishes the affected parts of Exhibit D, and payments resume. Nothing is being selected: the same source is being followed to its new address.

FURTHER RESOLVED, that **a replacement source is designated at the award threshold — two-thirds of filled non-recused seats, minimum 3** — and only where it meets **all** of the following, these being the properties that made the Delphi Oracle acceptable in the first place:

1. it is **on-chain and publicly readable**, so that anyone can recompute any payment from it without permission;
2. it is supplied by **no party to the transaction** — not the Committee, not VS LLC, not any awardee or proposer;
3. it is derived from **multiple independent submitters**, none of them able to move the published figure alone;
4. it carries a **datapoint timestamp**, so that the 24-hour staleness check continues to operate;
5. it expresses a **USD price of A at a stated integer precision**, so that the truncation formula is unchanged.

FURTHER RESOLVED, that a source failing any of those tests **may not be designated**, and that this power **does not extend to the denomination convention itself** — the Committee may not change the USD denomination, the payment of A, the conversion formula, or the truncation rule. Those remain reserved matters. It may change **where the rate is read from**, and nothing else.

FURTHER RESOLVED, that the designation is **published on the Portal with the Committee's reasons and the vote by name and on-chain account before any payment is made on it**, is written to the decisions register under Framework 7.6a, and is **reported to MSIG within 5 business days — as notice, not for approval**; and that **VS LLC republishes Exhibit D** to describe the source actually in use, with a fresh worked example.

FURTHER RESOLVED, that **block producers retain every control over the result**: they may cancel any payment made at the new rate during its delay window at the Threshold, may direct a different source by MSIG Resolution at any time, and may suspend or revoke the mandate. This Part restores the program's ability to pay; it does not put the rate beyond block producer reach.

FURTHER RESOLVED, that **the first payment under each award following a designation is approved by the Committee rather than by the Manager of record alone**, whatever the collar shows, and that the **15% collar** on that payment measures against the rate last used under that award on the previous source. A change of source is precisely the moment a mispriced rate would pass unnoticed, the collar otherwise having nothing comparable to measure against.

FURTHER RESOLVED, that this is necessary because the contract **never fails a read**. It holds 21 rows from the moment a pair is created and modifies them in place, so a read returns a value whether or not any oracle has submitted a price recently. A stale rate is indistinguishable from a current one except by its timestamp, and no other source is substituted for it while it remains available — staleness is handled by the 24-hour check, not by changing where the rate is read from.

FURTHER RESOLVED, that where the oracle rate at approval differs by more than **15%** (Framework 13.4, which sets that collar) from the rate used at the **previous payment under that award** — or, for the first payment, from the rate recorded at the award decision — the Manager of record **may not approve alone**. The matter goes to the Committee, which may approve **at the threshold in Framework 5.3** or defer. This bounds the effect of a momentary price movement on the program's A outflow.

**Coverage: the program must hold enough A to meet its USD commitments**

FURTHER RESOLVED, that because commitments are in USD and the Program Account holds A, a fall in the price of A reduces what the account can pay. The Committee shall therefore:

1. **Test coverage before every award.** Confirm that the account's A balance, valued at the Reference Rate, covers all outstanding Award Commitments and Program Costs **falling due before the next scheduled instalment**, plus the proposed award, with **at least a 10% margin**. An award that fails this test may not be made and is a reserved matter.

   The account is funded with a **25% margin** (Part I) and awarding stops when that margin has eroded to **10%**. The two figures are deliberately different: the larger one is the cushion, the smaller one is the floor. If they were equal, the last dollar of the ceiling could only ever be committed on a day the price of A had not moved down at all — which is not a ceiling anyone can plan against.
2. **Report coverage every cycle**, showing outstanding USD commitments, the A balance, the rate used, and the resulting coverage percentage.
3. **Stop and escalate if coverage falls below the 10% floor.** The Committee shall make no further awards, shall notify MSIG within **5 business days**, and shall request a top-up transfer. Milestones under existing agreements continue to be paid while funds allow.
4. **Report a surplus.** If the price of A rises and the account holds more than the cycle requires, the surplus is reported. It is not swept at cycle end — surpluses reduce the next quarterly instalment, and any final balance is returned at the end of the funding period under Part I.

FURTHER RESOLVED, that a **change in the A amount paid is not a top-up** — it is the peg working as intended — but that **the USD amount of an award may never be increased past the Per-Award Limit**, and any increase in a USD award amount requires the full award threshold, a contract amendment, publication, and a fresh proposal and delay.

**Paying Program Costs**

FURTHER RESOLVED, that Committee pay, Manager and Reviewer fees, Portal and administration costs are paid from the Program Account on the following basis, which mirrors the award path but is lighter because the amounts are pre-set:

1. the Committee approves a **published payment schedule** once per cycle, by simple majority with a minimum of 3, listing each recipient, amount, and cadence;
2. individual payments under that schedule are signed **4 of 5** like any other disbursement and carry the **same delay**;
3. **no objection banding applies** — the schedule was published in advance and the amounts are fixed;
4. every payment is listed in the cycle report, and cumulative Program Costs are reported against the cycle allocation.

FURTHER RESOLVED, that a payment not on an approved schedule requires a fresh Committee approval at the same threshold and its own published record.

**Reserved matters**

FURTHER RESOLVED, that the Committee may fund work through three instruments: a **directed RFP**; an **unsolicited proposal** under the open call (Framework 26); and a **bounty** (Framework 26a) — a published fixed-price task, open to anyone, paid to the first acceptable delivery, where the publication vote is itself the award decision at the award threshold. **Neither the open call nor bounties carries a per-cycle sub-limit.** All three instruments draw on the Cycle Ceiling and compete on the merits. An unsolicited award clears the same award threshold, Per-Award Limit, publication, delay, and objection bands as a directed one, so a sub-limit would add no protection the award process does not already give — and would create an artificial cap, blocking good work in a quarter with few directed RFPs while money sat unusable.

FURTHER RESOLVED, that **there is likewise no per-bounty cap**: a bounty is bounded by the **Per-Award Limit** and the **Cycle Ceiling**, the same two limits as every other award, and by nothing else.

FURTHER RESOLVED, that what a bounty gives up is the **evaluation round** — the Network never compares approaches, prices, or teams — and that what replaces it is **openness**, anyone being able to deliver and the first acceptable delivery winning; that this substitution holds at small sizes and **weakens as the price rises**, since nobody speculatively builds a large system hoping to win a race; and that the controls are therefore:

1. a **minimum open period before any delivery may be accepted** — **21 days**, or **10 days** below USD 5,000 or where urgency is recorded, matching Framework 20.5 — because "first acceptable delivery wins" is only a contest if a second party had time to enter one;
2. **where the Committee expects only one party will realistically deliver, it records and publishes that expectation and its reasons.** This does not stop the bounty. A bounty nobody else will attempt is a **sole-source award** — a normal and often correct thing to do, which should be documented as one rather than described as an open contest. Such bounties are listed separately in the cycle report.

FURTHER RESOLVED, that a bounty reserves its price at publication, lapses at its closing date or at cycle end, and is otherwise subject to every rule that applies to an award — contract first, signature, delay, objection banding, conflict checks, the ban register, and the bar on splitting work that should have been an RFP.

FURTHER RESOLVED, that the **cycle report breaks spending down by channel** — directed RFPs, open call, bounties — as amounts and as shares of the Cycle Ceiling; and that where bounties exceed **25%** of the awards committed in a cycle the Committee **states why** (Framework 13.5, which sets that trigger). That is comply-or-explain, not a cap: block producers may change any limit at the Threshold at any time, and this breakdown is the number they need in order to decide.

FURTHER RESOLVED, that these matters are **outside the mandate and require an MSIG Resolution**: any award above the Per-Award Limit measured on total contract value; any award taking total Award Commitments above the Cycle Ceiling; any award extending beyond the end of the authorized funding period; any award that would fail the coverage test in this Part; **any milestone approved under an executed agreement that the Program Account balance cannot cover;** any award where recusals leave fewer than three non-recused members or fewer than four able to sign; **any payment, including a Program Cost payment, where recusals or vacancies leave fewer than four members able to sign; any award for work on the RFP system where the Committee records that no other capable provider exists; any termination recommendation on an award reviewed by a Committee member where recusals of any kind leave fewer than four non-recused members; any milestone on an award whose published statement says a Reviewer is engaged, where none is engaged and no substitute has been engaged; any milestone or evaluation on an RFP where no unconflicted Manager of record is available, MSIG being able to direct the engagement of a named Manager or another basis of approval;** any award the conflict rules would forbid; any change to the mandate, the limits, the cycle length, the Committee Permission, the denomination convention, or the funding source — **the denomination convention here meaning the USD denomination, the payment of A, the conversion formula and the truncation rule, and not the designation of a replacement Reference Source under this Part, which is the Committee's**; **the creation of any entity** (see Part I); and anything the Committee escalates.

FURTHER RESOLVED, that the Committee must send such matters to MSIG within **10 business days**, and that if MSIG does not act within **30 days** the matter is **treated as declined**.

### Part E — The Program Account and how payments work

RESOLVED, that the on-chain account **`rfp.vst`**, a subaccount of `vst`, is established as the **Program Account**, and that program funds are held there and nowhere else.

FURTHER RESOLVED, that **the name confers no authority**. `rfp.vst` reads as belonging to the VST, but under Antelope a parent account has no standing control over a subaccount once created, and the permissions below govern: the owner permission sits with `eosio.prods` and disbursement requires 4 of 5 Committee signatures. **The VST cannot move program funds.** The name is a convention for legibility, nothing more.

FURTHER RESOLVED, that **the `vst` name has been secured**, so the contingency below is spent and recorded only for completeness: had it not been, VS LLC would have proposed an alternative account name and **that name would have required MSIG confirmation before the Program Account was funded**. The account holding the program's funds is named by block producers, not by whoever publishes the configuration.

FURTHER RESOLVED, that the Committee Permission on that account is configured as:

| Setting | Value |
|---|---|
| Weight per seated member | 1 unit, 5 units total |
| To move funds | **4 of 5** |
| For administrative actions that move no funds, including cancelling a payment | **3 of 5** |
| Owner permission | **`eosio.prods`** |
| Delay before a payment executes | **168** hours (7 days) |
| Shorter delay for urgent awards | **72** hours (3 days) |

FURTHER RESOLVED, that the shorter delay may be used only where the Committee has voted to declare urgency **at the award threshold — two-thirds of filled non-recused seats, minimum 3** — recorded the reason, and **completed publication before proposing the payment**, so that the shorter window is a real opportunity to object.

FURTHER RESOLVED, that **no payment may be proposed on-chain before VS LLC has signed the agreement with the awardee**.

FURTHER RESOLVED, that during the delay window block producers may **cancel any payment at the Threshold**, whatever kind it is.

FURTHER RESOLVED, that **objection banding applies only to the initial award disbursement**. Milestone payments and Program Cost payments carry the delay and remain cancellable by block producers, but have no objection banding, because they execute commitments already published and approved. Objections recorded on the Portal against an award disbursement have these effects:

| Objections | Result |
|---|---|
| **0 to 3** | Payment proceeds when the delay ends |
| **4 to 6** | Committee cancels; the award proceeds only if MSIG confirms it |
| **7 or more** | Committee cancels and the award ends. No MSIG vote is held |

FURTHER RESOLVED, that **7 is used because 7 block producers can block a 15-of-21 decision** — an award with 7 objections could never be confirmed, so no vote is held.

FURTHER RESOLVED, that cancellation in the 4-to-6 and 7-or-more bands is **mandatory, not discretionary**. The Committee shall cancel within **2 business days** of the objection count closing. **Failure to cancel is an express ground for referral to MSIG for removal**, and block producers may cancel through the owner permission. Without this the backstop would be unusable: a Committee that simply declined to act could not be stopped by 4 to 6 objectors, who are by definition short of the Threshold.

FURTHER RESOLVED, that after a cancellation in the 4-to-6 band the Committee shall submit the record and a draft confirming Resolution to MSIG within **10 business days**, and that if MSIG has not confirmed within **30 days of that submission**, the award **lapses**, its reservation is released, and the Committee may re-scope and re-run.

FURTHER RESOLVED, that **MSIG confirmation revives the award decision but not the agreement**. Because the awardee agreement terminates on cancellation, VS LLC shall execute a **fresh agreement on identical terms** before the disbursement is proposed again, within the 60-day window in this Part running from the date of confirmation.

FURTHER RESOLVED, that **VS LLC is directed to develop and configure the Program Account and the Committee Permission**, and to **publish the configuration as Exhibit D** before the Program Account is funded, covering: the account name, permission structure and thresholds, the delay mechanism and its values, the cancellation path and the exact action and authority required to use it, account resource provisioning, the `eosusd` pair and its `quoted_precision`, and a worked example of the payment calculation.

FURTHER RESOLVED, that VS LLC is **further directed to establish the on-chain disclosure register** required by Framework 6.3b on a **separate account, `disc.vst`**, and to cover in Exhibit D its account name, the append-only contract and its ABI, the deploying and writing authority, and the coded-answer schema and questionnaire version in use; and, in a separate decisions table on the same account, the records required by Framework 7.6a — award decisions, milestone approvals, payment signatures, and Committee resolutions with an external effect — covering the decisions schema, the hash algorithm **and the serialization it runs over**, the version of the published record hashed, the writing authority, the **deployment and upgrade authority**, and **RAM provisioning** — an append-only register grows for the life of the program and a register that cannot accept writes stops it. Disclosures are **not** written to the Program Account: that account holds funds, its owner permission is `eosio.prods`, and no routine writing key should exist on it.

FURTHER RESOLVED, that the configuration shall record the **public key delivered by each member**, and that the permission is configured with those keys and activated only once all five are delivered. Delivering a key to VS LLC and activating the permission are separate steps.

**If the protocol cannot enforce the delay**

FURTHER RESOLVED, that the delay is intended to be **enforced by the chain**. If VS LLC determines that transaction-level delays are unavailable on the current protocol version, the fallback is a **held multisignature proposal**: the Committee proposes the disbursement, the proposal remains **unexecuted and publicly visible** for the full window, and only then is it executed. Under the fallback the proposal identifier is published with the award, and block producers retain their cancellation route through the owner permission.

FURTHER RESOLVED, that VS LLC shall state in Exhibit D **which mechanism is in use**, and that the Program Account is not funded until it does. Where any element cannot be built as described, VS LLC is to say so and propose the nearest workable alternative rather than proceed on an assumption.

### Part F — The Community seat

RESOLVED, that the **EOS Community Foundation (ECF)** is recognized as the designer and administrator of the community vote for the Community seat.

FURTHER RESOLVED, that **ECF is independent of this program and is not funded by it** — recognizing ECF as administrator of the vote creates **no funding obligation**, and nothing in this Resolution pays ECF or its members. Should ECF seek Network funding it **proposes its own MSIG**, voted on directly by block producers; it is not an award under this program and not the Committee's decision. ECF selects the person filling one of the Committee's five seats, and a Committee that also set ECF's budget would be funding the body that seats one of its own members.

FURTHER RESOLVED, that **ECF may bid on RFPs** — barring the community foundation from community and education work would cost the Network more than it protects — but that **ECF is a connected organization of the Community seat holder** under Framework 6.2 wherever that member is engaged by, paid by, or holds a position in ECF; so the connection is declared in writing **before publication**, the member **recuses fully**, both are minuted and published, and the member may not help set the budget or criteria for an RFP ECF later bids on. Any ECF stipend is in any event a Part 2 disclosure under Framework 6.3a, filed on-chain whoever pays it.

FURTHER RESOLVED, that the ECF vote produces a **nomination**, and MSIG seats the winner; and that block producers should refuse to seat an ECF winner only for **disqualifying cause**, stating publicly any other basis for refusing.

FURTHER RESOLVED, that **Francis Sangkuan** holds the seat in the meantime with full voting rights, full signing weight, and full pay, until the first ECF winner is seated or until **9 months from the execution of this MSIG**, whichever comes first.

FURTHER RESOLVED, that this period runs from **execution**, not from the funding date, so that ECF is not held up waiting for the program to be funded — its process can run in parallel. **MSIG may extend it once**, at the Threshold, on ECF's request.

FURTHER RESOLVED, that if that date passes with no winner, **MSIG fills the seat at the Threshold**, since an empty seat would stop payments.

FURTHER RESOLVED, that if **ECF stops running the process or ceases to exist**, MSIG may name another administrator or **fill the Community seat at the Threshold like any other seat**, using the Exhibit E template; that filling it that way is **durable and may continue indefinitely**, appointment after appointment, block producers being the Network's ultimate consensus and taking selection over where no community process exists rather than leaving the seat empty; that MSIG **may** hand selection back to a later community process but is not obliged to; and that **the seat does not change character** — it keeps its Community portfolio, category assignments, vote, signing weight, and pay. A seat MSIG fills is not a lesser seat.

FURTHER RESOLVED, that ECF is asked to publish its process by **[___]** and complete the first vote by **[___]**, and that a Community member **seated by MSIG — whether an ECF winner or a seat filled under the preceding clause** — serves a **one (1) year** term **running from the execution of the Resolution that seats them**. The interim holding above is not a one-year term and ends as provided there.

### Part G — Program roles and VS LLC

RESOLVED, that the program has two contractor roles, selected by the Committee and contracted by VS LLC under the rate card at **Exhibit B**:

1. **RFP Program Managers**, engaged as a pool, with **exactly one Manager of record for each RFP**, who runs it and **approves its milestones for payment**. A Manager may hold several RFPs. The Committee may reassign an RFP by majority, publishing the change, with a written handover.
2. **Technical Reviewers**, engaged **where the RFP's own published statement says a Reviewer is engaged** — fixed at publication and not reopened at signing, a question the Committee settles at scoping by whether the work is technical, **including on a Service award, which has no built deliverable but may well need technical assessment** — whose written assessments inform evaluation and milestone approval.

FURTHER RESOLVED, that **every decision in the program is attributable to named individuals**: a milestone approval names the **Manager of record** and any **Technical Reviewer** by name and on-chain account; a payment names **each signing Committee member by name and on-chain account**, both and not the account alone; and an award names every member voting for, against, and recused, **by name and account**. An account can be rotated, renamed, or rebuilt by block producers under the owner permission; the name is what keeps the record answerable years later.

FURTHER RESOLVED, that **the decisions behind payments are recorded on-chain**, not merely published — award decisions, milestone approvals, payment signatures, and Committee resolutions with an external effect — on the same append-only register as the disclosure questionnaires, in a separate decisions table, each with a hash of the published record so the Portal copy can be checked against it. A Portal that goes down or changes hands cannot then take the decision history with it.

FURTHER RESOLVED, that **the RFP platform and Portal code are VST-owned work product**, operated by VS LLC and not owned by it; and that code written before this Resolution was written under no Independent Contractor Agreement and so was never vested — **moving a repository is not an assignment of copyright** — so that a **written assignment from every party that authored it in favour of the VST**, or failing that a perpetual, irrevocable, sublicensable licence, **and** transfer to a VST-controlled repository are **both preconditions** to the program relying on it.

FURTHER RESOLVED, that **the Committee may fund work on the RFP system itself** through the ordinary process — published RFP, award threshold, contract, delay, signature — **categorized to Core Development and counted against the Cycle Ceiling**; that **VS LLC and any entity connected to it may not bid on such work**, since VS LLC operates the system, holds its code, contracts the awardee, runs the Portal, performs the refusal check, and writes the decision record — and where no other capable provider exists the award is a reserved matter; that **the test is whether the engagement changes what the system does**, so building or materially reworking it is an **award** while keeping it running unchanged is an **operating cost**, and the **Committee makes that classification by recorded vote**, not VS LLC; and that every such award is **flagged as self-referential in the cycle report**, so that a program spending on itself has to look at that number each cycle.

FURTHER RESOLVED, that **milestone approval rests with the Manager of record, not the Committee**; that a Technical Reviewer's written assessment is **required at each milestone under an award whose published statement under Framework 20.2 says a Reviewer is engaged**, and is not required where it says one is not; and that the approval record is **published on the Portal**.

FURTHER RESOLVED, that the Committee's four signatures on a milestone payment are **administrative** — confirming only that a complete approval record exists, the amount matches the published schedule, a Technical Reviewer assessment is present **where the RFP's published statement says one is engaged** — and is not required where it says one is not, the payment is within the award, and **no termination recommendation under Framework 11.10a is open on that award** — and that **the Committee does not judge the work again**.

FURTHER RESOLVED, that signing the **award disbursement** is administrative in the same way, confirming only that the decision record is complete, the executed agreement matches it, the amount is within the limits, the delay has run, and no termination recommendation under Framework 11.10a is open on that award.

FURTHER RESOLVED, that **a member who voted against an award shall nonetheless sign its disbursement**, absent one of those failures or credible evidence of misrepresentation or breach of the conflict rules. A single recusal leaves exactly four available signers, so a dissenting member withholding a signature could otherwise veto a properly passed award alone. Disagreement belongs at the vote, not at the signature.

FURTHER RESOLVED, that **no Committee member may serve as an RFP Program Manager** on any RFP (**Framework 12.2a**), without exception and without any waiver at any threshold; that a person seated while holding a Manager engagement **ceases to be Manager of record on execution of the appointment**, their RFPs being reassigned within 5 business days; that milestone approval therefore always rests with a Manager of record who is not on the Committee, including on an RFP reviewed by a member; and that this is the safeguard on which the Committee's ministerial signature under **Framework 11.4** depends.

FURTHER RESOLVED, that **a Committee member may be engaged as a Technical Reviewer** — the Reviewer role only, never the Manager role — on the terms in Framework 12.6 and no others, namely:

1. **not until MSIG has set both caps** — the per-cycle cap on Reviewer fees a member may earn and the cap on concurrent engagements (Part H) — until then no member may be engaged;
2. only where the Committee has **recorded that no suitable unconflicted external reviewer was available**, published with the engagement;
3. only while **all five seats are filled**, an engagement being suspended for any vacancy; and where the suspended member is the **only engaged Reviewer on a published RFP or a live award**, the Committee shall engage a **substitute Reviewer** for that RFP — the published statement records that a Reviewer is engaged, not who — failing which, for a published RFP not yet awarded the Manager of record writes the scored assessment, and for a live award the affected milestone goes to MSIG;
4. **no more than one member per RFP**, and the engagement leaving the member **within both caps** — fees and concurrent engagements;
5. the member **recuses from the availability finding and from the vote engaging them**;
6. on that RFP the member **does not draft the acceptance criteria or milestone schedule**, **does not score proposals** and takes **no part in score reconciliation** (a written note to the Committee instead — where they are the only engaged Reviewer the Manager of record writes the scored assessment), and **does not vote on any termination recommendation, recovery plan, or strike decision concerning that award, whoever filed it, and whether or not the engagement has since ended or been suspended** — where **recusals of any kind** would leave fewer than four non-recused members, the recommendation goes to MSIG;
7. the member **keeps their award vote** and **may sign the milestone payment**;
8. the fee is the **Exhibit B rate card amount**, which the Committee cannot set or vary; it is paid on **its own separate payment**, one per member-Reviewer, signed by the other four, from which that member recuses;
9. every engagement and fee is **published in the cycle report** by member and by RFP, with each member's cumulative fees shown against the per-cycle cap, and the member **files a disclosure questionnaire update before the engagement begins**.

FURTHER RESOLVED, that both roles may not bid on any RFP they work on during the engagement and for **6 months** afterwards, may not approve or assess milestones for an awardee they are conflicted on — **conflicted** having the meaning given in Framework 6.4 — and may not be paid in any way that depends on milestone approval or on the size or outcome of an award.

**Material conflict breaches carry a permanent ban**

FURTHER RESOLVED, that a **material breach of the conflict-of-interest rules** — self-dealing, an undisclosed interest in a proposer or awardee, taking payment from a proposer or awardee, using proposal information for private advantage, breaching confidentiality, or signing on a matter the person was recused from — results in immediate suspension of the person's role, signing weight, and pay, and referral to MSIG.

FURTHER RESOLVED, that on confirmation **at the Threshold**, the person is **permanently barred** from holding a Steering Committee seat, from serving as an RFP Program Manager or Technical Reviewer, and from submitting or being named on any proposal to the RFP program or receiving any payment from it — directly or through any entity in which they hold a material interest.

FURTHER RESOLVED, that a ban may be **lifted only at the same Threshold**. Fifteen of twenty-one confirm it and fifteen of twenty-one are required to overturn it. It does not expire, and no Committee vote reduces it.

FURTHER RESOLVED, that before MSIG votes the person shall receive the allegation in writing and **10 business days** to respond, and their response is published with the referral.

FURTHER RESOLVED, that **VS LLC shall maintain a published register of bans** on the Portal, checked at proposal submission and before any role is assigned.

FURTHER RESOLVED, that **every RFP declares its award shape at publication** — **Deliverable**, **Service**, or **Embedded** (Framework 20.2a) — fixed there and **not reopened at contracting or at signing**; and that the shape says **what the work product is**, never that section 9 is disapplied:

1. a **Deliverable** award vests what was built, released under the licence recorded in the award decision — required by the RFP, offered by the awardee from the permitted set, or the applicable default;
2. an **Embedded** award vests the named deliverable, **carves out the awardee's identified pre-existing IP**, and takes an **irrevocable licence back, surviving termination**, over any pre-existing IP embedded in the deliverable, sufficient for the Network to use, modify, and have others operate it;
3. a **Service** award vests the **operational handover set** — configuration, deployment tooling, runbooks, and an export of any Network data — and nothing else, the running service being performed rather than delivered. Because it vests, the Network may give it to a successor provider, which is what makes a service re-competable rather than renewed indefinitely.

FURTHER RESOLVED, that on **termination** the operational handover set and the data export fall due on a Service award, and the licence back survives on an Embedded award.

FURTHER RESOLVED, that on **every** shape an awardee's **pre-existing IP is carved out and identified in the Schedule A at contracting** — an unlisted item is not pre-existing IP — and that where pre-existing IP is embedded in the work product the awardee grants the VST an **irrevocable licence back, surviving termination**, sufficient for the Network to use, modify, and have third parties operate it. On a Service award the awardee's own service software is pre-existing IP and is identified as such, and the awardee warrants the handover set is **independently usable** by a successor.

FURTHER RESOLVED, that **until counsel has confirmed that section 9 of the standard Independent Contractor Agreement permits that carve-out and licence back by Schedule A, and the confirmation is recorded: no Service or Embedded RFP may be published, and no award of any shape may be contracted with a populated pre-existing-IP schedule.** A Deliverable award carving nothing out may proceed. Defining what the work product **is** for a shape does not narrow section 9; only the carve-out does.

FURTHER RESOLVED, that the **default licences** are **Apache-2.0** for code and **CC-BY-4.0** for non-code deliverables; that every **Deliverable and Embedded** RFP declares a **licence mode** at publication — **Required** (the RFP names a binding licence), **Proposer's choice** (the RFP names a permitted set and the proposer picks from it, the choice becoming a term of the award), or **Default**; that a **Service** award declares no mode, its handover set vesting outright with nothing to licence; that a **closed-source** RFP is published in Required mode only; that **the mode, the permitted set, and in Required mode the licence, lock at publication**, while in Proposer's choice mode the licence itself fixes at the **award decision** and is recorded there; that the **Committee decides the mode, and in Required mode the licence, at the publication threshold**; that where the choice is opened the Committee **names the permitted set in that RFP** — decided per RFP, with **no standing list**, since the right set depends on the work — absent which the set falls back to **permissive licences only** as a backstop against a drafting slip, a copyleft obligation on Network infrastructure being a decision to take deliberately rather than inherit; that the licence offered may be scored **only if published as a criterion in its own right, with its own weight, before submissions open** — the standing openness criterion not sufficing; that any departure is **stated in the RFP at publication with reasons**, and that where a deliverable cannot be released as usable open source the RFP must say so at publication and state what the Network receives instead; an RFP that is silent is an open-source RFP.

FURTHER RESOLVED, that program **funds** are Network funds held outside the Trust, while **work product — as defined for the award's shape above —** vests in the VST. This is deliberate: holding intellectual property for the Network is an express Trust purpose, while allocating Network funds is not.

FURTHER RESOLVED, that **VS LLC contracts with awardees** using the standard Vaulta Stewardship LLC Independent Contractor Agreement, under which **work product, as defined for the award's shape, vests in the VST**; that its role is **administrative and contractual only**; that it does not choose awardees and does not control the Program Account; and that it must **refuse to contract** on a decision plainly outside the mandate, telling the Committee and MSIG in writing why.

FURTHER RESOLVED, that VS LLC's costs of this role come from program operating costs and are **separate from** the CY2026 VST operating funding under MSIG #3.

### Part H — Committee pay

RESOLVED, that Committee members are **not employees of the Trust**, and that VS LLC is authorized to contract with each of them.

FURTHER RESOLVED, that pay is a **fixed retainer of USD 2,500 per member per month** *(recommended)*, **paid in arrears** in A at the reference rate in Part D on the date of each payment, the same for all five seats including the Community seat and the interim holder, with **no** per-meeting fees, success fees, or pay linked to the size, number, or outcome of any award.

FURTHER RESOLVED, that **Technical Reviewer fees earned by a member** under Framework 12.6 are **Program Costs, not Committee pay** — they fall outside the retainer and outside the aggregate cap below. Block producers should note that permitting them makes member pay **unequal in practice, in favour of whichever seat does the technical reviewing**, which is the question Part H otherwise leaves open.

FURTHER RESOLVED, that the control on this is a **per-cycle cap on Reviewer fees a member may earn, together with a cap on concurrent engagements**, set at **[___] per cycle** and **[___] concurrent engagements** *(open — see Blanks)*; and that **no member may be engaged as Technical Reviewer until those figures are set**. The arrangement does not begin before its only control exists.

FURTHER RESOLVED, that each contract must cover: the retainer; **assignment of all work product to the VST**, per section 9 of the standard Independent Contractor Agreement; confidentiality; the conflict and recusal duties in the Framework, including the 6-month bar on bidding after leaving; **key custody duties**, including secure handling, no sharing or delegation, and surrender on removal or replacement; **automatic suspension of pay** if the member is referred to MSIG for removal or misses 3 consecutive meetings without excuse; and termination on removal or when the term ends.

FURTHER RESOLVED, that reasonable pre-approved expenses are reimbursable, and that total pay authorized is **USD 12,500 per month in aggregate**, funded cycle by cycle as part of each cycle's transfer, so that pay continues only for so long as block producers keep funding it.

### Part I — Funding

RESOLVED, that the active block producers **request the transfer of A to the value of USD 296,875** to the Program Account, being the first quarterly instalment, from the funding pools allocated to the Network — the REX yield pool and the Year 1 allocation — held at **[___]** *(name the source account)*.

FURTHER RESOLVED, that if the request is **declined, delayed, or only partly met**, the program does not begin: the Program Account is not funded, no cycle starts, no term runs, and no pay accrues. The Committee shall report the position publicly and MSIG may re-scope the program to the amount actually available. Every clock in this Resolution starts at funding precisely so that a shortfall postpones the program rather than quietly shrinking it mid-cycle.

FURTHER RESOLVED, that this is a **one-way contribution of Network funds**; that it does not pass through and is not held by the VST; and that if any part of those pools is currently held by the VST or VS LLC, its transfer is a release of Network funds, not a Trust activity.

FURTHER RESOLVED, that this Resolution authorizes **four cycles**. Authorizing the **next four** requires a further MSIG Resolution, and that is the recurring decision point which replaces a fixed mandate term.

FURTHER RESOLVED, that the amount authorized for the **first funding period of four cycles** is **USD 950,000**, being:

| Component | Per cycle | Four cycles |
|---|---|---|
| Cycle Ceiling for awards | 150,000 | 600,000 |
| Program operating costs | 50,000 | 200,000 |
| Committee pay | 37,500 | 150,000 |
| **Total Program Spend** | **237,500** | **950,000** |

FURTHER RESOLVED, that funds are **transferred in four quarterly instalments, not all at once**, and that each instalment **tops the Program Account up to 125% of the coming cycle's Total Program Spend**, measured in A at the Reference Rate. Forward commitments are not added on top, because they already sit inside that cycle's Cycle Ceiling.

FURTHER RESOLVED, that the **25% margin is not spending authority**. It exists because commitments are in USD while the account holds A, and a fall in the price of A would otherwise leave the program unable to pay what it has promised. The Committee may not commit against it.

FURTHER RESOLVED, that the **first instalment is A to the value of USD 296,875** at the Reference Rate on the date of transfer, being 125% of the first cycle's Total Program Spend of USD 237,500.

FURTHER RESOLVED, that instalments after the first require **no further vote** — they are authorized by this Resolution — but that block producers may **stop, reduce, or re-time any instalment** by MSIG Resolution at any time.

FURTHER RESOLVED, that unspent amounts, including the margin, **do not carry into the next funding period**. At the end of a funding period the balance remaining after all contracted obligations are met is **returned or swept through the owner permission as MSIG directs**. Nothing is swept at the end of an individual cycle, because the quarterly top-up mechanism assumes a carried balance.

**No authority to create an entity**

FURTHER RESOLVED, that the Steering Committee currently serves as the Network's point of decision for RFP funding, and that this MSIG **does not** authorize the Committee, the VST, or VS LLC to **form, register, incorporate, or become a member or director of any company, foundation, association, trust, or other entity** on behalf of the Network. **Creating any such entity requires a separate MSIG Resolution at the Threshold.**

FURTHER RESOLVED, that this restriction applies whether the entity would be created directly or through an agent, adviser, or affiliate, and whether or not it would hold funds.

FURTHER RESOLVED, that this MSIG **does not decide** the wider question of who receives and manages the REX yield and Year 1 pools generally. It answers that question **only for the RFP program**, and the Committee is not the Network's representative for any other funds.

### Part J — Effect

RESOLVED, that this MSIG **overrides earlier MSIGs only where they directly conflict**, and that MSIGs #2, #3, and #4 otherwise remain fully in force.

FURTHER RESOLVED, that the Trustee is directed to execute any conforming amendments to the Trust Agreement needed to reflect the Committee's new name, size, and dual capacity, prepared by counsel and attached as **Exhibit C**.

FURTHER RESOLVED, that these amendments are made under the vstcreation MSIG, which approved the governing documents and provided that **"any material amendment or substantive change shall require a separate MSIG Resolution"**. This Resolution is that separate MSIG Resolution.

FURTHER RESOLVED, that this MSIG **takes effect when it is executed**, and that the **Program Account is not funded until the Exhibit D configuration under Part E is published**.

**Clocks start when the money arrives, not when this MSIG passes**

FURTHER RESOLVED, that the **first cycle begins on the date funds are received in the Program Account**, not on the effective date of this MSIG, and that the cycle end date in Part D is calculated from that date.

FURTHER RESOLVED, that **Committee pay under Part H accrues from the later of** the date the member's engagement contract is signed and the date funds are received in the Program Account, so that VS LLC does not incur obligations it has not been funded to meet.

FURTHER RESOLVED, that the Committee shall **publish the funding date on the Portal** when it occurs, since **four** separate periods are calculated from it: the cycle, the pay period, the initial terms of the four MSIG-appointed seats, and the nine-month self-review under Framework 16.1. The nine months in Part F run from **execution** of this MSIG instead, and are a different period of the same length.

---

## Attachments

| Exhibit | Document | From |
|---|---|---|
| **A** | Vaulta Network RFP Framework | Working group |
| **B** | Manager and Reviewer rate card and scope | To be prepared |
| **C** | Trust Agreement conforming amendments | Counsel to the Trust |
| **D** | Program Account, permission, and `disc.vst` register configuration — **both the disclosure and decisions contracts** | VS LLC |
| **E** | Seat appointment MSIG template | This Resolution |
| **F** | Schedule A templates for Committee members, Program Managers, Technical Reviewers, and awardees | This Resolution |

## Blanks to fill

The MSIG takes effect on execution, so there is no effective date to fill. Recommended values are already entered where a recommendation could be made from what is known. Those are marked *(recommended)* in the text and remain open to change.

| # | Item | Part |
|---|---|---|
| 1 | ~~*Contingency:* alternative account name if the `vst` bid fails~~ — **closed. The `vst` bid has been won**, so the Program Account is `rfp.vst` and the register account is `disc.vst` as drafted | E |
| 2 | Source account holding the REX yield and Year 1 pools | I |
| 3 | Candidates to be proposed for the four seats by Exhibit E MSIG — individually, as a full slate, or in any subset | B |
| 4 | ECF process publication and first vote dates | F |
| 5 | Exhibits B, C, D. **Blocking — the Program Account is not funded until Exhibit D is published (Part J), and no Manager or Reviewer may be contracted until Exhibit B's rate card exists** | Attachments |
| 6 | Confirm or change the recommended figures: Cycle Ceiling, Per-Award Limit, operating costs, Committee pay | D, H, I |
| 7 | ~~Open question: equal or differentiated seat pay~~ — **closed for now: equal**, as drafted. Revisit at the annual review under Framework 14.3, and note that Reviewer fees under Framework 12.6 make pay unequal in practice, which is what the caps in blank 12 control | H |
| 8 | The **disclosure questionnaire instrument** — version 1 text, coded-answer schema, and holdings band set (Framework 6.3a). **Blocking — the Program Account is not funded until every member has filed, which is impossible before the instrument exists** | B |
| 9 | The **`disc.vst` register** — account, both contracts (**disclosures** and **decisions**), both schemas, the hash algorithm and serialization, RAM provisioning, upgrade authority, and the writing authority, to be covered in Exhibit D (Framework 6.3b, 7.6a). **To be built and serviced by the EOS Rio team; VS LLC remains accountable.** **Blocking — the Program Account is not funded until Exhibit D is published** | E |
| 10 | ~~Licences~~ — **closed: Apache-2.0 for code, CC-BY-4.0 for non-code**, the three licence modes in Framework 20.2a, and the Proposer's-choice **permitted set named per RFP** — no standing list | G |
| 11 | **Counsel confirmation that section 9** of the standard Independent Contractor Agreement permits the pre-existing-IP carve-out and licence back by Schedule A. **Blocking — until confirmed, no Service or Embedded RFP may be published and no award may be contracted with a populated pre-existing-IP schedule** (Part G) | G, F |
| 12 | **Per-cycle cap on Technical Reviewer fees a Committee member may earn, and cap on concurrent engagements**, under Framework 12.6. **Blocking — no member may be engaged until both are set** | G, H |
| 13 | ~~Confirm what "grant" means~~ — **closed: "grant" is the open call in Framework 26**, not a further instrument. The Committee funds through three instruments only: directed RFP, open call, bounty. *Bounties carry **no cap and no sub-limit** — the Per-Award Limit and Cycle Ceiling are the only bounds* | D |
| 14 | **Transfer of the existing platform code and rights to the VST** (Framework 15.2a). **EOS Rio has committed to transferring both, and that commitment is accepted.** Remaining work is administrative: the executed assignment, confirmation it covers every contributor, and the repository transfer. **Not blocking** — tracked as a handover deliverable | G |
| 15 | **Post-award review threshold** under Framework 25.2 — **recommended USD 25,000 on total contract value**, entered in Part D. Confirm or change it. Also scope the review as a Manager task in the **Exhibit B rate card**, or it is unfunded work. **Not blocking** — no award is held up by it | D, B |

## Notes for review

**1. What the vstcreation MSIG says.** The full text has now been reviewed. Four points.

**No Committee term exists.** vstcreation establishes the Oversight Committee "with three (3) initial members ... effective upon formation of the Trust" and stops there. No duration, no renewal, no selection process for later appointments. Part B therefore **sets** a one-year term rather than extending one, and supersedes MSIG #2's reference to "the remainder of Dario Cesaro's Initial Term", which has nothing to anchor to.

**The likely source of the confusion.** The Trust was formed on 13 February 2026. The Committee has been serving for roughly six months. That is an elapsed period, not a term — and it is easy to hear one as the other. The only six-month *term* anywhere is the Trustee's Initial Interim Term under Trust Agreement section 5(b).

**Two approved documents remain unreviewed.** vstcreation approved the LLC Operating Agreement, the Trust Agreement, and the **Trustee Compensation and Indemnification Acknowledgment**. Only the Trust Agreement has been provided. The standard Independent Contractor Agreement has since been reviewed and Part H now follows it, but the Acknowledgment may add indemnification terms specific to compensated governance roles that Committee members should have too. **Worth checking before Part H is final.**

**The amendment path is clear.** vstcreation provides that material amendment of the approved governing documents requires a separate MSIG Resolution. Part J relies on that clause.

**2. Where the recommended figures come from.** *Market figures as at the date of this draft; the USD denomination of every limit is unaffected by price movement, but the share-of-yield comparison below is not.* A trades at roughly **USD 0.077**, giving a market capitalisation of about USD 127 million on a circulating supply of about 1.66 billion A. The REX yield pool of 18–20M A a year is therefore worth roughly **USD 1.4–1.5 million a year**, or about **USD 350,000–380,000 a quarter**.

| Figure | Reasoning |
|---|---|
| **Cycle Ceiling USD 150,000** | About 40% of one quarter's REX yield, and about 10% of the annual yield. An earlier draft proposed 1,000,000 A, which at the current price is only about USD 77,000 — too thin to fund four to eight meaningful RFPs, and a good illustration of why the ceiling should be set in USD rather than in A |
| **Per-Award Limit USD 100,000** | Sized to accommodate recurring network infrastructure. The Treasury already contracts history API and related services at about **USD 7,000 a month** *(figure supplied by the VST; to be confirmed against the contract)*, which is USD 84,000 over a year. A USD 100,000 limit covers that with room, and is measured on total contract value so a monthly figure cannot be used to slip past it. This is a ceiling, not an expectation — early cycles are unlikely to approach it |
| **Operating costs USD 50,000 per quarter** | A pool of at least two Program Managers, Technical Reviewers on technical RFPs, Portal maintenance, administration. An estimate, to be replaced by a real quote once the rate card exists |
| **Committee pay USD 2,500 per member per month** | USD 150,000 a year across five seats. This is the figure most likely to be argued over, and it deserves to be. It is close to the VST's entire CY2026 operating budget of USD 160,000 under MSIG #3. The case for it is 1-year appointments with a named subject area, real evaluation workload, personal key custody, and legal exposure. The case against is that the Network would be paying its governance body roughly what it pays to run the Trust |
| **Buffer 25%** | A can fall a long way in a quarter. Without a buffer, a decline would leave the program holding signed agreements it cannot pay in full |

**3. What this costs against the yield, over a year.** Quarterly figures make the total easy to miss, so here it is plainly.

| | USD |
|---|---|
| Awards, four cycles | 600,000 |
| Operating costs, four cycles | 200,000 |
| Committee pay, four cycles | 150,000 |
| **Total authorized for one year (Total Program Spend)** | **950,000** |
| **Gross transferred** — first instalment 296,875, then three top-ups of up to 237,500 | **up to 1,009,375** |
| REX yield at today's price of A | ~1,400,000–1,500,000 a year |
| **Share of the annual yield — committed** | **roughly 65%** |
| **Share of the annual yield — gross transferred** | **roughly 70%** |

The gross figure is the one that leaves the Treasury. **The 25% margin is funded once, not four times** — each instalment after the first *tops the account up* to 125% of the coming cycle's spend, so it restores whatever the previous cycle consumed rather than adding a fresh margin. At full spend and a steady price the gross is 296,875 + 3 × 237,500. The margin is not spending authority and is returned at the end of the funding period, but it is unavailable to the Network in the meantime.

Gross runs **higher than 1,009,375 if the price of A falls**, because the top-up restores a USD-denominated level from an account holding A. It runs **lower if the program underspends**, since a carried balance reduces the next top-up.

**That is a large share, and block producers should decide it deliberately.** The REX yield is not reserved for the RFP program — it also has to cover Labs, infrastructure, and anything else the Network funds from it. If the intention is for the RFP program to be one call on the yield among several, the quarterly ceiling should come down. A ceiling of USD 100,000 a cycle brings the annual total to USD 750,000, about 52% of the yield.

The recommendation of USD 150,000 a cycle stands on administrative grounds — five part-time people can run perhaps four to eight RFPs well in a quarter, at USD 15,000 to 30,000 each, plus the in-cycle portion of any recurring infrastructure. But **that is a capacity argument, not an affordability argument**, and the two should be reconciled before this goes to a vote.

**4. What the Delphi Oracle actually provides.** The contract was reviewed rather than assumed. Three things matter.

It publishes a **median of the last 21 oracle submissions**, held in the `median` field of a `datapoints` table scoped by pair. That is a near-real-time figure, not a time-weighted average. An earlier draft specified a 30-day moving average; **the contract does not provide one.** The `bars` table in the header, which would hold aggregates, is declared but never populated and has no table type — it is unused code.

It keeps **no price history**. Only 21 rows exist per pair and the oldest is overwritten on each submission, so a rate read today cannot be re-read from the table tomorrow. That is why the approval record must capture the block and transaction of the read.

**The smoothing does not matter as much as it first appeared.** Because awards are denominated in USD, an awardee receives their contracted USD value whatever the price of A is doing — a volatile rate does not change what they are paid. The volatility lands on the program's A outflow instead, and that is already managed by the coverage test and the 25% margin. The 15% collar in Part D covers the remaining case: a momentary spike or crash producing an anomalous payment.

**4b. Denomination, and who carries the price risk.** An earlier draft priced awards in A and froze the A amount at the award decision, which put the price risk on awardees. That has been **reversed**: awards are now denominated in USD and the A amount is calculated at each milestone approval, so **the program carries the risk**.

This is the better allocation. Awardees are teams and individuals who budget in fiat, and asking them to absorb the movement of A over a multi-month engagement would have shown up as padded bids, shorter engagements, or good teams declining to bid at all.

The cost is that the program's purchasing power now moves with A. That is what the coverage test and the 25% buffer in Part D exist to manage. Two consequences block producers should understand before voting:

- **A sustained fall in A can force the program to stop awarding mid-cycle.** The coverage rules say so plainly rather than leaving it to be discovered.
- **The Treasury may be asked for a top-up** if coverage falls to the 10% floor. That is a reserved matter and comes back to block producers.

**5. How a USD 100,000 award sits inside a USD 150,000 cycle.** Charged to one cycle it would consume two-thirds of it, leaving little for anything else — which is why multi-cycle awards are handled separately in Part D. A twelve-month infrastructure service at USD 7,000 a month reserves only the months falling inside the current cycle, around USD 21,000 for a quarter. The rest becomes a **forward commitment** that reduces the ceiling in each later cycle it touches.

Two guardrails come with that. Forward commitments are **published in every cycle report**, so the Network can see what future budgets are already spoken for. And an award extending past the authorized funding period is a **reserved matter**, so the Committee cannot commit the Network beyond the funding block producers have approved.

There is also a practical point about the existing arrangement. The Treasury already contracts these services directly. Bringing that into the RFP program is a separate decision — whether to re-compete the service through an RFP, or to move the existing contract across as it stands. Neither happens automatically on approval of this MSIG, and whichever is chosen should be done deliberately rather than by the Committee simply issuing an RFP over a live arrangement.

**6. Why the mandate has no end date, and what replaces one.** The mandate **runs until block producers cancel it**, which is what a standing body normally looks like and avoids a cliff where the program stops because a renewal vote was not organized in time. The **funding period**, by contrast, does expire — every four cycles — and that is where the recurring decision now sits.

An expiry date was doing one useful thing, though, and it should be replaced rather than dropped. It forced a periodic decision. Without it, inertia favours continuation: revoking takes 15 of 21 affirmative votes, so a Committee that is merely mediocre rather than failing will continue by default.

Two things take its place:

- **Funding is authorized a year at a time.** Four cycles per Resolution, transferred quarterly. The Committee can only ever spend what block producers have authorized, and declining to authorize the next year requires no confrontation and no revocation vote. Block producers can also stop or reduce an instalment mid-year at the Threshold.
- **An annual published review.** Awards, outcomes, conflicts, coverage history, and whether the limits still fit. A scheduled moment when performance is on the record, whether or not anyone calls a vote.

This also fixes the awkward interaction with long awards. The constraint on a multi-cycle award is no longer "does the mandate still exist" but **"is it inside the authorized funding period"** — which is a better test, because it points at money block producers have actually committed rather than at the Committee's own tenure.

**7. The standard contractor agreement covers more than expected.** VS LLC's Independent Contractor Agreement template — the instrument already executed for the Trustee and LLC Manager — is used for Committee members, Program Managers, Technical Reviewers, and awardees alike, with a role-specific Schedule A. Four of its provisions do work this MSIG would otherwise have had to duplicate:

- **Section 2** provides that the agreement does **not** create a governance role. The seat comes from the MSIG appointment; the contract covers services, pay, confidentiality, and IP. That is exactly the right separation for a Committee member.
- **Section 5** terminates the services automatically when a role requiring MSIG appointment is ended by MSIG Resolution. Removal and contract termination stay in step without further drafting.
- **Section 9** vests work product in the Trust regardless of funding source, in terms almost identical to the Trust Agreement. An earlier draft of this MSIG assigned work product to VS LLC; **that was wrong and has been corrected** to match the executed template.
- **Section 11** requires return or secure deletion of credentials on termination, and cooperation in credential rotation and revocation of permissions. That is the contractual counterpart of the key-surrender obligation in the Framework.

**8. Why the clocks start at funding.** Under MSIG #3 the Treasury funding for the VST was approved well before it arrived, and the Trustee and LLC Manager contracts were only signed in June 2026 once it did. If the same gap happens here and the cycle and pay run from MSIG approval, VS LLC would carry retainer obligations against money it does not have, and the cycle would burn while the Committee had nothing to allocate. Part J therefore ties both clocks to the arrival of funds.

**9. Settled for now: equal pay.** Part H pays **all five seats equally**, and the working group has confirmed that for the first funding period. **Revisit at the annual review** under Framework 14.3 — and note that Reviewer fees under Framework 12.6 make pay unequal in practice, which is what the caps in blank 12 exist to control. The arguments considered, kept as the record of reasoning:

*For differentiating.* Core Development, Business Development, and Marketing carry recurring scoping and diligence work in their categories. Technical judgment in particular is the hardest of the five to recruit, and a weak evaluation there costs the most.

*For equal pay.* By the seat table in the Framework, the Community seat carries two named MSIG #4 categories — educational initiatives, and community engagement and advocacy — while Business Development carries one. Portfolio load does not rank the way intuition suggests, and it is in any case a poor proxy for effort. The At-Large member **chairs** the Committee, which is different work rather than less of it. All five hold identical vote weight, identical signing duty, identical key custody, identical conflict obligations, and identical liability exposure. And the Community seat is the one filled by **community vote** — paying it least is a statement about its standing that will be quoted back during the first contested award.

*Alternatives to a seat differential.* Scarce technical expertise can be bought per engagement through the **Technical Reviewer budget**, where it is needed and at a rate that reflects it, rather than embedded permanently in a retainer. Drafting and category diligence can sit with the **Program Manager pool**, with the portfolio lead sponsoring and directing rather than producing.

**10. Read Part I narrowly.** The Treasury has said the open question is who represents the Network to receive and manage these funds. The Steering Committee serves that purpose **for the RFP program only**. Part I now states expressly that creating any new entity or foundation requires a separate MSIG.

*Drafted to match the structure of MSIGs #2 to #4. Part E requires VST confirmation. Contract terms require review by counsel.*
