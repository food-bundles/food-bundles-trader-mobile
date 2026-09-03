/**
 * Mock delegation status (ACCEPTED) + 8-event history log, dates in order.
 */
import type { DelegationStatus, DelegationHistoryEvent } from "../types/domain-extra";

export const MOCK_DELEGATION_STATUS: DelegationStatus = {
  delegationRequestedAt: "2026-07-01T09:00:00Z",
  delegationApprovedAt: "2026-07-02T14:30:00Z",
  delegationApprovedBy: "admin-001",
  delegationAcceptedAt: "2026-07-02T15:00:00Z",
  canTradeOnBehalf: true,
  commission: 8,
  status: "ACCEPTED",
};

export const MOCK_DELEGATION_HISTORY: DelegationHistoryEvent[] = [
  { id: "dh-001", event: "REQUESTED", timestamp: "2026-07-01T09:00:00Z", traderId: "trader-001", note: "Initial delegation request submitted" },
  { id: "dh-002", event: "APPROVED", timestamp: "2026-07-02T14:30:00Z", traderId: "trader-001", adminId: "admin-001", note: "Approved with 8% commission" },
  { id: "dh-003", event: "ACCEPTED", timestamp: "2026-07-02T15:00:00Z", traderId: "trader-001", note: "Trader accepted via OTP verification" },
  { id: "dh-004", event: "REVERSED", timestamp: "2026-07-20T10:00:00Z", traderId: "trader-001", note: "Trader reversed delegation temporarily" },
  { id: "dh-005", event: "REQUESTED", timestamp: "2026-07-22T08:00:00Z", traderId: "trader-001", note: "Re-requested delegation" },
  { id: "dh-006", event: "APPROVED", timestamp: "2026-07-23T11:00:00Z", traderId: "trader-001", adminId: "admin-001", note: "Approved with 8% commission" },
  { id: "dh-007", event: "ACCEPTED", timestamp: "2026-07-23T11:45:00Z", traderId: "trader-001", note: "Trader accepted via OTP verification" },
  { id: "dh-008", event: "REQUESTED", timestamp: "2026-06-15T09:00:00Z", traderId: "trader-001", note: "Very first delegation request (predates approval)" },
];
