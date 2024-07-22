import React, {useContext} from 'react';
import {View, Text, Switch} from 'react-native';
import {
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer';
import {useColorScheme, useColorSchemeUpdate} from '@/hooks/useColorScheme';
import {ThemeContext} from '@/store/context';

interface CustomeTypes {
	darkMode: boolean;
}

export default function CustomDrawerContent(props) {
	const colorScheme = useColorScheme();
	const setColorScheme = useColorSchemeUpdate();
	const {darkMode, setDarkMode} = useContext(ThemeContext);

	const toggleSwitch = () => {
		setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
	};

	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} />
			<View
				style={{
					padding: 0,
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<Text style={{marginTop: 10, marginLeft: 10}}>Dark mode</Text>
				<Switch
					value={darkMode}
					onValueChange={setDarkMode}
					style={{marginRight: 20}}
				/>
			</View>
		</DrawerContentScrollView>
	);
}
