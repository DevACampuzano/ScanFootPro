//import liraries
import React, {Component, useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, StatusBar, Image, ImageBackground, KeyboardAvoidingView, Dimensions} from 'react-native';
import styles from './Styles';
import Butukon from '../../../components/Butukon';
import {RootStackParams} from '../../../navigations/StackAuth';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {InputText} from '../../../components/InputText';
import BtnBack from '../../../components/BtnBack';
import { DismissKeyboard } from '../../../components/DismissKeyboard';
import NavigationBarColor from 'react-native-navigation-bar-color';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import useForm from '../../../hooks/useForm';
import { AppContext } from '../../../contexts/AppContext';
import Toast from 'react-native-toast-message';
import { useApi } from '../../../hooks/useApi';

// create a component
interface Props
  extends NativeStackScreenProps<RootStackParams, 'CreateNewPassword'> {}
const CreateNewPassword = ({navigation, route}: Props) => {
  const { dataAuth } = route.params;
  console.log(dataAuth)
  const {setIsLoading} = useContext(AppContext)
  const {loadApi} = useApi()
  const {code1,code2, onChange, setForm, form} = useForm({
    code1: '',
    code2: ''
  })
  const height = Dimensions.get('window').height
  const [password, setPassword] = useState('')
  useEffect(() => {
    const barra = async() => {
      try{
        const response = await changeNavigationBarColor('#009DA6');
        console.log(response)// {success: true}
    }catch(e){
        console.log(e)// {success: false}
    }
    }
    barra()
  }, [])
  const VerifyCode = async(next: any) => {
    try {
      setIsLoading(true);
      if (code1 != code2) {
        Toast.show({
          type: 'error',
          text1: 'Las contraseñas no son iguales',
        });
        setIsLoading(false); 
        return false;
      } else {
        setPassword(code1)
        console.log('0---',{
          ...dataAuth,
          "password": password
        })
        try {
          const resp: any = await loadApi({
            endpoint: 'auth/change_password',
            type: 'PUT',
            body: {
              ...dataAuth,
              "password": code1
            },
          });
          console.log(resp.data);
            setIsLoading(false);
            Toast.show({
              type: 'success',
              text1: 'Contraseña actualizada correctamente',
            });
        next();
        } catch (error) {
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
      <View style={{
        height: height
      }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={styles.container}>
        <View style={{
          position: 'absolute',
          top: 30,
          left: '5%',
          // backgroundColor: 'red',
          zIndex: 1
        }}>
        <BtnBack Funccion={() =>  navigation.goBack()}/>
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
          <Text style={styles.title}>Crea nueva contraseña</Text>
          <Text style={styles.text}>
            Ingresa una contraseña facil de recordar
          </Text>
        </View>
        <InputText
          onchageText={e => onChange(e, 'code1')}
          name="Crear contraseña"
          IconName='lock-closed'
          // Type="Email"
          color="#009DA6"
        />
        <InputText
          onchageText={e => onChange(e, 'code2')}
          name="Verifica la contraseña"
          IconName='lock-closed'
          // Type="Email"
          color="#009DA6"
        />
        <Text style={{...styles.text, fontSize: 12}}>
            Irecuerda que la contraseña debe tener minimo 8 caracteres, al menos una letra en mayuscula y un numero
          </Text>
        <Butukon
          title="Verificar Codigo"
          colorFondo="#009DA6"
          height={60}
          border={20}
          onclick={() => VerifyCode(() => navigation.navigate('Auth'))}
        />
      </View>
      </View>
    </DismissKeyboard>
  );
};

//make this component available to the app
export default CreateNewPassword;
