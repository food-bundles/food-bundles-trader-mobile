/**
 * 10 mock notifications spanning all NotificationType values, most recent
 * first. deepLink values match the navigation SKILL's route table.
 */
import type { TraderNotification } from "../types/domain-extra";

export const MOCK_NOTIFICATIONS: TraderNotification[] = [
  { id: "notif-001", type: "VOUCHER_USED", title: "Voucher used", body: "Kigali Bistro used voucher FB-X7K2M9QP for ORD-10021", deepLink: "/(trader)/vouchers/voucher-001", timestamp: "2026-09-03T09:31:00Z", read: false },
  { id: "notif-002", type: "LOAN_REQUEST", title: "New loan request", body: "Laza Kitchen requested a loan of 500,000 RWF", deepLink: "/(trader)/loans/loan-003", timestamp: "2026-08-30T07:16:00Z", read: false },
  { id: "notif-003", type: "REPAYMENT_DUE", title: "Repayment overdue", body: "Voucher FB-A1S5D9FG is 15 days overdue — penalty applied", deepLink: "/(trader)/vouchers/voucher-009", timestamp: "2026-08-29T06:00:00Z", read: false },
  { id: "notif-004", type: "WITHDRAWAL_APPROVED", title: "Withdrawal approved", body: "Your withdrawal of 500,000 RWF has been approved", deepLink: "/(trader)/settings", timestamp: "2026-08-25T15:00:00Z", read: true },
  { id: "notif-005", type: "LOAN_APPROVED", title: "Loan approved", body: "You approved a loan of 410,000 RWF for Kigali Bistro", deepLink: "/(trader)/loans/loan-009", timestamp: "2026-08-26T12:01:00Z", read: true },
  { id: "notif-006", type: "SYSTEM", title: "Commission mode reminder", body: "Your commission rate is negotiated by Food Bundles and locked for 3 months", timestamp: "2026-08-20T08:00:00Z", read: true },
  { id: "notif-007", type: "VOUCHER_USED", title: "Voucher used", body: "Imboni Restaurant used voucher FB-M3P8L1WZ for ORD-10022", deepLink: "/(trader)/vouchers/voucher-002", timestamp: "2026-09-03T10:16:00Z", read: false },
  { id: "notif-008", type: "LOAN_REQUEST", title: "New loan request", body: "Sole Luna requested a loan of 60,000 RWF", deepLink: "/(trader)/loans/loan-008", timestamp: "2026-09-01T06:46:00Z", read: false },
  { id: "notif-009", type: "SYSTEM", title: "Delegation active", body: "Food Bundles is now approving loans on your behalf", deepLink: "/(trader)/settings", timestamp: "2026-07-23T11:46:00Z", read: true },
  { id: "notif-010", type: "REPAYMENT_DUE", title: "Repayment overdue", body: "Voucher FB-D8F2G6HJ is 42 days overdue — penalty applied", deepLink: "/(trader)/vouchers/voucher-012", timestamp: "2026-08-26T06:00:00Z", read: true },
];
