import { View, StyleSheet, Image, Animated, Easing } from 'react-native';
import React, { FC, useMemo, useEffect, useState } from 'react';
import { getImages, ImageDataType } from '../../utils/GetSupabase';
import { screenWidth, wp, hp } from '../../utils/Scaling';

const ProductSlider = () => {
  const scrollX = useMemo(() => new Animated.Value(0), []);
  const [images, setImages] = useState<ImageDataType[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      const imageData = await getImages('login');
      setImages(imageData);
    };
    loadImages();
  }, []);

  const rows = useMemo(() => {
    const result = [];
    for (let i = 0; i < images.length; i += 4) {
      result.push(images.slice(i, i + 4));
    }
    return result;
  }, [images]);

  useEffect(() => {
    const startAnimation = () => {
      scrollX.setValue(0);
      Animated.loop(
        Animated.timing(scrollX, {
          toValue: -screenWidth * 2,
          duration: 30000,
          useNativeDriver: true,
          easing: Easing.linear,
        })
      ).start();
    };

    startAnimation();
    return () => {
      scrollX.stopAnimation();
    };
  }, [scrollX]);

  return (
    <View style={styles.container}>
      {images.length > 0 && (
        <View style={styles.viewportContainer} pointerEvents="none">
          <Animated.View
            style={[
              styles.gridContainer,
              {
                transform: [
                  {
                    translateX: scrollX.interpolate({
                      inputRange: [-screenWidth * 2, 0],
                      outputRange: [0, -screenWidth * 2],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.gridContent}>
              <View>
                {rows?.map((row: any, rowIndex: number) => (
                  <MemoizedRow key={`first-bottom-${rowIndex}`} row={row} rowIndex={rowIndex} />
                ))}
              </View>
            </View>
            <View style={styles.gridContent}>
              <View>
                {rows?.map((row: any, rowIndex: number) => (
                  <MemoizedRow key={`second-bottom-${rowIndex}`} row={row} rowIndex={rowIndex} />
                ))}
              </View>
            </View>
            <View style={styles.gridContent}>
              <View>
                {rows?.map((row: any, rowIndex: number) => (
                  <MemoizedRow key={`third-bottom-${rowIndex}`} row={row} rowIndex={rowIndex} />
                ))}
              </View>
            </View>
          </Animated.View>
        </View>
      )}
    </View>
  );
};

const Row: FC<{ row: ImageDataType[]; rowIndex: number }> = ({ row, rowIndex }) => {
  return (
    <View style={styles.row}>
      {row.map((image, imageIndex) => {
        const horizontalShift = rowIndex % 2 === 0 ? 0 : screenWidth * 0.14;
        return (
          <View
            key={imageIndex}
            style={[
              styles.itemContainer,
              {
                transform: [{ translateX: horizontalShift }],
                marginHorizontal: screenWidth * 0.01,
              },
            ]}
          >
            <Image source={{ uri: image.url }} style={styles.image} />
          </View>
        );
      })}
    </View>
  );
};

const MemoizedRow = React.memo(Row);

const styles = StyleSheet.create({
  container: {
    height: hp(65),
    width: '100%',
  },
  viewportContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    paddingTop: hp(2),
  },
  itemContainer: {
    width: wp(23),
    height: wp(28),
    backgroundColor: '#e9f7f8',
    justifyContent: 'center',
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  gridContainer: {
    flexDirection: 'row',
    height: '100%',
  },
  gridContent: {
    width: screenWidth,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(98),
    alignSelf: 'center',
  },
});
export default ProductSlider;
