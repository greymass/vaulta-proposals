# MSIG #5 — Network Steering Committee, RFP Framework, Program Funding

**Status: DRAFT v6.14 — for VST and block producer review**
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
| 8 | **Require every payment to wait 7 days** before it executes, in public | You may cancel any payment at 15/21 during that wait |
| 9 | Set **rules for block producer objections** | **4–6 objections** send an award back to block producers for approval; **7 or more** end the award. Part E |
| 10 | **Recognize ECF** to run the community vote for the Community seat | Francis Sangkuan holds it in the meantime |
| 11 | **Pay Committee members USD 2,500 per month each**, contracted through VS LLC | No success fees, no per-award pay |
| 11a | Allow Committee members to earn **separate Technical Reviewer fees** | Rate-card fees under Framework 12.6, **outside the retainer** — see Part H. Limited to **3 concurrent engagements**, not by total fees. Not available until that cap is set |
| 12 | **Authorize USD 910,000 over four quarterly cycles**, first instalment A worth USD 284,375 | Gross transferred up to USD 966,875 — see note 3 |
| 13 | Allow **fallback pricing when the oracle is stale or unavailable** | Use the **CoinMarketCap fallback** set in this Resolution; if it also fails, **all payments stop and no new awards may be made**. **Only block producers** may name a permanent replacement rate source. Part D; Framework 13.4, 13.4a |

**What you keep.** Setting every limit above. **Funding the program a year at a time** — the program cannot spend what you have not authorized, and you may change any amount or cycle length at 15/21 at any time. Seating and removing members. Deciding anything above the limits. Cancelling any payment. Suspending or revoking the mandate at any time, without cause.

**What you give up.** Voting on each RFP and each award.

**What this does not do.** It does not authorize the Committee to create a company, foundation, or any other entity. That needs a separate MSIG. See Part I.

---

## Proposal title

Network Steering Committee, RFP Framework Approval, and On-Chain Program Funding

## Purpose

MSIG #4 authorized a working group to write an RFP Framework, and required that the final Framework be approved by at least 15 of 21 active block producers before it could be used. This MSIG approves that Framework and puts it into effect.

It also reconstitutes the Oversight Committee as the Steering Committee, gives that Committee a bounded mandate to make RFP funding decisions for the Network, and asks the Treasury to fund the program.

## Definitions

**Committee** — the Vaulta Network Steering Committee.
**Framework** — the Vaulta Network RFP Framework, Exhibit A.
**Program Account** — the on-chain account holding program funds.
**Committee Permission** — the multisignature permission through which the Committee moves those funds.
**Mandate** — the authority granted in Part C.
**Threshold** — approval by not fewer than 15 of the 21 active block producers.
**Business day** — Monday to Friday in UTC, including public holidays.
**Reference Rate** — the rate used to convert USD amounts into A at the time of the relevant action, using the Delphi Oracle or the CoinMarketCap fallback as specified in Part D.
**Award Commitments** — amounts committed to awardees, constrained by the Cycle Ceiling.
**Program Costs** — Committee pay, Manager and Reviewer fees, Portal and administration costs.
**Total Program Spend** — Award Commitments plus Program Costs.
**Portal** — the RFP portal authorized under MSIG #4.

---

## Resolved clauses

### Part A — Approve the Framework

RESOLVED, that the Vaulta Network RFP Framework in Exhibit A, which sets rules for eligibility, applications, evaluation, conflicts of interest, recordkeeping, awards, and funding, is approved, since MSIG #4 required approval from at least 15 of the 21 active block producers before the Framework could be used.

FURTHER RESOLVED, that the working group established under MSIG #4 is discharged, having completed its work.

FURTHER RESOLVED, that the Portal is established as the official place for publishing RFPs, the needs backlog, award decisions, the objection register, meeting minutes, and cycle reports, with maintenance and administration assigned to VS LLC.

FURTHER RESOLVED, that the Framework may be amended by MSIG Resolution, and **Part 2 of the Framework may be amended without reopening Part 1**.

### Part B — The Steering Committee

FURTHER RESOLVED, that the Oversight Committee is renamed the **Vaulta Network Steering Committee**; the same Committee body continues; and the new name applies to references in the Trust Agreement, prior MSIGs, the VS LLC Operating Agreement, and other Trust documents.

FURTHER RESOLVED, that the Committee is expanded from **3 seats to 5**, with each seat’s responsibilities and categories defined in Framework Part 1, section 2.

FURTHER RESOLVED, that all the Committee’s **Trust oversight responsibilities** are preserved, and the Committee has a separate RFP role on behalf of the Network, as defined in Framework Part 1, section 1.

**Terms**

FURTHER RESOLVED, that the Committee term is **one year**; members may be reappointed at the Threshold without limit; and members whose terms have ended may continue serving month to month and **keep their signing key** until a successor is seated or MSIG replaces them.

FURTHER RESOLVED, that these terms are **set**, rather than extended, because the vstcreation MSIG appointed the original Oversight Committee members **without stating a term length**, and they replace MSIG #2's reference to "the remainder of Dario Cesaro's Initial Term".

FURTHER RESOLVED, that the initial terms of the **Core Development, Marketing, Business Development, and General (At-Large) seats begin when funds are received in the Program Account**, rather than when each appointment MSIG executes, and a **Community seat filled by MSIG**, whether seating an ECF winner or filling the seat under Part F, runs for one year from execution of that appointment Resolution.

The four seats may be filled by Resolutions that execute at different times. If each term ran from its own execution, the stagger would drift and could collapse — a Business Development member seated six months after Core Development would finish an 8-month term at the same moment Core Development finished a 14-month one. A single anchor keeps the intended spacing. It also means no member's term runs down while the Committee is waiting to be completed, and it uses the same date as the cycle and pay clocks.

FURTHER RESOLVED, that the initial terms are staggered as follows:

| Seat | Initial term |
|---|---|
| Core Development | **14** months |
| Marketing | **14** months |
| Business Development | **8** months |
| General (At-Large) | **8** months |
| Community | See Part F |

FURTHER RESOLVED, that MSIG may **remove a member at any time, with or without cause**, and removal ends their signing weight immediately.

**Appointments**

FURTHER RESOLVED, that the vstcreation MSIG appointed Dario Cesaro (EOS Support), Dafeng Guo (Vaulta Treasury), and Francis Sangkuan (1DEX) to the original Oversight Committee; MSIG #2 replaced Dario Cesaro with **Ross Dold (EOSphere)**; and Dafeng Guo, Francis Sangkuan, and Ross Dold are the current members.

FURTHER RESOLVED, that **only Francis Sangkuan (1DEX)** carries over into a Steering Committee seat, holding the **Community seat** on an interim basis under Part F.

**How the four remaining seats get filled**

FURTHER RESOLVED, that the Core Development, Marketing, Business Development, and At-Large seats **remain unfilled by this Resolution**; separate MSIG Resolutions must fill them using **Exhibit E**; and each may name **one candidate for one seat, a full slate of four, or any subset**.

FURTHER RESOLVED, that no candidates are named for those four seats, and that omission **does not make this Resolution incomplete**; the process, eligibility tests, and proposal format are set here; **candidates must be considered separately, on their own merits, in a separate Resolution at the Threshold**; only the interim Community seat holder is seated under Part F; and block producers decide on the rules and the people separately.

**What makes an Exhibit E proposal complete**

FURTHER RESOLVED, that an Exhibit E proposal must include all of the following, and a proposal missing any item is **incomplete and should be declined by block producers rather than approved and corrected later**:

| # | Requirement |
|---|---|
| 1 | It uses the **Exhibit E template** and states that it is made under this Part |
| 2 | A **Candidates table** naming, for each seat covered, the seat, the candidate's **name**, their **on-chain account**, their **affiliation**, their **Vaulta Treasury affiliation** (which must be none, absent an express waiver at the Threshold), and the initial term for that seat |
| 3 | The table's rows in **deliberate priority order**, that order being the tie-break where two candidates in the same proposal conflict with each other |
| 4 | A stated **resolution mode** — seat by seat, or all or nothing |
| 5 | A **network vision statement per candidate**, written by that candidate, addressed to the portfolio of the seat they are named for, in the form set out below |
| 6 | **Relevant background and declared conflicts** for each candidate |
| 7 | Confirmation that no candidate **already holds a seat**, that seating them would not breach the **one-member-per-affiliation rule** against a sitting member or against another candidate in the same proposal, and that no candidate appears on the **published register of bans** |

FURTHER RESOLVED, that **completeness does not guarantee that an appointment takes effect**; even a complete proposal has no effect for a seat if any of the five grounds below applies at execution; and an incomplete proposal that executes is **not void**; the consequences in this Part apply, and the member must file the missing items before pay and signing weight begin.

