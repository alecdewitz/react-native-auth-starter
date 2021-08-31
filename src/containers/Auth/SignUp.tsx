import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Button, NavBar, Text, TextInput } from '../../components';
import Actions from '../../store/actions';
import { SIGNUP_SUCCESS } from '../../store/actions/types';
import { createLoadingSelector } from '../../store/selectors';
import Colors from '../../themes/colors';
import { normalize } from '../../utils/size';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  firstName: Yup.string().required('First name is a required field'),
  lastName: Yup.string().required('First name is a required field'),
});

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: normalize(20),
    borderTopRightRadius: normalize(20),
    paddingHorizontal: normalize(20),
  },
  title: {
    paddingVertical: normalize(20),
  },
  flexGrow: {
    flexGrow: 1,
  },
  safe: {
    flex: 1,
    paddingBottom: normalize(20),
  },
});

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();

  const signUp = (values) =>
    dispatch(
      signUp({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      }),
    );

  const isLoading = useSelector(createLoadingSelector([SIGNUP_SUCCESS]));

  return (
    <View style={styles.flex}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          <KeyboardAwareScrollView contentContainerStyle={styles.flexGrow}>
            <Text centered weight="bold" size="xlarge" style={styles.title}>
              Register a new account
            </Text>
            <Formik
              onSubmit={signUp}
              validationSchema={validationSchema}
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
              }}>
              {({ handleSubmit }) => (
                <View style={styles.flex}>
                  <View style={styles.flex}>
                    <TextInput
                      type="text"
                      error={''}
                      touched={false}
                      name="firstName"
                      icon="user"
                      placeholder="First name"
                    />
                    <TextInput
                      type="text"
                      error={''}
                      touched={false}
                      name="lastName"
                      icon="user"
                      placeholder="Last name"
                    />
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
                  <Button style={{}} variant="blue" onPress={handleSubmit} isLoading={isLoading}>
                    <Text color="white" weight="bold">
                      Sign Up
                    </Text>
                  </Button>
                </View>
              )}
            </Formik>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

SignUp.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default SignUp;
