/**
 * Trader-specific badge colour maps. Each domain status enum has its own
 * dedicated map — never share a map across different status kinds.
 * Source: `.claude/skills/design-system/SKILL.md`.
 */
import { COLORS } from "./tokens";
import type {
  LoanStatus,
  VoucherStatus,
  VoucherType,
  OrderStatus,
  PenaltyStatus,
  DelegationStatusValue,
} from "../types/domain";

export interface BadgeTone {
  bg: string;
  text: string;
  border?: string;
}

export const LOAN_STATUS_BADGE: Record<LoanStatus, BadgeTone> = {
  PENDING: { bg: "#FFF4E0", text: COLORS.marigold },
  APPROVED: { bg: "#E6F7ED", text: COLORS.ripe },
  ACCEPTED: { bg: COLORS.leaf, text: COLORS.paper },
  DISBURSED: { bg: COLORS.pine, text: COLORS.paper },
  REJECTED: { bg: "#FDEAEA", text: COLORS.chili },
  SETTLED: { bg: COLORS.hairline, text: COLORS.label },
};

export const VOUCHER_STATUS_BADGE: Record<VoucherStatus, BadgeTone> = {
  ACTIVE: { bg: "#E6F7ED", text: COLORS.ripe },
  USED: { bg: COLORS.hairline, text: COLORS.label },
  EXPIRED: { bg: "#FDEAEA", text: COLORS.chili, border: COLORS.chili },
  MATURED: { bg: COLORS.pine, text: COLORS.paper },
  SUSPENDED: { bg: "#FFF4E0", text: COLORS.marigold },
  SETTLED: { bg: COLORS.hairline, text: COLORS.label },
};

export const DELEGATION_STATUS_BADGE: Record<DelegationStatusValue, BadgeTone> = {
  NOT_REQUESTED: { bg: COLORS.hairline, text: COLORS.label },
  PENDING: { bg: "#FFF4E0", text: COLORS.marigold },
  APPROVED: { bg: "#E6F7ED", text: COLORS.ripe },
  ACCEPTED: { bg: COLORS.leaf, text: COLORS.paper },
};

export const VOUCHER_TYPE_CHIP: Record<VoucherType, BadgeTone> = {
  DISCOUNT_10: { bg: COLORS.oat, text: COLORS.leaf },
  DISCOUNT_20: { bg: COLORS.oat, text: COLORS.leaf },
  DISCOUNT_50: { bg: "#E4F1EA", text: COLORS.pine },
  DISCOUNT_80: { bg: COLORS.pine, text: COLORS.paper },
  DISCOUNT_100: { bg: "#0A3520", text: COLORS.paper },
};

/** Order status uses its own dedicated map — never reuse for other kinds. */
export const ORDER_STATUS_BADGE: Record<OrderStatus, BadgeTone> = {
  PENDING: { bg: "#FFF4E0", text: COLORS.marigold },
  CONFIRMED: { bg: "#E6F7ED", text: COLORS.ripe },
  PREPARING: { bg: "#FFF4E0", text: COLORS.marigold },
  READY: { bg: "#E4F1EA", text: COLORS.pine },
  IN_TRANSIT: { bg: COLORS.pine, text: COLORS.paper },
  DELIVERED: { bg: COLORS.leaf, text: COLORS.paper },
  CANCELLED: { bg: "#FDEAEA", text: COLORS.chili },
  REFUNDED: { bg: COLORS.hairline, text: COLORS.label },
};

export const PENALTY_STATUS_BADGE: Record<PenaltyStatus, BadgeTone> = {
  PENDING: { bg: "#FFF4E0", text: COLORS.marigold },
  PAID: { bg: "#E6F7ED", text: COLORS.ripe },
  WAIVED: { bg: COLORS.hairline, text: COLORS.label },
};