FURTHER RESOLVED, that **anyone may propose** an Exhibit E Resolution; candidate searches, community consultation, and slate preparation remain **off-chain**; and neither this MSIG nor VS LLC controls who may be put forward.

FURTHER RESOLVED, that every appointment proposal must include a **network vision statement for each candidate**, written by that candidate about their seat's portfolio (Framework 3.1a); each statement must explain what the Network needs over the term, **what they would prioritize funding and what they would decline**, how they would judge the program's success, and any position block producers should know about; candidates must declare interests in the disclosure questionnaire; statements should be roughly **300 to 800 words in plain language**, with a translation where helpful; and each statement must be **published with the proposal and linked from the seat register** for the term.

FURTHER RESOLVED, that a proposal without a vision statement is **incomplete and should be declined by block producers**; the omission does **not** void an appointment, avoiding a penalty for the proposer's failure; and if the proposal executes anyway, the member must **file their statement before pay and signing weight begin**, alongside the contract, questionnaire, and signing key required below.

FURTHER RESOLVED, that the vision statement is **non-binding** so members can respond to changing circumstances, and serves as a reference for reappointment, with members seeking another term asked to explain how the year compared with their statement.

FURTHER RESOLVED, that every rule in this Part applies **per seat, rather than per proposal**, and each Exhibit E proposal must state one of two **resolution modes**:

1. **Seat by seat** — the default. Each seat named is treated independently, so a Resolution naming several seats takes effect for those that are open and has no effect for those already filled;
2. **All or nothing** — where marked, the Resolution has **no effect for any seat** if any of the five grounds listed below applies to any seat it names, including a seat being already filled.

FURTHER RESOLVED, that block producers may support multiple candidates by approving multiple proposals, and if more than one proposal for a seat reaches the Threshold, the appointment whose **execution transaction has the earliest block time** fills it.

FURTHER RESOLVED, that the following rules apply once a seat is filled:

1. every other pending proposal for that seat is **void as to that seat**. Proposers should cancel them and block producers should withdraw approvals. A multi-seat proposal marked seat by seat remains live for its other seats;
2. if such a proposal is nonetheless executed afterwards, it **has no effect for that seat** and does not displace the seated member. Displacing a seated member requires removal by MSIG Resolution.

FURTHER RESOLVED, that an appointment has **no effect for a given seat** if any of the following applies **at the moment of execution**:

1. that seat is already filled by an earlier executed appointment;
2. the named individual **already holds another seat**;
3. seating them would breach the **one-member-per-affiliation rule** — two members from the same block producer, company, or corporate group;
4. they are **affiliated with the Vaulta Treasury**, absent an express waiver at the Threshold;
5. they appear on the **published register of bans**.

FURTHER RESOLVED, that seats must be tested **in Candidates table order** if a Resolution names the same person for multiple seats or two candidates who would breach the affiliation rule against each other; the first appointment takes effect; the later one **has no effect**; and the proposer may set priority through the table's row order.

FURTHER RESOLVED, that **VS LLC must maintain a published seat register on the Portal**; VS LLC must record, for each seat, the member's **name and on-chain account**, proposal name, execution transaction, **link to their network vision statement**, and the proposal's **resolution mode**; VS LLC must record **any seat named but not filled, and why**; and executed appointments may have no effect when proposals compete; the register is the canonical record of what was executed.

FURTHER RESOLVED, that the register **does not determine eligibility**; if VS LLC records a seat as unfilled for any reason other than an earlier execution, it must **publish its reasons and refer the matter to MSIG**; the seat remains **vacant until MSIG decides the matter**; and VS LLC has no authority to decide eligibility.

FURTHER RESOLVED, that a further MSIG Resolution may correct an appointment executed in error.

FURTHER RESOLVED, that the following seats and initial terms are established:

| Seat | How filled | Initial term |
|---|---|---|
| Core Development | Exhibit E MSIG — alone, as a slate, or in a subset | 14 months |
| Marketing | Exhibit E MSIG — alone, as a slate, or in a subset | 14 months |
| Business Development | Exhibit E MSIG — alone, as a slate, or in a subset | 8 months |
| General (At-Large) | Exhibit E MSIG — alone, as a slate, or in a subset | 8 months |
| Community | **Francis Sangkuan** on an interim basis, then the ECF process under Part F | See Part F |

**Transition until the four seats are filled**

FURTHER RESOLVED, that the temporary service of **Dafeng Guo (Vaulta Treasury)** and **Ross Dold (EOSphere)** continues alongside Francis Sangkuan **in the original Oversight Committee's capacity**, until MSIG fills the four seats above.

FURTHER RESOLVED, that their transition service is limited to **the former Oversight Committee's Trust oversight responsibilities**, and **the RFP mandate cannot be exercised, no RFP may be published, and no award may be made** until the Committee is constituted.

FURTHER RESOLVED, that **Dafeng Guo and Ross Dold's transition service is unpaid**; a member appointed before the Program Account is funded **accrues no retainer** before funding; and pay begins at the later of contract signature and funding, as set out in Part J.

FURTHER RESOLVED, that there is **no deadline for filling the four seats**; block producers determine the timing; and until all five seats are filled, no RFP may be published, no award may be made, and the Program Account may not be funded.

FURTHER RESOLVED, that **Dafeng Guo and Ross Dold's service ends when the four seats are filled**; Ross Dold may be separately appointed to a seat; Dafeng Guo is ineligible while affiliated with the Vaulta Treasury unless MSIG expressly waives that restriction; and their transition service is recognized with thanks.

FURTHER RESOLVED, that **the Program Account must not be funded and the Committee Permission must not be activated until all five seats are filled** and every member has signed their engagement contract, filed the standard disclosure questionnaire on-chain under Framework 6.3a, and registered a signing key, because the permission requires four of five signatures, so a three-member body cannot operate it.

FURTHER RESOLVED, that **Dafeng Guo's Vaulta Treasury affiliation** must remain recorded as a standing disclosure throughout his transition service.

**The Vaulta Treasury is excluded from service**

FURTHER RESOLVED, that anyone **affiliated with the Vaulta Treasury** is excluded from holding a Steering Committee seat or serving as an RFP Program Manager or Technical Reviewer.

FURTHER RESOLVED, that "affiliated with the Vaulta Treasury" means being its employee, officer, or director; providing services to it under contract; holding authority over Treasury funds; or otherwise acting under its direction on treasury functions.

FURTHER RESOLVED, that this exclusion applies in line with the Treasury's stated position that it will not participate in allocation decisions after transferring funds to the Network, protecting both the Treasury and the program from the appearance of Treasury direction; **MSIG may expressly waive the default exclusion at the Threshold, with published reasons**; and a waiver requires a deliberate decision.

FURTHER RESOLVED, that **the transition arrangement remains unchanged**; Dafeng Guo continues alongside Ross Dold and Francis Sangkuan in the original Oversight Committee's Trust oversight role until the four seats are filled; and that service does not include the RFP mandate and ends when the seats are filled.

FURTHER RESOLVED, that two members must not be connected to the same block producer, company, or corporate group; each member must sign their engagement contract, **file the standard disclosure questionnaire on-chain** under Framework 6.3a and 6.3b, and register their signing key within **30 days**; the questionnaire is the conflict declaration, not an additional document; **pay and signing weight begin only after all three are complete**; and the 30 days run from the **later of** appointment execution and VS LLC publishing that the disclosure register is open for filing.

### Part C — The Mandate

FURTHER RESOLVED, that the Committee has a **standing mandate to allocate Program Account funds on behalf of the Vaulta Network** under the Framework; **block-producer votes on individual RFPs or awards** are removed; and a recorded Committee decision within Part D's limits is the Network's decision.

FURTHER RESOLVED, that the separate authorization MSIG #4 required before anyone could award funds, select vendors, or create payment obligations is granted.

FURTHER RESOLVED, that the mandate is limited to the activities specified in the Framework; an action outside Part D's limits is **void**; VS LLC must not contract on that action; and block producers are asked to cancel any related payment during its delay window.

FURTHER RESOLVED, that the mandate continues **until MSIG suspends or revokes it**, with no fixed expiry date.

FURTHER RESOLVED, that **MSIG may suspend or revoke the mandate at any time, without cause**, and rebuild the Committee Permission through the owner permission.

FURTHER RESOLVED, that block producers retain recurring control through **funding**; Part I authorizes funding **four cycles at a time**, and block producers may stop, reduce, or re-time any instalment at the Threshold; and Committee spending is limited to funds block producers choose to send, even though the mandate continues indefinitely.

FURTHER RESOLVED, that the Committee must publish an **annual review** covering awards, outcomes, conflict incidents, coverage history, and whether the limits remain appropriate, putting performance on record each year whether or not anyone calls a vote.

FURTHER RESOLVED, that a Resolution ending the mandate must retain the Committee Permission for payments under signed agreements or direct block producers to create a replacement permission, and the Network must remain able to pay its existing obligations.

