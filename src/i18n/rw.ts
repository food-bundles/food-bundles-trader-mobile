/**
 * Kinyarwanda translations. Merges `rw-core.ts` and `rw-screens.ts`.
 * Keys must exactly match `en.ts`.
 */
import type { TranslationKey } from "./en";
import { rwCore } from "./rw-core";
import { rwScreens } from "./rw-screens";

export const rw: Record<TranslationKey, string> = { ...rwCore, ...rwScreens };
