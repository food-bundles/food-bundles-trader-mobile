/**
 * English translations — source of truth for translation keys. Merges
 * `en-core.ts` (chrome/nav/statuses) and `en-screens.ts` (screen-specific
 * copy), split to respect the 200-line file cap.
 */
import { enCore } from "./en-core";
import { enScreens } from "./en-screens";

export const en = { ...enCore, ...enScreens } as const;

export type TranslationKey = keyof typeof en;
