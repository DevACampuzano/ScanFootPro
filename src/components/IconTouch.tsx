import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';


type Props = {
    nameIcons: string;
};

const IconTouch = ({nameIcons}: Props) => {
  return (
    <>
      <View 
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5
      }}
      >
        {/* <Text>{title}</Text> */}
        <Icon name={nameIcons} size={25} color='#000'/>
      </View>
    </>
  );
};

export default IconTouch;
