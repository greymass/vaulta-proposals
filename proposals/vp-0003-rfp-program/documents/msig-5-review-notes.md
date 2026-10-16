# MSIG #5 — Review Notes

**Reference only — not an additional resolution or an exhibit approved by MSIG #5.**

These notes preserve the draft’s historical, financial, and technical reasoning. Market figures and elapsed-time descriptions refer to that draft, not current data. Operative requirements remain in MSIG #5 and its Framework, including the annual pay review and treatment of existing Treasury contracts.

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

## Framework launch recommendation

**Recommendation:** do not run the open call in cycle 1 (Framework section 26). This is non-binding advice, not a program rule.
