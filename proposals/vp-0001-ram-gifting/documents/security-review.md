# Security review of the gift contract

This document gathers the findings of two security reviews of the `gift` contract that VP-0001 deploys to `gift.vaulta`, a network-owned account holding a RAM endowment, and of the permission design that gives eight producers a per-creator stop and eleven producers a program-wide stop. Anthropic's Claude Mythos, Fable and Opus did the review work: they found the issues, showed each one with a test, and re-ran every test to confirm, correct or refute each finding. Neither review found a critical or high issue. Between them they found two medium issues, eleven low and fifteen informational, and every one is closed in the proposal's text, its enactment steps or its operating rules, or accepted with the reason given here. Both medium issues sit in the permission design: the first is closed by the `limitauthchg` step in the enactment, and the second is a limit on what eleven producers can do against eight, which the proposal states. Read the summary table, then the two medium sections.

## Who ran the reviews

The three largest Claude models did the review work. Claude Mythos, Fable and Opus were the finders: each took one angle of attack, wrote a test that shows each finding against the unfixed code, and handed on every lead it left untested to a follow-on pass. Mythos also coordinated each round and assembled the findings. Fable and Opus were the refuters: each took one group of findings, reran every test, re-read every cited line of code and recomputed every cost, and either confirmed the finding, corrected it or refuted it. Claude Sonnet gathered live chain data, built the table of claims the text makes, and reran the existing test suites. No finding rests on Sonnet's work alone.

Greymass wrote VP-0001 and the gift contract and ran both reviews, so neither review is independent of the author. Producers are welcome to fund a further review from the network, and any team can review the contract source.

## What the reviews tested

| | Round 1 | Round 2 |
|---|---|---|
| Date | 2026-10-17 | 2026-10-19 |
| Contract commit | `a23b756` | `a9a9a59`, whose code VP-0001 pins |
| Contract changes since the prior round | | `suspend`, `resume`, the 1,972-byte quota floor |
| Permission design | one break-glass permission linked to `disable` | `halt` at 11 of 21 linked to `disable` and `resume`, `suspend` at 8 of 21 linked to `suspend`, both confined by `limitauthchg` |
| Text | the proposal's authority design | revision 4 of the proposal, the FAQ, the creator template and its README, read at the hashes they held when the review began |
| Tests that show a finding | 80: 32 in the contract's emulator, 48 in the Spring C++ tester | 73: 21 in the emulator, 52 in the Spring tester |
| Findings | 1 medium, 7 low, 5 informational | 1 medium, 4 low, 10 informational |

Both rounds ran against the system contract Vaulta mainnet runs, `VaultaFoundation/system-contracts` at `9edc8bc`, whose contract files equal release v3.10.0, the release the 2025-07-15 Vaulta transition msig deployed to `eosio`, on Spring v1.0.5. Round 2 also tested the real `eosio.msig`, `eosio.wrap` and `eosio.assert` code. The pinned build is `gift.wasm` sha256 `27ed7ecee18f1a81ec7e9ed4aeacdd76de6e1431f66eb62d363067480ddd3072` (20,977 bytes) and `gift.abi` sha256 `17d1ccd52f99782cee42a619dd02cd75c9567d1f716969334ec7f7cf7fbc07f8`, built with Antelope CDT 4.1.1 by `make build/gift/production`, and it builds to the same bytes on macOS and Linux.

The account `gift.vaulta` does not exist on mainnet, so each round built it on a Spring test chain the way the proposal describes it: `owner` and `active` at the producers' 15 of 21, `active` carrying the contract's `eosio.code`, the child permissions of that round's design, then the code, the ABI and `enable`. Round 2 built it from the two enactment msigs exactly. Every statement about permissions in this document was measured on that chain. Both rounds named the account `ram.vaulta`, and VP-0001 renamed it `gift.vaulta` afterwards. The contract reads its own account name at run time, so no finding depends on the name.

The attacker is any set of ordinary accounts, one registered creator acting alone, or one producer acting alone. Fifteen of 21 producers, `eosio.wrap` and the system contracts are trusted. The producers who hold `halt` and `suspend` are trusted to the reach the proposal states for them, so a finding against either group reports what the design lets that group do beyond that statement. Nothing was broadcast to any chain. Figures in EOS use the RAM price on the finding's round date: 0.346930 EOS per KiB on 2026-10-17 and 0.346854 EOS per KiB on 2026-10-19.

