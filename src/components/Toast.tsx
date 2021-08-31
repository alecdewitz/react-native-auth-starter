// import React from 'react';
// import {
//     View,
//     Component,
//     TouchableHighlight,
//     StyleSheet,
//     Text
// } from 'react-native';
// import _ from 'lodash';
// import RootSiblings from 'react-native-root-siblings';
// import AppFonts from '../assets/fonts';

// const styles = StyleSheet.create({
//     container: {
//         position: 'absolute',
//         alignSelf: 'center',
//         backgroundColor: '#000000CC',
//         bottom: 80,
//         marginHorizontal: 50,
//         paddingVertical: 5,
//         borderRadius: 20,
//         paddingHorizontal: 15
//     },
//     text: {
//         color: 'white',
//         fontSize: 18,
//         fontFamily: AppFonts.Regular,
//         textAlign: 'center'
//     }
// })

// let toast = null
// let timer = null

// const ToastComponent = (props) => {
//     const { text } = props
//     return (
//         <View style={styles.container}>
//             <Text style={styles.text}>{text}</Text>
//         </View>
//     )
// }

// function show(message, duration = 2000) {

//     if (!(typeof message == 'string' && message.length > 0)) return
//     // Check if toast already exist then distory it
//     if (toast) {
//         toast.destroy();
//         toast = null;
//     }
//     if (timer) {
//         clearTimeout(timer);
//         timer = null
//     }

//     // show new toast
//     toast = new RootSiblings(<ToastComponent text={message} />);
//     // set timer to distory the toast
//     timer = setTimeout(() => {
//         toast && toast.destroy();
//     }, duration)
// }

// export default {
//     ToastComponent,
//     show
// }

import React from 'react';
import { View, TouchableHighlight, StyleSheet, Text } from 'react-native';
import _ from 'lodash';
import RootSiblings from 'react-native-root-siblings';
import AppFonts from '../assets/fonts';
import theme from '../common/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.primary + 'AA',
    marginHorizontal: 50,
    paddingVertical: 5,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontFamily: AppFonts.Poppins_Regular,
    textAlign: 'center',
  },
});

let toast = null;
let timer = null;

const ToastComponent = (props) => {
  const { text, error } = props;
  return (
    <View
      style={{
        // ...StyleSheet.absoluteFill,
        // justifyContent: 'center',
        // alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 70,
      }}>
      <View
        style={[
          styles.container,
          error && {
            backgroundColor: theme.red + 'AA',
          },
        ]}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

function show(message, duration = 2000, error = false) {
  if (!(typeof message == 'string' && message.length > 0)) return;
  // Check if toast already exist then distory it
  if (toast) {
    toast.destroy();
    toast = null;
  }
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }

  // show new toast
  toast = new RootSiblings(<ToastComponent text={message} error={error} />);
  // set timer to distory the toast
  timer = setTimeout(() => {
    toast && toast.destroy();
  }, duration);
}

function showError(message, duration = 2000) {
  show(message, duration, true);
}

export default {
  ToastComponent,
  show,
  showError,
};
