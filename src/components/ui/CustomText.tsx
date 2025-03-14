import { Colors, Fonts } from '../../utils/Constants';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { scale } from '../../utils/Scaling';

interface Props {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'h8' | 'h9' | 'body';
  fontFamily?: Fonts;
  fontSize?: number;
  style?: TextStyle | TextStyle[];
  children?: React.ReactNode;
  numberOfLines?: number;
  onLayout?: (event: object) => void;
}

const CustomText: React.FC<Props> = ({
  variant = 'body',
  fontFamily = Fonts.Regular,
  fontSize,
  style,
  children,
  numberOfLines,
  onLayout,
  ...props
}) => {
  let computedFontSize: number;

  switch (variant) {
    case 'h1':
      computedFontSize = scale(fontSize || 22);
      break;
    case 'h2':
      computedFontSize = scale(fontSize || 20);
      break;
    case 'h3':
      computedFontSize = scale(fontSize || 18);
      break;
    case 'h4':
      computedFontSize = scale(fontSize || 16);
      break;
    case 'h5':
      computedFontSize = scale(fontSize || 14);
      break;
    case 'h6':
      computedFontSize = scale(fontSize || 12);
      break;
    case 'h7':
      computedFontSize = scale(fontSize || 12);
      break;
    case 'h8':
      computedFontSize = scale(fontSize || 10);
      break;
    case 'h9':
      computedFontSize = scale(fontSize || 9);
      break;
    case 'body':
      computedFontSize = scale(fontSize || 12);
      break;
  }

  const fontFamilyStyle = {
    fontFamily,
  };

  return (
    <Text
      onLayout={onLayout}
      style={[
        styles.text,
        { color: Colors.text, fontSize: computedFontSize },
        fontFamilyStyle,
        style,
      ]}
      numberOfLines={numberOfLines !== undefined ? numberOfLines : undefined}
      {...props}
    >
      {children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
  },
});
