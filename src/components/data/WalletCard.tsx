/**
 * Large full-width wallet summary card: pine background, paper text.
 * Shows balance + available/pending row + Top Up / Withdraw actions.
 */
import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { useI18n } from "../../i18n";
import { Button } from "../ui/Button";
import { formatRwf } from "../../lib/currency";
import type { TraderWallet } from "../../types/domain";

interface WalletCardProps {
  wallet: TraderWallet;
  onTopUp: () => void;
  onWithdraw: () => void;
}

/** Full-width wallet balance card with Top Up / Withdraw actions. */
export function WalletCard({ wallet, onTopUp, onWithdraw }: WalletCardProps) {
  const { colors, space, radius, shadow } = useTheme();
  const t = useI18n();

  return (
    <View
      style={[
        {
          backgroundColor: colors.pine,
          borderRadius: radius.md,
          padding: space.lg,
          gap: space.md,
        },
        shadow.card,
      ]}
    >
      <Text style={{ fontFamily: "IBMPlexSans", fontSize: 13, color: colors.paper, opacity: 0.85 }}>
        {t("wallet.balance")}
      </Text>
      <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 32, fontWeight: "700", color: colors.paper }}>
        {formatRwf(wallet.balance)}
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text style={{ fontFamily: "IBMPlexSans", fontSize: 12, color: colors.paper, opacity: 0.75 }}>
            {t("wallet.available")}
          </Text>
          <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 15, fontWeight: "700", color: colors.paper }}>
            {formatRwf(wallet.availableBalance)}
          </Text>
        </View>
        <View>
          <Text style={{ fontFamily: "IBMPlexSans", fontSize: 12, color: colors.paper, opacity: 0.75 }}>
            {t("wallet.pending")}
          </Text>
          <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 15, fontWeight: "700", color: colors.paper }}>
            {formatRwf(wallet.pendingApprovedAmount)}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: space.sm, marginTop: space.xs }}>
        <View style={{ flex: 1 }}>
          <Button label={t("wallet.topUp")} onPress={onTopUp} accessibilityLabel="Top up wallet" fullWidth />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            label={t("wallet.withdraw")}
            onPress={onWithdraw}
            variant="secondary"
            accessibilityLabel="Request withdrawal"
            fullWidth
          />
        </View>
      </View>
    </View>
  );
}
