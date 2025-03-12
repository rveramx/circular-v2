import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Colors } from '../../utils/Constants';
import { Feather as FeatherIcon } from '@expo/vector-icons';
import CustomButton from '../../components/ui/CustomButton';
import { router, useNavigation, useLocalSearchParams } from 'expo-router';

interface Props {}

const CodeConfirmation: React.FC<Props> = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { phoneNumber } = useLocalSearchParams();

  const handleContinue = () => {
    router.push('/(auth)/PersonalData');
  };

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.headerAction} onPress={() => navigation.goBack()}>
              <FeatherIcon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>Introduce el código</Text>

            <Text style={styles.subtitle}>
              Hemos enviado un código al número <Text style={{ color: '#222' }}>{phoneNumber}</Text>
              , por favor escribe el código para continuar
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.formInput}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                caretHidden
                keyboardType="number-pad"
                returnKeyType="done"
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
              onPress={handleContinue}
              loading={loading}
              title="Continuar"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
  );
};

export default CodeConfirmation;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flex: 1,
    backgroundColor: '#F4EFF3'
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
