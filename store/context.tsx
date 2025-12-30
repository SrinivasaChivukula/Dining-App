import { ReactNode } from 'react';
import { createContext, useState } from 'react';
import { theme, darkTheme } from '../components/themes';

type ThemeType = typeof theme;

interface ThemeContextType {
  mainTheme: ThemeType;
  setDarkMode: (mode: boolean) => void;
  darkMode: boolean;
}

const defaultContext: ThemeContextType = {
  mainTheme: theme,
  setDarkMode: () => { },
  darkMode: false,
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

interface ThemeProviderProps {
  children: ReactNode;
  darkMode?: boolean; // Optional prop
}

const ThemeContextProvider = ({ children }: ThemeProviderProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const mainTheme = darkMode ? darkTheme : theme;
  console.log('setDarkMode', darkMode)
  return (
    <ThemeContext.Provider value={{ mainTheme, setDarkMode, darkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };