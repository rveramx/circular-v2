import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';


export default function LoginLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ animation: 'slide_from_right'}}>
        <Stack.Screen
            name="index"
            options={{
            headerShown: false,
            }}
        />
        <Stack.Screen
            name="CodeConfirmation"
            options={{
            headerShown: false,
            }}
        />
        <Stack.Screen
            name="PersonalData"
            options={{
            headerShown: false,
            gestureEnabled: false,
            statusBarStyle: 'dark'
            }}
        />
      </Stack>
    </>
  );
}
