import RaygunClient, { RaygunClientOptions } from 'raygun4reactnative';
import React, { useEffect } from 'react';
import { LogBox, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { ToastBannerPresenter, ToastBannerProvider } from 'react-native-toast-banner';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppLoading from './containers/AppLoading';
import AppNavigator from './navigators/app';
import configureStore from './store';

FeatherIcon.loadFont();
IonIcon.loadFont();
FaIcon.loadFont();
AntIcon.loadFont();

// StatusBar.setTranslucent(true);
// StatusBar.setBackgroundColor('transparent');
StatusBar.setBarStyle('dark-content');

const options: RaygunClientOptions = {
  apiKey: '_YOUR_API_KEY_',
  enableCrashReporting: true,
};

RaygunClient.init(options);

LogBox.ignoreLogs([
  'Calling `getNode()` on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.',
  'Warning: React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.',
]);
// LogBox.ignoreAllLogs(true);

const { persistor, store } = configureStore();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ToastBannerProvider>
          <PersistGate loading={<AppLoading />} persistor={persistor}>
            <AppNavigator />
          </PersistGate>
          <ToastBannerPresenter />
        </ToastBannerProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
