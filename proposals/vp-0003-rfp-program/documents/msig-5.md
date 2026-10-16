# MSIG #5 — Network Steering Committee, RFP Framework, Program Funding

**Status: DRAFT v6.14 — for VST and block producer review**
**Date: [___]**

---

## Summary — what you are voting on

| # | Decision | Detail |
|---|---|---|
| 1 | **Approve the RFP Framework** required by MSIG #4 | Exhibit A |
| 2 | **Rename** the Oversight Committee the Network Steering Committee | Same body, continued |
| 3 | **Grow it from 3 seats to 5**, each with a subject area | Core Development, Marketing, Business Development, Community, At-Large |
| 4 | **Set member terms** | Initial terms: **14 months** for Core Development and Marketing; **8 months** for Business Development and At-Large; **12 months** for Community. Later terms are **12 months**; vacancy appointments cover the remaining term. Framework 3.2–3.4, 3.7. |
| 5 | **Authorize RFP funding decisions** | The Committee decides on behalf of the Network; within the mandate, block producers no longer vote on individual RFPs or awards. |
| 6 | **Set funding limits** | **USD 150,000 per cycle** in awards; **USD 100,000 total contract value per award**. Larger awards return to MSIG. The mandate continues until block producers cancel it. |
| 7 | **Hold program funds on-chain**, moved only by 4 of 5 Committee signatures | Owner permission stays with `eosio.prods` |
| 8 | **Require a public 7-day payment delay** | Urgent awards use a **3-day delay**; block producers may cancel at **15/21** during either wait. Part E. |
| 9 | **Send awards back for MSIG approval after 4–6 objections; cancel awards after 7 or more** | Block producer objections during the payment delay. The Committee cancels payment in both cases. Only the **4–6 band** allows a new payment proposal after MSIG confirmation. Framework 10.5. |
| 10 | **Recognize ECF** to run the community vote for the Community seat | **All five seats require future MSIG appointments**; Francis continues **Trust oversight only** until they are filled |
| 11 | **Pay Committee members USD 2,500 per month each**, contracted through VS LLC | No success fees, no per-award pay |
| 11a | Allow Committee members to earn **separate Technical Reviewer fees** | Rate-card fees under Framework 12.6, **outside the retainer** — see Part H. Limited to **3 concurrent engagements**, not by total fees. |
| 12 | **Authorize program funding** | **USD 910,000 over four quarterly cycles**; first instalment: A worth **USD 284,375**. Gross transfer at full spend and a steady A price: **USD 966,875**. Review Notes, note 3. |
| 13 | Allow **fallback pricing when the oracle is stale or unavailable** | Use the **CoinMarketCap fallback**; Committee approvals, suspensions, and essential operating payments follow **Framework 13.4–13.4a**. **Only block producers** may name a permanent replacement rate source |

---

## Purpose

MSIG #4 authorized a working group to write an RFP Framework, and required that the final Framework be approved by at least 15 of 21 active block producers before it could be used. This MSIG approves that Framework and puts it into effect.

It also reconstitutes the Oversight Committee as the Steering Committee, gives that Committee a bounded mandate to make RFP funding decisions for the Network, and asks the Treasury to fund the program.

## Definitions

- **Committee** — the Vaulta Network Steering Committee.
- **Framework** — the Vaulta Network RFP Framework, Exhibit A.
- **Program Account** — the on-chain account holding program funds.
- **Committee Permission** — the multisignature permission through which the Committee moves those funds.
- **Mandate** — the authority granted in Part C.
- **Threshold** — approval by not fewer than 15 of the 21 active block producers.
- **Reference Rate** — the rate used to convert USD amounts into A at the time of the relevant action, using the Delphi Oracle or the CoinMarketCap fallback under Framework 13.4.
- **Program Costs** — Committee pay, Manager and Reviewer fees, Portal and administration costs.
- **Total Program Spend** — amounts committed to awardees plus Program Costs.
- **Portal** — the RFP portal authorized under MSIG #4.

---

## Resolved clauses

### Part A — Approve the Framework

