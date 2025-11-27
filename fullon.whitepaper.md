# **FullOn Network** Protocol White Paper
***Building a Highly Scalable, Interoperable Layer-1 Blockchain***

```
Version: v1.1
Author: FullOn Labs
Email: fullonlabs @ gmail dot com
```


## Table of Contents

- [01. Abstract](#01-abstract)
- [02. Introduction](#02-introduction)
- [03. Why FullOn](#03-why-FullOn)
   - [Focus use cases](#Focus-use-cases)
   - [Core innovations](#core-innovations)
- [04. Design Principles](#04-design-principles)
- [05. How FullOn Works](#05-how-fullon-works)
   - [Overall architecture](#overall-architecture)
   - [Implementation choice](#implementation-choice)
   - [Key specification](#key-specification)
   - [Key design](#key-design)
     - [Dual-chain design](#dual-chain-design)
     - [Multi-shard design](#multi-shard-design)
   - [Key infrastructure](#key-infrastructure)
   - [Key applications](#key-applications)
- [06. Tokenomics](#06-tokenomics)
   - [Token allocation and distribution](#token-allocation-and-distribution)
   - [Inflation](#inflation)
   - [Deflation](#deflation)
- [07. Governance](#07-governance)
- [08. Disclaimer](#08-disclaimer)

<div align="justify">

# 01. Abstract

**FullOn** is a layer-1 decentralization protocol, destined to become the platform of choice to host
real-world applications for Web3, A.I. and Metaverse ecosystems targeting global users. In order
to meet this ambitious goal, FullOn protocol focuses on providing scalability, usability and
interoperability in addition to ensuring security and decentralization.
FullOn achieves scalability by first ensuring the layer one by itself is highly performant and
scalable and introducing side-chains or layer two protocols only when the layer one is not best
suited to support certain requirements like super low-latency, large data storage consumption or
different on-chain consensus algorithms.
FullOn also takes usability and interoperability very seriously through introducing new features
like sovereign and proxy accounts for fast user onboarding process and universal on-chain
interoperability virtually with all other blockchains and crypto wallets to achieve the
deploy-once-run-anywhere effect for all DAPPs.


# 02. Introduction

The world is now standing at the brink of the Web3 and A.I. era in which major economic and
financial activities could entirely happen atop a blockchain-powered technological foundation.
Apart from launching blockchain networks and issuing cryptocurrencies that can be invested or
speculated by crypto fans amongst themselves, it has been rigorously sought by many industry
pioneers to tokenize and issue real-world assets on-chain, which would certainly open up an
infinite amount of opportunities to rejuvenate the world economy. It has been projected by some
large financial firms like Citi bank that by 2035 the real-world assets to be issued on-chain would
amount to $4 trillion in value. By contrast, the global crypto market capital has surpassed $3.6
trillion as of written and will certainly grow much larger and faster. Blockchain technology and
cryptocurrencies have been not only embraced by many early brave individuals but also recent
financial institutions from around the globe.
However, as of today, there are at least hundreds of blockchain networks existing but most of
them still lack real-world use cases or applications, not to mention propelling the realization of

Web3. There are many technical or non-technical reasons that lead to this phenomenon. FullOn
protocol is hailed to overcome the challenges and become the decentralization platform of
choice to power the Web3, A.I. and Metaverse ecosystems.

<div align="center">
<img src=./assets/fullon-ecosystem-building-blocks.png width=80% /><br/>
Figure-1: FullOn Ecosystem Bulding Blocks Overview
</div>

# 03. Why FullOn

By looking into all the popular blockchains, it is not hard to find out that they have met at least
some of the following problems:

  1. **Scalability problem**: sub-kilo TPS that couldn’t meet the requirements of many
real-world applications demanding thousands and even tens of thousands TPS;
  2. **High latency problem**: large block intervals like some value exceeding 10 seconds or
minutes that are simply not acceptable for most users and couldn’t meet the user
experience requirement set by most traditional applications;
  3. **Long finality problem**: many blockchains require over a minute to finalize or confirm a
block, which greatly hurts the user experience and could also lead to the
double-spending problem if not handled properly;
  4. **High transactional cost**: due to limited TPS, much higher gas fees are usually paid by
users in order to make sure their transactions will get accepted into a block faster than
other peer users. That kind of competition could result in gas fees skyrocketing in
network congestion events, which deters the mass adoption by users.
  5. **Front-running issue**: due to the gas-fee model that allows users to specify the gas fee
price for their transactions, users could pay a higher gas fee price in order to front-run
others, which violates the principle of conducting fair trading on-chain!
  6. **Lack of abstract accounts**: most blockchains adopt public-key derived addresses as
on-chain account entities, which couldn’t handle the cases of account recovery when a
private key gets stolen or lost. Some try to implement the abstract account feature
through smart contract, which lacks standards among users and developers.
  7. **Poor interoperability**: most heterogeneous blockchains and their DAPPs do not work
with others, which result in building similar applications for target blockchains repeatedly
or having to limit the DAPPs to one blockchain only. Users also have to create private
keys and accounts repeatedly for each different blockchains;
  8. **Miniscule smart-contract developer base**: Many blockchains tend to come up with
brand new smart contract languages and limit developers to a small set of early
adopters. That limitation of developer base hinders a wide adoption among majority
developers that have already mastered popular and well-tested coding languages.
  9. **Lack of applications/ecosystems**: It is ultimately the applications that make the
underlying blockchain shine. However, most blockchains have no real value other than
being an asset to be held and traded by crypto investors or market speculators,
expecting to get rich in doing so. Most blockchain teams do not have the know-how of
what ecosystems to be enabled or built and thus do not have an idea of how to optimize
the protocol for the target ecosystems. Eventually it results in the protocol itself
becoming useless and obsolete!

The FullOn protocol will address all of the above problems with innovative solutions so that
applications built on top of FullOn protocol will be more capable, accessible and easy-to-use
while retaining all the good parts of blockchain technology like transparency, decentralization
and security.

# 04. Design Principles
Both the design and development of the FullOn platform are guided by a handful of key
principles. These principles reflect the problems inherent in both the centralized and
decentralized systems of today.

1. **Scalability**: The platform should scale with no upper limit as long as there is economic
justification for doing so in order to support enterprise-grade, globally-used applications.
2. **Usability**: Applications deployed to the platform should be seamless to use for end users
and seamless to create for developers. Wherever possible, the underlying technology
itself should fade to the background or be hidden completely from end users. Wherever
possible, developers should use familiar languages and patterns during the development
process. Basic applications should be intuitive and simple to create while more robust
applications should still be secure.
3. **Affordability**: As FullOn is set to be an application platform instead of just being a store
of value, it must make sure the cost of using the network is relatively affordable by the
majority of users.
4. **Sustainable decentralization**: The platform should encourage significant
decentralization both in the short term and the long term in order to properly secure the
value it hosts. The platform and community should be widely and permission-lessly
inclusive and actively encourage decentralization and participation. To maintain
sustainability, both technological and community governance mechanisms should allow
for practical iteration while avoiding capture by any single parties in the long run.
5. **Upgradability**: The protocol should be easy to upgrade once the mainnet network has
been launched. It would be ideal not to change the node software in order to upgrade the
system configurations or even protocol-level logic.
6. **Modularity & Extensibility**: The overall system software shall be well organized by
clean-cut modules, each of which can be easily swapped out and replaced with new
ones for customizability and extensibility.
Last but not least, it is expected that regardless of the underlying technological
implementations and protocol specifications, the above design principles must be strictly
adhered to unless otherwise revised within this paper.

# 05. How FullOn Works
FullOn is commissioned to host virtually an infinite amount of DAPPs and support billions of
users from around the world to become forever citizens in a Web3 and AI powered metaverse
that connects the real world and virtual realities.

To meet the goal, FullOn comes up with a scalable and extensible architecture where
applications shine the most and FullOn protocol serves as a foundation and infrastructure to
foster a safe, open and dynamic environment meanwhile delivering the best developer and user
experiences.

## Overall architecture

As shown in the following diagram, FullOn as a layer-one protocol can directly host all sorts of
DAPPs that can possibly be imagined and created. However, FullOn protocol compatible
layer-two blockchains can be also built to support a unique set of DAPPs like high-frequency
and ultra-low-latency transactional applications. Moreover, FullOn itself can play as a universal
layer-2 blockchain or side chain to other popular protocols like Bitcoin, Ethereum, Solana,
Binance Chain and BASE Chain etc.
<div align="center">
<img src=./assets/fullon-ecosystem-arch.png width=50% /><br/>
Figure-2: FullOn Ecosystem High-level Architecture
</div>

## Technical specifications


| **Key aspect**           | **Value**   | **Description**                                                                                  |
|--------------------------|-------------|--------------------------------------------------------------------------------------------------|
| **Block Interval**       | 0.5 sec     | A subtle balance between ultra-low latency and high reliability                                  |
| **Block Finality**       | 1 – 1.5 sec | Optimized for applications to resist double-spending and other attacks                           |
| **TPS**                  | 10,000+     | Single-threaded execution, scalable via multi-threading, multi-sharding, Layer-2, and sidechains |
| **Consensus Algorithm**  | DPoS + Savanna | Combines high throughput with fast BFT finality                                               |
| **Virtual Machines**     | Dual-VM     | WASM (native) + EVM (100% compatible)                                                            |
| **Native token**         | `$FLON`     | Total supply: 10 billion                                                                         |   


## Core designs

### Account types

In order to meet various application needs, FullOn protocol support following versatile account
types:
| **Account type** | **Description**                                               |
|------------------|---------------------------------------------------------------|
| Canonical account | Native on-chain 12-alphanumeric personalized account names, a.k.a. abstract account or sovereign account, which can only be created through an existing account owner who pays a certain amount of account resources in $FLON tokens. One abstract account can be
single-signed by a corresponding private key or multi-signed by multiple keys. |
| EVM-address account | EVM type of addresses can be derived from public keys and all FullOn EVM accounts are just addresses and meaningful only within EVM code. Hence there requires a bridging of assets between EVM address accounts and FullOn accounts |
| Proxy account | Users holding a private key to a third-chain like Ethereum can get a proxy account from FullOn through a binding process. Once it gets created, the proxy account holder can bridge assets onto the FullOn network or bridge them back securely |

## Interoperability
By looking at all existing DAPPs one can easily find out that DAPPs built for one blockchain cannot be easily migrated to other blockchains when they are incompatible or heterogeneous to each other. Thus reinventing the wheel has instead become a norm for the Web3 industry as DAPP developers want to harvest the maximum application values by deploying the applications onto as many popular blockchains as possible.

FullOn takes a rather different approach to this by achieving the deploy-once-run-anywhere effect through the built-in proxy account interaction mechanism as shown in the following diagram:
<div align="center">
<img src=./assets/fullon-interop-proxy-account.png width=50% /><br/>
Figure-2: FullOn Interoperability Achieved through Proxy aAcounts
</div>