### Part D — Limits and denomination

FURTHER RESOLVED, that **quarterly cycles** are established, with **four cycles authorized at a time, covering one year**, and the first cycle starts **when funds are received in the Program Account**.

FURTHER RESOLVED, that **block producers may change any cycle amount, cycle length, or limit at any time by MSIG Resolution at the Threshold**, and authorizing a year of funding does not bind them for that year.

FURTHER RESOLVED, that these limits apply to **each cycle**:

| Limit | Amount | Unit |
|---|---|---|
| **Cycle Ceiling** — most the Committee may commit in **awards** | **150,000** | **USD** |
| **Per-Award Limit** — largest single award without coming back to MSIG, measured on **total contract value** | **100,000** | **USD** |
| **Program Costs** — everything the program spends on itself | **77,500** | **USD** |
| — of which **Committee pay**, 5 members × 3 months at USD 2,500 | **37,500** | **USD** |
| — of which **Manager and Reviewer fees, Portal, and administration** | **40,000** | **USD** |
| **Total Program Spend for the cycle** | **227,500** | **USD** |

FURTHER RESOLVED, that **Award Commitments** are amounts committed to awardees, limited by the **Cycle Ceiling**; **Program Costs** are Committee pay, Manager and Reviewer fees, Portal costs, and administration, limited to **USD 77,500 per cycle**; and **Total Program Spend** is their sum, used to determine the funding request in Part I.

FURTHER RESOLVED, that Program Costs have **two fixed internal caps**: **USD 37,500** per cycle for Committee pay, and **USD 40,000** for Manager and Reviewer fees, Portal costs, and administration combined; **underspending under one cap must not increase the other**; and funds must not move between governance pay and program operations without a decision.

FURTHER RESOLVED, that **spending above either internal cap is outside the mandate**, requiring an MSIG Resolution just as exceeding the Cycle Ceiling does, and the Committee must **report spending against both caps in every cycle report**, making approaching limits visible.

FURTHER RESOLVED, that the Cycle Ceiling is a **maximum, not a target**, and unspent amounts must not be carried into the next funding period.

FURTHER RESOLVED, that the **post-award review threshold under Framework 25.2 is USD 25,000**, or **25% of the Per-Award Limit**; the review threshold must be reset to a quarter of that Limit whenever the Limit changes; for every award at or above the threshold, the Manager of record must write a **short closing review** of whether the work met the need, the budget was right, and the Network would do it again; the review must be **published on the Portal** and summarized in the next cycle report; and **Exhibit B's rate card must include this review in the Manager's paid scope**.

**Everything is denominated in USD. Everything is paid in A.**

FURTHER RESOLVED, that **all amounts in this MSIG are denominated in USD**, including the Cycle Ceiling, Per-Award Limit, Program Cost Ceiling and internal caps, awards, reservations, and Committee pay, and **all payments must be made in A**.

FURTHER RESOLVED, that **milestone payments must be converted to A when the milestone is approved**, using the block-producer-operated **Delphi Oracle** (`delphioracle`).

FURTHER RESOLVED, that the **`median` field in the `datapoints` table for the `eosusd` pair** is used as the rate; the contract calculates it from the last 21 qualified oracle submissions, so moving it requires control of a **majority of those submissions**; **no party to the transaction supplies the rate**: neither the Committee, VS LLC, nor the awardee; the window counts *submissions*, not individual oracles, so frequent writers occupy more of it; and the staleness check below helps expose unhealthy submission patterns.

FURTHER RESOLVED, that the oracle stores prices as **integers**; the actual price is **`median` divided by 10 to the power of `quoted_precision`**; and for `eosusd`, `quoted_precision` is **4**, giving ten-thousandths of a dollar: 766 means USD 0.0766.

FURTHER RESOLVED, that the amount of A payable must be calculated **using integer arithmetic and truncation**:

**A-units = ⌊ USD-cents × 10^6 ÷ median ⌋**, where an A-unit is 0.0001 A.

FURTHER RESOLVED, that this rule makes the calculation **reproducible**; the largest rounding difference is 0.0001 A, under one hundredth of a cent at current prices; the platform, awardee, and auditors must reach the same integer so that published amounts match on-chain transfers; and floating-point arithmetic could produce inconsistent results.

FURTHER RESOLVED, that truncation is used because it is simple to reproduce, requires no tie-breaking, matches integer division in most languages, and never pays more than the reserved amount.

FURTHER RESOLVED, that **VS LLC must publish** confirmation of the `eosusd` pair and its `quoted_precision`, plus a worked calculation example, in the Exhibit D configuration under Part E.

FURTHER RESOLVED, that each award decision and milestone approval must record the **oracle value, block number, and transaction id when using the oracle**, or the **CoinMarketCap records listed below when using the fallback**, so the rate can be checked later.

FURTHER RESOLVED, that the record must include the **newest oracle datapoint's timestamp**, or state that the pair or contract could not be read, and that information must be published.

FURTHER RESOLVED, that the **fallback rate** below is used when the newest oracle datapoint is more than **24 hours** old; if the fallback is unavailable but the oracle is **stale and readable**, the Manager of record must not approve alone, and the Committee may approve at the ordinary milestone threshold with the staleness recorded or defer until a rate is available.

FURTHER RESOLVED, that the **fallback rate** is the **midpoint of CoinMarketCap's published daily high and low USD prices for Vaulta (A), ID 36462**, for the **UTC calendar day before the read**; the midpoint is calculated by adding the high and low and dividing by two; the fallback applies when the newest `eosusd` datapoint is over 24 hours old, or the pair or `delphioracle` contract is unavailable, renamed, or deprecated; and the fallback is fixed in advance so that **no party to the transaction supplies the rate**.

FURTHER RESOLVED, that the fallback rate is expressed as an integer in millionths of a dollar: **fallback = ⌊ (high + low) ÷ 2 × 10^6 ⌋**, calculated from the published figures using exact decimal arithmetic; the payment is **A-units = ⌊ USD-cents × 10^8 ÷ fallback ⌋**; and VS LLC must publish a worked example in Exhibit D alongside the oracle example.

FURTHER RESOLVED, that the fallback applies to **every read** after activation until `eosusd` receives at least one new datapoint in every 24-hour period for **7 consecutive days**, preventing repeated switching while the oracle recovers, and the Chair must record and publish when fallback use began and when oracle use resumed.

FURTHER RESOLVED, that each award decision and milestone approval using the fallback must record the newest `eosusd` timestamp or state that the pair or contract could not be read, plus the **CoinMarketCap date, published high and low, calculated integer rate, and a retrieval record of the published figures**, instead of the oracle value, block number, and transaction id.

FURTHER RESOLVED, that payments continue at the fallback rate if `eosusd` or `delphioracle` becomes **unavailable, renamed, or deprecated**; payments stop only if the fallback is also unavailable; in either case, the Committee must refer the replacement-rate decision to MSIG within **5 business days**, instead of the ordinary 10 business days for reserved matters; and **the Committee has no authority to choose a substitute source to resume payments**.

FURTHER RESOLVED, that designation of a replacement source is **an amendment to the Reference Rate definition** in this Resolution and the Framework; the reserved-matters default that treats inaction as a decline **does not apply**; and payments resume **only for approvals made after the designation**; payments already made are not reopened.

FURTHER RESOLVED, that **no new awards may be made while payments are suspended**, because the coverage test and decision record require a rate read; scoping, publication, evaluation, and scoring may continue; **every Program Account payment** is suspended, including Committee pay and Manager and Reviewer fees, **except Portal hosting and essential administration**; those services must continue so the suspension can be published; and suspended pay and fees continue to **accrue**, are charged to the cycle in which they accrue, and are paid on resumption at the then-current rate.

FURTHER RESOLVED, that a quarterly instalment **into** the Program Account that falls due during a suspension must be **sized and transferred on resumption**, rather than skipped, and the suspension **extends by its own duration** the 60-day contracting clock, any bounty closing date, and any cycle-close cut-off for an award not yet contracted (Framework 13.4a).

FURTHER RESOLVED, that the timestamp check is required because the contract **never fails a read**; the contract holds 21 rows from pair creation and updates them in place, returning a value even without recent submissions; and only the timestamp distinguishes a stale rate from a current one and triggers the fallback.

FURTHER RESOLVED, that the Manager of record must not approve alone if the approval rate, whether oracle or fallback, differs by more than **15%** from the rate at the **previous payment under that award**; a first payment must be compared with the rate recorded at the award decision; and the Committee may approve at the ordinary milestone threshold or defer, limiting the effect of short-term price movements on A outflow.

**Coverage: the program must hold enough A to meet its USD commitments**

FURTHER RESOLVED, that commitments are denominated in USD while the Program Account holds A; a fall in A's price reduces its ability to pay; and the Committee must therefore:

