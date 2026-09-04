/**
 * Tappable settings navigation row: icon + label + right chevron.
 * Used on the Settings index screen to link to each sub-screen.
 */
import React from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeContext";
import { MIN_TAP_TARGET } from "../../theme/tokens";
import { Card } from "../ui/Card";

interface SettingsNavRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}

/** A single settings nav list row, wrapped in a Card, min 44px tall. */
export function SettingsNavRow({ icon, label, onPress }: SettingsNavRowProps) {
  const { colors, space } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={{ minHeight: MIN_TAP_TARGET }}
    >
      <Card>
        <View style={{ flexDirection: "row", alignItems: "center", gap: space.md }}>
          <Ionicons name={icon} size={20} color={colors.leaf} />
          <Text style={{ flex: 1, fontFamily: "IBMPlexSans_600", fontSize: 14, fontWeight: "600", color: colors.ink }}>
            {label}
          </Text>
          <Ionicons name="chevron-forward" size={18} color={colors.label} />
        </View>
      </Card>
    </Pressable>
  );
}
