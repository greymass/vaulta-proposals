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
| 4 | **Set a 1-year term** for members, staggered at the start | Part B; Framework 3.2–3.4 |
| 5 | **Give the Committee a mandate to decide RFP funding** on behalf of the Network | Block producers stop voting on individual awards |
| 6 | **Cap that mandate**: Cycle Ceiling **USD 150,000 per cycle**, Per-Award Limit **USD 100,000 total contract value**. The mandate **runs until you cancel it** | Anything larger comes back to you |
| 7 | **Hold program funds on-chain**, moved only by 4 of 5 Committee signatures | Owner permission stays with `eosio.prods` |
| 8 | **Every payment waits 7 days** before it executes, in public | You may cancel any payment at 15/21 during that wait |
| 9 | **Objection rule**: 4–6 block producers objecting sends an award back to you; 7 or more ends it | Part E |
| 10 | **Recognize ECF** to run the community vote for the Community seat | **All five seats require future MSIG appointments**; Francis continues **Trust oversight only** until they are filled |
| 11 | **Pay Committee members USD 2,500 per month each**, contracted through VS LLC | No success fees, no per-award pay |
| 11a | Allow Committee members to earn **separate Technical Reviewer fees** | Rate-card fees under Framework 12.6, **outside the retainer** — see Part H. Limited to **3 concurrent engagements**, not by total fees. Not available until that cap is set |
| 12 | **Authorize USD 910,000 over four quarterly cycles**, first instalment A worth USD 284,375 | Gross transferred up to USD 966,875 — see note 3 |
| 13 | Allow **fallback pricing when the oracle is stale or unavailable** | Use the **CoinMarketCap fallback** set in Framework 13.4; if it also fails, **all payments stop and no new awards may be made**. **Only block producers** may name a permanent replacement rate source. Framework 13.4, 13.4a |

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
**Reference Rate** — the rate used to convert USD amounts into A at the time of the relevant action, using the Delphi Oracle or the CoinMarketCap fallback under Framework 13.4.
**Award Commitments** — amounts committed to awardees, constrained by the Cycle Ceiling.
**Program Costs** — Committee pay, Manager and Reviewer fees, Portal and administration costs.
**Total Program Spend** — Award Commitments plus Program Costs.
**Portal** — the RFP portal authorized under MSIG #4.

---

## Resolved clauses

### Part A — Approve the Framework

RESOLVED, that the Vaulta Network RFP Framework in Exhibit A is approved; the Portal is established as the **official publication platform for** RFPs, the needs backlog, award decisions, the objection register, meeting minutes, and cycle reports; and **VS LLC must maintain and administer the Portal**.

FURTHER RESOLVED, that the working group established under MSIG #4 is discharged, having completed its work.

### Part B — The Steering Committee

FURTHER RESOLVED, that the Oversight Committee is renamed the **Vaulta Network Steering Committee**; the same Committee body continues; and the new name applies to references in the Trust Agreement, prior MSIGs, the VS LLC Operating Agreement, and other Trust documents.

**Appointments**

FURTHER RESOLVED, that **all five Steering Committee seats remain unfilled by this Resolution**; Committee members must be appointed by **separate MSIG Resolutions at the Threshold**, with each appointment proposal **meeting the requirements in Exhibit E**; and **candidates must be considered on their own merits**, with the Community seat selected under Part F.

FURTHER RESOLVED, that an incomplete appointment proposal that executes is **not void**, but **pay and signing weight begin only after all required items are filed, the engagement contract is signed, and the signing key is registered**.

FURTHER RESOLVED, that a further MSIG Resolution may correct an appointment executed in error.

**Transition until all five seats are filled**

FURTHER RESOLVED, that **Dafeng Guo (Vaulta Treasury)**, **Ross Dold (EOSphere)**, and **Francis Sangkuan (1DEX)** continue serving **in the original Oversight Committee's capacity** until all five Steering Committee seats are filled by future MSIG Resolutions, when their transition service ends.

FURTHER RESOLVED, that their transition service is limited to **the former Oversight Committee's Trust oversight responsibilities**, and **the RFP mandate cannot be exercised, no RFP may be published, and no award may be made** until the Committee is constituted.