1. **Test coverage before every award.** Confirm that the account's A balance, valued at the Reference Rate, covers all outstanding Award Commitments and Program Costs **falling due before the next scheduled instalment**, plus the proposed award, with **at least a 10% margin**. An award that fails this test may not be made and is a reserved matter.

   The account is funded with a **25% margin** (Part I) and awarding stops when that margin has eroded to **10%**. The two figures are deliberately different: the larger one is the cushion, the smaller one is the floor. If they were equal, the last dollar of the ceiling could only ever be committed on a day the price of A had not moved down at all — which is not a ceiling anyone can plan against.
2. **Report coverage every cycle**, showing outstanding USD commitments, the A balance, the rate used, and the resulting coverage percentage.
3. **Stop and escalate if coverage falls below the 10% floor.** The Committee shall make no further awards, shall notify MSIG within **5 business days**, and shall request a top-up transfer. Milestones under existing agreements continue to be paid while funds allow.
4. **Report a surplus.** If the price of A rises and the account holds more than the cycle requires, the surplus is reported. It is not swept at cycle end — surpluses reduce the next quarterly instalment, and any final balance is returned at the end of the funding period under Part I.

FURTHER RESOLVED, that **a change in the A payment amount is not a top-up**; the USD peg is maintained; **an award's USD amount must not exceed the Per-Award Limit**; and any USD increase requires the full award threshold, a contract amendment, publication, and a fresh proposal and delay.

**Paying Program Costs**

FURTHER RESOLVED, that the following Program Account payment process applies to Committee pay, Manager and Reviewer fees, Portal costs, and administration, mirroring award payments but with a simpler process because the amounts are set in advance:

1. the Committee approves a **published payment schedule** once per cycle, by simple majority with a minimum of 3, listing each recipient, amount, and cadence;
2. individual payments under that schedule are signed **4 of 5** like any other disbursement and carry the **same delay**;
3. **no objection banding applies** — the schedule was published in advance and the amounts are fixed;
4. every payment is listed in the cycle report, and cumulative Program Costs are reported against the cycle allocation.

FURTHER RESOLVED, that any payment outside an approved schedule requires fresh Committee approval at the same threshold and a separate published record.

**Reserved matters**

FURTHER RESOLVED, that the Committee may use **only three funding instruments**: a **directed RFP**, an **open call** for unsolicited proposals (Framework 26), or a **bounty** (Framework 26a), and the working group's term "**grants**" means the **open call**, not a fourth instrument.

FURTHER RESOLVED, that a directed RFP means the Committee defines the work and invites bids; an open call means the proposer defines the work; a bounty is a published fixed-price task, open to anyone and paid to the first acceptable delivery; and the bounty publication vote is the award decision and requires the award threshold.

FURTHER RESOLVED, that there is **no per-cycle sub-limit for open calls or bounties**; all three instruments draw on the Cycle Ceiling and compete on merit; the same award threshold, Per-Award Limit, publication, delay, and objection bands apply to unsolicited and directed awards; and a sub-limit would restrict useful work without adding protection.

FURTHER RESOLVED, that there is **no separate per-bounty cap**, and the **Per-Award Limit** and **Cycle Ceiling** apply to bounties, like other awards.

FURTHER RESOLVED, that comparative evaluation of bounty approaches, prices, and teams is replaced by **open participation and payment for the first acceptable delivery**; this becomes less effective as prices rise, because providers are less likely to build a large system speculatively; and the following controls apply:

1. a **minimum open period before any delivery may be accepted** — **21 days**, or **10 days** below USD 5,000 or where urgency is recorded, matching Framework 20.5 — because "first acceptable delivery wins" is only a contest if a second party had time to enter one;
2. **where the Committee expects only one party will realistically deliver, it records and publishes that expectation and its reasons.** This does not stop the bounty. A bounty nobody else will attempt is a **sole-source award** — a normal and often correct thing to do, which should be documented as one rather than described as an open contest. Such bounties are listed separately in the cycle report.

FURTHER RESOLVED, that a bounty must reserve its price at publication and lapse at its closing date or cycle end, and all other award rules apply: contract first, signature, delay, objection bands, conflict checks, the ban register, and the prohibition on splitting work that should be an RFP.

FURTHER RESOLVED, that the **cycle report must show spending by channel**: directed RFPs, open calls, and bounties, both as amounts and shares of the Cycle Ceiling; if bounties exceed **25%** of awards committed in a cycle, the Committee must **explain why**; and this is a reporting requirement, not a cap, giving block producers information to change limits at the Threshold.

FURTHER RESOLVED, that the following matters are reserved for **MSIG Resolution**, outside the mandate, matching Framework section 9.1:

- A single award above the **Per-Award Limit**, measured on total contract value.
- An award taking total Award Commitments above the **Cycle Ceiling**.
- An award extending beyond the **authorized funding period** or failing this Part's **coverage test**.
- An award where recusals leave fewer than three non-recused members or fewer than four able to sign.
- **Any payment**, including Program Costs, where recusals or vacancies leave fewer than four members able to sign.
- An **award for work on the RFP system** where the Committee records that no other capable provider exists.
- A **termination recommendation on an award reviewed by a Committee member** where recusals of any kind leave fewer than four non-recused members.
- A **milestone requiring a Reviewer** under the award's published statement, where none is engaged and no substitute has been engaged.
- A **milestone or evaluation with no unconflicted Manager of record**. MSIG may direct engagement of a named Manager or another basis of approval.
- **Designating a replacement rate source** after the existing source fails; the Committee cannot do this itself.
- An award prohibited by the **conflict rules**.
- Any change to the **mandate, Cycle Ceiling, Per-Award Limit, cycle length, Committee Permission, denomination convention, or funding source**.
- **Creating any entity** (Part I).
- Any matter the Committee **votes to escalate**.

FURTHER RESOLVED, that the Committee must refer reserved matters to MSIG within **10 business days**, or **5 business days** for a replacement rate source; if MSIG does not act within **30 days**, the matter is **treated as declined**, with two exceptions: **payments or milestones under executed agreements**, and **replacement rate sources** under Framework 13.4a; those matters **remain open**, their reservations remain in place, and the Committee must re-submit until MSIG acts; and network delays must not penalize awardees or leave payments suspended indefinitely.

### Part E — The Program Account and how payments work

FURTHER RESOLVED, that **`rfp.vst`**, a subaccount of `vst`, is established as the **Program Account**, and all program funds must be held there.

FURTHER RESOLVED, that **the `rfp.vst` name gives the VST no authority over the funds**; under Antelope, a parent account has no standing control over a subaccount once created; the owner permission belongs to `eosio.prods`, and moving funds requires 4 of 5 Committee signatures; and **the VST has no authority to move program funds**; the name is a naming convention only.

FURTHER RESOLVED, that **the `vst` name has been secured**, so no alternative is needed; if it had not been secured, VS LLC would have proposed another name, requiring **MSIG confirmation before funding**; block producers, rather than whoever publishes the configuration, name the account holding program funds; and this contingency is retained for the record.

FURTHER RESOLVED, that the Committee Permission must use these settings:

| Setting | Value |
|---|---|
| Weight per seated member | 1 unit, 5 units total |
| To move funds | **4 of 5** |
| For administrative actions that move no funds, including cancelling a payment | **3 of 5** |
| Owner permission | **`eosio.prods`** |
| Delay before a payment executes | **168** hours (7 days) |
| Shorter delay for urgent awards | **72** hours (3 days) |

FURTHER RESOLVED, that the shorter delay is permitted only after a Committee urgency vote **at the award threshold: two-thirds of filled non-recused seats, minimum 3**, and the Committee must record the reason and **complete publication before proposing payment**, leaving a genuine opportunity to object.

FURTHER RESOLVED, that **no payment may be proposed on-chain until VS LLC has signed the awardee agreement**.

FURTHER RESOLVED, that block producers may **cancel any type of payment at the Threshold** during the delay window.

FURTHER RESOLVED, that **objection bands apply only to the initial award disbursement**; milestone and Program Cost payments still have the delay and may be cancelled by block producers, but no objection bands apply because they fulfil commitments already published and approved; and Portal objections to an award disbursement have these effects:

| Objections | Result |
|---|---|
| **0 to 3** | Payment proceeds when the delay ends |
| **4 to 6** | Committee cancels; the award proceeds only if MSIG confirms it |
| **7 or more** | Committee cancels and the award ends. No MSIG vote is held |

FURTHER RESOLVED, that seven objections are used because **seven block producers can block a 15-of-21 decision**, and an award with 7 objections cannot be confirmed, so no confirmation vote is held.

FURTHER RESOLVED, that cancellation is **mandatory** in the 4-to-6 and 7-or-more objection bands; the Committee must cancel within **2 business days** after the objection count closes; **failure to cancel is grounds for referral to MSIG for removal**; block producers may cancel through the owner permission as well; and this ensures 4 to 6 objectors can trigger the backstop even though they cannot reach the Threshold alone.

