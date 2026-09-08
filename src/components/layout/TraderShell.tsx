/**
 * Per-screen content shell for authenticated trader screens: sticky Header
 * (title + optional back + bell) wired to the NotificationDrawer, oat
 * background body. The bottom tab bar itself is rendered by
 * `(trader)/_layout.tsx` via React Navigation, not by this component.
 */
import React, { useState } from "react";
import { View } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { Header } from "./Header";
import { NotificationDrawer } from "../notifications/NotificationDrawer";

interface TraderShellProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  showBell?: boolean;
  avatarUri?: string;
  children: React.ReactNode;
}

/** Wraps a trader screen's body with the shared sticky header. */
export function TraderShell({
  title,
  showBack = false,
  onBack,
  showBell = true,
  avatarUri,
  children,
}: TraderShellProps) {
  const { colors } = useTheme();
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: colors.oat }}>
      <Header
        title={title}
        showBack={showBack}
        onBack={onBack}
        showBell={showBell}
        onBellPress={() => setDrawerVisible(true)}
        avatarUri={avatarUri}
      />
      <View style={{ flex: 1 }}>{children}</View>
      <NotificationDrawer visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
    </View>
  );
}
