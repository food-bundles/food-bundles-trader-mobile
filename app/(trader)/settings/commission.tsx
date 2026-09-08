/**
 * Commission Settings: mode badge + description, toggle button ->
 * ConfirmDialog -> OTP verification -> success, current rate. Source:
 * `app/settings/manage/_component/CommissionSettings.tsx`. The mobile
 * mock always defines `commissionMode` (see `commissionStore.ts`), and every
 * read below uses full optional chaining, so the known web-source crash
 * (`wallet?.commissionMode.toLowerCase()` — guards `wallet` but not
 * `commissionMode`) cannot occur here.
 */
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { useTheme } from "../../../src/theme/ThemeContext";
import { useI18n } from "../../../src/i18n";
import { TraderShell } from "../../../src/components/layout/TraderShell";
import { Card } from "../../../src/components/ui/Card";
import { Button } from "../../../src/components/ui/Button";
import { ConfirmDialog } from "../../../src/components/ui/ConfirmDialog";
import { BottomSheet } from "../../../src/components/ui/BottomSheet";
import { OTPInput } from "../../../src/components/ui/OTPInput";
import { StatusBadge } from "../../../src/components/ui/StatusBadge";
import { useCommissionMode, setCommissionMode } from "../../../src/stores/commissionStore";
import { MOCK_WALLET } from "../../../src/mocks/wallet";
import type { CommissionMode } from "../../../src/types/domain";

/** Commission mode toggle screen: confirm -> OTP -> success. */
export default function CommissionScreen() {
  const { colors, space } = useTheme();
  const t = useI18n();
  const mode = useCommissionMode();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  const pendingMode: CommissionMode = mode === "NORMAL" ? "FIXED" : "NORMAL";
  const isFixed = mode === "FIXED";

  function handleConfirm(): void {
    setConfirmVisible(false);
    setOtpVisible(true);
  }

  function handleOtpComplete(): void {
    setCommissionMode(pendingMode);
    setOtpVisible(false);
    setSuccessVisible(true);
  }

  return (
    <TraderShell title={t("settings.commission")} showBack onBack={() => router.back()}>
      <ScrollView contentContainerStyle={{ padding: space.lg, gap: space.md }}>
        <Card>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: space.sm }}>
            <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 16, fontWeight: "700", color: colors.ink }}>
              {t("commission.mode")}
            </Text>
            <StatusBadge
              label={isFixed ? t("commission.fixed") : t("commission.normal")}
              tone={{ bg: colors.oat, text: colors.leaf }}
            />
          </View>

          <View style={{ gap: space.sm, marginBottom: space.md }}>
            <DescriptionRow highlighted={!isFixed} label={t("commission.normal")} />
            <DescriptionRow highlighted={isFixed} label={t("commission.fixed")} />
          </View>

          <Button
            label={isFixed ? t("commission.switchToNormal") : t("commission.switchToFixed")}
            onPress={() => setConfirmVisible(true)}
            fullWidth
            accessibilityLabel={isFixed ? t("commission.switchToNormal") : t("commission.switchToFixed")}
          />
        </Card>

        <Card>
          <Text style={{ fontFamily: "IBMPlexSans", fontSize: 12, color: colors.label }}>
            {t("commission.rate")}
          </Text>
          <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 24, fontWeight: "700", color: colors.ink, marginTop: 2 }}>
            {MOCK_WALLET?.commission ?? 0}%
          </Text>
          <Text style={{ fontFamily: "IBMPlexSans", fontSize: 12, color: colors.label, marginTop: space.xs }}>
            {t("commission.negotiatedNote")}
          </Text>
        </Card>
      </ScrollView>

      <ConfirmDialog
        visible={confirmVisible}
        title={t("commission.confirmTitle")}
        message={pendingMode === "FIXED" ? t("commission.confirmToFixed") : t("commission.confirmToNormal")}
        confirmLabel={t("common.confirm")}
        onCancel={() => setConfirmVisible(false)}
        onConfirm={handleConfirm}
      />

      <BottomSheet visible={otpVisible} onClose={() => setOtpVisible(false)} title={t("otp.title")} heightPct={55}>
        <Text style={{ fontFamily: "IBMPlexSans", fontSize: 13, color: colors.label }}>
          {t("otp.subtitle")}
        </Text>
        <OTPInput onComplete={handleOtpComplete} accessibilityLabel={t("otp.title")} />
      </BottomSheet>

      <ConfirmDialog
        visible={successVisible}
        title={t("commission.confirmTitle")}
        message={t("commission.switchSuccess")}
        confirmLabel={t("common.confirm")}
        onCancel={() => setSuccessVisible(false)}
        onConfirm={() => setSuccessVisible(false)}
      />
    </TraderShell>
  );
}

function DescriptionRow({ highlighted, label }: { highlighted: boolean; label: string }) {
  const { colors, space, radius } = useTheme();
  return (
    <View
      style={{
        borderRadius: radius.sm,
        borderWidth: 1,
        borderColor: highlighted ? colors.leaf : colors.hairline,
        backgroundColor: highlighted ? colors.oat : "transparent",
        padding: space.sm,
      }}
    >
      <Text style={{ fontFamily: "IBMPlexSans", fontSize: 12, color: highlighted ? colors.ink : colors.label }}>
        {label}
      </Text>
    </View>
  );
}
