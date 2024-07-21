import React from 'react';
import {View, Text, Switch} from 'react-native';
import {
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer';
import {useColorScheme, useColorSchemeUpdate} from '@/hooks/useColorScheme';

export default function CustomDrawerContent(props) {
	const colorScheme = useColorScheme();
	const setColorScheme = useColorSchemeUpdate();

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
					style={{marginRight: 20}}
					value={colorScheme === 'dark'}
					onValueChange={toggleSwitch}
				/>
			</View>
		</DrawerContentScrollView>
	);
}
