import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import useApi from './useApi';

const useAuth = () => {
    const {} = useApi()
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
  return {
    getLocal,
    removeLocal,
  };
  const singInt = () => {

  }
};

export default useAuth;
