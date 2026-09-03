/**
 * Auth group layout: plain stack, no tab bar, no shell chrome.
 */
import { Stack } from "expo-router";

/** Stack layout for the unauthenticated (login/forgot-password) screens. */
export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
}