The text fixes this document lists were made to revision 4 after round 2 read it, so a quoted sentence below may no longer appear in the proposal.

## Summary

| Id | Title | Severity | Round | Closed by |
|---|---|---|---|---|
| M1 | Eight producers can hold a creator suspended against eleven | Medium | 2 | Proposal text and operating rules |
| M2 | A stop permission can lock the endowment in permission objects | Medium | 1 | Enactment (`limitauthchg`) |
| L1 | Eight producers can stop every creator in one msig while the program reads as enabled | Low | 2 | Proposal text |
| L2 | An approved `giftacct` msig proposal can be executed by a stranger with its own keys | Low | 2 | Proposal text and creator guidance |
| L3 | A later upgrade that appends a table field without `binary_extension` makes old rows unreadable | Low | 2 | Operating rule |
| L4 | The proposal pinned the contract source at a commit other than the candidate | Low | 2 | Proposal pin |
| L5 | A stop permission can rewrite its own authority and its links | Low | 1 | Enactment (`limitauthchg`) |
| L6 | A stop signed by the stop permission alone is billed to an unstaked `gift.vaulta` | Low | 1 | Enactment (stops run through `eosio.msig`) |
| L7 | Exposure while a stop assembles is one quota more than the text stated | Low | 1 | Proposal text |
| L8 | RAM sent to `gift.vaulta` with `giftram` is locked | Low | 1 | Proposal text and operating rule |
| L9 | The endowment ends at the account's own usage, where `addcreator` fails | Low | 1 | Proposal text and operating rule |
| L10 | Program accounts start with no NET or CPU | Low | 1 | Proposal text |
| L11 | `giftacct` is accepted as an inline action | Low | 1 | Accepted as the design |
| I1 | An `enable` placed before `setcode` succeeds and leaves the program off | Informational | 2 | Enactment builder |
| I2 | Stocked `disable` proposals can be executed and consumed by any account | Informational | 2 | Operating rule |
| I3 | Two gifts to one new account in one transaction over-charge the creators | Informational | 2 | Accepted |
| I4 | The account's launch usage is 216,918 bytes, stated as about 200 KB | Informational | 2 | Proposal text |
| I5 | An authority change must be authorized by the permission it names in `authorized_by` | Informational | 2 | Proposal text |
| I6 | The transaction scan completes at the chain's transaction size ceiling | Informational | 2 | Accepted |
| I7 | The system contract sends two notifications per gift and two per return | Informational | 2 | Accepted |
| I8 | The creator template's msig command printed a dry run | Informational | 2 | Creator template |
| I9 | The text cited a separate review and a test count without a reference | Informational | 2 | This document |
| I10 | Two emulator tests assert on sequences the chain refuses | Informational | 2 | Accepted (test harness) |
| I11 | The first gift on a new chain bills 112 bytes more than the quota counts | Informational | 1 | Accepted (testnets only) |
| I12 | The emulator tests prove the contract's logic, and chain claims rest on the Spring tester | Informational | 1 | Test harness |
| I13 | A fresh giftee's resource row can be erased before the gift lands | Informational | 1 | Accepted |
| I14 | A managed RAM limit on `gift.vaulta` decouples its limit from its balance | Informational | 1 | Operating rule |
| I15 | `sellram` bills the seller's token balance row | Informational | 1 | Accepted |

## Test excerpts

The medium findings and the low findings that come from a sequence of transactions each carry an excerpt of the Spring tester case that shows them. Each excerpt is trimmed to the steps that show the behaviour, with setup removed, and names its test. The full tests are available from Greymass on request. The excerpts use these helpers:

- `enact()` builds `gift.vaulta` from the two enactment msigs, with 21 voted producers.
- `propose(p, trx)`, `approve(p, n)` and `exec(p, account)` propose an `eosio.msig` proposal `p`, approve it with `n` producers, and execute it from `account`.
- `pass(p, trx, n, first)` proposes, approves with `n` producers starting at producer number `first`, and executes; with no `n` it uses 15.
- `gp(halt)`, `gp(susp)` and `ga()` are `gift.vaulta@halt`, `gift.vaulta@suspend` and `gift.vaulta@active`.
- `expect_fail(f, message)` requires `f` to fail with `message`.
- `stranger` is an account that holds no approval and no permission on `gift.vaulta`.
- `gift_trx(giftee, bytes)` is one transaction holding the creator's `newaccount` of `giftee` and its `giftacct` of `bytes`.
- In round 1, `bg_push(...)` sends a transaction signed by the single break-glass permission alone, and `native(...)` builds a native permission action.

