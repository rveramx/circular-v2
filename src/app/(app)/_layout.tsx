import { Tabs } from 'expo-router';
import { Colors } from '../../utils/Constants';
import { FontAwesome6 } from '@expo/vector-icons';
import { View } from 'react-native';
//import { AuthProvider } from '../context/AuthContext';

const TabIcon = ({ color, focused, name }: { color: string; focused: boolean; name: string }) => (
  <View
    style={{
      backgroundColor: focused ? Colors.primary : 'transparent',
      borderRadius: 25,
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <FontAwesome6 color={focused ? 'white' : color} name={name} size={25} solid />
  </View>
);

export default function AppLayout() {
  return (
    //<AuthProvider>
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: '9%',
          width: '92%',
          position: 'absolute',
          marginBottom: '5%',
          marginStart: '4%',
          borderRadius: 40,
          backgroundColor: '#000000',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        },
        tabBarItemStyle: {
          marginBottom: 30,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: '',
          tabBarIcon: (props) => <TabIcon {...props} name="house" />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="basket"
        options={{
          tabBarLabel: '',
          tabBarIcon: (props) => <TabIcon {...props} name="cart-shopping" />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          tabBarLabel: '',
          tabBarIcon: (props) => <TabIcon {...props} name="file-text" />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: '',
          tabBarIcon: (props) => <TabIcon {...props} name="user" />,
          headerShown: false,
        }}
      />
    </Tabs>
    //</AuthProvider>
  );
}
