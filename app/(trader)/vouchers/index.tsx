/**
 * Vouchers list: Approved (ACTIVE/USED/SETTLED/MATURED) vs Expired tabs,
 * search, tap-to-open VoucherDetailsSheet. Source: `app/vouchers/page.tsx`.
 */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { useTheme } from "../../../src/theme/ThemeContext";
import { useI18n } from "../../../src/i18n";
import { TraderShell } from "../../../src/components/layout/TraderShell";
import { VoucherRow } from "../../../src/components/data/VoucherRow";
import { EmptyState } from "../../../src/components/data/EmptyState";
import { ErrorState } from "../../../src/components/data/ErrorState";
import { SkeletonRow } from "../../../src/components/data/SkeletonRow";
import { Input } from "../../../src/components/ui/Input";
import { Button } from "../../../src/components/ui/Button";
import { VoucherDetailsSheet } from "../../../src/components/modals/VoucherDetailsSheet";
import { MOCK_VOUCHERS } from "../../../src/mocks/vouchers";
import type { Voucher } from "../../../src/types/domain";

type Tab = "approved" | "expired";

/** Vouchers list screen: Approved/Expired tabs, search, detail sheet. */
export default function VouchersScreen() {
  const { space } = useTheme();
  const t = useI18n();
  const [tab, setTab] = useState<Tab>("approved");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Voucher | null>(null);
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

  const filtered = useMemo(() => {
    return MOCK_VOUCHERS.filter((v) => {
      const matchesTab = tab === "approved" ? v.status !== "EXPIRED" : v.status === "EXPIRED";
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || v.voucherCode.toLowerCase().includes(q) || v.restaurantName.toLowerCase().includes(q);
      return matchesTab && matchesQuery;
    });
  }, [tab, query]);

  return (
    <TraderShell title={t("vouchers.title")}>
      <ScrollView contentContainerStyle={{ padding: space.lg, gap: space.md }}>
        <View style={{ flexDirection: "row", gap: space.sm }}>
          <View style={{ flex: 1 }}>
            <Button
              label={t("vouchers.active")}
              onPress={() => setTab("approved")}
              variant={tab === "approved" ? "primary" : "secondary"}
              fullWidth
              accessibilityLabel={t("vouchers.active")}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              label={t("vouchers.expired")}
              onPress={() => setTab("expired")}
              variant={tab === "expired" ? "primary" : "secondary"}
              fullWidth
              accessibilityLabel={t("vouchers.expired")}
            />
          </View>
        </View>

        <Input
          value={query}
          onChangeText={setQuery}
          placeholder={t("vouchers.searchPlaceholder")}
          accessibilityLabel={t("vouchers.searchPlaceholder")}
        />

        {loading ? (
          <>
            <SkeletonRow height={90} />
            <SkeletonRow height={90} />
            <SkeletonRow height={90} />
          </>
        ) : isError ? (
          <ErrorState onRetry={load} />
        ) : filtered.length === 0 ? (
          <EmptyState icon="ticket-outline" message={t("vouchers.empty")} />
        ) : (
          filtered.map((voucher) => (
            <VoucherRow key={voucher.id} voucher={voucher} onPress={() => setSelected(voucher)} />
          ))
        )}
      </ScrollView>

      {selected ? (
        <VoucherDetailsSheet visible={!!selected} onClose={() => setSelected(null)} voucher={selected} />
      ) : null}
    </TraderShell>
  );
}
