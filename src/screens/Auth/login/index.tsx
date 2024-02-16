import {View, Text, TouchableOpacity, Image, Keyboard, ToastAndroid, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './Styles';
import {InputText} from '../../../components/InputText';
import {DismissKeyboard} from '../../../components/DismissKeyboard';
import Butukon from '../../../components/Butukon';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {RootTopTabParams} from '../../../navigations/TopTabNavigatorAuth';
import useForm from '../../../hooks/useForm';
import useAuth from '../../../hooks/useAuth';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

interface Props extends MaterialTopTabScreenProps<RootTopTabParams, 'login'> {}

const Login = ({route, navigation}: Props) => {
  const {GoToDashBoard} = route.params;
  const {form, onChange, resetForm} = useForm({
    email: 'keynerDElahoz@gmail.com',
    password: '123456789Ko',
  });
  console.log(form);
  const {signIn, getLocal} = useAuth();
  const height = useSharedValue(380);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      justifyContent: 'space-around',
      width: '100%',
      alignItems: 'center',
      // backgroundColor: 'red',
      height: height.value,
    };
  });
  Keyboard.addListener('keyboardDidShow', () => {
    animateHeight(280);
  });
  Keyboard.addListener('keyboardDidHide', () => {
    animateHeight(380);
  });
  const animateHeight = (x: any) => {
    height.value = withTiming(x, {duration: 100});
  };
  const Todash = () => {
    GoToDashBoard()
  }

  return (
    <DismissKeyboard>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../../../assets/img/pie.png')}
          style={{
            position: 'absolute',
            top: -110,
            opacity: 0.3,
            width: '100%',
            height: 500,
          }}
        />
        <Animated.View style={animatedStyle}>
          <InputText
            onchageText={e => onChange(e, 'email')}
            name="Email"
            Type="Email"
            color="#364989"
            value={form.email}
          />
          <InputText
            onchageText={e => onChange(e, 'password')}
            name="Password"
            IconName="mail-outline"
            Type="Password"
            color="#364989"
            value={form.password}
          />
          <TouchableOpacity activeOpacity={0.9} onPress={() => ToastAndroid.show('Apartado en fase de desarrollo', ToastAndroid.SHORT)}>
            <Text style={{color: '#000'}}>¿Olvidaste la contraseña?</Text>
          </TouchableOpacity>
          <Butukon
            title="Inicia sesión"
            height={60}
            border={20}
            onclick={() => signIn(form, Todash)}
          />
           <View style={styles.sectionBotton}>
            <Text style={styles.parrafo}>¿Necesitas una cuenta?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('register')}
              activeOpacity={0.9}>
              <Text style={{...styles.parrafo, color: '#000'}}>Registrate</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'red',
            width: '100%',
            alignItems: 'center',
            gap: 20,
          }}>
          <Text
            style={{
              color: '#000',
              fontWeight: 'bold',
            }}>
            O inicia sesión con:
          </Text>
          <Butukon
            title="Inicia sessión"
            height={60}
            border={20}
            onclick={() => {
              console.log('llega aki el local')
            }}
            icon="logo-google"
          />
        </View>
      </ScrollView>
    </DismissKeyboard>
  );
};

export default Login;
