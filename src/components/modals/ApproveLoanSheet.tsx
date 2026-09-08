/**
 * Loan approval flow (bottom sheet, 85% height). Per component-library
 * SKILL: amount (capped to requested), voucher-type selector (defaults to
 * DISCOUNT_100 — the same default the web app hardcodes), repayment-days
 * slider (7/14/21/30), notes, commission preview, then a ConfirmDialog and
 * a success state.
 */
import React, { useState } from "react";
import { Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { useI18n } from "../../i18n";
import { BottomSheet } from "../ui/BottomSheet";
import { AmountInput } from "../ui/AmountInput";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { VoucherTypeChip } from "../ui/DomainBadges";
import { formatRwf } from "../../lib/currency";
import { VoucherType, type LoanApplication } from "../../types/domain";
import { MOCK_WALLET } from "../../mocks/wallet";

interface ApproveLoanSheetProps {
  visible: boolean;
  onClose: () => void;
  loan: LoanApplication;
  onApproved: () => void;
}

const VOUCHER_TYPES = [
  VoucherType.DISCOUNT_10,
  VoucherType.DISCOUNT_20,
  VoucherType.DISCOUNT_50,
  VoucherType.DISCOUNT_80,
  VoucherType.DISCOUNT_100,
];

const REPAYMENT_OPTIONS = [7, 14, 21, 30];

/** Bottom sheet: review + confirm a loan approval, issuing a voucher. */
export function ApproveLoanSheet({ visible, onClose, loan, onApproved }: ApproveLoanSheetProps) {
  const { colors, space } = useTheme();
  const t = useI18n();
  const [amount, setAmount] = useState(loan.requestedAmount);
  const [voucherType, setVoucherType] = useState<VoucherType>(VoucherType.DISCOUNT_100);
  const [repaymentDays, setRepaymentDays] = useState(loan.repaymentDays);
  const [notes, setNotes] = useState("");
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [success, setSuccess] = useState(false);

  const hasSufficientBalance = MOCK_WALLET.availableBalance >= amount;
  const commissionPct = MOCK_WALLET.commission;
  const commissionAmount = Math.round((amount * commissionPct) / 100);

  function handleClose(): void {
    setAmount(loan.requestedAmount);
    setVoucherType(VoucherType.DISCOUNT_100);
    setRepaymentDays(loan.repaymentDays);
    setNotes("");
    setSuccess(false);
    onClose();
  }

  function handleConfirmApprove(): void {
    setConfirmVisible(false);
    setSuccess(true);
    onApproved();
  }

  if (success) {
    return (
      <BottomSheet visible={visible} onClose={handleClose} title={t("loans.approveTitle")} heightPct={45}>
        <View style={{ alignItems: "center", gap: space.md, paddingVertical: space.xl }}>
          <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 18, fontWeight: "700", color: colors.ripe }}>
            {t("status.approved")}
          </Text>
          <Text style={{ fontFamily: "IBMPlexSans", fontSize: 14, color: colors.label }}>
            {formatRwf(amount)} — {loan.restaurantName}
          </Text>
          <Button label={t("common.confirm")} onPress={handleClose} accessibilityLabel="Close approval confirmation" />
        </View>
      </BottomSheet>
    );
  }

  return (
    <>
      <BottomSheet visible={visible} onClose={handleClose} title={t("loans.approveTitle")}>
        <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 17, fontWeight: "700", color: colors.ink }}>
          {loan.restaurantName}
        </Text>
        <Text style={{ fontFamily: "IBMPlexSans", fontSize: 13, color: colors.label }}>
          {t("loans.requestedAmount")}: {formatRwf(loan.requestedAmount)}
        </Text>

        <AmountInput
          label={t("loans.approvedAmount")}
          value={amount}
          onChangeValue={setAmount}
          max={loan.requestedAmount}
          accessibilityLabel={t("loans.approvedAmount")}
        />

        <Text style={{ fontFamily: "IBMPlexSans_600", fontSize: 13, fontWeight: "600", color: colors.ink }}>
          {t("loans.voucherType")}
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space.sm }}>
          {VOUCHER_TYPES.map((vt) => (
            <View
              key={vt}
              accessibilityRole="button"
              accessibilityLabel={`Select voucher type ${vt}`}
              onTouchEnd={() => setVoucherType(vt)}
              style={{
                borderWidth: voucherType === vt ? 2 : 0,
                borderColor: colors.leaf,
                borderRadius: 999,
              }}
            >
              <VoucherTypeChip type={vt} />
            </View>
          ))}
        </View>

        <Text style={{ fontFamily: "IBMPlexSans_600", fontSize: 13, fontWeight: "600", color: colors.ink }}>
          {t("loans.repaymentDays")}
        </Text>
        <View style={{ flexDirection: "row", gap: space.sm }}>
          {REPAYMENT_OPTIONS.map((days) => (
            <Button
              key={days}
              label={String(days)}
              onPress={() => setRepaymentDays(days)}
              variant={repaymentDays === days ? "primary" : "secondary"}
              size="sm"
              accessibilityLabel={`${days} days repayment`}
            />
          ))}
        </View>

        <Input
          label={t("loans.notes")}
          value={notes}
          onChangeText={setNotes}
          multiline
          accessibilityLabel={t("loans.notes")}
        />

        <View style={{ backgroundColor: colors.oat, borderRadius: 12, padding: space.md }}>
          <Text style={{ fontFamily: "IBMPlexSans", fontSize: 13, color: colors.ink }}>
            {t("loans.commissionPreview").replace("{pct}", String(commissionPct)).replace("{amount}", formatRwf(amount))}
          </Text>
        </View>

        {!hasSufficientBalance ? (
          <Text style={{ fontFamily: "IBMPlexSans", fontSize: 13, color: colors.chili }}>
            {t("loans.insufficientBalance")}
          </Text>
        ) : null}

        <Text style={{ fontFamily: "IBMPlexSans", fontSize: 12, color: colors.label }}>
          {commissionAmount > 0 ? formatRwf(commissionAmount) : ""}
        </Text>

        <Button
          label={t("loans.approve")}
          onPress={() => setConfirmVisible(true)}
          disabled={!hasSufficientBalance || amount <= 0}
          fullWidth
          accessibilityLabel={`Approve loan application for ${loan.restaurantName}`}
        />
      </BottomSheet>

      <ConfirmDialog
        visible={confirmVisible}
        title={t("loans.approveTitle")}
        message={`${loan.restaurantName} — ${formatRwf(amount)}`}
        confirmLabel={t("common.approve")}
        onConfirm={handleConfirmApprove}
        onCancel={() => setConfirmVisible(false)}
        accessibilityHint="This will issue a voucher to the restaurant"
      />
    </>
  );
}
