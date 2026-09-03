/**
 * Minimal 60x28 sparkline (single polyline, no axes/labels). Used in the
 * commission card to show a 6-month trend. Deliberately minimal per the
 * component-library SKILL's instruction not to over-build chart primitives.
 */
import React from "react";
import { Svg, Polyline } from "react-native-svg";
import { useTheme } from "../../theme/ThemeContext";

interface SparklineProps {
  values: number[];
  width?: number;
  height?: number;
}

/** Renders a single-series mini line chart with no axes or labels. */
export function Sparkline({ values, width = 60, height = 28 }: SparklineProps) {
  const { colors } = useTheme();

  if (values.length < 2) return null;

  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;

  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <Svg width={width} height={height} accessibilityLabel="Commission trend, last 6 months">
      <Polyline points={points} fill="none" stroke={colors.leaf} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
    </Svg>
  );
}
