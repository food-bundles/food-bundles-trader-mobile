/**
 * Canonical design tokens for the FoodBundles Trader app.
 * Source of truth: `.claude/skills/design-system/SKILL.md`.
 * Never hardcode a hex, spacing, radius, or duration value outside this file.
 */

export const COLORS = {
  leaf: "#17683F",
  pine: "#0E4A2B",
  marigold: "#F5A524",
  ripe: "#1E9E57",
  chili: "#D64545",
  oat: "#F6F5F1",
  paper: "#FFFFFF",
  ink: "#14221A",
  label: "#6B746D",
  hairline: "#E7E8E2",
  disabled: "#C7CCC6",
} as const;

export const COLORS_DARK = {
  leaf: "#2EBF6E",
  pine: "#17683F",
  marigold: "#F5A524",
  ripe: "#2EBF6E",
  chili: "#E86060",
  oat: "#0D1510",
  paper: "#1A2620",
  ink: "#E8EDE9",
  label: "#8FA890",
  hairline: "#253020",
  disabled: "#3A4A3A",
} as const;

export type ColorToken = keyof typeof COLORS;

/**
 * Tinted surface backgrounds paired with a semantic text/icon color —
 * used for inline banners (error messages, success confirmations, pending
 * notices) as an alternative to a solid `StatusBadge` pill. Same tint
 * values already used by the badge colour maps in `badges.ts`; centralised
 * here so screens never need to inline a raw hex for this pattern.
 */
export const SURFACE_TINT = {
  success: "#E6F7ED",
  error: "#FDEAEA",
  warning: "#FFF4E0",
} as const;

export const FONTS = {
  heading: "SpaceGrotesk",
  body: "IBMPlexSans",
} as const;

/** Monospace stack — OTP input and voucher code display ONLY. */
export const MONO_FONT_IOS = "Courier New";
export const MONO_FONT_ANDROID = "monospace";

export const TYPE_SCALE = {
  priceHero: { fontFamily: "SpaceGrotesk", fontSize: 32, fontWeight: "700" },
  h1: { fontFamily: "SpaceGrotesk", fontSize: 24, fontWeight: "700" },
  h2: { fontFamily: "SpaceGrotesk", fontSize: 20, fontWeight: "600" },
  h3: { fontFamily: "SpaceGrotesk", fontSize: 17, fontWeight: "600" },
  price: { fontFamily: "SpaceGrotesk", fontSize: 18, fontWeight: "700" },
  body: { fontFamily: "IBMPlexSans", fontSize: 14, fontWeight: "400" },
  bodySemi: { fontFamily: "IBMPlexSans", fontSize: 14, fontWeight: "600" },
  caption: { fontFamily: "IBMPlexSans", fontSize: 12, fontWeight: "400" },
  overline: {
    fontFamily: "IBMPlexSans",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
} as const;

export const SPACE = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  section: 40,
} as const;

export const RADIUS = { sm: 8, md: 12, lg: 16, pill: 999 } as const;

export const SHADOW = {
  card: {
    shadowColor: "#14221A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  elevated: {
    shadowColor: "#14221A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 12,
    elevation: 6,
  },
} as const;

export const DURATION = {
  nav: 380,
  overlay: 300,
  micro: 180,
} as const;

/** Minimum interactive tap target, logical pixels, both dimensions. */
export const MIN_TAP_TARGET = 44;
