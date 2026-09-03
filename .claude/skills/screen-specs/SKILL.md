# SKILL: Screen Specifications

All screens derived from the real web app in `design-reference/trader-app/`.
Read the corresponding source file before implementing each screen.
Mobile adapts layout for phone form factor, preserves all data and logic.

## Rules for every screen
- Loading: skeleton shaped like final content
- Error: ErrorState with retry
- Populated: real data from mocks
- Empty: EmptyState with specific, helpful message

---

## SCREEN: Dashboard (Home)
Source: `app/page.tsx`, `app/services/traderService.ts` (getDashboardStats, getWallet, getTransactions)

Layout (ScrollView):
1. **WalletCard** (full-width, pine bg, paper text):
   - "Wallet Balance" label + large balance figure (SpaceGrotesk 700 32px)
   - Row: Available | Pending Approved (2 columns with labels)
   - Row: "Top Up" (marigold button) | "Withdraw" (secondary button)
   - Tapping Top Up → TopUpSheet. Withdraw → WithdrawSheet.

2. **Stats row** (2-col grid):
   - Active Vouchers (count, ripe if > 0)
   - Total Loans Approved (count)
   - Commission Earned (RWF, leaf)
   - Pending Commission (RWF, marigold if > 0)

3. **Commission card**:
   - Mode badge (NORMAL/FIXED), rate %, commission earned this month
   - Sparkline (last 6 months commission trend)
   - "View settings" → Settings screen

4. **Recent transactions** (last 5, tappable → full list):
   - Type icon + description + amount (green if credit, grey if debit) + date
   - "View all transactions →" link

5. **Delegation status banner** (if status is PENDING or ACCEPTED):
   - PENDING: amber banner "Delegation approval pending from Food Bundles"
   - ACCEPTED: leaf banner "Food Bundles is approving loans on your behalf"
   - Tapping → Settings → Delegation screen

---

## SCREEN: Loan Applications
Source: `app/credit/page.tsx`, `app/credit/_components/loan-columns.tsx`,
        `app/credit/_components/ApproveLoanModal.tsx`

Header: StatCards — Total | Pending (marigold) | Approved | Rejected

Filters: All | Pending | Approved | Accepted | Disbursed | Rejected | Settled
Search: by restaurant name or loan ID

Each row (tappable → Loan Detail):
- Restaurant name
- Requested amount (SpaceGrotesk 700, leaf)
- Status badge (LoanStatusBadge)
- Purpose (truncated to 1 line)
- Submitted date (relative)
- Repayment days

---

## SCREEN: Loan Detail
Source: `app/credit/_components/ApproveLoanModal.tsx`

Sections (ScrollView):
1. Header: restaurant name + loan ID + status badge + submitted date
2. Loan info card: requested amount, purpose, repayment days
3. Restaurant info: name, email (tap-to-copy)
4. "Approve" button (primary, marigold) — only visible if status is PENDING
   and trader has sufficient wallet balance. Tapping → ApproveLoanSheet.
5. Linked vouchers section (if approved): list of vouchers issued for this loan,
   each with status badge + remaining credit + expiry
6. Notes (if any): read-only text card

---

## SCREEN: Vouchers
Source: `app/vouchers/page.tsx`, `app/vouchers/_components/voucher-columns.tsx`,
        `app/vouchers/_components/voucher-details-dialog.tsx`

Tabs: Approved Vouchers | Expired Vouchers
(Approved = ACTIVE + USED + SETTLED + MATURED statuses)
(Expired = EXPIRED status)

Search: by voucher code or restaurant name

Each row (tappable → VoucherDetailsSheet):
- Voucher code (monospace, leaf)
- Restaurant name
- Voucher type chip (DISCOUNT_XX)
- Status badge
- Credit bar (inline, leaf fill, shows used/total)
- Expiry date (chili if expired or < 2h remaining)

---

## SCREEN: Voucher Detail [id].tsx
Source: `app/vouchers/_components/voucher-details-dialog.tsx`

Full screen (not sheet on this route — sheet used when accessed from list).

Sections (ScrollView):
1. Code + type + status (header)
2. Credit summary:
   - Total credit limit (RWF, large SpaceGrotesk)
   - Credit bar: used / total (leaf fill, animated on mount)
   - Used credit (RWF) | Remaining credit (RWF) | Discount rate
