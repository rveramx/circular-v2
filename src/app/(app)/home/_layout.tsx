import { Stack } from 'expo-router';
import CustomHeader from '@/components/home/CustomHeader';

export default function HomeLayout() {

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
            header: () => <CustomHeader />,  
        }}
      />
      <Stack.Screen
        name="Store"
        options={{
          headerShown: true,
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="Product"
        options={{
          headerShown: true,
          animation: 'slide_from_right',
        }}
      />
    </Stack>
  );
}