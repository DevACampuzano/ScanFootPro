/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ActivityIndicator, View} from 'react-native';
import DashBoardHome from '../screens/DashBoard/DashBoardHome';

export type StackDashBoard = {
  DashBoar: any;
};

const Stack = createNativeStackNavigator<StackDashBoard>();

const StackDashBoard = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="DashBoar"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="DashBoar" component={DashBoardHome} />
      </Stack.Navigator>
    </>
  );
};

export default StackDashBoard;
