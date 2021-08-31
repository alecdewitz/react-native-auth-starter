import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
// import { GoogleSignin } from '@react-native-community/google-signin';
import { Logo } from '../../assets/images';
import { Button, Text, TextInput } from '../../components';
import { login } from '../../store/actions/auth';
import Colors from '../../themes/colors';
import { normalize } from '../../utils/size';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logo: {
    width: normalize(200),
    height: normalize(150),
  },
  content: {
    backgroundColor: Colors.white,
    padding: normalize(20),
    flex: 1,
    borderTopLeftRadius: normalize(20),
    borderTopRightRadius: normalize(20),
  },
  button: {
    marginLeft: normalize(10),
    borderRadius: normalize(20),
    height: normalize(40),
    width: normalize(40),
    paddingVertical: 0,
    paddingHorizontal: 0,
    justifyContent: 'center',
  },
  socials: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.5,
  },
  active: {
    marginHorizontal: normalize(10),
    borderColor: Colors.blue,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: normalize(10),
    borderBottomWidth: 2,
  },
  passive: {
    flex: 1,
    alignItems: 'center',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  flexGrow: {
    flexGrow: 1,
  },
});

const SignIn = ({ navigation }) => {
  const dispatch = useDispatch();

  const signIn: any = (values) => dispatch(login(values.email, values.password));

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.flexGrow}>
      <View style={styles.header}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
        <Text color="gray">React Native Auth Starter</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.nav}>
          <TouchableOpacity style={styles.active}>
            <Text weight="bold" color="blue">
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.passive} onPress={() => navigation.navigate('Sign Up')}>
            <Text weight="bold" color="gray">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <Formik
          onSubmit={signIn}
          validationSchema={validationSchema}
          initialValues={{
            email: '',
            password: '',
          }}>
          {({ handleSubmit }) => (
            <View style={styles.flex}>
              <View style={styles.inputContainer}>
                <TextInput
                  type="email"
                  error={''}
                  touched={false}
                  name="email"
                  icon="mail"
                  placeholder="Email address"
                />
                <TextInput
                  type="password"
                  error={''}
                  touched={false}
                  name="password"
                  secureTextEntry
                  icon="lock"
                  placeholder="Password"
                />
              </View>
              <Button style={{}} variant="blue" onPress={handleSubmit} isLoading={false}>
                <Text color="white" weight="bold">
                  Sign In
                </Text>
              </Button>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
};

SignIn.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default SignIn;
