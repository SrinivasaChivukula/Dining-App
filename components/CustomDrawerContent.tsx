import React, { useContext } from 'react';
import { View, Text, Switch } from 'react-native';
import {
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer';
import { ThemeContext } from '@/store/context';

export default function CustomDrawerContent(props: any) {
	const { darkMode, setDarkMode } = useContext(ThemeContext);

	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} />
			<View
				style={{
					padding: 20,
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Text style={{ fontSize: 16, fontWeight: '600', color: darkMode ? '#fff' : '#000' }}>Dark Mode</Text>
				<Switch
					value={darkMode}
					onValueChange={setDarkMode}
				/>
			</View>
		</DrawerContentScrollView>
	);
}
