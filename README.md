# 💎 PocketHash (PCKT)
### The First Proof-of-Device PoW Protocol for the Solana Seeker

PocketHash is a decentralized, fair-launch mining protocol designed exclusively for the **Solana Mobile** ecosystem. Built during a 7-day high-velocity sprint, it brings the scarcity and security principles of Proof-of-Work to the Seeker smartphone.

## 🌟 The Vision
PocketHash was created to solve the "unfair launch" problem in modern crypto. By removing VCs, pre-mines, and insider allocations, we return to a model where tokens are earned through honest computational work. 

## 🚀 Technical Innovation

### 1. Adaptive CPU Throttle (Energy Efficiency)
To prevent battery drain and overheating on mobile devices, I developed an **Adaptive CPU Throttle**. 
- **Mechanism:** The miner measures real-time execution of SHA-256 batches and dynamically calculates sleep intervals.
- **Modes:** 🌿 **Eco** (~5% CPU) for all-day background mining and ⚡ **Turbo** (~8% CPU) for maximum performance.

### 2. On-Chain SGT Hardware Gate
PocketHash is the first protocol to use a mandatory hardware-attestation gate.
- **Verification:** The system queries the **Helius DAS API** to verify the presence of the **Seeker Genesis Token (SGT)**.
- **Enforcement:** Verification is written to an on-chain `sgtVerified` record via **Poof Policy**, making the protocol immune to bot farms and emulators.

### 3. Bit-Based Difficulty Adjustment
- **Precision:** 1/8-bit precision for fine-grained difficulty scaling.
- **Epochs:** Difficulty adjusts every 30 blocks (~5 hours) to maintain a stable 10-minute block time, regardless of network hashrate.

## 🛠 Tech Stack
- **On-Chain Logic:** Poof Policy (Poof.new)
- **Infrastructure:** Helius DAS API, Solana Mobile Stack (SMS)
- **Frontend:** React, Vite, TypeScript, Tailwind CSS
- **Mining Engine:** Web Crypto API (SubtleCrypto) using Web Workers

## 👤 Solo-Developer Journey
This project was built entirely by a solo developer with **autism**. My strength lies in extreme technical focus, which allowed me to architect and ship this protocol in a 7-day "tunnel" phase. PocketHash is the first time I have used AI-assisted development (**Claude**) to translate my deep research into market cycles and economic logic into a functional blockchain product.

## 📄 License
MIT
