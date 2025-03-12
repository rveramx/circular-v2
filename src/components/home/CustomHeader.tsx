import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar, useWindowDimensions } from 'react-native';
import React, { useEffect, useState } from 'react';

import { Ionicons, FontAwesome6 } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import Constants from 'expo-constants';

import {Colors} from '../../utils/Constants';
import useLocationStore from '@/utils/home/locationUser';
import CustomSafeAreaView from '@/components/global/CustomSafeAreaView'
import SearchBar from '@/components/ui/SearchBar';
import UserLocation from '@/app/(modal)/UserLocation';

const CustomHeader = () => {
  const { width } = useWindowDimensions();
  const { mapLocation } = useLocationStore();
  const [locationName, setLocationName] = useState('Caracas');
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);

  const googleApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
    
  useEffect(() => {
    const getLocationName = async () => {
      if (mapLocation?.latitude && mapLocation?.longitude) {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${mapLocation.latitude},${mapLocation.longitude}&key=${googleApiKey}`
          );
          const data = await response.json();
          
          if (data.results && data.results.length > 0) {
            // Buscamos el componente más específico (normalmente el sector o urbanización)
            const addressComponents = data.results[0].address_components;
            const sublocality = addressComponents.find(
              (component: any) => 
                component.types.includes('sublocality') || 
                component.types.includes('neighborhood')
            );
            
            if (sublocality) {
              setLocationName(sublocality.long_name);
            } else {
              // Si no hay sublocality, usamos la dirección formateada y la acortamos
              setLocationName(data.results[0].formatted_address.split(',')[0]);
            }
          }
        } catch (error) {
          console.error('Error obteniendo nombre de ubicación:', error);
          setLocationName('Venezuela');
        }
      }
    };

    getLocationName();
  }, [mapLocation]);

  return (  
    <CustomSafeAreaView>
      <StatusBar 
        barStyle="dark-content"
        backgroundColor="#fff"
        translucent={true}
      />
      <View style={styles.headerWrapper}>
        <View style={styles.container}>
            <TouchableOpacity style={styles.locationButton} onPress={() => setIsLocationModalVisible(true)}>
              <FontAwesome6 name="location-dot" size={30} color={'#eb1c24'} />          
              <View style={styles.locationTextContainer}>
                <Text style={styles.title}>Seleccionar ubicación</Text>
                <View style={styles.locationName}>
                  <Text style={styles.subtitle}>{locationName}</Text>
                  <Ionicons name="chevron-down" size={20} color={'gray'} />
                </View>
              </View>
            </TouchableOpacity>
        </View>
        <SearchBar 
          containerStyle={{
            paddingHorizontal: width < 380 ? '4%' : '4%',
          }}
          placeholder="Busca tu tienda de preferencia"
          backgroundColor="#EBEAEB"
          iconColor={Colors.primary}
          iconSize={20}
        />
      </View>
      <UserLocation 
        isVisible={isLocationModalVisible}
        onClose={() => setIsLocationModalVisible(false)}
      />
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 0,
    backgroundColor: '#fff',
  },
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    zIndex: 1000,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    height: Platform.OS === 'ios' ? '50%' : '50%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '8%',
    paddingTop: Platform.OS === 'ios' ? 20 : '10%',
  },
  titleContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    color: Colors.medium,
  },
  locationName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1d1d1d',
  },
  profileButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 8,
    borderRadius: 50,
  },
  searchContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  searchSection: {
    backgroundColor: '#fff',
  },
  searchField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBEAEB',
    borderRadius: 15,
    height: 50,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 6,
    color: Colors.primary,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '2%',
  },
  locationTextContainer: {
    marginLeft: 8,
  },
});

export default CustomHeader;
