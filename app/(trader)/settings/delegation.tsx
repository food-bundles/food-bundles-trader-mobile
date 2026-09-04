/**
 * Delegation Settings: NOT_REQUESTED -> PENDING -> APPROVED -> ACCEPTED flow,
 * with OTP verification on APPROVED -> ACCEPTED and a reverse-with-confirm
 * action on ACCEPTED. Source: `app/settings/manage/_component/DelegationSettings.tsx`.
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
import { DelegationStatusBadge } from "../../../src/components/ui/DomainBadges";
import {
  useDelegationStore,
  requestDelegation,
  cancelDelegationRequest,
  acceptDelegation,
  reverseDelegation,
} from "../../../src/stores/delegationStore";

/** Delegation settings screen: request/accept/reverse, OTP on accept. */
export default function DelegationScreen() {
  const { colors, space } = useTheme();
  const t = useI18n();
  const { status } = useDelegationStore();
  const [otpVisible, setOtpVisible] = useState(false);
  const [reverseVisible, setReverseVisible] = useState(false);

  function handleOtpComplete(): void {
    acceptDelegation();
    setOtpVisible(false);
  }

  return (
    <TraderShell title={t("settings.delegation")} showBack onBack={() => router.back()}>
      <ScrollView contentContainerStyle={{ padding: space.lg, gap: space.md }}>
        <Card>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: space.sm }}>
            <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 16, fontWeight: "700", color: colors.ink }}>
              {t("delegation.status")}
            </Text>
            <DelegationStatusBadge status={status.status} />
          </View>

          {status.status === "NOT_REQUESTED" ? (
            <View style={{ gap: space.md }}>
              <Text style={{ fontFamily: "IBMPlexSans", fontSize: 13, color: colors.label }}>
                {t("delegation.explainer")}
              </Text>
              <Button
                label={t("delegation.request")}
                onPress={requestDelegation}
                fullWidth
                accessibilityLabel={t("delegation.request")}
              />
            </View>
          ) : null}

          {status.status === "PENDING" ? (
            <View style={{ gap: space.md }}>
              <View
                style={{
                  backgroundColor: "#FFF4E0",
                  borderRadius: 8,
                  padding: space.md,
                }}
              >
                <Text style={{ fontFamily: "IBMPlexSans_600", fontSize: 13, fontWeight: "600", color: colors.marigold }}>
                  {t("delegation.awaitingApproval")}
                </Text>
              </View>
              <Button
                label={t("delegation.cancelRequest")}
                onPress={cancelDelegationRequest}
                variant="ghost"
                fullWidth
                accessibilityLabel={t("delegation.cancelRequest")}
              />
            </View>
          ) : null}

          {status.status === "APPROVED" ? (
            <View style={{ gap: space.md }}>
              <Text style={{ fontFamily: "IBMPlexSans", fontSize: 13, color: colors.label }}>
                {t("delegation.approved")}
              </Text>
              <Button
                label={t("delegation.accept")}
                onPress={() => setOtpVisible(true)}
                fullWidth
                accessibilityLabel={t("delegation.accept")}
              />
            </View>
          ) : null}

          {status.status === "ACCEPTED" ? (
            <View style={{ gap: space.md }}>
              <View style={{ backgroundColor: colors.leaf, borderRadius: 8, padding: space.md }}>
                <Text style={{ fontFamily: "IBMPlexSans_600", fontSize: 13, fontWeight: "600", color: colors.paper }}>
                  {t("delegation.accepted")}
                </Text>
              </View>
              <Button
                label={t("delegation.reverse")}
                onPress={() => setReverseVisible(true)}
                variant="destructive"
                fullWidth
                accessibilityLabel={t("delegation.reverse")}
                accessibilityHint={t("delegation.reverseHint")}
              />
            </View>
          ) : null}
        </Card>
      </ScrollView>

      <BottomSheet visible={otpVisible} onClose={() => setOtpVisible(false)} title={t("delegation.accept")} heightPct={60}>
        <Text style={{ fontFamily: "IBMPlexSans", fontSize: 13, color: colors.label }}>
          {t("delegation.acceptOtpSubtitle")}
        </Text>
        <OTPInput onComplete={handleOtpComplete} accessibilityLabel={t("otp.title")} />
      </BottomSheet>

      <ConfirmDialog
        visible={reverseVisible}
        title={t("delegation.reverseTitle")}
        message={t("delegation.reverseMessage")}
        confirmLabel={t("delegation.reverse")}
        destructive
        accessibilityHint={t("delegation.reverseHint")}
        onCancel={() => setReverseVisible(false)}
        onConfirm={() => {
          reverseDelegation();
          setReverseVisible(false);
        }}
      />
    </TraderShell>
  );
}
