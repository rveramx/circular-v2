import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Base width used for scaling (puede ajustarse según tus necesidades)
const baseWidth = 375;

export const responsiveSize = (size: number): number => {
  return Math.round((SCREEN_WIDTH / baseWidth) * size);
};
