# 🛠 Technical Architecture: PocketHash (PCKT)

### 1. Core Mining Engine
PocketHash utilizes a non-blocking, multi-threaded mining architecture implemented via **Web Workers**.

*   **Hashing Algorithm:** SHA-256 (Native Web Crypto API).
*   **Throttling Mechanism:** An adaptive sleep-cycle governor. It calculates the time taken for a batch of hashes and injects a micro-sleep to maintain a target CPU load (`~5%` for Eco, `~8%` for Turbo).
*   **Entropy & Salts:** Each mining challenge is globally unique to prevent pre-computation attacks:
    `Challenge = SHA256(WalletAddress + BlockHeight + NetworkTimestamp + ClientNonce)`

---

### 2. On-Chain Security Model (Solana)
The protocol moves beyond simple frontend checks by enforcing security at the **Smart Contract (Program)** level.

*   **PDA Vaults:** All $PCKT and Sponsored Rewards are held in **Program Derived Addresses**. The vault has no private keys; it is governed exclusively by the Anchor program logic.
*   **SGT Gatekeeping:**
    *   **Layer 1 (Backend):** Verification of the Seeker Genesis Token via Helius DAS API.
    *   **Layer 2 (On-Chain):** The backend signs a `SGT_Verified` record to the chain. The Mining Program requires this record to exist before it will process a `mint_reward` instruction.
*   **Double-Claim Prevention:** A sequential block counter and a unique transaction-hash-linking system ensure that no PoW solution can be reused or replayed.

---

### 3. Tokenomics & Adaptive Difficulty
The protocol mirrors Bitcoin’s difficulty adjustment but with higher granularity for the Solana network.

*   **Difficulty Scaling:** Bit-based precision (1/8-bit steps).
*   **Adjustment Epoch:** Every 30 blocks (~5 hours).
*   **Formula:** `delta = log2(expected_time / actual_time)`
*   **Halving Logic:** Hardcoded into the smart contract to trigger every 210,000 blocks, reducing the reward from 50 to 25, 12.5, etc.

---

### 4. B2B Infrastructure: The Sponsored Vault
PocketHash is designed as a **Multi-Stream Mining Platform**.

*   **Program Logic:** The contract allows external projects to initialize a `SponsoredReward` account.
*   **Atomic Distribution:** When a miner finds a $PCKT block, the program simultaneously triggers a transfer of the sponsored token from the project’s sub-vault to the miner’s pending balance.
*   **Escrow Safety:** Sponsor tokens are locked in the PDA. They can only be distributed to valid miners or returned to the sponsor if the campaign is officially cancelled by the admin.

---

### 5. Frontend & State Management
*   **Framework:** Next.js 14+ (App Router).
*   **Real-time Updates:** WebSocket-based listener for Solana's `onAccountChange` to update network hashrate and block height in real-time without polling.
*   **Wallet Integration:** Native Solana Mobile Stack (SMS) support with priority for the hardware **Seed Vault**.
