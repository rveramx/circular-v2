import { View, StyleSheet, Image, Animated, Easing } from 'react-native'
import React, { FC, useMemo, useEffect } from 'react'
import { imageData } from '../../utils/dummyData';
import { screenWidth } from '../../utils/Scaling';

const ProductSlider = () => {
    const scrollX = useMemo(() => new Animated.Value(0), []);

    const rows = useMemo(() => {
        const result = [];
        for (let i = 0; i < imageData.length; i += 4) {
            result.push(imageData.slice(i, i + 4))
        }
        return result
    }, [])

    useEffect(() => {
        const startAnimation = () => {
            scrollX.setValue(0);
            Animated.loop(
                Animated.timing(scrollX, {
                    toValue: -screenWidth * 2,
                    duration: 30000,
                    useNativeDriver: true,
                    easing: Easing.linear
                })
            ).start();
        };

        startAnimation();
        return () => {
            scrollX.stopAnimation();
        };
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.viewportContainer} pointerEvents='none'>
                <Animated.View 
                    style={[
                        styles.gridContainer,
                        {
                            transform: [{
                                translateX: scrollX.interpolate({
                                    inputRange: [-screenWidth * 2, 0],
                                    outputRange: [0, -screenWidth * 2],
                                })
                            }]
                        }
                    ]}
                >
                    <View style={styles.gridContent}>
                        {rows?.map((row: any, rowIndex: number) => (
                            <MemoizedRow key={`first-${rowIndex}`} row={row} rowIndex={rowIndex} />
                        ))}
                    </View>
                    <View style={styles.gridContent}>
                        {rows?.map((row: any, rowIndex: number) => (
                            <MemoizedRow key={`second-${rowIndex}`} row={row} rowIndex={rowIndex} />
                        ))}
                    </View>
                    <View style={styles.gridContent}>
                        {rows?.map((row: any, rowIndex: number) => (
                            <MemoizedRow key={`third-${rowIndex}`} row={row} rowIndex={rowIndex} />
                        ))}
                    </View>
                </Animated.View>
            </View>
        </View>
    )
}


const Row: FC<{ row: typeof imageData; rowIndex: number }> = ({ row, rowIndex }) => {
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
                                marginHorizontal: screenWidth * 0.01
                            }
                        ]}
                    >
                        <Image source={image} style={styles.image} />
                    </View>
                )
            })}
        </View>
    )
}

const MemoizedRow = React.memo(Row)



const styles = StyleSheet.create({
    container: {
        height: screenWidth * 1.2,
        width: '100%',
    },
    viewportContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        paddingTop: 50,
    },
    itemContainer: {
        width: screenWidth * 0.23,
        height: screenWidth * 0.28,
        backgroundColor: '#e9f7f8',
        justifyContent: 'center',
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 12,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
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
        width: screenWidth * 0.98,
        alignSelf: 'center',
    }
})
export default ProductSlider