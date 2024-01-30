/* eslint-disable prettier/prettier */
import {View, Text, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigations/StackAuth';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AnimatedSplash from 'react-native-animated-splash-screen';
import {LogBox} from 'react-native';
import {check, PERMISSIONS, request} from 'react-native-permissions';

type Props = {};

const App = (props: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  useEffect(() => {
    // Simula un tiempo de carga
    setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
  }, []);
  useEffect(() => {
    // Comprueba si ya se ha otorgado el permiso
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
  }, []);
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
        logoImage={require('./src/assets/img/san_Roman.png')}
        backgroundColor={'#effefd'}
        logoHeight={150}
        logoWidth={150}>
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </GestureHandlerRootView>
      </AnimatedSplash>
    </>
  );
};

export default App;
