import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Platform,
  StatusBar,
} from 'react-native';
import { Feather as FeatherIcon, FontAwesome6,MaterialCommunityIcons } from '@expo/vector-icons'
//import { useAuth } from '../../context/AuthContext';
//import auth from '@react-native-firebase/auth';
//import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProfileScreen = () => {
  //const { signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const menuItems = [
    {
      id: 1,
      icon: 'account-edit' as const,
      title: 'Editar Perfil',
      type: 'link',
      onPress: () => console.log('Editar perfil'),
    },
    {
      id: 2,
      icon: 'bell-outline' as const,
      title: 'Notificaciones',
      type: 'link',
      onPress: () => console.log('Notificaciones'),
    },
    {
      id: 4,
      icon: 'help-circle-outline' as const,
      title: 'Ayuda y Soporte',
      type: 'link',
      onPress: () => console.log('Ayuda'),
    },
  ];

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');


  {/*
  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      setUserEmail(currentUser.email);
      setPhotoURL(currentUser.photoURL);
      
      const getUserData = async () => {
        try {
          const userDoc = await firestore()
            .collection('users')
            .doc(currentUser.uid)
            .get();
          
          if (userDoc.exists) {
            const userData = userDoc.data();
            setFirstName(userData?.firstName || '');
            setLastName(userData?.lastName || '');
          } else {
            setFirstName('Usuario');
            setLastName('');
          }
        } catch (error) {
          setFirstName('Usuario');
          setLastName('');
        }
      };
      
      getUserData();
    }
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      // Limpiar AsyncStorage
      await AsyncStorage.multiRemove([
        'userToken',
        'userData',
        'locationDeniedInHome'
      ]);
      
      // Cerrar sesión en Firebase
      await auth().signOut();
      
      // Actualizar el contexto de autenticación
      await signOut();
      
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert(
        'Error',
        'Hubo un problema al cerrar la sesión. Por favor, intenta de nuevo.'
      );
    } finally {
      setIsLoading(false);
    }
  };
*/}

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Perfil Info */}
          <View style={styles.profileSection}>
            <Image
              alt=""
              source={{ uri: photoURL || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{`${firstName} ${lastName}`.trim() || 'Usuario'}</Text>
              
              <View style={styles.completeProfileContainer}>
                <Text style={styles.completeProfileText}>Completar perfil</Text>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View style={styles.progressSegmentsContainer}>
                      <View style={[styles.progressSegment, { backgroundColor: '#4CAF50' }]} />
                      <View style={styles.progressSegment} />
                      <View style={styles.progressSegment} />
                      <View style={styles.progressSegment} />
                    </View>
                  </View>
                  <View style={styles.progressTextContainer}>
                    <Text style={styles.progressText}>1 de 4</Text>
                    <TouchableOpacity>
                      <Text style={styles.continueText}>continuar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Separador */}
          <View style={styles.separator} />

          {/* Stats */}
          <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={styles.row}>
              <FeatherIcon name="shopping-bag" size={24} color="#000" style={styles.statIcon} />
              <Text style={styles.statNumber}>254</Text>
            </View>
            <Text style={styles.statLabel}>Pedidos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <View style={styles.row}>
              <FontAwesome6 name="dollar-sign" size={24} color="#28A739" style={styles.statIcon} />
              <Text style={styles.statNumber}>45</Text>
            </View>
            <Text style={styles.statLabel}>dinero ahorrado</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <View style={styles.row}>
              <MaterialCommunityIcons Icons name="food" size={24} color="#000" style={styles.statIcon} />
              <Text style={styles.statNumber}>92 kg</Text>
            </View>
            <Text style={styles.statLabel}>comida salvada</Text>
          </View>
          </View>


          {/* Separador */}
          <View style={styles.separator} />

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={item.onPress}>
                  <View style={styles.menuItemLeft}>
                    <MaterialCommunityIcons name={item.icon} size={24} color="#404040" />
                    <Text style={styles.menuItemText}>{item.title}</Text>
                  </View>
                  <FeatherIcon name="chevron-right" size={24} color="#CCCCCC" />
                </TouchableOpacity>
                {index < menuItems.length - 1 && (
                  <View style={styles.menuSeparatorContainer}>
                    <View style={styles.menuSeparator} />
                  </View>
                )}
              </React.Fragment>
            ))}
          </View>

          {/* Botón de Cerrar Sesión */}
          <View style={styles.logoutButtonContainer}> 
          <TouchableOpacity
            style={styles.logoutButtonFull}
            //onPress={handleLogout}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
            )}
          </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: '5%',
    backgroundColor: '#FFF',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: '3%',
  },
  profileInfo: {
    alignItems: 'center',
    width: '100%',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '2%',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: '5%',
    paddingHorizontal: '3%',
    backgroundColor: '#FFF',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center', 
    marginBottom: 5, 
  },
  statIcon: {
    marginBottom: 5,
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  statDivider: {
    width: 2,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 10,
  },
  menuContainer: {
    backgroundColor: '#FFF',
    paddingVertical: '2%',
  },
  menuSeparatorContainer: {
    width: '100%',
  },
  menuSeparator: {
    height: 1,
    backgroundColor: '#c5c5c5',
    width: '100%',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '4%',
    paddingHorizontal: '5%',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 15,
    marginLeft: 15,
    color: '#636363',
  },
  logoutButtonContainer: {
    alignItems: 'center',
    marginTop: '1%',
  },
  logoutButtonFull: {
    backgroundColor: '#FF3B30',
    width: '75%',
    padding: '3%',
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: '5%',
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: '#c5c5c5',
    width: '100%',
  },
  completeProfileContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginTop: '2%',
    width: '75%',
    borderWidth: 1,
    borderColor: '#c5c5c5',
  },
  completeProfileText: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500',
    marginBottom: 8,
  },
  progressContainer: {
    marginTop: '5%',
  },
  progressBar: {
    height: 4,
    backgroundColor: 'transparent',
    borderRadius: 2,
    marginBottom: 6,
    overflow: 'hidden',
  },
  progressSegmentsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 20,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
  },
  progressTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '5%'
  },
  progressText: {
    fontSize: 12,
    color: '#666666',
  },
  continueText: {
    fontSize: 12,
    color: '#007AFF',
    textDecorationLine: 'underline',
    marginHorizontal: '20%'
  },
});

export default ProfileScreen; 