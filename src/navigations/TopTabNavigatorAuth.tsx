import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Login from '../screens/Auth/login';
import Register from '../screens/Auth/register';

export type RootTopTabParams = {
  login: any;
  register: any;
};

const Tab = createMaterialTopTabNavigator<RootTopTabParams>();

function TopTabNavigatorAuth({GoToDashBoard}: any) {
  console.log(GoToDashBoard)
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: '#364989',
        tabBarLabelStyle: {fontSize: 12, fontWeight: 'bold'},
        tabBarPressColor: 'transparent', 
        tabBarIndicatorStyle: {backgroundColor: '#364989'},
        tabBarStyle: {backgroundColor: 'transparent', elevation: 0},
      }}>
      <Tab.Screen
        name="login"
        component={Login}
        options={{tabBarLabel: 'Inicia sesión'}}
        initialParams={{ GoToDashBoard: GoToDashBoard }}
      />
      <Tab.Screen
        name="register"
        component={Register}
        options={{tabBarLabel: 'Registro'}}
      />
    </Tab.Navigator>
  );
}
export default TopTabNavigatorAuth;