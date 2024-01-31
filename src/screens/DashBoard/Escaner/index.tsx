import {View, Text, Alert, ToastAndroid, Image} from 'react-native';
import React, { useEffect } from 'react';
import styles from './Styles';
import { Camera, useCameraDevice, useCameraPermission, useMicrophonePermission, PermissionsAndroid } from 'react-native-vision-camera'


import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerDashBoardParams} from '../../../navigations/DrawerDashBoard';
import Butukon from '../../../components/Butukon';

interface Props extends DrawerScreenProps<DrawerDashBoardParams, 'Escaner'> {}

const Escaner = ({navigation}: Props) => {

  const device = useCameraDevice('back')

  const { hasCameraPermission, requestCameraPermission } = useCameraPermission()
  const { hasMicrophonePermission, requestMicrophonePermission } = useMicrophonePermission()
 
  // useEffect(() => {
  //   const requestPermissions = async () => {
  //     try {
  //       if (!hasCameraPermission) {
  //         const granted = await PermissionsAndroid.request(
  //           PermissionsAndroid.PERMISSIONS.CAMERA,
  //           {
  //             title: 'Permiso de cámara',
  //             message: 'Necesitamos acceso a tu cámara'
  //           }
  //         )
  //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //           await requestCameraPermission();
  //         }
  //       }
  //       if (!hasMicrophonePermission) {
  //         const granted = await PermissionsAndroid.request(
  //           PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  //           {
  //             title: 'Permiso de micrófono',
  //             message: 'Necesitamos acceso a tu micrófono'
  //           }
  //         )
  //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //           await requestMicrophonePermission();
  //         }
  //       }
  //     } catch (err) {
  //       console.warn(err);
  //     }
  //   };
  //   requestPermissions();
  // }, []);
 
 return (
    <View style={styles.container}>
      <Image
            source={require('../../../assets/img/pie.png')}
            style={{
              position: 'absolute',
              top: -110,
              opacity: 0.3
            }}
          />
      <Camera
     style={{backgroundColor: 'red', height: 500, width: '90%'}}
     device={device}
     isActive={true}
   />
    <Butukon title='Escanear' onclick={() => ToastAndroid.show('Esta funcion aún no esta disponible', ToastAndroid.SHORT)}/>
    </View>
 );
};

export default Escaner;
