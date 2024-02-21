import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, useContext} from 'react';
import {useApi} from './useApi';
import {AppContext} from '../contexts/AppContext';
import RNRestart from 'react-native-restart';
import Toast from 'react-native-toast-message';

const useAuth = () => {
  const {setIsLoading} = useContext(AppContext);
  const {loadApi, loadingApi} = useApi();

  const removeLocal = async () => {
    setIsLoading(true)
    try {
      console.log('si llega')
      await AsyncStorage.clear();
      setTimeout(() => {
        setIsLoading(false)
        RNRestart.Restart();
      }, 1000);
    } catch (e) {
      // error reading value
      setTimeout(() => {
        setIsLoading(false)
      }, 1000);
    }
  };
  // const getLocal = async () => {
  //   try {
  //     const data = await AsyncStorage.getItem('data');
  //     console.log(data);

  //     if (data === null) {
  //       return '';
  //     }
  //     return JSON.parse(data).token;
  //   } catch (error) {
  //     console.error('Error al recuperar datos de AsyncStorage:', error);
  //     return '';
  //   }
  // };

  const signIn = async (user: any, GoToDashBoard: any) => {
    setIsLoading(true);
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
        text1: `${error}`,
      });
    }
  };

  const signup  = async (user: any, GoToDashBoard: any) => {
    setIsLoading(true);
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
          text1: 'Registro Exitoso, revisa la bandeja de tu correo electrónico y activa tu cuenta',
        });
    } catch (error) {
      setIsLoading(false);
      // console.log('error----', error[0].Error);
      Toast.show({
        type: 'error',
        text1: `${error}`,
      });
    }
  };

  return {
    removeLocal,
    signIn,
    signup
  };
};

export default useAuth;
