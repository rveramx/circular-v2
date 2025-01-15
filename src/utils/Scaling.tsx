import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get('window');
export const screenWidth: number = width;
export const screenHeight: number = height;

export const NoticeHeight = Platform.OS === 'ios' ? screenHeight * 0.12 : screenHeight * 0.07;

// Base width del diseño
const baseWidth = 375;

// Función de escala para fuentes y dimensiones
export const scale = (size: number) => {
  return (screenWidth / baseWidth) * size;
};