import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
  Button,
} from 'react-native';
import RNFS from 'react-native-fs';
import styles from './Styles';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {
  PERMISSIONS,
  request,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
import Butukon from '../../../components/Butukon';
import {uploadedImages} from '../../../services';
import axios from 'axios';
import {Loading} from '../../../components/Loading';

const requestStoragePermission = async () => {
  try {
    const result = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    if (result === RESULTS.GRANTED) {
      console.log('Storage permission granted');
    } else {
      console.log('Storage permission denied');
    }
  } catch (error) {
    console.log('Error requesting storage permission:', error);
  }
};

const DescargarArchivo = ({downloadUrl, fileName}: any) => {
  const [loading, setLoading] = useState(false);

  const downloadFile = async () => {
    await requestStoragePermission();
    setLoading(true);
    const filePath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
    try {
      const response = await axios.get(downloadUrl, {
        responseType: 'blob',
      });
      console.log('RESPONSE -->', response);
      // const base64String = Buffer.from(response.data, 'binary').toString(
      //   'base64',
      // );
      // await RNFS.writeFile(filePath, base64String, 'base64');
      setLoading(false);
      Alert.alert('Éxito', 'Archivo descargado correctamente.', [{text: 'OK'}]);
    } catch (error) {
      setLoading(false);
      console.error('Error al descargar el archivo:', error);
      Alert.alert('Error', 'No se pudo descargar el archivo.', [{text: 'OK'}]);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text>Descargar archivo STL</Text>
          <Button title="Descargar" onPress={downloadFile} />
        </>
      )}
    </View>
  );
};

const Escaner = () => {
  const [title, setTitle] = useState('Imagen planta del pie');
  const [step, setStep] = useState(0);
  const [stl, setStl] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [photos, setImages] = useState<any[]>([]);
  const [photosF, setImagesF] = useState<any[]>([]);
  const device = useCameraDevice('back');
  const cameraRef = useRef<Camera>(null);

  const permissions = [
    PERMISSIONS.ANDROID.CAMERA,
    PERMISSIONS.ANDROID.RECORD_AUDIO,
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  ];

  const requestPermissions = async () => {
    const statuses = await requestMultiple(permissions);
    const allGranted = permissions.every(
      permission => statuses[permission] === RESULTS.GRANTED,
    );

    if (!PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE) {
      request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    }

    if (!allGranted) {
      Alert.alert(
        'Permisos necesarios',
        'La aplicación necesita permisos para funcionar correctamente.',
        [{text: 'OK'}],
      );
    }
    return allGranted;
  };

  const enviarFotos = async () => {
    setLoading(true);
    const res = await uploadedImages(photosF);
    if (res) {
      setStl(res);
    }
    setLoading(false);
  };

  const captureImages = async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    if (cameraRef.current !== null) {
      try {
        setLoading(true);
        const photo = await cameraRef.current.takePhoto({
          flash: 'off',
          qualityPrioritization: 'speed',
        });

        const photoUri = `file://${RNFS.ExternalDirectoryPath}/photo_${
          Math.random() * 10
        }.jpg`;
        await RNFS.moveFile(photo.path, photoUri);
        photos.push(photoUri);
        setImages(photos);
        setImagesF([...photosF, {photo, uri: photoUri}]);
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (step === 0) {
          setTitle('Foto del lado derecho del pie');
          setStep(1);
        } else if (step === 1) {
          setTitle('Foto del lado izquierdo del pie');
          setStep(2);
        } else if (step === 2) {
          setTitle('Imagen planta del pie');

          setStep(3);
        } else {
          setTitle('Imagen planta del pie');
          setStep(0);
        }
      } catch (error) {
        console.error('Error al capturar las fotos:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <ScrollView style={{width: '100%', height: '100%'}}>
      <View style={styles.container}>
        <Image
          source={require('../../../assets/img/pie.png')}
          style={{
            position: 'absolute',
            top: -110,
            opacity: 0.3,
          }}
        />
        {device === null && loading ? (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#6200ee" />
            <Text style={styles.message}>Cargando ...</Text>
          </View>
        ) : (
          <>
            <Text style={styles.title}>{title}</Text>
            {device && (
              <Camera
                ref={cameraRef}
                style={{backgroundColor: 'red', height: 400, width: '90%'}}
                device={device}
                isActive={true}
                photo={true}
              />
            )}
            <View
              style={{
                height: 100,
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 10,
              }}>
              {photos &&
                photos.map((photo, index) => {
                  return (
                    <Image
                      key={index}
                      source={{uri: photo}}
                      style={{
                        width: 100,
                        height: 100,
                      }}
                    />
                  );
                })}
            </View>
            {photos.length > 2 ? (
              <Butukon
                title="Enviar imágenes"
                onclick={enviarFotos}
                disabled={loading}
              />
            ) : (
              <Butukon
                title="Escanear"
                onclick={captureImages}
                disabled={loading}
              />
            )}
          </>
        )}
        {loading && <Loading />}
        {stl && (
          <DescargarArchivo
            downloadUrl={stl.download_url}
            fileName={stl.stl_filename}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default Escaner;
