/**
 * Bottom-sheet notification drawer (85% height). Mirrors the web app's
 * `notificationDrawer.tsx`: "Mark all read" action, tappable rows that
 * deep-link to the relevant screen, relative timestamps.
 */
import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTheme } from "../../theme/ThemeContext";
import { useI18n } from "../../i18n";
import { MIN_TAP_TARGET } from "../../theme/tokens";
import { formatRelative } from "../../lib/date";
import {
  useNotificationStore,
  markNotificationRead,
  markAllNotificationsRead,
  unreadCount as countUnread,
} from "../../stores/notificationStore";
import { EmptyState } from "../data/EmptyState";
import type { TraderNotification, NotificationType } from "../../types/domain-extra";

interface NotificationDrawerProps {
  visible: boolean;
  onClose: () => void;
}

const TYPE_ICON: Record<NotificationType, keyof typeof Ionicons.glyphMap> = {
  LOAN_REQUEST: "document-text-outline",
  LOAN_APPROVED: "checkmark-circle-outline",
  VOUCHER_USED: "ticket-outline",
  REPAYMENT_DUE: "alert-circle-outline",
  WITHDRAWAL_APPROVED: "cash-outline",
  SYSTEM: "information-circle-outline",
};

/** A single tappable notification row. */
function NotificationRow({ item, onPress }: { item: TraderNotification; onPress: () => void }) {
  const { colors, space, radius } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${item.title}. ${item.read ? "Read" : "Unread"}`}
      style={{
        flexDirection: "row",
        gap: space.md,
        paddingVertical: space.md,
        paddingHorizontal: space.lg,
        backgroundColor: item.read ? "transparent" : colors.oat,
        borderRadius: radius.md,
        minHeight: MIN_TAP_TARGET,
      }}
    >
      <Ionicons name={TYPE_ICON[item.type]} size={22} color={item.read ? colors.label : colors.leaf} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: "IBMPlexSans_600", fontSize: 14, fontWeight: "600", color: colors.ink }}>
          {item.title}
        </Text>
        <Text style={{ fontFamily: "IBMPlexSans", fontSize: 13, color: colors.label, marginTop: 2 }}>
          {item.body}
        </Text>
        <Text style={{ fontFamily: "IBMPlexSans", fontSize: 11, color: colors.label, marginTop: 4 }}>
          {formatRelative(item.timestamp)}
        </Text>
      </View>
      {!item.read ? (
        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.marigold, marginTop: 6 }} />
      ) : null}
    </Pressable>
  );
}

/** 85%-height bottom sheet listing the trader's notifications. */
export function NotificationDrawer({ visible, onClose }: NotificationDrawerProps) {
  const { colors, space, radius } = useTheme();
  const t = useI18n();
  const { notifications } = useNotificationStore();
  const unread = countUnread(notifications);

  function handlePressItem(item: TraderNotification): void {
    markNotificationRead(item.id);
    onClose();
    if (item.deepLink) {
      router.push(item.deepLink as never);
    }
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable
        onPress={onClose}
        accessibilityLabel="Close notifications"
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" }}
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={{
            height: "85%",
            backgroundColor: colors.paper,
            borderTopLeftRadius: radius.lg,
            borderTopRightRadius: radius.lg,
            padding: space.lg,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 20, fontWeight: "700", color: colors.ink }}>
              {t("notifications.title")}
            </Text>
            {unread > 0 ? (
              <Pressable
                onPress={markAllNotificationsRead}
                accessibilityRole="button"
                accessibilityLabel={t("notifications.markAllRead")}
                style={{ minHeight: MIN_TAP_TARGET, justifyContent: "center", paddingHorizontal: space.sm }}
              >
                <Text style={{ fontFamily: "IBMPlexSans_600", fontSize: 13, fontWeight: "600", color: colors.leaf }}>
                  {t("notifications.markAllRead")}
                </Text>
              </Pressable>
            ) : null}
          </View>

          {notifications.length === 0 ? (
            <EmptyState icon="notifications-off-outline" message={t("notifications.empty")} />
          ) : (
            <View style={{ marginTop: space.md, gap: space.xs }}>
              {notifications.map((item) => (
                <NotificationRow key={item.id} item={item} onPress={() => handlePressItem(item)} />
              ))}
            </View>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
