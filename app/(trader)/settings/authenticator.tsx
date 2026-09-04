/**
 * Authenticator (2FA): generate mock TOTP secret, QR code, raw secret with
 * copy affordance, 6-digit OTP verification to enable; disable flow if
 * already enabled. Source: `authenticator-management.tsx`.
 */
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import { useTheme } from "../../../src/theme/ThemeContext";
import { useI18n } from "../../../src/i18n";
import { TraderShell } from "../../../src/components/layout/TraderShell";
import { Card } from "../../../src/components/ui/Card";
import { Button } from "../../../src/components/ui/Button";
import { ConfirmDialog } from "../../../src/components/ui/ConfirmDialog";
import { OTPInput } from "../../../src/components/ui/OTPInput";
import { MIN_TAP_TARGET } from "../../../src/theme/tokens";
import { generateMockTotpSecret, buildOtpAuthUri } from "../../../src/lib/totp";
import { MOCK_TRADER } from "../../../src/mocks/auth";

type PageState = "idle" | "setup" | "enabled";

/** 2FA setup/manage screen: QR + secret + verify, or active status + disable. */
export default function AuthenticatorScreen() {
  const { colors, space } = useTheme();
  const t = useI18n();
  const [pageState, setPageState] = useState<PageState>(
    MOCK_TRADER?.twoFactorEnabled ? "enabled" : "idle"
  );
  const [secret] = useState(() => generateMockTotpSecret());
  const [secretCopied, setSecretCopied] = useState(false);
  const [disableVisible, setDisableVisible] = useState(false);

  const otpUri = useMemo(
    () => buildOtpAuthUri(secret, MOCK_TRADER?.email ?? "trader@foodbundles.rw"),
    [secret]
  );

  function handleCopySecret(): void {
    setSecretCopied(true);
    setTimeout(() => setSecretCopied(false), 1800);
  }

  function handleVerify(): void {
    setPageState("enabled");
  }

  function handleDisable(): void {
    setDisableVisible(false);
    setPageState("idle");
  }

  return (
    <TraderShell title={t("settings.authenticator")} showBack onBack={() => router.back()}>
      <ScrollView contentContainerStyle={{ padding: space.lg, gap: space.md }}>
        {pageState === "idle" ? (
          <Card>
            <View style={{ alignItems: "center", gap: space.sm, marginBottom: space.md }}>
              <Ionicons name="shield-outline" size={40} color={colors.label} />
              <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 16, fontWeight: "700", color: colors.ink }}>
                {t("twoFactor.title")}
              </Text>
              <Text style={{ fontFamily: "IBMPlexSans", fontSize: 13, color: colors.label, textAlign: "center" }}>
                {t("twoFactor.subtitle")}
              </Text>
            </View>
            <Button
              label={t("twoFactor.enable")}
              onPress={() => setPageState("setup")}
              fullWidth
              accessibilityLabel={t("twoFactor.enable")}
            />
          </Card>
        ) : null}

        {pageState === "setup" ? (
          <Card>
            <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 15, fontWeight: "700", color: colors.ink, textAlign: "center" }}>
              {t("twoFactor.scanQr")}
            </Text>
            <Text style={{ fontFamily: "IBMPlexSans", fontSize: 12, color: colors.label, textAlign: "center", marginTop: 4, marginBottom: space.md }}>
              {t("twoFactor.scanQrHelp")}
            </Text>

            <View style={{ alignItems: "center", marginBottom: space.md }}>
              <QRCode value={otpUri} size={160} color={colors.ink} backgroundColor={colors.paper} />
            </View>

            <View style={{ borderWidth: 1, borderColor: colors.hairline, borderRadius: 8, padding: space.sm, marginBottom: space.md }}>
              <Text style={{ fontFamily: "IBMPlexSans_600", fontSize: 10, fontWeight: "600", color: colors.label, textTransform: "uppercase", letterSpacing: 0.4 }}>
                {t("twoFactor.manualKey")}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
                <Text
                  numberOfLines={1}
                  style={{
                    flex: 1,
                    fontFamily: "IBMPlexSans_600",
                    fontSize: 13,
                    fontWeight: "600",
                    color: colors.ink,
                    letterSpacing: 1,
                  }}
                >
                  {secret}
                </Text>
                <Pressable
                  onPress={handleCopySecret}
                  accessibilityRole="button"
                  accessibilityLabel={t("twoFactor.copySecret")}
                  style={{ width: MIN_TAP_TARGET, height: MIN_TAP_TARGET, alignItems: "center", justifyContent: "center" }}
                >
                  <Ionicons name={secretCopied ? "checkmark" : "copy-outline"} size={18} color={colors.leaf} />
                </Pressable>
              </View>
              {secretCopied ? (
                <Text style={{ fontFamily: "IBMPlexSans", fontSize: 11, color: colors.leaf }}>
                  {t("twoFactor.secretCopied")}
                </Text>
              ) : null}
            </View>

            <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 14, fontWeight: "700", color: colors.ink, marginBottom: 4 }}>
              {t("twoFactor.verify")}
            </Text>
            <Text style={{ fontFamily: "IBMPlexSans", fontSize: 12, color: colors.label, marginBottom: space.md }}>
              {t("twoFactor.verifyHelp")}
            </Text>
            <OTPInput onComplete={handleVerify} accessibilityLabel={t("twoFactor.verify")} />
          </Card>
        ) : null}

        {pageState === "enabled" ? (
          <Card>
            <View style={{ flexDirection: "row", alignItems: "center", gap: space.md, marginBottom: space.md }}>
              <Ionicons name="shield-checkmark" size={28} color={colors.leaf} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 15, fontWeight: "700", color: colors.ink }}>
                  {t("twoFactor.title")}
                </Text>
                <Text style={{ fontFamily: "IBMPlexSans_600", fontSize: 12, fontWeight: "600", color: colors.leaf }}>
                  {t("twoFactor.active")}
                </Text>
              </View>
            </View>
            <Button
              label={t("twoFactor.disable")}
              onPress={() => setDisableVisible(true)}
              variant="destructive"
              fullWidth
              accessibilityLabel={t("twoFactor.disable")}
              accessibilityHint={t("twoFactor.disableConfirmMessage")}
            />
          </Card>
        ) : null}
      </ScrollView>

      <ConfirmDialog
        visible={disableVisible}
        title={t("twoFactor.disableConfirmTitle")}
        message={t("twoFactor.disableConfirmMessage")}
        confirmLabel={t("twoFactor.disable")}
        destructive
        onCancel={() => setDisableVisible(false)}
        onConfirm={handleDisable}
      />
    </TraderShell>
  );
}