## Medium

### M1: eight producers can hold a creator suspended against eleven

The proposal gives `suspend` to any eight producers and `resume` to any eleven. Round 2 read it as saying that eight can keep a creator suspended "until eleven agree to resume it" and that "one minority cannot undo another's suspension". The contract refuses only a `suspend` of a creator already suspended (`contracts/gift/src/gift.cpp:90`) and keeps no record of past suspensions, so after any `resume` the same eight can approve and execute a fresh `suspend`. On the test chain the fresh `suspend` executed in the same transaction as the `resume`, so a contested creator may never see a block in which it can gift.

Approvals on `eosio.msig` carry no expiry of their own, and a proposal survives a failed execution (`contracts/eosio.msig/src/eosio.msig.cpp:56`, `:223-237`). Eight producers can therefore approve several `suspend` proposals once, and any account executes the next one after each `resume`. Such a proposal also lands on a creator admitted after it was approved. The mirror holds: eleven producers who stock `resume` proposals undo every `suspend`.

Ending a contested hold takes 15 of 21 producers, and any 15 of 21 includes at least two of the eight. The durable remedies are a change to the `suspend` permission's authority or threshold with `authorized_by` set to `active`, or a change in the producer schedule by voters, after which an approver who leaves the top 21 stops counting. Deleting the permission and re-creating it under the same name revives every standing proposal, because Spring resolves a permission by name. Invalidating the eight's approvals through `eosio.wrap` clears their stocked proposals and voids every other approval those producers hold on the chain.

No endowment byte moves, and the suspended creator can still buy RAM for its own accounts. What the eight deny is the creator's subsidy: at the default quota, 262,144 bytes a day, about 88.8 EOS. Each standing proposal costs its proposer 852 bytes of RAM, returned on execution or cancel.

```cpp
// SEC_2026_10_19_B6_eight_keep_a_creator_suspended_against_eleven
for (name pn : {"s1"_n, "s2"_n, "s3"_n, "s4"_n, "s5"_n}) {
   propose(pn, make_trx({suspend_act(c1, gp(susp))}, year));
   approve(pn, 8);                                     // eight approve five suspends once
}
exec("s1"_n, stranger);                                // suspended
expect_fail([&] { exec("s2"_n, stranger); }, "creator already suspended");
pass("r1"_n, make_trx({resume_act(c1, gp(halt))}), 11, 10);   // eleven resume
exec("s2"_n, stranger);                                // suspended again, no new approval
BOOST_REQUIRE(suspended(c1));

pass("unl"_n, make_trx({ula("suspend"_n, ga(), config::active_name)}));  // 15/21 unlinks suspend
pass("r3"_n, make_trx({resume_act(c1, gp(halt))}), 11, 10);
expect_fail([&] { exec("s4"_n, stranger); }, "transaction authorization failed");
BOOST_REQUIRE(!suspended(c1));                         // the hold ends at 15/21
```

Closed by: proposal text and operating rules, with no code change. The proposal states that a suspension lasts while any eight producers keep approving a further `suspend`, that a `resume` by eleven holds only until the next `suspend`, and that a dispute between the two groups is settled at 15 of 21 by changing the `suspend` permission. The operating rules put short expirations on stop msigs, watch `eosio.msig` for standing proposals that name `gift.vaulta`, retire a child permission under a new name, and treat an `eosio.wrap` invalidation as voiding the invalidated producers' approvals everywhere. A per-creator version number on `suspend` and `resume` was considered and rejected: it would void proposals approved before the last state change, and it would do nothing against eight producers who keep approving.

### M2: a stop permission can lock the endowment in permission objects

