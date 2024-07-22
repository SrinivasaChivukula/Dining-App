import 'react-native-gesture-handler';
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import {Drawer} from 'expo-router/drawer';
import * as SplashScreen from 'expo-splash-screen';
import {useContext, useEffect} from 'react';
import 'react-native-reanimated';

import {ColorSchemeProvider, useColorScheme} from '@/hooks/useColorScheme';
import {View, Text} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import CustomDrawerContent from '@/components/CustomDrawerContent';
import {ThemeContext, ThemeContextProvider} from '@/store/context';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const {mainTheme} = useContext(ThemeContext);
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
					<Drawer.Screen name="(tabs)" options={{headerShown: false}} />
					<Drawer.Screen name="+not-found" />
				</Drawer>
			</GestureHandlerRootView>
		</ThemeContextProvider>
	);
}
