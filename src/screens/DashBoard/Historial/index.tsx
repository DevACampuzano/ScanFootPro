import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './Styles';

import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerDashBoardParams } from '../../../navigations/DrawerDashBoard';

interface Props extends DrawerScreenProps<DrawerDashBoardParams, "Home"> {}

const Historial = (props: Props) => {
  return (
    <View style={styles.container}>
       <Image
          source={require('../../../assets/img/pie.png')}
          style={{
            position: 'absolute',
            top: -110,
            opacity: 0.3,
            width: '100%',
            height: 500,
          }}
        />
      <Text style={styles.title}>Historial de pacientes</Text>
      <Text style={{color: '#000', fontSize: 20}}>Estamos trabajando en ello..</Text>
    </View>
  );
};

export default Historial;
