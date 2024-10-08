import React, {useContext} from 'react';
import {
	StyleSheet,
	Image,
	Platform,
	Text,
	View,
	Button,
	Linking,
	TouchableOpacity,
} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {Link} from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Collapsible} from '@/components/Collapsible';
import {ExternalLink} from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {ThemeContext} from '@/store/context';
import {createDrawerNavigator} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

export default function TabTwoScreen() {
	const navigation = useNavigation();
	const styles = useStyles();
	const {mainTheme} = useContext(ThemeContext);
	const calculateButtonPress = () => {
		//navigation.navigate('Calculate'); // Navigating to the 'Calculate' tab
		navigation.navigate('Calculate');
	};
	const planButtonPress = () => {
		//navigation.navigate('Calculate'); // Navigating to the 'Calculate' tab
		navigation.navigate('Plan');
	};
	const onToggle = () => {
		navigation.dispatch(DrawerActions.openDrawer());
	};
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.settingsIconContainer}
				onPress={() => {
					onToggle();
				}}
			>
				<Ionicons
					size={28}
					name={'settings'}
					style={styles.settingsIcon}
					color={mainTheme.colors.foreground}
				/>
			</TouchableOpacity>

			<Image
				source={require('@/assets/images/unt-logo.png')}
				style={styles.headerImage}
			/>

			<View style={styles.buttonsContainer}>
				<TouchableOpacity
					style={styles.calculateButton} //changes the style of the button to the button style at the bottom
					onPress={calculateButtonPress} //takes you to calculate tab when pressed
				>
					<Text style={styles.calculateButtonText}>Calculate</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.planButton} //changes the style of the button to the button style at the bottom
					onPress={planButtonPress} //takes you to calculate tab when pressed
				>
					<Text style={styles.planButtonText}>Plan</Text>
				</TouchableOpacity>
			</View>

			<Image
				source={require('@/assets/images/unt-dining-logo.png')}
				style={styles.footerImage}
			/>
		</View>
	);
}

function useStyles() {
	const {mainTheme} = useContext(ThemeContext);
	return StyleSheet.create({
		container: {
			flex: 1,
			//padding: 1,
			//marginTop: 40,
			backgroundColor: mainTheme.colors.background, // BACKGROUND COLOR FOR ENTIRE MAIN MENU. LIGHT GREENISH
			alignItems: 'center',
			justifyContent: 'flex-start',
		},
		headerImage: {
			width: '70%',
			height: '20%', // Adjust as needed for your image size
			resizeMode: 'contain',
			marginTop: '10%',
			marginBottom: '10%',
		},
		footerImage: {
			width: '70%',
			height: '20%', // Adjust as needed for your image size
			resizeMode: 'contain',
			marginTop: '10%',
		},
		mainContent: {
			//backgroundColor: 'lightgreen', // Set your desired background color here
			//padding: 20,
			flex: 1,
			padding: 0,
			marginTop: 0,
			//backgroundColor: 'lightgreen',
		},
		buttonsContainer: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		},
		calculateButton: {
			backgroundColor: '#04873c', // Dark greenish
			width: 200,
			height: 200,
			borderRadius: 100, // Make it a circle
			justifyContent: 'center',
			alignItems: 'center',
			position: 'absolute',
			top: '-10%', // Adjust this value to move the button up/down
			left: '-10%', // Adjust this value to move the button left/right
		},
		planButton: {
			backgroundColor: '#808080', // Greyish
			width: 200,
			height: 200,
			borderRadius: 100, // Make it a circle
			justifyContent: 'center',
			alignItems: 'center',
			position: 'absolute',
			top: '50%', // Adjust this value to move the button up/down
			left: '-40%', // Adjust this value to move the button left/right
		},
		calculateButtonText: {
			fontSize: 40,
			color: 'white',
			fontWeight: 'bold',
		},
		planButtonText: {
			fontSize: 50,
			color: 'white',
			fontWeight: 'bold',
		},
		settingsIconContainer: {
			position: 'absolute',
			top: '10%',
			left: '88%',
		},
		settingsIcon: {
			width: 35,
			height: 35,
			resizeMode: 'contain',
		},
	});
}