Round 1 found this against the single break-glass permission the design then had, and round 2 confirmed that the fix holds for both of the design's child permissions, `halt` and `suspend`. A link restricts which permission an ordinary action needs. The chain checks the native permission actions (`updateauth`, `deleteauth`, `linkauth`, `unlinkauth`) against the permission tree instead, and a permission may create children under itself (Spring `libraries/chain/authorization_manager.cpp:341-347`). The chain bills a new permission's object and its authority to the account that owns it (`libraries/chain/eosio_contract.cpp:315-323`), so a stop permission linked to `disable` alone could still create permission objects that `gift.vaulta` pays for.

On the Spring tester a new permission cost 16 bytes of `gift.vaulta` RAM per wait entry, one `updateauth` at the chain's 65,536-entry authority cap locked 1,048,864 bytes, and the whole 1,000,000,000-byte seed was consumable in about 950 such transactions, which the chain's block limits admit in about 95 seconds. The RAM stays on the account and nobody can sell it. Every creator's gift fails until 15 of 21 producers delete the junk permissions, about a thousand `deleteauth` actions, and `enable` leaves the lock in place. The impact is the whole program denied and about 338,800 EOS of RAM made ungiftable until cleanup. Held by one producer, the permission would have made this high; the design gives both child permissions to producer groups, so it is medium.

```cpp
// SEC_2026_10_17_D2_breakglass_locks_endowment_ram_in_permissions
bg_push(native(bgp(), updateauth{gift, "junk1"_n, bg, waits_authority(30000, 1)}));
// ... repeated until gift.vaulta's RAM is used up
auto blocked = gift_trx("giftee111112"_n, 3000);
expect_fail([&] { push_transaction(blocked); }, "insufficient ram");
base_tester::push_action(gift, "enable"_n, gift, mvo());
expect_fail([&] { push_transaction(still); }, "insufficient ram");   // enable does not help

// SEC_2026_10_17_D2_fix_limitauthchg_confines_breakglass
base_tester::push_action(config::system_account_name, "limitauthchg"_n, gift,
   mvo()("account", gift)("allow_perms", vector<name>{"owner"_n, "active"_n})("disallow_perms", vector<name>{}));
expect_fail([&] { bg_push(native(bgp(), updateauth{gift, "junk1"_n, bg, authority(get_public_key(gift, "junk"))})); },
            "authorized_by is required");
bg_push(gift_act("disable"_n, {bgp()}));               // the stop itself still works
```

Closed by: the enactment. The last authority step of `vp1deploy` is `eosio::limitauthchg(gift.vaulta, [owner, active], [])`. From then on every `updateauth`, `deleteauth`, `linkauth` and `unlinkauth` on `gift.vaulta` must carry an `authorized_by` of `owner` or `active`, and a child permission's attempt aborts before any RAM is billed. Round 2 showed this holding for `halt` and `suspend` through `eosio.msig` and `eosio.wrap`. Every later 15 of 21 authority change on `gift.vaulta`, including one run through `eosio.wrap`, sets `authorized_by` to `active` or `owner` (see I5).

## Low

### L1: eight producers can stop every creator in one msig while the program reads as enabled

`suspend` acts on one creator per action, and nothing bounds how many actions one msig carries, so eight producers can suspend every registered creator in one transaction. The proposal reserves the program-wide stop to eleven producers through `disable`, undone at fifteen through `enable`. The per-creator route reaches the same state at eight, undone at eleven, while the contract's `enabled` flag still reads true. A `suspend` approved before a creator's admission executes the block after `addcreator`. No endowment byte moves; the impact is the sum of registered quotas per day, about 88.8 EOS for one default-quota creator.

```cpp
// SEC_2026_10_19_B7_eight_stop_every_creator
pass("sall"_n, make_trx({suspend_act(c1, gp(susp)), suspend_act(c2, gp(susp))}), 8);
BOOST_REQUIRE(enabled());                              // the program still reads as enabled
gift_fails(c1, "giftee111111"_n, "creator is suspended");
gift_fails(c2, "giftee111112"_n, "creator is suspended");
pass("admit3"_n, make_trx({addcreator_act(c3)}));
exec("sfut"_n, stranger);                              // approved before c3 was admitted
gift_fails(c3, "giftee111113"_n, "creator is suspended");
```

Closed by: proposal text. The proposal states that eight producers can suspend any creator or all of them, and that a client reads each creator's `suspended` field together with the `enabled` flag to tell whether gifting runs; the contract README at the pinned commit describes the `suspended` field.

