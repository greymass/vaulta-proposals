# Program Account, Permission, and Register Configuration

**Exhibit D — Program Account, Permission, and Register Configuration**

**Version:** 2.4\
**Status:** Draft\
**Date:** [___]

Published by **Vaulta Stewardship LLC** under **MSIG #5 Part E**.

Deployment details and member keys need not be known when MSIG #5 is approved. **VS LLC completes the deployment record under 6.1 and the member-key register under 6.3**, following their publication, funding, and permission-activation requirements and **Framework 1.2**. Retain dated published versions.

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

**A named permission has one threshold.** Record the actual permission hierarchy, action links, contract checks if used, and any code authority in **6.1**; do not assign both thresholds to one permission. The **three-signature administrative route must not satisfy fund-transfer authority**, directly or through a parent or delegated authority. Owner recovery and cancellation remain with block producers at the Threshold. Record both cancellation routes under **2.6**.

### 1.3 Block producer authority

Configure **`eosio.prods`** as owner for account and key recovery under **Framework 7.3**, and payment cancellation under **Framework 10.8**.

### 1.4 Register writing and upgrades

| Action | Authority | Limits |
|---|---|---|
| Write records | One named VS LLC permission *(to confirm on deployment)* | The contract accepts writes only from this permission, which has **no weight on `rfp.vst`** and cannot move funds. |
| Deploy or upgrade (`setcode` / `setabi`) | `disc.vst`’s owner permission, held by `eosio.prods`, at the Threshold | An **MSIG Resolution** is required, including for bug fixes and schema changes. Neither VS LLC, its writing key, nor the Committee may upgrade the contract. |

**Requirements for register-contract upgrades**

Any MSIG proposal to change the `disc.vst` contract must meet these requirements.

| Requirement | Details |
|---|---|
| Preserve existing records | Do not rewrite, drop, renumber, or reinterpret existing rows. The replacement contract must read them under their existing schemas; new schema versions apply only to new rows (4.4 `sversion`). |
| Document the proposed change | Include the code hash to be deployed, a diff against the running contract, and confirmation that existing rows are unaffected. |
| Record the upgrade | Record every `setcode` on `disc.vst` in the decisions register as a Committee resolution with an external effect (Framework 7.6a). |

---

## 2. Payments and cancellation

### 2.1 Selected mechanism

Use the **`eosio.msig` execution delay if available**; otherwise use the **held-multisignature fallback in 2.3**. VS LLC records the selected option and configuration in **6.1 before publication and funding**.

### 2.2 Payment delays

| Payment | Delay |
|---|---|
| Ordinary | **7 days** |
| Urgent | **3 days** |

With the `eosio.msig` delay, the timer starts when sufficient approvals are collected. Execution must wait until **both that timer and the publication-based delay window have ended**.

Under either option, **neither VS LLC nor the Committee may waive the wait**. Initial award payments also require a published final objection count and clearance under **Framework 10.7**; four or more objections prohibit execution throughout cancellation and any MSIG-confirmation process.

Later milestone and Program Cost payments retain their delay and cancellation rights, without objection banding.

### 2.3 Held-multisignature fallback

If the `eosio.msig` delay is unavailable, publish the proposal ID with the award. Committee members must **withhold approvals until the full delay window ends** and, for initial award payments, the published final objection count permits execution under **Framework 10.7**.

Before using the fallback, VS LLC must **republish Exhibit D**, recording the procedure and cancellation authorities in **6.1**.

### 2.4 Urgent payments

Use the **3-day urgent delay** only after publishing the Committee’s urgency vote and reasons, as required by **Framework 10.4**.

### 2.5 Contract before payment

**VS LLC must sign the awardee’s agreement before any payment is proposed on-chain.** The platform must check this before submission, and cycle reports must reconcile payment proposals with signed agreements.

### 2.6 Cancellation

Pending payment MSIGs may be cancelled through the following authorities. Committee cancellation is mandatory when required by the Framework’s objection rules.

