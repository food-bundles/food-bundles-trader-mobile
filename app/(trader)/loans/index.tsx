/**
 * Loan applications list: stat cards, status filter chips, search, list
 * with loading/empty/error states. Source: `app/credit/page.tsx`.
 */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { router } from "expo-router";
import { useTheme } from "../../../src/theme/ThemeContext";
import { useI18n } from "../../../src/i18n";
import { TraderShell } from "../../../src/components/layout/TraderShell";
import { StatCard } from "../../../src/components/data/StatCard";
import { LoanRow } from "../../../src/components/data/LoanRow";
import { EmptyState } from "../../../src/components/data/EmptyState";
import { ErrorState } from "../../../src/components/data/ErrorState";
import { SkeletonRow } from "../../../src/components/data/SkeletonRow";
import { Input } from "../../../src/components/ui/Input";
import { Button } from "../../../src/components/ui/Button";
import { MOCK_LOANS } from "../../../src/mocks/loans";
import { LoanStatus } from "../../../src/types/domain";

const FILTERS: (LoanStatus | "ALL")[] = [
  "ALL",
  LoanStatus.PENDING,
  LoanStatus.APPROVED,
  LoanStatus.ACCEPTED,
  LoanStatus.DISBURSED,
  LoanStatus.REJECTED,
  LoanStatus.SETTLED,
];

/** Loan applications list screen with stat cards, filters, and search. */
export default function LoansScreen() {
  const { space } = useTheme();
  const t = useI18n();
  const [loading, setLoading] = useState(true);
  const [isError] = useState(false);
  const [filter, setFilter] = useState<LoanStatus | "ALL">("ALL");
  const [query, setQuery] = useState("");

  const load = useCallback(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 400);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    return MOCK_LOANS.filter((l) => {
      const matchesFilter = filter === "ALL" || l.status === filter;
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || l.restaurantName.toLowerCase().includes(q) || l.id.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  const total = MOCK_LOANS.length;
  const pending = MOCK_LOANS.filter((l) => l.status === LoanStatus.PENDING).length;
  const approved = MOCK_LOANS.filter((l) => l.status === LoanStatus.APPROVED).length;
  const rejected = MOCK_LOANS.filter((l) => l.status === LoanStatus.REJECTED).length;

  return (
    <TraderShell title={t("loans.title")}>
      <ScrollView contentContainerStyle={{ padding: space.lg, gap: space.md }}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space.sm }}>
          <View style={{ flexBasis: "47%", flexGrow: 1 }}>
            <StatCard label={t("loans.total")} value={String(total)} />
          </View>
          <View style={{ flexBasis: "47%", flexGrow: 1 }}>
            <StatCard label={t("loans.pending")} value={String(pending)} deltaTone="marigold" />
          </View>
          <View style={{ flexBasis: "47%", flexGrow: 1 }}>
            <StatCard label={t("loans.approved")} value={String(approved)} deltaTone="ripe" />
          </View>
          <View style={{ flexBasis: "47%", flexGrow: 1 }}>
            <StatCard label={t("loans.rejected")} value={String(rejected)} deltaTone="chili" />
          </View>
        </View>

        <Input
          value={query}
          onChangeText={setQuery}
          placeholder={t("loans.searchPlaceholder")}
          accessibilityLabel={t("loans.searchPlaceholder")}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row", gap: space.sm }}>
            {FILTERS.map((f) => (
              <Button
                key={f}
                label={f === "ALL" ? t("loans.total") : f}
                onPress={() => setFilter(f)}
                variant={filter === f ? "primary" : "secondary"}
                size="sm"
                accessibilityLabel={`Filter: ${f}`}
              />
            ))}
          </View>
        </ScrollView>

        {loading ? (
          <>
            <SkeletonRow height={110} />
            <SkeletonRow height={110} />
            <SkeletonRow height={110} />
          </>
        ) : isError ? (
          <ErrorState onRetry={load} />
        ) : filtered.length === 0 ? (
          <EmptyState icon="document-text-outline" message={t("loans.empty")} />
        ) : (
          filtered.map((loan) => (
            <LoanRow key={loan.id} loan={loan} onPress={() => router.push(`/(trader)/loans/${loan.id}`)} />
          ))
        )}
      </ScrollView>
    </TraderShell>
  );
}