FURTHER RESOLVED, that **no two seats may be occupied by the same person or by people connected to the same block producer, company, or corporate group**; each member must sign their engagement contract, **file their conflict declaration through the standard on-chain disclosure questionnaire** under Framework 6.3a and 6.3b, and register their signing key **within 30 days of appointment execution or VS LLC’s announcement that the disclosure register is open, whichever is later**; and **pay and signing weight begin only after all three are complete**.

### Part C — The Mandate

FURTHER RESOLVED, that the Committee is authorized to **award funds, select vendors, and create payment obligations on behalf of the Network**, subject to the **Framework's rules and limits**, as required by MSIG #4.

### Part D — Limits and denomination

FURTHER RESOLVED, that the following limits apply:

| Limit | Amount (USD) | Applies to |
|---|---|---|
| **Cycle Ceiling** — most the Committee may commit in **awards** | **150,000** | Each cycle |
| **Per-Award Limit** — largest single award without coming back to MSIG | **100,000** | **Total contract value across all cycles** |
| **Program Costs** — everything the program spends on itself | **77,500** | Each cycle |
| — of which **Committee pay**, 5 members × 3 months at USD 2,500 | **37,500** | Each cycle |
| — of which **Manager and Reviewer fees, Portal, and administration** | **40,000** | Each cycle |
| **Total Program Spend for the cycle** | **227,500** | Each cycle |

FURTHER RESOLVED, that the **post-award review threshold under Framework 25.2 is USD 25,000**, or **25% of the Per-Award Limit**; the threshold must be reset to a quarter of that Limit whenever the Limit changes; and **reviews must be summarized in the next cycle report**.

**Everything is denominated in USD. Everything is paid in A.**

### Part E — The Program Account and how payments work

FURTHER RESOLVED, that payments must use these delay windows:

| Setting | Value |
|---|---|
| Delay before a payment executes | **168** hours (7 days) |
| Shorter delay for urgent awards | **72** hours (3 days) |

FURTHER RESOLVED, that **VS LLC must develop and configure the Program Account, Committee Permission, and the disclosure, decisions, and publications registers on `disc.vst`**, and **publish Exhibit D before funding**, identifying the account names, permission structure and thresholds, delay mechanism and values, cancellation path and exact action and authority required, account resources, `eosusd` pair and `quoted_precision`, a worked payment calculation, register contracts and ABIs, deployment, upgrade and writing authorities, schemas and versions, questionnaire version, and register RAM provisioning.

**If the protocol cannot enforce the delay**

FURTHER RESOLVED, that payment delays must be **enforced on-chain**, with the **held-multisignature fallback in Exhibit D Part 3.3 authorized only if the protocol cannot enforce them**.

FURTHER RESOLVED, that if any element cannot be built as specified, **VS LLC must publish the limitation and propose the nearest workable alternative in Exhibit D**.

### Part F — The Community seat

FURTHER RESOLVED, that ECF is asked to publish its process by **[___]** and complete the first vote by **[___]**.

### Part G — Program roles and VS LLC

FURTHER RESOLVED, that the Committee must decide **at scoping whether a Technical Reviewer is needed**, based on whether the work is technical, **including Service awards**.

FURTHER RESOLVED, that **the program must not rely on the RFP platform or Portal code until the rights and repository requirements in Framework 15.2a are met**.

FURTHER RESOLVED, that a **material conflict-of-interest breach** requires **immediate suspension of the person's role, signing weight, and pay, and referral to MSIG**.

FURTHER RESOLVED, that **any departure from the default licence must be published in the RFP with reasons**.

FURTHER RESOLVED, that **VS LLC's RFP administration costs are charged to Program Costs, separately from the CY2026 VST operating funding under MSIG #3**.

### Part H — Committee pay

FURTHER RESOLVED, that each of the **five Committee members** has a **fixed USD 2,500 monthly retainer**, **paid in arrears** in A at the Reference Rate under Framework 13.4 on the payment date; and **no per-meeting fees, success fees, or payments tied to an award's size, number, or outcome** are authorized.

