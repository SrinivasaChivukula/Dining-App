import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import {Drawer} from 'expo-router/drawer';
import {useColorScheme} from '@/hooks/useColorScheme';
import {ThemeContextProvider} from '@/store/context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import CustomDrawerContent from '@/components/CustomDrawerContent';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

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

  return (
		<ThemeContextProvider
			darkMode={undefined}
			theme={{
				colors: '',
				spacing: 0,
				textVariants: undefined,
			}}
		>
			<GestureHandlerRootView style={{flex: 1}}>
				<Drawer drawerContent={CustomDrawerContent}>
					<Drawer.Screen name="(tabs)" options={{headerShown: false,drawerLabel: 'Home'}} />
					<Drawer.Screen name="+not-found" options={{headerShown: false,drawerLabel: ''}} />
				</Drawer>
			</GestureHandlerRootView>
		</ThemeContextProvider>
	);
}
