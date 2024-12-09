export type CircularV2Theme = {
  background: string;
  text: string;
  primary: string;
};

export type ThemeContextType = {
  theme: CircularV2Theme;
  toggleTheme: () => void;
};
