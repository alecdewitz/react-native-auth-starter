import { I18nManager } from 'react-native';
import memoize from 'lodash.memoize';
import i18n from 'i18n-js';

const translations = {
  // lazy requires (metro bundler does not support symlinks)
  en: () => require('./en.json'),
};

export const AvailableLanguages = {
  en: {
    languageTag: 'en',
    name: 'english',
    isRTL: false,
  },
};

export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

export const setI18nConfig = (_languageTag) => {
  // fallback if no available language fits
  const fallback = { languageTag: 'en', isRTL: false };

  //   const {languageTag, isRTL} =
  //     RNLocalize.findBestAvailableLanguage(Object.keys(translations)) || fallback;
  const { languageTag, isRTL } = AvailableLanguages[_languageTag] || AvailableLanguages['en'];

  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = { [languageTag]: translations[languageTag]() };
  i18n.locale = languageTag;
};
