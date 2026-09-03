# SKILL: Design System

## Source
`design-reference/fb-ma/project/TOKENS.md` and
`design-reference/fb-ma/project/FoodBundles Design System.dc.html`
These are canonical. Never invent a token. Never hardcode a hex value.

## Color tokens
```ts
export const COLORS = {
  leaf:     '#17683F',   // primary — active states, icons, CTAs
  pine:     '#0E4A2B',   // primary-dark — headers, key figures
  marigold: '#F5A524',   // accent — CTA buttons, current-step indicators ONLY
  ripe:     '#1E9E57',   // success — positive deltas, approved badges
  chili:    '#D64545',   // error — rejected, overdue, destructive
  oat:      '#F6F5F1',   // background
  paper:    '#FFFFFF',   // surface — cards, sheets, modals
  ink:      '#14221A',   // primary text
  label:    '#6B746D',   // secondary text (≥ 4.5:1 on paper AND oat)
  hairline: '#E7E8E2',   // borders, dividers
  disabled: '#C7CCC6',   // disabled controls only — NEVER for text
} as const;

export const COLORS_DARK = {
  leaf:     '#2EBF6E',
  pine:     '#17683F',
  marigold: '#F5A524',
  ripe:     '#2EBF6E',
  chili:    '#E86060',
  oat:      '#0D1510',
  paper:    '#1A2620',
  ink:      '#E8EDE9',
  label:    '#8FA890',
  hairline: '#253020',
  disabled: '#3A4A3A',
} as const;
```

## Typography
```ts
export const FONTS = {
  heading: 'SpaceGrotesk',   // 600/700 — all headings and ALL prices
  body:    'IBMPlexSans',    // 400/500/600 — all body/UI text
} as const;

export const TYPE_SCALE = {
  priceHero: { fontFamily: 'SpaceGrotesk', fontSize: 32, fontWeight: '700' },
  h1:        { fontFamily: 'SpaceGrotesk', fontSize: 24, fontWeight: '700' },
  h2:        { fontFamily: 'SpaceGrotesk', fontSize: 20, fontWeight: '600' },
  h3:        { fontFamily: 'SpaceGrotesk', fontSize: 17, fontWeight: '600' },
  price:     { fontFamily: 'SpaceGrotesk', fontSize: 18, fontWeight: '700' },
  body:      { fontFamily: 'IBMPlexSans',  fontSize: 14, fontWeight: '400' },
  bodySemi:  { fontFamily: 'IBMPlexSans',  fontSize: 14, fontWeight: '600' },
  caption:   { fontFamily: 'IBMPlexSans',  fontSize: 12, fontWeight: '400' },
  overline:  { fontFamily: 'IBMPlexSans',  fontSize: 11, fontWeight: '600',
               letterSpacing: 0.8, textTransform: 'uppercase' },
} as const;
```

## Spacing (base-4 grid)
```ts
export const SPACE = {
  xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32, section: 40,
} as const;
```

## Radii & Shadows
```ts
export const RADIUS = { sm: 8, md: 12, lg: 16, pill: 999 } as const;

export const SHADOW = {
  card: { shadowColor: '#14221A', shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  elevated: { shadowColor: '#14221A', shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.14, shadowRadius: 12, elevation: 6 },
} as const;
```

## Motion
```ts
export const DURATION = {
  nav:     380,  // screen pushes, tab switches
  overlay: 300,  // sheets, modals, toasts
  micro:   180,  // button press, toggle, badge
} as const;
```

## Trader-specific badge palette
```ts
// Loan status
PENDING   → { bg: '#FFF4E0', text: marigold }
APPROVED  → { bg: '#E6F7ED', text: ripe }
ACCEPTED  → { bg: leaf,      text: paper }
DISBURSED → { bg: pine,      text: paper }
REJECTED  → { bg: '#FDEAEA', text: chili }
SETTLED   → { bg: hairline,  text: label }

// Voucher status
ACTIVE    → { bg: '#E6F7ED', text: ripe }
USED      → { bg: hairline,  text: label }
EXPIRED   → { bg: '#FDEAEA', text: chili, border: chili }
MATURED   → { bg: pine,      text: paper }
SUSPENDED → { bg: '#FFF4E0', text: marigold }
SETTLED   → { bg: hairline,  text: label }

// Delegation status
NOT_REQUESTED → { bg: hairline,  text: label }
PENDING       → { bg: '#FFF4E0', text: marigold }
APPROVED      → { bg: '#E6F7ED', text: ripe }
ACCEPTED      → { bg: leaf,      text: paper }

// Voucher type chip (shows discount %)
DISCOUNT_10  → leaf text, oat bg
DISCOUNT_20  → leaf text, oat bg
DISCOUNT_50  → pine text, '#E4F1EA' bg
DISCOUNT_80  → paper text, pine bg
DISCOUNT_100 → paper text, '#0A3520' bg
```

## Permitted off-token values
- MTN MoMo yellow `#FFCC00` — payment logo only
- Airtel red `#E40000` — payment logo only
- Modal backdrop `rgba(0,0,0,0.4)` — structural scrim only
- Monospace font `Platform.OS === 'ios' ? 'Courier New' : 'monospace'`
  — OTP input and voucher code display only

## Rules
- Never hardcode a hex in a component — always `colors.leaf` etc.
- Never `StyleSheet.create` with hardcoded tokens — use `useTheme()`.
- `marigold` = CTAs and current-step only. Never for status highlighting
  unless the spec explicitly says PENDING uses marigold.
- All prices and RWF amounts: SpaceGrotesk 600/700, `formatRwf()`.
- `disabled` color is NEVER used for text — borders/controls only.
