/**
 * Custom bottom tab bar for the 5 trader sections. Rendered by
 * `(trader)/_layout.tsx` via `tabBar={(props) => <BottomTabBar ... />}`.
 * Active tab: leaf icon + leaf label. Inactive: label-colour icon + text.
 */
import React from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useTheme } from "../../theme/ThemeContext";
import { useI18n } from "../../i18n";
import { MIN_TAP_TARGET } from "../../theme/tokens";

const TAB_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  dashboard: "home-outline",
  loans: "document-text-outline",
  vouchers: "ticket-outline",
  orders: "cube-outline",
  settings: "settings-outline",
};

const TAB_ICONS_ACTIVE: Record<string, keyof typeof Ionicons.glyphMap> = {
  dashboard: "home",
  loans: "document-text",
  vouchers: "ticket",
  orders: "cube",
  settings: "settings",
};

const TAB_LABEL_KEYS: Record<string, "nav.dashboard" | "nav.loans" | "nav.vouchers" | "nav.orders" | "nav.settings"> = {
  dashboard: "nav.dashboard",
  loans: "nav.loans",
  vouchers: "nav.vouchers",
  orders: "nav.orders",
  settings: "nav.settings",
};

/** Bottom tab bar: 5 fixed sections, min 44pt-wide tap targets. */
export function BottomTabBar({ state, navigation }: BottomTabBarProps) {
  const { colors, space } = useTheme();
  const insets = useSafeAreaInsets();
  const t = useI18n();

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: colors.paper,
        borderTopWidth: 1,
        borderTopColor: colors.hairline,
        height: 56 + insets.bottom,
        paddingBottom: insets.bottom,
      }}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const labelKey = TAB_LABEL_KEYS[route.name];
        const label = labelKey ? t(labelKey) : route.name;
        const icon = (isFocused ? TAB_ICONS_ACTIVE[route.name] : TAB_ICONS[route.name]) ?? "ellipse-outline";

        function handlePress(): void {
          const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        }

        return (
          <Pressable
            key={route.key}
            onPress={handlePress}
            accessibilityRole="button"
            accessibilityLabel={label}
            accessibilityState={{ selected: isFocused }}
            style={{
              flex: 1,
              minWidth: MIN_TAP_TARGET,
              minHeight: MIN_TAP_TARGET,
              alignItems: "center",
              justifyContent: "center",
              gap: space.xs / 2,
            }}
          >
            <Ionicons name={icon} size={22} color={isFocused ? colors.leaf : colors.label} />
            <Text
              style={{
                fontFamily: "IBMPlexSans_600",
                fontSize: 11,
                fontWeight: "600",
                color: isFocused ? colors.leaf : colors.label,
              }}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
