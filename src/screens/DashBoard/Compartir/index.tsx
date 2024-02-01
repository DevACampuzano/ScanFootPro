import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import styles from './Styles';
import IconTouch from '../../../components/IconTouch';
import Share from 'react-native-share';

type Props = {};

const Compartir = (props: Props) => {


  const ShareApp = () => {
    const options = {
      title: 'Compartir a través de',
      message: '¡Hola! ¿Qué tal si compartimos algo?',
      social: Share.Social.WHATSAPP,
     };

    Share.open(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      <Text style={styles.title}>Comparte ScanFootPro</Text>
      <View style={{
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 40,
        alignItems: 'center'
      }}>
        <Text style={{
          color: '#000'
        }}>https://www.google.com</Text>
        <TouchableOpacity onPress={() => ShareApp()}>
        <IconTouch nameIcons='share-social'/>
        </TouchableOpacity>
      </View>
      <View style={{
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-around'
      }}>
      <IconTouch nameIcons='logo-whatsapp' />
      <IconTouch nameIcons='logo-instagram' />
      <IconTouch nameIcons='logo-facebook' />
      </View>
    </View>
  );
};

export default Compartir;
