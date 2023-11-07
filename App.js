import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { NavigationContainer} from '@react-navigation/native';
import HomeStack from './Navigation/Stack';



export default function App() {
  
  return (
    <NavigationContainer>
        <HomeStack />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
