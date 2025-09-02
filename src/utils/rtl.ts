import { I18nManager } from 'react-native';

export const isRTL = I18nManager.isRTL;

export const getFlexDirection = (reverse = false) => {
  if (isRTL) {
    return reverse ? 'row' : 'row-reverse';
  }
  return reverse ? 'row-reverse' : 'row';
};

export const getTextAlign = () => {
  return isRTL ? 'right' : 'left';
};

export const getMarginStart = (value: number) => {
  return isRTL ? { marginRight: value } : { marginLeft: value };
};

export const getMarginEnd = (value: number) => {
  return isRTL ? { marginLeft: value } : { marginRight: value };
};

export const getPaddingStart = (value: number) => {
  return isRTL ? { paddingRight: value } : { paddingLeft: value };
};

export const getPaddingEnd = (value: number) => {
  return isRTL ? { paddingLeft: value } : { paddingRight: value };
};