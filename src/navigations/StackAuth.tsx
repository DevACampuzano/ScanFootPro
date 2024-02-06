/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {ActivityIndicator, View} from 'react-native';
import HomeScreen from '../screens/Auth/Home/HomeScreen';
import AuthScreen from '../screens/Auth/AuthDashBoardScreen';
import DrawerDashBoard from './DrawerDashBoard';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';


export type RootStackParams = {
  Auth: any;
  Home: any;
  DashBoard: any;
};

const Stack = createNativeStackNavigator<RootStackParams>();

const AppNavigator = () => { 
  const {isLoading, setIsLoading} = useContext(AppContext)
  console.log('leybner',isLoading);
  
  return (
    <>
    {isLoading && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    backgroundColor: '#0000003b',
                    zIndex: 1,
                    height: '100%',
                    width: '100%',
                  }}>
                  <ActivityIndicator size={60} color="#364989" />
                </View>
              )} 
      <Stack.Navigator
       screenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="DashBoard" component={DrawerDashBoard} />
      </Stack.Navigator>
    </> 
  );
};

export default AppNavigator;
