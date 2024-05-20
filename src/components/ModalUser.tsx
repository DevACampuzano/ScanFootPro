import {View, Text, StyleSheet} from 'react-native';
import React, { useEffect } from 'react';
import Butukon from './Butukon';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

type Props = {
  modalShow: boolean;
  SetModalShow: ()=>void;
  AcepUser: ()=>void;
  palabra: string;
};

const ModalUser = ({modalShow, SetModalShow, palabra = 'del lado derecho', AcepUser}: Props) => {
 const isVisible = useSharedValue(0);
 const progress = useSharedValue(0);

 const showComponent = () => {
    isVisible.value = 0; // Cambia a 1 para mostrar
    progress.value = withTiming(0, { duration: 280 });
 };

 // Función para ocultar el componente
 const hideComponent = () => {
    isVisible.value = 700; // Cambia a 0 para ocultar
    progress.value = withTiming(1, { duration: 280 });
 };

 const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(isVisible.value , { damping: 20, stiffness: 100 }) }], // Mueve el componente hacia abajo
    };
 });

 if (!modalShow) {
  setTimeout(() => {
    showComponent();
    console.log('hello')
  }, 40);
}


const ContainerBack = useAnimatedStyle(() => ({
   backgroundColor: interpolateColor(progress.value, [0, 1], ['#000000e0','#00000000']),
}));

  return (
    <Animated.View style={[ContainerBack, {...styles.container, display: modalShow ? 'none' : 'flex' }]}>
      <Animated.View style={[styles.containerModal, animatedStyles]}>
      <Text style={styles.title}>Tomar fotos del pie</Text>
      <Text style={{color: '#000'}}>La siguiente toma que vas a realizar debe de ser {palabra} del pie, así como se ve en el tutorial</Text>
      <Butukon title='Continuar'  onclick={() => {
         hideComponent() 
         AcepUser()
         setTimeout(() => {
          console.log('se fue')
          SetModalShow()
         }, 300);
      }} />
    </Animated.View>
     
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#ffdddd',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  containerModal:{
    backgroundColor: '#fff',
    padding: 20,
    width: '80%',
    gap: 13,
  },
  title:{
    color: '#364989',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default ModalUser;
