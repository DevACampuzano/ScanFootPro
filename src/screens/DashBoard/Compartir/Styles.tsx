import {StyleSheet} from 'react-native';
import { Colors, normalize } from '../../../theme/Styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    // backgroundColor: '#ffdddd',
    // justifyContent: 'space-between'
    justifyContent: 'center',
    alignItems: 'center'
  },
  title:{
    fontSize: normalize(30),
    color: Colors.primary,
    fontWeight: 'bold',
  }
});

export default styles;
