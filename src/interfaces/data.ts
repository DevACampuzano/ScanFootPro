// import {AnimationObject} from 'lottie-react-native';

export interface OnboardingData {
    id: number;
    animation: string;
    logo: string;
    text: string;
    textColor: string;
    backgroundColor: string;
  }
  
  const data: OnboardingData[] = [
    {
      id: 1,
      animation: require('../assets/images/slider-2.png'),
      logo: require('../assets/images/Facelles_Logo2.png'),
      text: 'Recuerda que Faceles es ese amigo al que siempre puedes recurrir cuando lo necesites, de la manera que te resulte más cómodo.',
      textColor: '#fff',
      // textColor: '#005b4f',
      backgroundColor: '#7887C2',
    },
    {
      id: 2,
      animation: require('../assets/images/slider-1.png'),
      logo: require('../assets/images/Facelles_Logo2.png'),
      text: 'Registrate como paciente y descubre psicologos listos para escucharte de manera anonima en el formato que prefieras: Chat, llamada telefonica o videollamada dentro de la app.',
      textColor: '#4662AB',
      backgroundColor: '#fff',
    },
    {
      id: 3,
      animation: require('../assets/images/slider-3.png'),
      logo: require('../assets/images/Facelles_Logo.png'),
      text: 'Forma parte de la cominidad de Faceless y experimenta un entorno único de apoyo y privacidad. Participa anónimamente en nuestro foro y siéntete libre de expresarte respetuosamente.',
      textColor: '#272c3f',
      backgroundColor: '#bbcde6',
    },
    {
      id: 4,
      animation: require('../assets/images/slider-4.png'),
      logo: require('../assets/images/Facelles_Logo2.png'),
      text: 'Se parte de la cominidad de Faceless y vive una experiencia única',
      textColor: '#fff',
      backgroundColor: '#7887C2',
    },
  ];
  
  export default data;