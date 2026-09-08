/**
 * Agreement legal text, ported verbatim (condensed to plain paragraphs —
 * source is HTML/JSX) from `trader-app/app/agreement/page.tsx`. Split out
 * of the screen file so `agreement/index.tsx` stays under the line cap.
 */
export interface AgreementSection {
  heading: string;
  paragraphs: string[];
}

export const AGREEMENT_INTRO =
  'This Digital Food Store Owner Agreement (the "Agreement") is entered into as of signing up on the platform, by and between Food Bundles Ltd, a company operating the Food Bundles platform under the laws of the Republic of Rwanda ("Platform", "Food Bundles", "we", "us", or "our"); and the Digital Food Store Owner, an individual or entity registered on the Platform ("Store Owner" or "you"). This Agreement governs your participation as a Digital Food Store Owner on the Platform — a dedicated section for sales to onboarded restaurants using a post-payment option (locally referred to as Agakaye k\'amadeni, a credit-based "buy now, pay later" arrangement). By registering as a Store Owner and accepting this Agreement, you agree to be bound by its terms under Law No. 18/2010 Relating to Electronic Messages, Electronic Signatures and Electronic Transactions. If you do not agree, do not register or act as a Store Owner in the Digital Food Store.';

export const AGREEMENT_SECTIONS: AgreementSection[] = [
  {
    heading: "1. Definitions",
    paragraphs: [
      "Approved Voucher / Order: A Voucher Request approved by the Store Owner (or by Food Bundles on the Store Owner's behalf if authorized under Section 8), enabling the Client to check out up to the approved value under the stated post-payment terms.",
      "Client: A restaurant or similar buyer onboarded by Food Bundles for the Digital Food Store and eligible for post-payment (Agakaye k'amadeni).",
      "Default: A Client payment that remains unpaid thirty (30) days after the due date stated in the Approved Voucher/Order, excluding amounts subject to an active, good-faith dispute under Section 5.4.",
      "Digital Food Store: The Platform section dedicated to post-payment sales to qualified Clients.",
      "Earnings: Under the Standard Model, the Store Owner's compensation equal to the Margin Percentage applied to the Actual Utilized Order Value.",
      "Fixed ROI Model: An alternative compensation arrangement where, by mutual agreement, the Store Owner receives a fixed monthly return on a principal deposit instead of per-order Earnings.",
      "Inventory: The aggregate pool of fresh food products sourced, stored, handled, and delivered by Food Bundles for the Digital Food Store.",
      "Margin Percentage (Commission): The fixed percentage of the Actual Utilized Order Value that constitutes Earnings under the Standard Model.",
      "Platform Commission: The fee (currently 5%, or such other rate as notified under Section 3.6) deducted by Food Bundles from Earnings at payout under the Standard Model.",
      "Store Owner Wallet: The dashboard balance showing pending/realized Earnings (or Fixed ROI accruals), transaction history, and Voucher status.",
      "Voucher Request: A request initiated by a Client specifying a monetary limit and deferred payment terms.",
      "Voucher Validity Window: The period during which a Client may use an Approved Voucher to check out, as defined in Section 2.4.",
    ],
  },
  {
    heading: "2. Platform Operations and Store Owner Role",
    paragraphs: [
      "2.1 Inventory, Title, and Fulfillment: Food Bundles exclusively sources, manages, stores, handles, and delivers all Inventory in the Digital Food Store. Store Owners do not purchase, hold, or take title to Inventory. Title to Inventory remains with Food Bundles until delivery to the Client.",
      "2.2 Client Onboarding and Credit Assessment: Food Bundles exclusively onboards Clients for the Digital Food Store and performs creditworthiness assessments before Voucher Requests are issued to Store Owners.",
      "2.3 Voucher Decisions: Participation in the Digital Food Store is limited to reviewing and approving or rejecting Voucher Requests for post-payment purchases. Unless you authorize Food Bundles to manage approvals on your behalf under Section 8, you have discretion to approve or reject Voucher Requests.",
      "2.4 Voucher Validity and Utilization: An Approved Voucher may be used by the Client to check out within twelve (12) hours from the time of approval (the \"Voucher Validity Window\"). If the Client does not check out within the Voucher Validity Window, the voucher expires and no Earnings are credited for that voucher.",
      "2.5 Order Process and Wallet Posting: Upon checkout by the Client, the Actual Utilized Order Value is recorded and reflected in the Store Owner Wallet as pending Earnings (Standard Model) or contributes to Fixed ROI accruals (Fixed ROI Model). Food Bundles handles fulfillment, delivery, invoicing, and payment collection.",
      "2.6 Fees: No upfront transaction or platform fees are charged to Store Owners. Under the Standard Model, the Platform Commission is deducted only at payout of Earnings.",
    ],
  },
  {
    heading: "3. Compensation Models",
    paragraphs: [
      "3.1 Standard Model (Per-Order Margin): Unless you elect the Fixed ROI Model via Platform settings or a separate written addendum, you participate under the Standard Model.",
      "3.2 Margin Percentage Setting and Changes: Food Bundles sets your Margin Percentage and will notify you via dashboard and/or email. The Margin Percentage is guaranteed for up to three (3) months from notification. Any change after that period applies only to Voucher Requests approved after the effective date of the change.",
      "3.3 Earnings Calculation (Standard Model): Earnings = Actual Utilized Order Value × Margin Percentage.",
      "3.4 Fixed ROI Model (Alternative): By mutual agreement, you may opt for a Fixed ROI Model. Unless expressly agreed in writing, the Fixed ROI Model replaces per-order Earnings.",
      "3.5 Crediting and Tracking: Under either model, you have dashboard access to pending/realized amounts, transaction history, and voucher status.",
      "3.6 Payouts and Platform Commission: Payouts occur monthly to your designated bank account, subject to verification and any minimum thresholds. Food Bundles deducts the Platform Commission from Earnings at payout, and may change the rate with at least one (1) month's prior notice.",
    ],
  },
  {
    heading: "4. Withdrawals and Principal/Deposit",
    paragraphs: [
      "4.1 Earnings / Fixed ROI Withdrawal: Accumulated Earnings or Fixed ROI amounts may be withdrawn monthly, subject to verification and any minimum thresholds.",
      "4.2 Principal/Deposit Withdrawal: If a principal deposit is required, it may be withdrawn upon forty-five (45) days' written notice via the Platform, subject to no active Approved Vouchers remaining and settlement of any confirmed chargebacks, fraud findings, or open disputes.",
      "4.3 Set-Off: Food Bundles may set off any amounts owed by the Store Owner against the Store Owner Wallet balance and/or any deposit, to the extent permitted by law.",
    ],
  },
  {
    heading: "5. Payment, Defaults, Disputes, and Liability",
    paragraphs: [
      "5.1 Payment Collection: Food Bundles is responsible for invoicing Clients and collecting payments under Approved Vouchers/Orders.",
      "5.2 Default Coverage (Earnings Protection): If a Client Default occurs, Food Bundles will pay the Store Owner the outstanding Earnings attributable to the Defaulted Approved Voucher/Order within thirty (30) days after the Default is confirmed, subject to conditions.",
      "5.3 Limitations of Liability: Food Bundles is not liable for indirect or consequential losses, except for fraud, willful misconduct, or gross negligence where unenforceable under Rwandan law.",
      "5.4 Order Disputes and Adjustments: Clients may raise disputes within the stated dispute window. Food Bundles will investigate in good faith.",
      "5.5 Store Owner Indemnity (Narrow): The Store Owner will indemnify Food Bundles against third-party claims arising from the Store Owner's fraud, collusion, unlawful activity, or breach of this Agreement.",
      "5.6 Platform Provided \"As Is\": The Platform is provided with reasonable care and security, without warranties beyond those expressly stated.",
    ],
  },
  {
    heading: "6. Representations, Responsibilities, and Compliance",
    paragraphs: [
      "6.1 By Store Owner: You represent that you have legal capacity and will comply with applicable Rwandan laws, including tax and anti-money laundering requirements, and will act in good faith.",
      "6.2 By Food Bundles: Food Bundles will maintain the Platform, manage Inventory and delivery professionally, onboard qualified Clients, and set Margin/ROI terms transparently.",
      "6.3 Governing Principles: This Agreement aligns with Law No. 45/2011 Governing Contracts and electronic acceptance under Law No. 18/2010.",
    ],
  },
  {
    heading: "7. Term and Termination",
    paragraphs: [
      "7.1 Term: This Agreement begins on the Effective Date and continues until terminated.",
      "7.2 Termination for Convenience: Either party may terminate this Agreement with forty-five (45) days' notice.",
      "7.3 Termination for Cause: Food Bundles may terminate immediately for material breach, including fraud, collusion, or serious misuse of the Platform.",
      "7.4 Settlement on Termination: Pending Approved Vouchers may expire or complete within the Voucher Validity Window; verified Earnings/ROI settle in the next payout cycle (or within 60 days); eligible deposit withdrawals proceed subject to Section 4.",
    ],
  },
  {
    heading: "8. Account Management by Food Bundles",
    paragraphs: [
      "8.1 Request Process: You may request through the Platform for Food Bundles to manage specified aspects of your account, including approving/rejecting Voucher Requests based on criteria you define.",
      "8.2 Authorization: By submitting and confirming such a request, you grant Food Bundles a limited, revocable authorization to act on your behalf. You may revoke authorization via the Platform, effective upon confirmation.",
      "8.3 Standard of Care: Food Bundles will exercise reasonable care when managing your account, and is not liable for losses from market changes, Client disputes, or force majeure unless due to fraud, willful misconduct, or gross negligence.",
    ],
  },
  {
    heading: "9. Governing Law and Dispute Resolution",
    paragraphs: [
      "This Agreement is governed by the laws of the Republic of Rwanda. The parties will first attempt amicable resolution. If unresolved within sixty (60) days of written notice of dispute, the dispute will be referred to arbitration seated in Kigali, Rwanda, unless the parties mutually agree otherwise in writing.",
    ],
  },
  {
    heading: "10. Miscellaneous",
    paragraphs: [
      "10.1 Amendments: Food Bundles may update this Agreement with notice via the Platform or email. Changes to compensation models, default coverage terms, or account-management authorization require your explicit consent.",
      "10.2 Force Majeure: Neither party is liable for failure to perform due to events beyond reasonable control.",
      "10.3 Entire Agreement: This Agreement supersedes prior understandings regarding the Digital Food Store, except where a separate written addendum is executed.",
    ],
  },
];
