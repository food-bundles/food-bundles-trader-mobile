# SKILL: Mock Data

## Principles
- All mock data in `src/mocks/`. One file per domain. ≤ 200 lines each.
- No fetch, no axios. Everything imported directly.
- Data must be internally consistent and cross-referenced.
- All amounts: RWF integers, formatted via `formatRwf()`.
- All dates: ISO 8601 strings.

## Required mock files

### src/mocks/auth.ts
```ts
export const MOCK_TRADER: TraderUser = {
  id: 'trader-001',
  username: 'Jean Pierre Habimana',
  email: 'jp.habimana@foodbundles.rw',
  phone: '+250 788 123 456',
  role: 'TRADER',
  profileImage: 'https://i.pravatar.cc/150?img=33',
  agreementAccepted: true,
  twoFactorEnabled: false,
};
```

### src/mocks/wallet.ts
```ts
export const MOCK_WALLET: TraderWallet = {
  id: 'wallet-001',
  traderId: 'trader-001',
  balance: 4850000,                  // 4,850,000 RWF
  pendingApprovedAmount: 1200000,    // 1,200,000 RWF in active vouchers
  commissionEarned: 385000,          // 385,000 RWF total earned
  commission: 8,                     // 8% commission rate
  totalDeposited: 8000000,
  currency: 'RWF',
  isActive: true,
  availableBalance: 3650000,         // balance - pendingApprovedAmount
  totalVouchersAmount: 3200000,
  totalVouchersCount: 12,
  commissionMode: 'NORMAL',
};

// 20 transactions: mix of types and statuses over last 30 days
export const MOCK_TRANSACTIONS: TraderTransaction[] = [...];
// Types: TOP_UP / COMMISSION_CREDIT / VOUCHER_UTILIZATION / WITHDRAWAL
// Statuses: PENDING / COMPLETED / FAILED
```

### src/mocks/loans.ts
```ts
// 10 loan applications, mix of all 6 statuses
// Each: id, restaurantId, restaurantName, requestedAmount, purpose,
//       repaymentDays, status, approvedAmount?, notes?, createdAt
// Recurring restaurants: rest-001 (Kigali Bistro), rest-002 (Imboni),
//   rest-003 (Laza), rest-004 (Sole Luna)
// requestedAmount range: 50,000 – 500,000 RWF
```

### src/mocks/vouchers.ts
```ts
// 12 vouchers across all 6 statuses
// Each: id, voucherCode ('FB-' + 8 alphanum), voucherType, discountPercentage,
//       creditLimit, totalCredit, usedCredit, remainingCredit, status,
//       commission%, expiryDate (12h from issue for ACTIVE),
//       issuedDate, restaurantId, restaurantName, loanId,
//       repaymentDays, serviceFeeRate, transactions[]
// voucherCode format: 'FB-X7K2M9QP'
// Link each voucher to a loan from loans.ts via loanId
// 3 ACTIVE vouchers have transactions (simulate partial use)
```

### src/mocks/orders.ts
```ts
// 15 orders, each linked to a voucher from vouchers.ts
// Each: id, orderNumber ('ORD-' + 5 digits), restaurantId, restaurantName,
//       status (6-step + 2 terminal), totalAmount, paymentMethod: 'VOUCHER',
//       voucherCode, discountPercentage, billingName, billingPhone,
//       orderItems[] (3-5 items each with productName, qty, unitPrice,
//       subtotal, unit, imageUri (Unsplash URL)), createdAt
// imageUri per item: specific — not generic. Match product to photo:
//   'Irish Potatoes' → 'https://images.unsplash.com/photo-1518977676405-7571ef02e5ee?w=120'
//   'Tomatoes' → 'https://images.unsplash.com/photo-1561136594-7f68813d8fb5?w=120'
//   'Cabbage' → 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=120'
//   'Onions' → 'https://images.unsplash.com/photo-1508747703725-719777637510?w=120'
//   'Carrots' → 'https://images.unsplash.com/photo-1447175008436-054170c2e979?w=120'
```

### src/mocks/delegation.ts
```ts
export const MOCK_DELEGATION_STATUS: DelegationStatus = {
  delegationRequestedAt: '2026-07-01T09:00:00Z',
  delegationApprovedAt: '2026-07-02T14:30:00Z',
  delegationApprovedBy: 'admin-001',
  delegationAcceptedAt: '2026-07-02T15:00:00Z',
  canTradeOnBehalf: true,
  commission: 8,
  delegationStatus: 'ACCEPTED',
  status: 'ACCEPTED',
};

// 8 delegation history events: REQUESTED / APPROVED / ACCEPTED / REVERSED
// Each: id, event, timestamp, note, traderId, adminId (if applicable)
```

### src/mocks/notifications.ts
```ts
// 10 notifications
// Types: LOAN_REQUEST / LOAN_APPROVED / VOUCHER_USED /
//        REPAYMENT_DUE / WITHDRAWAL_APPROVED / SYSTEM
// Each: id, type, title, body, deepLink, timestamp, read
```

### src/mocks/commission.ts
```ts
// 6 months of commission breakdown
// Each month: month (ISO), earned, paid, pending, voucherCount
// Plus: stats: totalTransactions, loanApprovals, commissionsEarned,
//              commissionsPaid, totalLoansApproved
```

### src/mocks/withdrawals.ts
```ts
// 5 withdrawal requests: 2 PENDING / 2 COMPLETED / 1 CANCELLED
// Each: id, type (BALANCE/COMMISSION), amount, status, paymentMethod,
//       accountName, accountNumber, createdAt, otpVerified
```

## Cross-reference checklist
- [ ] Every voucher's loanId matches a loan in loans.ts
- [ ] Every voucher's restaurantId matches an order's restaurantId
- [ ] Every order's voucherCode matches a voucher in vouchers.ts
- [ ] wallet.pendingApprovedAmount = sum of ACTIVE vouchers' remainingCredit
- [ ] wallet.availableBalance = balance - pendingApprovedAmount
- [ ] wallet.commissionEarned matches sum of commission mock data
- [ ] Delegation mock status is internally consistent (dates in order)
