import {StyleSheet} from 'react-native';
import {Colors, normalize} from '../../../theme/Styles';

const styles = StyleSheet.create({
  container: {
    flexGrow:  1,
    justifyContent: 'center',
    alignItems: 'center',
    // height: 601,
    // backgroundColor: '#333',
    paddingVertical:20,
    gap: 10,
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  containerAuth: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
  },
  containerBtn:{
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 160,
    paddingVertical: 10
  },
  title: {
    fontSize: normalize(40),
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
