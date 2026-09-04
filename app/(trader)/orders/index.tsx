/**
 * Orders list: status filter chips, search by order number/restaurant/
 * billing name, tap-through to order detail. Source: `app/orders/page.tsx`.
 */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { router } from "expo-router";
import { useTheme } from "../../../src/theme/ThemeContext";
import { useI18n } from "../../../src/i18n";
import { TraderShell } from "../../../src/components/layout/TraderShell";
import { OrderRow } from "../../../src/components/data/OrderRow";
import { EmptyState } from "../../../src/components/data/EmptyState";
import { ErrorState } from "../../../src/components/data/ErrorState";
import { SkeletonRow } from "../../../src/components/data/SkeletonRow";
import { Input } from "../../../src/components/ui/Input";
import { Button } from "../../../src/components/ui/Button";
import { MOCK_ORDERS } from "../../../src/mocks/orders";
import { OrderStatus } from "../../../src/types/domain";
import { orderStatusKey } from "../../../src/lib/orderStatusLabel";

const FILTERS: (OrderStatus | "ALL")[] = [
  "ALL",
  OrderStatus.PENDING,
  OrderStatus.CONFIRMED,
  OrderStatus.DELIVERED,
  OrderStatus.CANCELLED,
];

/** Orders list screen: status filters, search, tap-through to detail. */
export default function OrdersScreen() {
  const { space } = useTheme();
  const t = useI18n();
  const [filter, setFilter] = useState<OrderStatus | "ALL">("ALL");
  const [query, setQuery] = useState("");
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
    return MOCK_ORDERS.filter((o) => {
      const matchesFilter = filter === "ALL" || o.status === filter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        o.orderNumber.toLowerCase().includes(q) ||
        o.restaurantName.toLowerCase().includes(q) ||
        o.billingName.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  return (
    <TraderShell title={t("orders.title")}>
      <ScrollView contentContainerStyle={{ padding: space.lg, gap: space.md }}>
        <Input
          value={query}
          onChangeText={setQuery}
          placeholder={t("orders.searchPlaceholder")}
          accessibilityLabel={t("orders.searchPlaceholder")}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row", gap: space.sm }}>
            {FILTERS.map((f) => {
              const label = f === "ALL" ? t("common.all") : t(orderStatusKey(f));
              return (
                <Button
                  key={f}
                  label={label}
                  onPress={() => setFilter(f)}
                  variant={filter === f ? "primary" : "secondary"}
                  size="sm"
                  accessibilityLabel={`${t("common.filter")}: ${label}`}
                />
              );
            })}
          </View>
        </ScrollView>

        {loading ? (
          <>
            <SkeletonRow height={90} />
            <SkeletonRow height={90} />
            <SkeletonRow height={90} />
          </>
        ) : isError ? (
          <ErrorState onRetry={load} />
        ) : filtered.length === 0 ? (
          <EmptyState icon="cube-outline" message={t("orders.empty")} />
        ) : (
          filtered.map((order) => (
            <OrderRow key={order.id} order={order} onPress={() => router.push(`/(trader)/orders/${order.id}`)} />
          ))
        )}
      </ScrollView>
    </TraderShell>
  );
}
