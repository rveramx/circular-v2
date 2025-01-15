import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, Alert, AppState, Platform, BackHandler } from 'react-native';
import {Colors} from '../../utils/Constants';
//import { Feather as FeatherIcon } from '@expo/vector-icons'
import CustomButton from '../../components/ui/CustomButton';
import { router, useLocalSearchParams } from 'expo-router';
//import auth from '@react-native-firebase/auth';
//import firestore from '@react-native-firebase/firestore';

const PersonalData: React.FC = () => {
  const { phoneNumber } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const appState = useRef(AppState.currentState);
  const backgroundTimeRef = useRef<Date | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
  });

  const genderOptions = [
    'Femenino',
    'Masculino',
    'No binario',
    'Prefiero no decirlo'
  ];

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (Platform.OS === 'android') {
        BackHandler.exitApp();
      }
      return true;
    });

    return () => backHandler.remove();
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      if (!formData.firstName || !formData.lastName || !formData.birthDate || !formData.gender) {
        Alert.alert('Error', 'Por favor, completa todos los campos');
        return;
      }

      const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
      if (!dateRegex.test(formData.birthDate)) {
        Alert.alert('Error', 'Por favor, ingresa una fecha válida en formato dd/mm/aaaa');
        return;
      }

      const userData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        birthDate: formData.birthDate,
        gender: formData.gender,
        phoneNumber: phoneNumber as string,
        //createdAt: firestore.FieldValue.serverTimestamp(),
        //updatedAt: firestore.FieldValue.serverTimestamp(),
        //uid: currentUser.uid
      };

      router.replace('/screens/home');
      
    } catch (error) {
      console.error('Error detallado:', {
        error: error as Error,
        message: (error as Error)?.message,
        code: (error as any)?.code,
        phoneNumber,
        //userId: auth().currentUser?.uid
      });
      
      Alert.alert(
        'Error',
        'Hubo un problema al guardar tus datos. Por favor, intenta nuevamente.'
      );
    } finally {
      setLoading(false);
    }
  };


  const handleBirthDateChange = (text: string) => {
    const cleanText = text.replace(/[^\d]/g, '');
    
    let formattedText = '';
    if (cleanText.length <= 2) {
      formattedText = cleanText;
    } else if (cleanText.length <= 4) {
      formattedText = `${cleanText.slice(0, 2)}/${cleanText.slice(2)}`;
    } else if (cleanText.length <= 8) {
      formattedText = `${cleanText.slice(0, 2)}/${cleanText.slice(2, 4)}/${cleanText.slice(4)}`;
    }

    if (formattedText.length <= 10) {
      setFormData({...formData, birthDate: formattedText});
    }
  };

  const handleContinue = () => {
    router.push('/(app)/home');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f4eff3' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Datos Personales</Text>
          <Text style={styles.subtitle}>
            Por favor, completa tus datos para continuar
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nombre</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.standardInput}
                value={formData.firstName}
                onChangeText={(text) => setFormData({...formData, firstName: text})}
                placeholder="Ingresa tu nombre"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Apellido</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.standardInput}
                value={formData.lastName}
                onChangeText={(text) => setFormData({...formData, lastName: text})}
                placeholder="Ingresa tus apellidos"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Fecha de nacimiento</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.standardInput}
                value={formData.birthDate}
                onChangeText={handleBirthDateChange}
                placeholder="dd/mm/aaaa"
                keyboardType="numeric"
                maxLength={10}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Género</Text>
            <View style={styles.genderContainer}>
              {genderOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.genderOption,
                    formData.gender === option && styles.genderOptionSelected
                  ]}
                  onPress={() => setFormData({...formData, gender: option})}
                >
                  <Text style={[
                    styles.genderText,
                    formData.gender === option && styles.genderTextSelected
                  ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <CustomButton
            disabled={loading}
            onPress={handleContinue}
            loading={loading}
            title='Continuar'
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 28,
  },
  headerAction: {
    width: 40,
    height: 40,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    marginBottom: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#181818',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#889797',
    fontWeight: '500',
  },
  form: {
    flex: 1,
    paddingHorizontal: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#181818',
    marginBottom: 10,
  },
  inputWrapper: {
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  standardInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    minHeight: 50,
  },
  genderContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  genderOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#889797',
    backgroundColor: '#fff',
  },
  genderOptionSelected: {  
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  genderText: {
    color: '#889797',
    fontSize: 14,
  },
  genderTextSelected: {
    color: '#fff',
  },
});

export default PersonalData; 