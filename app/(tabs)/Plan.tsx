import React, { useState, useCallback, useContext } from 'react';
import {
	StyleSheet,
	Image,
	Text,
	View,
	TouchableOpacity,
	Pressable,
	Modal,
	Switch,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemeContext } from '@/store/context';
import { Colors } from '@/constants/Colors';

// Define the types for the modal content
type ModalPage = 'initial' | 'mealSelection' | 'nutrientGoals';
type MealType = 'loseWeight' | 'buildMuscle' | 'maintenance' | 'advanced';

const PlanScreen: React.FC = () => {
	const navigation = useNavigation();
	const [modalOpen, setModalOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState<ModalPage>('initial');
	const [selectedGoal, setSelectedGoal] = useState<MealType | null>(null);
	const [pageHistory, setPageHistory] = useState<ModalPage[]>([]);
	const [isFirstVisit, setIsFirstVisit] = useState(true);

	const [isVegan, setIsVegan] = useState(false);
	const [isHalal, setIsHalal] = useState(false);
	const [isGluten, setIsGluten] = useState(false);
	const [isAllergens, setIsAllergens] = useState(false);

	const [caloriesMin, setCaloriesMin] = useState('');
	const [caloriesMax, setCaloriesMax] = useState('');
	const [proteinMin, setProteinMin] = useState('');
	const [fatMin, setFatMin] = useState('');
	const [carbohydratesMin, setCarbohydratesMin] = useState('');

	const { mainTheme } = useContext(ThemeContext);
	const styles = useStyles(mainTheme);

	const toggleVeganSwitch = () => setIsVegan((prev) => !prev);
	const toggleHalalSwitch = () => setIsHalal((prev) => !prev);
	const toggleGlutenSwitch = () => setIsGluten((prev) => !prev);
	const toggleAllergensSwitch = () => setIsAllergens((prev) => !prev);

	const homeButtonPress = () => {
		navigation.navigate('index' as never);
	};

	const openModal = (page: ModalPage) => {
		setPageHistory((prev) => [...prev, currentPage]);
		setCurrentPage(page);
		setModalOpen(true);
	};

	const goBack = () => {
		const newHistory = [...pageHistory];
		const previousPage = newHistory.pop() || 'initial';
		setPageHistory(newHistory);
		setCurrentPage(previousPage);
	};

	const closeModal = () => {
		setModalOpen(false);
		setSelectedGoal(null);
		setPageHistory([]);
	};

	const handleGoalSelection = (goal: MealType) => {
		setSelectedGoal(goal);
		if (goal === 'advanced') {
			openModal('nutrientGoals');
		}
	};

	const handleNutrientSubmit = () => {
		closeModal();
	};

	useFocusEffect(
		useCallback(() => {
			if (isFirstVisit) {
				openModal('initial');
				setIsFirstVisit(false);
			}
		}, [isFirstVisit]),
	);

	const renderSwitch = (label: string, value: boolean, onToggle: () => void) => (
		<View style={styles.switchContainer}>
			<Text style={styles.switchText}>{label}</Text>
			<Switch
				trackColor={{ false: mainTheme.colors.border, true: mainTheme.colors.primary }}
				thumbColor={'#fff'}
				ios_backgroundColor={mainTheme.colors.border}
				onValueChange={onToggle}
				value={value}
			/>
		</View>
	);

	const renderGoalButton = (label: string, value: MealType) => (
		<TouchableOpacity
			style={[
				styles.modalButton,
				selectedGoal === value && styles.selectedButton,
			]}
			onPress={() => handleGoalSelection(value)}
		>
			<Text style={[
				styles.modalButtonText,
				selectedGoal === value && styles.selectedButtonText
			]}>{label}</Text>
		</TouchableOpacity>
	);

	const renderCategoryButton = (label: string) => (
		<TouchableOpacity style={styles.categoryCard} activeOpacity={0.8}>
			<View style={styles.categoryIconCircle}>
				<MaterialIcons name="restaurant" size={24} color={mainTheme.colors.primary} />
			</View>
			<Text style={styles.categoryTitle}>{label}</Text>
			<MaterialIcons name="arrow-forward-ios" size={16} color={mainTheme.colors.textSecondary} />
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Pressable onPress={homeButtonPress} style={styles.backButton}>
					<MaterialIcons name="arrow-back-ios" size={24} color={mainTheme.colors.foreground} />
				</Pressable>
				<Text style={styles.title}>Meal Plan</Text>
				<TouchableOpacity onPress={() => openModal('initial')} style={styles.filterButton}>
					<MaterialIcons name="tune" size={24} color={mainTheme.colors.primary} />
				</TouchableOpacity>
			</View>

			<View style={styles.content}>
				{renderCategoryButton('Breakfast')}
				{renderCategoryButton('Lunch')}
				{renderCategoryButton('Dinner')}
			</View>

			<Modal visible={modalOpen} animationType="slide" transparent={true}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={styles.modalOverlay}>
						<View style={styles.modalContainer}>
							<View style={styles.modalHeader}>
								{currentPage !== 'initial' && (
									<Pressable onPress={goBack} style={styles.iconButton}>
										<MaterialIcons name="arrow-back" size={24} color={mainTheme.colors.foreground} />
									</Pressable>
								)}
								<Text style={styles.modalTitle}>
									{currentPage === 'initial' ? 'Preferences' :
										currentPage === 'mealSelection' ? 'Select Goal' : 'Nutrient Goals'}
								</Text>
								<Pressable onPress={closeModal} style={styles.iconButton}>
									<MaterialIcons name="close" size={24} color={mainTheme.colors.foreground} />
								</Pressable>
							</View>

							<View style={styles.modalContent}>
								{currentPage === 'initial' ? (
									<>
										<Text style={styles.modalSubtitle}>Dietary Restrictions</Text>
										{renderSwitch('Vegan', isVegan, toggleVeganSwitch)}
										{renderSwitch('Halal', isHalal, toggleHalalSwitch)}
										{renderSwitch('Gluten-Free', isGluten, toggleGlutenSwitch)}
										{renderSwitch('Allergen-Free', isAllergens, toggleAllergensSwitch)}

										<TouchableOpacity
											style={styles.modalButtonNext}
											onPress={() => openModal('mealSelection')}
										>
											<Text style={styles.modalButtonNextText}>Next Step</Text>
										</TouchableOpacity>
									</>
								) : currentPage === 'mealSelection' ? (
									<>
										<Text style={styles.modalSubtitle}>Choose your objective</Text>
										{renderGoalButton('Lose Weight', 'loseWeight')}
										{renderGoalButton('Build Muscle', 'buildMuscle')}
										{renderGoalButton('Maintenance', 'maintenance')}
										{renderGoalButton('Advanced', 'advanced')}

										{selectedGoal && selectedGoal !== 'advanced' && (
											<Text style={styles.helperText}>
												{selectedGoal === 'loseWeight' && 'Options with lower calorie counts.'}
												{selectedGoal === 'buildMuscle' && 'High protein and carb options.'}
												{selectedGoal === 'maintenance' && 'Balanced meal options.'}
											</Text>
										)}
									</>
								) : (
									<>
										<Text style={styles.modalSubtitle}>Set specific targets</Text>
										<View style={styles.inputsRow}>
											<TextInput
												style={[styles.input, styles.halfInput]}
												placeholder="Min Calories"
												placeholderTextColor={mainTheme.colors.textSecondary}
												keyboardType="numeric"
												value={caloriesMin}
												onChangeText={setCaloriesMin}
											/>
											<TextInput
												style={[styles.input, styles.halfInput]}
												placeholder="Max Calories"
												placeholderTextColor={mainTheme.colors.textSecondary}
												keyboardType="numeric"
												value={caloriesMax}
												onChangeText={setCaloriesMax}
											/>
										</View>
										<TextInput
											style={styles.input}
											placeholder="Min Protein (g)"
											placeholderTextColor={mainTheme.colors.textSecondary}
											keyboardType="numeric"
											value={proteinMin}
											onChangeText={setProteinMin}
										/>
										<TextInput
											style={styles.input}
											placeholder="Min Fat (g)"
											placeholderTextColor={mainTheme.colors.textSecondary}
											keyboardType="numeric"
											value={fatMin}
											onChangeText={setFatMin}
										/>
										<TextInput
											style={styles.input}
											placeholder="Min Carbs (g)"
											placeholderTextColor={mainTheme.colors.textSecondary}
											keyboardType="numeric"
											value={carbohydratesMin}
											onChangeText={setCarbohydratesMin}
										/>
										<TouchableOpacity
											style={styles.modalButtonNext}
											onPress={handleNutrientSubmit}
										>
											<Text style={styles.modalButtonNextText}>Save Goals</Text>
										</TouchableOpacity>
									</>
								)}
							</View>
						</View>
					</View>
				</TouchableWithoutFeedback>
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
	filterButton: {
		padding: theme.spacing.s,
		backgroundColor: theme.colors.card,
		borderRadius: theme.borderRadius.s,
	},
	title: {
		...theme.textVariants.header,
		color: theme.colors.foreground,
		fontSize: 24,
	},
	content: {
		flex: 1,
		padding: theme.spacing.m,
		gap: theme.spacing.m,
	},
	categoryCard: {
		backgroundColor: theme.colors.card,
		padding: theme.spacing.l,
		borderRadius: theme.borderRadius.l,
		flexDirection: 'row',
		alignItems: 'center',
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.05,
		shadowRadius: 8,
		elevation: 4,
	},
	categoryIconCircle: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: theme.colors.background,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: theme.spacing.m,
	},
	categoryTitle: {
		fontSize: 20,
		fontWeight: '600',
		color: theme.colors.foreground,
		flex: 1,
	},
	// Modal Styles
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.6)',
		justifyContent: 'flex-end',
	},
	modalContainer: {
		backgroundColor: theme.colors.background,
		borderTopLeftRadius: theme.borderRadius.xl,
		borderTopRightRadius: theme.borderRadius.xl,
		height: '85%',
		padding: theme.spacing.l,
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
	iconButton: {
		padding: theme.spacing.s,
	},
	modalContent: {
		flex: 1,
	},
	modalSubtitle: {
		fontSize: 16,
		color: theme.colors.textSecondary,
		marginBottom: theme.spacing.l,
	},
	switchContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: theme.colors.card,
		padding: theme.spacing.m,
		borderRadius: theme.borderRadius.m,
		marginBottom: theme.spacing.m,
	},
	switchText: {
		fontSize: 16,
		fontWeight: '600',
		color: theme.colors.foreground,
	},
	modalButtonNext: {
		backgroundColor: theme.colors.primary,
		padding: theme.spacing.m,
		borderRadius: theme.borderRadius.xl,
		alignItems: 'center',
		marginTop: 'auto',
		marginBottom: theme.spacing.xl,
	},
	modalButtonNextText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 18,
	},
	modalButton: {
		padding: theme.spacing.l,
		borderRadius: theme.borderRadius.l,
		marginBottom: theme.spacing.m,
		backgroundColor: theme.colors.card,
		borderWidth: 1,
		borderColor: theme.colors.border,
		alignItems: 'center',
	},
	modalButtonText: {
		fontSize: 18,
		fontWeight: '600',
		color: theme.colors.foreground,
	},
	selectedButton: {
		backgroundColor: theme.colors.primary,
		borderColor: theme.colors.primary,
	},
	selectedButtonText: {
		color: '#fff',
	},
	helperText: {
		color: theme.colors.textSecondary,
		textAlign: 'center',
		marginTop: theme.spacing.s,
	},
	input: {
		backgroundColor: theme.colors.card,
		padding: theme.spacing.m,
		borderRadius: theme.borderRadius.m,
		marginBottom: theme.spacing.m,
		color: theme.colors.foreground,
	},
	inputsRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	halfInput: {
		width: '48%',
	},
});

export default PlanScreen;
