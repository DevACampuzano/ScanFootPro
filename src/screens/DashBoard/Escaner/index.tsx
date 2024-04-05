import React, {useRef, useEffect, useState, useContext} from 'react';
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
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import axios from 'axios';
import {AppContext} from '../../../contexts/AppContext';
import Toast from 'react-native-toast-message';
import ModalUser from '../../../components/ModalUser';

interface Props extends DrawerScreenProps<DrawerDashBoardParams, 'Escaner'> {}

const Escaner = ({navigation}: Props) => {
  const cameraRef = useRef(null);
  const device = useCameraDevice('back');
  const format = useCameraFormat(device, [{fps: 30}]);
  const [counter, setcounter] = useState(1);
  const [photos, setPhotos] = useState([]);
  const {setIsLoading} = useContext(AppContext);
  const [botomdisable, setBotomdisable] = useState(true);

  const convertPhotoToBase64 = async photoPath => {
    const base64 = await RNFS.readFile(photoPath, 'base64');
    return `data:image/jpeg;base64,${base64}`;
  };
  const PositionPhotos = ['Botom', 'left', 'right'];

  const peticion = async photos => {
    console.log(photos);
    try {
      Toast.show({
        type: 'success',
        text1: 'Enviando fotos',
      });
      setIsLoading(true);
      const response = await axios.post(
        'https://50gzm64d-3000.use2.devtunnels.ms/',
        {photos}, // Enviar el array de objetos de fotos
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      Toast.show({
        type: 'success',
        text1: 'fotos enviadas correctamente',
      });
      setBotomdisable(true);
      setPhotos([]);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Error al enviar las foto',
      });
    }
    setIsLoading(false);
  };

  // Modificar la función peticion para manejar múltiples imágenes
  // const peticion = async photos => {
  //   try {
  //     setIsLoading(true);
  //     const response = await axios.post(
  //       'https://50gzm64d-3000.use2.devtunnels.ms/',
  //       {photos}, // Enviar el array de fotos en base64
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     );
  //     Toast.show({
  //       type: 'success',
  //       text1: 'fotos enviadas correctamente',
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Error al enviar las foto',
  //     });
  //   }
  //   setIsLoading(false);
  // };
  // ------

  // Modificar takePhotoo para llamar a peticion cuando se hayan tomado tres fotos
  // const takePhotoo = async () => {
  //   console.log('llega aki al foto');
  //   setcounter(counter + 1);
  //   if (cameraRef.current) {
  //     try {
  //       setIsLoading(true);
  //       const photo = await cameraRef.current.takePhoto();
  //       console.log(photo);
  //       console.log('/--', photo.path);

  //       // Convertir la foto a base64
  //       const base64Photo = await convertPhotoToBase64(photo.path);

  //       // Añadir la foto al array de fotos
  //       setPhotos([...photos, base64Photo]);

  //       // Verificar si se han tomado 3 fotos
  //       if (photos.length >= 2) {
  //         setBotomdisable(false);
  //       }
  //       Toast.show({
  //         type: 'success',
  //         text1: 'Foto Tomada',
  //       });
  //     } catch (error) {
  //       console.error('Error al guardar la foto:', error);
  //       ToastAndroid.show('Error al guardar la foto', ToastAndroid.SHORT);
  //       Toast.show({
  //         type: 'error',
  //         text1: 'Error al tomar la foto',
  //       });
  //     }
  //   }
  //   console.log('se supone que termino');
  //   // Toast.show({
  //   //   type: 'success',
  //   //   text1: 'Foto Tomada',
  //   // });
  //   setIsLoading(false);
  // };

  const takePhotoo = async () => {
    console.log('llega aki al foto');
    setcounter(counter + 1);
    if (cameraRef.current) {
      try {
        setIsLoading(true);
        const photo = await cameraRef.current.takePhoto();
        console.log(photo);
        console.log('/--', photo.path);

        // Convertir la foto a base64
        const base64Photo = await convertPhotoToBase64(photo.path);

        // Añadir la foto y su nombre de posición al array de fotos
        setPhotos([
          ...photos,
          {photo: base64Photo, position: PositionPhotos[counter - 1]},
        ]);

        // Verificar si se han tomado 3 fotos
        if (photos.length >= 2) {
          setBotomdisable(false);
        }
        Toast.show({
          type: 'success',
          text1: 'Foto Tomada',
        });
      } catch (error) {
        console.error('Error al guardar la foto:', error);
        ToastAndroid.show('Error al guardar la foto', ToastAndroid.SHORT);
        Toast.show({
          type: 'error',
          text1: 'Error al tomar la foto',
        });
      }
    }
    console.log('se supone que termino');
    setIsLoading(false);
  };

  console.log(counter);
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
      <Butukon
        title="Escanear"
        onclick={() => takePhotoo()}
        disabled={botomdisable ? false : true}
      />
      <Butukon
        title="Enviar fotos"
        onclick={async () => {
          console.log('Se han tomado 3 fotos, enviando al backend...');
          await peticion(photos); // Llamar a peticion con las fotos
        }}
        disabled={botomdisable ? true : false}
      />
      <ModalUser />
    </View>
  );
};

export default Escaner;
