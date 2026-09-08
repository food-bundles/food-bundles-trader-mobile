/**
 * Wallet top-up flow (bottom sheet, 60% height). Mirrors the web app's
 * `TopUpModal.tsx`: amount, payment method (MoMo/Airtel), conditional phone
 * field, then an OTP step and a success state. Fully mocked — no network.
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
import { formatRwf } from "../../lib/currency";

interface TopUpSheetProps {
  visible: boolean;
  onClose: () => void;
}

type Step = "form" | "otp" | "success";

/** Bottom sheet for topping up the trader's wallet balance. */
export function TopUpSheet({ visible, onClose }: TopUpSheetProps) {
  const { colors, space } = useTheme();
  const t = useI18n();
  const [step, setStep] = useState<Step>("form");
  const [amount, setAmount] = useState(0);
  const [method, setMethod] = useState<PaymentMethodId>("momo");
  const [phone, setPhone] = useState(MOCK_TRADER.phone);

  function reset(): void {
    setStep("form");
    setAmount(0);
    setMethod("momo");
    setPhone(MOCK_TRADER.phone);
  }

  function handleClose(): void {
    reset();
    onClose();
  }

  return (
    <BottomSheet visible={visible} onClose={handleClose} title={t("topUp.title")} heightPct={step === "form" ? 65 : 55}>
      {step === "form" ? (
        <>
          <AmountInput
            label={t("topUp.amount")}
            value={amount}
            onChangeValue={setAmount}
            accessibilityLabel={t("topUp.amount")}
          />
          <Text style={{ fontFamily: "IBMPlexSans_600", fontSize: 13, fontWeight: "600", color: colors.ink }}>
            {t("topUp.paymentMethod")}
          </Text>
          <View style={{ flexDirection: "row", gap: space.sm }}>
            <PaymentMethodTile method="momo" selected={method === "momo"} onPress={() => setMethod("momo")} />
            <PaymentMethodTile method="airtel" selected={method === "airtel"} onPress={() => setMethod("airtel")} />
          </View>
          <Input
            label={t("topUp.phoneNumber")}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            accessibilityLabel={t("topUp.phoneNumber")}
          />
          <Button
            label={t("topUp.submit")}
            onPress={() => setStep("otp")}
            disabled={amount <= 0}
            fullWidth
            accessibilityLabel="Top up wallet"
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
          <OTPInput onComplete={() => setStep("success")} accessibilityLabel="Top-up verification code" />
        </View>
      ) : null}

      {step === "success" ? (
        <View style={{ alignItems: "center", gap: space.md, paddingVertical: space.xl }}>
          <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 18, fontWeight: "700", color: colors.ripe }}>
            {t("topUp.success")}
          </Text>
          <Text style={{ fontFamily: "IBMPlexSans", fontSize: 14, color: colors.label }}>{formatRwf(amount)}</Text>
          <Button label={t("common.confirm")} onPress={handleClose} accessibilityLabel="Close top-up confirmation" />
        </View>
      ) : null}
    </BottomSheet>
  );
}