### L2: an approved `giftacct` msig proposal can be executed by a stranger with its own keys

An `eosio.msig` proposal the creator approved is one of the routes by which a creator can send `giftacct`. The contract requires the creator's authority and a top-level `newaccount` of the named account by anyone (`gift.cpp:100`, `:120`), and `eosio.msig::exec` requires only the executer's authority. A `newaccount` inside the proposal is inline and never satisfies the contract's check, so in every msig-route gift the account that sends the execution writes the `newaccount` and chooses the keys. A stranger who sees an approved proposal can create the named account with its own keys and execute the gift in one transaction: the gift lands on the stranger's account, the creator's quota is charged, and the creator's customer loses the name. Each such gift charges the creator 3,136 bytes, about 1.06 EOS, and costs the stranger under 0.01 EOS. The endowment spends exactly what the creator approved, and no admitted or applying creator uses the msig route.

```cpp
// SEC_2026_10_19_D1_approved_msig_giftacct_is_a_bearer_gift_for_the_named_account
propose_and_approve(alice, "giftone"_n, proposed({giftacct_act(alice, g, 3000)}), {alice, config::active_name});
auto trx = make_trx({newaccount_act(bob, g), msig_exec_act(alice, "giftone"_n, bob)}, {bob});
push_transaction(trx);                                 // bob creates g with bob's keys
BOOST_REQUIRE_EQUAL(gifted_row(g)["ram_bytes"].as_int64(), 3000);
BOOST_REQUIRE_EQUAL(used(alice), 3136);                // alice's quota pays

// SEC_2026_10_19_D1b_suffixed_name_defeats_the_hijack
const name g = "user.alice"_n;
auto trx = make_trx({newaccount_act(bob, g), msig_exec_act(alice, "gifttwo"_n, bob)}, {bob});
BOOST_REQUIRE_EXCEPTION(push_transaction(trx), eosio_assert_message_exception,
                        eosio_assert_message_is("only alice may create user.alice"));
```

Closed by: proposal text and creator guidance. The proposal and the creator template state that a creator using the msig route sends the last approval, the `newaccount` and the execution in one transaction, or gifts only names under a suffix whose owner signs the top-level `newaccount` itself. Both defences were shown on the test chain. The code alternatives, binding the gift to the `newaccount` signer or refusing inline `giftacct`, each reverse a design the proposal states (see L11).

### L3: a later upgrade that appends a table field without `binary_extension` makes old rows unreadable

Both of the contract's tables append fields without `binary_extension` (`contracts/gift/include/gift/gift.hpp:22-26`, `:30-39`). The CDT reads a whole row before returning it, so a row written by an earlier layout fails to deserialize under a later one. An upgrade that appends a field to the creator row makes `giftacct`, `setquota`, `suspend`, `resume` and `rmcreator` revert for every creator admitted before it. An upgrade that appends a field to the config row makes `disable`, `enable` and every gift revert, so the eleven-producer stop fails together with the gifting. Both cases fail closed and move no RAM. The mainnet registry starts empty, so no launch row is exposed. The Jungle 4 prototype removed its one old-layout row under the old code before it was redeployed from the pinned build.

```cpp
// SEC_2026_10_19_B14_upgrade_with_appended_config_field_breaks_the_stop
pass("upgrade"_n, make_trx({setcode_act(UPG_WASM), setabi_act(UPG_ABI, ga())}));
propose("d1"_n, make_trx({disable_act(gp(halt))}));
approve("d1"_n, 11);
expect_fail([&] { exec("d1"_n); }, "datastream attempted to read past the end");
gift_fails(c1, "giftee111111"_n, "datastream attempted to read past the end");
```

Closed by: an operating rule for every upgrade. Every later schema change uses `binary_extension` or ships with a migration, and an upgrade msig ends with a state-preserving action on each table (`disable` then `enable` when the program is on, `enable` then `disable` when it is off, and `setquota` for one creator at its own quota), so a schema break reverts the whole upgrade.

### L4: the proposal pinned the contract source at a commit other than the candidate

Round 2 found the proposal linking the contract source at commit `d103fdce`, an ancestor fourteen commits behind the candidate, without the enabled flag, the quota floor, suspension or the README. The candidate `a9a9a59` was then on no public branch. The enactment's `setcode` carries bytes, so the wrong pin changed what a producer could verify and never what deploys.

