/**
 * Orders, delegation, commission, withdrawal, and notification domain types.
 * Split from `domain.ts` to respect the 200-line file cap.
 */
import type { OrderStatus, DelegationStatusValue, WithdrawType } from "./domain";

export interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  unit: string;
  imageUri: string;
}

export interface TraderOrder {
  id: string;
  orderNumber: string;
  restaurantId: string;
  restaurantName: string;
  status: OrderStatus;
  totalAmount: number;
  paymentMethod: "VOUCHER";
  voucherCode: string;
  discountPercentage: number;
  billingName: string;
  billingPhone: string;
  billingEmail: string;
  orderItems: OrderItem[];
  createdAt: string;
}

export interface DelegationStatus {
  delegationRequestedAt: string | null;
  delegationApprovedAt: string | null;
  delegationApprovedBy: string | null;
  delegationAcceptedAt: string | null;
  canTradeOnBehalf: boolean;
  commission: number;
  status: DelegationStatusValue;
}

export type DelegationEventType =
  | "REQUESTED"
  | "APPROVED"
  | "ACCEPTED"
  | "REVERSED";

export interface DelegationHistoryEvent {
  id: string;
  event: DelegationEventType;
  timestamp: string;
  note?: string;
  traderId: string;
  adminId?: string;
}

export interface CommissionMonth {
  month: string;
  earned: number;
  paid: number;
  pending: number;
  voucherCount: number;
}

export interface TraderStats {
  totalTransactions: number;
  loanApprovals: number;
  commissionsEarned: number;
  commissionsPaid: number;
  totalLoansApproved: number;
}

export interface WithdrawalRequest {
  id: string;
  type: WithdrawType;
  amount: number;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  paymentMethod: "momo" | "momopay" | "bank";
  accountName: string;
  accountNumber: string;
  createdAt: string;
  otpVerified: boolean;
}

export type NotificationType =
  | "LOAN_REQUEST"
  | "LOAN_APPROVED"
  | "VOUCHER_USED"
  | "REPAYMENT_DUE"
  | "WITHDRAWAL_APPROVED"
  | "SYSTEM";

export interface TraderNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  deepLink?: string;
  timestamp: string;
  read: boolean;
}
