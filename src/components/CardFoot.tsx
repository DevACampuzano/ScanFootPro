import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import {ObjectFoot} from '../interfaces/data';

const CardFoot = ({date, img, name, url}: ObjectFoot) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        Linking.openURL(url).catch(err =>
          console.error('An error occurred', err),
        )
      }>
      <View style={style.Cart}>
        <Image
          source={{uri: img}}
          style={{
            // borderColor: 'red',
            // borderWidth: 1,
            height: 90,
            width: 90,
            borderRadius: 500,
          }}
        />
        <View style={style.containerText}>
          <Text style={{...style.Text, ...style.Title}}>{name}</Text>
          <Text style={style.Text}>{date}</Text>
        </View>
        <View style={style.containerText}>
          <TouchableOpacity>
            <Text style={{...style.Text, ...style.Title}}>Ver en 3D</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{...style.Text, ...style.Title}}>Imprimir</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{...style.Text, ...style.Title}}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  Cart: {
    // borderColor: 'red',
    // borderWidth: 1,
    width: '95%',
    height: 120,
    backgroundColor: '#D9D9D9',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  Text: {
    color: '#000',
  },
  Title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  containerText: {
    // borderColor: 'red',
    // borderWidth: 1,
    height: '100%',
    width: '35%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CardFoot;
