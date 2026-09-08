/**
 * Date formatting helpers, language-aware per the accessibility-i18n SKILL.
 * EN = "28 Aug 2026", FR = "28 août 2026", RW = "28 Kanama 2026".
 */
import type { Language } from "../i18n";

const MONTHS_EN = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const MONTHS_FR = [
  "janv.", "févr.", "mars", "avr.", "mai", "juin",
  "juil.", "août", "sept.", "oct.", "nov.", "déc.",
];
const MONTHS_RW = [
  "Mutarama", "Gashyantare", "Werurwe", "Mata", "Gicurasi", "Kamena",
  "Nyakanga", "Kanama", "Nzeli", "Ukwakira", "Ugushyingo", "Ukuboza",
];

function monthsFor(lang: Language): string[] {
  if (lang === "fr") return MONTHS_FR;
  if (lang === "rw") return MONTHS_RW;
  return MONTHS_EN;
}

/** Formats an ISO 8601 date string as "D Month YYYY" in the given language. */
export function formatDate(iso: string, lang: Language = "en"): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const months = monthsFor(lang);
  const day = d.getDate();
  const month = months[d.getMonth()] ?? "";
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

/** Formats an ISO 8601 date-time string as "D Month YYYY, HH:mm". */
export function formatDateTime(iso: string, lang: Language = "en"): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const datePart = formatDate(iso, lang);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${datePart}, ${hh}:${mm}`;
}

/** True if the given ISO timestamp is less than `ms` away from now (future). */
export function isWithinMs(iso: string, ms: number): boolean {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return false;
  return d.getTime() - Date.now() < ms;
}

/** Returns a coarse relative-time string, e.g. "2h ago", "3d ago", "now". */
export function formatRelative(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const diffMs = Date.now() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return "now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}h ago`;
  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 30) return `${diffDay}d ago`;
  const diffMonth = Math.floor(diffDay / 30);
  return `${diffMonth}mo ago`;
}
