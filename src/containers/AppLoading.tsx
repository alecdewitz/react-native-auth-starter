import React from 'react';
import { View } from 'react-native';
import { Text } from '../components';
import Colors from '../themes/colors';

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.blue,
  },
};

export default function AppLoading() {
  return (
    <View style={styles.container}>
      <Text style={{ color: 'white' }}>Loading...</Text>
    </View>
  );
}