Closed by: the pin. `a9a9a59` is pushed, and the proposal pins its code at `6fad4b0`, which changes only the README, with the WASM and ABI hashes, the toolchain and the build target. The Jungle 4 prototype runs the same bytes.

### L5: a stop permission can rewrite its own authority and its links

Under the same chain rule as M2, a stop permission could rotate its own key and evict co-holders, re-point its link to a permission of its choosing, or remove the link so the action reverts to 15 of 21 (`authorization_manager.cpp:395-404`, `:417-429`). Its reach ended at its linked actions and its own subtree: `enable`, the registry actions and the inline gift stay at `active`, which a child permission never satisfies. The consequence was loss of an emergency stop.

```cpp
// SEC_2026_10_17_D1_breakglass_reaches_native_permission_actions
bg_push(native(bgp(), updateauth{gift, "child"_n, bg, authority(get_public_key(gift, "child"))}));
bg_push(native(bgp(), linkauth{gift, gift, "disable"_n, "child"_n}));   // re-points disable
bg_push(native(bgp(), updateauth{gift, bg, config::active_name, authority(get_public_key(gift, "rotated"))}));
expect_fail([&] { bg_push(gift_act("disable"_n, {bgp()})); }, "signatures");   // old key locked out
```

Closed by: the enactment's `limitauthchg` step, as in M2.

### L6: a stop signed by the stop permission alone is billed to an unstaked `gift.vaulta`

`gift.vaulta` holds no CPU or NET. A new account starts with a NET limit of zero (`contracts/eosio.system/src/eosio.system.cpp:660`), and the chain bills a transaction to its first authorizer (`libraries/chain/transaction_context.cpp:173-174`). A `disable` carrying only the stop permission failed with `transaction net usage is too high: 96 > 0`, leaving the program enabled at the moment the stop was needed.

```cpp
// SEC_2026_10_17_D3_lone_breakglass_disable_billed_to_unstaked_account
bg_push(gift_act("disable"_n, {bgp()}));               // throws tx_net_usage_exceeded
BOOST_REQUIRE(enabled());
push_signed({gift_act("disable"_n, {{alice, config::active_name}, bgp()})}, {get_private_key(alice, "active"), bgkey()});
BOOST_REQUIRE(!enabled());                             // a funded first authorizer pays
```

Closed by: the enactment design. `halt` and `suspend` are held by `eosio.prods@prod.major` and `eosio.prods@prod.minor` and used through `eosio.msig`, so the account that executes the proposal pays the transaction's CPU and NET.

### L7: exposure while a stop assembles is one quota more than the text stated

A creator's quota window opens at its first gift and resets on the first gift at least 24 hours later (`contracts/gift/src/gift.cpp:98-101`). A key held by an attacker for D seconds can spend `Q × (ceil(D / 86,400) + 1)` bytes before a stop lands, because the window already open at compromise adds one quota. At the 256 KiB default and a five-day msig that is 1,572,864 bytes, about 533 EOS.

Closed by: proposal text, which gives the `(days the msig takes + 1) × quota` formula and this figure.

### L8: RAM sent to `gift.vaulta` with `giftram` is locked

RAM sent to `gift.vaulta` with `eosio::giftram` lands as a gift held by `gift.vaulta`, and the system contract keeps gifted bytes from leaving (`contracts/eosio.system/src/delegate_bandwidth.cpp:272-273`), so the program cannot gift it on. A refill sent that way at exhaustion restores only the tail described in L9 before creators' gifts fail with `insufficient quota`. Returning it takes a 15 of 21 `ungiftram` signed by `gift.vaulta`, preceded in the same transaction by a `ramtransfer` into `gift.vaulta` covering its usage. A stranger's small `giftram` to `gift.vaulta` closes the account to other gifters and changes nothing for the program.

```cpp
// SEC_2026_10_17_R2_1_giftram_refill_at_exhaustion
BOOST_REQUIRE_EQUAL(success(), giftram(stranger, gift, 500'000, "refill sent with the wrong action"));
{ auto t = gift_trx(g2, Rx); push_transaction(t); }    // only the old balance can still be gifted
{ auto t = gift_trx(g3, 1596);
  BOOST_REQUIRE_EXCEPTION(push_transaction(t), eosio_assert_message_exception, eosio_assert_message_is("insufficient quota")); }
```