FURTHER RESOLVED, that the Committee must submit the record and a draft confirming Resolution to MSIG within **10 business days** after cancellation in the 4-to-6 band, and if MSIG does not confirm within **30 days of submission**, the award **lapses**, its reservation is released, and the Committee may re-scope and re-run it.

FURTHER RESOLVED, that **MSIG confirmation restores the award decision, not the agreement**; cancellation terminates the awardee agreement, so VS LLC must sign a **fresh agreement on identical terms** before proposing disbursement again; and the 60-day window in this Part runs from confirmation.

FURTHER RESOLVED, that **VS LLC must develop and configure the Program Account and Committee Permission**, and **publish Exhibit D before funding**, with Exhibit D covering the account name, permission structure and thresholds, delay mechanism and values, cancellation path and exact action and authority required, account resources, `eosusd` pair and `quoted_precision`, and a worked payment calculation.

FURTHER RESOLVED, that **VS LLC must establish the on-chain disclosure register** under Framework 6.3b on a **separate account, `disc.vst`**, and Exhibit D must identify the account, append-only contract and ABI, deployment and writing authorities, coded-answer schema, and questionnaire version.

FURTHER RESOLVED, that a separate decisions table on that account must hold the records required by Framework 7.6a: award decisions, milestone approvals, payment signatures, and Committee resolutions with an external effect; Exhibit D must specify the decisions schema and version, writing authority, **deployment and upgrade authority**, and **RAM provisioning**; and an append-only register needs capacity to keep accepting records throughout the program.

FURTHER RESOLVED, that **disclosures must not be written to the Program Account**, which holds funds under the `eosio.prods` owner permission and must have no routine writing key.

FURTHER RESOLVED, that the configuration must record **each member's delivered public key**; the permission must use those keys and **may be activated only after all five are delivered**; and key delivery and permission activation are separate steps.

**If the protocol cannot enforce the delay**

FURTHER RESOLVED, that the delay must be **enforced on-chain**; if VS LLC finds that the current protocol cannot enforce transaction-level delays, the fallback is a **held multisignature proposal**; the Committee proposes disbursement, keeps it **unexecuted and publicly visible** for the full window, and executes it only afterwards; the proposal identifier must be published with the award; and block producers retain the cancellation route through the owner permission.

FURTHER RESOLVED, that VS LLC must state **which delay mechanism is used** in Exhibit D **before the Program Account is funded**, and if an element cannot be built as described, VS LLC must explain the limitation and propose the nearest workable alternative.

### Part F — The Community seat

FURTHER RESOLVED, that the **EOS Community Foundation (ECF)** is recognized as designer and administrator of the Community seat vote.

FURTHER RESOLVED, that **ECF is independent of this program and no funding is granted to ECF or its members under this Resolution**; recognizing ECF as vote administrator creates **no funding obligation**; ECF must seek Network funding through **its own MSIG**, decided directly by block producers, rather than a Committee award; and the Committee must not set the budget of the body that selects one of its members.

FURTHER RESOLVED, that **ECF may bid on RFPs**; if the Community seat holder is engaged by, paid by, or holds a position in ECF, ECF is their **connected organization** under Framework 6.2; the connection must be declared in writing **before publication**, the member must **recuse fully**, and both must be minuted and published; the member must not help set the budget or criteria for an RFP ECF later bids on; and any ECF stipend must be disclosed on-chain under Framework 6.3a Part 2, whoever pays it.

FURTHER RESOLVED, that the ECF vote is a **nomination** and **appointment rests with MSIG**, and block producers should refuse appointment only for **disqualifying cause** and state publicly any other basis for refusal.

FURTHER RESOLVED, that **Francis Sangkuan** is seated on an interim basis with full voting rights, signing weight, and pay until the first ECF winner is seated or **9 months after this MSIG executes**, whichever comes first.

FURTHER RESOLVED, that the interim period starts at **execution**, rather than funding, so ECF can run its process while funding is pending, and **MSIG may extend the interim period once**, at the Threshold and on ECF's request.

FURTHER RESOLVED, that **MSIG must fill the seat at the Threshold** if the interim deadline passes without a winner, so a vacancy does not stop payments.

FURTHER RESOLVED, that MSIG may name another administrator or **fill the Community seat at the Threshold using Exhibit E** if **ECF stops running the process or ceases to exist**; MSIG appointments may continue indefinitely, term after term; MSIG may return selection to a later community process without being required to do so; and **the seat retains its Community portfolio, category assignments, vote, signing weight, and pay** regardless of how it is filled.

FURTHER RESOLVED, that ECF is asked to publish its process by **[___]** and complete the first vote by **[___]**; a Community member **appointed by MSIG**, whether an ECF winner or a member appointed under the preceding clause, serves **one year from execution of their appointment Resolution**; and the interim appointment above is not a one-year term and ends as specified there.

### Part G — Program roles and VS LLC

FURTHER RESOLVED, that two contractor roles are established, selected by the Committee and contracted by VS LLC under **Exhibit B's rate card**:

1. **RFP Program Managers**, engaged as a pool, with **exactly one Manager of record for each RFP**, who runs it and **approves its milestones for payment**. A Manager may hold several RFPs. The Committee may reassign an RFP by majority, publishing the change, with a written handover.
2. **Technical Reviewers**, engaged **where the RFP's own published statement says a Reviewer is engaged** — fixed at publication and not reopened at signing, a question the Committee settles at scoping by whether the work is technical, **including on a Service award, which has no built deliverable but may well need technical assessment** — whose written assessments inform evaluation and milestone approval.

FURTHER RESOLVED, that **every program decision must identify the people responsible by name and on-chain account**; milestone approvals must identify the **Manager of record** and any **Technical Reviewer**; payments must identify **each signing Committee member**; awards must identify every member voting for, against, or recused; and both name and account are required, because accounts may be rotated, renamed, or rebuilt through the owner permission.

FURTHER RESOLVED, that **payment decisions must be recorded in full on-chain** in a separate decisions table on the same append-only register as the disclosure questionnaires; this includes award decisions, milestone approvals, payment signatures, and Committee resolutions with an external effect; and a digest of an off-chain copy is insufficient.

FURTHER RESOLVED, that a third table must hold published RFPs and amendments, questions and answers, the objection register, ban register, seat register, network vision statements, cycle reports, and annual reviews, and the Portal displays these registers rather than maintaining a second record, so a Portal outage or change of operator does not remove them.

FURTHER RESOLVED, that **three records remain off-chain**: **minutes**, which may require redaction under Framework 5.9; **proposals**, confidential until award; and the **backlog**, a working list that does not determine decisions.

FURTHER RESOLVED, that **the RFP platform and Portal code are VST-owned work product**, operated by VS LLC; code written before this Resolution was not covered by an Independent Contractor Agreement and its ownership was never vested; **moving a repository does not assign copyright**; and before the program relies on that code, the program must obtain **a written assignment to the VST from every author**, or a perpetual, irrevocable, sublicensable licence if assignment is unavailable, **and transfer the code to a VST-controlled repository**.

FURTHER RESOLVED, that the Committee may fund work on the RFP system through the **ordinary award process**: published RFP, award threshold, contract, delay, and signature, with this work classified as **Core Development work counted against the Cycle Ceiling**.

FURTHER RESOLVED, that **VS LLC and connected entities must not bid on this work**, because VS LLC operates the system, holds its code, contracts with awardees, runs the Portal, checks whether to refuse contracting, and writes decision records, and if no other capable provider exists, the award is a **reserved matter**.

FURTHER RESOLVED, that work that builds or materially changes what the system does is an **award**, and work that keeps it running unchanged is an **operating cost**; **the Committee must classify the work by recorded vote**; and every such award must be **flagged as self-referential in the cycle report** so spending on the system itself remains visible.

FURTHER RESOLVED, that **milestone approval rests with the Manager of record**; a Technical Reviewer's written assessment is required at each milestone **only if the award's published statement under Framework 20.2 says a Reviewer is engaged**; and the approval record must be **published on the Portal**.

FURTHER RESOLVED, that the Committee's four signatures on a milestone payment are **administrative**; they confirm only that the approval record is complete, the amount matches the published schedule, a Reviewer assessment is present **when the RFP's published statement requires one**, the payment is within the award, and **no termination recommendation under Framework 11.10a is open**; no Reviewer assessment is required where the statement says none is engaged; and **the Committee does not reassess the work**.

FURTHER RESOLVED, that signing the **initial award disbursement** is administrative as well, and signers confirm that the decision record is complete, the executed agreement matches it, the amount is within the limits, the delay has run, and no termination recommendation under Framework 11.10a is open.

