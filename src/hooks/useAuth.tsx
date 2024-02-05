import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {useApi} from './useApi';

const useAuth = () => {
  const {loadApi, loadingApi} = useApi();
  const getLocal = async () => {
    try {
      return await AsyncStorage.getItem('data').then(data => {
        if (data === null) {
          return '';
        }
        return JSON.parse(data).token;
      });
    } catch (e) {
      // error reading value
    }
  };

  const removeLocal = async () => {
    try {
      return await AsyncStorage.clear();
    } catch (e) {
      // error reading value
    }
  };

  const signIn = async (user:any) => {
    try {
      const resp: any = await loadApi({
        endpoint: 'auth/signIn',
        type: 'POST',
        // token: true,
        body: user
      });
      console.log(resp)
      // await AsyncStorage.setItem('data', JSON.stringify(resp.data));
    } catch (error) {
      console.log('error----', error);
    }
  };

  return {
    getLocal,
    removeLocal,
    signIn,
  };
};

export default useAuth;