Closed by: proposal text and operating rule. Every transfer into `gift.vaulta`, the seed and any later refill alike, uses `ramtransfer`. The seed source `admin.grants` has moved RAM only by `ramtransfer` in its history.

### L9: the endowment ends at the account's own usage, where `addcreator` fails

`gift.vaulta` pays for its own code, ABI, permissions and registry rows out of the RAM it gifts. The largest gift that lands is its balance plus 1,400 free bytes, less its usage and the 136-byte row overhead (`delegate_bandwidth.cpp:323`, Spring `resource_limits.cpp:248`). The next gift fails with `account gift.vaulta has insufficient ram`, naming the program account. Measured at the pinned build, launch usage is 216,918 bytes, so 215,654 bytes of the endowment, about 73 EOS, can never be gifted. In that state `addcreator` fails too, because it adds a row paid by `gift.vaulta`, while `disable`, `enable`, `suspend`, `resume`, `setquota` and `rmcreator` keep working.

```cpp
// endowment_last_bytes_fail_on_ram_vaulta_usage
const int64_t headroom = ram_bytes(gift) + 1400 - ram_usage(gift);
auto whole = [&]() { return push({newaccount_action(alice, g1), giftacct_action(alice, g1, bytes0)}, {alice}); };
BOOST_REQUIRE_EXCEPTION(whole(), ram_usage_exceeded, fc_exception_message_contains("insufficient ram"));
push({newaccount_action(alice, g1), giftacct_action(alice, g1, headroom - 136)}, {alice});   // the largest gift that lands
BOOST_REQUIRE_EQUAL(ram_usage(gift), ram_bytes(gift) + 1400);
```

Closed by: proposal text, which gives the formula and the error, and an operating rule that a refill msig runs before any admission msig once the endowment nears exhaustion.

### L10: program accounts start with no NET or CPU

An account created under the program holds its gifted RAM and starts with NET and CPU limits of zero (`eosio.system.cpp:660`), since the gift raises only the RAM limit. Its owner can transact once a creator, a wallet or any other party stakes to it, powers it up or pays as first authorizer. Returning a gift also needs about 1,600 bytes of the account's own RAM, because the account's footprint must fit in its 1,400 free bytes plus its own RAM once the gift leaves. A forced return through a 15 of 21 `eosio.wrap` transaction succeeds only when the same transaction first gives the account 1,596 bytes; for a 3,000-byte gift it recovers 1,540 of the 3,136 bytes the creator's quota was charged.

Closed by: proposal text, in How a gift works, the Recovery bullet and the Full-return constraint.

### L11: `giftacct` is accepted as an inline action

The contract requires the creator's authority (`gift.cpp:86`) and reads the top-level transaction at any depth (Spring `libraries/chain/webassembly/cf_transaction.cpp:6-17`), so it accepts `giftacct` sent inline: through an `eosio.msig` proposal the creator approved, through a contract holding the creator's `eosio.code` permission, and through `eosio.wrap::exec` at 15 of 21. Round 1 read the text as describing a top-level action and proposed a one-line check to refuse inline callers. In every route the endowment pays no more than the creator's quota.

Closed by: accepting inline `giftacct` as the design. The proposal and the contract README state that `giftacct` may be sent top-level or inline, that the creator answers for every gift made under its authority, whether by key, approved msig or deployed contract, and that indexers read inline traces. The `newaccount` must still be top-level, which keeps accounts created inline out of the program. L2 is the one consequence that needed further guidance.

## Informational

