/**
 * Shared bottom-sheet chrome: backdrop + rounded-top panel at a caller-given
 * height, slide-up modal animation. Used by every modal in `components/modals`
 * and `components/notifications` to avoid duplicating sheet structure.
 */
import React from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeContext";
import { MIN_TAP_TARGET } from "../../theme/tokens";

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  heightPct?: number;
  children: React.ReactNode;
}

/** Slide-up modal sheet with a title bar and a close button. */
export function BottomSheet({ visible, onClose, title, heightPct = 85, children }: BottomSheetProps) {
  const { colors, space, radius } = useTheme();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable
        onPress={onClose}
        accessibilityLabel={`Close ${title}`}
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" }}
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={{
            height: `${heightPct}%`,
            backgroundColor: colors.paper,
            borderTopLeftRadius: radius.lg,
            borderTopRightRadius: radius.lg,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: space.lg,
              paddingTop: space.lg,
              paddingBottom: space.md,
              borderBottomWidth: 1,
              borderBottomColor: colors.hairline,
            }}
          >
            <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 18, fontWeight: "700", color: colors.ink }}>
              {title}
            </Text>
            <Pressable
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel={`Close ${title}`}
              style={{
                width: MIN_TAP_TARGET,
                height: MIN_TAP_TARGET,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="close" size={22} color={colors.ink} />
            </Pressable>
          </View>
          <ScrollView contentContainerStyle={{ padding: space.lg, gap: space.md }} keyboardShouldPersistTaps="handled">
            {children}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
