/**
 * Pockethash Miner PoW Mining Worker — runs in a dedicated Web Worker thread.
 * Accepts:
 *   { type: 'start', challenge, target, maxHashRate?, startNonce? }
 *   { type: 'stop' }
 *   target: hex string (64 chars). Hash is valid if hashBigInt < targetBigInt.
 *   maxHashRate: number (H/s). 0 or omitted = unlimited. >0 = cap to this rate.
 *   startNonce: number. Starting nonce for the search (default 0). Wraps at 2^32.
 * Posts:   { type: 'hash_found', nonce, hash, hashRate } | { type: 'progress', hashRate, attempts }
 *
 * Adaptive CPU throttle:
 *   eco   → ~5% CPU target
 *   turbo → ~8% CPU target
 *
 * Hash rate cap (desktop throttle):
 *   When maxHashRate > 0, each batch is padded with a sleep so that the
 *   batch completes in at least (BATCH_SIZE / maxHashRate * 1000) ms.
 *   This is applied AFTER the eco CPU sleep so both constraints are satisfied.
 *
 * Implementation: measure the wall-clock time for BATCH_SIZE hashes, then
 * sleep for (batchTime / targetCpuFraction - batchTime) ms so the CPU is
 * only busy for the target fraction of elapsed wall-clock time.
 */

export const MINING_WORKER_CODE = `
self._running = false;

const CPU_TARGET_ECO = 0.05;
const CPU_TARGET_TURBO = 0.08;
const BATCH_SIZE = 50;

self.onmessage = async function(e) {
  const { type } = e.data;

  if (type === 'stop') {
    self._running = false;
    return;
  }

  if (type === 'start') {
    self._running = true;
    const targetBigInt = BigInt('0x' + e.data.target);
    const challenge = e.data.challenge;
    // maxHashRate: 0 means unlimited, >0 caps the rate to that many H/s
    const maxHashRate = (typeof e.data.maxHashRate === 'number' && e.data.maxHashRate > 0)
      ? e.data.maxHashRate
      : 0;
    // Pick CPU target fraction based on throttleMode
    const cpuTarget = e.data.throttleMode === 'turbo' ? CPU_TARGET_TURBO : CPU_TARGET_ECO;
    // Minimum ms a batch of BATCH_SIZE hashes must take to stay at or below maxHashRate
    const minBatchMs = maxHashRate > 0 ? Math.ceil((BATCH_SIZE / maxHashRate) * 1000) : 0;

    let nonce = (typeof e.data.startNonce === 'number') ? e.data.startNonce : 0;
    let attempts = 0;
    const startTime = Date.now();
    let lastReport = Date.now();
    let foundHash = null;
    let foundNonce = null;
    // EMA smoothing for displayed hash rate (alpha ~0.2)
    const EMA_ALPHA = 0.2;
    let emaHashRate = -1; // -1 = uninitialized
    // Display cap: on desktop (maxHashRate > 0) clamp displayed rate to 250 H/s
    const DISPLAY_CAP = maxHashRate > 0 ? 250 : Infinity;

    const encoder = new TextEncoder();

    while (self._running) {
      // ── Hash a batch of BATCH_SIZE, measuring wall-clock time ──────────────
      const batchStart = Date.now();

      for (let i = 0; i < BATCH_SIZE && self._running; i++) {
        const input = challenge + nonce.toString();
        const data = encoder.encode(input);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        attempts++;

        const hashBigInt = BigInt('0x' + hash);
        if (hashBigInt < targetBigInt) {
          foundHash = hash;
          foundNonce = nonce;
          break;
        }

        nonce = (nonce + 1) % (2 ** 32);
      }

      const batchTime = Date.now() - batchStart;

      if (foundHash !== null) {
        const elapsed = (Date.now() - startTime) / 1000;
        const rawRate = elapsed > 0 ? Math.round(attempts / elapsed) : 0;
        // Apply EMA, then clamp to display cap
        emaHashRate = emaHashRate < 0 ? rawRate : Math.round(EMA_ALPHA * rawRate + (1 - EMA_ALPHA) * emaHashRate);
        const displayRate = Math.min(emaHashRate, DISPLAY_CAP);
        self._running = false;
        self.postMessage({ type: 'hash_found', nonce: foundNonce.toString(), hash: foundHash, hashRate: displayRate });
        return;
      }

      // ── Adaptive throttle sleep (eco/turbo CPU cap) ───────────────────────
      const ecoSleepMs = Math.max(0, Math.round((batchTime / cpuTarget) - batchTime));

      // ── Hash rate cap sleep (desktop throttle) ────────────────────────────
      // Ensure the full batch (hashing + eco sleep) takes at least minBatchMs
      // so we never exceed maxHashRate H/s.
      const totalElapsed = Date.now() - batchStart;
      const rateSleepMs = minBatchMs > 0 ? Math.max(0, minBatchMs - totalElapsed) : 0;

      // Take whichever sleep is longer so both constraints are satisfied
      const sleepMs = Math.max(ecoSleepMs, rateSleepMs);
      if (sleepMs > 0) {
        await new Promise(resolve => setTimeout(resolve, sleepMs));
      }

      // ── Progress report (once per second) ─────────────────────────────────
      const now = Date.now();
      if ((now - lastReport) >= 1000) {
        // Use wall-clock time so throttle sleep naturally lowers reported rate
        const elapsed = (now - startTime) / 1000;
        const rawRate = elapsed > 0 ? Math.round(attempts / elapsed) : 0;
        // Apply EMA to smooth out fluctuations between reports, then clamp to display cap
        emaHashRate = emaHashRate < 0 ? rawRate : Math.round(EMA_ALPHA * rawRate + (1 - EMA_ALPHA) * emaHashRate);
        const displayRate = Math.min(emaHashRate, DISPLAY_CAP);
        self.postMessage({ type: 'progress', hashRate: displayRate, attempts });
        lastReport = now;
      }
    }
  }
};
`;

export function createMiningWorker(): Worker {
  const blob = new Blob([MINING_WORKER_CODE], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);
  const worker = new Worker(url);
  // Clean up the object URL after worker is created
  URL.revokeObjectURL(url);
  return worker;
}
