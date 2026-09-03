Act as a senior React Native engineer implementing the FoodBundles Trader
mobile app (in C:\Users\emash\FoodBundles\food-bundles-trader-mobile) from an approved web-app source and service layer. You are
precise, methodical, and you never make creative decisions — you
implement exactly what the web source shows, adapted for mobile. When
something is ambiguous, stop ~30 seconds, pick the most conservative
option, log it in PROGRESS.md, and continue. Never ask permission;
never improvise copy, colors, or flows.

Your complete instructions are in CLAUDE.md and the seven skills in
.claude/skills/. Read ALL of them fully before writing any code.

Read these files in this exact order before writing any code:

1.  CLAUDE.md
2.  .claude/skills/design-system/SKILL.md
3.  .claude/skills/component-library/SKILL.md
4.  .claude/skills/navigation/SKILL.md
5.  .claude/skills/mock-data/SKILL.md
6.  .claude/skills/screen-specs/SKILL.md
7.  .claude/skills/motion/SKILL.md
8.  .claude/skills/accessibility-i18n/SKILL.md
9.  C:/Users/emash/FoodBundles/trader-app/lib/types.ts
10. C:/Users/emash/FoodBundles/trader-app/app/services/traderService.ts
11. C:/Users/emash/FoodBundles/trader-app/app/page.tsx
12. C:/Users/emash/FoodBundles/trader-app/app/credit/page.tsx
13. C:/Users/emash/FoodBundles/trader-app/app/credit/\_components/ApproveLoanModal.tsx
14. C:/Users/emash/FoodBundles/trader-app/app/credit/\_components/loan-columns.tsx
15. C:/Users/emash/FoodBundles/trader-app/app/vouchers/page.tsx
16. C:/Users/emash/FoodBundles/trader-app/app/vouchers/\_components/voucher-details-dialog.tsx
17. C:/Users/emash/FoodBundles/trader-app/app/vouchers/\_components/voucher-columns.tsx
18. C:/Users/emash/FoodBundles/trader-app/app/orders/page.tsx
19. C:/Users/emash/FoodBundles/trader-app/app/orders/\_components/order-columns.tsx
20. C:/Users/emash/FoodBundles/trader-app/app/settings/manage/page.tsx
21. C:/Users/emash/FoodBundles/trader-app/app/settings/manage/\_component/DelegationSettings.tsx
22. C:/Users/emash/FoodBundles/trader-app/app/settings/manage/\_component/CommissionSettings.tsx
23. C:/Users/emash/FoodBundles/trader-app/app/settings/authenticator/\_components/authenticator-management.tsx
24. C:/Users/emash/FoodBundles/trader-app/app/settings/delegation-history/\_component/DelegationHistory.tsx
25. C:/Users/emash/FoodBundles/trader-app/app/\_components/TopUpModal.tsx
26. C:/Users/emash/FoodBundles/trader-app/app/\_components/WithdrawModal.tsx
27. C:/Users/emash/FoodBundles/trader-app/app/\_components/WithdrawRequests.tsx
28. C:/Users/emash/FoodBundles/trader-app/app/agreement/page.tsx
29. C:/Users/emash/FoodBundles/trader-app/app/login/page.tsx
30. C:/Users/emash/FoodBundles/trader-app/app/forgot-password/page.tsx
31. C:/Users/emash/FoodBundles/trader-app/app/\_components/notificationDrawer.tsx

Note: filenames in design-reference may have hash suffixes (e.g.
page-b72038db.tsx). Read whichever file matches the pattern.

After reading everything, confirm what you found by listing:

SCREENS:

- Total screen count and their route paths, grouped by section
- Any web-only features (pagination controls, export CSV) and your
  decision on the mobile equivalent

DESIGN TOKENS:

- All colours with hex and role
- Both font families and type scale
- Spacing, radii, shadow, motion durations

MOCK DATA:

- Every entity type and its fields from traderService.ts
- The recurring fixed values (trader wallet, 5 recurring loan IDs,
  voucher codes, commission rates)
- Cross-references that must stay consistent
  (wallet.pendingApprovedAmount = sum of ACTIVE voucher remainingCredit)

TYPES:

- Every interface and enum from traderService.ts and lib/types.ts
- Any `any` types in the source and your typed replacement plan

COMPONENTS:

- Shared primitives from the skills files
- Web components to port (ApproveLoanModal → ApproveLoanSheet,
  VoucherDetailsDialog → VoucherDetailsSheet, etc.)
- Financial flows requiring OTP: top-up, withdraw, approve-loan,
  toggle-delegation, toggle-commission-mode

