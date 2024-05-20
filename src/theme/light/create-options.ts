import type { ThemeOptions } from '@mui/material';
import type { ColorPreset, Contrast } from '../index';
import { createComponents } from './create-components';
import { createPalette } from './create-palette';
import { createShadows } from './create-shadows';

interface Config {
  colorPreset?: ColorPreset;
  contrast?: Contrast;
}

export const createOptions = ({ colorPreset, contrast }: Config): ThemeOptions => {
  const palette = createPalette({ colorPreset, contrast });
  const components = createComponents({ palette });
  const shadows = createShadows();

  return {
    components,
    palette,
    shadows
  };
};
