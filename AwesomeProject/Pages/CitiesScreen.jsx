import * as React from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView } from 'react-native';
import { SegmentedButtons, Text } from 'react-native-paper';
import CitiesDataTableComponent from '../Components/CitiesDataTableComponent';
import axios from 'axios';
import { BASE_URL } from '@env';

const CitiesScreen = () => {
  const [allCities, setAllCities] = React.useState([]);
  React.useEffect(() => {
    getAllCities();
  }, []);

  const [sampleCities, setSampleCities] = React.useState([]);

  const [maxCity, setMaxCity] = React.useState([]);

  const [minCity, setMinCity] = React.useState([]);

  const [value, setValue] = React.useState(0);

  const handleClick = (_value) => {
    setValue(_value);
    if (_value === 0) {
      getAllCities();
    } else if (_value === 1) {
      getSample();
    } else if (_value === 2) {
      getCalculate();
    }
  };

  function getAllCities() {
    axios
      .get(`${BASE_URL}api/Cities/get-cities`)
      .then((r) => {
        console.log(r);
        setAllCities(r.data);
      })
      .catch((err) => console.log(err));
  }

  function getSample() {
    axios
      .get(`${BASE_URL}api/Cities/get-sample-cities`)
      .then((r) => {
        console.log(r);
        setSampleCities(r.data);
      })
      .catch((err) => console.log(err));
  }

  function getCalculate() {
    axios
      .get(`${BASE_URL}api/Cities/get-min-max-distance`)
      .then((r) => {
        console.log(r);
        setMaxCity([r.data.max]);
        setMinCity([r.data.min]);
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <SegmentedButtons
            value={value}
            onValueChange={handleClick}
            buttons={[
              {
                value: 0,
                label: 'Всі',
              },
              {
                value: 1,
                label: 'Вибірка',
              },
              { value: 2, label: 'Обчислення' },
            ]}
          />
        </SafeAreaView>
        <View>
          {value === 0 ? (
            <>
              <CitiesDataTableComponent items={allCities} />
            </>
          ) : value === 1 ? (
            <>
              <Text style={styles.text}>
                Показати міста з населенням більше 500 тис. та які ближче 500 км від Києва
              </Text>
              <CitiesDataTableComponent items={sampleCities} />
            </>
          ) : (
            <>
              <Text style={styles.text}>Максимальна та мінімальна відстань від Києва</Text>
              <Text style={{ marginLeft: 10 }}>Максимальна:</Text>
              <CitiesDataTableComponent items={maxCity} />
              <Text style={{ marginLeft: 10, marginTop: 20 }}>Мінімальна:</Text>
              <CitiesDataTableComponent items={minCity} />
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
    margin: 20,
  },
  text: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
    borderWidth: 3,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
});

export default CitiesScreen;
