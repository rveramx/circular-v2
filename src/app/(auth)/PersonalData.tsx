import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, Alert, AppState, Platform, BackHandler, Modal, Pressable } from 'react-native';
import {Colors} from '../../utils/Constants';
import CustomButton from '../../components/ui/CustomButton';
import { router } from 'expo-router';

const PersonalData: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
  });
  const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);

  const genderOptions = [
    'Femenino',
    'Masculino',
  ];

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
            <Pressable 
              style={styles.inputWrapper}
              onPress={() => setIsGenderModalVisible(true)}
            >
              <Text style={[
                styles.standardInput,
                !formData.gender && styles.placeholderText
              ]}>
                {formData.gender || "Selecciona tu género"}
              </Text>
            </Pressable>

            <Modal
              visible={isGenderModalVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={() => setIsGenderModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Selecciona tu género</Text>
                  {genderOptions.map((option) => (
                    <Pressable
                      key={option}
                      style={styles.modalOption}
                      onPress={() => {
                        setFormData({...formData, gender: option});
                        setIsGenderModalVisible(false);
                      }}
                    >
                      <Text style={[
                        styles.modalOptionText,
                        formData.gender === option && styles.modalOptionSelected
                      ]}>
                        {option}
                      </Text>
                    </Pressable>
                  ))}
                  <Pressable
                    style={styles.closeButton}
                    onPress={() => setIsGenderModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>Cerrar</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
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
  placeholderText: {
    color: '#889797',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#181818',
  },
  modalOptionSelected: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 15,
    padding: 15,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PersonalData; 