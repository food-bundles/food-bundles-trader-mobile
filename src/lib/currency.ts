/**
 * RWF currency formatting. Never render a raw number for money in the UI —
 * always route through `formatRwf`.
 */

/**
 * Formats an integer amount of Rwandan Francs as a thousands-separated
 * string with the "RWF" suffix, e.g. `formatRwf(1240000)` -> "1,240,000 RWF".
 */
export function formatRwf(amount: number): string {
  const rounded = Math.round(amount);
  const formatted = rounded.toLocaleString("en-US");
  return `${formatted} RWF`;
}

/**
 * Formats an integer amount without the currency suffix, e.g. for compact
 * inline figures where "RWF" is already shown by a neighbouring label.
 */
export function formatAmount(amount: number): string {
  return Math.round(amount).toLocaleString("en-US");
}
