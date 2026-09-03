/**
 * Shimmering placeholder row shown while a list is loading. Opacity loops
 * 0.4 -> 0.9 -> 0.4 over 1200ms via Reanimated.
 */
import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "../../theme/ThemeContext";

/** A single shimmering block, sized by the caller. */
export function SkeletonRow({ height = 72 }: { height?: number }) {
  const { colors, radius, space } = useTheme();
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.9, { duration: 600 }),
        withTiming(0.4, { duration: 600 })
      ),
      -1,
      false
    );
  }, [opacity]);

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[
        animStyle,
        {
          height,
          backgroundColor: colors.hairline,
          borderRadius: radius.md,
          marginBottom: space.md,
        },
      ]}
    >
      <View />
    </Animated.View>
  );
}
