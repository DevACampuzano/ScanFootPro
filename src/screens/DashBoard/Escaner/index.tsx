import {View, Text} from 'react-native';
import React from 'react';
import styles from './Styles';

import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerDashBoardParams } from '../../../navigations/DrawerDashBoard';

interface Props extends DrawerScreenProps<DrawerDashBoardParams, "Escaner"> {}

const Escaner = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text>Escaner</Text>
    </View>
  );
};

export default Escaner;
