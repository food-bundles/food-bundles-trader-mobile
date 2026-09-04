/**
 * Order detail screen: header, restaurant, itemised list with photos,
 * voucher applied section, totals, payment info, billing. A real detail
 * screen — the web source only logs to console on "view details"; mobile
 * builds the full screen per CLAUDE.md's instruction.
 */
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useTheme } from "../../../src/theme/ThemeContext";
import { useI18n } from "../../../src/i18n";
import { TraderShell } from "../../../src/components/layout/TraderShell";
import { Card } from "../../../src/components/ui/Card";
import { OrderStatusBadge, VoucherTypeChip } from "../../../src/components/ui/DomainBadges";
import { OrderItemRow } from "../../../src/components/data/OrderItemRow";
import { ErrorState } from "../../../src/components/data/ErrorState";
import { formatRwf } from "../../../src/lib/currency";
import { formatDate } from "../../../src/lib/date";
import { MOCK_ORDERS } from "../../../src/mocks/orders";
import { VoucherType } from "../../../src/types/domain";

/** Full order detail: items with photos, voucher applied, totals, billing. */
export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors, space } = useTheme();
  const t = useI18n();
  const order = MOCK_ORDERS.find((o) => o.id === id);

  if (!order) {
    return (
      <TraderShell title={t("orders.detail")} showBack onBack={() => router.back()}>
        <ErrorState message={`${t("orders.detail")}: ${t("common.notFound")}`} onRetry={() => router.back()} />
      </TraderShell>
    );
  }

  const subtotal = order.orderItems.reduce((sum, item) => sum + item.subtotal, 0);
  const discountAmount = Math.round((subtotal * order.discountPercentage) / 100);
  const voucherTypeKey = `DISCOUNT_${order.discountPercentage}` as VoucherType;

  return (
    <TraderShell title={t("orders.detail")} showBack onBack={() => router.back()}>
      <ScrollView contentContainerStyle={{ padding: space.lg, gap: space.md }}>
        <Card>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
            <View>
              <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 18, fontWeight: "700", color: colors.leaf }}>
                {order.orderNumber}
              </Text>
              <Text style={{ fontFamily: "IBMPlexSans", fontSize: 12, color: colors.label, marginTop: 2 }}>
                {formatDate(order.createdAt)}
              </Text>
            </View>
            <OrderStatusBadge status={order.status} />
          </View>
        </Card>

        <Card>
          <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 14, fontWeight: "700", color: colors.ink, marginBottom: space.xs }}>
            {order.restaurantName}
          </Text>
          <Row label={t("common.phone")} value={order.billingPhone} colors={colors} />
          <Row label={t("common.email")} value={order.billingEmail} colors={colors} />
        </Card>

        <Card>
          <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 14, fontWeight: "700", color: colors.ink, marginBottom: space.xs }}>
            {t("orders.items")}
          </Text>
          {order.orderItems.map((item) => (
            <OrderItemRow key={item.id} item={item} />
          ))}
        </Card>

        <Card>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: space.sm }}>
            <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 14, fontWeight: "700", color: colors.ink }}>
              {t("orders.voucherApplied")}
            </Text>
            {VOUCHER_TYPE_VALUES.has(voucherTypeKey) ? <VoucherTypeChip type={voucherTypeKey} /> : null}
          </View>
          <Row label="Code" value={order.voucherCode} colors={colors} />
          <Row
            label={t("orders.saved")}
            value={formatRwf(discountAmount)}
            colors={colors}
            valueColor={colors.ripe}
          />
        </Card>

        <Card>
          <Row label={t("orders.subtotal")} value={formatRwf(subtotal)} colors={colors} />
          <Row label={t("orders.discount")} value={`-${formatRwf(discountAmount)}`} colors={colors} valueColor={colors.ripe} />
          <Row label={t("orders.total")} value={formatRwf(order.totalAmount)} colors={colors} />
        </Card>

        <Card>
          <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 14, fontWeight: "700", color: colors.ink, marginBottom: space.xs }}>
            {t("orders.payment")}
          </Text>
          <Row label={t("common.method")} value={order.paymentMethod} colors={colors} />
          <Row label={t("common.reference")} value={order.voucherCode} colors={colors} />
        </Card>

        <Card>
          <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 14, fontWeight: "700", color: colors.ink, marginBottom: space.xs }}>
            {t("orders.billing")}
          </Text>
          <Row label={t("common.name")} value={order.billingName} colors={colors} />
          <Row label={t("common.phone")} value={order.billingPhone} colors={colors} />
          <Row label={t("common.email")} value={order.billingEmail} colors={colors} />
        </Card>
      </ScrollView>
    </TraderShell>
  );
}

const VOUCHER_TYPE_VALUES = new Set(Object.values(VoucherType));

function Row({ label, value, colors, valueColor }: { label: string; value: string; colors: { ink: string; label: string }; valueColor?: string }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 4 }}>
      <Text style={{ fontFamily: "IBMPlexSans", fontSize: 13, color: colors.label }}>{label}</Text>
      <Text style={{ fontFamily: "IBMPlexSans_600", fontSize: 13, fontWeight: "600", color: valueColor ?? colors.ink }}>
        {value}
      </Text>
    </View>
  );
}
