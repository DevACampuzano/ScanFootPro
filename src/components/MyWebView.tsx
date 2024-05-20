import React from 'react';
import {WebView} from 'react-native-webview';
import {WindowSize} from '../theme/Styles';
import {ActivityIndicator, View} from 'react-native';

const MyWebView = () => {
  return (
    <WebView
      source={{uri: 'https://www.npmjs.com/package/react-native-webview'}}
      // source={{uri: 'https://3-d-eta.vercel.app/'}}
      style={{
        borderWidth: 1,
        width: WindowSize.width,
        height: '100%',
        position: 'absolute',
        zIndex: 1,
        top: 0,
      }}
      cacheEnabled={true}
      startInLoadingState={true}
      renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
    />
  );
};

export default MyWebView;
