/**
 * Agreement screen: full-focus (no tab bar), full legal text, fixed
 * checkbox + "Accept & Continue" gated on both the checkbox and having
 * scrolled to the bottom. Cannot be dismissed or back-navigated until
 * accepted, per the navigation SKILL and domain rules.
 */
import React, { useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTheme } from "../../src/theme/ThemeContext";
import { useI18n } from "../../src/i18n";
import { Button } from "../../src/components/ui/Button";
import { MIN_TAP_TARGET } from "../../src/theme/tokens";
import { acceptAgreement } from "../../src/stores/authStore";
import { AGREEMENT_INTRO, AGREEMENT_SECTIONS } from "../../src/mocks/agreement-text";

const SCROLL_END_THRESHOLD_PX = 24;

/** Full-focus legal agreement screen with a scroll-to-bottom acceptance gate. */
export default function AgreementScreen() {
  const { colors, space, radius } = useTheme();
  const t = useI18n();
  const [checked, setChecked] = useState(false);
  const [scrolledToEnd, setScrolledToEnd] = useState(false);

  const canAccept = checked && scrolledToEnd;

  function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>): void {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    const distanceFromBottom = contentSize.height - layoutMeasurement.height - contentOffset.y;
    if (distanceFromBottom < SCROLL_END_THRESHOLD_PX) {
      setScrolledToEnd(true);
    }
  }

  function handleAccept(): void {
    if (!canAccept) return;
    acceptAgreement();
    router.replace("/(trader)/dashboard");
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.oat }}>
      <View style={{ backgroundColor: colors.pine, padding: space.xl, alignItems: "center" }}>
        <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 18, fontWeight: "700", color: colors.paper, textAlign: "center" }}>
          {t("agreement.title")}
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: space.lg, gap: space.lg }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <Text style={{ fontFamily: "IBMPlexSans", fontSize: 13, color: colors.ink, lineHeight: 20 }}>
          {AGREEMENT_INTRO}
        </Text>

        {AGREEMENT_SECTIONS.map((section) => (
          <View key={section.heading} style={{ gap: space.sm }}>
            <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 15, fontWeight: "700", color: colors.pine }}>
              {section.heading}
            </Text>
            {section.paragraphs.map((p, i) => (
              <Text key={i} style={{ fontFamily: "IBMPlexSans", fontSize: 13, color: colors.ink, lineHeight: 20 }}>
                {p}
              </Text>
            ))}
          </View>
        ))}
      </ScrollView>

      <View
        style={{
          padding: space.lg,
          borderTopWidth: 1,
          borderTopColor: colors.hairline,
          backgroundColor: colors.paper,
          gap: space.md,
        }}
      >
        <Pressable
          onPress={() => setChecked((c) => !c)}
          accessibilityRole="checkbox"
          accessibilityState={{ checked }}
          accessibilityLabel={t("agreement.checkbox")}
          style={{ flexDirection: "row", alignItems: "center", gap: space.sm, minHeight: MIN_TAP_TARGET }}
        >
          <View
            style={{
              width: 22,
              height: 22,
              borderRadius: radius.sm,
              borderWidth: 1.5,
              borderColor: checked ? colors.leaf : colors.hairline,
              backgroundColor: checked ? colors.leaf : colors.paper,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {checked ? <Ionicons name="checkmark" size={16} color={colors.paper} /> : null}
          </View>
          <Text style={{ flex: 1, fontFamily: "IBMPlexSans", fontSize: 13, color: colors.ink }}>
            {t("agreement.checkbox")}
          </Text>
        </Pressable>

        <Button
          label={t("agreement.accept")}
          onPress={handleAccept}
          disabled={!canAccept}
          fullWidth
          accessibilityLabel={t("agreement.accept")}
          accessibilityHint={!scrolledToEnd ? "Scroll to the end of the agreement to enable this button" : undefined}
        />
      </View>
    </View>
  );
}
