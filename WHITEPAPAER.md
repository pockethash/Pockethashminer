# 📖 Full Whitepaper: PocketHash (PCKT)

**Version:** 1.0  
**Status:** Mainnet Live  
**Network:** Solana (SPL)  
**Access:** Solana Mobile Exclusive

---

## 1. Abstract
PocketHash (PCKT) is a Proof-of-Work (PoW) cryptocurrency built natively on the Solana blockchain. Unlike traditional Solana tokens that are pre-minted or distributed through airdrops, PCKT must be earned through computational work — real SHA-256 hash puzzle solving performed directly in the user's browser or on their Solana Seeker phone.

PocketHash Miner brings the fundamental principles of Bitcoin-style mining to Solana: a fixed supply, halving schedule, difficulty adjustment epochs, and fair distribution through proof of work — all without the need for dedicated mining hardware or massive energy consumption.

> "I am a Cosmos-burned veteran. I've seen governance wars, inflation spirals, VC dumps, and insider allocations destroy communities. This time, I'm doing things differently: no staking, no governance token, no inflation. Just honest work, fair distribution, and a community built on the Solana Seeker."

---

## 2. Vision & Philosophy
The crypto space has moved away from fair-launch, work-based token distribution. PCKT returns to the roots:

*   **No pre-mine** — Zero tokens exist until someone mines them.
*   **No team allocation** — The creators mine like everyone else.
*   **No ICO/IDO** — You can't buy PCKT, you have to earn it.
*   **No staking** — No artificial yield inflation.
*   **No governance token** — No politics, no governance wars.
*   **No inflation** — Hard cap of 21,000,000 PCKT, forever.
*   **Mobile-first** — Designed specifically for the Solana Seeker phone.
*   **Solana Mobile-exclusive** — Permanently exclusive to Solana Mobile devices.

---

## 3. Tokenomics

### 3.1 Technical Parameters

| Parameter | Value |
| :--- | :--- |
| **Token Name** | PocketHash |
| **Symbol** | PCKT |
| **Blockchain** | Solana (SPL Token) |
| **Decimals** | 8 |
| **Max Supply** | 21,000,000 PCKT |
| **Initial Block Reward** | 50 PCKT |
| **Halving Interval** | Every 210,000 blocks |
| **Target Block Time** | ~10 minutes |
| **Difficulty Adjustment** | Every 30 blocks (~5 hours) |

### 3.2 Supply Schedule

| Era | Blocks | Reward per Block | Total Mined in Era | Cumulative Supply |
| :--- | :--- | :--- | :--- | :--- |
| 1 | 0 – 209,999 | 50 PCKT | 10,500,000 | 10,500,000 |
| 2 | 210,000 – 419,999 | 25 PCKT | 5,250,000 | 15,750,000 |
| 3 | 420,000 – 629,999 | 12.5 PCKT | 2,625,000 | 18,375,000 |
| 4 | 630,000 – 839,999 | 6.25 PCKT | 1,312,500 | 19,687,500 |
| ... | ... | ... | ... | → 21,000,000 |

### 3.3 Turbo Mode Burn Mechanism
Every time a miner activates Turbo Mode, a PCKT fee is paid. 
*   **Monthly burn event:** Once per month, all accumulated PCKT fees are sent to the Solana burn address.
*   **Usage = Scarcity:** More active miners using Turbo → more PCKT destroyed.

---

## 4. Mining Modes

### 4.1 SOLO MINE (Convenience)
Hands-free, background mining.
*   Claims are submitted server-side to eliminate wallet popups.
*   PCKT accumulates in the vault and can be claimed manually at any time.

### 4.2 DIRECT MINE (Trustless)
Fully decentralized mining mode.
*   Every block is claimed directly on-chain and signed by the user's wallet.
*   Zero backend trust required for PCKT minting.

---

## 5. Hardware-Exclusive Network (Solana Seeker)
PocketHash is and remains a Solana Mobile-exclusive protocol.

### 5.1 Seeker Genesis Token (SGT) Gate
Access requires two simultaneous conditions:
1.  **SGT Ownership:** Verified on-chain via the Helius DAS API.
2.  **Seed Vault Requirement:** Mining requires the hardware-backed secure enclave (Seed Vault) built into the Seeker.

### 5.2 Soulbound Access Pass (PCKTPASS)
Once the activation fee (in SKR) is paid, a **PCKTPASS** is minted.
*   **Non-transferable (Token-2022):** It cannot be sold or gifted.
*   **Lifetime access:** Tied permanently to the wallet and device.

---

## 6. Technical Security & Sybil Resistance
PocketHash protects the network through four pillars:
1.  **Hardware Wall:** SGT Gate prevents cloud mining farms.
2.  **Identity Wall:** Soulbound PCKTPASS prevents access sharing.
3.  **Access Wall:** Invitation codes and SKR fees prevent mass fake accounts.
4.  **Protocol Wall:** Admin-rotatable session tokens prevent headless bots.

---

## 7. Energy-Efficient Mining (Adaptive Throttle)
PocketHash uses an adaptive governor to prevent battery drain:
*   **Eco Mode (~5% CPU):** Default, maximum battery friendliness.
*   **Turbo Mode (~8% CPU):** Higher throughput, requires PCKT fee.
*   **Desktop Cap:** Permanently limited to 250 H/s to prioritize mobile users.

---

## 8. Roadmap Highlights
*   **Phase 4:** Early Access (500 Miners), DEX listings, APK release.
*   **Phase 6:** **TEEPIN** Integration for cryptographic hardware attestation.
*   **Phase 8:** **Hash-Streaming Launchpad** — enabling other Solana projects to launch tokens via fair PoW distribution.

---

## 9. FAQ (Summary)
*   **Is this real mining?** Yes, real SHA-256 computations.
*   **Why Seeker only?** To ensure Sybil-resistance through unique hardware.
*   **What happens after 21M PCKT?** No new tokens can ever be minted; supply becomes purely deflationary via Turbo burns.
