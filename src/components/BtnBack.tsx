//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface BtnBackProps{
    Funccion: any
}
// create a component
const BtnBack = ({Funccion}:BtnBackProps) => {
    return (
        <TouchableOpacity style={styles.container} onPress={Funccion} activeOpacity={0.9}>
            <Icon
            name='chevron-back'
            size={30}
            color='#009DA6'
          />
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#2c3e50',
        borderRadius: 500

    },
});

//make this component available to the app
export default BtnBack;
