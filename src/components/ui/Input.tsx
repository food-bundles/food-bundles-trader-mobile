/**
 * Text input with label, hairline border, focus/error states.
 * Height 48 minimum per component-library SKILL.
 */
import React, { useState } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { useTheme } from "../../theme/ThemeContext";

interface InputProps extends Omit<TextInputProps, "style"> {
  label?: string;
  error?: string;
  accessibilityLabel: string;
}

/** A themed text field. Border colour reflects focus and error state. */
export function Input({ label, error, accessibilityLabel, onFocus, onBlur, ...rest }: InputProps) {
  const { colors, radius, space } = useTheme();
  const [focused, setFocused] = useState(false);

  const borderColor = error ? colors.chili : focused ? colors.leaf : colors.hairline;

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
      <TextInput
        {...rest}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        accessibilityLabel={accessibilityLabel}
        placeholderTextColor={colors.label}
        style={{
          height: 48,
          borderWidth: 1.5,
          borderColor,
          borderRadius: radius.sm,
          paddingHorizontal: space.md,
          fontFamily: "IBMPlexSans",
          fontSize: 14,
          color: colors.ink,
          backgroundColor: colors.paper,
        }}
      />
      {error ? (
        <Text
          style={{
            fontFamily: "IBMPlexSans",
            fontSize: 12,
            color: colors.chili,
            marginTop: space.xs,
          }}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}
