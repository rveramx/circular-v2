import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const BasketScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Carrito de compras</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default BasketScreen;
