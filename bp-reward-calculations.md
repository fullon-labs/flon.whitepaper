# Mainnet BP self-stake and block reward calculations

## Effective mainnet self-stake

On 2026-11-04, `flon::bpstakecfg.min_self_stake` changed from 500,000 to **1,000,000 FLON**. Schedule enforcement remains enabled and the self-stake exit delay remains **21 days** (1,814,400 seconds). All 21 existing BPs hold 1,000,000 FLON each in `bpstakes`, totaling **21,000,000 FLON**, and meet the new minimum.

Transaction `1e1d76e397ad6b74541ef51d5edab85afeae0707d7102de47fd8fd3247d87032`, block `14985170`, is irreversible. Only the admission amount changed. Mainnet rewards were not started, the reward curve was not changed, and testnet parameters were not modified.

## What “five-year halving” means

The current system contract halves after **315,360,000 cumulative reward blocks**. This corresponds to five 365-day years at 0.5 seconds per block, rather than five fixed calendar years. Slots without an actual reward block do not advance this counter.

The current idle heartbeat is 12 seconds. Calculations below assume a continuous qualifying reward block every 12 seconds. This is a scenario, not a guaranteed maximum during faults. Genuine misses and outages reduce annual production further.

## Formula and assumptions

- Mining budget `C = 500,000,000 FLON`; reward blocks per halving stage `H = 315,360,000`.
- Stage `k` budget is `C / 2^(k+1)` and its theoretical mean reward is `R_k = C / (2^(k+1) × H)`. The first stage is `k=0`.
- A year is 365 days or `31,536,000` seconds. With mean interval `d`, annual network blocks are `31,536,000 / d`.
- For 21 equally rotating, fully qualified Active BPs: **annual reward per BP = annual network blocks × R_k / 21**.
- A BP still earns `R_k` for a block it actually produces. Only its long-run share per network block is `R_k / 21`. Do not divide both its block count and the reward for its own blocks by 21.
- Figures are gross theoretical rewards, excluding GAS, voter sharing, operating costs, capital opportunity costs and taxes. The contract distributes remainders in 8-decimal smallest units; actual ledgers control settlement.

## First stage: 0.5-second versus 12-second production

| Metric | Continuous 0.5-second blocks | Continuous 12-second blocks |
| --- | ---: | ---: |
| Per actual reward block (FLON) | 0.79274480 | 0.79274480 |
| Network blocks per day | 172,800 | 7,200 |
| Network blocks per year | 63,072,000 | 2,628,000 |
| Network rewards per year (FLON) | 50,000,000.00 | 2,083,333.33 |
| Blocks per BP per year (theoretical mean) | 3,003,428.57 | 125,142.86 |
| Gross rewards per BP per year (FLON) | 2,380,952.38 | 99,206.35 |
| Gross rewards per BP per day (FLON) | 6,523.16 | 271.80 |
| Approximate time to next halving | 5 years | 120 years |

At 12 seconds, a BP's long-run mean production opportunity is one block per 252 seconds (12 × 21). Actual schedules may contain consecutive slots, so this is not a fixed personal cadence. The first-stage long-run mean share per BP per network block is approximately `0.03774975 FLON`.

## Annual and stage figures at 12 seconds

Within the first stage, calendar years 1, 2, 3, 4 and 5 each have the same theoretical estimate: 2,083,333.33 FLON for the network and 99,206.35 FLON per BP annually. There is no automatic halving at the end of calendar year five. Activation timing, actual production, eligibility and stage crossings affect any specific calendar year.

| Stage | Mean per block (FLON) | Network annual rewards (FLON) | Annual gross rewards per BP (FLON) | Stage length at continuous 12 seconds |
| --- | ---: | ---: | ---: | --- |
| First | 0.79274480 | 2,083,333.33 | 99,206.35 | About 120 years |
| Second | 0.39637240 | 1,041,666.67 | 49,603.17 | About 120 years |
| Third | 0.19818620 | 520,833.33 | 24,801.59 | About 120 years |
| Fourth | 0.09909310 | 260,416.67 | 12,400.79 | About 120 years |

Annual figures use unrounded theoretical means, not the displayed eight-decimal block values.

## A fixed five-calendar-year alternative

This would be a different, unimplemented reward policy. Keeping 250,000,000 FLON for the first five years implies 50,000,000 FLON annually. At continuous 12-second production, the theoretical mean would be approximately **19.02587519 FLON per block**, or **2,380,952.38 FLON gross annually per BP** for 21 equal BPs.

That is 24 times the current first-stage block reward. Editing prose, `bpstakecfg`, or the legacy initial-reward compatibility field cannot implement it. Time-based allocation, idle/outage handling, budget caps and integer precision require a separately specified, authorized and tested contract upgrade. No such change was performed here. Mainnet base rewards remain unstarted; these figures are not current payments.

## Verification sources

- Mainnet RPC: `https://m.flonscan.io/v1/chain/get_table_rows`; read `flon::bpstakecfg`, `flon::bpstakes` and `flon::global`, checking the full mainnet Chain ID.
- [Reward implementation](https://github.com/fullon-labs/flon.contracts/blob/d34fc8f588e4bcc581e1377e729a248e0098f090/contracts/flon.system/src/producer_pay.cpp): `scheduled_reward_for_block` and `onblock`.
- [Halving constants](https://github.com/fullon-labs/flon.contracts/blob/d34fc8f588e4bcc581e1377e729a248e0098f090/contracts/flon.system/include/flon.system/flon.system.hpp).
