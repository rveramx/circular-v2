import React, { FC, useEffect, useRef, useState } from 'react'
import { 
  View, 
  StyleSheet, 
  Animated, 
  Image, 
  SafeAreaView, 
  Pressable, 
  Modal, 
  FlatList, 
  TextInput, 
  Alert,
  useWindowDimensions,
  Dimensions
} from 'react-native'

import { Feather } from '@expo/vector-icons'
//import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { router } from 'expo-router'

// Componentes propios
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView'
import ProductSlider from '../../components/login/ProductSlider'
import CustomText from '../../components/ui/CustomText'
import CustomInput from '../../components/ui/CustomInput'
import CustomButton from '../../components/ui/CustomButton'

// Utilidades y constantes
import { Colors, Fonts } from '../../utils/Constants'
import useKeyboardOffsetHeight from '../../utils/useKeyboardOffsetHeight'
import { countries, Country } from '../../utils/countries'
import { responsiveSize } from '../../utils/responsiveSize'

// Definir las dimensiones fuera del componente
const { width, height } = Dimensions.get('window')

const CustomerLogin: FC = () => {

  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const keyboardOffsetHeight = useKeyboardOffsetHeight()
  const { height: windowHeight, width: windowWidth } = useWindowDimensions()

  const animatedValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (keyboardOffsetHeight == 0) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      }).start()
    } else {
      Animated.timing(animatedValue, {
        toValue: -keyboardOffsetHeight * 0.7,
        duration: 1000,
        useNativeDriver: true
      }).start()
    }
  }, [keyboardOffsetHeight])

  /*const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const handlePhoneAuth = async () => {
    if (!phoneNumber || phoneNumber.length !== selectedCountry.phoneLength) {
      Alert.alert('Error', 'Por favor, introduce un número válido');
      return;
    }

    try {
      setLoading(true);
      const formattedPhoneNumber = `${selectedCountry.dial_code}${phoneNumber}`.replace(/\s+/g, '');
      
      const confirmation = await auth().signInWithPhoneNumber(formattedPhoneNumber);
      
      router.push({
        pathname: '/auth/CodeConfirmation',
        params: { 
          verificationId: confirmation.verificationId,
          phoneNumber: formattedPhoneNumber
        }
      });

    } catch (error: any) {
      console.error('Error:', error);
      Alert.alert('Error', 'No se pudo enviar el código. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);*/

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[countries.length - 1]); // Selecciona Venezuela
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = countries.filter(country => 
      country.name.toLowerCase().includes(text.toLowerCase()) ||
      country.dial_code.includes(text) ||
      country.code.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsModalVisible(false);
  };

  const renderCountryItem = ({ item }: { item: Country }) => (
    <Pressable 
      style={styles.countryItem}
      onPress={() => handleCountrySelect(item)}
    >
      <Image
        source={{ uri: item.flag }}
        style={styles.countryFlag}
      />
      <View style={styles.countryInfo}>
        <CustomText variant='h6' fontFamily={Fonts.SemiBold}>
          {item.name}
        </CustomText>
        <CustomText variant='h6' style={styles.countryCode}>
          {item.dial_code}
        </CustomText>
      </View>
    </Pressable>
  );

  //if (initializing) return null;

  const handleContinue = () => {
    router.push('/(auth)/CodeConfirmation');
  };

  return (
    <Animated.View style={[styles.container, { height: windowHeight }]}>
      <View style={[styles.container, { height: windowHeight }]}>
        <CustomSafeAreaView>
          <View style={{ height: windowHeight * 0.45,
            marginTop: windowHeight * 0.06
           }}>
            <ProductSlider />
          </View>
          <Animated.View
            style={[
              styles.subContainer,
              { 
                minHeight: windowHeight * 0.62,
                paddingBottom: windowHeight * 0.1,
                marginTop: -windowHeight * 0.05,
                transform: [{ translateY: animatedValue }] 
              }
            ]}
          >
            <View style={[styles.content, { 
              minHeight: windowHeight * 0.6,
              paddingTop: 0,
              marginTop: windowHeight * 0.2
            }]}>
              <Image source={require('../../assets/icons/dish.png')} style={styles.logo} />
              <CustomText variant='h2' fontFamily={Fonts.Bold}>
                Dish
              </CustomText>
              <CustomText variant='h5' fontFamily={Fonts.SemiBold} style={styles.text}>
                La app #1 de ahorro en Venezuela
              </CustomText>

              <CustomInput
              onChangeText={(text) => { 
                setPhoneNumber(text.slice(0, selectedCountry.phoneLength)) 
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
              placeholder='Introduce tu número de teléfono'
              inputMode='numeric'
            />

            <Modal
              visible={isModalVisible}
              animationType="slide"
              transparent={false}
              onRequestClose={() => setIsModalVisible(false)}
            >
              <SafeAreaView style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Pressable onPress={() => setIsModalVisible(false)}>
                      <Feather 
                        name="chevron-down" 
                        size={24} 
                        color={Colors.text}
                        style={{ transform: [{ rotate: '-270deg' }] }}
                      />
                    </Pressable>
                    <CustomText variant='h4' fontFamily={Fonts.Bold}>
                      Seleccionar país
                    </CustomText>
                    <View style={{ width: 24 }} />
                  </View>

                  <View style={styles.searchContainer}>
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Buscar país o código"
                      value={searchQuery}
                      onChangeText={handleSearch}
                    />
                  </View>

                  <FlatList
                    data={filteredCountries}
                    renderItem={renderCountryItem}
                    keyExtractor={item => item.code}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
              </SafeAreaView>
            </Modal>

            <CustomButton
                disabled={phoneNumber.length !== selectedCountry.phoneLength}
                onPress={handleContinue}
                loading={loading}
                title='Continuar' />
            </View>  
          </Animated.View>
 
        {/*<View style={[styles.footer, { paddingBottom: windowHeight * 0.02 }]}>
          <SafeAreaView>
            <CustomText   
              fontSize={responsiveSize(6)} 
              style={{ textAlign: 'center' }}
            >
              Al continuar, acepta nuestras condiciones de servicio y nuestra política de privacidad
            </CustomText>
          </SafeAreaView>
         </View>*/}
        </CustomSafeAreaView>
      </View>
    
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  text: {
    marginTop: 2,
    marginBottom: 15,
    opacity: 0.8
  },
  subContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  phoneText: {
    marginLeft: 5
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02
  },
  logo: {
    height: responsiveSize(50),
    width: responsiveSize(50),
    borderRadius: responsiveSize(20),
    marginVertical: responsiveSize(10)
  },
  footer: {
    borderTopWidth: 0.8,
    borderColor: Colors.border,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#f8f9fc',
    paddingTop: height * 0.02,
    paddingHorizontal: width * 0.05
  },
  gradient: {
    paddingTop: 60,
    width: '100%'
  },
  downIcon: {
    marginLeft: 5,
  },
  flagIcon: {
    width: 30,
    height: 30,
    marginLeft: 5,
},
leftContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center', 
},
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalContent: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  searchContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  countryFlag: {
    width: 30,
    height: 20,
    marginRight: 15,
  },
  countryInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 15,
  },
  countryCode: {
    color: Colors.text,
    opacity: 0.6,
  },
  fadeEffect: {
    position: 'absolute',
    top: '48%',
    left: 0,
    right: 0,
    height: 100,
    zIndex: 1,
  },
})
export default CustomerLogin