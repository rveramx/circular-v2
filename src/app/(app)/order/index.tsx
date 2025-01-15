import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Colors } from '@/utils/Constants';

export default function OrderScreen() {
  const [activeTab, setActiveTab] = useState('active');

  const renderTabContent = () => {
    if (activeTab === 'active') {
      return (
        <View style={styles.tabContent}>
          <Text style={styles.tabTitle}>Pedidos en curso</Text>
          {/* Aquí irá la lista de pedidos activos */}
        </View>
      );
    } else if (activeTab === 'completed') {
      return (
        <View style={styles.tabContent}>
          <Text style={styles.tabTitle}>Pedidos exitosos</Text>
          {/* Aquí irá la lista de pedidos completados */}
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Mis Pedidos</Text>

      {/* Contenedor de las pestañas */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'active' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('active')}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'active' && styles.activeTabButtonText,
            ]}
          >
            Pedidos en curso
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'completed' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('completed')}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'completed' && styles.activeTabButtonText,
            ]}
          >
            Pedidos exitosos
          </Text>
        </TouchableOpacity>
      </View>

      {/* Contenido de la pestaña activa */}
      {renderTabContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.primary,
  },
  tabButtonText: {
    fontSize: 16,
    color: '#888',
  },
  activeTabButtonText: {
    color: Colors.primary, 
    fontWeight: 'bold',
  },
  tabContent: {
    flex: 1,
    padding: 16,
  },
  tabTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
