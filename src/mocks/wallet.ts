/**
 * Mock wallet + 20 transactions. pendingApprovedAmount is the sum of ACTIVE
 * vouchers' remainingCredit (voucher-001 140000 + voucher-002 120000 +
 * voucher-003 130000 = 390000); availableBalance = balance - pending.
 */
import type { TraderWallet, TraderTransaction } from "../types/domain";

export const MOCK_WALLET: TraderWallet = {
  id: "wallet-001",
  traderId: "trader-001",
  balance: 4850000,
  pendingApprovedAmount: 390000,
  commissionEarned: 385000,
  commission: 8,
  totalDeposited: 8000000,
  currency: "RWF",
  isActive: true,
  availableBalance: 4460000,
  totalVouchersAmount: 3200000,
  totalVouchersCount: 12,
  commissionMode: "NORMAL",
};

export const MOCK_TRANSACTIONS: TraderTransaction[] = [
  { id: "tx-001", traderId: "trader-001", type: "TOP_UP", amount: 2000000, description: "Wallet top-up via MTN MoMo", status: "COMPLETED", createdAt: "2026-08-01T08:00:00Z" },
  { id: "tx-002", traderId: "trader-001", type: "VOUCHER_UTILIZATION", amount: -350000, voucherId: "voucher-001", loanId: "loan-001", description: "Loan approved for Kigali Bistro", status: "COMPLETED", createdAt: "2026-08-10T10:00:00Z" },
  { id: "tx-003", traderId: "trader-001", type: "COMMISSION_CREDIT", amount: 28000, voucherId: "voucher-001", description: "Commission from voucher FB-X7K2M9QP", status: "PENDING", createdAt: "2026-09-03T09:30:00Z" },
  { id: "tx-004", traderId: "trader-001", type: "VOUCHER_UTILIZATION", amount: -180000, voucherId: "voucher-002", loanId: "loan-002", description: "Loan approved for Imboni Restaurant", status: "COMPLETED", createdAt: "2026-08-20T11:00:00Z" },
  { id: "tx-005", traderId: "trader-001", type: "COMMISSION_CREDIT", amount: 4800, voucherId: "voucher-002", description: "Commission from voucher FB-M3P8L1WZ", status: "PENDING", createdAt: "2026-09-03T10:15:00Z" },
  { id: "tx-006", traderId: "trader-001", type: "WITHDRAWAL", amount: -500000, withdrawType: "BALANCE", description: "Withdraw request: 500,000 RWF from balance", status: "COMPLETED", createdAt: "2026-08-25T14:00:00Z" },
  { id: "tx-007", traderId: "trader-001", type: "VOUCHER_UTILIZATION", amount: -260000, voucherId: "voucher-003", loanId: "loan-007", description: "Loan approved for Laza Kitchen", status: "COMPLETED", createdAt: "2026-08-18T15:00:00Z" },
  { id: "tx-008", traderId: "trader-001", type: "COMMISSION_CREDIT", amount: 10400, voucherId: "voucher-003", description: "Commission from voucher FB-Q9T4R2NB", status: "PENDING", createdAt: "2026-09-03T15:00:00Z" },
  { id: "tx-009", traderId: "trader-001", type: "TOP_UP", amount: 1500000, description: "Wallet top-up via Airtel Money", status: "COMPLETED", createdAt: "2026-08-05T09:00:00Z" },
  { id: "tx-010", traderId: "trader-001", type: "VOUCHER_UTILIZATION", amount: -150000, voucherId: "voucher-004", loanId: "loan-010", description: "Loan approved for Imboni Restaurant", status: "COMPLETED", createdAt: "2026-08-12T09:00:00Z" },
  { id: "tx-011", traderId: "trader-001", type: "COMMISSION_CREDIT", amount: 12000, voucherId: "voucher-004", description: "Commission from voucher FB-J5H7C3XD", status: "COMPLETED", createdAt: "2026-08-13T08:00:00Z" },
  { id: "tx-012", traderId: "trader-001", type: "WITHDRAWAL", amount: -85000, withdrawType: "COMMISSION", description: "Withdraw request: 85,000 RWF from commission", status: "PENDING", createdAt: "2026-09-02T16:00:00Z" },
  { id: "tx-013", traderId: "trader-001", type: "VOUCHER_UTILIZATION", amount: -410000, voucherId: "voucher-007", loanId: "loan-009", description: "Loan approved for Kigali Bistro", status: "COMPLETED", createdAt: "2026-08-26T12:00:00Z" },
  { id: "tx-014", traderId: "trader-001", type: "TOP_UP", amount: 1000000, description: "Wallet top-up via MTN MoMo", status: "COMPLETED", createdAt: "2026-08-15T07:30:00Z" },
  { id: "tx-015", traderId: "trader-001", type: "VOUCHER_UTILIZATION", amount: -260000, voucherId: "voucher-010", loanId: "loan-007", description: "Loan approved for Laza Kitchen", status: "COMPLETED", createdAt: "2026-08-18T13:00:00Z" },
  { id: "tx-016", traderId: "trader-001", type: "COMMISSION_CREDIT", amount: 20800, voucherId: "voucher-010", description: "Commission from voucher FB-P3O7I5UY", status: "COMPLETED", createdAt: "2026-08-19T08:00:00Z" },
  { id: "tx-017", traderId: "trader-001", type: "WITHDRAWAL", amount: -300000, withdrawType: "BALANCE", description: "Withdraw request: 300,000 RWF from balance", status: "FAILED", createdAt: "2026-08-22T10:00:00Z" },
  { id: "tx-018", traderId: "trader-001", type: "VOUCHER_UTILIZATION", amount: -130000, voucherId: "voucher-006", loanId: "loan-006", description: "Loan approved for Imboni Restaurant", status: "COMPLETED", createdAt: "2026-07-15T09:00:00Z" },
  { id: "tx-019", traderId: "trader-001", type: "COMMISSION_CREDIT", amount: 1300, voucherId: "voucher-006", description: "Commission from voucher FB-A1S5D9FG", status: "COMPLETED", createdAt: "2026-07-22T09:00:00Z" },
  { id: "tx-020", traderId: "trader-001", type: "TOP_UP", amount: 500000, description: "Wallet top-up via MTN MoMo", status: "COMPLETED", createdAt: "2026-07-10T11:00:00Z" },
];
