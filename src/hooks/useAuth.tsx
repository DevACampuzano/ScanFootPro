import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, useContext} from 'react';
import {useApi} from './useApi';
import {AppContext} from '../contexts/AppContext';
import RNRestart from 'react-native-restart';
import Toast from 'react-native-toast-message';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const useAuth = () => {
  const {setIsLoading} = useContext(AppContext);
  const {loadApi, loadingApi} = useApi();

  const signOutGoogle = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      console.log('Usuario desconectado');
    } catch (error) {
      console.error(error);
    }
  };
  const removeLocal = async () => {
    setIsLoading(true);
    try {
      console.log('si llega');
  
      // Verificar si el usuario ha iniciado sesión con Google
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        // Si el usuario ha iniciado sesión con Google, cerrar la sesión
        await GoogleSignin.signOut();
      }
  
      // Limpiar el almacenamiento local
      await AsyncStorage.clear();
  
      // Reiniciar la aplicación
      setTimeout(() => {
        setIsLoading(false);
        RNRestart.Restart();
      },  1000);
    } catch (e) {
      // error reading value
      setTimeout(() => {
        setIsLoading(false);
      },  1000);
    }
  };
  
  const validateInput = (user: any) => {
    if (user.name === '' || user.email === '' && user.password === '') {
      console.log('Complete los campos');
      Toast.show({
        type: 'error',
        text1: 'Complete los campos',
      });
      return false;
    }
    // Validar correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(user.email)) {
      console.log('Correo electrónico inválido');
      Toast.show({
        type: 'error',
        text1: 'Correo electrónico inválido',
      });
      return false;
    }
  
    // Validar contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(user.password)) {
      console.log('Contraseña inválida');
      Toast.show({
        type: 'error',
        text1: 'Contraseña inválida',
      });
      return false;
    }
  
    // Validar nombre
    const nameRegex = /^[a-zA-Z\s]*$/;
    if (!nameRegex.test(user.name)) {
      console.log('Nombre inválido');
      Toast.show({
        type: 'error',
        text1: 'Nombre inválido',
      });
      return false;
    }
  
    return true;
  };
  
  const signIn = async (user: any, GoToDashBoard: any) => {
    setIsLoading(true);
  
    if (!validateInput(user)) {
      setIsLoading(false);
      // Toast.show({
      //   type: 'error',
      //   text1: 'Por favor, complete todo los campos',
      // });
      return;
    }
    try {
      const resp: any = await loadApi({
        endpoint: 'auth/signIn',
        type: 'POST',
        // token: true,
        body: user,
      });
      console.log('eijvli---',resp);
      console.log(resp.data);
      Toast.show({
        type: 'success',
        text1: 'Bienvenido 👋',
      });
      // console.log(resp.config.response)
      try {
        setIsLoading(false);
        await AsyncStorage.setItem('user', JSON.stringify(resp.data));
        console.log('Usuario almacenado exitosamente');
        GoToDashBoard();
      } catch (error) {
        setIsLoading(false);
        console.error('Error al almacenar el usuario: ', error);
      }
    } catch (error) {
      setIsLoading(false);
      console.log('error----', error);
      Toast.show({
        type: 'error',
        text1: `${error.message}`,
      });
    }
  };
  
  const SigInGoolge = (GoToDashBoard: any) => {
    GoogleSignin.configure({
      androidClientId: '558743903976-t4ttf9jgjjvc0g4g4cru8scjs277a2ho.apps.googleusercontent.com',
      // iosClientId: 'ADD_YOUR_iOS_CLIENT_ID_HERE',
    });
    GoogleSignin.hasPlayServices()
      .then(hasPlayService => {
        if (hasPlayService) {
          GoogleSignin.signIn()
            .then(userInfo => {
              // console.log(JSON.stringify(userInfo));
              // console.log('User----',JSON.stringify(userInfo));
              AsyncStorage.setItem('user', JSON.stringify(userInfo));
              Toast.show({
                type: 'success',
                text1: 'Bienvenido 👋',
              });
              GoToDashBoard()
            })
            .catch(e => {
              console.log('ERROR IS: ' + e);
            });
        }
      })
      .catch(e => {
        console.log('ERROR IS: ' + e);
      });
  }

  const signup  = async (user: any, GoToDashBoard: any) => {
    setIsLoading(true);

    if (!validateInput(user)) {
      setIsLoading(false);
      return;
    }
    try {
      const resp: any = await loadApi({
        endpoint: 'auth/signup',
        type: 'POST',
        body: user,
      });
      console.log(resp.data);
        GoToDashBoard();
        setIsLoading(false);
        Toast.show({
          type: 'success',
          text1: 'Revisa tu correo electrónico y activa tu cuenta',
        });
    } catch (error) {
      setIsLoading(false);
      // console.log('error----', error[0].Error);
      console.log(error.message)
      Toast.show({
        type: 'error',
        text1: `${error.message}`,
      });
    }
  };

  return {
    removeLocal,
    signIn,
    signup,
    SigInGoolge
  };
};

export default useAuth;
