import { DefaultTheme } from '@react-navigation/native';
const colors = {
  black: '#1a202c',
  white: 'white',
  gray: '#718096',
  offwhite: '#edf2f7',
  blue: DefaultTheme.colors.primary,
  red: '#f56565',
  transparent: 'transparent',
  facebook: '#4267B2',
  google: '#DB4437',
};

export const colorsProps = Object.keys(colors).map((key) => key);

export default colors;
