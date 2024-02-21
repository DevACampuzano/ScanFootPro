/* eslint-disable prettier/prettier */
import {View, Text, StatusBar, ActivityIndicator} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigations/StackAuth';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AnimatedSplash from 'react-native-animated-splash-screen';
import {LogBox} from 'react-native';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import {AppContextProvider} from './src/contexts/AppContext';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

type Props = {};

const App = (props: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  useEffect(() => {
    check(PERMISSIONS.ANDROID.CAMERA)
      .then(result => {
        switch (result) {
          case 'granted':
            // El permiso ya ha sido otorgado
            break;
          case 'denied':
            // Solicita el permiso
            request(PERMISSIONS.ANDROID.CAMERA);
            break;
          default:
            // El estado es 'blocked', 'limited' o 'undetermined'
            break;
        }
      })
      .catch(error => {
        // Ocurrió un error al comprobar el permiso
        console.log('Error al comprobar el permiso', error);
      });
    setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
  }, []);

  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: '#009DA6' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 14,
          fontWeight: '400'
        }}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 14,
          fontWeight: '400'
        }}
        text2Style={{
           fontSize: 13,
          fontWeight: '400'
        }}
      />
    ),
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <AnimatedSplash
        translucent={true}
        isLoaded={isLoaded}
        logoImage={require('./src/assets/img/SplashScreeen.png')}
        backgroundColor={'#effefd'}
        logoHeight={250}
        logoWidth={250}>
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer>
            <AppContextProvider>
                <AppNavigator />
            </AppContextProvider>
          </NavigationContainer>
        </GestureHandlerRootView>   
      </AnimatedSplash>
      <Toast config={toastConfig} />
    </>
  );
};

export default App;
 