/**
 * 6-box OTP entry. Auto-advances on digit entry, masks each digit after a
 * 1s delay (password-style), and pops the just-filled box (scale 1->1.15->1).
 * Calls `onComplete(code)` once all 6 boxes are filled.
 */
import React, { useEffect, useRef, useState } from "react";
import { Platform, TextInput, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated";
import { useTheme } from "../../theme/ThemeContext";

const LENGTH = 6;
const MASK_DELAY_MS = 1000;

interface OTPInputProps {
  onComplete: (code: string) => void;
  accessibilityLabel?: string;
}

interface BoxProps {
  digit: string;
  focused: boolean;
  masked: boolean;
  justFilled: boolean;
}

function OTPBox({ digit, focused, masked, justFilled }: BoxProps) {
  const { colors, radius } = useTheme();
  const scale = useSharedValue(1);

  useEffect(() => {
    if (justFilled) {
      scale.value = withSequence(withTiming(1.15, { duration: 50 }), withTiming(1, { duration: 50 }));
    }
  }, [justFilled, scale]);

  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const mono = Platform.OS === "ios" ? "Courier New" : "monospace";

  return (
    <Animated.View
      style={[
        animStyle,
        {
          width: 48,
          height: 56,
          borderRadius: radius.sm,
          borderWidth: 1.5,
          borderColor: focused ? colors.leaf : colors.hairline,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.paper,
        },
      ]}
    >
      <TextInput
        value={digit ? (masked ? "•" : digit) : ""}
        editable={false}
        style={{ fontFamily: mono, fontSize: 20, color: colors.ink, textAlign: "center" }}
      />
    </Animated.View>
  );
}

/** Six-box OTP input with masking and auto-advance-on-complete callback. */
export function OTPInput({ onComplete, accessibilityLabel = "One-time code" }: OTPInputProps) {
  const { space } = useTheme();
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(""));
  const [maskedIndexes, setMaskedIndexes] = useState<Set<number>>(new Set());
  const [lastFilled, setLastFilled] = useState(-1);
  const hiddenInputRef = useRef<TextInput>(null);

  function handleChangeText(text: string): void {
    const clean = text.replace(/[^0-9]/g, "").slice(0, LENGTH);
    const next = Array(LENGTH).fill("");
    clean.split("").forEach((d, i) => {
      next[i] = d;
    });
    setDigits(next);
    setLastFilled(clean.length - 1);

    if (clean.length - 1 >= 0) {
      const index = clean.length - 1;
      setTimeout(() => {
        setMaskedIndexes((prev) => new Set(prev).add(index));
      }, MASK_DELAY_MS);
    }

    if (clean.length === LENGTH) {
      onComplete(clean);
    }
  }

  return (
    <View accessibilityLabel={accessibilityLabel} style={{ flexDirection: "row", gap: space.sm }}>
      {digits.map((digit, i) => (
        <OTPBox
          key={i}
          digit={digit}
          focused={i === digits.findIndex((d) => d === "")}
          masked={maskedIndexes.has(i)}
          justFilled={i === lastFilled}
        />
      ))}
      <TextInput
        ref={hiddenInputRef}
        value=""
        onChangeText={handleChangeText}
        keyboardType="number-pad"
        maxLength={LENGTH}
        autoFocus
        style={{ position: "absolute", opacity: 0, height: 1, width: 1 }}
        accessibilityLabel={accessibilityLabel}
      />
    </View>
  );
}
