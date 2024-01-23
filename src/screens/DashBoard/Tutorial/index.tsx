import {View, Text} from 'react-native';
import React from 'react';
import styles from './Styles';

import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerDashBoardParams } from '../../../navigations/DrawerDashBoard';
import OnboardingScreen from '../../tuto/OnboardingScreen';

interface Props extends DrawerScreenProps<DrawerDashBoardParams, "Tutorial"> {}

const Tutorial = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Instrucciones para usar la app</Text>
      <OnboardingScreen/>
    </View>
  );
};

export default Tutorial;
