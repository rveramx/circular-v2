import React, { useState } from 'react';
import { View, Alert, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import {Colors} from '../../utils/Constants';
import { Feather as FeatherIcon } from '@expo/vector-icons'
import CustomButton from '../../components/ui/CustomButton'
import { router, useNavigation, useLocalSearchParams } from 'expo-router';
//import auth from '@react-native-firebase/auth';
//import firestore from '@react-native-firebase/firestore';

interface Props {}

const CodeConfirmation: React.FC<Props> = () => {
  const navigation = useNavigation();
   const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { verificationId, phoneNumber } = useLocalSearchParams();

  {/*
  const confirmCode = async () => {
    try {
      setLoading(true);
      const credential = auth.PhoneAuthProvider.credential(
        verificationId as string,
        code
      );
      
      // Autenticar usuario
      const userCredential = await auth().signInWithCredential(credential);
      
      // Verificar si existe el documento del usuario en Firestore
      const userDoc = await firestore()
        .collection('Users')
        .doc(userCredential.user.uid)
        .get();

      if (userDoc.exists) {
        // Si existe el documento, ir directamente a home
        router.replace('/screens/home');
      } else {
        // Si no existe, ir a PersonalData
        router.push({
          pathname: '/auth/PersonalData',
          params: { 
            phoneNumber: phoneNumber
          }
        });
      }
      
    } catch (error: any) {
      setLoading(false);
      
      // Personaliza el mensaje según el tipo de error
      let errorMessage = 'Código de verificación incorrecto. Por favor, intenta nuevamente.';
      
      if (error.code === 'auth/invalid-verification-code') {
        errorMessage = 'El código ingresado no es válido. Verifica e intenta nuevamente.';
      } else if (error.code === 'auth/code-expired') {
        errorMessage = 'El código ha expirado. Solicita un nuevo código.';
      }

      Alert.alert(
        'Error de verificación',
        errorMessage,
        [
          {
            text: 'OK',
            onPress: () => setCode('') // Limpia el código ingresado
          }
        ]
      );
      
      console.error('Error en la verificación:', error);
    } finally {
      setLoading(false);
    }
  }; */}

  const handleContinue = () => {
    router.push('/(auth)/PersonalData');
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f4eff3' }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerAction} onPress={() => navigation.goBack()}>
            <FeatherIcon name='arrow-left' size={24} color='white' />
          </TouchableOpacity>
          <Text style={styles.title}>Introduce el código</Text>

          <Text style={styles.subtitle}>
            Hemos enviado un código al número <Text style={{ color: '#222' }}>{phoneNumber}</Text>, por favor escribe el código para continuar
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.formInput}>
            <TextInput 
              autoCapitalize='none'
              autoCorrect={false}
              caretHidden
              keyboardType='number-pad'
              returnKeyType='done'
              onChangeText={(value) => setCode(value.slice(0, 6))}
              style={styles.formInputControl} 
              value={code}
            />

            <View style={styles.formInputOverflow}>
              {Array.from({ length: 6 }).map((_, index) => (
                <Text key={index} style={styles.formInputChar}>
                  {code[index] || <Text style={styles.formInputCharEmpty}>-</Text>}
                </Text>
              ))}
            </View>
          </View>
          <CustomButton
          disabled={code?.length != 6}
          //onPress={confirmCode}
          onPress={handleContinue}
          loading={loading}
          title='Continuar' />
        </View>
      </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default CodeConfirmation;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 60,
    flex: 1,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#181818',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 20,
    color: '#889797',
    fontWeight: '500',
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
  form: {
    flex: 1,
    paddingHorizontal: 24,
  },
  formInput: {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  formInputOverflow: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  formInputControl: {
    zIndex: 2,
    height: 60,
    color: 'transparent',
    paddingHorizontal: 16,
  },
  formInputChar: {
    flex: 1,
    lineHeight: 60,
    fontSize: 34,
    textAlign: 'center',
  },
  formInputCharEmpty: {
    color: '#bbb9bc',
    fontWeight: '400',
  },
});