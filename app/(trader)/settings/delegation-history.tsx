/**
 * Delegation History: paginated event log (REQUESTED/APPROVED/ACCEPTED/
 * REVERSED), newest first. Source:
 * `app/settings/delegation-history/_component/DelegationHistory.tsx`.
 * Simulates an async load (mocked) so loading/error states are exercised.
 */
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { router } from "expo-router";
import { useTheme } from "../../../src/theme/ThemeContext";
import { useI18n } from "../../../src/i18n";
import { TraderShell } from "../../../src/components/layout/TraderShell";
import { EmptyState } from "../../../src/components/data/EmptyState";
import { ErrorState } from "../../../src/components/data/ErrorState";
import { SkeletonRow } from "../../../src/components/data/SkeletonRow";
import { DelegationHistoryRow } from "../../../src/components/data/DelegationHistoryRow";
import { useDelegationStore } from "../../../src/stores/delegationStore";

/** Delegation history list screen with loading, empty, and error states. */
export default function DelegationHistoryScreen() {
  const { space, colors } = useTheme();
  const t = useI18n();
  const { history } = useDelegationStore();
  const [loading, setLoading] = useState(true);
  const [isError] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 400);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const sorted = [...history].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <TraderShell title={t("history.title")} showBack onBack={() => router.back()}>
      {loading ? (
        <ScrollView contentContainerStyle={{ padding: space.lg, gap: space.md }}>
          <SkeletonRow height={70} />
          <SkeletonRow height={70} />
          <SkeletonRow height={70} />
        </ScrollView>
      ) : isError ? (
        <ErrorState onRetry={load} />
      ) : (
        <ScrollView contentContainerStyle={{ padding: space.lg, gap: space.md }}>
          <Text style={{ fontFamily: "IBMPlexSans", fontSize: 13, color: colors.label }}>
            {t("history.subtitle")}
          </Text>
          {sorted.length === 0 ? (
            <EmptyState icon="time-outline" message={t("history.empty")} />
          ) : (
            sorted.map((event) => <DelegationHistoryRow key={event.id} event={event} />)
          )}
        </ScrollView>
      )}
    </TraderShell>
  );
}