- **I1.** An `enable` addressed to `gift.vaulta` before `setcode` runs no handler and succeeds, so a deploy msig with `enable` out of order would execute and leave the program disabled until a further 15 of 21 `enable`. The `vp1deploy` builder places `enable` last, and the operator reads the `enabled` flag after the msig executes.
- **I2.** Eleven producers who stock `disable` proposals can undo each 15 of 21 `enable` one block later. Because `disable` succeeds while the program is already disabled, any account can consume the whole stock by executing every standing `disable` first, after which the next `enable` holds. The operator executes the standing `disable` proposals before an `enable`, in one transaction.
- **I3.** When two creators, or one creator twice, gift the same new account in one transaction, each call is charged the 136-byte row overhead while the system contract keeps one row. The creators are over-charged and the endowment never spends more than the quotas record. Accepted: a creator has no reason to gift one account twice.
- **I4.** The proposal gave `gift.vaulta`'s launch usage as about 200 KB. Measured at the pinned build it is 216,918 bytes, of which the code accounts for 209,770; the first creator admission adds 253 bytes and each later one 141. The proposal's formula was exact, and the figure is replaced.
- **I5.** Every later authority change on `gift.vaulta` must carry an `authorized_by` of `owner` or `active`, and the system contract also requires the change to be authorized by that same permission (`contracts/eosio.system/src/limit_auth_changes.cpp:39-40`), so a change declared under `active` that names `owner` fails. The rule fails closed, and the proposal states the pairing.
- **I6.** The contract's scan of the creating transaction completed at a 1,000,247-byte compressed transaction, the chain's ceiling. A large transaction costs only the account that sends it. Accepted.
- **I7.** The system contract notifies `gift.vaulta` twice per gift (`giftram`, `logramchange`) and twice per return (`ungiftram`, `logramchange`). The contract declares no notification handler, so the notifications have no effect and a giftee's return always completes. The README at the pinned commit names only `giftram` and `ungiftram`. Accepted.
- **I8.** The creator template's msig command omitted the `--broadcast` flag, so the command as written printed a dry run. The template carries the flag.
- **I9.** The proposal and the FAQ said `suspend` and `resume` "were reviewed separately" without a reference, and the FAQ's test count described round 1 without naming its commit. The proposal now cites this document, which covers `suspend` and `resume` in round 2, and the FAQ no longer describes the reviews.
- **I10.** Two emulator tests assert on sequences the chain refuses before the asserted check runs, because the emulator's stand-in system contract creates no accounts, and one admin test named for a disabled program never calls `disable`. The properties they name hold on chain and are shown by Spring tester cases. Accepted as a test-harness matter.
- **I11.** On a chain where no account holds gifted RAM, the first gift also pays 112 bytes for the system table that stores gifts, so `gift.vaulta`'s usage rises by 248 against the 136 the quota counts. Vaulta mainnet's table already holds over 7,000 gifts, so every mainnet gift bills exactly 136. Testnet operators see 248 on the first gift.
- **I12.** The contract's unit tests run in an emulator that cannot create accounts from contract code and enforces no RAM limit, so they prove the transaction scan, the quota arithmetic and the input checks. The chain-dependent claims (a gift reaches only an account the same transaction creates, 1,596 bytes is the smallest gift that completes a single-key account, a giftee can return its gift once it holds enough RAM of its own, a stranger's gift cannot land in the creating transaction) are shown on the Spring tester. The one emulator test that depended on test order was fixed, and the 61 unit tests pass one at a time.
- **I13.** A creator can empty a fresh giftee's resource row inside the creating transaction (`delegatebw` then `undelegatebw`), after which the gift re-creates the row billed to the giftee. The end state equals a plain gift. Accepted.
- **I14.** A 15 of 21 `setacctram` on `gift.vaulta` would fix its chain RAM limit so it stops tracking its balance; gifts still land and giftee limits stay exact. The operating rules keep `gift.vaulta` unmanaged.
- **I15.** `sellram` bills the seller's token balance row, 240 bytes on a first sale, so a giftee holding gifted and own RAM can sell at most its own RAM minus 240 in one action. `ramtransfer` and `ramburn` move exactly its own bytes. This is a property of `sellram` and `eosio.token`. Accepted.

## Limits of the reviews

The M2 drain time was measured on a four-core test host; mainnet producer CPU for a 65,536-entry `updateauth` and for a thousand `deleteauth` recoveries were derived and not run. The contest between eight and eleven in M1 ran through `eosio.msig` and once as a directly co-signed transaction. A standing proposal's behaviour when a former approver rejoins the top 21 was reasoned from the same code lines. L2 was tested against single-key and two-party creators. The launch usage figure in L9 and I4 uses the pinned build's WASM size and moves with any later `setcode`. The reviews did not rebuild mainnet's `eosio.msig` to confirm it matches the reviewed source. The Jungle 4 deployment, account-creation indexers, creators' client software, `fund.wram`, the governance process and the translations were outside both reviews, and no mainnet dry run was performed.
