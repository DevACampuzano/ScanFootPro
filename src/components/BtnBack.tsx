//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface BtnBackProps{
    Funccion: any
}
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

const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 500
    },
});

export default BtnBack;
