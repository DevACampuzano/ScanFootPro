import {StyleSheet} from 'react-native';
import {Colors, normalize} from '../../../theme/Styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
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
    marginTop: -80
  },
  title:{
    fontSize: normalize(50),
    color: Colors.primary,
    fontWeight: 'bold',
  }
});

export default styles;
