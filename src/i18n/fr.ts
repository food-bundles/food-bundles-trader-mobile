/**
 * French translations. Merges `fr-core.ts` and `fr-screens.ts`.
 * Keys must exactly match `en.ts`.
 */
import type { TranslationKey } from "./en";
import { frCore } from "./fr-core";
import { frScreens } from "./fr-screens";

export const fr: Record<TranslationKey, string> = { ...frCore, ...frScreens };