FURTHER RESOLVED, that the cap under Framework 12.6 is **3 concurrent Technical Reviewer engagements per member**.

FURTHER RESOLVED, that each member's contract must cover:

- The retainer.
- **Assignment of all work product to the VST** under section 9 of the standard Independent Contractor Agreement.
- The confidentiality, conflict, recusal, and post-service bidding restrictions in **Framework section 6**.
- **Secure key handling** and the custody duties in **Framework 7.4**.
- **Automatic suspension of pay** if the member is referred to MSIG for removal or misses 3 consecutive meetings without excuse.
- The payment suspension, accrual, and resumption rules in **Framework 13.4a**.
- Termination on removal or when the term ends.

FURTHER RESOLVED, that reasonable, pre-approved expenses are reimbursable; Committee pay is funded through each cycle's transfer and continues only while block producers continue funding it.

### Part I — Funding

FURTHER RESOLVED, that the active block producers request a **first quarterly instalment of A worth USD 284,375** to the Program Account, calculated at the **Reference Rate on the transfer date** under **Framework 13.1**, from the Network's **REX yield pool and Year 1 allocation**, held at **[___]** *(name the source account)*.

FURTHER RESOLVED, that the program does not begin if the request is **declined, delayed, or only partly met**: the Program Account is not funded, no cycle starts, no term runs, and no pay accrues; the Committee must report this publicly; MSIG may re-scope the program to available funds.

FURTHER RESOLVED, that the transfer is a **one-way contribution of Network funds**, and any source pools held by the VST or VS LLC are released as Network funds, not as a Trust activity.

FURTHER RESOLVED, that **USD 910,000 is authorized for the first four quarterly cycles, covering one year**, with **another MSIG Resolution required for the next four cycles**, comprising:

| Component | Per cycle | Four cycles |
|---|---|---|
| Cycle Ceiling for awards | 150,000 | 600,000 |
| **Program Costs** | **77,500** | **310,000** |
| — Committee pay | 37,500 | 150,000 |
| — Manager and Reviewer fees, Portal, administration | 40,000 | 160,000 |
| **Total Program Spend** | **227,500** | **910,000** |

FURTHER RESOLVED, that the **25% funding margin provides no authority to spend or commit funds**.

FURTHER RESOLVED, that later instalments within the first four-cycle funding period are authorized **without a further vote**, subject to **Framework 13.1**.

**No authority to create an entity**

FURTHER RESOLVED, that the Committee, VST, and VS LLC may not **form, register, incorporate, or become a member or director of any company, foundation, association, trust, or other entity** on the Network's behalf, directly or through an agent, adviser, or affiliate, whether or not it would hold funds; and **a separate MSIG Resolution at the Threshold is required to create any such entity**.

FURTHER RESOLVED, that this Resolution **does not settle the wider management of the REX yield and Year 1 pools**, and the Committee does not represent the Network for other funds.

### Part J — Effect

FURTHER RESOLVED, that earlier MSIGs are **overridden only where they directly conflict**, and MSIGs #2, #3, and #4 otherwise remain fully in force.

FURTHER RESOLVED, that the **Trust Agreement amendments** needed to reflect the Committee's new name, size, and dual capacity **are authorized**, and the Trustee must execute the text prepared by Trust counsel, **without attaching or voting on that text here**.

FURTHER RESOLVED, that the **VST and VS LLC are responsible off-chain for drafting, execution, and any conforming changes to VS LLC's operating procedures**.

FURTHER RESOLVED, that this Resolution takes effect **on execution**.

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

The MSIG takes effect on execution, so there is no effective date to fill. **Every figure in this Resolution is now set**, not proposed: the Cycle Ceiling, the Per-Award Limit, operating costs, Committee pay, and the post-award review threshold are the numbers block producers are voting on. Framework 13.1 provides that you may change any amount, the cycle length, or any limit at the Threshold at any time, so nothing here is locked — but nothing here is a blank either.

**What is not here.** This list holds only what block producers decide or must see filled. Work the VST and VS LLC administer off-chain — candidate sourcing for the four staggered seats, counsel's conforming amendments and operating-procedure changes, and the EOS Rio code and rights handover — is tracked in the **Program Administration Register**, which is not an attachment to this Resolution and is not approved by it.

