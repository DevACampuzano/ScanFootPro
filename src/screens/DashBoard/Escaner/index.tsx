import {View, Text} from 'react-native';
import React from 'react';
import styles from './Styles';

import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerDashBoardParams} from '../../../navigations/DrawerDashBoard';
import { Camera, useCameraDevice } from 'react-native-vision-camera';

interface Props extends DrawerScreenProps<DrawerDashBoardParams, 'Escaner'> {}

const Escaner = ({navigation}: Props) => {
//   const device = useCameraDevice('back')
//   const devices = Camera.getAvailableCameraDevices();
// console.log(JSON.stringify(devices, null, 2));

 return (
    <View style={styles.container}>
      <Text>Escaner</Text>
    {/* <Camera
      style={{flex: 1}}
      device={device}
      isActive={true}
      /> */}
    </View>
 );
};

export default Escaner;
