//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar, Image, ImageBackground, KeyboardAvoidingView, Dimensions} from 'react-native';
import styles from './Styles';
import Butukon from '../../../components/Butukon';
import {RootStackParams} from '../../../navigations/StackAuth';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {InputText} from '../../../components/InputText';
import BtnBack from '../../../components/BtnBack';
import { DismissKeyboard } from '../../../components/DismissKeyboard';

// create a component
interface Props
  extends NativeStackScreenProps<RootStackParams, 'ForgotPassword'> {}
const ForgotPassword = ({navigation}: Props) => {
  const height = Dimensions.get('window').height
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
        <BtnBack Funccion={() => navigation.navigate('Auth')}/>
        </View>
        <Image
          source={require('../../../assets/img/fondo1.3(Photoshop).png')}
          style={{
            position: 'absolute',
            top: -0,
            opacity: 0.3,
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
          onchageText={e => console.log('h')}
          name="Correo"
          Type="Email"
          color="#009DA6"
        />
        <Butukon
          title="Comenzar"
          colorFondo="#009DA6"
          height={60}
          border={20} 
          onclick={() => navigation.navigate('VerificationView')}
        />
      </View>
      </View>
    </DismissKeyboard>
  );
};

//make this component available to the app
export default ForgotPassword;
