/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {ActivityIndicator, View} from 'react-native';
import HomeScreen from '../screens/Auth/Home/HomeScreen';
import AuthScreen from '../screens/Auth/AuthDashBoardScreen';
import DrawerDashBoard from './DrawerDashBoard';

export type RootStackParams = {
  Auth: any;
  Home: any;
  DashBoard: any;
};

const Stack = createNativeStackNavigator<RootStackParams>();

const AppNavigator = () => { 
  return (
    <>
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
