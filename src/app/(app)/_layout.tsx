import { Tabs } from 'expo-router';
import { Colors } from '../../utils/Constants';
import { FontAwesome6 } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

const TAB_ICONS = {
  home: 'house',
  basket: 'cart-shopping',
  order: 'file-text',
  profile: 'user',
} as const;

const TabIcon = ({ color, focused, name }: { color: string; focused: boolean; name: string }) => (
  <View style={[styles.iconContainer, focused && styles.focusedIcon]}>
    <FontAwesome6 
      color={focused ? 'white' : color} 
      name={name} 
      size={25} 
      solid 
    />
  </View>
);

export default function AppLayout() {
  return (
    <Tabs screenOptions={{
      tabBarStyle: styles.tabBar,
      tabBarItemStyle: styles.tabBarItem,
      tabBarActiveTintColor: Colors.primary,
      tabBarHideOnKeyboard: true,
      headerShown: false,
      tabBarLabel: '',
    }}>
      {Object.entries(TAB_ICONS).map(([screen, icon]) => (
        <Tabs.Screen
          key={screen}
          name={screen}
          options={{
            tabBarIcon: (props) => <TabIcon {...props} name={icon} />,
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
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
  tabBarItem: {
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusedIcon: {
    backgroundColor: Colors.primary,
  },
});
