import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { ScanzyTheme, lightTheme, darkTheme } from '@/constants/Colors';

const THEME_STORAGE_KEY = '@scanzy_theme_preference';

interface ThemePreference {
  isDark: boolean;
  lastUpdated: Date;
}

interface ThemeContextType {
  theme: ScanzyTheme;
  isDark: boolean;
  toggleTheme: () => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState<boolean>(systemColorScheme === 'dark');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load theme preference from AsyncStorage on mount
  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const storedPreference = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      
      if (storedPreference) {
        const preference: ThemePreference = JSON.parse(storedPreference);
        setIsDark(preference.isDark);
      } else {
        // If no stored preference, use system preference
        setIsDark(systemColorScheme === 'dark');
      }
    } catch (error) {
      console.warn('Failed to load theme preference:', error);
      // Fallback to system preference on error
      setIsDark(systemColorScheme === 'dark');
    } finally {
      setIsLoading(false);
    }
  };

  const saveThemePreference = async (darkMode: boolean) => {
    try {
      const preference: ThemePreference = {
        isDark: darkMode,
        lastUpdated: new Date(),
      };
      await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(preference));
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  };

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    saveThemePreference(newIsDark);
  };

  const theme = isDark ? darkTheme : lightTheme;

  const contextValue: ThemeContextType = {
    theme,
    isDark,
    toggleTheme,
    isLoading,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;