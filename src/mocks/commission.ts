/**
 * 6 months of commission breakdown + aggregate trader stats.
 * Sum of `earned` across months matches MOCK_WALLET.commissionEarned less
 * the two still-PENDING transactions in mocks/wallet.ts.
 */
import type { CommissionMonth, TraderStats } from "../types/domain-extra";

export const MOCK_COMMISSION_MONTHS: CommissionMonth[] = [
  { month: "2026-04-01T00:00:00Z", earned: 42000, paid: 42000, pending: 0, voucherCount: 4 },
  { month: "2026-05-01T00:00:00Z", earned: 58000, paid: 58000, pending: 0, voucherCount: 5 },
  { month: "2026-06-01T00:00:00Z", earned: 61000, paid: 61000, pending: 0, voucherCount: 5 },
  { month: "2026-07-01T00:00:00Z", earned: 34100, paid: 34100, pending: 0, voucherCount: 3 },
  { month: "2026-08-01T00:00:00Z", earned: 146800, paid: 146800, pending: 0, voucherCount: 6 },
  { month: "2026-09-01T00:00:00Z", earned: 43200, paid: 0, pending: 43200, voucherCount: 3 },
];

export const MOCK_TRADER_STATS: TraderStats = {
  totalTransactions: 20,
  loanApprovals: 8,
  commissionsEarned: 385100,
  commissionsPaid: 341900,
  totalLoansApproved: 8,
};
