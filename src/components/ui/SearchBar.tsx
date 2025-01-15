import { View, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../utils/Constants';

interface SearchBarProps {
  placeholder?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  iconSize?: number;
  iconColor?: string;
  backgroundColor?: string;
  onChangeText?: (text: string) => void;
  value?: string;
}

const SearchBar = ({
  placeholder = "Buscar",
  containerStyle,
  inputStyle,
  iconSize = 20,
  iconColor = Colors.primary,
  backgroundColor = '#EBEAEB',
  onChangeText,
  value,
}: SearchBarProps) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={[styles.searchContainer, containerStyle]}>
      <View style={styles.searchSection}>
        <View style={[styles.searchField, { backgroundColor }]}>
          <Ionicons 
            name="search" 
            size={iconSize} 
            color={iconColor} 
            style={styles.searchIcon}
          />
          <TextInput 
            style={[styles.input, inputStyle]}
            placeholder={placeholder}
            placeholderTextColor={Colors.medium}
            onChangeText={onChangeText}
            value={value}
          />
        </View>
      </View>
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: '4%',
    paddingVertical: 15,
    backgroundColor: '#fff',
    width: '100%',
  },
  searchSection: {
    backgroundColor: '#fff',
    width: '100%',
  },
  searchField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    height: 50,
    paddingHorizontal: 15,
    width: '100%',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 6,
  },
});

export default SearchBar; 