/**
 * Maps each `OrderStatus` to its i18n translation key (`oStatus.*`).
 * Keeps status-to-copy mapping in one place instead of scattering
 * ternaries across screens.
 */
import { OrderStatus } from "../types/domain";
import type { TranslationKey } from "../i18n";

const ORDER_STATUS_KEY: Record<OrderStatus, TranslationKey> = {
  [OrderStatus.PENDING]: "oStatus.pending",
  [OrderStatus.CONFIRMED]: "oStatus.confirmed",
  [OrderStatus.PREPARING]: "oStatus.preparing",
  [OrderStatus.READY]: "oStatus.ready",
  [OrderStatus.IN_TRANSIT]: "oStatus.inTransit",
  [OrderStatus.DELIVERED]: "oStatus.delivered",
  [OrderStatus.CANCELLED]: "oStatus.cancelled",
  [OrderStatus.REFUNDED]: "oStatus.refunded",
};

/** Returns the `oStatus.*` translation key for a given order status. */
export function orderStatusKey(status: OrderStatus): TranslationKey {
  return ORDER_STATUS_KEY[status];
}
