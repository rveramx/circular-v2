import React, { useRef, useEffect, useState } from 'react';
import { Text, ScrollView, StyleSheet, View, Alert, Platform } from 'react-native';

import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/utils/Constants';
import { getImages, ImageDataType } from '@/utils/GetSupabase';

import AdCarousal from '@/components/home/AdCarousal';
import Restaurants from '@/components/home/RestaurantCard';

import AsyncStorage from '@react-native-async-storage/async-storage';
import useLocationStore from '@/utils/home/locationUser';

const HomeScreen = () => {
  const scrollRef = useRef<ScrollView>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { setUserLocation } = useLocationStore();
  const [adImages, setAdImages] = useState<ImageDataType[]>([]);

  useEffect(() => {
    (async () => {
      //Verificar si ya se rechazó anteriormente
      const wasdenied = await AsyncStorage.getItem('locationDeniedInHome');
      if (wasdenied) return;

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('El permiso para acceder a la ubicación fue denegado');
        //Guardar el estado de rechazo
        await AsyncStorage.setItem('locationDeniedInHome', 'true');
        Alert.alert(
          'Permiso denegado',
          'Necesitamos acceso a tu ubicación para mostrarte los restaurantes cercanos'
        );
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        setLocation(location);
      } catch (error) {
        setErrorMsg('Error al obtener la ubicación');
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    const loadAdImages = async () => {
      const images = await getImages('ad');
      setAdImages(images);
    };
    loadAdImages();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView ref={scrollRef} contentContainerStyle={{ paddingBottom: '33%' }}>
        <View style={styles.containerData}>
          <AdCarousal adData={adImages} />
        </View>
        <Text style={styles.header}>Las mejores opciones cerca de ti</Text>
        <Restaurants />
        <Text style={styles.header}>Ofertas cerca de ti</Text>
        <Restaurants />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightGrey,
    paddingTop: Platform.OS === 'ios' ? 120 : 120,
  },
  containerData: {
    paddingTop: '3%',
    paddingHorizontal: '4%',
  },
  header: {
    fontSize: 23,
    fontWeight: 'bold',
    paddingHorizontal: '3.5%',
    paddingVertical: '2%',
  },
  errorText: {
    color: 'red',
    padding: 10,
    textAlign: 'center',
  },
  locationText: {
    padding: 10,
    textAlign: 'center',
    color: Colors.mediumDark,
  },
});

export default HomeScreen;
