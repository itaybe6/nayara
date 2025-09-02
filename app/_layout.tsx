import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { I18nManager, View } from 'react-native';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Assistant_400Regular, Assistant_700Bold } from '@expo-google-fonts/assistant';
import * as SplashScreen from 'expo-splash-screen';
import { store } from '@/src/store';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import '@/src/services/i18n';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/src/theme/useTheme';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Bold': Inter_700Bold,
    'Assistant-Regular': Assistant_400Regular,
    'Assistant-Bold': Assistant_700Bold,
  });
  const { colors, isDark } = useTheme();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    // Enable RTL support
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[colors.gradientPrimaryStart, colors.gradientPrimaryEnd]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 0.6 }}
        style={{ position: 'absolute', top: -120, left: -60, right: -60, height: 320, borderBottomLeftRadius: 200, borderBottomRightRadius: 200, opacity: 0.45 }}
      />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  useFrameworkReady();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <RootLayoutNav />
        <StatusBar style="light" />
      </Provider>
    </GestureHandlerRootView>
  );
}