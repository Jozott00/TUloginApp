import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage,
  KeyboardAvoidingView,
  Platform,
  Linking
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
    value == null ? '' : value;

    return value;
  };

  const storeData = async props => {
    try {
      await AsyncStorage.setItem('bookmarklink', inputValue);
      await AsyncStorage.setItem('reloadTuwel', JSON.stringify(true));
      await AsyncStorage.setItem('reloadTiss', JSON.stringify(true));
      setErrorMsg('');
      setSuccessMsg('Bookmark wurde gespeichert!');
      // props.navigation.navigate('TuwelScreen', { isFirstLoad: true });
      return 'success';
    } catch (err) {
      setSuccessMsg('');
      setErrorMsg('Beim speichern ist etwas schiefgelaufen!');
    }
  };

  if (Platform.OS == 'ios') {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={{ color: 'red' }}>{errorMsg}</Text>
        <Text style={{ color: 'green', marginBottom: 20 }}>{successMsg}</Text>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>
          Dein Bookmarklink
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setInputValue}
          value={inputValue}
        />
        <Button color="#006699" title="Speichern" onPress={storeData} />
      </KeyboardAvoidingView>
    );
  } else {
    return [
      <View behavior="padding" style={styles.container}>
        <Text style={{ color: 'red' }}>{errorMsg}</Text>
        <Text style={{ color: 'green', marginBottom: 20 }}>{successMsg}</Text>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>
          Dein Bookmarklink
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setInputValue}
          value={inputValue}
        />
        <Button color="#006699" title="Speichern" onPress={storeData} />
      </View>,
      <View
        style={{
          position: 'relative',
          alignItems: 'flex-end',
          paddingBottom: 20,
          paddingRight: 20
        }}
      >
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://tuwel-264520.appspot.com/impressum')
          }
        >
          <Text style={{ color: '#006699' }}>Impressum</Text>
        </TouchableOpacity>
      </View>
    ];
  }
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
    width: '80%',
    marginBottom: 20
  }
});
