import React from 'react';
import { View, StyleSheet } from 'react-native';
import { normalize } from '../utils/size';

const Card = (props) => {
  return <View style={{ ...styles.card, ...props.style }}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.08,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 1,
    backgroundColor: 'white',
    padding: normalize(16),
    borderRadius: 10,
  },
});

export default Card;
