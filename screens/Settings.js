import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage
} from 'react-native';

export default function Settings() {
  const [inputValue, setInputValue] = useState(retrieveData);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isFirstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (isFirstLoad) {
      retrieveData()
        .then(data => {
          setInputValue(data);
          setFirstLoad(false);
        })
        .catch(err => {
          console.log(err);
        });
    }
  });

  const retrieveData = async () => {
    const value = await AsyncStorage.getItem('bookmarklink');
    console.log(value);
    value == null ? '' : value;

    return value;
  };

  const storeData = async props => {
    try {
      await AsyncStorage.setItem('bookmarklink', inputValue);
      setErrorMsg('');
      setSuccessMsg('Bookmark wurde gespeichert!');
      // props.navigation.navigate('TuwelScreen', { isFirstLoad: true });
      return 'success';
    } catch (err) {
      setSuccessMsg('');
      setErrorMsg('Beim speichern ist etwas schiefgelaufen!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: 'red' }}>{errorMsg}</Text>
      <Text style={{ color: 'green', marginBottom: 20 }}>{successMsg}</Text>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Dein Bookmarklink</Text>
      <TextInput
        style={styles.input}
        onChangeText={setInputValue}
        value={inputValue}
      />
      <Button title="Speichern" onPress={storeData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    borderRadius: 20,
    borderColor: 'gray',
    borderWidth: 2,
    padding: 10,
    width: '80%'
  }
});
