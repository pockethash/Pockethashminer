# ⛏️ PocketHash (PCKT) – Mobile-First Proof-of-Work

PocketHash is a native Proof-of-Work (PoW) protocol built exclusively for the **Solana Seeker**. It reintroduces fair-launch mechanics to the Solana ecosystem by requiring real computational work for token distribution.

> **"No pre-mine. No VCs. No insiders. Just honest work."**

---

## 🛡️ The "Triple-Lock" Hardware Security
To solve the "transferable NFT" issue (SGT transferability), PocketHash implements a multi-layer hardware enforcement model:

1. **Asset Gate:** Verifies ownership of the **Seeker Genesis Token (SGT)** via Helius DAS API.
2. **Hardware Anchor:** Requires all mining sessions to be initialized via the **Solana Seed Vault**. Only a physical Seeker device can sign these transactions; transferred NFTs on software wallets will fail.
3. **Distribution Gate:** Distributed exclusively through the **Solana dApp Store**, ensuring a secure, mobile-native environment.

---

## 🚀 Key Features

### 🌿 Energy-Efficient Mining (Adaptive Throttle)
Unlike traditional miners, PocketHash uses an **Adaptive CPU Throttle** to protect mobile hardware:
* **Eco Mode (~5% CPU):** Optimized for all-day background mining without overheating or battery drain.
* **Turbo Mode (~8% CPU):** Balanced performance for faster hashing when plugged in.

### ⛓️ Dual Mining Paths
* **SOLO MINE:** Convenience-focused. Uses backend-signing for seamless background accumulation (claims stored in a trustless PDA vault).
* **DIRECT MINE:** 100% Trustless. Every block is signed and claimed directly on-chain via the Seed Vault.

### 💎 Tokenomics ($PCKT)
* **Max Supply:** 21,000,000 PCKT (Hard capped).
* **Halving:** Every 210,000 blocks (Bitcoin-style scarcity).
* **Target Block Time:** 10 minutes.
* **Difficulty:** Bit-based adjustment every 30 blocks (1/8-bit precision).

---

## 🛠️ Technology Stack
* **Blockchain:** Solana (Mainnet)
* **Token Standard:** Token-2022 (PCKTPASS is a Soulbound NFT)
* **Mining Engine:** Web Crypto API (SHA-256)
* **Integrations:** Solana Mobile Stack (SMS), Seed Vault, Helius DAS API
* **Security:** Program Derived Address (PDA) Vaults for trustless reward distribution.

---

## 🗺️ Roadmap Highlights
- [x] Phase 1-3: Core Engine & Testnet Validation
- [ ] **Phase 4: Mainnet Launch (Closed Beta for Seeker Owners)**
- [ ] **Phase 5: TEEPIN Integration** – Moving to cryptographic hardware attestation for "Proof-of-Device."
- [ ] **Phase 6: Hash-Streaming Launchpad** – Allowing other Solana projects to launch via mobile PoW.

---

## 🤝 Ecosystem Alignment ($SKR Utility)
PocketHash creates a massive utility sink for the **$SKR** token. Every new miner pays an activation fee in $SKR, which is:
1. Collected in the Treasury.
2. Staked to secure the network.
3. Redistributed as **Bonus Rewards** to active miners, creating a sustainable flywheel for the Seeker community.

---

## 📧 Contact & Community
- **Twitter:** [@PocketHash](https://twitter.com)
