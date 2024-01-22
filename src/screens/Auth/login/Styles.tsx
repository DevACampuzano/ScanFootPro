import {StyleSheet} from 'react-native';
import {Colors, normalize} from '../../../theme/Styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  containerAuth: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
  },
  title: {
    fontSize: normalize(50),
    color: Colors.primary,
    fontWeight: 'bold',
  },
  parrafo: {
    fontSize: normalize(18),
    color: Colors.primary,
    fontWeight: 'bold',
  },
  sectionBotton:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  }
});

export default styles;
