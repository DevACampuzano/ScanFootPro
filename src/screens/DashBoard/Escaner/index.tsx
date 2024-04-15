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
import RNFetchBlob from 'rn-fetch-blob';

interface Props extends DrawerScreenProps<DrawerDashBoardParams, 'Escaner'> {}

const Escaner = ({navigation}: Props) => {
  const cameraRef = useRef(null);
  const device = useCameraDevice('back');
  const format = useCameraFormat(device, [{fps: 30}]);
  const [counter, setcounter] = useState(1);
  const [photos, setPhotos] = useState([]);
  const {setIsLoading} = useContext(AppContext);
  const [botomdisable, setBotomdisable] = useState(true);
  const [modal, setModal] = useState(true);
  const [stlFileUri, setStlFileUri] = useState([]);
  const [mensaje, setMensaje] = useState('de la planta');
  const [acept, setAcept] = useState(false);

  const convertPhotoToBase64 = async photoPath => {
    const base64 = await RNFS.readFile(photoPath, 'base64');
    return `data:image/jpeg;base64,${base64}`;
  };
  const PositionPhotos = ['Botom', 'left', 'right'];
  const MensajeAlert = [
    'de la planta',
    'del lado izquierdo',
    'del lado izquierdo',
  ];

  const AcepUser = () => {
    setAcept(true);
  };

  const fetchSTLFile = async stlFileUrl => {
    try {
      // Descargar el archivo STL y guardarlo localmente
      const filePath = `${RNFetchBlob.fs.dirs.DownloadDir}/archivo.stl`;
      await RNFetchBlob.config({
        fileCache: true,
        appendExt: 'stl',
      })
        .fetch('GET', stlFileUrl, {})
        .then(res => {
          RNFetchBlob.fs.writeFile(filePath, res.data, 'base64');
        });

      // Guardar la URI del archivo STL descargado
      setStlFileUri(filePath);
    } catch (error) {
      console.error('Error fetching STL file:', error);
    }
  };

  // Función modificada para enviar fotos y luego descargar el archivo STL
  const peticion = async photos => {
    console.log(photos);
    try {
      Toast.show({
        type: 'success',
        text1: 'Enviando fotos',
      });
      setIsLoading(true);
      const photoObject = {
        foto_planta_pie: photos[0].photo,
        foto_lado_derecho: photos[1].photo,
        foto_lado_izquierdo: photos[2].photo,
      };
      const response = await axios.post(
        'https://algoritmo.kiura.co',
        //  'https://ltwmcvfm-5000.use.devtunnels.ms/process_images',
        //  'https://ltwmcvfm-5000.use.devtunnels.ms/process_images',
        photoObject, // Enviar el array de objetos de fotos
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

      // Llamar a fetchSTLFile con la URL del archivo STL obtenida de la respuesta
      const stlFileUrl = response.data.url; // Asegúrate de que la respuesta del servidor incluya la URL del archivo STL
      fetchSTLFile(stlFileUrl);
      console.log('---', response.data);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Error al enviar las foto',
      });
    }
    setIsLoading(false);
  };

  const SetModalUser = () => {
    setModal(!modal);
  };

  const takePhotoo = async () => {
    console.log('llega aki al foto');
    setcounter(counter + 1);
    if (cameraRef.current) {
      try {
        // SetModalUser()
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
        setMensaje(MensajeAlert[counter]);
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
  if (acept) {
    console.log('se acepto');
    // setAcept()
    // takePhotoo()
  }
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
        onclick={() => {
          // SetModalUser()
          takePhotoo();
        }}
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
      <Butukon title="Modal" onclick={() => SetModalUser()} />
      <ModalUser
        modalShow={modal}
        SetModalShow={SetModalUser}
        palabra={mensaje}
        AcepUser={AcepUser}
      />
    </View>
  );
};

export default Escaner;
