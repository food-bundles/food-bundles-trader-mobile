/**
 * Modal confirmation dialog for destructive or consequential actions.
 * Backdrop is the one permitted off-token value (structural scrim).
 */
import React from "react";
import { Modal, Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { Button } from "./Button";
import { useI18n } from "../../i18n";

interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  destructive?: boolean;
  accessibilityHint?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/** A centred modal asking the user to confirm or cancel an action. */
export function ConfirmDialog({
  visible,
  title,
  message,
  confirmLabel,
  destructive = false,
  accessibilityHint,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const { colors, radius, space } = useTheme();
  const t = useI18n();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.4)",
          alignItems: "center",
          justifyContent: "center",
          padding: space.xl,
        }}
      >
        <View
          style={{
            width: "100%",
            maxWidth: 360,
            backgroundColor: colors.paper,
            borderRadius: radius.lg,
            padding: space.xl,
            gap: space.md,
          }}
        >
          <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 17, fontWeight: "700", color: colors.ink }}>
            {title}
          </Text>
          <Text style={{ fontFamily: "IBMPlexSans", fontSize: 14, color: colors.label }}>{message}</Text>
          <View style={{ flexDirection: "row", gap: space.sm, marginTop: space.sm }}>
            <View style={{ flex: 1 }}>
              <Button label={t("common.cancel")} onPress={onCancel} variant="ghost" fullWidth />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                label={confirmLabel ?? t("common.confirm")}
                onPress={onConfirm}
                variant={destructive ? "destructive" : "primary"}
                fullWidth
                accessibilityHint={accessibilityHint}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
