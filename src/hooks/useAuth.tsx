import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import useApi from './useApi';

const useAuth = () => {
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

 const signIn = async () => {
    const { data, loading, error } = useApi('http://localhost:4000/api/', 'GET');
    if (!loading && !error) {
      console.log(data);
    } else {
      console.error(error);
    }
 };

 return {
    getLocal,
    removeLocal,
    signIn,
 };
};

export default useAuth;
