import capitalize from 'lodash/capitalize';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Platform, StyleSheet, TextInput as RNTextInput, View } from 'react-native';
import { handleTextInput } from 'react-native-formik';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../themes/colors';
import { normalize } from '../../utils/size';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        paddingVertical: normalize(10),
      },
    }),
  },
  input: {
    fontSize: normalize(14),
    flex: 1,
    color: Colors.black,
  },
  active: {
    color: Colors.blue,
  },
  passive: {
    color: Colors.red,
  },
  focused: {
    borderBottomColor: Colors.blue,
  },
  errored: {
    borderBottomColor: Colors.red,
  },
  error: {
    paddingVertical: normalize(5),
  },
  icon: {
    marginRight: normalize(20),
  },
});

const TextInput = ({ placeholder, error, icon, ...otherProps }) => {
  const [isFocused, setFocus] = useState(false);

  const onBlur = () => setFocus(false);

  const onFocus = () => setFocus(true);

  const isError = error !== null && !isFocused;

  const getIconColor = () => {
    if (isFocused) {
      return Colors.blue;
    }
    return isError ? Colors.red : Colors.gray;
  };

  return (
    <>
      <View style={[styles.container, isFocused && styles.focused, isError && styles.errored]}>
        {icon && (
          <Icon name={icon} size={normalize(16)} color={getIconColor()} style={styles.icon} />
        )}
        <RNTextInput
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          onEndEditing={onBlur}
          autoCapitalize="none"
          style={[styles.input, isFocused && styles.active, isError && styles.passive]}
          {...otherProps}
        />
      </View>
      <Text color="red" size="small" style={styles.error}>
        {error && capitalize(error)}
      </Text>
    </>
  );
};

TextInput.propTypes = {
  error: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

TextInput.defaultProps = {
  error: null,
  icon: null,
};

export default handleTextInput(TextInput);
