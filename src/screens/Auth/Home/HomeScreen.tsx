import React, {useEffect} from 'react';
import {TextInput, Button, View, Text, StatusBar, Image} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import styles from './Styles';
import {globalStyles} from '../../../theme/Styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Butukon from '../../../components/Butukon';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../navigations/StackAuth';

interface Props extends NativeStackScreenProps<RootStackParams, "Home"> {}
const HomeScreen = ({ navigation }: Props) => {
  const translateX = useSharedValue(-200);

  useEffect(() => {
    translateX.value = withTiming(0, {duration: 500});
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    return {transform: [{translateX: translateX.value}]};
  });

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>
      {/* <StatusBar backgroundColor="#ff2323" barStyle="light-content" /> */}
      <View style={styles.container}>
        <Animated.View>
          <Image
            source={require('../../../assets/img/pie.png')}
            style={styles.shoes}
          />
        </Animated.View>
        <Animated.View style={[styles.containerAuth, animatedStyles]}>
          <Image source={require('../../../assets/img/san_Roman.png')} style={{width: 160, height: 100}}/>
          <Text style={styles.title}>Bienvenido</Text>
          <Butukon title="Comenzar" colorFondo="#009DA6" height={60} border={20} onclick={() => navigation.navigate('Auth')}/>
          
        </Animated.View>
      </View>
    </>
  );
};

export default HomeScreen;