FURTHER RESOLVED, that a member who **voted against an award must sign its disbursement** unless an administrative check above fails or there is credible evidence of misrepresentation or a conflict-rule breach, because with one recusal, only four signers remain; withholding a signature merely because of disagreement would let one member veto an approved award.

FURTHER RESOLVED, that **no Committee member may serve as an RFP Program Manager** (Framework 12.2a); there is **no exception or waiver at any threshold**; a Manager appointed to the Committee stops being Manager of record when their appointment executes, and their RFPs must be reassigned within 5 business days; milestone approval must always rest with a Manager outside the Committee, including when a member reviews the RFP; and this protects the administrative signing role under **Framework 11.4**.

FURTHER RESOLVED, that **a Committee member may serve as a Technical Reviewer**, but never as a Manager, **only on the terms in Framework 12.6**:

1. **not until MSIG has set the cap on concurrent engagements** (Part H) — until then no member may be engaged. **There is no cap on the fees a member may earn**: the control is on **workload**, not on the total, for the reasons at Part H;
2. only where the Committee has **recorded that no suitable unconflicted external reviewer was available**, published with the engagement;
3. only while **all five seats are filled**, an engagement being suspended for any vacancy; and where the suspended member is the **only engaged Reviewer on a published RFP or a live award**, the Committee shall engage a **substitute Reviewer** for that RFP — the published statement records that a Reviewer is engaged, not who — failing which, for a published RFP not yet awarded the Manager of record writes the scored assessment, and for a live award the affected milestone goes to MSIG;
4. **no more than one member per RFP**, and the engagement leaving the member **within the concurrent-engagement cap**;
5. the member **recuses from the availability finding and from the vote engaging them**;
6. on that RFP the member **does not draft the acceptance criteria or milestone schedule**, **does not score proposals** and takes **no part in score reconciliation** (a written note to the Committee instead — where they are the only engaged Reviewer the Manager of record writes the scored assessment), and **does not vote on any termination recommendation, recovery plan, or strike decision concerning that award, whoever filed it, and whether or not the engagement has since ended or been suspended** — where **recusals of any kind** would leave fewer than four non-recused members, the recommendation goes to MSIG;
7. the member **keeps their award vote** and **may sign the milestone payment**;
8. the fee is the **Exhibit B rate card amount**, which the Committee cannot set or vary; it is paid on **its own separate payment**, one per member-Reviewer, signed by the other four, from which that member recuses;
9. every engagement and fee is **published in the cycle report** by member and by RFP, with each member's cumulative fees for the cycle and the number of engagements held against the cap, and the member **files a disclosure questionnaire update before the engagement begins**.

FURTHER RESOLVED, that Managers and Reviewers must not bid on an RFP they work on during their engagement or for **6 months afterwards**; they may not approve or assess milestones for an awardee where they have a conflict as defined in Framework 6.4; and their pay may not depend on milestone approval or an award's size or outcome.

**Material conflict breaches carry a permanent ban**

FURTHER RESOLVED, that a **material conflict-of-interest breach** requires **immediate suspension of the person's role, signing weight, and pay, and referral to MSIG**, and breaches include self-dealing, an undisclosed interest in a proposer or awardee, payment from a proposer or awardee, private use of proposal information, breaching confidentiality, or signing a matter from which the person was recused.

FURTHER RESOLVED, that a person is **permanently barred** from Committee seats, Manager and Reviewer roles, submitting or being named on program proposals, and receiving program payments if MSIG confirms the breach **at the Threshold**, and the ban applies directly and through any entity in which they hold a material interest.

FURTHER RESOLVED, that the ban is **permanent and liftable only at the same Threshold**: fifteen of twenty-one to confirm it and fifteen of twenty-one to overturn it, and the Committee has no authority to reduce the ban.

FURTHER RESOLVED, that the person must receive the allegation in writing and **10 business days to respond** before MSIG votes, and their response must be published with the referral.

FURTHER RESOLVED, that **VS LLC must maintain a published ban register on the Portal**, checked at proposal submission and before assigning any role.

FURTHER RESOLVED, that every RFP must declare its **award shape at publication**: **Deliverable**, **Service**, or **Embedded** (Framework 20.2a); **the shape must not change at contracting or signing**; and the award shape defines the work product and never disapplies section 9:

1. a **Deliverable** award vests what was built, released under the licence recorded in the award decision — required by the RFP, offered by the awardee from the permitted set, or the applicable default;
2. an **Embedded** award vests the named deliverable, **carves out the awardee's identified pre-existing IP**, and takes an **irrevocable licence back, surviving termination**, over any pre-existing IP embedded in the deliverable, sufficient for the Network to use, modify, and have others operate it;
3. a **Service** award vests the **operational handover set** — configuration, deployment tooling, runbooks, and an export of any Network data — and nothing else, the running service being performed rather than delivered. Because it vests, the Network may give it to a successor provider, which is what makes a service re-competable rather than renewed indefinitely.

FURTHER RESOLVED, that a Service award's operational handover set and data export are due on **termination**, and an Embedded award's licence back survives termination.

FURTHER RESOLVED, that **pre-existing IP must be identified and carved out in Schedule A at contracting for every award shape**; unlisted items are excluded from pre-existing IP; if such IP is embedded in the work product, the awardee must grant the VST an **irrevocable licence back that survives termination**, allowing the Network to use, modify, and have third parties operate it; and on a Service award, the awardee's service software must be identified as pre-existing IP, and the awardee must warrant that a successor can **use the handover set independently**.

FURTHER RESOLVED, that **no Service or Embedded RFP may be published, and no award of any shape with a populated pre-existing-IP schedule may be contracted, until counsel confirms and records that section 9 of the standard Independent Contractor Agreement permits the Schedule A carve-out and licence back**; a Deliverable award with no carve-out may proceed; and defining the work product for an award shape does not narrow section 9; only the carve-out does.

FURTHER RESOLVED, that **Apache-2.0** is the default licence for code and **CC-BY-4.0** for non-code deliverables, and each **Deliverable or Embedded** RFP must declare a **licence mode at publication**:

- **Required**: the RFP names a binding licence.
- **Proposer's choice**: the RFP specifies a permitted set; the proposer chooses a licence from it, which becomes an award term.
- **Default**: the default licences apply.

FURTHER RESOLVED, that no licence mode is assigned to a **Service** award because its handover set vests outright, and **closed-source RFPs must use Required mode**.

FURTHER RESOLVED, that the **licence mode and, in Required mode, licence decision rest with the Committee at the publication threshold**; the mode, permitted set, and Required licence lock **at publication**; and in Proposer's choice mode, the chosen licence **locks at the award decision and must be recorded there**.

FURTHER RESOLVED, that the Committee must specify the permitted set **for each RFP**, with **no standing list**; if the Committee omits the set, **only permissive licences are allowed**; and this prevents an accidental copyleft obligation on Network infrastructure.

FURTHER RESOLVED, that a proposed licence may be scored **only if it is published as a separate criterion with its own weight before submissions open**; the standing openness criterion is insufficient; **any departure must be published in the RFP with reasons**; if a deliverable cannot be released as usable open source, the RFP must state this at publication and explain what the Network receives instead; and **open source is required where an RFP is silent**.

FURTHER RESOLVED, that program **funds are Network funds held outside the Trust**; **work product**, as defined by the award shape above, **vests in the VST**; and holding intellectual property for the Network is an express Trust purpose; allocating Network funds is not.

FURTHER RESOLVED, that **VS LLC must contract with awardees** through the standard Vaulta Stewardship LLC Independent Contractor Agreement, under which the award shape's **work product vests in the VST**; VS LLC's role is **administrative and contractual**: VS LLC neither chooses awardees nor controls the Program Account; and VS LLC must **refuse to contract on a decision plainly outside the mandate**, explaining why to the Committee and MSIG in writing.

FURTHER RESOLVED, that VS LLC's costs for this role are charged to **Program Costs within Part D's USD 40,000 cap**, separately from the CY2026 VST operating funding under MSIG #3.

### Part H — Committee pay

FURTHER RESOLVED, that VS LLC is authorized to contract with each Committee member, and members have **no status as Trust employees**.

FURTHER RESOLVED, that each member has a **fixed USD 2,500 monthly retainer**, **paid in arrears** in A at Part D's Reference Rate on the payment date; the same retainer applies to all five seats, including the Community seat and interim holder; and **no per-meeting fees, success fees, or payments tied to an award's size, number, or outcome** are authorized.

FURTHER RESOLVED, that member **Technical Reviewer fees** under Framework 12.6 are **Program Costs**, separate from Committee pay; they fall outside the retainer and the aggregate Committee pay cap below; and members who review technical work therefore **may earn more than other members**, even though the retainers are equal.

FURTHER RESOLVED, that the limit is **3 concurrent Technical Reviewer engagements per member**, and **no member may be engaged until that cap is set**.

