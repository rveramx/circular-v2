import { Colors, Fonts } from '../../utils/Constants';
import { FC } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import CustomText from './CustomText';

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  disabled: boolean;
  loading: boolean;
  style?: ViewStyle;
}

const CustomButton: FC<CustomButtonProps> = ({ onPress, title, disabled, loading, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        styles.btn,
        style,
        {
          backgroundColor: disabled ? Colors.disabled : Colors.primary,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <CustomText variant="h6" style={styles.text} fontFamily={Fonts.SemiBold}>
          {title}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    marginVertical: 20,
    width: '100%',
  },
  text: {
    color: '#fff',
  },
});

export default CustomButton;
