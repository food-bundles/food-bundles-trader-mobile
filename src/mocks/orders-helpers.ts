/**
 * Shared helpers for building mock order items, used by orders.ts and
 * orders-part2.ts. Split out to avoid duplicating the produce image map.
 */
import type { OrderItem } from "../types/domain-extra";

export type ProduceName = "Irish Potatoes" | "Tomatoes" | "Cabbage" | "Onions" | "Carrots";

/**
 * Exhaustive per-product image map. A function (not a Record index) so
 * TypeScript's control-flow narrowing — not `noUncheckedIndexedAccess` —
 * governs the return type, keeping it `string` without a non-null assertion.
 */
function produceImage(name: ProduceName): string {
  switch (name) {
    case "Irish Potatoes":
      return "https://images.unsplash.com/photo-1518977676405-7571ef02e5ee?w=120";
    case "Tomatoes":
      return "https://images.unsplash.com/photo-1561136594-7f68813d8fb5?w=120";
    case "Cabbage":
      return "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=120";
    case "Onions":
      return "https://images.unsplash.com/photo-1508747703725-719777637510?w=120";
    case "Carrots":
      return "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=120";
  }
}

/** Builds a single mock order line item with its matching product photo. */
export function item(
  id: string,
  productName: ProduceName,
  quantity: number,
  unitPrice: number,
  unit: string
): OrderItem {
  return {
    id,
    productName,
    quantity,
    unitPrice,
    subtotal: quantity * unitPrice,
    unit,
    imageUri: produceImage(productName),
  };
}
