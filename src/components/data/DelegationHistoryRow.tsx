/**
 * A single delegation history event row: event-type icon + label,
 * relative timestamp, optional note. Source:
 * `app/settings/delegation-history/_component/DelegationHistory.tsx`.
 */
import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeContext";
import { useI18n } from "../../i18n";
import { Card } from "../ui/Card";
import { formatRelative } from "../../lib/date";
import type { DelegationHistoryEvent, DelegationEventType } from "../../types/domain-extra";

const EVENT_ICON: Record<DelegationEventType, keyof typeof Ionicons.glyphMap> = {
  REQUESTED: "paper-plane-outline",
  APPROVED: "checkmark-circle-outline",
  ACCEPTED: "shield-checkmark-outline",
  REVERSED: "arrow-undo-outline",
};

const EVENT_LABEL_KEY: Record<DelegationEventType, "history.requested" | "history.approved" | "history.accepted" | "history.reversed"> = {
  REQUESTED: "history.requested",
  APPROVED: "history.approved",
  ACCEPTED: "history.accepted",
  REVERSED: "history.reversed",
};

/** A single row in the delegation history list. */
export function DelegationHistoryRow({ event }: { event: DelegationHistoryEvent }) {
  const { colors, space } = useTheme();
  const t = useI18n();

  return (
    <Card>
      <View style={{ flexDirection: "row", gap: space.md, alignItems: "flex-start" }}>
        <Ionicons name={EVENT_ICON[event.event]} size={20} color={colors.leaf} />
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontFamily: "IBMPlexSans_600", fontSize: 14, fontWeight: "600", color: colors.ink }}>
              {t(EVENT_LABEL_KEY[event.event])}
            </Text>
            <Text style={{ fontFamily: "IBMPlexSans", fontSize: 11, color: colors.label }}>
              {formatRelative(event.timestamp)}
            </Text>
          </View>
          {event.note ? (
            <Text style={{ fontFamily: "IBMPlexSans", fontSize: 12, color: colors.label, marginTop: 2 }}>
              {event.note}
            </Text>
          ) : null}
        </View>
      </View>
    </Card>
  );
}
