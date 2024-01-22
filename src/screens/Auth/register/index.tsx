import {View, Text, ImageBackground, Image} from 'react-native';
import React from 'react';
import Butukon from '../../../components/Butukon';
import {globalStyles} from '../../../theme/Styles';
import styles from './Styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {RootTopTabParams} from '../../../navigations/TopTabNavigatorAuth';

interface Props extends MaterialTopTabScreenProps<RootTopTabParams, 'login'> {}

const Register = ({navigation}: Props) => {
  return (
    
      <View style={styles.container}>
        <Image
            source={require('../../../assets/img/pie.png')}
            style={{
              position: 'absolute',
              top: -110,
              opacity: 0.3
            }}
          />
        <Text style={styles.title}>Regístrate</Text>
        <View style={styles.containerBtn}>
          <Butukon
            icon="logo-google"
            title="Continuar con Google"
            height={60}
            border={20}
            onclick={() => console.log('hello')}
          />
          <Butukon
            icon="mail-outline"
            title="Continuar con Email"
            height={60}
            border={20}
            onclick={() => console.log('hello')}
          />
        </View>
        <View style={styles.sectionBotton}>
          <Text style={styles.parrafo}>¿Ya tienes una cuenta?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('login')}
            activeOpacity={0.9}>
            <Text style={{...styles.parrafo, color: '#000'}}>
              Inicia sesión
            </Text>
          </TouchableOpacity>
        </View>
      </View>

  );
};

export default Register;
