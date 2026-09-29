# Program Account, Permission, and Register Configuration

**Exhibit D to MSIG #5**
**Published by Vaulta Stewardship LLC under MSIG #5 Part E**
**Status: DRAFT v2.3 — specification. Values marked *(to confirm on deployment)* are filled from what is actually deployed before publication; the member keys at 2.2 are recorded as they arrive**
**Date: [___]**

---

## What this is, and what publishing it does

MSIG #5 Part E directs VS LLC to develop and configure the Program Account and the Committee Permission, and to **publish that configuration as this Exhibit before the Program Account is funded**. Part J makes the same point from the other side: the MSIG takes effect on execution, but **no money arrives until this document is published**.

So this is not a design note. It is the thing block producers look at to decide whether what was built matches what they voted for, and it is a funding gate.

**Two accounts, and why they are separate.**

| Account | Holds | Written by | Owner permission |
|---|---|---|---|
| **`rfp.vst`** | Program funds | Nobody routinely. Payments are proposed and signed by the Committee at 4 of 5 | **`eosio.prods`** |
| **`disc.vst`** | The disclosure, decisions and publications registers. **No program funds** | A single named VS LLC permission, routinely | **`eosio.prods`** — see 8.5 |

Keeping them apart is the point. The disclosure and decision registers are written constantly; the funds account should have no routine writing key on it at all. A single account would mean a key that writes records is a key that lives next to money.

**Where VS LLC cannot build as described**, Part E directs it to say so and propose the nearest workable alternative rather than proceed on an assumption. Part 9 of this Exhibit is where any such departure is recorded. An empty Part 9 is a statement that nothing departed.

---

## Part 1 — The Program Account

| | |
|---|---|
| **Account name** | **`rfp.vst`**, a subaccount of `vst` |
| **Created by** | *(to confirm on deployment — creating account and transaction id)* |
| **Contingency** | Spent. The `vst` name was secured, so no alternative name was needed. Had one been, it would have required MSIG confirmation before funding: the account holding program funds is named by block producers, not by whoever publishes this configuration |
| **What the name confers** | **Nothing.** Under Antelope a parent account has no standing control over a subaccount once created. `rfp.vst` reads as belonging to the VST; the VST cannot move program funds. The permissions below govern |

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

The permission is configured with the **public key delivered by each member**, and is **activated only once all five are delivered**. Delivering a key and activating the permission are separate steps, and Framework 1.1 adds two more conditions on top: every member must also have signed their engagement contract and filed the disclosure questionnaire on-chain before pay and signing weight begin.

