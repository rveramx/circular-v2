import { Dimensions, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Porcentajes de pantalla
export const wp = (percentage: number) => {
  return (SCREEN_WIDTH * percentage) / 100;
};

export const hp = (percentage: number) => {
  return (SCREEN_HEIGHT * percentage) / 100;
};

export const screenWidth: number = SCREEN_WIDTH;
export const screenHeight: number = SCREEN_HEIGHT;

export const NoticeHeight = Platform.OS === 'ios' ? screenHeight * 0.12 : screenHeight * 0.07;

// Base width del diseño
const baseWidth = 375;

// Función de escala para fuentes y dimensiones
export const scale = (size: number) => {
  return (screenWidth / baseWidth) * size;
};
