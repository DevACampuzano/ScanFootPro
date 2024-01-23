import {StyleSheet} from 'react-native';
import { Colors, normalize } from '../../../theme/Styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#ffdddd',
  },
  containerAuth: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#ff5757',
    paddingVertical: 10,
    gap: 10
  },
  shoes:{
    width: '100%',
    height: 480,
    borderColor: 'red',
    // borderWidth: 1,
    marginTop: -100
  },
  title:{
    fontSize: normalize(25),
    color: Colors.primary,
    fontWeight: 'bold',
  }
});

export default styles;
