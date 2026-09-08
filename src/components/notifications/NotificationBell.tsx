/**
 * Bell icon with an unread-count badge (marigold dot, caps at "99+").
 * Rotates ±8° twice when the unread count increases, per the motion SKILL.
 */
import React, { useEffect, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated";
import { useTheme } from "../../theme/ThemeContext";
import { MIN_TAP_TARGET } from "../../theme/tokens";
import { useNotificationStore, unreadCount as countUnread } from "../../stores/notificationStore";

interface NotificationBellProps {
  onPress?: () => void;
}

/** Notification bell button used in the header; shows live unread count. */
export function NotificationBell({ onPress }: NotificationBellProps) {
  const { colors } = useTheme();
  const { notifications } = useNotificationStore();
  const unread = countUnread(notifications);
  const rotate = useSharedValue(0);
  const prevUnread = useRef(unread);

  useEffect(() => {
    if (unread > prevUnread.current) {
      rotate.value = withSequence(
        withTiming(8, { duration: 60 }),
        withTiming(-8, { duration: 120 }),
        withTiming(8, { duration: 120 }),
        withTiming(0, { duration: 60 })
      );
    }
    prevUnread.current = unread;
  }, [unread, rotate]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  const badgeLabel = unread > 99 ? "99+" : String(unread);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Notifications, ${unread} unread`}
      style={{
        width: MIN_TAP_TARGET,
        height: MIN_TAP_TARGET,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Animated.View style={animStyle}>
        <Ionicons name="notifications-outline" size={22} color={colors.ink} />
        {unread > 0 ? (
          <View
            style={{
              position: "absolute",
              top: -2,
              right: -6,
              minWidth: 16,
              height: 16,
              borderRadius: 8,
              paddingHorizontal: 3,
              backgroundColor: colors.marigold,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontFamily: "IBMPlexSans_600", fontSize: 9, fontWeight: "600", color: colors.ink }}>
              {badgeLabel}
            </Text>
          </View>
        ) : null}
      </Animated.View>
    </Pressable>
  );
}
