export const Constants = {
  languageCode: 'en',
  DynamicParams: null,
};

export function setLanguageCode(code) {
  Constants.languageCode = code;
}

export default {
  ...Constants,
  setLanguageCode,
};
