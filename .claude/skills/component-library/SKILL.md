# SKILL: Component Library

All components live in `src/components/`. Every file ≤ 200 lines.

## Primitives — src/components/ui/

### Button
Variants: `primary` (marigold bg, ink text) | `secondary` (paper, leaf border+text) |
`destructive` (chili bg, paper text) | `ghost` (transparent, leaf text)
Sizes: `sm` (36px h) | `md` (44px h) | `lg` (52px h)
- Always pill/rounded-rectangle. Never a plain circle.
- Loading state: ActivityIndicator, disabled press.
- Min tap area: 44×44 always.

### Badge / StatusChip
Use the palette defined in design-system SKILL.
Always pill shape, `bodySemi` font, uppercase text.
`LoanStatusBadge`, `VoucherStatusBadge`, `DelegationStatusBadge` are
separate components — they each pull from their own colour map.
Never reuse OrderStatusBadge for non-order statuses.

### Card
background: paper, radius: RADIUS.md, ...SHADOW.card
`elevated` prop: ...SHADOW.elevated

### Input / AmountInput
- border: hairline, focused: leaf, error: chili
- height: 48px minimum
- `AmountInput`: numeric, formats as thousands-separated on blur,
  shows "RWF" suffix inline, uses SpaceGrotesk for the number.

### OTPInput
- 6 boxes, auto-advance on digit entry
- Box: 48×56, radius RADIUS.sm, border hairline → focused leaf
- Mask digits after 1s delay (password-style)
- `onComplete(code: string)` callback

### DataList
Powered by FlashList (`expo install @shopify/flash-list`).
Props: `data`, `renderItem`, `keyExtractor`, `isLoading`, `isEmpty`,
       `emptyMessage`, `onRefresh`, `pagination`
Loading → renders SkeletonRow × 5
Empty → renders EmptyState
Error → renders ErrorState with retry

### StatCard
```ts
interface StatCardProps {
  label: string;
  value: string;        // pre-formatted (RWF or count)
  delta?: string;       // "+12%" — ripe if positive, chili if negative
  deltaTone?: 'ripe' | 'chili' | 'marigold';
  icon?: React.ReactNode;
  onPress?: () => void;
}
```
4-across on tablet, 2-across on phone.
Trader-specific variants:
- `WalletCard` — large, pine bg, paper text, full-width. Shows balance
  + available balance + pending. "Top Up" and "Withdraw" buttons inline.
- `CommissionCard` — shows earned, pending, rate, mode badge.

### SkeletonRow
Shimmer (opacity 0.4→0.9→0.4, 1200ms loop). Shaped like the target item.

### EmptyState / ErrorState
EmptyState: icon + specific message + optional action button.
ErrorState: chili icon + message + "Try again" button.
Never generic "No data" — always domain-specific copy from t().

## Layout — src/components/layout/

### TraderShell
Root layout for all authenticated trader screens.
Bottom tab bar (5 items), SafeAreaView-aware header with title + bell.
No drawer — trader nav is bottom-tab only (fewer sections than admin).

### BottomTabBar
5 tabs: Dashboard | Loans | Vouchers | Orders | Settings
Active: leaf icon + leaf text. Inactive: label icon + label text.
Tab bar height: 56px + bottom inset. Min tap area per tab: 44px wide.
The tab bar is hidden on: Agreement screen, OTP screens, detail sheets.

### Header
- Left: back arrow (44×44) or hamburger depending on screen
- Centre: screen title (h2 via SpaceGrotesk)
- Right: NotificationBell (44×44) + avatar (32×32 circle)
- Sticky, does not scroll.

## Financial components — src/components/modals/

### TopUpSheet (bottom sheet, 60% height)
Mirrors `app/_components/TopUpModal.tsx` from web app:
- Amount input (AmountInput)
- Payment method selector: MTN MoMo (logo tile) | Airtel Money (logo tile)
  → selecting MoMo/Airtel shows phone number field below
- "Top Up" primary button → OTP step → success/failure state
- Phone field: pre-filled with trader's registered phone, editable

### WithdrawSheet (bottom sheet, 85% height)
Mirrors `app/_components/WithdrawModal.tsx`:
- Withdraw type toggle: "Wallet Balance" | "Commission"
  → shows relevant balance figure
- Amount input (max = available amount, enforced)
- Payment method: Mobile Money | Bank Transfer
- Account name + account number fields
- "Request Withdrawal" → OTP step → "Pending admin approval" confirmation
- "Note: Withdrawals require admin approval before funds are released"

### ApproveLoanSheet (bottom sheet, 85% height)
Mirrors `app/credit/_components/ApproveLoanModal.tsx`:
- Restaurant name + requested amount (read-only header)
- Approved amount (AmountInput, max = requested, min = 0)
- Voucher type selector (5 options: DISCOUNT_10/20/50/80/100)
  → shows what discount % the restaurant gets
- Repayment days (slider: 7/14/21/30 days)
- Notes field (optional)
- Commission preview: "You earn X% on RWF Y utilized"
- "Approve Loan" primary button → ConfirmDialog → success state
- Only renders if trader's wallet has sufficient balance

### VoucherDetailsSheet (bottom sheet, 85% height)
Mirrors `app/vouchers/_components/voucher-details-dialog.tsx`:
- Voucher code (monospace, large, leaf)
- Type chip + status badge side by side
- Credit bar: used/total (leaf fill bar)
- Key figures: creditLimit, usedCredit, remainingCredit, commission%
- Repayment: dueDate, daysOverdue (chili if > 0), penalty amount
- Transactions list (last 5): order number + amount + date
- "View linked loan" link → navigates to loan detail

## Notification components — src/components/notifications/

### NotificationBell
Unread badge (marigold dot, max "99+"). Tapping opens NotificationDrawer.
Poll every 30s in background (from notificationStore — do NOT duplicate).

### NotificationDrawer (bottom sheet, 85%)
Mirrors `app/_components/notificationDrawer.tsx`:
- "Mark all read" action top-right
- List: icon + title + body + relative time
- Each item tappable → navigates to relevant screen

## Charts — src/components/charts/
Use victory-native (`expo install victory-native`).

### AreaChart
Single or dual series. Animated draw-in 800ms. Height default 180.
Used on dashboard for transaction history over time.

### BarChart
Commission breakdown by month. Height default 160.

### Sparkline
60×28 mini line. Used in stat cards (commission trend).

## Rules
- Every list screen: loading, empty, and error states — no exceptions.
- All icon usage: Ionicons from `@expo/vector-icons` — consistently one library.
- Never `TouchableOpacity` directly — wrap in `Button` or `PressableRow`.
- Press state: scale 0.97 + opacity 0.82, 180ms, via Reanimated.
