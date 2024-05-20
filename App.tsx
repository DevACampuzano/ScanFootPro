/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {StatusBar, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AnimatedSplash from 'react-native-animated-splash-screen';
import {PERMISSIONS, request, requestMultiple} from 'react-native-permissions';
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import AppNavigator from './src/navigations/StackAuth';
import {AppContextProvider} from './src/contexts/AppContext';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  const permissions = [
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.CAMERA,
    PERMISSIONS.ANDROID.RECORD_AUDIO,
  ];
  const toastConfig = {
    success: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
      <BaseToast
        {...props}
        style={{borderLeftColor: '#009DA6'}}
        contentContainerStyle={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: 14,
          fontWeight: '400',
        }}
      />
    ),
    error: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 14,
          fontWeight: '400',
        }}
        text2Style={{
          fontSize: 13,
          fontWeight: '400',
        }}
      />
    ),
  };

  useEffect(() => {
    requestMultiple(permissions)
      .then((result): any => {
        console.log('RESUL --> ', result);
        switch (result) {
          case 'granted':
            // El permiso ya ha sido otorgado
            break;
          case 'denied':
            // Solicita el permiso
            request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
            request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
            request(PERMISSIONS.ANDROID.CAMERA);
            request(PERMISSIONS.ANDROID.RECORD_AUDIO);

            break;
          case 'blocked':
            // Solicita el permiso
            request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
            request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

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
    }, 1000);
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
