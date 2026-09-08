/**
 * Forgot Password screen. Mirrors the web app's `forgot-password/page.tsx`:
 * email field + "Send reset link" button, success confirmation card, back
 * arrow to Login. Fully mocked — no email is actually sent.
 */
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { useTheme } from "../../src/theme/ThemeContext";
import { useI18n } from "../../src/i18n";
import { Input } from "../../src/components/ui/Input";
import { Button } from "../../src/components/ui/Button";
import { Header } from "../../src/components/layout/Header";

/** Password-reset request screen: email + confirmation card. */
export default function ForgotPasswordScreen() {
  const { colors, space, surfaceTint, radius } = useTheme();
  const t = useI18n();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: colors.oat }}>
      <Header title={t("auth.forgotPassword")} showBack onBack={() => router.back()} />
      <ScrollView contentContainerStyle={{ padding: space.xl, gap: space.md }}>
        {sent ? (
          <View style={{ backgroundColor: surfaceTint.success, borderRadius: radius.sm, padding: space.lg }}>
            <Text style={{ fontFamily: "IBMPlexSans", fontSize: 14, color: colors.ripe }}>
              {t("auth.resetSent")}
            </Text>
          </View>
        ) : (
          <>
            <Input
              label={t("auth.identifier")}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              accessibilityLabel="Email address"
            />
            <Button
              label={t("auth.sendResetLink")}
              onPress={() => setSent(true)}
              disabled={!email.includes("@")}
              fullWidth
              accessibilityLabel={t("auth.sendResetLink")}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
}
