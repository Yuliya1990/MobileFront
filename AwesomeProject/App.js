import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import HomeScreen from './Pages/HomeScreen';
import CitiesScreen from './Pages/CitiesScreen';
import GeoserviceScreen from './Pages/GeoService';
import AddressBook from './Pages/AdressBookScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="CitiesScreen"
            options={{ title: 'Міста України' }}
            component={CitiesScreen}
          />
          <Stack.Screen
            name="AddressBook"
            options={{ title: 'Адресна книга' }}
            component={AddressBook}
          />
          <Stack.Screen
            name="GeoserviceScreen"
            options={{ title: 'Геосервіс' }}
            component={GeoserviceScreen}
          />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}
