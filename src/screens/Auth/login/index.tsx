import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
  ToastAndroid,
  ScrollView,
  Button,
} from 'react-native';
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
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props extends MaterialTopTabScreenProps<RootTopTabParams, 'login'> {}

const Login = ({route, navigation}: Props) => {
  const {GoToDashBoard, GoToForgotPassword} = route.params;
  const [userGoogle, setUserGoogle] = useState({});
  const {form, onChange, resetForm} = useForm({
    email: '',
    password: '',
  });
  // const {form, onChange, resetForm} = useForm({
  //   email: 'keyerdelahozsteam@gmail.com',
  //   password: '123456789Ko',
  // });
  console.log(form);
  const {signIn, getLocal, SigInGoolge} = useAuth();
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
    GoToDashBoard();
  };
  // useEffect(() => {
  //   GoogleSignin.configure({
  //     androidClientId: '558743903976-t4ttf9jgjjvc0g4g4cru8scjs277a2ho.apps.googleusercontent.com'
  //   });
  // }, [])

  // const signInGoogle = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();

  //     // Validar la información del usuario
  //     if (!userInfo || !userInfo.user) {
  //       console.error('No se pudo obtener la información del usuario');
  //       return;
  //     }

  //     // Aquí puedes realizar cualquier validación adicional que necesites
  //     // Por ejemplo, verificar que el usuario tenga un correo electrónico válido
  //     // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //     // if (!emailRegex.test(userInfo.user.email)) {
  //     //   console.error('Correo electrónico inválido');
  //     //   return;
  //     // }

  //     // Si todo está bien, guarda la información del usuario
  //     setUserGoogle({ userInfo });
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }
  // };

  return (
    <DismissKeyboard>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../../../assets/img/fondo1.2.jpg')}
          style={{
            position: 'absolute',
            top: -110,
            opacity: 0.3,
            width: '100%',
            height: 450,
          }}
        />
        <Animated.View style={animatedStyle}>
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
          {/* <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('')}>
            <Text style={{color: '#000'}}>¿Olvidaste la contraseña?</Text>
          </TouchableOpacity> */}
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
            title="Inicia sesión"
            height={60}
            border={20}
            onclick={() => SigInGoolge(Todash)}
            icon="logo-google"
          />
        </View>
      </ScrollView>
    </DismissKeyboard>
  );
};

export default Login;