| Who | Authority | When |
|---|---|---|
| **Block producers** | **`eosio.prods`**, through the owner-controlled route, at **15 of 21**. | Any payment during its delay window. |
| **Committee** | The separate administrative route, at **3 of 5**. | Before execution; mandatory cancellation follows **Framework 9.1 and 10.5–10.7**. |

Cancel pending proposals with **`eosio.msig::cancel`**. Before expiry, cancellation requires the **proposer account’s authority**. Record the proposer account, action parameters, and permissions for both cancellation routes in **6.1**.

The **3-signature cancellation route must not allow fund transfers**. Record any configuration limitations in **6.2**.

---

## 3. Exchange-rate configuration

### 3.1 Oracle settings and conversion

Before publication, confirm the pair, precision, and both worked examples in **Appendix A** (MSIG #5 Part E and Framework 13.4).

| Setting | Value |
|---|---|
| Oracle contract | `delphioracle` |
| Pair | `eosusd` |
| Table | `datapoints`, scoped to the pair |
| Field | `median` |
| `quoted_precision` | 4 — the stored integer is in ten-thousandths of a dollar |
| Median calculation | Median of the latest 21 submissions from qualified oracles; one oracle may contribute several submissions. |
| History | Only the latest 21 submissions are kept; each new submission replaces the oldest. Past rate readings cannot be retrieved from the table. |

**A-units = ⌊ USD-cents × 10^6 ÷ median ⌋**, where one A-unit is 0.0001 A.

Use **integer arithmetic with truncation, never floating point**; the published amount must match the on-chain transfer exactly.

### 3.2 Fallback settings and conversion

Use the following fallback settings; **Framework 13.4** governs when the fallback starts and the oracle resumes.

| Setting | Value |
|---|---|
| Source | CoinMarketCap, Vaulta (A), ID 36462 |
| Price | Midpoint of the published daily high and low USD prices |
| Day | UTC calendar day before the read |
| Stored value | Integer in millionths of a dollar |
| Oracle resumption | At least one new `eosusd` datapoint in every 24-hour period for **7 consecutive days**; retain the start and resumption records required by Framework 13.4. |

**fallback = ⌊ (high + low) ÷ 2 × 10^6 ⌋**, using the published figures and **exact decimal arithmetic**.

**A-units = ⌊ USD-cents × 10^8 ÷ fallback ⌋**, using **integer division with truncation**.

### 3.3 Staleness and collar checks

| Check | Configured trigger |
|---|---|
| **Staleness** | Newest datapoint older than **24 hours** |
| **Rate-change threshold (collar)** | Approval rate changes by more than **15%** from the previous payment’s rate under the same award, or the award-decision rate for the first payment |

Apply **Framework 13.4** to triggered checks, including fallback use and Committee approval when required.

A readable oracle can return an old `median`; **record and publish the newest-datapoint timestamp with every approval**, even when neither check is triggered.

### 3.4 Source monitoring and alerts

Apply **Framework 13.4–13.4a** to source failure, payment suspension, exceptions, escalation, and source replacement. Configure the following monitoring independently of payment approvals:

| Monitoring | Requirement |
|---|---|
| **Operator and cadence** | **VS LLC, hourly**. |
| **Checks** | Check that `delphioracle`’s `datapoints` table is readable, `eosusd` exists, and the code hash is unchanged; a changed hash triggers a warning, not a failure by itself. |
| **Alerts** | Notify **VS LLC and the Chair simultaneously**. |
| **Publication** | The **Manager of record or Chair** records and publishes the failure on the Portal **within 1 business day of the alert**; the **5-business-day escalation clock starts from that record** (Framework 9.2 and 13.4a). |
| **No response** | If no record is published within 1 business day, VS LLC publishes the alert itself and notifies every member; VS LLC cannot make the Framework 9.2 submission. |

Alert on uncertainty; treat an unreadable table as a failure until a later check clears it, and **log cleared alerts rather than deleting them**.

### 3.5 Rate evidence

Record the following evidence **at every read**:

| Source | Required evidence |
|---|---|
| Oracle | Oracle value, block number, transaction ID, and newest-datapoint timestamp |
| Fallback | Newest `eosusd` timestamp, or a record that the pair or contract could not be read; CoinMarketCap date; published high and low; resulting integer; and a retrieval record of the figures |

For fallback reads, use the fallback evidence **instead of the oracle value, block number, and transaction ID**.

---

## 4. Register configuration

### 4.1 Account and contract

| Setting | Value |
|---|---|
| Account | `disc.vst` |
| Holds | **No program funds or meaningful token balance**; records only |
| Contract | Append-only; one or more contracts with **three separate tables**: `disclosures`, `decisions`, and `publications` |
| Built and serviced by | EOS Rio builds and services the contract; **VS LLC remains accountable** under MSIG #5 Part E and must document the deployed configuration |
| Source | **VST-owned**, in a **VST-controlled repository**, licensed **Apache-2.0** |
| ABI | *(to confirm on deployment — published and matching the deployed code; reproduced at 6.1)* |
| Code hash | *(to confirm on deployment)* |

### 4.2 Shared record requirements

The contract must have **no modify action, erase action, or administrative editing path**; platform-only protection is insufficient. A correction must append a new row referencing the prior row’s transaction ID and stating a reason, without changing the prior row.

Store the **full record on-chain**; the Portal reads and renders it. Keep **no hash field**.

Screen and redact records **before writing**, under **Framework 5.9, 6.3b, 7.6a, and 25.2**; minutes stay off-chain and program decision-makers must remain identifiable.

**All three tables must be publicly readable through standard chain APIs**, without permission or dependence on the Portal.

### 4.3 Disclosures table

| Field | Contents |
|---|---|
| `filer` | The filer's on-chain account |
| `role` | Committee member and seat, Program Manager, Technical Reviewer, or other decision right |
| `qversion` | Questionnaire version used for the filing; later versions must not reinterpret earlier records |
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
| `body` | Full record, not a reference to it |
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
| `published_at` | Publication date; objections must also include the time used for counting under Framework 10.6 |
| `parties` | Where the record names anyone acting in the program — a block producer objecting, a seat holder, a banned person — **by name and on-chain account** |
| `body` | Full record, not a reference to it |
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

- **Provisioning:** The VST and VS LLC must provision and top up both accounts from Program Costs without waiting for a request. Purchase `disc.vst` RAM **before its first write**.
- **Monitoring:** VS LLC monitors resources **monthly** and reports them in the cycle report.
- **Operating costs:** Pay VS LLC’s operating work from **Program Costs within the USD 40,000 cap** in MSIG #5 Part D. The Committee records this classification in the first cycle’s Program Cost schedule and revisits it **only if the work changes**.

Classify the **initial platform build, including both contracts on `disc.vst`**, under **Framework 15.2b**; the pre-Committee process is in **Program Administration Register, item 2.5**.

---

## 6. Deployment checklist and record

### 6.1 Checklist and evidence

VS LLC must complete every deployment-confirmation field in this Exhibit and the record below **after deployment and before publication**, then publish the completed Exhibit **before funding** (MSIG #5 Part E).

| Record | Required details | Deployed value |
|---|---|---|
| Accounts | Account names and creation transaction IDs for `rfp.vst` and `disc.vst` | [___] |
| Authority setup | Fund-transfer and administrative authority configuration transaction IDs | [___] |
| Permissions | Fund-transfer, administrative, and active permission names; hierarchy, weights, thresholds, action links, contract checks if used, and any code authority | [___] |
| Writing authority | Named VS LLC permission for register writes | [___] |
| Payment mechanism | Selected option: `eosio.msig` delay or held-proposal fallback; identify the `eosio.msig` account and record the fallback procedure if used | [___] |
| Ordinary delay | 604,800 seconds (7 days) | [___] |
| Urgent delay | 259,200 seconds (3 days) | [___] |
| Execution timing | With the `eosio.msig` delay, record the proposed transaction’s `delay_sec` and how the earliest execution time is calculated from sufficient approvals; with the fallback, record how publication sets the earliest permitted execution time | [___] |
| Committee cancellation | Proposer account, three-signature cancellation authority, and exact cancellation actions and parameters | [___] |
| Block producer cancellation | Authority at the Threshold, and exact cancellation actions and parameters | [___] |
| Register contract | `disc.vst` `setcode` transaction and code hash | [___] |
| ABI | Published ABI matching the deployed code | [___] |
| Table schemas | Deployed schemas for `disclosures`, `decisions`, and `publications` | [___] |
| CPU / NET | Deployed resources for both accounts | [___] |
| Publication | Date published | [___] |

### 6.2 Departures from the specification

If anything cannot be built as specified, VS LLC must publish the limitation and propose the nearest workable alternative here.

| Element | What was specified | What was built | Why | Proposed alternative |
|---|---|---|---|---|
| *(none recorded)* | | | | |

An empty table confirms that the deployment matches this specification.

### 6.3 Member-key register

Exhibit D may be published before member keys arrive, but this register must be complete **before funding or permission activation**, along with the other **Framework 1.2** requirements.

After each appointment MSIG executes, the member provides their public key to VS LLC, which records their **name, public key, and delivery date in this table in the published Exhibit D**. Update it when keys are replaced or surrendered, retaining superseded keys in dated rows.

Configure `rfp.vst`’s on-chain signing permissions with the delivered keys; this table records the configuration and **does not grant signing authority**. Follow **Framework 7.4–7.5** for key handling; replacements use the owner permission.

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

| Row | Estimated payload | Estimated RAM per row |
|---|---|---|
| Disclosure | ~3,300 bytes — ~300 of fields and coded answers, ~3,000 of filing text | **~3,700 bytes** |
| Decision — award | ~4,300 bytes, ~4,000 of decision record | **~4,700 bytes** |
| Decision — milestone approval | ~5,300 bytes, ~5,000 of determination and Reviewer assessment | **~5,700 bytes** |
| Decision — payment signature | ~400 bytes. No narrative — it records who signed what | **~870 bytes** |
| Decision — resolution, termination recommendation, or post-award review | ~2,300–4,300 bytes | **~2,700–4,700 bytes** |
| Publication — RFP | ~8,000 bytes | **~8,400 bytes** |
| Publication — cycle report | ~25,000 bytes; annual review ~30,000 | **~25,400 / ~30,400 bytes** |
| Publication — vision statement | ~5,000 bytes | **~5,400 bytes** |
| Publication — Q&A, objection, ban, seat | ~500–1,000 bytes | **~900–1,400 bytes** |

**Estimated annual rows:**

| Table | What generates rows | Rows a year |
|---|---|---|
| Disclosures | 13 or so filers — 5 members, the Manager pool, the Reviewer roster — filing on appointment, refiling annually, updating within 10 business days of any change, and updating before each member-Reviewer engagement begins. Plus new Managers and Reviewers joining | **~100** |
| Decisions | ~15 award decisions; ~60 milestone approvals; ~255 payment-signature rows; ~20 resolutions with an external effect; ~3 termination recommendations with their responses and outcomes; ~6 post-award reviews; plus corrections | **~365** |
| Publications | ~6 RFPs and their amendments; ~120 questions and answers; ~60 objections and their closing counts; a handful of bans and seat changes; ~5 vision statements; 4 cycle reports; 1 annual review | **~210** |

| Measure | Estimate |
|---|---|
| Estimated bytes per year | **~1.5 MB** |
| Contract code and ABI | **~250 KB**, one-off |
| Planning horizon | The **16 MB** launch allocation in section 5 allows roughly **10 years** of rows at this cadence, with room for larger rows |

Update these estimates using actual row sizes and cadence, including filing and decision text.
