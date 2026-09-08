/**
 * Commission summary card: mode badge, rate, this-month earned, sparkline
 * trend, "View settings" link.
 */
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { useI18n } from "../../i18n";
import { Card } from "../ui/Card";
import { StatusBadge } from "../ui/StatusBadge";
import { Sparkline } from "../charts/Sparkline";
import { formatRwf } from "../../lib/currency";
import { MIN_TAP_TARGET } from "../../theme/tokens";
import type { CommissionMonth } from "../../types/domain-extra";
import type { CommissionMode } from "../../types/domain";

interface CommissionCardProps {
  mode: CommissionMode;
  rate: number;
  earnedThisMonth: number;
  months: CommissionMonth[];
  onViewSettings: () => void;
}

/** Dashboard commission summary card with a 6-month trend sparkline. */
export function CommissionCard({ mode, rate, earnedThisMonth, months, onViewSettings }: CommissionCardProps) {
  const { colors, space } = useTheme();
  const t = useI18n();
  const trend = months.map((m) => m.earned);

  return (
    <Card>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
        <View>
          <Text style={{ fontFamily: "IBMPlexSans", fontSize: 12, color: colors.label }}>
            {t("commission.mode")}
          </Text>
          <StatusBadge
            label={mode === "NORMAL" ? t("commission.normal") : t("commission.fixed")}
            tone={{ bg: colors.oat, text: colors.leaf }}
          />
        </View>
        <Sparkline values={trend} />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: space.md }}>
        <View>
          <Text style={{ fontFamily: "IBMPlexSans", fontSize: 12, color: colors.label }}>
            {t("commission.rate")}
          </Text>
          <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 15, fontWeight: "700", color: colors.ink }}>
            {rate}%
          </Text>
        </View>
        <View>
          <Text style={{ fontFamily: "IBMPlexSans", fontSize: 12, color: colors.label }}>
            {t("commission.earned")}
          </Text>
          <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 15, fontWeight: "700", color: colors.leaf }}>
            {formatRwf(earnedThisMonth)}
          </Text>
        </View>
      </View>

      <Pressable
        onPress={onViewSettings}
        accessibilityRole="button"
        accessibilityLabel={t("dashboard.viewSettings")}
        style={{ minHeight: MIN_TAP_TARGET, justifyContent: "center", marginTop: space.sm }}
      >
        <Text style={{ fontFamily: "IBMPlexSans_600", fontSize: 13, fontWeight: "600", color: colors.leaf }}>
          {t("dashboard.viewSettings")} →
        </Text>
      </Pressable>
    </Card>
  );
}
