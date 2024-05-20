//import liraries
import React, {Component, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import styles from './Styles';
import Butukon from '../../../components/Butukon';
import {RootStackParams} from '../../../navigations/StackAuth';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {InputText} from '../../../components/InputText';
import BtnBack from '../../../components/BtnBack';
import {DismissKeyboard} from '../../../components/DismissKeyboard';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {AppContext} from '../../../contexts/AppContext';
import useAuth from '../../../hooks/useAuth';
import useForm from '../../../hooks/useForm';
import Toast from 'react-native-toast-message';
import {useApi} from '../../../hooks/useApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
interface Props
  extends NativeStackScreenProps<RootStackParams, 'ForgotPassword'> {}
const ForgotPassword = ({navigation, route}: Props) => {
  const {loadApi} = useApi();
  const {code, onChange, setForm, form} = useForm({
    code: '',
  });
  // const {Forgot} = useAuth()
  const {setIsLoading} = useContext(AppContext);
  const height = Dimensions.get('window').height;
  useEffect(() => {
    const barra = async () => {
      try {
        const response = await changeNavigationBarColor('#009DA6');
        console.log(response); // {success: true}
      } catch (e) {
        console.log(e); // {success: false}
      }
    };
    barra();
  }, []);
  const Forgot = async (data: any, next: any) => {
    console.log('sdcnd--', data);
    try {
      setIsLoading(true);
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (
        !emailRegex.test(data) ||
        data === '' ||
        data == null ||
        data == undefined
      ) {
        console.log('Correo electrónico inválido');
        Toast.show({
          type: 'error',
          text1: 'Correo electrónico inválido',
        });
        setIsLoading(false);
        return false;
      } else {
        try {
          const resp: any = await loadApi({
            endpoint: 'auth/request_recovery',
            type: 'POST',
            body: {
              email: code,
            },
          });
          console.log(resp.data);
          setIsLoading(false);
          Toast.show({
            type: 'success',
            text1: 'Codigo enviado al correo electrónico',
          });
          // await AsyncStorage.setItem('user', JSON.stringify(resp.data));
          next();
        } catch (error: any) {
          Toast.show({
            type: 'error',
            text1: `${error.message}`,
          });
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <DismissKeyboard>
      <View
        style={{
          height: height,
        }}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View style={styles.container}>
          <View
            style={{
              position: 'absolute',
              top: 30,
              left: '5%',
              // backgroundColor: 'red',
              zIndex: 1,
            }}>
            <BtnBack Funccion={() => navigation.goBack()} />
          </View>
          <Image
            source={require('../../../assets/img/fondo1.3(Photoshop).png')}
            style={{
              position: 'absolute',
              top: -0,
              opacity: 0.1,
              width: '100%',
              height: height,
            }}
          />
          <View
            style={{
              // backgroundColor: 'red',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 5,
            }}>
            <Text style={styles.title}>Recuperar contraseña</Text>
            <Text style={styles.text}>
              Para recuperar tu contraseña, por favor ingresa tu correo
            </Text>
          </View>
          <InputText
            onchageText={e => onChange(e, 'code')}
            name="Correo"
            Type="Email"
            color="#009DA6"
            value={code}
          />
          <Butukon
            title="Enviar código de verificación"
            colorFondo="#009DA6"
            height={60}
            border={20}
            onclick={() =>
              Forgot(form.code, () =>
                navigation.navigate('VerificationView', {correo: form.code}),
              )
            }
          />
        </View>
      </View>
    </DismissKeyboard>
  );
};

//make this component available to the app
export default ForgotPassword;
