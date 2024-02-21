import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './Styles';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerDashBoardParams } from '../../../navigations/DrawerDashBoard';
import {InputText} from '../../../components/InputText';
import {DismissKeyboard} from '../../../components/DismissKeyboard';
import { ObjectFoot } from '../../../interfaces/data';
import CardFoot from '../../../components/CardFoot';
import { FlatList } from 'react-native-gesture-handler';

interface Props extends DrawerScreenProps<DrawerDashBoardParams, 'Home'> {}

const Historial = (props: Props) => {
  const data: ObjectFoot[] = [
    {
      id: 1,
      name: 'Archbivo_1.png',
      date: '2024-02-07',
      img: 'https://firebasestorage.googleapis.com/v0/b/fb-picporter.appspot.com/o/man%2FNEW%20BALL%201.png?alt=media&token=60b9cdbe-a0dc-447d-9bf6-d6f9e40846b9',
    },
    {
      id: 2,
      name: 'Archbivo_2.png',
      date: '2024-02-07',
      img: 'https://belleza-estetica.com.ar/wp-content/uploads/2023/11/anatomia-pie.jpg',
    },
    {
      id: 2,
      name: 'Archbivo_3.png',
      date: '2024-02-07',
      img: 'https://images.pexels.com/photos/356175/pexels-photo-356175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 1,
      name: 'Archbivo_4.png',
      date: '2024-02-07',
      img: 'https://images.pexels.com/photos/105776/pexels-photo-105776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 2,
      name: 'Archbivo_5.png',
      date: '2024-02-07',
      img: 'https://firebasestorage.googleapis.com/v0/b/fb-picporter.appspot.com/o/man%2FNEW%20BALL%201.png?alt=media&token=60b9cdbe-a0dc-447d-9bf6-d6f9e40846b9',
    },
    {
      id: 2,
      name: 'Archbivo_6.png',
      date: '2024-02-07',
      img: 'https://images.pexels.com/photos/2112021/pexels-photo-2112021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 1,
      name: 'Archbivo_7.png',
      date: '2024-02-07',
      img: 'https://images.pexels.com/photos/9664045/pexels-photo-9664045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 2,
      name: 'Archbivo_8.png',
      date: '2024-02-07',
      img: 'https://images.pexels.com/photos/5936266/pexels-photo-5936266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 2,
      name: 'Archbivo_9.png',
      date: '2024-02-07',
      img: 'https://firebasestorage.googleapis.com/v0/b/fb-picporter.appspot.com/o/man%2FNEW%20BALL%201.png?alt=media&token=60b9cdbe-a0dc-447d-9bf6-d6f9e40846b9',
    },
  ];
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (text: string) => {
    if (!text) {
      setFilteredData(data); // Restaurar todos los datos si el campo está vacío
    } else {
      const lowerCaseText = text.toLowerCase();
      setFilteredData(data.filter(item => item.name.toLowerCase().includes(lowerCaseText)));
    }
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <Image
          source={require('../../../assets/img/pie.png')}
          style={{
            position: 'absolute',
            top: -110,
            opacity:  0.3,
            width: '100%',
            height:  500,
          }}
        />
        <View style={{
          height:  120,
          justifyContent: 'center',
          alignItems: 'center',
          gap:  5,
        }}>
          <Text style={styles.title}>Historial de pacientes</Text>
          <InputText
            name="Búsqueda"
            IconName="funnel-outline"
            onchageText={handleSearch}
          />
        </View>
        <FlatList
        ListEmptyComponent={() => (
          <View style={{
            alignItems:'center',
            justifyContent: 'center',
            height: 100
          }}>
            <Text style={{...styles.title, fontSize: 20}}>No hay coincidencias</Text>
          </View>
        )}
        style={{
          width: '100%',
        }}
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <CardFoot
            date={item.date}
            id={item.id}
            // img={item.img}
            name={item.name}
          />
        )}
      />
      </View>
    </DismissKeyboard>
  );
};

export default Historial;