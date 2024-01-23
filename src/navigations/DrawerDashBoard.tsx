import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerHome from '../screens/DashBoard/Home';
import Escaner from '../screens/DashBoard/Escaner';
import Historial from '../screens/DashBoard/Historial';
import Compartir from '../screens/DashBoard/Compartir';
import {normalize} from '../theme/Styles';
import Tutorial from '../screens/DashBoard/Tutorial';

export type DrawerDashBoardParams = {
  Escaner: any;
  Home: any;
  Historial: any;
  Tutorial: any;
  Compartir: any;
};

const Drawer = createDrawerNavigator<DrawerDashBoardParams>();

function CustomDrawerContent(props) {
  const {state, navigation, ...rest} = props;

  const sections = [
    {title: 'Section 1', data: ['Home', 'Escaner', 'Historial']},
    {title: 'Section 2', data: ['Compartir', 'Tutorial']},
    // Agrega aquí más secciones según sea necesario
  ];

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          //   backgroundColor: 'red',
          paddingHorizontal: 20,
          marginTop: 60,
        }}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          }}
          style={styles.image}
        />
        {/* <Image source={require('./path-to-your-image.png')} style={styles.image} /> */}
        <Text style={styles.text}>Nombre de el usuario</Text>
      </View>

      <FlatList
        data={sections}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View
            style={{
              //   backgroundColor: 'red',
              marginTop: 5,
              //  paddingHorizontal: 10,
              gap: 5,
            }}>
            {/* <Text style={styles.sectionTitle}>{item.title}</Text> */}
            {item.data.map((subItem, subIndex) => (
              <TouchableOpacity
                key={subIndex}
                onPress={() => navigation.navigate(subItem)}
                style={{
                  ...styles.button,
                  backgroundColor:
                    state.routeNames[state.index] === subItem
                      ? '#009DA6'
                      : 'transparent',
                }}>
                <Icon
                  name={
                    subItem === 'Home'
                      ? 'home-outline'
                      : subItem === 'Escaner'
                      ? 'qr-code-outline'
                      : subItem === 'Historial'
                      ? 'time-outline'
                      : subItem === 'Tutorial'
                      ? 'information-circle-outline'
                      : 'share-social-outline'
                  }
                  size={30}
                  color={ 
                    state.routeNames[state.index] === subItem ? '#fff' : '#000'
                  }
                />
                <Text
                  style={{
                    color:
                      state.routeNames[state.index] === subItem
                        ? '#fff'
                        : '#000',
                  }}>
                  {subItem}
                </Text>
              </TouchableOpacity>
            ))}
            <View style={styles.divider} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 500,
  },
  text: {
    fontSize: normalize(18),
    color: '#000',
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    gap: 6,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginBottom: 10,
  },
});

function DrawerDashBoard() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={DrawerHome} />
      <Drawer.Screen name="Escaner" component={Escaner} />
      <Drawer.Screen name="Historial" component={Historial} />
      <Drawer.Screen name="Compartir" component={Compartir} />
      <Drawer.Screen name="Tutorial" component={Tutorial} />
    </Drawer.Navigator>
  );
}

export default DrawerDashBoard;
