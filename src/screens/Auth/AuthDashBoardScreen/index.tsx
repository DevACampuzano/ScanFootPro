import React, {useEffect} from 'react';
import {TextInput, Button, View, Text, StatusBar, Image} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations/StackAuth';
import styles from './Styles';
import Butukon from '../../../components/Butukon';
import TopTabNavigatorAuth from '../../../navigations/TopTabNavigatorAuth';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

interface Props extends NativeStackScreenProps<RootStackParams, 'Auth'> {}
const AuthScreen = ({navigation}: Props) => {
  const translateX = useSharedValue(-100);

  useEffect(() => {
    translateX.value = withTiming(0, {duration: 100});
    const barra = async() => {
      try{
        const response = await changeNavigationBarColor('#364989');
        console.log(response)// {success: true}
    }catch(e){
        console.log(e)// {success: false}
    }
    }
    barra()
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    return {transform: [{translateX: translateX.value}]};
  });
  const GoToDashBoard = () => {
    navigation.reset({
       index: 0,
       routes: [{ name: 'DashBoard' }],
    });
   };
  const GoToForgotPassword = () => {
    navigation.navigate('ForgotPassword')
    console.log('GoToForgotPassword')
   };
   
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.container}>
        <Animated.View style={[styles.containerAuth, animatedStyles]}>
          <Text style={styles.title}>Bienvenido</Text>
        </Animated.View>
        <TopTabNavigatorAuth GoToDashBoard={GoToDashBoard} GoToForgotPassword={GoToForgotPassword}/>
      </View>
    </>
  );
};

export default AuthScreen;
