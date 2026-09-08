/**
 * Numeric amount field. Formats as thousands-separated on blur, shows an
 * inline "RWF" suffix, renders the number in SpaceGrotesk per the design
 * system's rule that all prices use the heading font.
 */
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { formatAmount } from "../../lib/currency";

interface AmountInputProps {
  label?: string;
  value: number;
  onChangeValue: (value: number) => void;
  max?: number;
  error?: string;
  accessibilityLabel: string;
}

function parseDigits(text: string): number {
  const digitsOnly = text.replace(/[^0-9]/g, "");
  return digitsOnly ? Number(digitsOnly) : 0;
}

/** A numeric amount field with thousands-separated display and RWF suffix. */
export function AmountInput({
  label,
  value,
  onChangeValue,
  max,
  error,
  accessibilityLabel,
}: AmountInputProps) {
  const { colors, radius, space } = useTheme();
  const [focused, setFocused] = useState(false);
  const [text, setText] = useState(value > 0 ? formatAmount(value) : "");

  const isOverMax = max !== undefined && value > max;
  const borderColor = error || isOverMax ? colors.chili : focused ? colors.leaf : colors.hairline;

  function handleChange(next: string): void {
    const parsed = parseDigits(next);
    const clamped = max !== undefined ? Math.min(parsed, max) : parsed;
    setText(clamped > 0 ? formatAmount(clamped) : "");
    onChangeValue(clamped);
  }

  return (
    <View>
      {label ? (
        <Text
          style={{
            fontFamily: "IBMPlexSans_600",
            fontSize: 13,
            fontWeight: "600",
            color: colors.ink,
            marginBottom: space.xs,
          }}
        >
          {label}
        </Text>
      ) : null}
      <View
        style={{
          height: 48,
          borderWidth: 1.5,
          borderColor,
          borderRadius: radius.sm,
          paddingHorizontal: space.md,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.paper,
        }}
      >
        <TextInput
          value={text}
          onChangeText={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          keyboardType="number-pad"
          accessibilityLabel={accessibilityLabel}
          placeholder="0"
          placeholderTextColor={colors.label}
          style={{
            flex: 1,
            fontFamily: "SpaceGrotesk_700",
            fontSize: 18,
            fontWeight: "700",
            color: colors.ink,
          }}
        />
        <Text
          style={{
            fontFamily: "IBMPlexSans_600",
            fontSize: 13,
            fontWeight: "600",
            color: colors.label,
          }}
        >
          RWF
        </Text>
      </View>
      {error ? (
        <Text style={{ fontFamily: "IBMPlexSans", fontSize: 12, color: colors.chili, marginTop: space.xs }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}
