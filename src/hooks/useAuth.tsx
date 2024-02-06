import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, useContext} from 'react';
import {useApi} from './useApi';
import {AppContext} from '../contexts/AppContext';

const useAuth = () => {
  const {setIsLoading} = useContext(AppContext);
  const {loadApi, loadingApi} = useApi();

  const removeLocal = async () => {
    try {
      return await AsyncStorage.clear();
    } catch (e) {
      // error reading value
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
    } catch (error) {
      setIsLoading(false);
      console.log('error----', error);
    }
  };

  return {
    removeLocal,
    signIn,
    signup
  };
};

export default useAuth;
