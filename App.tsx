/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigations/StackAuth';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AnimatedSplash from 'react-native-animated-splash-screen';

type Props = {};

const App = (props: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simula un tiempo de carga
    setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
  }, []);

  return (
    <>
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
