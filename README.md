# FullOn Network White Paper

* [FullOn Network White Paper](https://hub.flon.network/fullon.whitepaper.pdf)
* [FullOn Network White Paper (中文)](https://hub.flon.network/fullon.whitepaper.cn.pdf)

## Revision

* Version 2.6, 2026/11/02: rebase the implementation discussion on Core v0.9.2; cover elastic-aware BP statistics, GAS counters, node/history roles, recovery and feature-activation boundaries; reference CDT v0.9.0 independently

* Pending policy clarification (original v2.5 draft, now rebased on v2.6): future issuance and disposable GAS-linked reserve use require new DAO decisions; redeemable ELON backing stays protected

* Governance terminology clarification, 2026/11/02: governance power is an internal account ledger, not a separately issued token

* Version 2.4, 2026/10/22, clarified that mining rewards belong only to producing Active BPs while Standby BPs receive only GAS availability rewards
* Version 2.3, 2026/10/22, fixed the 500,000,000 FLON mining cap and reward-block halving curve
* Version 2.2, 2026/10/21, added BP voting governance, deterministic performance recovery, and ELON/FLON `flon.gas` reward accounting
* Version 2.1, 2026/10/20, aligned BP terminology, governance power, epoch accounting, and FLON Core/CDT v0.8.5
* Version 1.1, 2025/11/28, v1.1 release
* Version 1.0, 2025/3/20, v1.0 release
* Version 0.4, 2025/02/06, major upgrade
* Version 0.3, 2024/04/12, major content publish
* Version 0.1, 2024/04/11, initial publish

## Implementation evidence

Core v0.9.2 is the reviewed implementation baseline, not a claim that every network has upgraded. Both language editions and PDF exports identify their own whitepaper version. See the [pinned source manifest](v0.9.2-source-manifest.json) for release commits and reviewed-file hashes. The separate future issuance/GAS policy clarification remains in its draft pull request until merged.
