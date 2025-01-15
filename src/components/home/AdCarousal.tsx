import { View, StyleSheet, Image, Animated, FlatList } from 'react-native';
import React, { FC, useRef, useState, useEffect } from 'react';
import { screenWidth } from '../../utils/Scaling';
import ScalePress from '../global/ScalePress';

const ITEM_WIDTH = screenWidth - 40;
const ITEM_HEIGHT = ITEM_WIDTH * 0.5;

const AdCarousal: FC<{ adData: any }> = ({ adData }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % adData.length; 
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,  
        });
      }, 5000);
  
      return () => clearInterval(interval); 
    }
  }, [isAutoPlay, currentIndex, adData.length]);
  

  const handleScroll = (e: any) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const newIndex = Math.floor(offsetX / ITEM_WIDTH); 

    setCurrentIndex(newIndex); 
    setPaginationIndex(newIndex); 
  };

  const handleScrollBeginDrag = () => {
    setIsAutoPlay(false); 
  };

  const handleScrollEndDrag = () => {
    setIsAutoPlay(true); 
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const inputRange = [
      (index - 1) * ITEM_WIDTH,
      index * ITEM_WIDTH,
      (index + 1) * ITEM_WIDTH,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.94, 1, 0.94],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.itemContainer}>
        <ScalePress>
          <Animated.View style={[styles.imageContainer, { transform: [{ scale }] }]}>
            <Image source={item} style={styles.img} />
          </Animated.View>
        </ScalePress>
      </View>
    );
  };

  const getItemLayout = (data: any, index: number) => ({
    length: ITEM_WIDTH,
    offset: ITEM_WIDTH * index,
    index,
  });
  

  return (
    <View style={styles.container}>
      <Animated.FlatList
            ref={flatListRef}
            data={adData}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={ITEM_WIDTH}
            decelerationRate="fast"
            contentContainerStyle={styles.contentContainer}
            onMomentumScrollEnd={handleScroll}
            onScrollBeginDrag={handleScrollBeginDrag}
            onScrollEndDrag={handleScrollEndDrag}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true }
            )}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
            getItemLayout={getItemLayout}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT,
    marginTop: '13%',
    marginBottom: '5%'
  },
  contentContainer: {},
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
  },
  imageContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
});

export default AdCarousal;