**Keys are recorded after the fact, and this Exhibit does not wait for them.** The register below is maintained by **VS LLC as administrator of the program** and updated as each key arrives — on first delivery, on replacement after loss or compromise (Framework 7.5), and on surrender when a member is removed or replaced (7.4). **Publication of this Exhibit is not held for it**, because the gate that matters sits elsewhere: the Program Account is not funded and the permission is not activated until all five keys are in, all five seats are filled, and every member has contracted and filed (Framework 1.1, MSIG #5 Part B). Holding the configuration back would delay the deployment without moving that gate by a day.

| Seat | Member | Public key | Delivered | Superseded |
|---|---|---|---|---|
| Core Development | [___] | [___] | [___] | — |
| Marketing | [___] | [___] | [___] | — |
| Business Development | [___] | [___] | [___] | — |
| General (At-Large) | [___] | [___] | [___] | — |
| Community | [___] | [___] | [___] | — |

*A replaced key is not overwritten. The superseded row is dated and kept, so that any historical signature can be checked against the key that was authorized when it was made.*

**Keys are personal** (Framework 7.4). No member may share, delegate, or let an employer hold their key, and no member may sign for another, including a recused one. Keys are registered on appointment and surrendered on removal or replacement — but not during authorized month-to-month continuation under Framework 3.3.

**On loss or compromise** (Framework 7.5), the member tells the Chair and block producers immediately and does not sign until the key is replaced. The Committee proposes no payments in the meantime. Replacement runs through the owner permission.

### 2.3 What the two thresholds cover

| Threshold | Actions |
|---|---|
| **4 of 5** | Any transfer from `rfp.vst`: award disbursements, milestone payments, Program Cost payments under the published schedule |
| **3 of 5** | Cancelling a proposed payment during its delay window; other actions that move no funds |

**The asymmetry is deliberate.** Stopping a payment should be easier than making one. A Committee that has to find four signatures to cancel in the 4-to-6 objection band could be held hostage by a single absent member, and Framework 10.7 makes that cancellation mandatory within 2 business days.

### 2.4 What block producers keep

Because the owner permission stays with `eosio.prods`, block producers can **replace a removed member's key, rebuild the permission, or recover the account** — and can cancel any payment during its delay window at the Threshold, whatever kind it is.

---

## Part 3 — The delay mechanism

### 3.1 Which mechanism is in use

**MSIG #5 Part E requires this Exhibit to state which of two mechanisms is in use, and the Program Account is not funded until it does.**

| | |
|---|---|
| **Mechanism in use** | ☑ **Protocol-enforced transaction delay** ☐ ~~Held multisignature proposal (fallback)~~ |
| **Determination** | **Transaction-level delays are available on the current protocol version.** The chain enforces the wait; no party to the payment can shorten it |

### 3.2 The mechanism in use

The `delay_sec` on the permission is **604,800** seconds for an ordinary payment and **259,200** for an urgent one. The transaction cannot execute before the delay elapses, and **no Committee action waives it** — the wait is a property of the chain, not a policy the Committee administers.

This is the intended design rather than the fallback, and the difference matters to what block producers were promised. Under a protocol delay the window is **enforced**; under the fallback it would only have been **observed**, with the proposer trusted not to execute early. Framework 8.5 lists the delay window as one of the controls that replaced the usual separation between the body that decides and the body that pays. It is now an actual control.

### 3.3 The fallback — recorded, not in use

**This is not in use.** It is kept because MSIG #5 Part E contemplates it, and because a later protocol change that removed transaction delays would need a documented path rather than an improvised one. If that ever happens, VS LLC republishes this Exhibit stating the change before relying on it.

Under the fallback the Committee proposes the disbursement; the proposal remains **unexecuted and publicly visible for the full window**; only then is it executed.

| | |
|---|---|
| **What is published with the award** | The **proposal identifier**, so anyone can watch the unexecuted proposal for the full window |
| **Block producer route** | Cancellation through the **owner permission**, unchanged |
| **What VS LLC must not do** | Execute early. The fallback's whole value is that the window is observable, and a window that can be cut short by the proposer is not a window |

### 3.4 The urgent window

The 72-hour delay may be used **only** where the Committee has voted to declare urgency at the award threshold — two-thirds of filled non-recused seats, minimum 3 — recorded the reason, and **completed publication before proposing the payment**. The shorter window has to be a real opportunity to object, which it is not if publication and proposal happen together.

### 3.5 Contract before payment

**No payment may be proposed on-chain before VS LLC has signed the agreement with the awardee.** This is a procedural control on VS LLC, not a chain-enforced one; the platform enforces it at the proposal step and the cycle report reconciles proposals against executed agreements.

---

## Part 4 — The cancellation path

**The exact action and authority required to use it**, which MSIG #5 Part E requires this Exhibit to state.

| Who | Action | Authority | When |
|---|---|---|---|
| **Block producers** | Cancel the pending payment | **`eosio.prods`** through the owner permission of `rfp.vst` | Any time during the delay window, at 15 of 21 |
| **The Committee** | Cancel the pending payment | The **`committee`** permission at **3 of 5** | Any time before execution. **Mandatory** within 2 business days where objections close in the 4-to-6 or 7-or-more band |

**Exact transaction form.** With the protocol delay in use (3.1), a pending payment is a **delayed transaction**, and it is cancelled with **`eosio::canceldelay`**, taking the **canceling authority** and the **`trx_id`** of the delayed transaction.

| Route | Canceling authority | Notes |
|---|---|---|
| **The Committee** | `rfp.vst@committee`, at **3 of 5** | The permission that authorized the delayed transaction. This route is straightforward |
| **Block producers** | `rfp.vst@owner`, held by `eosio.prods`, at **15 of 21** | `canceldelay` requires the canceling authority to be one that authorized the delayed transaction. **`owner` is the root of the account's permission hierarchy and satisfies `committee`**, so block producers can cancel any delayed payment on this account. This is the backstop behind every mandatory cancellation in Framework 10.7 |

**Both routes are rehearsed on testnet before the Program Account is funded**, and the transaction ids of both rehearsals go in the deployment record at Part 10. This is not in doubt as a protocol matter — it is ordinary deployment verification, proving that **this** account's permission names, thresholds and parameters were wired as specified. A cancellation that fails for a typo in a permission name fails exactly as completely as one that fails for a missing protocol feature, and the objection window is the wrong place to find out.

**Objection bands apply only to the initial award disbursement.** Milestone payments and Program Cost payments carry the delay and remain cancellable, but have no banding, because they execute commitments already published and approved.

| Objections | Result |
|---|---|
| **0 to 3** | Payment proceeds when the delay ends |
| **4 to 6** | Committee cancels; the award proceeds only if MSIG confirms it |
| **7 or more** | Committee cancels and the award ends. No MSIG vote is held — 7 block producers can block a 15-of-21 decision, so the confirmation could never carry |

**If the Committee fails to cancel** where cancellation is mandatory, that is an express ground for referral to MSIG for removal, and block producers may cancel through the owner permission. The backstop has to work against a Committee that simply declines to act, since 4 to 6 objectors are by definition short of the Threshold.

---

## Part 5 — Account resources

| Resource | `rfp.vst` | `disc.vst` |
|---|---|---|
| **RAM at launch** | **64 KB** — holds a token balance and a permission, no tables | **16 MB** — see Part 8.6. This is the one that grows |
| **CPU / NET** | Staked, sized for the payment cadence *(to confirm on deployment)* | Sized for routine writes *(to confirm on deployment)* |
| **Who provisions** | **The VST and VS LLC**, as administrators of the program, from Program Costs | **The VST and VS LLC**, as administrators of the program, from Program Costs |
| **Who monitors, and how often** | **VS LLC, monthly**, reported in the cycle report | **VS LLC, monthly**, reported in the cycle report |
| **Top-up trigger** | Free RAM below **16 KB**, or any failed resource check | Free RAM below **3 MB**, **or** below 12 months of projected growth, whichever comes first — **topped up without waiting to be asked** |

**Why this is not a footnote.** An account that cannot pay for a transaction cannot pay an awardee, and a register that cannot accept a write stops the program: filings gate pay and signing weight, and decisions gate the record. **The VST and VS LLC are responsible for provisioning and topping up**, and the trigger above is a standing threshold rather than a request — a resource that has to be asked for is a resource that runs out on a weekend.

**Classification under Framework 15.2b: everything in this Part is an operating cost, not an award.** Keeping the two accounts running does not change what the system does, which is the 15.2b test. **VS LLC performs the work and is paid for it from Program Costs**, inside the USD 40,000 cap in MSIG #5 Part D — it does not absorb the cost, and it does not go through the award process in order to be paid. The Committee records the classification by vote when it approves the first cycle's Program Cost schedule, and does not re-take it each cycle unless the work changes.

**The build is the other side of that line, and it is an award.** The initial build of the RFP platform, including the two contracts on `disc.vst`, changes what the system does and is therefore an **award** under 15.2b — categorized to **Core Development**, counted against the **Cycle Ceiling**, and **flagged self-referential** in the cycle report. It is not paid from Program Costs and it is not inside the USD 40,000 cap. How it is run, given that the work precedes the Committee that awards it, is set out in the **Program Administration Register**, item 2.5.

---

## Part 6 — The reference rate

MSIG #5 Part E requires this Exhibit to confirm the pair, its precision, and a worked example.

| | |
|---|---|
| **Oracle contract** | **`delphioracle`** |
| **Pair** | **`eosusd`** |
| **Table** | `datapoints`, scoped to the pair |
| **Field** | **`median`** |
| **`quoted_precision`** | **4** — the stored integer is in ten-thousandths of a dollar |
| **How the median is formed** | The median of the last **21 submissions** from qualified oracles. The window is 21 *submissions*, not one per oracle, so a high-frequency writer occupies more of it than a low-frequency one |
| **History** | **None.** 21 rows exist per pair and the oldest is overwritten on each submission. A rate read today cannot be re-read from the table later |

### 6.1 The worked example

| Step | Value |
|---|---|
| Oracle `median` as read | 766 |
| Actual price — `median` ÷ 10^4 | USD 0.0766 per A |
| Milestone amount | USD 10,000 — that is **1,000,000 USD-cents** |
| A-units = ⌊ USD-cents × 10^6 ÷ median ⌋ | ⌊ 1,000,000 × 10^6 ÷ 766 ⌋ = **1,305,483,028** |
| One A-unit | 0.0001 A |
| **A payable** | **130,548.3028 A** |

**Integer arithmetic, truncated.** No floating point anywhere in the payment path. The published amount and the on-chain transfer must match exactly, and the platform, the awardee, and any later auditor must all reach the same integer. The rule is specified for reproducibility, not materiality — the largest possible difference between rounding rules is 0.0001 A.

### 6.2 What is recorded at every read

The **oracle value, the block number, the transaction id, and the timestamp of the newest datapoint**. The table keeps no history, so recording the block and transaction is what makes the figure provable afterwards.

### 6.3 The two checks

| Check | Trigger | Effect |
|---|---|---|
| **Staleness** | Newest datapoint older than **24 hours** | The Manager may not approve alone; the matter goes to the Committee, which may approve at the ordinary milestone threshold with the staleness recorded, or defer |
| **Collar** | Approval rate differs by more than **15%** from the rate at the previous payment under that award, or from the award decision rate for the first payment | Same — Committee, not Manager alone |

**A read never fails.** The contract holds 21 rows from the moment a pair is created and modifies them in place. If every oracle stopped submitting, a read would still return a `median`. The timestamp is the only thing distinguishing a live price from a frozen one, which is why it is recorded on every approval whether or not it triggers the check.

### 6.4 If the pair or the contract disappears

Payments are **suspended**, no new award may be made, and the Committee escalates to MSIG within **5 business days** to designate a replacement source (Framework 13.4a). **The Committee may not substitute a source of its own choosing.** Portal hosting and essential administration are not suspended — the Portal is where the suspension itself has to be published.

**Monitoring.** The staleness check in 6.3 needs no monitor — it runs at every approval, so a frozen oracle surfaces at the moment it matters. **A missing pair or contract has no such trigger.** Nothing in the program reads the oracle except an approval or an award decision, so if no milestone falls due for three weeks the failure sits undetected for three weeks. This is an **active monitor**, not a check on demand.

| | |
|---|---|
| **Who runs it** | **VS LLC**, as administrator of the program |
| **Cadence** | **Hourly** |
| **What is checked** | That the `datapoints` table on `delphioracle` can be read; that the **`eosusd` pair still exists** in it; and that the **`delphioracle` code hash is unchanged** since the last check. A code-hash change is not itself a failure, but it is the earliest warning that the pair or its precision may be about to move |
| **Who is alerted** | **VS LLC and the Chair, simultaneously.** Not VS LLC alone. VS LLC detects the failure, but under Framework 9.2 the **Manager of record or the Chair** is who records and publishes it, and an alert that reaches only the party who cannot start the clock does not start it |
| **What happens next** | The failure is **recorded and published on the Portal within 1 business day** of the alert. **The 5 business days for escalation run from that record**, not from the failure — so the day spent getting from detection to publication is dead time inside the escalation window, and it is bounded here for that reason |
| **Escalation if nobody acts** | If no record is published within 1 business day, VS LLC publishes the fact of the alert itself and notifies every member. VS LLC cannot make the 9.2 submission, but it can make sure nobody can later say they did not know |

**A false positive costs an hour; a false negative costs a payment run.** The monitor should alert on doubt — an unreadable table is treated as a failure until a subsequent check clears it, and a cleared alert is logged rather than deleted.

---

## Part 7 — The disclosure register on `disc.vst`

### 7.1 Account and contract

| | |
|---|---|
| **Account** | **`disc.vst`** |
| **Holds** | No program funds and no meaningful token balance. It is a record account; there should be nothing on it worth attacking |
| **Contract** | Append-only. One contract or more, but **three tables** — `disclosures`, `decisions` and `publications` — so a query on one never scans the others |
| **Built and serviced by** | The **EOS Rio team**. **VS LLC remains accountable** under MSIG #5 Part E, and this Exhibit must describe what was actually deployed |
| **Source** | VST-owned work product in a VST-controlled repository, under **Apache-2.0**. It is not exempt for being small or on-chain |
| **ABI** | *(to confirm on deployment — published and matching the deployed code; reproduced at Part 10)* |
| **Code hash** | *(to confirm on deployment)* |

### 7.2 Append-only, enforced in the contract

**No modify action, no erase action, no admin path** — in the contract, not only in the platform. An app-layer guarantee does not satisfy this. **A correction is a new row referencing the prior row's transaction id**, with a reason field. The contract accepts the reference; it never rewrites the referenced row.

### 7.3 What a disclosure row contains

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

**The coded-answer schema and the questionnaire version in use:** **`VQ1`**, set out in the **Disclosure Questionnaire — Version 1** instrument published alongside this Exhibit. The `answers` field carries that instrument's pipe-delimited coded string verbatim; this Exhibit records the version and the code set, it does not author the questionnaire.

The coding meets the requirement below because it carries **`N` for None declared and `X` for not answered as distinct values**, and a questionnaire containing any `X` is not a filed questionnaire for the purposes of Framework 6.3c.

**Parts 2 to 8 each require an explicit "None."** A blank is treated as an unfiled questionnaire, and the coding must be able to express "None" distinctly from "not answered" — otherwise the gate in Framework 6.3c cannot be evaluated from the chain.

**Positions are coded by band**, not by figure, and filers are asked not to name third parties beyond the organizations already named in Part 5. On-chain records cannot be withdrawn, and that is the whole reason for both rules.

**The filer signs their own submission; VS LLC writes the record and cannot alter its content.**

---

## Part 8 — The decisions register on `disc.vst`

### 8.1 What a decision row contains

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

### 8.2 The payload by kind

| Kind | Payload |
|---|---|
| **Award decision** | RFP reference, awardee, USD amount, vote counts, and members voting for, against, and recused **by name and account** |
| **Milestone approval** | Award reference, milestone, the **Manager of record and any Technical Reviewer by name and account**, amount, and the oracle read — value, block, transaction id, newest-datapoint timestamp |
| **Payment signature** | The proposal, and **each signing member by name and account** |
| **Committee resolution with an external effect** | Terminations, recovery plans, strikes, engagements, and reserved-matter escalations, with vote counts |

### 8.3 No hashing, because the register holds the record

An earlier design held the full record on the Portal and wrote only a **SHA-256 digest** on-chain, so that anyone could prove the Portal copy was the one recorded. That design needed a specified serialization and published test vectors, because a hash nobody else can recompute proves nothing.

**It is not the design.** The register holds the record in full and the **Portal reads the register and renders it**. There is no second copy to verify against, so a digest would be a digest of itself. **No hash field is kept**, and no serialization or test vectors are needed.

What replaces the guarantee the hash was giving is simpler: **there is one record.** A Portal that goes down, changes hands, or is quietly edited takes nothing with it, and two copies cannot drift apart because there are not two copies.

### 8.4 Correction, and why there is no redaction

A record is corrected by writing a **new row referencing the prior one**, with the reason. The prior row stays. Nothing is edited and nothing is removed.

**There is no redaction path, and there cannot be one.** A row written to this register is permanent. That is the guarantee, and it is also the constraint: **nothing may be written that the program might later need to unpublish.** Two rules follow, and both are enforced before the write rather than after.

| | |
|---|---|
| **Minutes stay off the register** | Framework 5.9 gives minutes three redaction grounds — confidential proposal content before award, legal advice, and personal data. A record that may need redacting cannot be a record that cannot be withdrawn. The register carries the **resolution**; the minutes carry the deliberation, and are published on the Portal under 5.9 |
| **Records with a redaction step complete it first** | A post-award review under 25.2 gives the awardee grounds to ask for redaction. That step finishes, and the review is written **as redacted**. The same order applies to anything else that acquires a redaction right later |
| **Disclosures are screened before writing** | VS LLC returns a filing that names an individual, or gives a figure where a band was asked for, rather than writing it (Framework 6.3b). The screen is mechanical and is not a review of substance |

**The names were never going anywhere.** Framework 5.9 carves the name, role, seat, and on-chain account of anyone exercising a decision right out of the "personal data" redaction ground. That carve-out matters more here than it did under a digest design: those names are written into the register itself, and the register has no redaction path at all.

### 8.5 Authorities

| Authority | Who | Notes |
|---|---|---|
| **Write** | A **single named VS LLC permission** — *(to confirm on deployment)* — with **no weight on `rfp.vst`**. The contract rejects writes from any other authority | This key writes records. It cannot move money |
| **Deploy and upgrade (`setcode` / `setabi`)** | **`eosio.prods`**, at the Threshold — the owner permission of `disc.vst`. **Not** the writing key, and **not** VS LLC | Separating them means a compromised writing key cannot replace the contract |

**Why `eosio.prods` holds it.** The append-only guarantee does not live in the chain; it lives in the **code** — no modify action, no erase action, no admin path. The rows themselves are ordinary table data. Anyone who can `setcode` can deploy a replacement contract that *does* have a modify action and then rewrite or delete history, so **`setcode` authority is in substance the authority to un-append-only the register.**

That is the same class of power as moving the program's funds, and it sits in the same place for the same reason. `rfp.vst`'s owner permission is held by block producers so that the body being watched cannot rewrite the terms of the account. `disc.vst` records the decisions of the Committee and is written by VS LLC — the two parties the register exists to make checkable. **Neither may change what it does.**

The cost is deliberate: a bug fix or a schema extension needs an MSIG Resolution, which is slow. That is the correct kind of slow for a change to an append-only record, and it is the trade the Network is making knowingly rather than discovering later.

| | |
|---|---|
| **What an upgrade may not do** | Rewrite, drop, renumber, or reinterpret any existing row. A replacement contract must read the existing tables under their existing schema; where a schema changes, the new shape is a **new schema version** (8.1 `sversion`) applied to new rows only |
| **What a proposal must carry** | The code hash being deployed, a diff against the running contract, and a statement of how existing rows are affected — which, if the rule above is honoured, is *not at all* |
| **Recorded** | Every `setcode` on `disc.vst` is written to the decisions register as a Committee resolution with an external effect (7.6a), so the register records its own upgrades |

### 8.6 RAM and growth

An append-only register that never deletes **grows monotonically for the life of the program**. Every filing, correction, award, milestone, and signature is a permanent row — and because the register holds each record **in full** rather than a digest of one, the rows are substantially larger than a hash-only design would produce.

**The estimate, and the model behind it.** Shown as a model rather than a number, so that anyone can check the assumptions and redo the sum when the real cadence and the real row shapes are known.

**Row cost.** An Antelope `multi_index` row costs its serialized payload plus roughly **112 bytes** of table overhead, plus about **144 bytes** for each secondary index. Both tables are assumed to carry two secondary indexes — disclosures by filer and by date, decisions by kind and by reference.

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

**Row count, at the program's expected cadence.**

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

**Three things the estimate deliberately does not do.** It does not assume deletion, because there is none — the only direction is up. It does not net off corrections, because a correction is a **new row** and costs the same as the row it supersedes. And it does not treat 16 MB as a budget to be consumed: a register at 13 MB with a year of growth ahead of it is a register that should already have been topped up.

**What would move it.** Text length, far more than row count. The model assumes about 3 KB of filing text and 4–5 KB of decision narrative; a Technical Reviewer assessment on a substantial piece of code could run several times that, and it is written in full. Doubling the average narrative doubles the estimate. **RAM at current prices is cheap enough that this is a planning question rather than a cost one** — the failure to avoid is not expense, it is a register that stops accepting writes, which stops the program.

### 8.6a The `publications` table

Everything the program publishes, other than minutes, proposals and the backlog (Framework 7.6a).

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

**Three of these have behaviour the others do not.**

| | |
|---|---|
| **Objections** | Written **as received**, each with its time and the signing block producer, and a closing row fixing the **count at the close of the delay window** (Framework 10.6). The 10.5 bands send an award back to MSIG or end it outright on that count, so it is written where nobody can alter it after the fact |
| **Amendments and liftings** | An RFP amendment, and a lifting of a ban, are written **alongside** the row they change, never in place of it. What an RFP said when a proposer read it stays recoverable, and a register that showed only current bans would hide that a ban had ever existed |
| **Questions and answers** | Written **within 2 business days of the answer**, without naming who asked. The time each answer became public is then on the chain, which is what makes 21.2's no-private-guidance rule checkable rather than merely stated |

### 8.7 Read access

**Public.** Both tables readable by anyone through standard chain APIs, with no permission and no gatekeeping through the Portal. The chain is the system of record for decisions, which only holds if the records are readable when the Portal is not.

### 8.8 Before mainnet

**Testnet deployment first**, against the deployed ABI and schemas, with both cancellation routes rehearsed (Part 4).

---

## Part 9 — Departures from the specification

MSIG #5 Part E: *where any element cannot be built as described, VS LLC is to say so and propose the nearest workable alternative rather than proceed on an assumption.*

| Element | What was specified | What was built | Why | Proposed alternative |
|---|---|---|---|---|
| *(none recorded)* | | | | |

**An empty table is a statement**, not an omission: it says everything above was built as described.

---

## Part 10 — Deployment record

*(to confirm on deployment — completed immediately before publication)*

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
| D1 | Every *(to confirm on deployment)* value above — **other than the member keys at 2.2**, which are recorded as they arrive. What remains is chain-derived: account and transaction ids, the permission names, CPU/NET, the ABI and code hash, the write authority, and the two cancellation rehearsals recorded at Part 10 | **Yes** — the Program Account is not funded until this Exhibit is published, and it cannot be published with the deployment record empty (MSIG #5 Part J) |
| D6 | **The five member public keys** (2.2). Recorded as they arrive; **this Exhibit is not held for them** | — The permission is not activated, and the Program Account is not funded, until all five are in — but that gate is in Framework 1.1, not here |
