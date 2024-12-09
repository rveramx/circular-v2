import React, { createContext, useContext, useState } from 'react';

import { CircularV2Theme, ThemeContextType } from '../types/Theme';

const lightTheme: CircularV2Theme = {
  background: '#FFFFFF',
  text: '#000000',
  primary: '#007AFF',
};

const darkTheme: CircularV2Theme = {
  background: '#000000',
  text: '#FFFFFF',
  primary: '#0A84FF',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const value = {
    theme: isDark ? darkTheme : lightTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}
