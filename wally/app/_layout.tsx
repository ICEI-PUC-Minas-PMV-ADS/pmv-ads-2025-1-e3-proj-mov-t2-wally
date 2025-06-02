import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useColorScheme } from '@/hooks/useColorScheme';
import { API_URL } from '@env';
import { PortalProvider } from '@gorhom/portal';

SplashScreen.preventAutoHideAsync();

console.log({ API_URL: API_URL })

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const queryClient = new QueryClient()

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <PortalProvider>

          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="criar-grupo" options={{
              headerShown: true,
              headerTitle: '',
              headerStyle: { backgroundColor: '#9ACBD0' },
              headerBackVisible: false,
            }} />
            <Stack.Screen name="grupo" options={{
              headerShown: true,
              headerTitle: '',
              headerStyle: { backgroundColor: '#9ACBD0' },
              headerBackVisible: false,
            }} />
            <Stack.Screen name="add-despesa" options={{
              headerShown: true,
              headerTitle: '',
              headerStyle: { backgroundColor: '#9ACBD0' },
              headerBackVisible: false,
            }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </PortalProvider>

      </QueryClientProvider>
    </ThemeProvider>
  );
}