RESOLVED, that the Vaulta Network RFP Framework in Exhibit A is approved; the Portal is established as the **official publication platform for** RFPs, the needs backlog, award decisions, the objection register, meeting minutes, and cycle reports; and **VS LLC must maintain and administer the Portal**.

FURTHER RESOLVED, that the working group established under MSIG #4 is discharged, having completed its work.

### Part B — The Steering Committee

FURTHER RESOLVED, that the Oversight Committee is renamed the **Vaulta Network Steering Committee**; the same Committee body continues, **retaining its records and indemnification rights**; and the new name applies to references in the Trust Agreement, prior MSIGs, the VS LLC Operating Agreement, and other Trust documents.

**Appointments**

FURTHER RESOLVED, that **this Resolution fills none of the five Steering Committee seats**; members must be appointed **on their own merits by separate MSIG Resolutions that meet Exhibit E’s requirements and are approved at the Threshold**, with Community-seat selection under **Framework section 4**.

FURTHER RESOLVED, that a further MSIG Resolution may correct an appointment executed in error.

**Transition until all five seats are filled**

FURTHER RESOLVED, that **Dafeng Guo (Vaulta Treasury), Ross Dold (EOSphere), and Francis Sangkuan (1DEX)** continue **the former Oversight Committee’s Trust oversight duties only** until all five Steering Committee seats are filled, when their transition service ends; Ross Dold may be separately appointed, while Dafeng Guo remains subject to the Treasury exclusion in **Framework 2.4a**; and until then **the RFP mandate must not be exercised, no RFP may be published, and no award may be made**.

### Part C — The Mandate

FURTHER RESOLVED, that the Committee is authorized to **award funds, select vendors, and create payment obligations on behalf of the Network**, subject to the **Framework's rules and limits**.

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

FURTHER RESOLVED, that the post-award review threshold under Framework 25.2 is **25% of the Per-Award Limit, currently USD 25,000**, and must be reset when that Limit changes; **reviews must be summarized in the next cycle report**.

**Everything is denominated in USD. Everything is paid in A.**

### Part E — The Program Account and how payments work

FURTHER RESOLVED, that payments must use these delay windows:

| Setting | Value |
|---|---|
| Delay before a payment executes | **168** hours (7 days) |
| Shorter delay for urgent awards | **72** hours (3 days) |

FURTHER RESOLVED, that **VS LLC must develop and configure the Program Account, Committee Permission, and the disclosure, decisions, and publications registers on `disc.vst` according to Exhibit D**, and **publish Exhibit D with its required configuration and completed deployment record before funding**.

FURTHER RESOLVED, that payment delays must be **enforced on-chain**, with the **held-multisignature fallback in Exhibit D section 2.3 authorized only if the protocol cannot enforce them**.

### Part F — The Community seat

FURTHER RESOLVED, that ECF is asked to publish its process by **[___]** and complete the first vote by **[___]**.

### Part G — Program roles and VS LLC

FURTHER RESOLVED, that **the program must not rely on the RFP platform or Portal code until the rights and repository requirements in Framework 15.2a are met**.

FURTHER RESOLVED, that **VS LLC's RFP administration costs are charged to Program Costs, separately from the CY2026 VST operating funding under MSIG #3**.

### Part H — Committee pay

FURTHER RESOLVED, that each of the **five Committee members** has a **fixed USD 2,500 monthly retainer**, **paid in arrears** in A using the Reference Rate **when payment is proposed**, subject to **Framework 13.4–13.4a**; and **no per-meeting fees, success fees, or payments tied to an award's size, number, or outcome** are authorized.

FURTHER RESOLVED, that the cap under Framework 12.6 is **3 concurrent Technical Reviewer engagements per member**.

FURTHER RESOLVED, that **Committee pay must be revisited at the annual review under Framework 14.3**.

FURTHER RESOLVED, that each member must use the **Committee contract template in Exhibit F**.

FURTHER RESOLVED, that Committee pay is funded through each cycle's transfer and continues only while block producers continue funding it.

### Part I — Funding

