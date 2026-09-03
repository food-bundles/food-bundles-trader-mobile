/**
 * Root layout: loads fonts, wraps the app in ThemeProvider + LanguageProvider,
 * and renders the Expo Router Stack. Keeps the splash screen visible until
 * fonts are ready, per Expo's recommended pattern.
 */
import { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  useFonts,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from "@expo-google-fonts/space-grotesk";
import {
  IBMPlexSans_400Regular,
  IBMPlexSans_500Medium,
  IBMPlexSans_600SemiBold,
} from "@expo-google-fonts/ibm-plex-sans";
import { ThemeProvider } from "../src/theme/ThemeContext";
import { LanguageProvider } from "../src/i18n";

SplashScreen.preventAutoHideAsync().catch(() => {
  // No-op: splash may already be hidden in some environments.
});

/** Root layout component registered by Expo Router. */
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk: SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700: SpaceGrotesk_700Bold,
    IBMPlexSans: IBMPlexSans_400Regular,
    IBMPlexSans_500: IBMPlexSans_500Medium,
    IBMPlexSans_600: IBMPlexSans_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {
        // No-op: hide failures are non-fatal.
      });
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <LanguageProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="agreement/index" />
              <Stack.Screen name="(trader)" />
            </Stack>
          </LanguageProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
