import { normalize } from '../utils/size';

export const fontSizes = {
  xxsmall: normalize(8),
  xsmall: normalize(10),
  small: normalize(12),
  regular: normalize(14),
  large: normalize(16),
  xlarge: normalize(20),
  xxlarge: normalize(24),
};

export const fontWeights = {
  thin: '300',
  regular: '400',
  semibold: '600',
  bold: '700',
  xbold: '900',
};

export const fontSizesProps = Object.keys(fontSizes).map((key) => key);
export const fontWeightsProps = Object.keys(fontWeights).map((key) => key);
