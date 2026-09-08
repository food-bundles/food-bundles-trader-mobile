/**
 * Trader group layout: bottom tab navigator + auth/agreement guards.
 * Redirects to /(auth)/login if no session, to /agreement if the trader has
 * not yet accepted the legal agreement, per the navigation SKILL.
 */
import { Redirect, Tabs } from "expo-router";
import { useAuthStore } from "../../src/stores/authStore";
import { BottomTabBar } from "../../src/components/layout/BottomTabBar";

/** Bottom-tab layout for all authenticated trader screens. */
export default function TraderLayout() {
  const { user, agreementAccepted } = useAuthStore();

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }
  if (!agreementAccepted) {
    return <Redirect href="/agreement" />;
  }

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tabs.Screen name="dashboard/index" options={{ title: "Dashboard" }} />
      <Tabs.Screen name="loans/index" options={{ title: "Loans" }} />
      <Tabs.Screen name="loans/[id]" options={{ href: null }} />
      <Tabs.Screen name="vouchers/index" options={{ title: "Vouchers" }} />
      <Tabs.Screen name="vouchers/[id]" options={{ href: null }} />
      <Tabs.Screen name="orders/index" options={{ title: "Orders" }} />
      <Tabs.Screen name="orders/[id]" options={{ href: null }} />
      <Tabs.Screen name="settings/index" options={{ title: "Settings" }} />
      <Tabs.Screen name="settings/delegation" options={{ href: null }} />
      <Tabs.Screen name="settings/commission" options={{ href: null }} />
      <Tabs.Screen name="settings/delegation-history" options={{ href: null }} />
      <Tabs.Screen name="settings/authenticator" options={{ href: null }} />
    </Tabs>
  );
}
