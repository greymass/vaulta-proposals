# VP-0001 questions and answers

You can read each answer on its own. Each one opens with the direct answer, then gives the numbers behind it. Figures are as of 2026-10-17 unless an answer says otherwise. VP-0001 creates a network-owned account, `gift.vaulta`, that holds 1,000,000,000 bytes of RAM and lets creators approved by producers gift that RAM to accounts they create.

## Effect on RAM price and VaultRAM

The program is built to leave the RAM market alone, and it makes no prediction about price. Apart from the 4,096 bytes `eosio` buys when it creates `gift.vaulta`, it buys nothing from the RAM market and sells nothing into it. Its 1,000,000,000-byte seed is RAM the network already owns, moved from `admin.grants` to `gift.vaulta` with `ramtransfer`. Each gift then locks part of that existing supply into a new account. The recipient cannot sell or transfer gifted RAM, and its only exit is a return to `gift.vaulta`, so none of it reaches the market through the people who receive it. At the 2026-10-17 price of 0.346930 EOS per KiB the whole seed is worth about 338,800 EOS.

## fund.wram and its 42 GiB

The seed comes from `admin.grants`, an account already under producer control, and the program leaves `fund.wram` and the 42 GiB of RAM it holds untouched. Using `fund.wram` for any purpose would need its own proposal and a 15 of 21 producer approval, since both its `owner` and `active` permissions require `eosio@active`, directly or through `eosio.grants`, and its `active` also needs the approval of `eoslabs.io`. A refill is also a distant question: if every account created on Vaulta in the 90 days to 2026-10-17 had gone through this program, the seed would last nearly nine years at that rate. Producers would debate any refill fresh, on its own merits, when the time comes.

## Sybil accounts and airdrop farming

Farming is bounded per creator. Each creator has a daily byte quota, 256 KiB by default, which caps how much of the endowment it can spend in a day however its sign-up checks are bypassed: at the smallest gift, about 150 accounts a day. Gifted RAM cannot be sold, so a gift never converts to tokens.

Creators are responsible for their own Sybil protection. Their application describes how they verify real users, what caps they apply per person, device, IP address and day, and how they detect and stop misuse. If a creator's checks fail, eight producers can suspend that creator, and eleven can halt the whole program.

## Why the network should fund account creation

It lets wallets and applications offer free, instant account creation at no cost to themselves. A bare account needs 1,596 bytes of RAM beyond the system's 1,400 free bytes, about 0.54 EOS at the 2026-10-17 price, which its creator pays. A wallet or app admitted as a creator gifts that RAM from `gift.vaulta` instead, within its daily quota. The cost to the network is small: every account created on Vaulta in the 90 days to 2026-10-17, 11,082 of them, would have used 28.4 MB, which is 2.8% of the seed. The RAM is already owned by the network, set aside for grants.

## Existing free-account providers

Any wallet or app that creates accounts can apply to become a creator, including services that already give accounts away and pay each account's RAM themselves. Once admitted, a creator gifts RAM from `gift.vaulta` to the accounts it creates, within its daily quota.
