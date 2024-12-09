import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ThemeProvider } from '../context/ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Home',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="details/[id]"
          options={{
            title: 'Details',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="profile/[userId]"
          options={{
            title: 'Profile',
            headerShown: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
