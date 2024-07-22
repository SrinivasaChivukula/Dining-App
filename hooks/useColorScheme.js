import React, { useState, useContext, createContext, useEffect } from 'react';
import { Appearance } from 'react-native';

const ColorSchemeContext = createContext('light');
const ColorSchemeUpdateContext = createContext(() => {});

export function useColorScheme() {
  return useContext(ColorSchemeContext);
}

export function useColorSchemeUpdate() {
  return useContext(ColorSchemeUpdateContext);
}

export function ColorSchemeProvider({ children }) {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme() || 'light');

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme || 'light');
    });
    return () => subscription.remove();
  }, []);

  const toggleColorScheme = (scheme) => {
    setColorScheme(scheme);
  };

  return (
    <ColorSchemeContext.Provider value={colorScheme}>
      <ColorSchemeUpdateContext.Provider value={toggleColorScheme}>
        {children}
      </ColorSchemeUpdateContext.Provider>
    </ColorSchemeContext.Provider>
  );
}