DOMAIN RULES:

- Exact order-status sequence
- 5 voucher types with their discount percentages
- 6 voucher statuses and 6 loan statuses
- Delegation flow (4 states, OTP on APPROVED→ACCEPTED)
- Commission modes (NORMAL vs FIXED — explain what each earns)
- Agreement gate (must accept before any trader screen)
- Withdrawal approval flow (OTP → pending admin approval)

AMBIGUITIES:

- List anything the web source shows inconsistently, e.g.:
  · `app/credit/page.tsx` title says "voucher Applications" (wrong)
  vs "Loan Applications" — which is correct for mobile?
  · `wallet?.commissionMode.toLowerCase()` bug in settings/manage —
  how will you handle commissionMode in mock data to avoid this?
  · `subscriptionService.ts` exists but has no screen — include or skip?
  · Order "view details" is stubbed out (console.log only) — build a
  real detail screen or skip?
  For each ambiguity, state your decision. Do NOT ask for permission.

IMPLEMENTATION PLAN:
Propose phases in this structure and ask to confirm before coding:

```
Phase 0 — Infra (Expo init, tsconfig strict, ESLint, line-limit
            script, PROGRESS.md, .claude/settings.json)
Phase 1 — Design system (tokens, theme, fonts, i18n scaffold)
Phase 2 — Component library (Button, Card, Badge, Input, AmountInput,
            OTPInput, DataList, StatCard, EmptyState, ErrorState,
            SkeletonRow, TopUpSheet, WithdrawSheet, ApproveLoanSheet,
            VoucherDetailsSheet, ConfirmDialog, NotificationDrawer)
Phase 3 — Navigation shell (bottom tab bar, TraderShell, header,
            auth guard, agreement guard)
Phase 4 — Mock data (all 8 mock files, cross-references verified)
Phase 5 — Auth (Login, Forgot Password, authStore)
Phase 6 — Agreement screen (full legal text, checkbox, scroll gate)
Phase 7 — Dashboard (WalletCard, stats, commission card,
            recent transactions, delegation banner)
Phase 8 — Loans (list + detail + ApproveLoanSheet + OTP flow)
Phase 9 — Vouchers (active/expired tabs + detail screen +
            repayment info + transactions)
Phase 10 — Orders (list + detail with item photos + voucher section)
Phase 11 — Settings (index + delegation + commission + history +
             authenticator + language)
Phase 12 — Notifications (drawer + notification store + bell)
Phase 13 — QA pass (all quality gates, all states, i18n, a11y audit)
```

Then say exactly:
"Ready to begin Phase 0 — Infra. Shall I proceed?"

Do NOT write any code until you receive a confirmation reply.

Restate these non-negotiables in your confirmation:

- No file exceeds 200 lines, including styles
- Fully mocked — no fetch, no axios, no base URL,
  no "// TODO: connect backend"
- No hardcoded colour, font, radius, duration or currency string
- Every touchable ≥ 44×44 with an accessibilityLabel
- All text ≥ 4.5:1 contrast
- All user-visible chrome strings in src/i18n (EN / Kinyarwanda / French)
- TypeScript strict — no any, no @ts-ignore, no eslint-disable
- No console.log in production paths
- Every list screen: loading, empty, and error states

────────────────────────────────────────────────────────────────────────

AUTONOMOUS BUILD PROMPT
(Send this as a second message after receiving the confirmation listing)

────────────────────────────────────────────────────────────────────────

Confirmed — your plan and non-negotiables are accepted. All ambiguity
decisions in your listing are approved. Proceed autonomously.

Quality gates before every phase commit:
npx tsc --noEmit
npx eslint . --max-warnings 0
npx tsx scripts/check-line-limit.ts

Run each phase in this loop:
plan → build → quality gates → self-review → commit →
push origin feat/trader-ui → update PROGRESS.md →
log decision summary → continue immediately

Gate failures: up to 3 targeted fixes. If still failing, commit what
passes, log the failure under "Deferred" in PROGRESS.md with the exact
error text, and continue to the next phase.

Stop only for:

1. A destructive or irreversible action
2. A real credential or payment required
3. A domain-rule contradiction you cannot resolve conservatively
4. A broken environment after three repair attempts

When you cannot decide: wait ~30 seconds, pick the most conservative
option, log it in PROGRESS.md, continue.

After all phases: git push origin feat/trader-ui and append an
"Implementation complete" section to PROGRESS.md with:

- Total files written
- Total screens built
- Every autonomous decision made
- Everything deferred and why

Begin Phase 0 now.
