import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import {
  AsyncStorage,
  View,
  Text,
  Button,
  Platform,
  ActivityIndicator
} from 'react-native';
import { WebView } from 'react-native-webview';
import { RoundButton } from '../components/Button';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function TissScreen(props) {
  const [uri, setUri] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [canGoBack, setGoBack] = useState(false);

  const webRef = useRef();

  const _onNavigationStateChange = webViewState => {
    const u = webViewState.url;
    // setUri(u);
    const includes1 = 'tuwel-264520';
    const is1 = 'https://tiss.tuwien.ac.at/';
    if (u == is1 || u.includes(includes1)) {
      setGoBack(false);
    } else {
      setGoBack(true);
    }
  };

  const _callWebsite = () => {
    AsyncStorage.getItem('bookmarklink')
      .then(link => {
        if (
          link == null ||
          !link.includes('http://tuwel-264520.appspot.com/bookmark/')
        ) {
          setUri('https://tuwel-264520.appspot.com/createbookmark');
          setIsLoaded(true);
          return console.log(uri);
        }
        const url = link + '?app=76';
        setUri(url);
        setIsLoaded(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useFocusEffect(() => {
    try {
      AsyncStorage.getItem('reloadTiss').then(r => {
        const reload = JSON.parse(r);
        if (reload == true) {
          _callWebsite();
          AsyncStorage.setItem('reloadTiss', JSON.stringify(false));
        }
      });
    } catch (err) {
      console.log(err);
    }
  });

  useEffect(() => {
    _callWebsite();
  });

  let button;
  if (Platform.OS == 'ios') {
    button = (
      <View
        style={[
          canGoBack && isLoaded
            ? { opacity: 1, zIndex: 4 }
            : { opacity: 0, zIndex: -2 }
        ]}
      >
        <RoundButton
          name="chevron-left"
          onPress={() => {
            webRef.current.goBack();
          }}
        />
      </View>
    );
  } else {
    button = (
      <View
        style={[
          canGoBack && isLoaded
            ? { opacity: 1, zIndex: 4 }
            : { opacity: 0, zIndex: -2 },
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            position: 'absolute',
            bottom: 20,
            paddingHorizontal: 20
          }
        ]}
      >
        <RoundButton
          name="chevron-left"
          onPress={() => {
            webRef.current.goBack();
          }}
        />
        <RoundButton
          name="reload"
          onPress={() => {
            setUri('https://tuwel-264520.appspot.com/');
          }}
        />
      </View>
    );
  }

  if (isLoaded)
    return (
      <View style={{ flex: 1 }}>
        <WebView
          onLoad={() => setIsLoading(false)}
          onLoadStart={() => setIsLoading(true)}
          style={{ backgroundColor: '#006699' }}
          ref={webRef}
          originWhitelist="*"
          source={{
            uri: uri
          }}
          onNavigationStateChange={_onNavigationStateChange}
        />
        {button}
        {isLoading && (
          <ActivityIndicator
            style={{
              flex: 1,
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            size="large"
          />
        )}
      </View>
    );
  else
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#006699'
        }}
      >
        <Text style={{ color: 'white' }}>Wird geladen ...</Text>
      </View>
    );
}
