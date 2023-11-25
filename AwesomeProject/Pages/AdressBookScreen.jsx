import * as React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import ContactsDataTableComponent from '../Components/ContactsDataTableComponent';
import { BASE_URL } from '@env';
import axios from 'axios';

const AddressBook = () => {
  const [value, setValue] = React.useState(0);

  const [contacts, setContacts] = React.useState([]);

  const [sampleContacts, setSampleContacts] = React.useState([]);

  React.useEffect(() => {
    getAllContacts();
  }, []);

  const handleClick = (_value) => {
    setValue(_value);
    if (_value === 0) {
      getAllContacts();
    } else {
      getSampleContacts();
    }
  };

  function getAllContacts() {
    axios
      .get(`${BASE_URL}api/Contacts/get-contacts`)
      .then((r) => {
        console.log(r);
        setContacts(r.data);
      })
      .catch((err) => console.log(err));
  }

  function getSampleContacts() {
    axios
      .get(`${BASE_URL}api/Contacts/get-sample-contacts`)
      .then((r) => {
        console.log(r);
        setSampleContacts(r.data);
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
            ]}
          />
        </SafeAreaView>
        <View>
          {value === 0 ? (
            <>
              <ContactsDataTableComponent items={contacts} />
            </>
          ) : (
            <>
              <Text style={styles.text}>
                Контакти, у яких електронна пошта не закінчується на @knu.ua
              </Text>
              <ContactsDataTableComponent items={sampleContacts} />
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

export default AddressBook;
