import {StyleSheet, Dimensions, Platform, PixelRatio} from 'react-native';

export const ScreenSize = Dimensions.get('screen');
export const WindowSize = Dimensions.get('window');

export const Colors = {
  primary: '#364989',
  secondary: '#009DA6',
};

export const normalize = (size: number) => {
  const scale =
    WindowSize.width < 450 ? WindowSize.width / 400 : WindowSize.width / 700;
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

export const normalizeWidth = (size: number) => {
  const scale =
    WindowSize.width * 2 < 900
      ? (WindowSize.width * 2) / 800
      : (WindowSize.width * 2) / 1400;
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

export const globalStyles = StyleSheet.create({
  btn: {
    backgroundColor: 'red',
  },
  title: {
    fontSize: normalize(20),
    fontWeight: 'bold',
  },
});
