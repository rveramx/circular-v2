import React, { useRef, useEffect, useState } from 'react';
import { Text, ScrollView, StyleSheet, View, Alert, Platform } from 'react-native';

import * as Location from 'expo-location';
import { Colors } from '@/utils/Constants';
import { getImages, ImageDataType } from '@/utils/GetSupabase';

import AdCarousal from '@/components/home/AdCarousal';
import Restaurants from '@/components/home/RestaurantCard';

import AsyncStorage from '@react-native-async-storage/async-storage';
import useLocationStore from '@/utils/home/locationUser';

const HomeScreen = () => {
  const scrollRef = useRef<ScrollView>(null);
  //const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [ ,setErrorMsg] = useState<string | null>(null);
  const { setUserLocation } = useLocationStore();
  const [adImages, setAdImages] = useState<ImageDataType[]>([]);

  useEffect(() => {
    (async () => {
      const wasdenied = await AsyncStorage.getItem('locationDeniedInHome');
      if (wasdenied) return;

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('El permiso para acceder a la ubicación fue denegado');
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
      } catch (error) {
        setErrorMsg('Error al obtener la ubicación');
        console.error(error);
      }
    })();
  }, [setUserLocation]);

  useEffect(() => {
    const loadAdImages = async () => {
      const images = await getImages('ad');
      setAdImages(images);
    };
    loadAdImages();
  }, []);

  return (
    <ScrollView 
      ref={scrollRef} 
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
    >
      <View style={styles.containerData}>
        <AdCarousal adData={adImages} />
      </View>

      <Text style={styles.header}>Las mejores opciones cerca de ti</Text>
      <Restaurants />
      <Text style={styles.header}>Ofertas cerca de ti</Text>
      <Restaurants />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'ios' ? '35%' : '35%',
  },
  containerData: {
    paddingHorizontal: '4%',
  },
  header: {
    fontSize: 23,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
});

export default HomeScreen;
