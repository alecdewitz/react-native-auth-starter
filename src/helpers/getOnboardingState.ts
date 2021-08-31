import AsyncStorage from '@react-native-community/async-storage';
import { defaultOnboardingState } from '../models/onboardingState';

export const getOnboardingLocalStorage = async () => {
  try {
    let onboarding = JSON.parse(await AsyncStorage.getItem('onboarding')!);
    if (!onboarding) {
      onboarding = defaultOnboardingState;
      await AsyncStorage.setItem('onboarding', JSON.stringify(onboarding));
    }
    return onboarding;
  } catch (e) {
    await AsyncStorage.setItem('onboarding', JSON.stringify(defaultOnboardingState));
    return defaultOnboardingState;
  }
};
