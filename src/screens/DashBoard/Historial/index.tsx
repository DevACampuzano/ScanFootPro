import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import styles from './Styles';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerDashBoardParams} from '../../../navigations/DrawerDashBoard';
import {InputText} from '../../../components/InputText';
import {DismissKeyboard} from '../../../components/DismissKeyboard';
import {ObjectFoot, data} from '../../../interfaces/data';
import CardFoot from '../../../components/CardFoot';
import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import {AppContext} from '../../../contexts/AppContext';
import {useApi} from '../../../hooks/useApi';
import Toast from 'react-native-toast-message';
import MyWebView from '../../../components/MyWebView';

interface Props extends DrawerScreenProps<DrawerDashBoardParams, 'Home'> {}

const Historial = (props: Props) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [refreshing, setRefreshing] = useState(false);
  const {setIsLoading, isLoading} = useContext(AppContext);
  const urlApi = 'https://a-pi-medical.vercel.app/';
  const {loadApi} = useApi(urlApi);
  const GetData = async () => {
    try {
      setIsLoading(true);
      try {
        const resp: any = await loadApi({
          endpoint: 'pie',
          type: 'get',
        });
        console.log(resp.data);
        setIsLoading(false);
        setData(resp.data);
        // Actualiza filteredData aquí, después de setData
        setFilteredData(resp.data);
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: `${error.message}`,
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetData();
  }, []);
  console.log('---Data ', data);
  const handleSearch = (text: string) => {
    if (!text) {
      setFilteredData(data); // Restaurar todos los datos si el campo está vacío
    } else {
      const lowerCaseText = text.toLowerCase();
      setFilteredData(
        data.filter(item => item.name.toLowerCase().includes(lowerCaseText)),
      );
    }
  };
  const onRefresh = React.useCallback(() => {
    setIsLoading(true);
    GetData();
  }, []);
  const urL = [
    'https://3-d-eta.vercel.app/1',
    'https://3-d-eta.vercel.app/2',
    'https://3-d-eta.vercel.app/1',
  ];
  return (
    <DismissKeyboard>
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
        <View
          style={{
            height: 120,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5,
          }}>
          <Text style={styles.title}>Historial de pacientes</Text>
          <InputText
            name="Búsqueda"
            IconName="funnel-outline"
            onchageText={handleSearch}
          />
        </View>
        <FlatList
          onRefresh={onRefresh}
          refreshing={refreshing}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={() => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 100,
              }}>
              <Text style={{...styles.title, fontSize: 20}}>
                No hay coincidencias
              </Text>
            </View>
          )}
          style={{
            width: '100%',
          }}
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <CardFoot
              date={item.date}
              id={item.id}
              img={item.img}
              name={item.name}
              url={urL[item.id]}
            />
            // </TouchableOpacity>
          )}
        />
      </View>
    </DismissKeyboard>
  );
};

export default Historial;
