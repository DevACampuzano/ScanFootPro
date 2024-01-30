import {StyleSheet} from 'react-native';
import {Colors, normalize} from '../../../theme/Styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    // justifyContent: 'space-between'
  },
  containerAuth: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 110
  },
  shoes: {
    width: 400,
    height: 450,
    borderColor: 'red',
    marginTop: -100,
    position: 'absolute',
    top: -30,
    left: -20,
    opacity: 0.5,
  },
  title: {
    fontSize: normalize(50),
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

export default styles;
