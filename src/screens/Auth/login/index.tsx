import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import styles from './Styles';
import {InputText} from '../../../components/InputText';
import Butukon from '../../../components/Butukon';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {RootTopTabParams} from '../../../navigations/TopTabNavigatorAuth';
import useForm from '../../../hooks/useForm';
import useAuth from '../../../hooks/useAuth';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

interface Props extends MaterialTopTabScreenProps<RootTopTabParams, 'login'> {}

const Login = ({route, navigation}: Props) => {
  const {GoToDashBoard, GoToForgotPassword}: any = route.params;
  const [userGoogle, setUserGoogle] = useState({});
  const {form, onChange, resetForm} = useForm({
    email: '',
    password: '',
  });
  const {signIn, SigInGoolge} = useAuth();
  const height = useSharedValue(380);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      justifyContent: 'space-around',
      width: '100%',
      alignItems: 'center',
      // backgroundColor: 'red',
      height: height.value,
    };
  });
  Keyboard.addListener('keyboardDidShow', () => {
    animateHeight(280);
  });
  Keyboard.addListener('keyboardDidHide', () => {
    animateHeight(380);
  });
  const animateHeight = (x: any) => {
    height.value = withTiming(x, {duration: 100});
  };
  const Todash = () => {
    GoToDashBoard();
  };

  return (
    // <DismissKeyboard>
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../../../assets/img/fondo1.2.jpg')}
        style={{
          position: 'absolute',
          top: -110,
          opacity: 0.1,
          width: '100%',
          height: 450,
        }}
      />
      <Animated.View style={animatedStyle}>
        <InputText
          onchageText={e => onChange(e, 'email')}
          name="Correo"
          Type="Email"
          color="#364989"
          value={form.email}
        />
        <InputText
          onchageText={e => onChange(e, 'password')}
          name="Contraseña"
          IconName="mail-outline"
          Type="Password"
          color="#364989"
          value={form.password}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => GoToForgotPassword()}>
          <Text style={{color: '#000'}}>¿Olvidaste la contraseña?</Text>
        </TouchableOpacity>
        <Butukon
          title="Inicia sesión"
          height={60}
          border={20}
          onclick={() => signIn(form, Todash)}
        />
        <View style={styles.sectionBotton}>
          <Text style={styles.parrafo}>¿Necesitas una cuenta?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('register')}
            activeOpacity={0.9}>
            <Text style={{...styles.parrafo, color: '#000'}}>Registrate</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <View
        style={{
          // borderWidth: 1,
          // borderColor: 'red',
          width: '100%',
          alignItems: 'center',
          gap: 20,
        }}>
        <Text
          style={{
            color: '#000',
            fontWeight: 'bold',
          }}>
          O inicia sesión con:
        </Text>
        <Butukon
          title="Inicia sesión"
          height={60}
          border={20}
          onclick={() => SigInGoolge(Todash)}
          icon="logo-google"
        />
      </View>
    </ScrollView>
  );
};

export default Login;
