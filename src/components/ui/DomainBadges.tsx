/**
 * Concrete status badges, one per domain status kind. Each pulls from its
 * own dedicated colour map — never reuse one kind's badge for another.
 */
import React from "react";
import { StatusBadge } from "./StatusBadge";
import {
  LOAN_STATUS_BADGE,
  VOUCHER_STATUS_BADGE,
  ORDER_STATUS_BADGE,
  DELEGATION_STATUS_BADGE,
  VOUCHER_TYPE_CHIP,
  PENALTY_STATUS_BADGE,
} from "../../theme/badges";
import type {
  LoanStatus,
  VoucherStatus,
  OrderStatus,
  DelegationStatusValue,
  VoucherType,
  PenaltyStatus,
} from "../../types/domain";

/** Badge for a loan application's status. */
export function LoanStatusBadge({ status }: { status: LoanStatus }) {
  return <StatusBadge label={status} tone={LOAN_STATUS_BADGE[status]} />;
}

/** Badge for a voucher's status. */
export function VoucherStatusBadge({ status }: { status: VoucherStatus }) {
  return <StatusBadge label={status} tone={VOUCHER_STATUS_BADGE[status]} />;
}

/** Badge for an order's status. */
export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return <StatusBadge label={status} tone={ORDER_STATUS_BADGE[status]} />;
}

/** Badge for the trader's delegation status. */
export function DelegationStatusBadge({ status }: { status: DelegationStatusValue }) {
  return <StatusBadge label={status.replace("_", " ")} tone={DELEGATION_STATUS_BADGE[status]} />;
}

/** Badge for a penalty's payment status. */
export function PenaltyStatusBadge({ status }: { status: PenaltyStatus }) {
  return <StatusBadge label={status} tone={PENALTY_STATUS_BADGE[status]} />;
}

/** Chip showing a voucher type's discount percentage. */
export function VoucherTypeChip({ type }: { type: VoucherType }) {
  const pct = type.replace("DISCOUNT_", "");
  return <StatusBadge label={`${pct}% OFF`} tone={VOUCHER_TYPE_CHIP[type]} />;
}
