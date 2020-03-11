import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { AsyncStorage, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { RoundButton } from '../components/Button';

export default function TuwelScreen(props) {
  // const isFirstTimeParam = props.navigation.getParam('isFirstLoad', true);

  const [uri, setUri] = useState('');
  const [isFirstTime, setFirstTime] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [canGoBack, setGoBack] = useState(false);

  const webRef = useRef();

  const _onNavigationStateChange = webViewState => {
    if (webViewState.url == 'https://tuwel.tuwien.ac.at/my/') {
      setGoBack(false);
    } else {
      setGoBack(true);
      console.log(webViewState.url);
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

          const url = link + '?app=36';
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
          originWhitelist="*"
          source={{
            uri: uri
          }}
          ref={webRef}
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
