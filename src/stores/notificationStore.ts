/**
 * Notification store: holds the trader's notifications (seeded from mock
 * data) and exposes read/unread mutation actions. In-memory only, per the
 * "fully mocked" constraint — no polling network call, just a store other
 * screens/components subscribe to.
 */
import { useSyncExternalStore } from "react";
import { MOCK_NOTIFICATIONS } from "../mocks/notifications";
import type { TraderNotification } from "../types/domain-extra";

interface NotificationState {
  notifications: TraderNotification[];
}

let state: NotificationState = { notifications: MOCK_NOTIFICATIONS };
const listeners = new Set<() => void>();

function emit(): void {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): NotificationState {
  return state;
}

/** Marks a single notification as read. */
export function markNotificationRead(id: string): void {
  state = {
    notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
  };
  emit();
}

/** Marks every notification as read. */
export function markAllNotificationsRead(): void {
  state = { notifications: state.notifications.map((n) => ({ ...n, read: true })) };
  emit();
}

/** React hook: subscribes to the notification store's current value. */
export function useNotificationStore(): NotificationState {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

/** Returns the count of unread notifications from a snapshot. */
export function unreadCount(notifications: TraderNotification[]): number {
  return notifications.filter((n) => !n.read).length;
}
