import { Dimensions } from 'react-native';

const ScaledSize = Dimensions.get('window');

export default {
  screenWidth: ScaledSize.width,
  screenHeight: ScaledSize.height,
};
