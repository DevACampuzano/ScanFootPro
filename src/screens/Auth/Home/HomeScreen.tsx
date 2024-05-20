import React, {useContext, useEffect} from 'react';
import {View, Text, StatusBar, Image} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import styles from './Styles';
import Butukon from '../../../components/Butukon';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations/StackAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from '../../../contexts/AppContext';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

interface Props extends NativeStackScreenProps<RootStackParams, 'Home'> {}
const HomeScreen = ({navigation}: Props) => {
  const {isLoading, setIsLoading} = useContext(AppContext);
  const translateX = useSharedValue(-200);
  const getLocal = async () => {
    console.log('ddd', isLoading);
    setIsLoading(true); // Iniciar la carga
    try {
      const data = await AsyncStorage.getItem('user');
      // console.log(data)
      if (data === null) {
        setIsLoading(false);
        return '';
      }
      const Token = JSON.parse(data).token;
      setIsLoading(false); // Finalizar la carga
      // console.log('----',Token);
      if (Token) {
        // console.log('he')
        navigation.navigate('DashBoard');
      }
    } catch (error) {
      console.error('Error al recuperar datos de AsyncStorage:', error);
      setIsLoading(false); // Finalizar la carga en caso de error
    }
  };

  useEffect(() => {
    translateX.value = withTiming(0, {duration: 500});
    const barra = async () => {
      try {
        const response = await changeNavigationBarColor('#009DA6');
        console.log(response); // {success: true}
      } catch (e) {
        console.log(e); // {success: false}
      }
    };
    barra();
    getLocal();
    // StatusBar.setHidden(true, 'slide');
    // hideNavigationBar();
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    return {transform: [{translateX: translateX.value}]};
  });

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={styles.container}>
        <Animated.View>
          <Image
            source={require('../../../assets/img/pie.png')}
            style={styles.shoes}
          />
        </Animated.View>
        <Animated.View style={[styles.containerAuth, animatedStyles]}>
          <Image
            source={require('../../../assets/img/san_Roman.png')}
            style={{width: 160, height: 100}}
          />
          <Text style={styles.title}>Bienvenido</Text>
          <Butukon
            title="Comenzar"
            colorFondo="#009DA6"
            height={60}
            border={20}
            onclick={() => navigation.navigate('Auth')}
          />
        </Animated.View>
      </View>
    </>
  );
};

export default HomeScreen;
