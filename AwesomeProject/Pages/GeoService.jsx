import * as React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_KEY } from '@env';
import Geocoder from 'react-native-geocoding';
import axios from 'axios';
import { BASE_URL } from '@env';

Geocoder.init(GOOGLE_MAPS_KEY); // use a valid API key

const originInit = {
  latitude: 39.466667,
  longitude: -0.375,
};

const GeoserviceScreen = () => {
  const [selected, setSelected] = React.useState('');
  const [region, setRegion] = React.useState({
    latitude: 39.466667,
    longitude: -0.375,
    latitudeDelta: -100,
    longitudeDelta: -100,
  });
  const [origin, setOrigin] = React.useState(originInit);
  const [destination, setDestination] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      //alert(location.coords.latitude + ' ' + location.coords.longitude);
      /*setOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      */
    })();
  }, []);

  React.useEffect(() => {
    foundCityCoordinates();
  }, [selected]);

  function foundCityCoordinates() {
    if (selected !== '') {
      Geocoder.from(selected)
        .then((json) => {
          var location = json.results[0].geometry.location;
          setDestination({ latitude: location.lat, longitude: location.lng });
        })
        .catch((error) => alert('error'));
    }
  }
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${BASE_URL}api/Cities/get-cities-selectlist`)
      .then((r) => {
        console.log(r);
        setData(r.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <ScrollView>
        <Text style={styles.text}>
          Обчисліть і покажіть на карті маршрут від біжучого місця до обраного міста з БД.
        </Text>
        <View style={styles.selectList}>
          <SelectList setSelected={(val) => setSelected(val)} data={data} save="value" />
        </View>
      </ScrollView>
      <View style={styles.container}>
        <MapView style={styles.map}>
          {origin && (
            <Marker coordinate={{ latitude: origin.latitude, longitude: origin.longitude }} />
          )}
          {destination && (
            <Marker
              coordinate={destination}
              onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)}
            />
          )}
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_KEY}
            strokeWidth={3}
          />
        </MapView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 25,
    marginBottom: 20,
    textAlign: 'center',
    borderWidth: 3,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  selectList: {
    marginLeft: 30,
    marginRight: 40,
    marginTop: 20,
  },
  container: {
    marginTop: -30,
    flex: 20,
    padding: 40,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
export default GeoserviceScreen;
