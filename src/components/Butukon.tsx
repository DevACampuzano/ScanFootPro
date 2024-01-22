import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {normalize, globalStyles} from '../theme/Styles';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  title: string;
  color?: string;
  colorFondo?: string;
  border?: number;
  width?: number | string;
  height?: number | string;
  icon?: string;
  onclick?: () => void;
};

const Butukon = ({
  title,
  color = 'white',
  colorFondo = '#364989',
  border = 15,
  width = '80%',
  height = 50,
  icon,
  onclick = () => console.log('hello desde el Butukon'),
}): Props => {
  return (
    <>
      <TouchableOpacity
        onPress={onclick}
        activeOpacity={0.9}
        style={{
          backgroundColor: colorFondo,
          borderRadius: border,
          height: height,
          width: width,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: 20
        }}>
          {icon && <Icon name={icon} size={30} color={color} />}
        <Text style={{color: color, ...globalStyles.title}}>{title}</Text>
      </TouchableOpacity>
    </>
  );
};

export default Butukon;
