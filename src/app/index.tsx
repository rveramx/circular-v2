import { Link } from 'expo-router';
import { StyleSheet, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../context/ThemeContext';

export default function Home() {
  const mockDetailsId = 'mock-details-123';
  const mockUserId = 'mock-user-456';

  const { theme, toggleTheme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Welcome to circular v2!</Text>
      <Link href={`/details/${mockDetailsId}`} asChild>
        <Button title="Go to Details" />
      </Link>
      <Link href={`/profile/${mockUserId}`} asChild>
        <Button title="View Profile" />
      </Link>
      <Button title="Toggle Theme" onPress={() => toggleTheme()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textTransform: 'capitalize',
  },
});
