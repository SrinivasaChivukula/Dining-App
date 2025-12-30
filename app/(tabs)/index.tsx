import React, { useContext } from 'react';
import {
	StyleSheet,
	Image,
	Text,
	View,
	TouchableOpacity,
	SafeAreaView,
	StatusBar,
} from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemeContext } from '@/store/context';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
	const navigation = useNavigation();
	const { mainTheme } = useContext(ThemeContext);
	const styles = useStyles(mainTheme);

	const calculateButtonPress = () => {
		navigation.navigate('Calculate' as never);
	};
	const planButtonPress = () => {
		navigation.navigate('Plan' as never);
	};
	const onToggle = () => {
		navigation.dispatch(DrawerActions.openDrawer());
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle={mainTheme.colors.text === '#FFFFFF' ? 'light-content' : 'dark-content'} />
			<View style={styles.header}>
				<TouchableOpacity
					style={styles.settingsIconContainer}
					onPress={onToggle}
				>
					<Ionicons
						size={28}
						name={'menu-outline'}
						color={mainTheme.colors.foreground}
					/>
				</TouchableOpacity>
				<Image
					source={require('@/assets/images/unt-logo.png')}
					style={styles.headerImage}
				/>
				<View style={{ width: 28 }} />
			</View>

			<View style={styles.heroSection}>
				<Text style={styles.heroTitle}>Dining Made Easy</Text>
				<Text style={styles.heroSubtitle}>Track nutrition and plan your meals at UNT.</Text>
			</View>

			<View style={styles.cardsContainer}>
				<TouchableOpacity
					style={[styles.card, styles.calculateCard]}
					onPress={calculateButtonPress}
					activeOpacity={0.9}
				>
					<View style={styles.cardIconContainer}>
						<MaterialIcons name="calculate" size={40} color="#fff" />
					</View>

					<View style={styles.cardTextContainer}>
						<Text style={styles.cardTitle}>Calculate</Text>
						<Text style={styles.cardDescription}>Track calories & macros</Text>
					</View>
					<MaterialIcons name="arrow-forward" size={24} color="#fff" style={styles.arrowIcon} />
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.card, styles.planCard]}
					onPress={planButtonPress}
					activeOpacity={0.9}
				>
					<View style={styles.cardIconContainer}>
						<MaterialIcons name="restaurant-menu" size={40} color="#fff" />
					</View>
					<View style={styles.cardTextContainer}>
						<Text style={styles.cardTitle}>Plan Meal</Text>
						<Text style={styles.cardDescription}>Discover what's serving</Text>
					</View>
					<MaterialIcons name="arrow-forward" size={24} color="#fff" style={styles.arrowIcon} />
				</TouchableOpacity>
			</View>

			<View style={styles.footer}>
				<Image
					source={require('@/assets/images/unt-dining-logo.png')}
					style={styles.footerImage}
				/>
			</View>
		</SafeAreaView>
	);
}

const useStyles = (theme: any) => StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
		padding: theme.spacing.m,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: theme.spacing.s,
		marginBottom: theme.spacing.xl,
	},
	settingsIconContainer: {
		padding: 8,
		backgroundColor: theme.colors.card,
		borderRadius: theme.borderRadius.s,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	headerImage: {
		width: 120,
		height: 40,
		resizeMode: 'contain',
		tintColor: theme.colors.primary, // Optional: Tint logo to match theme if it's black/monochrome
	},
	heroSection: {
		marginBottom: theme.spacing.xxl,
		paddingHorizontal: theme.spacing.s,
	},
	heroTitle: {
		...theme.textVariants.header,
		color: theme.colors.foreground,
		marginBottom: theme.spacing.s,
	},
	heroSubtitle: {
		fontSize: 16,
		color: theme.colors.textSecondary,
		lineHeight: 24,
	},
	cardsContainer: {
		flex: 1,
		gap: theme.spacing.l,
	},
	card: {
		borderRadius: theme.borderRadius.xl,
		padding: theme.spacing.l,
		height: 160,
		justifyContent: 'space-between',
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.15,
		shadowRadius: 16,
		elevation: 8,
		flexDirection: 'row',
		alignItems: 'flex-end',
		overflow: 'hidden',
	},
	calculateCard: {
		backgroundColor: theme.colors.primary,
	},
	planCard: {
		backgroundColor: theme.colors.secondary,
	},
	cardIconContainer: {
		position: 'absolute',
		top: 20,
		left: 20,
		backgroundColor: 'rgba(255,255,255,0.2)',
		borderRadius: theme.borderRadius.m,
		padding: 10,
	},
	cardTextContainer: {
		marginBottom: 0,
	},
	cardTitle: {
		fontSize: 32,
		fontWeight: 'bold',
		color: '#fff',
		marginBottom: 4,
	},
	cardDescription: {
		fontSize: 14,
		color: 'rgba(255,255,255,0.9)',
		fontWeight: '500',
	},
	arrowIcon: {
		marginBottom: 8,
	},
	footer: {
		alignItems: 'center',
		marginBottom: theme.spacing.l,
	},
	footerImage: {
		width: 150,
		height: 60,
		resizeMode: 'contain',
		opacity: 0.8,
	},
});
