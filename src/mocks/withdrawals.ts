/**
 * 5 mock withdrawal requests: 2 PENDING, 2 COMPLETED, 1 CANCELLED.
 */
import type { WithdrawalRequest } from "../types/domain-extra";

export const MOCK_WITHDRAWALS: WithdrawalRequest[] = [
  {
    id: "wd-001",
    type: "COMMISSION",
    amount: 85000,
    status: "PENDING",
    paymentMethod: "momo",
    accountName: "Jean Pierre Habimana",
    accountNumber: "0788123456",
    createdAt: "2026-09-02T16:00:00Z",
    otpVerified: true,
  },
  {
    id: "wd-002",
    type: "BALANCE",
    amount: 500000,
    status: "COMPLETED",
    paymentMethod: "momo",
    accountName: "Jean Pierre Habimana",
    accountNumber: "0788123456",
    createdAt: "2026-08-25T14:00:00Z",
    otpVerified: true,
  },
  {
    id: "wd-003",
    type: "BALANCE",
    amount: 300000,
    status: "CANCELLED",
    paymentMethod: "bank",
    accountName: "Jean Pierre Habimana",
    accountNumber: "000123456789012",
    createdAt: "2026-08-22T10:00:00Z",
    otpVerified: false,
  },
  {
    id: "wd-004",
    type: "COMMISSION",
    amount: 120000,
    status: "COMPLETED",
    paymentMethod: "momopay",
    accountName: "Jean Pierre Habimana",
    accountNumber: "0788123456",
    createdAt: "2026-07-30T09:00:00Z",
    otpVerified: true,
  },
  {
    id: "wd-005",
    type: "BALANCE",
    amount: 150000,
    status: "PENDING",
    paymentMethod: "bank",
    accountName: "Jean Pierre Habimana",
    accountNumber: "000123456789012",
    createdAt: "2026-09-03T07:00:00Z",
    otpVerified: false,
  },
];
