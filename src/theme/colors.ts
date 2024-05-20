import type { PaletteColor } from '@mui/material';
import type { NeutralColors } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

const withAlphas = (color: PaletteColor): PaletteColor => {
  return {
    ...color,
    alpha4: alpha(color.main, 0.04),
    alpha8: alpha(color.main, 0.08),
    alpha12: alpha(color.main, 0.12),
    alpha30: alpha(color.main, 0.30),
    alpha50: alpha(color.main, 0.50)
  };
};

export const neutral: NeutralColors = {
  50: '#F8F9FA',
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D2D6DB',
  400: '#9DA4AE',
  500: '#6C737F',
  600: '#4D5761',
  700: '#2F3746',
  800: '#1C2536',
  900: '#111927'
};

export const black = withAlphas({
  lightest: neutral[50],
  light: neutral[100],
  main: neutral[500],
  dark: neutral[700],
  darkest: neutral[900],
  contrastText: '#FFFFFF'
});

export const blue = withAlphas({
  lightest: '#F5F8FF',
  light: '#EBEFFF',
  main: '#2970FF',
  dark: '#004EEB',
  darkest: '#00359E',
  contrastText: '#FFFFFF'
});

export const green = withAlphas({
  lightest: '#F6FEF9',
  light: '#EDFCF2',
  main: '#16B364',
  dark: '#087443',
  darkest: '#084C2E',
  contrastText: '#FFFFFF'
});

export const indigo = withAlphas({
  lightest: '#F5F7FF',
  light: '#EBEEFE',
  main: '#6366F1',
  dark: '#4338CA',
  darkest: '#312E81',
  contrastText: '#FFFFFF'
});

export const purple = withAlphas({
  lightest: '#F9F5FF',
  light: '#F4EBFF',
  main: '#9E77ED',
  dark: '#6941C6',
  darkest: '#42307D',
  contrastText: '#FFFFFF'
});

export const success = withAlphas({
  lightest: '#F0FDF9',
  light: '#3FC79A',
  main: '#10B981',
  dark: '#0B815A',
  darkest: '#134E48',
  contrastText: '#FFFFFF'
});

export const info = withAlphas({
  lightest: '#ECFDFF',
  light: '#CFF9FE',
  main: '#06AED4',
  dark: '#0E7090',
  darkest: '#164C63',
  contrastText: '#FFFFFF'
});

export const warning = withAlphas({
  lightest: '#FFFAEB',
  light: '#FEF0C7',
  main: '#F79009',
  dark: '#B54708',
  darkest: '#7A2E0E',
  contrastText: '#FFFFFF'
});

export const error = withAlphas({
  lightest: '#FEF3F2',
  light: '#FEE4E2',
  main: '#F04438',
  dark: '#B42318',
  darkest: '#7A271A',
  contrastText: '#FFFFFF'
});
