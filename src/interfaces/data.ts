export const data = [
  {
    id: 1,
    image: require('../assets/img/tuto1.png'),
    title: 'Inicia el proceso de escaneo ',
    text: 'Dirígete a la sección de escáner en la aplicación y continua con los demás pasos.',
  },
  {
    id: 2,
    image: require('../assets/img/tuto3.png'),
    title: 'Preparará el entorno',
    text: 'Asegúrate de que el área esté bien iluminada y libre de obstáculos para una captura clara.',
  },
  {
    id: 3,
    image: require('../assets/img/tuto2.png'),
    title: 'Escaneo del pie',
    text: 'Coloca el pie sobre el área designada en la pantalla de la aplicación y sigue las instrucciones en pantalla para posicionar el pie correctamente.',
  },
  {
    id: 4,
    image: require('../assets/img/tuto2.png'),
    title: 'Escaneo del pie 2',
    text: 'Coloca el pie sobre el área designada en la pantalla de la aplicación y sigue las instrucciones en pantalla para posicionar el pie correctamente.',
  },
  {
    id: 5,
    image: require('../assets/img/tuto2.png'),
    title: 'Escaneo del pie 3',
    text: 'Coloca el pie sobre el área designada en la pantalla de la aplicación y sigue las instrucciones en pantalla para posicionar el pie correctamente.',
  },
  {
    id: 6,
    image: require('../assets/img/pie.png'),
    title: 'Generación del modelo 3D',
    text: 'Una vez que la aplicación haya capturado la imagen, procesará la información para crear un modelo 3D detallado de la planta de tu pie.',
  },
  {
    id: 7,
    image: require('../assets/img/pata1.png'),
    title: 'Guardado y visualización',
    text: 'Puedes optar por guardar el modelo 3D en tu dispositivo o compartirlo directamente. Además, puedes revisar el historial de escaneos para acceder a los modelos previos.',
  },
];

export interface ObjectFoot {
  id: number;
  name: string;
  date: string;
  img: string;
}
