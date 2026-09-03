# SKILL: Accessibility & i18n

---

## Accessibility

### Tap targets
Minimum **44×44 logical pixels** on every interactive element.
For visually small icons: `style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}`

### Labels (required on every interactive element without visible text)
```ts
accessibilityLabel="Approve loan for Kigali Bistro"
accessibilityRole="button"
```
Examples:
- Top Up button: `accessibilityLabel="Top up wallet"`
- Withdraw: `accessibilityLabel="Request withdrawal"`
- Approve loan: `accessibilityLabel="Approve loan application for [restaurant name]"`
- Voucher row: `accessibilityLabel="Voucher [code], [status], [remaining] RWF remaining"`
- Back: `accessibilityLabel="Go back"`
- Notification bell: `accessibilityLabel="Notifications, [N] unread"`

### Contrast (never use forbidden values)
- `ink` (#14221A) on `paper` (#FFFFFF): ✅ 17.4:1
- `label` (#6B746D) on `paper`: ✅ 4.61:1 — use for secondary text
- `label` on `oat` (#F6F5F1): ✅ 4.43:1 — acceptable
- **FORBIDDEN for text**: `disabled` (#C7CCC6) = 1.63:1 — borders only
- **FORBIDDEN**: `#9AA39C` = 2.59:1 — never use
- `paper` on `leaf` (#17683F): ✅ 6.2:1 — white text on green is safe
- `ink` on `marigold` (#F5A524): ✅ 5.9:1 — safe for CTA labels

### Keyboard (iPad + physical keyboard users)
- `returnKeyType="next"` on all form fields but last
- `focus()` on next ref on submit
- Pressable: `onKeyDown` handler for Enter/Space

### Screen reader
- `FlatList`/`FlashList`: `accessible={true}` per item
- Modals/sheets: trap focus. Return focus to trigger on close.
- `accessibilityHint` on destructive actions:
  `accessibilityHint="This will reverse your delegation agreement"`

---

## i18n

### Languages
English (EN), Kinyarwanda (RW), French (FR).
Default: EN. Saved to AsyncStorage `'traderLanguage'`.

### Files
```
src/i18n/
  en.ts    — source of truth
  rw.ts    — Kinyarwanda
  fr.ts    — French
  index.ts — useI18n hook + LanguageContext
```

### Hook
```ts
export function useI18n(): (key: TranslationKey) => string;
const t = useI18n();
<Text>{t('loans.title')}</Text>
```

### Required keys (add more as screens require)
```ts
// Navigation
'nav.dashboard'       // Dashboard / Aho Ukora / Tableau de bord
'nav.loans'           // Loans / Inguzanyo / Prêts
'nav.vouchers'        // Vouchers / Tikets / Bons
'nav.orders'          // Orders / Amabisuriro / Commandes
'nav.settings'        // Settings / Igenamiterere / Paramètres

// Loan statuses
'status.pending'      // Pending / Irategerezwa / En attente
'status.approved'     // Approved / Yemejwe / Approuvé
'status.accepted'     // Accepted / Yemewe / Accepté
'status.disbursed'    // Disbursed / Yatanzwe / Décaissé
'status.rejected'     // Rejected / Yanzwe / Rejeté
'status.settled'      // Settled / Yarangiye / Réglé

// Voucher statuses
'vStatus.active'      // Active / Akora / Actif
'vStatus.used'        // Used / Yakoreshejwe / Utilisé
'vStatus.expired'     // Expired / Yarashize / Expiré
'vStatus.matured'     // Matured / Yarashoboye / Mature
'vStatus.suspended'   // Suspended / Guhagaritswe / Suspendu
'vStatus.settled'     // Settled / Yarangiye / Réglé

// Delegation
'delegation.status'          // Delegation Status / ...
'delegation.notRequested'    // Not requested / ...
'delegation.pending'         // Pending approval / ...
'delegation.approved'        // Approved — accept now / ...
'delegation.accepted'        // Active — FB trading on your behalf / ...
'delegation.request'         // Request Delegation / ...
'delegation.accept'          // Accept Delegation / ...
'delegation.reverse'         // Reverse Delegation / ...

// Commission
'commission.mode'    // Commission Mode / ...
'commission.normal'  // Standard (margin on voucher use) / ...
'commission.fixed'   // Fixed ROI on deposited capital / ...
'commission.rate'    // Commission Rate / ...
'commission.earned'  // Earned this month / ...
'commission.pending' // Pending payout / ...

// Wallet
'wallet.balance'     // Wallet Balance / ...
'wallet.available'   // Available / ...
'wallet.pending'     // Pending Approved / ...
'wallet.topUp'       // Top Up / ...
'wallet.withdraw'    // Withdraw / ...

// Common
'common.loading'     // Loading... / Birategerezwa... / Chargement...
'common.error'       // Something went wrong / ... / ...
'common.retry'       // Try again / Gerageza ukundi / Réessayer
'common.save'        // Save / Bika / Enregistrer
'common.cancel'      // Cancel / Hagarika / Annuler
'common.confirm'     // Confirm / Emeza / Confirmer
'common.back'        // Back / Subira / Retour
'common.viewAll'     // View all / Reba byose / Voir tout
'common.approve'     // Approve / Emeza / Approuver
'common.reject'      // Reject / Siba / Rejeter

// Agreement
'agreement.title'    // Digital Food Store Owner Agreement / ...
'agreement.accept'   // Accept & Continue / ...
'agreement.checkbox' // I have read and agree to the terms / ...
```

### Rules
- Every string in the UI comes from `t()`. Never hardcode English copy in components.
- Mock data (names, amounts) stays in English — only chrome strings are translated.
- Currency format is language-agnostic: `1,240,000 RWF` always.
- Dates: EN = "28 Aug 2026", FR = "28 août 2026", RW = "28 Kanama 2026"
  → use `formatDate(isoString, lang)` from `src/lib/date.ts`.
- Language switcher: in Settings screen, segmented EN | Kinyarwanda | FR.
  Persists to AsyncStorage `'traderLanguage'`.
