import {View, Text} from 'react-native';
import React from 'react';
import styles from './Styles';

import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerDashBoardParams } from '../../../navigations/DrawerDashBoard';

interface Props extends DrawerScreenProps<DrawerDashBoardParams, "Home"> {}

const Historial = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>Historial de pacientes</Text>
    </View>
  );
};

export default Historial;
