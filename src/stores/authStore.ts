/**
 * Authentication store: current trader session + agreement acceptance.
 * Backed by a minimal manual store (no external state library dependency)
 * so it stays inspectable and easy to test. Persists nothing across app
 * restarts on purpose — mock/demo auth only, per "fully mocked" constraint.
 */
import { useSyncExternalStore } from "react";
import type { TraderUser } from "../types/domain";

interface AuthState {
  user: TraderUser | null;
  agreementAccepted: boolean;
}

let state: AuthState = { user: null, agreementAccepted: false };
const listeners = new Set<() => void>();

function emit(): void {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): AuthState {
  return state;
}

/** Logs a trader in (mock — no network call). */
export function loginAs(user: TraderUser): void {
  state = { user, agreementAccepted: user.agreementAccepted };
  emit();
}

/** Clears the current session. */
export function logout(): void {
  state = { user: null, agreementAccepted: false };
  emit();
}

/** Marks the legal agreement as accepted for the current session. */
export function acceptAgreement(): void {
  if (!state.user) return;
  state = { ...state, agreementAccepted: true };
  emit();
}

/** React hook: subscribes to the auth store and returns its current value. */
export function useAuthStore(): AuthState {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
