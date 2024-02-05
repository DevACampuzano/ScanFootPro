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

interface Props extends NativeStackScreenProps<RootStackParams, 'Auth'> {}
const AuthScreen = ({navigation}: Props) => {
  const translateX = useSharedValue(-100);

  useEffect(() => {
    translateX.value = withTiming(0, {duration: 100});
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
   
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.container}>
        <Animated.View style={[styles.containerAuth, animatedStyles]}>
          <Text style={styles.title}>Bienvenido</Text>
        </Animated.View>
        <TopTabNavigatorAuth GoToDashBoard={GoToDashBoard}/>
      </View>
    </>
  );
};

export default AuthScreen;
