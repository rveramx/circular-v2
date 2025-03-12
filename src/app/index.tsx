import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image, Pressable, Animated, Text } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { Colors } from '../utils/Constants';

const { width } = Dimensions.get('window');

const handleContinue = () => {
  router.push('/(auth)');
};

const slides = [
  {
    id: 1,
    image: require('../assets/start/market.png'),
    title: 'Elige tu tienda de preferencia',
  },
  {
    id: 2,
    image: require('../assets/start/carrito.png'),
    title: 'Todos los productos con 50% de descuento',
  },
  {
    id: 3,
    image: require('../assets/start/delivery.png'),
    title: 'Elige delivery o pick-up',
  },
  {
    id: 4,
    image: require('../assets/start/orden.png'),
    title: '¡Disfruta tu pedido!',
  },
];

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<any>(null);

  const onMomentumScrollEnd = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNextSlide = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: nextIndex * width,
          animated: true,
        });
      }
      setCurrentIndex(nextIndex);
    }
  };

  useEffect(() => {
    if (currentIndex < slides.length - 1) {
      const timer = setInterval(() => {
        const nextIndex = currentIndex + 1;
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: nextIndex * width,
            animated: true,
          });
        }
        setCurrentIndex(nextIndex);
      }, 4000);

      return () => clearInterval(timer);
    }
  }, [currentIndex]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onMomentumScrollEnd}
          scrollEventThrottle={16}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: true,
          })}
        >
          {slides.map((slide, index) => (
            <View key={slide.id} style={styles.slideContainer}>
              <Text style={styles.slideTitle}>{slide.title}</Text>
              <Image source={slide.image} style={styles.image} resizeMode="contain" />
            </View>
          ))}
        </Animated.ScrollView>

        <View style={styles.pagination}>
          {slides.map((_, index) => {
            const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

            const scaleX = scrollX.interpolate({
              inputRange,
              outputRange: [1, 2.2, 1],
              extrapolate: 'clamp',
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.5, 1, 0.5],
              extrapolate: 'clamp',
            });

            const borderRadius = scrollX.interpolate({
              inputRange,
              outputRange: [6, 4, 6],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    opacity,
                    transform: [{ scaleX }],
                    backgroundColor: Colors.primary,
                    borderRadius,
                  },
                ]}
              />
            );
          })}
        </View>

        {currentIndex === slides.length - 1 ? (
          <Pressable onPress={handleContinue} style={styles.arrowButton}>
            <View style={styles.continueButton}>
              <Text style={styles.continueText}>Continuar</Text>
              <MaterialIcons name="arrow-forward" size={40} color={Colors.primary} />
            </View>
          </Pressable>
        ) : (
          <Pressable onPress={handleNextSlide} style={styles.arrowButton}>
            <MaterialIcons name="arrow-forward" size={40} color={Colors.primary} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  slideContainer: {
    width,
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  image: {
    width: '80%',
    height: '80%',
    borderRadius: 20,
    alignSelf: 'center',
  },
  slideTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: '30%',
    alignSelf: 'center',
    gap: 36,
  },
  dot: {
    width: 28,
    height: 14,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  arrowButton: {
    position: 'absolute',
    bottom: '18%',
    alignSelf: 'center',
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  continueText: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 10,
  },
});
