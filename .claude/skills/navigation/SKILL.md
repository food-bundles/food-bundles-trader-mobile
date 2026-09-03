# SKILL: Navigation

## Stack
Expo Router (file-based) + React Navigation bottom tabs.

## Route structure
```
app/
  _layout.tsx                   # Root: fonts, ThemeProvider, StoreProvider

  (auth)/
    _layout.tsx                 # Stack, no shell, no tab bar
    login.tsx
    forgot-password.tsx

  agreement/
    index.tsx                   # Full-focus — no tab bar, no header bell
                                # Redirects here if agreement not accepted

  (trader)/
    _layout.tsx                 # Bottom tab navigator + auth/agreement guard
                                # Reads authStore; redirects to login if no session
                                # Reads agreementStore; redirects to agreement if not accepted

    dashboard/
      index.tsx                 # Wallet cards, commission, recent txns, stats

    loans/
      index.tsx                 # Loan applications list (all statuses, filters)
      [id].tsx                  # Loan detail + approve action + linked vouchers

    vouchers/
      index.tsx                 # Active/Expired tabs
      [id].tsx                  # Voucher detail + transactions + repayment info

    orders/
      index.tsx                 # Orders list (search + status filter)
      [id].tsx                  # Order detail: items with images, voucher used, totals

    settings/
      index.tsx                 # Delegation status card + commission card + nav list
      delegation.tsx            # Request / Accept (OTP) / Reverse delegation
      commission.tsx            # Toggle NORMAL/FIXED + commission rate
      delegation-history.tsx    # Paginated delegation event log
      authenticator.tsx         # 2FA: QR setup, verify, enable/disable
      notifications.tsx         # Notification preferences (placeholder)
```

## Tab bar items (exact order)
```
Dashboard (house icon)
Loans (document-text icon)
Vouchers (ticket icon)
Orders (cube icon)
Settings (settings icon)
```

## Navigation patterns

### Stack push (Expo Router)
```ts
import { router } from 'expo-router';
router.push('/(trader)/loans/loan-001');
router.back();
router.replace('/(trader)/dashboard');
```

### Agreement redirect
In `(trader)/_layout.tsx`:
```ts
const { agreementAccepted } = useAgreementStore();
if (!agreementAccepted) {
  return <Redirect href="/agreement" />;
}
```
Agreement screen has no tab bar — it renders outside the `(trader)` group.
After accepting: `agreementStore.accept()` → `router.replace('/(trader)/dashboard')`.

### Full-focus screens (no tab bar)
- Agreement acceptance
- OTP verification (TopUp / Withdraw / ApproveLoan all use a shared OTPScreen)
- Any sheet that presents as a full screen on small phones

### Back navigation
Every detail screen ([id].tsx): back arrow in header (44×44).
Never rely on OS gesture only.

### Deep links from notifications
- Loan application → `/(trader)/loans/[id]`
- Voucher → `/(trader)/vouchers/[id]`
- Order → `/(trader)/orders/[id]`
- Withdrawal status → `/(trader)/settings`

## Transitions
- Tab switch: cross-fade, 300ms.
- Stack push: slide from right, 380ms, enter easing.
- Sheet: slide up from bottom, 300ms.
- Agreement → Dashboard: fade (not slide — it's a one-way gate crossing).

## Guards
```ts
// In (trader)/_layout.tsx:
const { user } = useAuthStore();
if (!user) return <Redirect href="/(auth)/login" />;
if (user.role !== 'TRADER') return <WrongRoleScreen />;
if (!agreementAccepted) return <Redirect href="/agreement" />;
```

## Safe area
All screens: `<SafeAreaView edges={['bottom']}>`.
The TraderShell header handles the top inset.
Tab bar: always add `insets.bottom` to its height.
