import {StyleSheet} from 'react-native';
import { normalize } from '../../../theme/Styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 100,
    gap: 20
  },
  containerAuth: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10, 
    gap: 10
  },
  shoes:{
    width: '100%',
    height: 480,
    borderColor: 'red',
    marginTop: -100
  },
  title:{
    fontSize: normalize(33),
    color: '#009DA6',
    fontWeight: 'bold',
    width: '90%'
  },
  text:{ 
    fontSize: normalize(20),
    color: '#000',
    width: '90%'
  }
});

export default styles;