**Numbers are stable.** When a blank is closed it is deleted from this list and the surviving numbers do not move. Gaps in the sequence are therefore deliberate, and every reference to a blank number elsewhere in this Resolution keeps pointing at the same item. Numbers here are **independent of** the numbering in the Framework's *Appendix C*: the same subject may be blank 12 here and item 11 there.

| # | Item | Part |
|---|---|---|
| 2 | Source account holding the REX yield and Year 1 pools | I |
| 4 | ECF process publication and first vote dates | F |
| 5 | **Exhibit D** — the account and register configuration. Drafted as a specification; the **deployment values remain** (its Part 10 and item **D1**; the member keys at **D6** are recorded as they arrive and do not hold publication). *Exhibit B is complete: its figures are confirmed and the concurrent-engagement cap is set at 3.* **Blocking — the Program Account is not funded until Exhibit D is published with its deployment record complete (Part E)** | Attachments |
| 8 | The **disclosure questionnaire instrument** (Framework 6.3a). **Drafted as version `VQ1`** — text, coded-answer schema and position bands complete. What remains is **publication by VS LLC with the register open for filing**, with **no open questions** remaining in it. **Blocking — the Program Account is not funded until every member has filed, and nobody can file until the register is open** | E |
| 9 | The **`disc.vst` register** — account, all three registers (**disclosures**, **decisions** and **publications**; three tables, one contract or more), both schemas, RAM provisioning (**settled: 16 MB at launch, provisioned and topped up by the VST and VS LLC — Exhibit D 8.6**), upgrade authority, and the writing authority, to be covered in Exhibit D (Framework 6.3b, 7.6a). **To be built and serviced by the EOS Rio team; VS LLC remains accountable.** **Blocking — the Program Account is not funded until Exhibit D is published** | E |
| 11 | **Counsel confirmation that section 9** of the standard Independent Contractor Agreement permits the pre-existing-IP carve-out and licence back by Schedule A. **Blocking — until confirmed, no Service or Embedded RFP may be published and no award may be contracted with a populated pre-existing-IP schedule** (Framework 23.3a) | Framework 23.3a; F |

## Notes for review

**1. What the vstcreation MSIG says.** The full text has now been reviewed. Four points.

**No Committee term exists.** vstcreation establishes the Oversight Committee "with three (3) initial members ... effective upon formation of the Trust" and stops there. No duration, no renewal, no selection process for later appointments. Framework 3.2 **sets** a one-year term rather than extending one, and supersedes MSIG #2's reference to "the remainder of Dario Cesaro's Initial Term", which has nothing to anchor to.

**The likely source of the confusion.** The Trust was formed on 13 February 2026. The Committee has been serving for roughly six months. That is an elapsed period, not a term — and it is easy to hear one as the other. The only six-month *term* anywhere is the Trustee's Initial Interim Term under Trust Agreement section 5(b).

**Two approved documents remain unreviewed.** vstcreation approved the LLC Operating Agreement, the Trust Agreement, and the **Trustee Compensation and Indemnification Acknowledgment**. Only the Trust Agreement has been provided. The standard Independent Contractor Agreement has since been reviewed and Part H now follows it, but the Acknowledgment may add indemnification terms specific to compensated governance roles that Committee members should have too. **Worth checking before Part H is final.**

**The amendment path is clear.** vstcreation provides that material amendment of the approved governing documents requires a separate MSIG Resolution. Part J relies on that clause.

**2. Where the figures come from.** **These are the figures you are voting on, not proposals** — the working group has confirmed them. Framework 13.1 lets you change any of them at the Threshold at any time, and the reasoning below is kept so that a later change starts from what was actually considered rather than from the number alone. *Market figures as at the date of this draft; the USD denomination of every limit is unaffected by price movement, but the share-of-yield comparison below is not.* A trades at roughly **USD 0.077**, giving a market capitalisation of about USD 127 million on a circulating supply of about 1.66 billion A. The REX yield pool of 18–20M A a year is therefore worth roughly **USD 1.4–1.5 million a year**, or about **USD 350,000–380,000 a quarter**.

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

