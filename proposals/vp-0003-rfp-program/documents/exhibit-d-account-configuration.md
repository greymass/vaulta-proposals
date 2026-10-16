# Program Account, Permission, and Register Configuration

- **Exhibit:** D to MSIG #5, Part E
- **Publisher:** Vaulta Stewardship LLC
- **Status:** Draft specification, v2.4
- **Date:** [___]

Before publication, fill values marked *(to confirm on deployment)* from the actual deployment. Record member keys in **section 2.2** as they arrive; funding and permission activation must wait for **all five keys and the other Framework 1.1 requirements**.

---

## Purpose

VS LLC must publish the deployed configuration in this Exhibit **before the Program Account is funded** (MSIG #5 Part E); MSIG #5 itself takes effect on execution under Part J.

| Account | Purpose | Operating authority | Owner |
|---|---|---|---|
| **`rfp.vst`** | Holds program funds. | Committee payments require **4 of 5** signatures; no routine record-writing key. | **`eosio.prods`** |
| **`disc.vst`** | Holds disclosure, decision, and publication records, **not program funds**. | One named VS LLC writing permission; see 8.5. | **`eosio.prods`** |

VS LLC must publish any limitation and propose the nearest workable alternative in **Part 9**; an empty departures table confirms that the deployment matches this specification.

---

## Part 1 — The Program Account

| Item | Requirement |
|---|---|
| **Account** | **`rfp.vst`**, a subaccount of `vst`. |
| **Created by** | *(to confirm on deployment — creating account and transaction id)* |
| **Naming** | The `vst` name was secured, so no alternative was needed; any alternative requires MSIG confirmation before funding. Block producers name the funds account. |
| **Control** | The parent name gives the VST **no control over program funds**; control follows the permissions below. |

---

## Part 2 — The Committee Permission

### 2.1 Structure

| Setting | Value |
|---|---|
| Permission name | **`committee`** *(to confirm on deployment)* |
| Parent permission | `active` |
| Weight per seated member | **1**, five members, **5 units total** |
| **Threshold to move funds** | **4** of 5 |
| **Threshold for administrative actions that move no funds**, including cancelling a payment | **3** of 5 |
| Owner permission | **`eosio.prods`** |
| Active permission | *(to confirm on deployment — see 2.3)* |
| Delay, ordinary payment | **168 hours (7 days)** |
| Delay, urgent payment | **72 hours (3 days)** |

### 2.2 Authorized keys

Configure the permission with each member’s delivered public key. **Do not fund the Program Account or activate the permission** until all five seats are filled and every member has signed their engagement contract, filed the on-chain disclosure questionnaire, and delivered a signing key (Framework 1.1 and MSIG #5 Part B); pay and signing weight also depend on completion of those requirements.

**Publication of this Exhibit does not wait for member keys.** VS LLC updates the register as keys arrive, are replaced after loss or compromise, or are surrendered on removal or replacement (Framework 7.4 and 7.5).

| Seat | Member | Public key | Delivered | Superseded |
|---|---|---|---|---|
| Core Development | [___] | [___] | [___] | — |
| Marketing | [___] | [___] | [___] | — |
| Business Development | [___] | [___] | [___] | — |
| General (At-Large) | [___] | [___] | [___] | — |
| Community | [___] | [___] | [___] | — |

Keep superseded keys in dated rows rather than overwriting them, so historical signatures remain verifiable.

**Keys are personal:** members must not share or delegate them, let an employer hold them, or sign for another member, including a recused member. Register keys on appointment and surrender them on removal or replacement; authorized month-to-month continuation under Framework 3.3 does not require surrender.

**Loss or compromise:** notify the Chair and block producers immediately and stop signing until the key is replaced through the owner permission; the Committee must propose no payments until replacement (Framework 7.5).

### 2.3 Actions by threshold

| Threshold | Actions |
|---|---|
| **4 of 5** | Any transfer from `rfp.vst`: award disbursements, milestone payments, Program Cost payments under the published schedule |
| **3 of 5** | Cancelling a proposed payment during its delay window; other actions that move no funds |

Cancellation is mandatory within **2 business days** when objections fall in the bands requiring cancellation (Framework 10.7 and Part 4).

### 2.4 Block producer authority

Through **`eosio.prods`** and the owner permission, block producers may replace removed members’ keys, rebuild the permission, recover the account, and cancel any payment during its delay window **at the Threshold**.

---

## Part 3 — The delay mechanism

### 3.1 Selected mechanism

This Exhibit must identify the mechanism before funding (MSIG #5 Part E).

| | |
|---|---|
| **Mechanism in use** | ☑ **Protocol-enforced transaction delay** ☐ ~~Held multisignature proposal (fallback)~~ |
| **Determination** | **Transaction-level delays are available on the current protocol version.** The chain enforces the wait; no party to the payment can shorten it |

### 3.2 Protocol-enforced delay

The permission’s `delay_sec` is **604,800 seconds** for ordinary payments and **259,200 seconds** for urgent payments; transactions cannot execute before the delay ends, and **the Committee cannot waive it**.

### 3.3 Held-multisignature fallback — not in use

This fallback is authorized **only if the protocol cannot enforce transaction delays** (MSIG #5 Part E); VS LLC must republish this Exhibit identifying the change before using it.

The Committee proposes the disbursement and keeps the proposal **unexecuted and publicly visible for the full delay window** before execution.

| Requirement | Rule |
|---|---|
| **Publication** | Publish the proposal identifier with the award so anyone can monitor it. |
| **Block producer cancellation** | Through the owner permission, as above. |
| **Early execution** | VS LLC must not execute the proposal before the full window ends. |

### 3.4 Urgent payments

The **72-hour** delay requires an urgency vote at the award threshold — **two-thirds of filled, non-recused seats, minimum 3** — with reasons recorded and publication **completed before the payment is proposed**.

### 3.5 Contract before payment

**VS LLC must sign the awardee’s agreement before any payment is proposed on-chain.** The platform must check this at proposal, and the cycle report must reconcile proposals against executed agreements; this is a procedural control, not a chain-enforced one.

---

## Part 4 — The cancellation path

| Who | Authority | When |
|---|---|---|
| **Block producers** | **`eosio.prods`**, through `rfp.vst@owner`, at **15 of 21**. | Any payment during its delay window. |
| **Committee** | `rfp.vst@committee`, at **3 of 5**. | Before execution; **mandatory within 2 business days** when objections close at **4–6 or 7 or more**. |

Under the selected protocol delay, cancel a pending transaction with **`eosio::canceldelay`**, supplying the **canceling authority** and delayed transaction’s **`trx_id`**.

The canceling authority must authorize the delayed transaction; `rfp.vst@committee` does so directly, while `rfp.vst@owner` satisfies it through the account’s permission hierarchy.

**Rehearse both routes on testnet before funding** and record both transaction IDs in **Part 10**, verifying the deployed permission names, thresholds, and parameters.

**Objection bands apply only to the initial award disbursement.** Milestone and Program Cost payments still have delays and cancellation rights, but no objection bands.

| Objections | Result |
|---|---|
| **0–3** | Payment proceeds when the delay ends. |
| **4–6** | Committee cancels; the award proceeds only if MSIG confirms it. |
| **7 or more** | Committee cancels and the award ends; no MSIG confirmation vote is held. |

Failure to make a mandatory cancellation is grounds for referral to MSIG for removal; block producers may cancel through the owner permission.

---

## Part 5 — Account resources

| Resource | `rfp.vst` | `disc.vst` |
|---|---|---|
| **RAM at launch** | **64 KB** — holds a token balance and a permission, no tables | **16 MB** — see Part 8.6. This is the one that grows |
| **CPU / NET** | Staked, sized for the payment cadence *(to confirm on deployment)* | Sized for routine writes *(to confirm on deployment)* |
| **Who provisions** | **The VST and VS LLC**, as administrators of the program, from Program Costs | **The VST and VS LLC**, as administrators of the program, from Program Costs |
| **Who monitors, and how often** | **VS LLC, monthly**, reported in the cycle report | **VS LLC, monthly**, reported in the cycle report |
| **Top-up trigger** | Free RAM below **16 KB**, or any failed resource check | Free RAM below **3 MB**, **or** below 12 months of projected growth, whichever comes first — **topped up without waiting to be asked** |

**The VST and VS LLC must provision and top up both accounts without waiting for a request.** VS LLC performs the operating work and is paid from **Program Costs within the USD 40,000 cap** in MSIG #5 Part D, rather than through an award. The Committee records this classification when approving the first cycle’s Program Cost schedule and revisits it only if the work changes (Framework 15.2b).

The **initial platform build**, including both contracts on `disc.vst`, is a **Core Development award** under Framework 15.2b, counts against the **Cycle Ceiling**, and must be **flagged self-referential** in the cycle report; it is outside Program Costs and the USD 40,000 cap. The pre-Committee process is described in **Program Administration Register, item 2.5**.

---

## Part 6 — The reference rate

Confirm the oracle pair, precision, and both worked examples before publication (MSIG #5 Part E and Framework 13.4).

| | |
|---|---|
| **Oracle contract** | **`delphioracle`** |
| **Pair** | **`eosusd`** |
| **Table** | `datapoints`, scoped to the pair |
| **Field** | **`median`** |
| **`quoted_precision`** | **4** — the stored integer is in ten-thousandths of a dollar |
| **How the median is formed** | The median of the last **21 submissions** from qualified oracles. The window is 21 *submissions*, not one per oracle, so a high-frequency writer occupies more of it than a low-frequency one |
| **History** | **None.** 21 rows exist per pair and the oldest is overwritten on each submission. A rate read today cannot be re-read from the table later |

### 6.1 Oracle calculation example

| Step | Value |
|---|---|
| Oracle `median` as read | 766 |
| Actual price — `median` ÷ 10^4 | USD 0.0766 per A |
| Milestone amount | USD 10,000 — that is **1,000,000 USD-cents** |
| A-units = ⌊ USD-cents × 10^6 ÷ median ⌋ | ⌊ 1,000,000 × 10^6 ÷ 766 ⌋ = **1,305,483,028** |
| One A-unit | 0.0001 A |
| **A payable** | **130,548.3028 A** |

Use **integer arithmetic with truncation, never floating point**, throughout the payment path; the published amount and on-chain transfer must match exactly.

### 6.2 Evidence for every oracle read

Record the **oracle value, block number, transaction ID, and newest-datapoint timestamp** at every read; the table keeps no history.

### 6.3 Staleness and collar checks

| Check | Trigger | Effect |
|---|---|---|
| **Staleness** | Newest datapoint older than **24 hours** | The rate moves to the **fallback rate** in 6.5. Only where the fallback is also unavailable does the matter go to the Committee, which may approve at the ordinary milestone threshold with the staleness recorded, or defer |
| **Collar** | Approval rate differs by more than **15%** from the rate at the previous payment under that award, or from the award decision rate for the first payment | Same — Committee, not Manager alone |

A readable oracle can return an old `median`; **record and publish the newest-datapoint timestamp with every approval**, even when neither check is triggered.

### 6.4 Missing pair or contract

Use the **fallback rate in 6.5** if the pair or oracle contract disappears; if the fallback is also unavailable, **suspend payments and new awards**, except **Portal hosting and essential administration**. This differs from a stale but readable oracle, which follows the Committee approval route in 6.3.

In either case of a missing source, the Committee must escalate to MSIG within **5 business days of the failure being recorded and published** to designate a replacement (Framework 13.4a); **the Committee cannot choose its own replacement source**.

| Monitoring | Requirement |
|---|---|
| **Operator and cadence** | **VS LLC, hourly**, independently of payment approvals. |
| **Checks** | Confirm that `delphioracle`’s `datapoints` table is readable, the **`eosusd` pair exists**, and the **code hash is unchanged**; a code-hash change is a warning, not itself a failure. |
| **Alerts** | Notify **VS LLC and the Chair simultaneously**. |
| **Publication** | The **Manager of record or Chair** records and publishes the failure on the Portal **within 1 business day of the alert**; the **5-business-day escalation clock starts from that record** (Framework 9.2 and 13.4a). |
| **No response** | If no record is published within 1 business day, VS LLC publishes the alert itself and notifies every member; VS LLC cannot make the Framework 9.2 submission. |

Alert on uncertainty; treat an unreadable table as a failure until a later check clears it, and **log cleared alerts rather than deleting them**.

### 6.5 Fallback rate

**Framework 13.4** sets the fallback for an `eosusd` datapoint more than **24 hours** old, or a pair or `delphioracle` contract that is unavailable, renamed, or deprecated.

| | |
|---|---|
| **Source** | **CoinMarketCap**, Vaulta (A), **CoinMarketCap ID 36462** |
| **Figure** | The **midpoint of the published daily high and low USD prices** |
| **Day** | The **UTC calendar day before the date of the read** |
| **Form** | An integer in millionths of a dollar: fallback = ⌊ (high + low) ÷ 2 × 10^6 ⌋, computed in exact decimal arithmetic from the published figures |
| **How long it applies** | To every read until the `eosusd` pair has received at least one new datapoint in every 24-hour period for **7 consecutive days**. The Chair records and publishes the day it began and the day the oracle resumed |

**Worked example:**

| Step | Value |
|---|---|
| Published high, previous UTC day | USD 0.0781 |
| Published low, previous UTC day | USD 0.0752 |
| Midpoint — (high + low) ÷ 2 | USD 0.07665 per A |
| fallback = ⌊ 0.07665 × 10^6 ⌋ | **76,650** |
| Milestone amount | USD 10,000 — that is **1,000,000 USD-cents** |
| A-units = ⌊ USD-cents × 10^8 ÷ fallback ⌋ | ⌊ 1,000,000 × 10^8 ÷ 76,650 ⌋ = **1,304,631,441** |
| **A payable** | **130,463.1441 A** |

Use **exact decimal arithmetic** to form the six-decimal fallback integer, then **integer division with truncation** for payment conversion.

At every fallback read, record **the newest `eosusd` timestamp or the fact that the pair or contract could not be read; the CoinMarketCap date; the published high and low; the resulting integer; and a retrieval record of the figures**, instead of oracle value, block number, and transaction ID.

---

## Part 7 — The disclosure register on `disc.vst`

### 7.1 Account and contract

| | |
|---|---|
| **Account** | **`disc.vst`** |
| **Holds** | **No program funds or meaningful token balance**; records only |
| **Contract** | Append-only; one or more contracts with **three separate tables**: `disclosures`, `decisions`, and `publications` |
| **Built and serviced by** | **EOS Rio** builds and services the contract; **VS LLC remains accountable** under MSIG #5 Part E and must document the deployed configuration |
| **Source** | **VST-owned**, in a **VST-controlled repository**, licensed **Apache-2.0** |
| **ABI** | *(to confirm on deployment — published and matching the deployed code; reproduced at Part 10)* |
| **Code hash** | *(to confirm on deployment)* |

### 7.2 Append-only contract

The contract must have **no modify action, erase action, or administrative editing path**; platform-only protection is insufficient. A correction must append a new row referencing the prior row’s transaction ID and stating a reason, without changing the prior row.

### 7.3 Disclosure schema

| Field | Contents |
|---|---|
| `filer` | The filer's on-chain account |
| `role` | Committee member and seat, Program Manager, Technical Reviewer, or other decision right |
| `qversion` | The **questionnaire version** the filing was made on, so a later version never reinterprets an earlier row |
| `filed_at` | Filing date |
| `answers` | The **coded answers to Parts 2 to 8** of the questionnaire (Framework 6.3a) |
| `text` | **The full text of the filing** — organizations named in Part 5, the nature of each connection, and every reason and explanation given |
| `prior` | Transaction id of the row this one supersedes, where it is an update or correction |
| `reason` | Why, where `prior` is set |

Use questionnaire version **`VQ1`**, defined in **Disclosure Questionnaire — Version 1**, published alongside this Exhibit; store its pipe-delimited answer string unchanged in `answers`.

**Parts 2–8 require an explicit answer, including “None” where applicable.** Codes must distinguish **`N` (None declared)** from **`X` (not answered)**; blanks or any `X` mean the questionnaire is **unfiled** for Framework 6.3c.

Report positions as **bands, not exact figures**; do not name third parties beyond the organizations in Part 5. **The filer signs their submission; VS LLC writes it without altering its content.**

---

## Part 8 — The decisions register on `disc.vst`

### 8.1 Decision schema

| Field | Contents |
|---|---|
| `kind` | `award` \| `milestone` \| `signature` \| `resolution` |
| `ref` | RFP reference, award reference, proposal id, or minute reference |
| `sversion` | The **decisions-schema version** |
| `recorded_at` | Date |
| `parties` | Every person exercising a decision right, **by name and on-chain account** |
| `detail` | The kind-specific payload at 8.2 |
| `body` | **The record in full** — the substance, not a reference to it |
| `prior` | Transaction id of the row this one supersedes |
| `reason` | Why, where `prior` is set |

### 8.2 Payload by kind

| Kind | Payload |
|---|---|
| **Award decision** | RFP reference, awardee, USD amount, vote counts, and members voting for, against, and recused **by name and account** |
| **Milestone approval** | Award reference, milestone, the **Manager of record and any Technical Reviewer by name and account**, amount, and rate evidence under **6.2 or 6.5**, according to the source used |
| **Payment signature** | The proposal, and **each signing member by name and account** |
| **Committee resolution with an external effect** | Terminations, recovery plans, strikes, engagements, and reserved-matter escalations, with vote counts |

### 8.3 Full records, not hashes

Store the **full record on-chain**; the Portal reads and renders it. Keep **no hash field**; no digest-specific serialization or test vectors are required.

### 8.4 Corrections and redaction

Correct records by **appending a new row referencing the prior row and stating a reason**; prior rows remain unchanged, with **no editing, deletion, or redaction path**.

Complete all required screening and redaction **before writing**:

| | |
|---|---|
| **Minutes stay off the register** | Keep minutes on the **Portal**, subject to redaction for pre-award confidential proposal content, legal advice, and personal data (Framework 5.9); put the **resolution**, not deliberations, in the register |
| **Records with a redaction step complete it first** | Complete the awardee’s redaction process under Framework 25.2 before recording a post-award review **as redacted**; apply the same order to any other record with a redaction right |
| **Disclosures are screened before writing** | VS LLC must return filings naming an individual or giving exact figures where bands were requested (Framework 6.3b); screening is **mechanical, not a review of substance** |

The **name, role, seat, and on-chain account of anyone exercising a decision right** are not covered by the personal-data redaction ground and remain in the record (Framework 5.9).

### 8.5 Authorities

| Authority | Who | Notes |
|---|---|---|
| **Write** | A **single named VS LLC permission** — *(to confirm on deployment)* — with **no weight on `rfp.vst`**. The contract rejects writes from any other authority | This key writes records. It cannot move money |
| **Deploy and upgrade (`setcode` / `setabi`)** | **`eosio.prods`**, at the Threshold — the owner permission of `disc.vst`. **Not** the writing key, and **not** VS LLC | Separating them means a compromised writing key cannot replace the contract |

Contract bug fixes and schema changes require **an MSIG Resolution**; neither VS LLC nor the Committee may change the register contract.

| | |
|---|---|
| **What an upgrade may not do** | Rewrite, drop, renumber, or reinterpret any existing row. A replacement contract must read the existing tables under their existing schema; where a schema changes, the new shape is a **new schema version** (8.1 `sversion`) applied to new rows only |
| **What a proposal must carry** | The code hash being deployed, a diff against the running contract, and a statement of how existing rows are affected — which, if the rule above is honoured, is *not at all* |
| **Recorded** | Every `setcode` on `disc.vst` is written to the decisions register as a Committee resolution with an external effect (7.6a), so the register records its own upgrades |

### 8.6 RAM and growth

Every filing, correction, decision, signature, and publication remains on-chain; **do not assume deletion or subtract superseded rows from growth estimates**.

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
| **RAM provisioned at launch** | **16 MB** — the code plus roughly **10 years** of rows at this cadence, with room for rows that turn out larger than modelled |
| **Who buys it and tops it up** | **The VST and VS LLC**, as administrator of the program, funded from Program Costs. **The initial purchase is theirs**, made before the first write; so is every top-up after it |
| **Top-up trigger** | Free RAM below **3 MB**, **or** below 12 months of projected growth, whichever comes first. **Topped up without waiting to be asked**, and reported monthly |

These are planning estimates; update them using actual row sizes and cadence. Longer filing and decision text increases growth; the **top-up trigger applies before RAM is exhausted**.

### 8.6a The `publications` table

Store program publications other than **minutes, proposals, and the backlog** here (Framework 7.6a).

| Field | Contents |
|---|---|
| `kind` | `rfp` \| `amendment` \| `qa` \| `objection` \| `ban` \| `seat` \| `vision` \| `cyclereport` \| `annualreview` |
| `ref` | RFP reference, award reference, seat, cycle, or the row this one amends or answers |
| `sversion` | Schema version |
| `published_at` | Date, and for an objection the **time**, which the 10.6 count turns on |
| `parties` | Where the record names anyone acting in the program — a block producer objecting, a seat holder, a banned person — **by name and on-chain account** |
| `body` | The record in full |
| `prior` | Transaction id of the row this one supersedes or amends |
| `reason` | Why, where `prior` is set |

| Record | Requirement |
|---|---|
| **Objections** | Write each **as received**, with its time and signing block producer; write a closing row fixing the **count at the end of the delay window** (Framework 10.6), which determines the 10.5 objection band. |
| **Amendments and ban liftings** | Append alongside the original row, never replace it; retain the earlier RFP text and ban history. |
| **Questions and answers** | Write **within 2 business days of the answer**, without naming the questioner (Framework 21.2). |

### 8.7 Public read access

**All three tables must be publicly readable through standard chain APIs**, without permission or dependence on the Portal.

### 8.8 Before mainnet

Deploy to **testnet first**, verify the deployed ABI and schemas, and rehearse **both cancellation routes** in Part 4.

---

## Part 9 — Departures from the specification

If anything cannot be built as specified, VS LLC must publish the limitation and propose the nearest workable alternative here (MSIG #5 Part E).

| Element | What was specified | What was built | Why | Proposed alternative |
|---|---|---|---|---|
| *(none recorded)* | | | | |

An empty table confirms that everything was built as specified.

---

## Part 10 — Deployment record

*(to confirm on deployment — complete immediately before publication)*

| | |
|---|---|
| `rfp.vst` creation transaction | [___] |
| `committee` permission transaction | [___] |
| `disc.vst` creation transaction | [___] |
| `disc.vst` `setcode` transaction and code hash | [___] |
| Published ABI | [___] |
| Testnet deployment reference | [___] |
| **Testnet rehearsal — Committee cancellation** (`canceldelay` at `rfp.vst@committee`) | [___] |
| **Testnet rehearsal — block producer cancellation** (`canceldelay` at `rfp.vst@owner`) | [___] |
| Date published | [___] |

---

## Still to settle

| # | Item | Blocking? |
|---|---|---|
| D1 | Complete every deployment-confirmation field except member keys: accounts and transaction IDs, permission names, CPU/NET, ABI and code hash, writing authority, and both cancellation rehearsals in Part 10. | **Yes** — publish this Exhibit with a completed deployment record **before funding** (MSIG #5 Part E). |
| D6 | Record all **five member public keys** in 2.2 as they arrive. | Does **not** delay publication; **funding and permission activation wait for all five keys** and the other Framework 1.1 conditions. |
