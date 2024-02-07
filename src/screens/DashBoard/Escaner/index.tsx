import {View, Text, Alert, ToastAndroid, Image} from 'react-native';
import React, { useEffect } from 'react';
import styles from './Styles';
import { Camera, useCameraDevice, useCameraPermission, useMicrophonePermission, PermissionsAndroid, useCameraFormat } from 'react-native-vision-camera'


import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerDashBoardParams} from '../../../navigations/DrawerDashBoard';
import Butukon from '../../../components/Butukon';

interface Props extends DrawerScreenProps<DrawerDashBoardParams, 'Escaner'> {}

const Escaner = ({navigation}: Props) => {

  const device = useCameraDevice('back')
  const format = useCameraFormat(device, [
    { fps: 30 }
  ])
 
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
      <Camera
     style={{backgroundColor: 'red', height: 500, width: '90%'}}
     device={device}
     isActive={true}
     format={format}
   />
    <Butukon title='Escanear' onclick={() => ToastAndroid.show('Esta funcion aún no esta disponible', ToastAndroid.SHORT)}/>
    </View>
 );
};

export default Escaner;
