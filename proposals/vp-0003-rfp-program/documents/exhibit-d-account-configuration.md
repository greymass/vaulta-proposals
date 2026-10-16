# Program Account, Permission, and Register Configuration

**Exhibit D — Program Account, Permission, and Register Configuration**

**Version:** 2.4\
**Status:** Draft\
**Date:** [___]

Published by **Vaulta Stewardship LLC** under **MSIG #5 Part E**.

**VS LLC fills in the deployment details in this published Exhibit after deployment and before funding** (6.1). After members are appointed by separate MSIGs, it records their names, public keys, and delivery dates in **6.3**. These details need not be known when MSIG #5 is approved; member keys do not delay publication, but funding and permission activation wait for all five keys and the other **Framework 1.2** requirements. Retain dated published versions so later updates remain traceable.

---

This Exhibit specifies the deployed accounts, permissions, registers, and checks required by **MSIG #5 Part E**; complete **section 6** before funding.

- [1. Accounts and authorities](#1-accounts-and-authorities)
- [2. Payments and cancellation](#2-payments-and-cancellation)
- [3. Exchange-rate configuration](#3-exchange-rate-configuration)
- [4. Register configuration](#4-register-configuration)
- [5. Resources](#5-resources)
- [6. Deployment checklist and record](#6-deployment-checklist-and-record)
- [Appendix A — Worked rate examples](#appendix-a--worked-rate-examples)
- [Appendix B — RAM planning estimates](#appendix-b--ram-planning-estimates)

---

## 1. Accounts and authorities

### 1.1 Accounts

| Account | Purpose | Operating authority | Owner |
|---|---|---|---|
| **`rfp.vst`** | Holds program funds. | Committee payments require **4 of 5** signatures; no routine record-writing key. | **`eosio.prods`** |
| **`disc.vst`** | Holds disclosure, decision, and publication records, **not program funds**. | One named VS LLC writing permission; see 1.4. | **`eosio.prods`** |

| Item | Details |
|---|---|
| **Account** | **`rfp.vst`**, a subaccount of `vst`. |
| **Created by** | *(to confirm on deployment — creating account and transaction id)* |
| **Naming** | Block producers name the Program Account; any alternative to `rfp.vst` requires MSIG confirmation before funding. |
| **Control** | The parent name gives the VST **no control over program funds**; control follows the permissions below. |

### 1.2 Committee permission

| Setting | Value |
|---|---|
| Fund-transfer authority | *(to confirm on deployment — identify the actual permission and enforcement mechanism)* |
| Administrative cancellation authority | *(to confirm on deployment — identify a distinct route that cannot move funds)* |
| Weight per seated member | 1, five members, 5 units total |
| Fund transfers | **4 of 5** signatures |
| Administrative actions, including cancellation | **3 of 5** signatures |
| Owner permission | `eosio.prods` |
| Active permission | *(to confirm on deployment)* |

**A named permission has one threshold.** Record the actual permission hierarchy, action links, contract checks if used, and any code authority in **6.1**; do not assign both thresholds to one permission. The **three-signature administrative route must not satisfy fund-transfer authority**, directly or through a parent or delegated authority. Owner recovery and cancellation remain with block producers at the Threshold. Verify both routes under **2.6** before funding.

### 1.3 Block producer authority

Configure **`eosio.prods`** as owner for account and key recovery under **Framework 7.3**, and payment cancellation under **Framework 10.8**.

### 1.4 Register writing and upgrades

| Action | Authority | Limits |
|---|---|---|
| Write records | One named VS LLC permission *(to confirm on deployment)* | The contract accepts writes only from this permission, which has **no weight on `rfp.vst`** and cannot move funds. |
| Deploy or upgrade (`setcode` / `setabi`) | `disc.vst`’s owner permission, held by `eosio.prods`, at the Threshold | An **MSIG Resolution** is required, including for bug fixes and schema changes. Neither VS LLC, its writing key, nor the Committee may upgrade the contract. |

**Requirements for register-contract upgrades**

The following requirements apply when an MSIG proposal changes the contract on `disc.vst`. They protect existing records and specify what the proposal and the upgrade record must include.

| Requirement | Details |
|---|---|
| Preserve existing records | Do not rewrite, drop, renumber, or reinterpret existing rows. The replacement contract must read them under their existing schemas; new schema versions apply only to new rows (4.4 `sversion`). |
| Document the proposed change | Include the code hash to be deployed, a diff against the running contract, and confirmation that existing rows are unaffected. |
| Record the upgrade | Record every `setcode` on `disc.vst` in the decisions register as a Committee resolution with an external effect (Framework 7.6a). |

---

## 2. Payments and cancellation

### 2.1 Selected mechanism

**Not yet verified.** Record the selected delay mechanism and deployed configuration in **6.1 before publication and funding**.

Check native delay support on the target chain, and verify that Committee signers cannot execute payments before the full delay ends or bypass the objection rules in **Framework 10.7**.

### 2.2 Protocol-enforced delay

| Payment | Delay |
|---|---|
| Ordinary | **168 hours (7 days)** |
| Urgent | **72 hours (3 days)** |

**`delay_sec` is a transaction field, not a permission field.** If native delayed transactions are selected, record that field and the authority’s actual `waits` and weights, where used, and prove the configuration enforces **604,800 seconds** ordinarily and **259,200 seconds** for urgent payments. If another on-chain mechanism is needed, record its contract, actions, authorities, and execution checks. **The Committee must not be able to waive or bypass the delay.**

**Initial award payments must also remain blocked after the delay until the final objection count is published and permits execution under Framework 10.7.** A count of four or more must block execution throughout the cancellation and any MSIG-confirmation process. Later milestone and Program Cost payments have no objection banding but retain their delay and cancellation rights.

### 2.3 Held-multisignature fallback — conditional

This fallback is authorized **only if the protocol cannot enforce transaction delays** (MSIG #5 Part E); VS LLC must republish this Exhibit identifying the change before using it.

The Committee proposes the disbursement and keeps the proposal **unexecuted and publicly visible for the full delay window**. Execution must also wait for the **final objection count and clearance under Framework 10.7**; the two-business-day cancellation period never permits executing a blocked award payment.

| Requirement | Rule |
|---|---|
| **Publication** | Publish the proposal identifier with the award so anyone can monitor it. |
| **Block producer cancellation** | Record and verify the actual route that permits cancellation at the Threshold before execution. Do not assume a delayed-transaction cancellation action cancels an unexecuted multisignature proposal. |
| **Early execution** | Neither VS LLC nor the Committee may execute before the full window and required objection clearance. Publish how the selected fallback observes this restriction; it is **procedural**, not proof of an on-chain timelock. |

### 2.4 Urgent payments

Use the **72-hour** delay only after the urgency vote and reasons have been published under **Framework 10.4**.

### 2.5 Contract before payment

**VS LLC must sign the awardee’s agreement before any payment is proposed on-chain.** The platform must check this at proposal, and the cycle report must reconcile proposals against executed agreements; this is a procedural control, not a chain-enforced one.

### 2.6 Cancellation

| Who | Authority | When |
|---|---|---|
| **Block producers** | **`eosio.prods`**, through the owner-controlled route, at **15 of 21**. | Any payment during its delay window. |
| **Committee** | The separate administrative route, at **3 of 5**. | Before execution; mandatory cancellation follows **Framework 9.1 and 10.5–10.7**. |

For the selected mechanism, record the **exact cancellation action, parameters, and authorization** for each route in **6.1**. Use **`eosio::canceldelay`** only for an actual native delayed transaction where the target chain supports it and the canceling authority qualifies; an unexecuted multisignature proposal requires its own verified cancellation path.

**Rehearse both routes on testnet before funding.** Prove that **four members can authorize payment**, **three can cancel that payment but cannot transfer funds**, and **block producers can cancel at the Threshold**. Also prove that the full delay and final-count execution guard cannot be bypassed. A design that cannot demonstrate these properties **blocks funding and permission activation**; publish the limitation under **6.2 and MSIG #5 Part E**.

Apply the objection outcomes and cancellation duties in **Framework 10.5–10.7**, including the unavailable-signers procedure in **Framework 9.1**.

---

## 3. Exchange-rate configuration

### 3.1 Oracle settings and conversion

Confirm the oracle pair, precision, and both worked examples in **Appendix A** before publication (MSIG #5 Part E and Framework 13.4).

| | |
|---|---|
| **Oracle contract** | **`delphioracle`** |
| **Pair** | **`eosusd`** |
| **Table** | `datapoints`, scoped to the pair |
| **Field** | **`median`** |
| **`quoted_precision`** | **4** — the stored integer is in ten-thousandths of a dollar |
| **How the median is formed** | The median of the last **21 submissions** from qualified oracles. The window is 21 *submissions*, not one per oracle, so a high-frequency writer occupies more of it than a low-frequency one |
| **History** | **None.** 21 rows exist per pair and the oldest is overwritten on each submission. A rate read today cannot be re-read from the table later |

**A-units = ⌊ USD-cents × 10^6 ÷ median ⌋**, where one A-unit is 0.0001 A.

Use **integer arithmetic with truncation, never floating point**, throughout the payment path; the published amount and on-chain transfer must match exactly.

### 3.2 Fallback settings and conversion

Configure the fallback under **Framework 13.4** as follows; that section governs when it starts and when the oracle resumes.

| | |
|---|---|
| **Source** | **CoinMarketCap**, Vaulta (A), **CoinMarketCap ID 36462** |
| **Figure** | The **midpoint of the published daily high and low USD prices** |
| **Day** | The **UTC calendar day before the date of the read** |
| **Form** | An integer in millionths of a dollar: fallback = ⌊ (high + low) ÷ 2 × 10^6 ⌋, computed in exact decimal arithmetic from the published figures |
| **Oracle resumption check** | At least one new `eosusd` datapoint in every 24-hour period for **7 consecutive days**; retain the start and resumption records required by Framework 13.4 |

**A-units = ⌊ USD-cents × 10^8 ÷ fallback ⌋**.

Use **exact decimal arithmetic** to form the six-decimal fallback integer, then **integer division with truncation** for payment conversion.

### 3.3 Staleness and collar checks

| Check | Configured trigger |
|---|---|
| **Staleness** | Newest datapoint older than **24 hours** |
| **Collar** | Approval rate differs by more than **15%** from the previous payment’s rate under that award, or the award-decision rate for the first payment |

Apply **Framework 13.4** to triggered checks, including fallback use and Committee approval when required.

A readable oracle can return an old `median`; **record and publish the newest-datapoint timestamp with every approval**, even when neither check is triggered.

### 3.4 Source monitoring and alerts

Apply **Framework 13.4–13.4a** to source failure, payment suspension, exceptions, escalation, and source replacement. Configure the following monitoring independently of payment approvals:

| Monitoring | Requirement |
|---|---|
| **Operator and cadence** | **VS LLC, hourly**, independently of payment approvals. |
| **Checks** | Confirm that `delphioracle`’s `datapoints` table is readable, the **`eosusd` pair exists**, and the **code hash is unchanged**; a code-hash change is a warning, not itself a failure. |
| **Alerts** | Notify **VS LLC and the Chair simultaneously**. |
| **Publication** | The **Manager of record or Chair** records and publishes the failure on the Portal **within 1 business day of the alert**; the **5-business-day escalation clock starts from that record** (Framework 9.2 and 13.4a). |
| **No response** | If no record is published within 1 business day, VS LLC publishes the alert itself and notifies every member; VS LLC cannot make the Framework 9.2 submission. |

Alert on uncertainty; treat an unreadable table as a failure until a later check clears it, and **log cleared alerts rather than deleting them**.

### 3.5 Rate evidence

**Oracle reads.** Record the **oracle value, block number, transaction ID, and newest-datapoint timestamp** at every read; the table keeps no history.

**Fallback reads.** At every fallback read, record **the newest `eosusd` timestamp or the fact that the pair or contract could not be read; the CoinMarketCap date; the published high and low; the resulting integer; and a retrieval record of the figures**, instead of oracle value, block number, and transaction ID.

---

## 4. Register configuration

### 4.1 Account and contract

| | |
|---|---|
| **Account** | **`disc.vst`** |
| **Holds** | **No program funds or meaningful token balance**; records only |
| **Contract** | Append-only; one or more contracts with **three separate tables**: `disclosures`, `decisions`, and `publications` |
| **Built and serviced by** | **EOS Rio** builds and services the contract; **VS LLC remains accountable** under MSIG #5 Part E and must document the deployed configuration |
| **Source** | **VST-owned**, in a **VST-controlled repository**, licensed **Apache-2.0** |
| **ABI** | *(to confirm on deployment — published and matching the deployed code; reproduced at 6.1)* |
| **Code hash** | *(to confirm on deployment)* |

### 4.2 Shared record requirements

The contract must have **no modify action, erase action, or administrative editing path**; platform-only protection is insufficient. A correction must append a new row referencing the prior row’s transaction ID and stating a reason, without changing the prior row.

Store the **full record on-chain**; the Portal reads and renders it. Keep **no hash field**; no digest-specific serialization or test vectors are required.

Use the append-only correction mechanism in **this section**. Complete the screening and redaction required by **Framework 5.9, 6.3b, 7.6a, and 25.2 before writing**; minutes remain off-chain and program decision-makers remain identifiable.

**All three tables must be publicly readable through standard chain APIs**, without permission or dependence on the Portal.

### 4.3 Disclosures table

| Field | Contents |
|---|---|
| `filer` | The filer's on-chain account |
| `role` | Committee member and seat, Program Manager, Technical Reviewer, or other decision right |
| `qversion` | The **questionnaire version** the filing was made on, so a later version never reinterprets an earlier row |
| `filed_at` | Filing date |
| `answers` | The **coded answers to Parts 2 to 8** of the questionnaire (Framework 6.3a) |
| `text` | **The full public filing**, including the filer’s chosen public identity, organizations named in Part 5, connections, reasons, and explanations; **exclude legal identification collected privately by VS LLC** |
| `prior` | Transaction id of the row this one supersedes, where it is an update or correction |
| `reason` | Why, where `prior` is set |

Use questionnaire version **`VQ1`**, defined in **Disclosure Questionnaire — Version 1**, published alongside this Exhibit; store its pipe-delimited answer string unchanged in `answers`.

Preserve **`N` (None declared)** and **`X` (not answered)** as distinct codes. Apply the filing, signing, and screening requirements in **Framework 6.3a–6.3c**.

### 4.4 Decisions table

| Field | Contents |
|---|---|
| `kind` | `award` \| `milestone` \| `signature` \| `resolution` \| `termrec` \| `awardreview` |
| `ref` | RFP reference, award reference, proposal id, or minute reference |
| `sversion` | The **decisions-schema version** |
| `recorded_at` | Date |
| `parties` | Every person exercising a decision right, **by name and on-chain account** |
| `detail` | The kind-specific payload below |
| `body` | **The record in full** — the substance, not a reference to it |
| `prior` | Transaction id of the row this one supersedes |
| `reason` | Why, where `prior` is set |

**Payload by kind**

| Kind | Payload |
|---|---|
| **Award decision** | The **complete Framework 23.2 record**, including award shape, the applicable licence or Service handover and pre-existing-IP terms, milestone schedule or bounty substitute, vote counts and identities, reasons, and **oracle or fallback evidence under 3.5**, according to the source used |
| **Milestone approval** | Award reference, milestone, the **Manager of record and any Technical Reviewer by name and account**, amount, and rate evidence under **3.5**, according to the source used |
| **Payment signature** | The proposal, and **each signing member by name and account** |
| **Committee resolution with an external effect** | Terminations, recovery plans, strikes, engagements, and reserved-matter escalations, with vote counts |
| **Termination recommendation (`termrec`)** | The filing, grounds, linked milestone determination, filer’s name and account, awardee response, and outcome, including decline, deemed decline, or strike, under **Framework 7.6a and 11.10a** |
| **Post-award review (`awardreview`)** | The full review and any awardee response under **Framework 25.2**, screened before writing under **4.2** |

### 4.5 Publications table

Store program publications other than **minutes, proposals, and the backlog** here (Framework 7.6a).

| Field | Contents |
|---|---|
| `kind` | `rfp` \| `amendment` \| `qa` \| `objection` \| `ban` \| `seat` \| `vision` \| `cyclereport` \| `annualreview` |
| `ref` | RFP reference, award reference, seat, cycle, or the row this one amends or answers |
| `sversion` | Schema version |
| `published_at` | Date, and for an objection the **time**, which the Framework 10.6 count turns on |
| `parties` | Where the record names anyone acting in the program — a block producer objecting, a seat holder, a banned person — **by name and on-chain account** |
| `body` | The record in full |
| `prior` | Transaction id of the row this one supersedes or amends |
| `reason` | Why, where `prior` is set |

| Record | Requirement |
|---|---|
| **Objections** | Write each **as received**, with its time and signing block producer; write a closing row fixing the **count at the end of the delay window** (Framework 10.6), which determines the Framework 10.5 objection band. |
| **Amendments and ban liftings** | Use the append-only mechanism in **4.2**, retaining the original RFP and ban history. |
| **Questions and answers** | Apply the timing and anonymity requirements in **Framework 7.6a and 21.2**. |

---

## 5. Resources

| Resource | `rfp.vst` | `disc.vst` |
|---|---|---|
| **RAM at launch** | **64 KB** — holds a token balance and a permission, no tables | **16 MB** — see Appendix B. This is the one that grows |
| **CPU / NET** | Staked, sized for the payment cadence *(to confirm on deployment)* | Sized for routine writes *(to confirm on deployment)* |
| **Top-up trigger** | Free RAM below **16 KB**, or any failed resource check | Free RAM below **3 MB**, **or** below 12 months of projected growth, whichever comes first — **topped up without waiting to be asked** |

**The VST and VS LLC must provision and top up both accounts from Program Costs without waiting for a request**, including purchasing `disc.vst` RAM **before its first write**. VS LLC monitors resources **monthly** and reports them in the cycle report. Its operating work is paid from **Program Costs within the USD 40,000 cap** in MSIG #5 Part D. The Committee records this classification in the first cycle’s Program Cost schedule and revisits it only if the work changes.

Classify the **initial platform build, including both contracts on `disc.vst`**, under **Framework 15.2b**; the pre-Committee process is in **Program Administration Register, item 2.5**.

---

## 6. Deployment checklist and record

### 6.1 Checklist and evidence

**Deployment evidence — complete after deployment and before publication:**

- **D1 — Deployment record:** Fill every deployment-confirmation field: accounts and transaction IDs, permission names, CPU/NET, ABI and code hash, and writing authority.
- **D2 — Authority and delay design:** Record the selected mechanism, chain capability checks, permission hierarchy, action links, contract checks and code authority if used, transaction-delay fields, and exact cancellation actions and parameters.
- **D3 — Testnet first:** Verify the deployed ABI and all three table schemas, then rehearse **both cancellation routes** in **2.6** before mainnet.
- **D4 — Rejection tests:** Record tests proving that three members cannot transfer funds, payment cannot execute early, and an initial award payment cannot execute with an unpublished final count or four or more objections.
- **D5 — Execution tests:** Record a valid four-signature payment after the complete delay and, where applicable, final objection clearance; verify the urgent path and both cancellation routes. **Missing or failing proof blocks funding and activation.**
- Publish the completed Exhibit **before funding** (MSIG #5 Part E).

| | |
|---|---|
| `rfp.vst` creation transaction | [___] |
| Fund-transfer and administrative authority configuration transactions | [___] |
| Selected delay mechanism and target-chain capability evidence | [___] |
| Permission hierarchy, action links, contract/code authority, and exact cancellation parameters | [___] |
| Delay, three-signature transfer rejection, final-count guard, and urgent-path test evidence | [___] |
| `disc.vst` creation transaction | [___] |
| `disc.vst` `setcode` transaction and code hash | [___] |
| Published ABI | [___] |
| Testnet deployment reference | [___] |
| **Testnet rehearsal — three-signature Committee cancellation** (selected mechanism’s exact route) | [___] |
| **Testnet rehearsal — block producer cancellation at the Threshold** (selected mechanism’s exact route) | [___] |
| Date published | [___] |

### 6.2 Departures from the specification

If anything cannot be built as specified, VS LLC must publish the limitation and propose the nearest workable alternative here.

| Element | What was specified | What was built | Why | Proposed alternative |
|---|---|---|---|---|
| *(none recorded)* | | | | |

An empty table confirms that the deployment matches this specification.

### 6.3 Member-key register

**D6 — Member keys: Complete after appointments and before funding or permission activation.**

After each appointment MSIG executes, the member provides their public key to VS LLC. **VS LLC fills in the member’s name, public key, and delivery date in the table below in the published Exhibit D**, and updates it when keys are replaced or surrendered. Retain superseded keys in dated rows.

Configure the on-chain signing permissions on **`rfp.vst`** with the delivered keys; this table documents the configuration and does not itself grant signing authority. Key handling follows **Framework 7.4–7.5**; replacements use the owner permission.

This Exhibit may be published before member keys arrive, but funding and permission activation remain subject to **Framework 1.2**.

| Seat | Member | Public key | Delivered | Superseded |
|---|---|---|---|---|
| Core Development | [___] | [___] | [___] | — |
| Marketing | [___] | [___] | [___] | — |
| Business Development | [___] | [___] | [___] | — |
| General (At-Large) | [___] | [___] | [___] | — |
| Community | [___] | [___] | [___] | — |

---

## Appendix A — Worked rate examples

### A.1 Oracle calculation

| Step | Value |
|---|---|
| Oracle `median` as read | 766 |
| Actual price — `median` ÷ 10^4 | USD 0.0766 per A |
| Milestone amount | USD 10,000 — that is **1,000,000 USD-cents** |
| A-units = ⌊ USD-cents × 10^6 ÷ median ⌋ | ⌊ 1,000,000 × 10^6 ÷ 766 ⌋ = **1,305,483,028** |
| One A-unit | 0.0001 A |
| **A payable** | **130,548.3028 A** |

### A.2 Fallback calculation

| Step | Value |
|---|---|
| Published high, previous UTC day | USD 0.0781 |
| Published low, previous UTC day | USD 0.0752 |
| Midpoint — (high + low) ÷ 2 | USD 0.07665 per A |
| fallback = ⌊ 0.07665 × 10^6 ⌋ | **76,650** |
| Milestone amount | USD 10,000 — that is **1,000,000 USD-cents** |
| A-units = ⌊ USD-cents × 10^8 ÷ fallback ⌋ | ⌊ 1,000,000 × 10^8 ÷ 76,650 ⌋ = **1,304,631,441** |
| **A payable** | **130,463.1441 A** |

---

## Appendix B — RAM planning estimates

**Planning note.** Size RAM for permanent rows, including corrections; do not subtract superseded rows. The launch allocation, monitoring, and top-up requirements are in **section 5**.

Estimate an Antelope `multi_index` row as its serialized payload plus **112 bytes** of table overhead and **144 bytes per secondary index**; assume two secondary indexes for disclosures (filer and date) and decisions (kind and reference).

| Row | Payload, of which text | **Cost per row** |
|---|---|---|
| **Disclosure** | ~3,300 bytes — ~300 of fields and coded answers, **~3,000 of filing text** | **~3,700 bytes** |
| **Decision — award** | ~4,300 bytes, **~4,000 of decision record** | **~4,700 bytes** |
| **Decision — milestone approval** | ~5,300 bytes, **~5,000 of determination and Reviewer assessment** | **~5,700 bytes** |
| **Decision — payment signature** | ~400 bytes. No narrative — it records who signed what | **~870 bytes** |
| **Decision — resolution, termination recommendation, or post-award review** | ~2,300–4,300 bytes | **~2,700–4,700 bytes** |
| **Publication — RFP** | ~8,000 bytes | **~8,400 bytes** |
| **Publication — cycle report** | ~25,000 bytes; annual review ~30,000 | **~25,400 / ~30,400 bytes** |
| **Publication — vision statement** | ~5,000 bytes | **~5,400 bytes** |
| **Publication — Q&A, objection, ban, seat** | ~500–1,000 bytes | **~900–1,400 bytes** |

**Estimated annual rows:**

| Table | What generates rows | Rows a year |
|---|---|---|
| **Disclosures** | 13 or so filers — 5 members, the Manager pool, the Reviewer roster — filing on appointment, refiling annually, updating within 10 business days of any change, and updating before each member-Reviewer engagement begins. Plus new Managers and Reviewers joining | **~100** |
| **Decisions** | ~15 award decisions; ~60 milestone approvals; ~255 payment-signature rows; ~20 resolutions with an external effect; ~3 termination recommendations with their responses and outcomes; ~6 post-award reviews; plus corrections | **~365** |
| **Publications** | ~6 RFPs and their amendments; ~120 questions and answers; ~60 objections and their closing counts; a handful of bans and seat changes; ~5 vision statements; 4 cycle reports; 1 annual review | **~210** |

| | |
|---|---|
| **Estimated bytes per year** | **~1.5 MB** |
| **Contract code and ABI** | **~250 KB**, one-off |
| **Planning horizon** | The **16 MB** launch allocation in section 5 allows roughly **10 years** of rows at this cadence, with room for larger rows |

Update these estimates using actual row sizes and cadence, including filing and decision text.
