import {
  View,
  Text,
  Image,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Butukon from '../../../components/Butukon';
import styles from './Styles';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {RootTopTabParams} from '../../../navigations/TopTabNavigatorAuth';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import useForm from '../../../hooks/useForm';
import {DismissKeyboard} from '../../../components/DismissKeyboard';
import {InputText} from '../../../components/InputText';
import { useContext } from 'react';
import { AppContext } from '../../../contexts/AppContext';
import useAuth from '../../../hooks/useAuth';
import Toast from 'react-native-toast-message';

interface Props extends MaterialTopTabScreenProps<RootTopTabParams, 'login'> {}

const Register = ({navigation}: Props) => {
  const {signup} = useAuth()
  const {setIsLoading} = useContext(AppContext)
  const {form, onChange, resetForm} = useForm({
    name: '',
    email: '',
    password: '',
  });
  console.log(form);
  const height = useSharedValue(380);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      justifyContent: 'space-around',
      width: '100%',
      alignItems: 'center',
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
  const goLogin = () => {
    navigation.navigate('login')
  }
  
  return (
    <DismissKeyboard>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../../../assets/img/fondo1.3(Photoshop).png')}
          style={{
            position: 'absolute',
            top: -0,
            opacity: 0.1,
            width: '100%',
            height: '110%',
          }}
        />
        <Animated.View style={animatedStyle}>
          <InputText
            onchageText={e => onChange(e, 'name')}
            name="Nombre"
            color="#364989"
            IconName='person-outline'
            value={form.name}
          />
          <InputText
            onchageText={e => onChange(e, 'email')}
            name="Correo"
            Type="Email"
            color="#364989"
            value={form.email}
          />
          <InputText
            onchageText={e => onChange(e, 'password')}
            name="Contraseña"
            IconName="mail-outline"
            Type="Password"
            color="#364989"
            value={form.password}
          />
          <Text style={{
            color: '#000',
            textAlign: 'left',
            // backgroundColor: 'red',
            width: '80%'
          }}>-La contraseña debe de ser minimo de 8 caracteres</Text>
          <Text style={{
            color: '#000',
            textAlign: 'left',
            // backgroundColor: 'red',
            width: '80%'
          }}>-Al menos una mayuscula</Text>
          <Text style={{
            color: '#000',
            textAlign: 'left',
            // backgroundColor: 'red',
            width: '80%'
          }}>-Al menos 1 numero</Text>

          <Butukon
            title="Crear cuenta"
            height={60}
            border={20}
            onclick={() => signup(form, goLogin)}
          />
          <View style={styles.sectionBotton}>
            <Text style={styles.parrafo}>¿Ya tienes una cuenta?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('login')}
              activeOpacity={0.9}>
              <Text style={{...styles.parrafo, color: '#000'}}>
                Inicia sesión
              </Text>
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
{/*         
          <Butukon
            title="Continua con Google"
            height={60}
            border={20}
            onclick={() => console.log('helllo desde Gogkle')}
            icon="logo-google"
          /> */}
        </View>
      </ScrollView>
    </DismissKeyboard>
  );
};

export default Register;
