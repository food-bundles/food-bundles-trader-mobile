/**
 * Delegation store: current delegation status + history log. In-memory only
 * (fully mocked, no backend) — mutations simulate the request/accept/reverse
 * flow so the Settings > Delegation screen and the dashboard banner both
 * reflect the same live state within a session.
 */
import { useSyncExternalStore } from "react";
import { MOCK_DELEGATION_STATUS, MOCK_DELEGATION_HISTORY } from "../mocks/delegation";
import type { DelegationStatus, DelegationHistoryEvent } from "../types/domain-extra";

interface DelegationState {
  status: DelegationStatus;
  history: DelegationHistoryEvent[];
}

let state: DelegationState = {
  status: MOCK_DELEGATION_STATUS,
  history: MOCK_DELEGATION_HISTORY,
};
const listeners = new Set<() => void>();

function emit(): void {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): DelegationState {
  return state;
}

function pushEvent(event: DelegationHistoryEvent["event"], note: string): void {
  const entry: DelegationHistoryEvent = {
    id: `dh-${Date.now()}`,
    event,
    timestamp: new Date().toISOString(),
    traderId: "trader-001",
    note,
  };
  state = { ...state, history: [entry, ...state.history] };
}

/** Submits a new delegation request (NOT_REQUESTED -> PENDING). */
export function requestDelegation(): void {
  state = {
    status: { ...state.status, status: "PENDING", delegationRequestedAt: new Date().toISOString() },
    history: state.history,
  };
  pushEvent("REQUESTED", "Delegation request submitted");
  emit();
}

/** Cancels a pending delegation request (PENDING -> NOT_REQUESTED). */
export function cancelDelegationRequest(): void {
  state = { ...state, status: { ...state.status, status: "NOT_REQUESTED" } };
  emit();
}

/** Accepts an approved delegation after OTP verification (APPROVED -> ACCEPTED). */
export function acceptDelegation(): void {
  state = {
    status: {
      ...state.status,
      status: "ACCEPTED",
      canTradeOnBehalf: true,
      delegationAcceptedAt: new Date().toISOString(),
    },
    history: state.history,
  };
  pushEvent("ACCEPTED", "Trader accepted via OTP verification");
  emit();
}

/** Reverses an active delegation (ACCEPTED -> NOT_REQUESTED). */
export function reverseDelegation(): void {
  state = {
    status: { ...state.status, status: "NOT_REQUESTED", canTradeOnBehalf: false },
    history: state.history,
  };
  pushEvent("REVERSED", "Trader reversed delegation");
  emit();
}

/** React hook: subscribes to the delegation store's current value. */
export function useDelegationStore(): DelegationState {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
