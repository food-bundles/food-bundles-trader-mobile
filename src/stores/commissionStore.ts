/**
 * Commission mode store: holds the trader's current commission mode
 * (NORMAL | FIXED). In-memory only — mutated by the Commission Settings
 * screen's confirm-and-OTP flow. Seeded from `MOCK_WALLET.commissionMode`,
 * which is always defined (never `undefined`), so reads never need a
 * fallback the way the known web-source bug required.
 */
import { useSyncExternalStore } from "react";
import { MOCK_WALLET } from "../mocks/wallet";
import type { CommissionMode } from "../types/domain";

let state: CommissionMode = MOCK_WALLET.commissionMode;
const listeners = new Set<() => void>();

function emit(): void {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): CommissionMode {
  return state;
}

/** Sets the trader's commission mode. */
export function setCommissionMode(mode: CommissionMode): void {
  state = mode;
  emit();
}

/** React hook: subscribes to the current commission mode. */
export function useCommissionMode(): CommissionMode {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
