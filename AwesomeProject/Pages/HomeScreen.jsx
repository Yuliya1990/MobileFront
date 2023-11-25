import * as React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View, Text } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <>
      <View style={styles.MainContainer}>
        <View
          style={[
            styles.container,
            {
              flexDirection: 'column',
            },
          ]}>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => navigation.navigate('CitiesScreen')}>
            <Text style={styles.buttonText}>Міста України</Text>
          </Button>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => navigation.navigate('AddressBook')}>
            <Text style={styles.buttonText}>Адресна книга</Text>
          </Button>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => navigation.navigate('GeoserviceScreen')}>
            <Text style={styles.buttonText}>Геосервіс</Text>
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    marginTop: -80,
    height: 150,
    width: 300,
    justifyContent: 'space-between',
  },
  button: {
    height: 60, // Установите высоту кнопок по вашему усмотрению
    marginVertical: 10, // Отступ между кнопками
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20, // Размер шрифта текста
  },
});

export default HomeScreen;