3. Repayment info:
   - Repayment due date
   - Days overdue (chili if > 0) + penalty amount (chili)
   - Service fee rate
4. Transaction history (all, paginated):
   - Each: order number + original amount + discount + charged + date
5. "View linked loan" → loan detail

---

## SCREEN: Orders
Source: `app/orders/page.tsx`, `app/orders/_components/order-columns.tsx`

Filters: All | Confirmed | Pending | Delivered | Cancelled
Search: by order number, restaurant name, billing name

Each row (tappable → Order Detail):
- Order number (SpaceGrotesk, leaf)
- Restaurant name
- Status badge
- Total amount (SpaceGrotesk 700)
- Voucher code used (monospace, small)
- Date (relative)

---

## SCREEN: Order Detail [id].tsx
Sections (ScrollView):
1. Header: order number + status badge + date
2. Restaurant: name, phone, email
3. Items list: each row has 48×48 photo + name + qty × unit + unit price + subtotal
4. Voucher applied: code + type + discount % + "Saved: X RWF" (ripe)
5. Totals: subtotal, discount amount (ripe), final total
6. Payment info: method + reference
7. Billing: name + phone + email

---

## SCREEN: Settings Index
Source: `app/settings/manage/page.tsx`

Layout (ScrollView):
1. Info card: Delegation Status + Commission Mode + Commission Rate (3-col)
2. Nav list (each tappable row with right arrow):
   - Delegation Settings → delegation.tsx
   - Commission Settings → commission.tsx
   - Delegation History → delegation-history.tsx
   - Authenticator (2FA) → authenticator.tsx
   - Language → language preference sheet

---

## SCREEN: Delegation Settings
Source: `app/settings/manage/_component/DelegationSettings.tsx`

States (3, mutually exclusive):
1. NOT_REQUESTED: "Delegate to Food Bundles" explainer + "Request Delegation" button
   - Explains: "Food Bundles will approve loans on your behalf while you earn commission"
2. PENDING: amber card "Awaiting Food Bundles approval" + "Cancel request" link
3. APPROVED: "Accept delegation" primary button + OTP step (6-digit code sent to phone)
4. ACCEPTED: leaf card "Active — Food Bundles is trading on your behalf" +
   "Reverse Delegation" destructive button → ConfirmDialog

---

## SCREEN: Commission Settings
Source: `app/settings/manage/_component/CommissionSettings.tsx`

Current mode badge (NORMAL / FIXED) + description of each:
- NORMAL: earn X% on voucher credit actually utilized by restaurant
- FIXED: earn Y% monthly ROI on deposited principal regardless of voucher usage

Toggle button: "Switch to FIXED" / "Switch to NORMAL"
→ ConfirmDialog (explains implications) → OTP verification → success

Commission rate: current rate + "Negotiated by Food Bundles" note

---

## SCREEN: Delegation History
Source: `app/settings/delegation-history/_component/DelegationHistory.tsx`

Paginated event log. Each row:
- Event type icon + event name (REQUESTED/APPROVED/ACCEPTED/REVERSED)
- Timestamp (relative)
- Note (if any)

---

## SCREEN: Authenticator (2FA)
Source: `app/settings/authenticator/_components/authenticator-management.tsx`

Same pattern as admin and restaurant apps:
- Generate TOTP secret via expo-crypto
- QR code via react-native-qrcode-svg
- Show raw secret + copy button
- 6-digit OTP input → validate → enable
- If already enabled: show status + "Disable" destructive button

---

## SCREEN: Agreement
Source: `app/agreement/page.tsx`

Full-screen, no tab bar.
- FoodBundles logo at top
- "Digital Food Store Owner Agreement" heading
- Full legal text (ScrollView, monospaced body font NOT required — use IBMPlexSans body)
- Fixed "I have read and agree to the terms" checkbox at bottom
- "Accept & Continue" button (disabled until checkbox checked + user has scrolled to bottom)
- Cannot be dismissed or back-navigated until accepted

---

## SCREEN: Forgot Password
Source: `app/forgot-password/page.tsx`

Email/phone field + "Send reset link" button.
Success: "Check your inbox" confirmation card.
Back arrow → Login.
