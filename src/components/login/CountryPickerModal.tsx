import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Modal, 
  SafeAreaView, 
  Pressable, 
  TextInput,
  FlatList,
  Image
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import CustomText from '../ui/CustomText';
import { Colors, Fonts } from '../../utils/Constants';
import { Country } from '../../utils/countries';
import { countries } from '../../utils/countries';

interface CountryPickerModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectCountry: (country: Country) => void;
  initialCountry?: Country;
}

const CountryPickerModal = ({
  isVisible,
  onClose,
  onSelectCountry,
  initialCountry
}: CountryPickerModalProps) => {
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
    onSelectCountry(country);
    onClose();
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

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Pressable onPress={onClose}>
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
  );
};

const styles = StyleSheet.create({
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
});

export default CountryPickerModal; 