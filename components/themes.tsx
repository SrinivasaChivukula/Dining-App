const palette = {
	white: '#FFFFFF',
	black: '#000000',
	backgroundLight: '#FFFFFF', // Clean White
	backgroundDark: '#0A0A0A', // Deep Black
	primary: '#00F5D4', // Neon Mint
	primaryDark: '#00D09C',
	secondary: '#7000FF', // Electric Purple
	accent: '#FF0055', // Neon Pink
	grey: '#8E8E93',
	lightGrey: '#F2F2F7',
	darkGrey: '#1C1C1E',
	success: '#32D74B',
	error: '#FF453A',
	warning: '#FFD60A',
};

export const theme = {
	colors: {
		background: palette.backgroundLight,
		foreground: palette.black,
		card: palette.white,
		border: palette.lightGrey,
		primary: palette.primary,
		secondary: palette.secondary,
		accent: palette.accent,
		success: palette.success,
		error: palette.error,
		failure: palette.error, // Keeping for backward compatibility
		tabBackground: palette.white,
		text: palette.black,
		textSecondary: palette.grey,
		// Backwards compatibility keys
		imagePicker: palette.lightGrey,
		sectionIcons: palette.grey,
		logo: palette.primary,
		danger: palette.error,
	},
	spacing: {
		s: 8,
		m: 16,
		l: 24,
		xl: 40,
		xxl: 60,
	},
	textVariants: {
		header: {
			fontFamily: 'Helvetica',
			fontSize: 32,
			fontWeight: 'bold',
		},
		title: {
			fontFamily: 'Helvetica',
			fontSize: 24,
			fontWeight: '600',
		},
		body: {
			fontFamily: 'Helvetica',
			fontSize: 16,
			lineHeight: 24,
		},
		caption: {
			fontFamily: 'Helvetica',
			fontSize: 12,
			color: palette.grey,
		},
	},
	borderRadius: {
		s: 8,
		m: 16,
		l: 24,
		xl: 32,
	}
};

export const darkTheme = {
	...theme,
	colors: {
		...theme.colors,
		background: palette.backgroundDark,
		foreground: palette.white,
		card: palette.darkGrey,
		border: palette.darkGrey,
		tabBackground: palette.backgroundDark,
		text: palette.white,
		textSecondary: palette.grey,
		imagePicker: palette.darkGrey,
		logo: palette.primary,
	},
};