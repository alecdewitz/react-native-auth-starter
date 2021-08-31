import React from 'react';
import { Text as RNText } from 'react-native';
import AppFonts from '../assets/fonts';
import Colors from '../themes/colors';
import { fontSizes, fontWeights } from '../themes/fonts';
import { normalize } from '../utils/size';

const styles = {
  fontFamily: AppFonts.Poppins_Regular,
  letterSpacing: -0.3,
};

type Props = {
  style?: any;
  children: any;
  centered?;
  flex?;
  size?;
  weight?: string;
  color?: string;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  p?: boolean;
  bold?: boolean;
  italic?: boolean;
};

const Text = ({
  style,
  children,
  centered,
  flex,
  size = 'regular',
  weight = 'regular',
  color = 'black',
  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  bold,
  italic,
  ...otherProps
}: Props) => {
  return (
    <RNText
      allowFontScaling={true}
      style={[
        styles,
        centered && {
          textAlign: 'center',
        },
        flex && {
          flex: 1,
        },
        {
          color: Colors[color],
          fontSize: fontSizes[size],
          fontWeight: fontWeights[weight],
        },
        h1 && { fontSize: normalize(40) },
        h2 && { fontSize: normalize(32) },
        h3 && { fontSize: normalize(20) },
        h4 && { fontSize: normalize(18) },
        h5 && { fontSize: normalize(16) },
        p && { fontSize: normalize(12) },
        bold && { fontWeight: 'bold' },
        italic && { fontStyle: 'italic' },
        style,
      ]}
      {...otherProps}>
      {children}
    </RNText>
  );
};

export default Text;
