/**
 * Login screen. Mocked auth: any identifier/password combination that
 * isn't the "wrong role" demo email logs in as MOCK_TRADER. Mirrors the web
 * app's `login/page.tsx` fields (identifier + password + remember me +
 * forgot-password link) without a live backend health check.
 */
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { useTheme } from "../../src/theme/ThemeContext";
import { useI18n } from "../../src/i18n";
import { Input } from "../../src/components/ui/Input";
import { Button } from "../../src/components/ui/Button";
import { loginAs } from "../../src/stores/authStore";
import { MOCK_TRADER, MOCK_NON_TRADER_EMAIL } from "../../src/mocks/auth";

/** Trader sign-in screen: identifier + password, mocked authentication. */
export default function LoginScreen() {
  const { colors, space } = useTheme();
  const t = useI18n();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(): void {
    setError("");
    if (!identifier.trim() || !password.trim()) {
      setError(t("common.error"));
      return;
    }
    if (identifier.trim().toLowerCase() === MOCK_NON_TRADER_EMAIL) {
      setError(t("auth.wrongRole"));
      return;
    }
    loginAs(MOCK_TRADER);
    router.replace(MOCK_TRADER.agreementAccepted ? "/(trader)/dashboard" : "/agreement");
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.oat }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: space.xl }}>
        <Text
          style={{
            fontFamily: "SpaceGrotesk_700",
            fontSize: 24,
            fontWeight: "700",
            color: colors.pine,
            marginBottom: space.xxl,
            textAlign: "center",
          }}
        >
          FoodBundles Trader
        </Text>

        {error ? (
          <View
            style={{
              backgroundColor: "#FDEAEA",
              borderRadius: 8,
              padding: space.md,
              marginBottom: space.md,
            }}
          >
            <Text style={{ fontFamily: "IBMPlexSans", fontSize: 13, color: colors.chili }}>{error}</Text>
          </View>
        ) : null}

        <View style={{ gap: space.md }}>
          <Input
            label={t("auth.identifier")}
            value={identifier}
            onChangeText={setIdentifier}
            autoCapitalize="none"
            accessibilityLabel={t("auth.identifier")}
          />
          <Input
            label={t("auth.password")}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            accessibilityLabel={t("auth.password")}
          />

          <Button label={t("auth.login")} onPress={handleSubmit} fullWidth accessibilityLabel={t("auth.login")} />

          <Button
            label={t("auth.forgotPassword")}
            onPress={() => router.push("/(auth)/forgot-password")}
            variant="ghost"
            fullWidth
            accessibilityLabel={t("auth.forgotPassword")}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
