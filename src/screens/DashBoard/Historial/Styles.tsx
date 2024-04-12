import {StyleSheet} from 'react-native';
import {Colors, normalize} from '../../../theme/Styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  title: {
    fontSize: normalize(30),
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

export default styles;
