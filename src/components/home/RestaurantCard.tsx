import React, { useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  Animated,
} from 'react-native';
import { restaurants } from '@/datos-de-prueba/home';
import { router } from 'expo-router';
import { Colors } from '@/utils/Constants';

const screenWidth = Dimensions.get('window').width;

const Restaurants = () => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 0.6,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const onPressOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContentContainer}
    >
      {restaurants.map((restaurant, index) => (
        <Pressable
          key={index}
          style={styles.touchable}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={() => router.push('/screens/home/StoreDetails')}
        >
          <Animated.View style={[styles.categoryCard, { opacity: fadeAnim }]}>
            <Image source={restaurant.img} style={styles.image} resizeMode="cover" />
            <View style={styles.categoryBox}>
              <View style={styles.row}>
                <Image source={restaurant.logo} style={styles.logo} resizeMode="contain" />
                <View style={styles.textContainer}>
                  <Text style={styles.categoryText}>{restaurant.name}</Text>
                  <Text style={[styles.ratingText, { color: Colors.primary }]}>
                    {restaurant.rating} {restaurant.ratings}
                  </Text>
                  <Text style={[styles.distanceText, { color: Colors.medium }]}>
                    {restaurant.distance}
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContentContainer: {
    padding: '3%',
  },
  touchable: {
    marginRight: '1.5%',
  },
  categoryCard: {
    width: screenWidth * 0.75,
    height: 250,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '60%',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 15,
    marginLeft: '2%',
    marginRight: '5%',
  },
  categoryBox: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingText: {
    fontSize: 14,
  },
  distanceText: {
    fontSize: 14,
  },
});

export default Restaurants;
