import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from '../components';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../themes/colors';
import { normalize } from '../utils/size';
import { getCurrentUser } from '../store/selectors';
import { logout } from '../store/actions/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: normalize(20),
  },
  content: {
    borderRadius: normalize(5),
    backgroundColor: Colors.white,
    padding: normalize(20),
  },
  code: {
    borderRadius: normalize(5),
    backgroundColor: Colors.offwhite,
    padding: normalize(20),
    marginBottom: normalize(20),
    height: 500,
  },
  title: {
    marginBottom: normalize(20),
  },
});

const Private = () => {
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);

  const logOut = () => dispatch(logout());
  return (
    <View style={styles.container}>
      <Text size="xlarge" weight="bold" centered style={styles.title}>
        {`Welcome back, ${user && user.firstName}!`}
      </Text>
      <View style={styles.content}>
        <View style={styles.code}>
          <Text style={{ fontSize: normalize(8) }}>{user && JSON.stringify(user, null, 2)}</Text>
        </View>
        <Button variant="black" isLoading={false} style={{}} onPress={logOut}>
          <Text color="white">Sign Out</Text>
        </Button>
      </View>
    </View>
  );
};

export default Private;
