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
    title: 'Los productos próximos a vencer con 50% de descuento',
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

export default function StartScreen() {
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
        {slides.map((slide) => (
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

      <Pressable
        onPress={currentIndex === slides.length - 1 ? handleContinue : handleNextSlide}
        style={styles.arrowButton}
      >
        {currentIndex === slides.length - 1 ? (
          <View style={styles.continueButton}>
            <Text style={styles.continueText}>Continuar</Text>
          </View>
        ) : (
          <MaterialIcons name="arrow-forward" size={40} color={Colors.primary} />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: '20%',
  },
  slideContainer: {
    width,
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '7%',
  },
  image: {
    width: '80%',
    height: '80%',
    alignSelf: 'center',
  },
  slideTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: 'row',
    bottom: '30%',
    alignSelf: 'center',
    gap: 50,
  },
  dot: {
    width: 28,
    height: 14,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  arrowButton: {
    position: 'absolute',
    bottom: '16%',
    alignSelf: 'center',
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 8,
  },
  continueText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