FURTHER RESOLVED, that the active block producers request a **first quarterly instalment of A worth USD 284,375** to the Program Account, calculated at the **Reference Rate on the transfer date** under **Framework 13.1**, from the Network's **REX yield pool and Year 1 allocation**, held at **[___]** *(name the source account)*.

FURTHER RESOLVED, that the program does not begin if the request is **declined, delayed, or only partly met**: the Program Account is not funded, no cycle starts, the **four funding-anchored initial terms under Framework 3.4** do not begin, and no pay accrues; the **Community term still runs from appointment execution** under that section; the Committee must report this publicly; MSIG may re-scope the program to available funds.

FURTHER RESOLVED, that the transfer is a **one-way contribution of Network funds**, and any source pools held by the VST or VS LLC are released as Network funds, not as a Trust activity.

FURTHER RESOLVED, that **USD 910,000 is authorized for the first four quarterly cycles, covering one year**, comprising **USD 600,000 for awards and USD 310,000 for Program Costs**, subject to **Part D’s limits**, with **another MSIG Resolution required for the next four cycles**.

FURTHER RESOLVED, that the **25% funding margin provides no authority to spend or commit funds**.

FURTHER RESOLVED, that later instalments within the first four-cycle funding period are authorized **without a further vote**, subject to **Framework 13.1**.

FURTHER RESOLVED, that this Resolution **does not settle the wider management of the REX yield and Year 1 pools**, and the Committee does not represent the Network for other funds.

FURTHER RESOLVED, that approval of this Resolution **does not transfer or re-compete existing Treasury service contracts**; either requires a separate decision.

### Part J — Effect

FURTHER RESOLVED, that earlier MSIGs are **overridden only where they directly conflict**, and MSIGs #2, #3, and #4 otherwise remain fully in force.

FURTHER RESOLVED, that the **Trust Agreement amendments** needed to reflect the Committee's new name, size, and dual capacity **are authorized**; the Trustee must execute the text prepared by Trust counsel, **without attaching or voting on that text here**; and the **VST and VS LLC are responsible off-chain for drafting, execution, and any conforming changes to VS LLC's operating procedures**.

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

**There is no Exhibit C**; Trust Agreement amendments are administered off-chain under Part J. Exhibit letters remain unchanged.

**Review requirements.** Part E requires VST confirmation; contract terms require counsel review.

## Blanks to fill

**The figures are set; only the items below remain open.**

Off-chain candidate sourcing, counsel’s amendments and operating-procedure changes, and the EOS Rio rights and repository handover remain in the **Program Administration Register**, outside this Resolution’s attachments and approval.

**Blank numbers remain fixed** when items are closed and are independent of Framework Appendix C numbering.

| # | Item | Part |
|---|---|---|
| 2 | Source account holding the REX yield and Year 1 pools | I |
| 4 | ECF process publication and first vote dates | F |
| 5 | **Publish Exhibit D with its required deployment record complete** (Exhibit D 6.1; D1). Member keys at **D6** may be recorded as they arrive and do not block publication. **Blocking — no Program Account funding before publication** (Part E). | Attachments |
| 8 | **VS LLC must publish questionnaire `VQ1` and open the register for filing**, with no unresolved questionnaire items (Framework 6.3a). Its text, coded-answer schema, and bands are complete. **Blocking — no Program Account funding until every member has filed.** | E |
| 9 | **Configure all three `disc.vst` registers under Exhibit D** (Framework 6.3b, 7.6a), including schemas, authorities, and **16 MB launch RAM provisioned and topped up by the VST and VS LLC** (Exhibit D section 5 and Appendix B). **EOS Rio builds and services them; VS LLC remains accountable. Blocking — no Program Account funding before Exhibit D publication.** | E |
| 11 | **Counsel confirmation that section 9** of the standard Independent Contractor Agreement permits the pre-existing-IP carve-out and licence back by Schedule A. **Blocking — until confirmed, no Service or Embedded RFP may be published and no award may be contracted with a populated pre-existing-IP schedule** (Framework 23.3a) | Framework 23.3a; F |

## Review notes

Historical, financial, and technical background is preserved in **MSIG #5 — Review Notes**, a separate reference document published alongside this Resolution; it adds no rules or approvals.
