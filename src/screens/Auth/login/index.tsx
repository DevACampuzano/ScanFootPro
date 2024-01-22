import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import styles from './Styles';
import {InputText} from '../../../components/InputText';
import {DismissKeyboard} from '../../../components/DismissKeyboard';
import Butukon from '../../../components/Butukon';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { RootTopTabParams } from '../../../navigations/TopTabNavigatorAuth';

interface Props extends MaterialTopTabScreenProps<RootTopTabParams, "login"> {}

const Login = ({ route, navigation  }: Props) => {
  const { GoToDashBoard } = route.params;
  console.log(GoToDashBoard)
  const [email, setEmail] = useState('');
  const HandleEmail = e => {
    setEmail(e);
    console.log(e);
  };
  return (
    <DismissKeyboard>
      <View style={styles.container}>
      <Image  
            source={require('../../../assets/img/pie.png')}
            style={{
              position: 'absolute',
              top: -110,
              opacity: 0.3
            }}
          />
        <View
          style={{
            justifyContent: 'space-around',
            width: '100%',
            height: 200,
            alignItems: 'center',
          }}>
          <InputText
            onchageText={HandleEmail}
            name="Email"
            Type="Email"
            color="#364989"
          />
          <InputText
            onchageText={HandleEmail}
            name="Password"
            IconName="mail-outline"
            Type="Password"
            color="#364989" 
          />
          <Text style={{color: '#000'}}>¿Olvidaste la contraseña?</Text>
          <View style={styles.sectionBotton}>
      <Text style={styles.parrafo}>
        ¿Necesitas una cuenta?
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('register')} activeOpacity={0.9}>
          <Text style={{...styles.parrafo, color: '#000'}}>
          Registrate
          </Text>
        </TouchableOpacity>
      </View>
        </View>
        <Butukon
          title="Inicia sessión"
          height={60}
          border={20}
          onclick={() => GoToDashBoard()}
        />
      </View>
    </DismissKeyboard>
  );
};

export default Login;