FURTHER RESOLVED, that there is **no cap on a member's total Reviewer fees per cycle**; the control is on concurrent **workload**; Exhibit B's rate card is reserved to MSIG and must not be varied by the Committee; the fees are modest, and a member with three engagements earns fees for three engagements' assessments; and a total-fee cap could leave contracted milestones unpaid or force a mid-award Reviewer replacement; the concurrent cap controls workload before an engagement starts.

FURTHER RESOLVED, that every member-Reviewer engagement and fee must be **published in the cycle report by member and RFP**, including each member's cumulative cycle total, and block producers may change the limits at the Threshold or remove a member if they consider the resulting pay excessive.

FURTHER RESOLVED, that each member's contract must cover:

- The retainer.
- **Assignment of all work product to the VST** under section 9 of the standard Independent Contractor Agreement.
- Confidentiality and the Framework's conflict and recusal duties, including the **6-month bar on bidding after leaving**.
- **Key custody**: secure handling, no sharing or delegation, and surrender on removal or replacement.
- **Automatic suspension of pay** if the member is referred to MSIG for removal or misses 3 consecutive meetings without excuse.
- **Suspension of payment under Framework 13.4a**, with entitlement continuing to accrue and paid on resumption at the then-current rate.
- Termination on removal or when the term ends.

FURTHER RESOLVED, that reasonable, pre-approved expenses are reimbursable; total Committee pay of **USD 12,500 per month** is authorized, funded through each cycle's transfer; and pay continues only while block producers continue funding it.

### Part I — Funding

FURTHER RESOLVED, that the transfer of **A worth USD 284,375** to the Program Account as the first quarterly instalment is requested on behalf of the active block producers, from the Network's **REX yield pool and Year 1 allocation**, held at **[___]** *(name the source account)*.

FURTHER RESOLVED, that the program does not begin if the request is **declined, delayed, or only partly met**: the Program Account is not funded, no cycle starts, no term runs, and no pay accrues; the Committee must report this publicly; MSIG may re-scope the program to available funds; and starting the funding-dependent clocks at funding prevents a shortfall from silently shrinking an active cycle.

FURTHER RESOLVED, that the transfer is a **one-way contribution of Network funds**, which neither pass through nor remain held by the VST, and if the VST or VS LLC currently holds any of the source pools, transferring them releases Network funds and is not a Trust activity.

FURTHER RESOLVED, that **four cycles** are authorized, and **another MSIG Resolution is required for the next four cycles**, providing a recurring funding decision in place of a fixed mandate term.

FURTHER RESOLVED, that **USD 910,000 is authorized for the first four-cycle funding period**, comprising:

| Component | Per cycle | Four cycles |
|---|---|---|
| Cycle Ceiling for awards | 150,000 | 600,000 |
| **Program Costs** | **77,500** | **310,000** |
| — Committee pay | 37,500 | 150,000 |
| — Manager and Reviewer fees, Portal, administration | 40,000 | 160,000 |
| **Total Program Spend** | **227,500** | **910,000** |

FURTHER RESOLVED, that funds must be **transferred in four quarterly instalments**; each tops up the Program Account to **125% of the coming cycle's Total Program Spend**, valued in A at the Reference Rate; and forward commitments are already within that cycle's Cycle Ceiling and are not added again.

FURTHER RESOLVED, that there is **no spending authority against the 25% margin**, which protects USD commitments against a fall in A's price, and **the Committee must not commit against the margin**.

FURTHER RESOLVED, that the **first instalment is A worth USD 284,375**, calculated at the Reference Rate on the transfer date, which is 125% of the first cycle's USD 227,500 Total Program Spend.

FURTHER RESOLVED, that later instalments are authorized **without a further vote**, and block producers may **stop, reduce, or re-time any instalment by MSIG Resolution at any time**.

FURTHER RESOLVED, that unspent funds, including the margin, must not **carry into the next funding period**; the remaining balance must be **returned or swept through the owner permission as MSIG directs** after all contracted obligations are met; and there is **no sweep at individual cycle ends**; carried balances reduce the next quarterly top-up.

**No authority to create an entity**

FURTHER RESOLVED, that the Steering Committee is the Network's decision-making body **for RFP funding only**; the Committee, VST, and VS LLC are **not** authorized to **form, register, incorporate, or become a member or director of any company, foundation, association, trust, or other entity** on the Network's behalf; and **a separate MSIG Resolution at the Threshold is required to create any such entity**.

FURTHER RESOLVED, that this restriction applies to direct action and action through an agent, adviser, or affiliate, whether or not the entity would hold funds.

FURTHER RESOLVED, that management of the REX yield and Year 1 pools is addressed **only for the RFP program**, their wider management is not settled here, and the Committee does not represent the Network for other funds.

### Part J — Effect

FURTHER RESOLVED, that earlier MSIGs are **overridden only where they directly conflict**, and MSIGs #2, #3, and #4 otherwise remain fully in force.

FURTHER RESOLVED, that the **Trust Agreement amendments** needed to reflect the Committee's new name, size, and dual capacity **are authorized**, and the Trustee must execute the text prepared by Trust counsel, **without attaching or voting on that text here**.

FURTHER RESOLVED, that drafting, execution, and any conforming changes to VS LLC's operating procedures are assigned to the VST and VS LLC off-chain, and **block producers approve the direction to bring the documents into conformity**.

FURTHER RESOLVED, that the vstcreation MSIG approved the governing documents and required a separate MSIG Resolution for any material amendment or substantive change, and **that separate Resolution** is provided here for these amendments.

FURTHER RESOLVED, that this Resolution takes effect **on execution**, and **the Program Account must not be funded until the Exhibit D configuration under Part E is published**.

**Clocks start when the money arrives, not when this MSIG passes**

FURTHER RESOLVED, that the **first cycle starts when funds are received in the Program Account**, rather than when this MSIG takes effect, and Part D's cycle end date is calculated from that funding date.

FURTHER RESOLVED, that **Committee pay under Part H accrues from the later of contract signature and receipt of funds in the Program Account**, so VS LLC incurs no retainer obligations before the program is funded.

FURTHER RESOLVED, that the Committee must **publish the funding date on the Portal** when funds arrive, because three separate periods are calculated from it.
---

## Attachments

| Exhibit | Document | From |
|---|---|---|
| **A** | Vaulta Network RFP Framework | Working group |
| **B** | Manager and Reviewer rate card and scope | **Complete** — figures confirmed, concurrent cap set at 3 |
| **D** | Program Account, permission, and `disc.vst` register configuration — **the disclosure, decisions and publications registers** | VS LLC — drafted as a specification; deployment values to be filled before publication |
| **E** | Seat appointment MSIG template | This Resolution |
| **F** | Schedule A templates for Committee members, Program Managers, Technical Reviewers, and awardees | This Resolution |

**There is no Exhibit C.** Counsel's conforming amendments to the Trust Agreement were once attached under that letter. They are administered off-chain by the VST and VS LLC, and Part J directs the Trustee to execute them without attaching their text. **The remaining letters are unchanged**, because Exhibits D, E, and F are cited by letter throughout the Framework, the Schedule A templates, and the platform requirements, and renaming them to close the gap would silently redirect every one of those citations.

## Blanks to fill

The MSIG takes effect on execution, so there is no effective date to fill. **Every figure in this Resolution is now set**, not proposed: the Cycle Ceiling, the Per-Award Limit, operating costs, Committee pay, and the post-award review threshold are the numbers block producers are voting on. Part D already provides that you may change any amount, the cycle length, or any limit at the Threshold at any time, so nothing here is locked — but nothing here is a blank either.

**What is not here.** This list holds only what block producers decide or must see filled. Work the VST and VS LLC administer off-chain — candidate sourcing for the four seats, counsel's conforming amendments and operating-procedure changes, and the EOS Rio code and rights handover — is tracked in the **Program Administration Register**, which is not an attachment to this Resolution and is not approved by it.

**Numbers are stable.** When a blank is closed it is deleted from this list and the surviving numbers do not move. Gaps in the sequence are therefore deliberate, and every reference to a blank number elsewhere in this Resolution keeps pointing at the same item. Numbers here are **independent of** the numbering in the Framework's *Appendix C*: the same subject may be blank 12 here and item 11 there.

