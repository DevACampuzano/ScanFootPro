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
import useForm from '../../../hooks/useForm';
import { AppContext } from '../../../contexts/AppContext';
import Toast from 'react-native-toast-message';
import { useApi } from '../../../hooks/useApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
interface Props
  extends NativeStackScreenProps<RootStackParams, 'VerificationView'> {}
const VerificationView = ({navigation, route }: Props) => {
  const { correo } = route.params;
  console.log(correo)
  const height = Dimensions.get('window').height
  const {loadApi} = useApi()
  const {code, onChange, setForm, form} = useForm({
    code: ''
  })
  const {setIsLoading} = useContext(AppContext)
  const VerifyCode = async(data: any, next: any) => {
    console.log('//---',data)
    console.log(data.length)
    try {
      setIsLoading(true);
      if (data === '' || data == null || data == undefined || data.length < 4) {
        Toast.show({
          type: 'error',
          text1: 'Ingresa codigo de vefificacion valido',
        });
        setIsLoading(false); 
        return false;
      } else {
        try {
          const resp: any = await loadApi({
            endpoint: 'auth/validate_code',
            type: 'POST',
            body: {
              "email": correo,
              "code": code
            },
          });
          console.log(resp.data);
            setIsLoading(false);
            Toast.show({
              type: 'success',
              text1: 'Codigo Verificado',
            });
        next();
        } catch (error:any) {
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
          <Text style={styles.title}>Ingresa codigo de verificacion</Text>
          <Text style={styles.text}>
            Para recuperar tu contraseña, por favor ingresa tu codigo de verificacion
          </Text>
        </View>
        <InputText
          onchageText={e => onChange(e, 'code')}
          name="Codigo de Verificacoin"
          IconName='key'
          // Type="Email"
          color="#009DA6"
          maxLength={4}
        />
        <Butukon
          title="Verificar Codigo"
          colorFondo="#009DA6"
          height={60}
          border={20}
          onclick={() => VerifyCode(form.code,() => navigation.navigate('CreateNewPassword',  { dataAuth: {
            "email": correo,
            "code": code
          } }))}
        />
      </View>
      </View>
    </DismissKeyboard>
  );
};

//make this component available to the app
export default VerificationView;
