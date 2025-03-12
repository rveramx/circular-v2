import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack 
        screenOptions={{
          animation: 'slide_from_right',
          statusBarStyle: 'dark',
          statusBarAnimation: 'fade',
          statusBarBackgroundColor: '#fff'
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'start',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(app)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}