**The smoothing does not matter as much as it first appeared.** Because awards are denominated in USD, an awardee receives their contracted USD value whatever the price of A is doing — a volatile rate does not change what they are paid. The volatility lands on the program's A outflow instead, and that is already managed by the coverage test and the 25% margin. The 15% collar in Framework 13.4 covers the remaining case: a momentary spike or crash producing an anomalous payment.

**4b. Denomination, and who carries the price risk.** An earlier draft priced awards in A and froze the A amount at the award decision, which put the price risk on awardees. That has been **reversed**: awards are now denominated in USD and the A amount is calculated at each milestone approval, so **the program carries the risk**.

This is the better allocation. Awardees are teams and individuals who budget in fiat, and asking them to absorb the movement of A over a multi-month engagement would have shown up as padded bids, shorter engagements, or good teams declining to bid at all.

The cost is that the program's purchasing power now moves with A. That is what the coverage test in Framework 13.4 and the 25% funding margin in Part I exist to manage. Two consequences block producers should understand before voting:

- **A sustained fall in A can force the program to stop awarding mid-cycle.** The coverage rules say so plainly rather than leaving it to be discovered.
- **The Treasury may be asked for a top-up** if coverage falls to the 10% floor. That is a reserved matter and comes back to block producers.

**5. How a USD 100,000 award sits inside a USD 150,000 cycle.** Charged to one cycle it would consume two-thirds of it, leaving little for anything else — which is why multi-cycle awards are handled separately in Framework 13.2. A twelve-month infrastructure service at USD 7,000 a month reserves only the months falling inside the current cycle, around USD 21,000 for a quarter. The rest becomes a **forward commitment** that reduces the ceiling in each later cycle it touches.

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

**8. Why the clocks start at funding.** Under MSIG #3 the Treasury funding for the VST was approved well before it arrived, and the Trustee and LLC Manager contracts were only signed in June 2026 once it did. If the same gap happens here and the cycle and pay run from MSIG approval, VS LLC would carry retainer obligations against money it does not have, and the cycle would burn while the Committee had nothing to allocate. Framework 13.1 ties both clocks to the arrival of funds.

**9. Settled for now: equal pay.** Part H pays **all five seats equally**, and the working group has confirmed that for the first funding period. **Revisit at the annual review** under Framework 14.3 — and note that Reviewer fees under Framework 12.6 make pay unequal in practice. The working group has decided **not** to cap that inequality by amount: the concurrent-engagement cap in Part H bounds the workload, and the cycle report makes the resulting totals visible. Unequal pay is therefore **accepted and published**, not capped. The arguments considered, kept as the record of reasoning:

*For differentiating.* Core Development, Business Development, and Marketing carry recurring scoping and diligence work in their categories. Technical judgment in particular is the hardest of the five to recruit, and a weak evaluation there costs the most.

*For equal pay.* By the seat table in the Framework, the Community seat carries two named MSIG #4 categories — educational initiatives, and community engagement and advocacy — while Business Development carries one. Portfolio load does not rank the way intuition suggests, and it is in any case a poor proxy for effort. The At-Large member **chairs** the Committee, which is different work rather than less of it. All five hold identical vote weight, identical signing duty, identical key custody, identical conflict obligations, and identical liability exposure. And the Community seat is the one selected through **community vote** — paying it least is a statement about its standing that will be quoted back during the first contested award.

*Alternatives to a seat differential.* Scarce technical expertise can be bought per engagement through the **Technical Reviewer budget**, where it is needed and at a rate that reflects it, rather than embedded permanently in a retainer. Drafting and category diligence can sit with the **Program Manager pool**, with the portfolio lead sponsoring and directing rather than producing.

**10. Read Part I narrowly.** The Treasury has said the open question is who represents the Network to receive and manage these funds. The Steering Committee serves that purpose **for the RFP program only**. Part I now states expressly that creating any new entity or foundation requires a separate MSIG.

*Drafted to match the structure of MSIGs #2 to #4. Part E requires VST confirmation. Contract terms require review by counsel.*
