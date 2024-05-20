import axios from 'axios';
import RNFS from 'react-native-fs';

async function fileToBase64(path: string) {
  try {
    // Verificar si el archivo existe
    const fileExists = await RNFS.exists(path);
    if (!fileExists) {
      throw new Error(`Archivo no encontrado en la ruta: ${path}`);
    }

    const fileContent = await RNFS.readFile(path, 'base64');
    return `${fileContent}`;
  } catch (error) {
    console.error('Error al leer el archivo:', error);
    throw error;
  }
}

export const uploadedImages = async (files: any[]) => {
  try {
    const base64Array: string[] = [];

    for (const file of files) {
      const base64 = await fileToBase64(file.uri);
      base64Array.push(base64);
    }

    const body = {
      foto_planta_pie: base64Array[0],
      foto_lado_derecho: base64Array[1],
      foto_lado_izquierdo: base64Array[2],
    };

    const res = await axios.post(
      'https://algoritmo.kiura.co/process_images',
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error('Error al subir las imágenes:', error);
    throw error;
  }
};
