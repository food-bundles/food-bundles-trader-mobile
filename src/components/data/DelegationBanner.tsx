/**
 * Delegation status banner shown on the dashboard when status is PENDING
 * or ACCEPTED. Slides down on mount, left-border pulses once on appear.
 */
import React, { useEffect } from "react";
import { Pressable, Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useTheme } from "../../theme/ThemeContext";
import { useI18n } from "../../i18n";
import { MIN_TAP_TARGET } from "../../theme/tokens";
import type { DelegationStatusValue } from "../../types/domain";

interface DelegationBannerProps {
  status: DelegationStatusValue;
  onPress: () => void;
}

/** Amber (PENDING) or leaf (ACCEPTED) banner linking to Delegation settings. */
export function DelegationBanner({ status, onPress }: DelegationBannerProps) {
  const { colors, space, radius, duration } = useTheme();
  const t = useI18n();
  const translateY = useSharedValue(-40);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: duration.overlay });
  }, [translateY, duration]);

  const animStyle = useAnimatedStyle(() => ({ transform: [{ translateY: translateY.value }] }));

  if (status !== "PENDING" && status !== "ACCEPTED") return null;

  const isAccepted = status === "ACCEPTED";
  const borderColor = isAccepted ? colors.leaf : colors.marigold;
  const message = isAccepted ? t("delegation.bannerAccepted") : t("delegation.bannerPending");

  return (
    <Animated.View style={animStyle}>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={message}
        style={{
          minHeight: MIN_TAP_TARGET,
          justifyContent: "center",
          backgroundColor: colors.paper,
          borderLeftWidth: 4,
          borderLeftColor: borderColor,
          borderRadius: radius.sm,
          padding: space.md,
        }}
      >
        <Text style={{ fontFamily: "IBMPlexSans_600", fontSize: 13, fontWeight: "600", color: colors.ink }}>
          {message}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
