import { useState, useEffect } from 'react';
import { Pressable, StyleSheet, View, Image, Animated, Keyboard, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { hp } from '@/utils/Scaling';
import { countries } from '@/utils/countries';
import { Colors, Fonts } from '@/utils/Constants';
import ProductSlider from '@/components/login/ProductSlider';
import CustomText from '@/components/ui/CustomText';
import CustomInput from '@/components/ui/CustomInput';
import CustomButton from '@/components/ui/CustomButton';
import CountryPickerModal from '@/components/login/CountryPickerModal';

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[countries.length - 1]);
  const [loading, setLoading] = useState(false);
  const formAnimation = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const keyboardWillShow =
      Platform.OS === 'ios'
        ? Keyboard.addListener('keyboardWillShow', () => {
            Animated.timing(formAnimation, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }).start();
          })
        : Keyboard.addListener('keyboardDidShow', () => {
            Animated.timing(formAnimation, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }).start();
          });

    const keyboardWillHide =
      Platform.OS === 'ios'
        ? Keyboard.addListener('keyboardWillHide', () => {
            Animated.timing(formAnimation, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }).start();
          })
        : Keyboard.addListener('keyboardDidHide', () => {
            Animated.timing(formAnimation, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }).start();
          });

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, [formAnimation]);

  const handleContinue = () => {
    router.push('/(auth)/CodeConfirmation');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.sliderContainer]}>
        <ProductSlider />
      </View>

      <Animated.View
        style={[
          styles.formContent,
          {
            transform: [
              {
                translateY: formAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -220],
                }),
              },
            ],
          },
        ]}
      >
        <Image source={require('@/assets/icons/dish.png')} style={styles.logo} />
        <CustomText variant="h2" fontFamily={Fonts.Bold}>
          Dish
        </CustomText>
        <CustomText variant="h5" fontFamily={Fonts.SemiBold} style={styles.text}>
          La app #1 de ahorro en Venezuela
        </CustomText>

        <CustomInput
          onChangeText={(text) => {
            setPhoneNumber(text.slice(0, selectedCountry.phoneLength));
          }}
          onClear={() => setPhoneNumber('')}
          value={phoneNumber}
          left={
            <Pressable
              onPress={() => {
                setIsModalVisible(true);
                setPhoneNumber('');
              }}
              style={styles.leftContainer}
            >
              <Image source={{ uri: selectedCountry.flag }} style={styles.flagIcon} />
              <CustomText style={styles.phoneText}>{selectedCountry.dial_code}</CustomText>
              <Feather name="chevron-down" size={20} color={Colors.text} style={styles.downIcon} />
            </Pressable>
          }
          placeholder="Introduce tu número de teléfono"
          inputMode="numeric"
        />

        <CountryPickerModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSelectCountry={setSelectedCountry}
          initialCountry={selectedCountry}
        />

        <CustomButton
          disabled={phoneNumber.length !== selectedCountry.phoneLength}
          onPress={handleContinue}
          loading={loading}
          title="Continuar"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sliderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  formContent: {
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
    height: hp(60),
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: '3%',
    paddingTop: 20,
    marginTop: '120%',
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 20,
    marginBottom: 10,
  },
  text: {
    marginTop: 2,
    marginBottom: 15,
    opacity: 0.8,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagIcon: {
    width: 30,
    height: 30,
    marginLeft: 5,
  },
  phoneText: {
    marginLeft: 5,
  },
  downIcon: {
    marginLeft: 5,
  },
});