| # | Item | Part |
|---|---|---|
| 2 | Source account holding the REX yield and Year 1 pools | I |
| 4 | ECF process publication and first vote dates | F |
| 5 | **Exhibit D** — the account and register configuration. Drafted as a specification; the **deployment values remain** (its Part 10 and item **D1**; the member keys at **D6** are recorded as they arrive and do not hold publication). *Exhibit B is complete: its figures are confirmed and the concurrent-engagement cap is set at 3.* **Blocking — the Program Account is not funded until Exhibit D is published with its deployment record complete (Part J)** | Attachments |
| 8 | The **disclosure questionnaire instrument** (Framework 6.3a). **Drafted as version `VQ1`** — text, coded-answer schema and position bands complete. What remains is **publication by VS LLC with the register open for filing**, with **no open questions** remaining in it. **Blocking — the Program Account is not funded until every member has filed, and nobody can file until the register is open** | E |
| 9 | The **`disc.vst` register** — account, all three registers (**disclosures**, **decisions** and **publications**; three tables, one contract or more), both schemas, RAM provisioning (**settled: 16 MB at launch, provisioned and topped up by the VST and VS LLC — Exhibit D 8.6**), upgrade authority, and the writing authority, to be covered in Exhibit D (Framework 6.3b, 7.6a). **To be built and serviced by the EOS Rio team; VS LLC remains accountable.** **Blocking — the Program Account is not funded until Exhibit D is published** | E |
| 11 | **Counsel confirmation that section 9** of the standard Independent Contractor Agreement permits the pre-existing-IP carve-out and licence back by Schedule A. **Blocking — until confirmed, no Service or Embedded RFP may be published and no award may be contracted with a populated pre-existing-IP schedule** (Part G) | G, F |

## Notes for review

**1. What the vstcreation MSIG says.** The full text has now been reviewed. Four points.

**No Committee term exists.** vstcreation establishes the Oversight Committee "with three (3) initial members ... effective upon formation of the Trust" and stops there. No duration, no renewal, no selection process for later appointments. Part B therefore **sets** a one-year term rather than extending one, and supersedes MSIG #2's reference to "the remainder of Dario Cesaro's Initial Term", which has nothing to anchor to.

**The likely source of the confusion.** The Trust was formed on 13 February 2026. The Committee has been serving for roughly six months. That is an elapsed period, not a term — and it is easy to hear one as the other. The only six-month *term* anywhere is the Trustee's Initial Interim Term under Trust Agreement section 5(b).

**Two approved documents remain unreviewed.** vstcreation approved the LLC Operating Agreement, the Trust Agreement, and the **Trustee Compensation and Indemnification Acknowledgment**. Only the Trust Agreement has been provided. The standard Independent Contractor Agreement has since been reviewed and Part H now follows it, but the Acknowledgment may add indemnification terms specific to compensated governance roles that Committee members should have too. **Worth checking before Part H is final.**

**The amendment path is clear.** vstcreation provides that material amendment of the approved governing documents requires a separate MSIG Resolution. Part J relies on that clause.

**2. Where the figures come from.** **These are the figures you are voting on, not proposals** — the working group has confirmed them. Part D lets you change any of them at the Threshold at any time, and the reasoning below is kept so that a later change starts from what was actually considered rather than from the number alone. *Market figures as at the date of this draft; the USD denomination of every limit is unaffected by price movement, but the share-of-yield comparison below is not.* A trades at roughly **USD 0.077**, giving a market capitalisation of about USD 127 million on a circulating supply of about 1.66 billion A. The REX yield pool of 18–20M A a year is therefore worth roughly **USD 1.4–1.5 million a year**, or about **USD 350,000–380,000 a quarter**.

| Figure | Reasoning |
|---|---|
| **Cycle Ceiling USD 150,000** | About 40% of one quarter's REX yield, and about 10% of the annual yield. An earlier draft proposed 1,000,000 A, which at the current price is only about USD 77,000 — too thin to fund four to eight meaningful RFPs, and a good illustration of why the ceiling should be set in USD rather than in A |
| **Per-Award Limit USD 100,000** | Sized to accommodate recurring network infrastructure. The Treasury already contracts history API and related services at about **USD 7,000 a month** *(figure supplied by the VST; to be confirmed against the contract)*, which is USD 84,000 over a year. A USD 100,000 limit covers that with room, and is measured on total contract value so a monthly figure cannot be used to slip past it. This is a ceiling, not an expectation — early cycles are unlikely to approach it |
| **Manager and Reviewer fees, Portal, administration — USD 40,000 per quarter** | The Exhibit B rate card prices the first part: a **busy six-RFP cycle runs about USD 16,300** in Manager and Reviewer fees, leaving about **USD 23,700** for the Portal, hosting, and administration. An earlier draft set this at 50,000 before the rate card existed; with real figures the estimate could come down. It is a **cap**, not a budget to spend |
| **Program Costs USD 77,500 per quarter** | The two lines above, combined and capped. This is what the program spends on **itself**, as opposed to on the work — the single number to argue about, and the one to watch grow |
| **Committee pay USD 2,500 per member per month** | USD 150,000 a year across five seats. This is the figure most likely to be argued over, and it deserves to be. It is close to the VST's entire CY2026 operating budget of USD 160,000 under MSIG #3. The case for it is 1-year appointments with a named subject area, real evaluation workload, personal key custody, and legal exposure. The case against is that the Network would be paying its governance body roughly what it pays to run the Trust |
| **Post-award review threshold USD 25,000** | Stated as **25% of the Per-Award Limit**, so it moves when that Limit moves rather than silently drifting out of proportion to it. At the Cycle Ceiling at most six awards in a cycle can reach it, and against the expected band of USD 15,000–30,000 an RFP, roughly half of typical awards will — one or two short reviews per Manager per quarter against a pool of at least three, falling at closing rather than at award, so they spread out further |
| **Buffer 25%** | A can fall a long way in a quarter. Without a buffer, a decline would leave the program holding signed agreements it cannot pay in full |

**3. What this costs against the yield, over a year.** Quarterly figures make the total easy to miss, so here it is plainly.

| | USD |
|---|---|
| Awards, four cycles | 600,000 |
| Program Costs, four cycles — 150,000 Committee pay, 160,000 everything else | 310,000 |
| **Total authorized for one year (Total Program Spend)** | **910,000** |
| **Gross transferred** — first instalment 284,375, then three top-ups of up to 227,500 | **up to 966,875** |
| REX yield at today's price of A | ~1,400,000–1,500,000 a year |
| **Share of the annual yield — committed** | **roughly 61–65%** |
| **Share of the annual yield — gross transferred** | **roughly 65–69%** |

The gross figure is the one that leaves the Treasury. **The 25% margin is funded once, not four times** — each instalment after the first *tops the account up* to 125% of the coming cycle's spend, so it restores whatever the previous cycle consumed rather than adding a fresh margin. At full spend and a steady price the gross is 284,375 + 3 × 227,500. The margin is not spending authority and is returned at the end of the funding period, but it is unavailable to the Network in the meantime.

Gross runs **higher than 966,875 if the price of A falls**, because the top-up restores a USD-denominated level from an account holding A. It runs **lower if the program underspends**, since a carried balance reduces the next top-up.

**That is a large share, and block producers should decide it deliberately.** The REX yield is not reserved for the RFP program — it also has to cover Labs, infrastructure, and anything else the Network funds from it. If the intention is for the RFP program to be one call on the yield among several, the quarterly ceiling should come down. A ceiling of USD 100,000 a cycle brings the annual **Total Program Spend** to **USD 710,000** — 400,000 in awards plus 310,000 of Program Costs — about **49%** of the yield.

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

**9. Settled for now: equal pay.** Part H pays **all five seats equally**, and the working group has confirmed that for the first funding period. **Revisit at the annual review** under Framework 14.3 — and note that Reviewer fees under Framework 12.6 make pay unequal in practice. The working group has decided **not** to cap that inequality by amount: the concurrent-engagement cap in Part H bounds the workload, and the cycle report makes the resulting totals visible. Unequal pay is therefore **accepted and published**, not capped. The arguments considered, kept as the record of reasoning:

*For differentiating.* Core Development, Business Development, and Marketing carry recurring scoping and diligence work in their categories. Technical judgment in particular is the hardest of the five to recruit, and a weak evaluation there costs the most.

*For equal pay.* By the seat table in the Framework, the Community seat carries two named MSIG #4 categories — educational initiatives, and community engagement and advocacy — while Business Development carries one. Portfolio load does not rank the way intuition suggests, and it is in any case a poor proxy for effort. The At-Large member **chairs** the Committee, which is different work rather than less of it. All five hold identical vote weight, identical signing duty, identical key custody, identical conflict obligations, and identical liability exposure. And the Community seat is the one filled by **community vote** — paying it least is a statement about its standing that will be quoted back during the first contested award.

*Alternatives to a seat differential.* Scarce technical expertise can be bought per engagement through the **Technical Reviewer budget**, where it is needed and at a rate that reflects it, rather than embedded permanently in a retainer. Drafting and category diligence can sit with the **Program Manager pool**, with the portfolio lead sponsoring and directing rather than producing.

**10. Read Part I narrowly.** The Treasury has said the open question is who represents the Network to receive and manage these funds. The Steering Committee serves that purpose **for the RFP program only**. Part I now states expressly that creating any new entity or foundation requires a separate MSIG.

*Drafted to match the structure of MSIGs #2 to #4. Part E requires VST confirmation. Contract terms require review by counsel.*
