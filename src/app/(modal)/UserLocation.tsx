import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import useLocationStore from '@/utils/home/locationUser';
import { Colors } from '@/utils/Constants';

interface UserLocationProps {
  isVisible: boolean;
  onClose: () => void;
}

const UserLocation: React.FC<UserLocationProps> = ({ isVisible, onClose }) => {
  const { userLocation, setMapLocation, mapLocation } = useLocationStore();

  const [selectedLocation, setSelectedLocation] = useState({
    latitude: mapLocation?.latitude || userLocation?.latitude || 10.499378425131644,
    longitude: mapLocation?.longitude || userLocation?.longitude || -66.78445428449022,
  });

  const [location, setLocation] = useState({
    latitude: mapLocation?.latitude || userLocation?.latitude || 10.499378425131644,
    longitude: mapLocation?.longitude || userLocation?.longitude || -66.78445428449022,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  const handleMapPress = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const googleApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <StatusBar style="light" backgroundColor="#F4EFF3" />
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close-outline" size={28} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Selecciona tu ubicación</Text>
      </View>

      <GooglePlacesAutocomplete
        placeholder="Buscar ubicación"
        fetchDetails={true}
        onPress={(data, details) => {
          const point = details?.geometry?.location;
          if (point) {
            setLocation({
              ...location,
              latitude: point.lat,
              longitude: point.lng,
            });
            setSelectedLocation({
              latitude: point.lat,
              longitude: point.lng,
            });
          }
        }}
        query={{
          key: googleApiKey,
          language: 'es',
          components: 'country:ve',
        }}
        renderLeftButton={() => (
          <View style={styles.boxIcon}>
            <Ionicons name="search-outline" size={24} color={Colors.medium} />
          </View>
        )}
        styles={{
          container: { flex: 0 },
          textInput: {
            backgroundColor: '#EBEAEB',
            paddingLeft: 35,
            borderRadius: 10,
          },
          textInputContainer: {
            padding: 8,
            backgroundColor: '#fff',
          },
        }}
      />

      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        style={styles.map}
        region={location}
        onPress={handleMapPress}
      >
        <Marker
          coordinate={selectedLocation}
          pinColor="red"
          draggable
          onDragEnd={(e) => {
            const { latitude, longitude } = e.nativeEvent.coordinate;
            setSelectedLocation({ latitude, longitude });
          }}
        />
      </MapView>

      <View style={styles.absoluteBox}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setMapLocation(selectedLocation);
            onClose();
          }}
        >
          <Text style={styles.buttonText}>Confirmar ubicación</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 100,
    backgroundColor: '#F4EFF3',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingTop: '10%',
  },
  closeButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  map: {
    flex: 1,
  },
  absoluteBox: {
    position: 'absolute',
    bottom: '5%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
    width: '50%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  boxIcon: {
    position: 'absolute',
    left: 15,
    top: 18,
    zIndex: 1,
  },
});

export default UserLocation;
