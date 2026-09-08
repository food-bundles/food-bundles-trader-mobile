/**
 * Canonical domain enums and core financial types, mirrored from
 * `trader-app/lib/types.ts` and `trader-app/app/services/traderService.ts`.
 * TypeScript-strict adaptation: no `any` fields (web source uses `any` in
 * several places — mobile side replaces them with precise types).
 */

export enum UserRole {
  FARMER = "FARMER",
  RESTAURANT = "RESTAURANT",
  HOTEL = "HOTEL",
  ADMIN = "ADMIN",
  TRADER = "TRADER",
  LOGISTICS = "LOGISTICS",
  AGGREGATOR = "AGGREGATOR",
  FOOD_BUNDLE = "FOOD_BUNDLE",
  AFFILIATOR = "AFFILIATOR",
}

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PREPARING = "PREPARING",
  READY = "READY",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}

export enum VoucherStatus {
  ACTIVE = "ACTIVE",
  USED = "USED",
  EXPIRED = "EXPIRED",
  MATURED = "MATURED",
  SUSPENDED = "SUSPENDED",
  SETTLED = "SETTLED",
}

export enum VoucherType {
  DISCOUNT_10 = "DISCOUNT_10",
  DISCOUNT_20 = "DISCOUNT_20",
  DISCOUNT_50 = "DISCOUNT_50",
  DISCOUNT_80 = "DISCOUNT_80",
  DISCOUNT_100 = "DISCOUNT_100",
}

export enum LoanStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  ACCEPTED = "ACCEPTED",
  DISBURSED = "DISBURSED",
  REJECTED = "REJECTED",
  SETTLED = "SETTLED",
}

export enum PenaltyStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  WAIVED = "WAIVED",
}

export type DelegationStatusValue =
  | "NOT_REQUESTED"
  | "PENDING"
  | "APPROVED"
  | "ACCEPTED";

export type CommissionMode = "NORMAL" | "FIXED";

export type TransactionType =
  | "TOP_UP"
  | "COMMISSION_CREDIT"
  | "VOUCHER_UTILIZATION"
  | "WITHDRAWAL";

export type TransactionStatus = "PENDING" | "COMPLETED" | "FAILED";

export type WithdrawType = "BALANCE" | "COMMISSION";

export interface TraderUser {
  id: string;
  username: string;
  email: string;
  phone: string;
  role: UserRole.TRADER;
  profileImage: string;
  agreementAccepted: boolean;
  twoFactorEnabled: boolean;
}

export interface TraderWallet {
  id: string;
  traderId: string;
  balance: number;
  pendingApprovedAmount: number;
  commissionEarned: number;
  commission: number;
  totalDeposited: number;
  currency: "RWF";
  isActive: boolean;
  availableBalance: number;
  totalVouchersAmount: number;
  totalVouchersCount: number;
  commissionMode: CommissionMode;
}

export interface TraderTransaction {
  id: string;
  traderId: string;
  type: TransactionType;
  amount: number;
  orderId?: string;
  voucherId?: string;
  loanId?: string;
  reference?: string;
  description: string;
  status: TransactionStatus;
  withdrawType?: WithdrawType;
  createdAt: string;
}

export interface LoanApplication {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantEmail: string;
  requestedAmount: number;
  purpose: string;
  repaymentDays: number;
  status: LoanStatus;
  approvedAmount?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  approvedAt?: string;
}

export interface VoucherTransaction {
  id: string;
  voucherId: string;
  orderId: string;
  orderNumber: string;
  originalAmount: number;
  discountPercentage: number;
  discountAmount: number;
  amountCharged: number;
  transactionDate: string;
}

export interface Voucher {
  id: string;
  voucherCode: string;
  voucherType: VoucherType;
  discountPercentage: number;
  creditLimit: number;
  totalCredit: number;
  usedCredit: number;
  remainingCredit: number;
  status: VoucherStatus;
  commission: number;
  expiryDate: string;
  issuedDate: string;
  restaurantId: string;
  restaurantName: string;
  loanId: string;
  repaymentDays: number;
  repaymentDueDate: string;
  serviceFeeRate: number;
  daysOverdue: number;
  penaltyAmount: number;
  transactions: VoucherTransaction[];
}
