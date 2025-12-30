import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Image, Platform, Text, View, TouchableOpacity, Pressable, Modal, useColorScheme, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DataContext } from '../../DataContext';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '@/store/context';
import { Colors } from '@/constants/Colors';

type FoodItem = {
	id: string;
	name: string;
	calories: number;
	total_fat: number;
	cholesterol: number;
	sodium: number;
	total_carbohydrates: number;
	protein: number;
	allergens: string;
	ingredients: string;
	serving_size: number;
	is_each: boolean;
	is_high_calorie: boolean;
	is_high_protein: boolean;
	is_high_fat: boolean;
	is_high_carbs: boolean;
	is_halal: boolean;
	is_gluten_free: boolean;
	is_allergen_free: boolean;
	total_fat_percent: number;
	sodium_percent: number;
	total_carbohydrates_percent: number;
	saturated_fat: number;
	trans_fat: number;
	saturated_fat_percent: number;
	dietary_fiber: number;
	dietary_fiber_percent: number;
	added_sugars_percent: number;
	added_sugars: number;
	sugars: number;
};

const CalculateScreen: React.FC = () => {
	const navigation = useNavigation();
	const { allData, isLoading, error } = useContext(DataContext);
	const [data, setData] = useState<FoodItem[]>([]);
	const [servings, setServings] = useState<{ [id: string]: number }>({});
	const [totalCalories, setTotalCalories] = useState(0);
	const [totalProtein, setTotalProtein] = useState(0);
	const [totalCarbs, setTotalCarbs] = useState(0);
	const [totalFat, setTotalFat] = useState(0);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
	const [activeTab, setActiveTab] = useState<string>('breakfast');

	const { mainTheme } = useContext(ThemeContext);
	const styles = useStyles(mainTheme);

	useEffect(() => {
		if (allData[activeTab]) {
			setData(allData[activeTab]);
		}
	}, [activeTab, allData, isLoading]);

	const homeButtonPress = () => {
		navigation.navigate('index' as never);
	};

	const updateTotals = (newServings: { [id: string]: number }) => {
		let tCal = 0, tProt = 0, tCarb = 0, tFat = 0;
		data.forEach((item) => {
			const count = newServings[item.id] || 0;
			tCal += count * (item.calories || 0);
			tProt += count * (item.protein || 0);
			tCarb += count * (item.total_carbohydrates || 0);
			tFat += count * (item.total_fat || 0);
		});
		setTotalCalories(Math.round(tCal));
		setTotalProtein(Math.round(tProt));
		setTotalCarbs(Math.round(tCarb));
		setTotalFat(Math.round(tFat));
	};

	const handleIncrement = (id: string) => {
		setServings((prev) => {
			const next = { ...prev, [id]: (prev[id] || 0) + 1 };
			updateTotals(next);
			return next;
		});
	};

	const handleDecrement = (id: string) => {
		setServings((prev) => {
			const next = { ...prev, [id]: Math.max((prev[id] || 0) - 1, 0) };
			updateTotals(next);
			return next;
		});
	};

	const handleFoodPress = (food: FoodItem) => {
		setSelectedFood(food);
		setModalOpen(true);
	};

	const resetButtonPress = () => {
		const resetServings = data.reduce((acc, item) => {
			acc[item.id] = 0;
			return acc;
		}, {} as { [id: string]: number });
		setServings(resetServings);
		updateTotals(resetServings);
	};

	const renderItem = ({ item }: { item: FoodItem }) => (
		<View style={styles.card}>
			<TouchableOpacity onPress={() => handleFoodPress(item)} style={styles.cardContent}>
				<View style={styles.textContainer}>
					<Text style={styles.foodName}>{item.name}</Text>
					<Text style={styles.foodDetails}>{item.calories} kcal • {item.protein}g Protein</Text>
				</View>
			</TouchableOpacity>

			<View style={styles.controlsContainer}>
				<TouchableOpacity onPress={() => handleDecrement(item.id)} style={styles.controlButton}>
					<MaterialIcons name="remove" size={20} color={mainTheme.colors.foreground} />
				</TouchableOpacity>
				<Text style={styles.countText}>{servings[item.id] || 0}</Text>
				<TouchableOpacity onPress={() => handleIncrement(item.id)} style={[styles.controlButton, styles.incrementButton]}>
					<MaterialIcons name="add" size={20} color="#fff" />
				</TouchableOpacity>
			</View>
		</View>
	);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Pressable onPress={homeButtonPress} style={styles.backButton}>
					<MaterialIcons name="arrow-back-ios" size={24} color={mainTheme.colors.foreground} />
				</Pressable>
				<Text style={styles.title}>Calculate</Text>
				<TouchableOpacity onPress={resetButtonPress} style={styles.resetButton}>
					<Text style={styles.resetButtonText}>Reset</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.tabsWrapper}>
				<View style={styles.tabsContainer}>
					{['breakfast', 'lunch', 'dinner'].map((tab) => (
						<TouchableOpacity
							key={tab}
							style={[styles.tab, activeTab === tab && styles.activeTab]}
							onPress={() => setActiveTab(tab)}
						>
							<Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
								{tab.charAt(0).toUpperCase() + tab.slice(1)}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</View>

			<View style={styles.content}>
				{error ? (
					<Text style={styles.errorText}>{error}</Text>
				) : isLoading ? (
					<ActivityIndicator size="large" color={mainTheme.colors.primary} />
				) : (
					<FlatList
						data={data}
						renderItem={renderItem}
						keyExtractor={(item) => item.id}
						contentContainerStyle={styles.listContent}
						showsVerticalScrollIndicator={false}
					/>
				)}
			</View>

			<View style={styles.summaryContainer}>
				<View style={styles.summaryRow}>
					<Text style={styles.summaryLabel}>Total Calories</Text>
					<Text style={styles.summaryValueMain}>{totalCalories}</Text>
				</View>
				<View style={styles.macrosContainer}>
					<View style={styles.macroItem}>
						<Text style={styles.macroLabel}>Protein</Text>
						<Text style={styles.macroValue}>{totalProtein}g</Text>
					</View>
					<View style={styles.macroItem}>
						<Text style={styles.macroLabel}>Carbs</Text>
						<Text style={styles.macroValue}>{totalCarbs}g</Text>
					</View>
					<View style={styles.macroItem}>
						<Text style={styles.macroLabel}>Fat</Text>
						<Text style={styles.macroValue}>{totalFat}g</Text>
					</View>
				</View>
			</View>

			<Modal visible={modalOpen} transparent animationType="slide">
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						<View style={styles.modalHeader}>
							<Text style={styles.modalTitle}>Nutrition Facts</Text>
							<Pressable onPress={() => setModalOpen(false)}>
								<MaterialIcons name="close" size={24} color={mainTheme.colors.textSecondary} />
							</Pressable>
						</View>

						{selectedFood && (
							<View style={styles.nutritionDetails}>
								<Text style={styles.nutritionFoodName}>{selectedFood.name}</Text>
								<Text style={styles.nutritionServing}>Serving Size: {selectedFood.serving_size}</Text>

								<View style={styles.nutritionRow}>
									<Text style={styles.nutritionLabel}>Calories</Text>
									<Text style={styles.nutritionValue}>{selectedFood.calories}</Text>
								</View>

								{/* Add more nutrition details as needed, keeping it clean */}
								<View style={styles.divider} />

								<View style={styles.nutritionRow}>
									<Text style={styles.nutritionLabel}>Protein</Text>
									<Text style={styles.nutritionValue}>{selectedFood.protein}g</Text>
								</View>
								<View style={styles.nutritionRow}>
									<Text style={styles.nutritionLabel}>Total Fat</Text>
									<Text style={styles.nutritionValue}>{selectedFood.total_fat}g</Text>
								</View>
								<View style={styles.nutritionRow}>
									<Text style={styles.nutritionLabel}>Total Carbs</Text>
									<Text style={styles.nutritionValue}>{selectedFood.total_carbohydrates}g</Text>
								</View>
							</View>
						)}
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

const useStyles = (theme: any) => StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: theme.spacing.m,
		paddingVertical: theme.spacing.m,
	},
	backButton: {
		padding: theme.spacing.s,
	},
	title: {
		...theme.textVariants.header,
		color: theme.colors.foreground,
		fontSize: 24,
	},
	resetButton: {
		padding: theme.spacing.s,
	},
	resetButtonText: {
		color: theme.colors.primary,
		fontWeight: '600',
	},
	tabsWrapper: {
		paddingHorizontal: theme.spacing.m,
		marginBottom: theme.spacing.m,
	},
	tabsContainer: {
		flexDirection: 'row',
		backgroundColor: theme.colors.border,
		borderRadius: theme.borderRadius.l,
		padding: 4,
	},
	tab: {
		flex: 1,
		paddingVertical: theme.spacing.s,
		alignItems: 'center',
		borderRadius: theme.borderRadius.m,
	},
	activeTab: {
		backgroundColor: theme.colors.card,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	tabText: {
		fontWeight: '600',
		color: theme.colors.textSecondary,
	},
	activeTabText: {
		color: theme.colors.primary,
	},
	content: {
		flex: 1,
	},
	listContent: {
		paddingHorizontal: theme.spacing.m,
		paddingBottom: 100, // Space for summary
	},
	errorText: {
		color: theme.colors.error,
		textAlign: 'center',
		marginTop: theme.spacing.xl,
	},
	card: {
		backgroundColor: theme.colors.card,
		borderRadius: theme.borderRadius.m,
		marginBottom: theme.spacing.s,
		padding: theme.spacing.m,
		flexDirection: 'row',
		alignItems: 'center',
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 2,
	},
	cardContent: {
		flex: 1,
	},
	textContainer: {
		paddingRight: theme.spacing.s,
	},
	foodName: {
		fontSize: 16,
		fontWeight: 'bold',
		color: theme.colors.foreground,
		marginBottom: 4,
	},
	foodDetails: {
		fontSize: 14,
		color: theme.colors.textSecondary,
	},
	controlsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	controlButton: {
		width: 32,
		height: 32,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: theme.colors.border,
		borderRadius: 16,
	},
	incrementButton: {
		backgroundColor: theme.colors.primary,
	},
	countText: {
		marginHorizontal: theme.spacing.s,
		fontSize: 16,
		fontWeight: '600',
		color: theme.colors.foreground,
		minWidth: 20,
		textAlign: 'center',
	},
	summaryContainer: {
		backgroundColor: theme.colors.card,
		borderTopLeftRadius: theme.borderRadius.xl,
		borderTopRightRadius: theme.borderRadius.xl,
		padding: theme.spacing.l,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: -4 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 10,
	},
	summaryRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: theme.spacing.m,
	},
	summaryLabel: {
		fontSize: 18,
		fontWeight: '600',
		color: theme.colors.textSecondary,
	},
	summaryValueMain: {
		fontSize: 32,
		fontWeight: 'bold',
		color: theme.colors.primary,
	},
	macrosContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	macroItem: {
		alignItems: 'center',
	},
	macroLabel: {
		fontSize: 12,
		color: theme.colors.textSecondary,
		marginBottom: 2,
	},
	macroValue: {
		fontSize: 16,
		fontWeight: 'bold',
		color: theme.colors.foreground,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.5)',
		justifyContent: 'flex-end',
	},
	modalContent: {
		backgroundColor: theme.colors.card,
		borderTopLeftRadius: theme.borderRadius.xl,
		borderTopRightRadius: theme.borderRadius.xl,
		padding: theme.spacing.l,
		minHeight: '50%',
	},
	modalHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: theme.spacing.l,
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: theme.colors.foreground,
	},
	nutritionDetails: {
	},
	nutritionFoodName: {
		fontSize: 24,
		fontWeight: 'bold',
		color: theme.colors.foreground,
		marginBottom: theme.spacing.s,
	},
	nutritionServing: {
		fontSize: 16,
		color: theme.colors.textSecondary,
		marginBottom: theme.spacing.l,
	},
	nutritionRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: theme.spacing.m,
	},
	nutritionLabel: {
		fontSize: 16,
		color: theme.colors.foreground,
	},
	nutritionValue: {
		fontSize: 16,
		fontWeight: 'bold',
		color: theme.colors.foreground,
	},
	divider: {
		height: 1,
		backgroundColor: theme.colors.border,
		marginVertical: theme.spacing.m,
	},
});


export default CalculateScreen;