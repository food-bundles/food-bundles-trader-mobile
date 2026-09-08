/**
 * Withdrawal flow (bottom sheet, 85% height). Mirrors the web app's
 * `WithdrawModal.tsx`: type toggle (Balance/Commission), amount capped to
 * the available figure, payment method, account fields, then OTP and a
 * "pending admin approval" confirmation.
 */
import React, { useState } from "react";
import { Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { useI18n } from "../../i18n";
import { BottomSheet } from "../ui/BottomSheet";
import { AmountInput } from "../ui/AmountInput";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { OTPInput } from "../ui/OTPInput";
import { PaymentMethodTile, type PaymentMethodId } from "../ui/PaymentMethodTile";
import { MOCK_TRADER } from "../../mocks/auth";
import { MOCK_WALLET } from "../../mocks/wallet";
import { formatRwf } from "../../lib/currency";
import type { WithdrawType } from "../../types/domain";

interface WithdrawSheetProps {
  visible: boolean;
  onClose: () => void;
}

type Step = "form" | "otp" | "success";

/** Bottom sheet for requesting a withdrawal from balance or commission. */
export function WithdrawSheet({ visible, onClose }: WithdrawSheetProps) {
  const { colors, space } = useTheme();
  const t = useI18n();
  const [step, setStep] = useState<Step>("form");
  const [type, setType] = useState<WithdrawType>("BALANCE");
  const [amount, setAmount] = useState(0);
  const [method, setMethod] = useState<PaymentMethodId>("momo");
  const [accountName, setAccountName] = useState(MOCK_TRADER.username);
  const [accountNumber, setAccountNumber] = useState(MOCK_TRADER.phone);

  const max = type === "BALANCE" ? MOCK_WALLET.availableBalance : MOCK_WALLET.commissionEarned;

  function reset(): void {
    setStep("form");
    setType("BALANCE");
    setAmount(0);
    setMethod("momo");
    setAccountName(MOCK_TRADER.username);
    setAccountNumber(MOCK_TRADER.phone);
  }

  function handleClose(): void {
    reset();
    onClose();
  }

  return (
    <BottomSheet visible={visible} onClose={handleClose} title={t("withdraw.title")}>
      {step === "form" ? (
        <>
          <Text style={{ fontFamily: "IBMPlexSans_600", fontSize: 13, fontWeight: "600", color: colors.ink }}>
            {t("withdraw.type")}
          </Text>
          <View style={{ flexDirection: "row", gap: space.sm }}>
            <Button
              label={t("withdraw.balance")}
              onPress={() => setType("BALANCE")}
              variant={type === "BALANCE" ? "primary" : "secondary"}
              size="sm"
            />
            <Button
              label={t("withdraw.commission")}
              onPress={() => setType("COMMISSION")}
              variant={type === "COMMISSION" ? "primary" : "secondary"}
              size="sm"
            />
          </View>
          <Text style={{ fontFamily: "IBMPlexSans", fontSize: 12, color: colors.label }}>
            {t("wallet.available")}: {formatRwf(max)}
          </Text>
          <AmountInput
            label={t("withdraw.amount")}
            value={amount}
            onChangeValue={setAmount}
            max={max}
            accessibilityLabel={t("withdraw.amount")}
          />
          <Text style={{ fontFamily: "IBMPlexSans_600", fontSize: 13, fontWeight: "600", color: colors.ink }}>
            {t("withdraw.paymentMethod")}
          </Text>
          <View style={{ flexDirection: "row", gap: space.sm }}>
            <PaymentMethodTile method="momo" selected={method === "momo"} onPress={() => setMethod("momo")} />
            <PaymentMethodTile method="bank" selected={method === "bank"} onPress={() => setMethod("bank")} />
          </View>
          <Input
            label={t("withdraw.accountName")}
            value={accountName}
            onChangeText={setAccountName}
            accessibilityLabel={t("withdraw.accountName")}
          />
          <Input
            label={t("withdraw.accountNumber")}
            value={accountNumber}
            onChangeText={setAccountNumber}
            keyboardType={method === "bank" ? "number-pad" : "phone-pad"}
            accessibilityLabel={t("withdraw.accountNumber")}
          />
          <Text style={{ fontFamily: "IBMPlexSans", fontSize: 12, color: colors.label }}>{t("withdraw.note")}</Text>
          <Button
            label={t("withdraw.submit")}
            onPress={() => setStep("otp")}
            disabled={amount <= 0 || amount > max || !accountName || !accountNumber}
            fullWidth
            accessibilityLabel="Request withdrawal"
          />
        </>
      ) : null}

      {step === "otp" ? (
        <View style={{ alignItems: "center", gap: space.lg }}>
          <Text style={{ fontFamily: "IBMPlexSans_600", fontSize: 14, fontWeight: "600", color: colors.ink }}>
            {t("otp.title")}
          </Text>
          <Text style={{ fontFamily: "IBMPlexSans", fontSize: 13, color: colors.label, textAlign: "center" }}>
            {t("otp.subtitle")}
          </Text>
          <OTPInput onComplete={() => setStep("success")} accessibilityLabel="Withdrawal verification code" />
        </View>
      ) : null}

      {step === "success" ? (
        <View style={{ alignItems: "center", gap: space.md, paddingVertical: space.xl }}>
          <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 18, fontWeight: "700", color: colors.marigold }}>
            {t("withdraw.pendingApproval")}
          </Text>
          <Text style={{ fontFamily: "IBMPlexSans", fontSize: 14, color: colors.label }}>{formatRwf(amount)}</Text>
          <Button label={t("common.confirm")} onPress={handleClose} accessibilityLabel="Close withdrawal confirmation" />
        </View>
      ) : null}
    </BottomSheet>
  );
}
