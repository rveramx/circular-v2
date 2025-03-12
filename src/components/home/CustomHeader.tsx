import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import { Ionicons, FontAwesome6 } from '@expo/vector-icons';

import { Colors } from '../../utils/Constants';
import useLocationStore from '@/utils/home/locationUser';
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
                component.types.includes('sublocality') || component.types.includes('neighborhood')
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
          setLocationName('Caracas');
        }
      }
    };

    getLocationName();
  }, [mapLocation, googleApiKey]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.headerWrapper}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.locationButton}
            onPress={() => setIsLocationModalVisible(true)}
          >
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
            marginBottom: 10,
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
    </>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '7%',
    paddingVertical: 5,
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
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  locationTextContainer: {
    marginLeft: 8,
  },
});

export default CustomHeader;
