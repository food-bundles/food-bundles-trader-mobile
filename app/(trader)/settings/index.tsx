/**
 * Settings index: delegation/commission/rate info card, nav list to
 * sub-screens, and the language switcher. Source: `app/settings/manage/page.tsx`.
 */
import React from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { useTheme } from "../../../src/theme/ThemeContext";
import { useI18n } from "../../../src/i18n";
import { TraderShell } from "../../../src/components/layout/TraderShell";
import { Card } from "../../../src/components/ui/Card";
import { SettingsNavRow } from "../../../src/components/data/SettingsNavRow";
import { LanguageSwitcher } from "../../../src/components/data/LanguageSwitcher";
import { DelegationStatusBadge } from "../../../src/components/ui/DomainBadges";
import { useDelegationStore } from "../../../src/stores/delegationStore";
import { useCommissionMode } from "../../../src/stores/commissionStore";
import { MOCK_WALLET } from "../../../src/mocks/wallet";
import { ScrollView } from "react-native";

/** Settings index: status summary, navigation list, language switcher. */
export default function SettingsScreen() {
  const { colors, space } = useTheme();
  const t = useI18n();
  const { status: delegationStatus } = useDelegationStore();
  const commissionMode = useCommissionMode();

  return (
    <TraderShell title={t("settings.title")}>
      <ScrollView contentContainerStyle={{ padding: space.lg, gap: space.md }}>
        <Text style={{ fontFamily: "IBMPlexSans", fontSize: 13, color: colors.label }}>
          {t("settings.subtitle")}
        </Text>

        <Card>
          <View style={{ gap: space.md }}>
            <InfoRow
              label={t("settings.delegationStatusLabel")}
              value={<DelegationStatusBadge status={delegationStatus.status} />}
            />
            <InfoRow
              label={t("settings.commissionModeLabel")}
              value={
                <Text style={{ fontFamily: "IBMPlexSans_600", fontSize: 13, fontWeight: "600", color: colors.ink }}>
                  {commissionMode === "FIXED" ? t("commission.fixed") : t("commission.normal")}
                </Text>
              }
            />
            <InfoRow
              label={t("settings.commissionRateLabel")}
              value={
                <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 14, fontWeight: "700", color: colors.ink }}>
                  {MOCK_WALLET.commission}%
                </Text>
              }
            />
          </View>
        </Card>

        <View style={{ gap: space.sm }}>
          <SettingsNavRow
            icon="people-outline"
            label={t("settings.delegation")}
            onPress={() => router.push("/(trader)/settings/delegation")}
          />
          <SettingsNavRow
            icon="pricetag-outline"
            label={t("settings.commission")}
            onPress={() => router.push("/(trader)/settings/commission")}
          />
          <SettingsNavRow
            icon="time-outline"
            label={t("settings.delegationHistory")}
            onPress={() => router.push("/(trader)/settings/delegation-history")}
          />
          <SettingsNavRow
            icon="shield-checkmark-outline"
            label={t("settings.authenticator")}
            onPress={() => router.push("/(trader)/settings/authenticator")}
          />
        </View>

        <Card>
          <Text
            style={{
              fontFamily: "SpaceGrotesk_700",
              fontSize: 14,
              fontWeight: "700",
              color: colors.ink,
              marginBottom: space.sm,
            }}
          >
            {t("settings.language")}
          </Text>
          <LanguageSwitcher />
        </Card>
      </ScrollView>
    </TraderShell>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      <Text style={{ fontFamily: "IBMPlexSans", fontSize: 13, color: colors.label }}>{label}</Text>
      {value}
    </View>
  );
}
