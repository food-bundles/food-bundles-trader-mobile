/**
 * Sticky screen header: optional back arrow, centred title, optional
 * NotificationBell + avatar on the right. Does not scroll with content.
 */
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../theme/ThemeContext";
import { MIN_TAP_TARGET } from "../../theme/tokens";
import { NotificationBell } from "../notifications/NotificationBell";

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  showBell?: boolean;
  onBellPress?: () => void;
  avatarUri?: string;
}

/** App-wide sticky header used by TraderShell and full-focus screens. */
export function Header({
  title,
  showBack = false,
  onBack,
  showBell = false,
  onBellPress,
  avatarUri,
}: HeaderProps) {
  const { colors, space } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top,
        backgroundColor: colors.paper,
        borderBottomWidth: 1,
        borderBottomColor: colors.hairline,
      }}
    >
      <View
        style={{
          height: 56,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: space.sm,
        }}
      >
        <View style={{ width: MIN_TAP_TARGET }}>
          {showBack ? (
            <Pressable
              onPress={onBack}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              style={{
                width: MIN_TAP_TARGET,
                height: MIN_TAP_TARGET,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="arrow-back" size={22} color={colors.ink} />
            </Pressable>
          ) : null}
        </View>

        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            textAlign: "center",
            fontFamily: "SpaceGrotesk_700",
            fontSize: 20,
            fontWeight: "700",
            color: colors.ink,
          }}
        >
          {title}
        </Text>

        <View
          style={{
            width: MIN_TAP_TARGET + (avatarUri ? 40 : 0),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: space.sm,
          }}
        >
          {showBell ? <NotificationBell onPress={onBellPress} /> : null}
          {avatarUri ? (
            <Image
              source={{ uri: avatarUri }}
              accessibilityLabel="Your profile photo"
              style={{ width: 32, height: 32, borderRadius: 16 }}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
}
