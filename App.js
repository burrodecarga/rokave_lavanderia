import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import {Provider} from 'react-redux'
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
    <View style={styles.container}>
      <View style={{ height:30 }}/>
      <HomeScreen/>
      <StatusBar style="auto" />
    </View>
    </Provider>
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});
