import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  ToastAndroid,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useMicrophonePermission,
  PermissionsAndroid,
  useCameraFormat,
} from 'react-native-vision-camera';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerDashBoardParams} from '../../../navigations/DrawerDashBoard';
import Butukon from '../../../components/Butukon';
import RNFS from 'react-native-fs'; // Importa react-native-fs
import styles from './Styles';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";


interface Props extends DrawerScreenProps<DrawerDashBoardParams, 'Escaner'> {}

const Escaner = ({navigation}: Props) => {
  const cameraRef = useRef(null);
  const device = useCameraDevice('back');
  const format = useCameraFormat(device, [{fps: 30}]);
  const [counter, setcounter] = useState(1)

  const takePhoto = async () => {
    setcounter(counter +  1);
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePhoto();
      console.log(photo.path);
      
      // Nombre del archivo en el dispositivo
      let filename = `ScanFootPro${counter}.jpg`;
      let newPath = `${RNFS.PicturesDirectoryPath}/${filename}`;
      
      // Verificar si el archivo ya existe
      const fileExists = await RNFS.exists(newPath);
      
      if (fileExists) {
        // Si el archivo existe, generar un nuevo nombre de archivo
        // Puedes usar un enfoque basado en tiempo, incrementar un contador, etc.
        // En este ejemplo, simplemente incrementamos un contador en el nombre del archivo
        let counter =  1;
        while (fileExists) {
          filename = `ScanFootPro${counter}.jpg`;
          newPath = `${RNFS.PicturesDirectoryPath}/${filename}`;
          fileExists = await RNFS.exists(newPath);
          counter++;
        }
      }
      
      // Mover la foto a la nueva ubicación
      RNFS.moveFile(photo.path, newPath)
        .then(() => {
          console.log('Foto guardada correctamente');
          console.log(newPath);
          ToastAndroid.show('Foto tomada y guardada', ToastAndroid.SHORT);
        })
        .catch((error) => {
          console.error('Error al guardar la foto:', error);
          ToastAndroid.show('Error al guardar la foto', ToastAndroid.SHORT);
        });
    }
  };
  
  

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
        ref={cameraRef}
        style={{backgroundColor: 'red', height: 500, width: '90%'}}
        device={device}
        isActive={true}
        format={format}
        photo={true}
      />
      <Butukon title="Escanear" onclick={takePhoto} />
    </View>
  );
};

export default Escaner;
