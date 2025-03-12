import { Stack } from 'expo-router';

export default function LoginLayout() {
  return (
    <>
      <Stack screenOptions={{ animation: 'slide_from_right' }}>
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
            statusBarBackgroundColor: '#F4EFF3',
          }}
        />
        <Stack.Screen
          name="PersonalData"
          options={{
            headerShown: false,
            gestureEnabled: false,
            statusBarBackgroundColor: '#F4EFF3',
          }}
        />
      </Stack>
    </>
  );
}
