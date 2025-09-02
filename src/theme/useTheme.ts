import { useColorScheme } from 'react-native';
import { colors as lightColors } from './tokens';

const darkColors = {
  ...lightColors,
  bg: lightColors.darkBg,
  bgAlt: lightColors.darkBgElevated,
  bgCard: lightColors.darkBgElevated,
  ink: lightColors.darkInk,
  mutedInk: lightColors.darkMutedInk,
  lightInk: '#94A3B8',
  border: lightColors.darkBorder,
  borderLight: lightColors.darkBorder,
};

export function useTheme() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  return {
    colors: isDark ? darkColors : lightColors,
    isDark,
  };
}