import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { AsyncStorage, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { RoundButton } from '../components/Button';

export default function TissScreen() {
  const [uri, setUri] = useState('');
  const [isFirstTime, setFirstTime] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [canGoBack, setGoBack] = useState(false);

  const webRef = useRef();

  const _onNavigationStateChange = webViewState => {
    const isOnSite = webViewState.url.includes(
      'https://tiss.tuwien.ac.at/education/favorites.xhtml'
    );
    if (isOnSite) {
      setGoBack(false);
    } else {
      setGoBack(true);
    }
  };

  useEffect(() => {
    if (isFirstTime) {
      AsyncStorage.getItem('bookmarklink')
        .then(link => {
          setFirstTime(false);

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
          console.log(isLoaded);
        })
        .catch(err => {
          console.log(err);
        });
    }
  });

  if (isLoaded)
    return (
      <View style={{ flex: 1 }}>
        <WebView
          style={{ backgroundColor: '#006699' }}
          ref={webRef}
          originWhitelist="*"
          source={{
            uri: uri
          }}
          onNavigationStateChange={_onNavigationStateChange}
        />
        <View style={canGoBack && isLoaded ? { opacity: 1 } : { opacity: 0 }}>
          <RoundButton
            onPress={() => {
              webRef.current.goBack();
            }}
          />
        </View>
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
