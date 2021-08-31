import { Platform, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const baseWidth = SCREEN_WIDTH / 375;

export function scale(size) {
  if (Platform.OS === 'ios') {
    return Math.round(baseWidth * size);
  }
  return Math.round(baseWidth * size) - 1;
}

export function isIphoneX() {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (SCREEN_HEIGHT === 812 || SCREEN_WIDTH === 812 || SCREEN_HEIGHT === 896 || SCREEN_WIDTH === 896)
  );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

export const normalize = (size) => size + (scale(size) - size);

export const getScreenWidth = () => SCREEN_WIDTH;

export const getScreenHeight = () => SCREEN_HEIGHT;

export const getAspectRatio = (WIDTH) => Math.floor((4 / 3) * WIDTH);

export const isPortrait = (WIDTH, HEIGHT) => HEIGHT >= WIDTH;
