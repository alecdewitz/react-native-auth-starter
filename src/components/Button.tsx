import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { normalize } from '../utils/size';
import PropTypes from 'prop-types';
import Colors, { colorsProps } from '../themes/colors';

const styles = StyleSheet.create({
  container: {
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(16),
    borderRadius: normalize(5),
    alignItems: 'center',
  },
});

const Button = ({
  activeOpacity = 0.8,
  children,
  variant,
  onPress,
  isLoading = false,
  style = {},
  ...otherProps
}: any) => (
  <TouchableOpacity
    activeOpacity={activeOpacity}
    disabled={isLoading}
    style={[styles.container, { backgroundColor: Colors[variant] }, style]}
    onPress={onPress}
    {...otherProps}>
    {!isLoading && children}
    {isLoading && <ActivityIndicator color={Colors.white} />}
  </TouchableOpacity>
);

Button.propTypes = {
  children: PropTypes.any.isRequired,
  variant: PropTypes.oneOf(colorsProps),
  onPress: PropTypes.func.isRequired,
  style: PropTypes.any,
  isLoading: PropTypes.bool,
};

Button.defaultProps = {
  variant: 'blue',
  style: {},
  isLoading: false,
};

export default Button;
