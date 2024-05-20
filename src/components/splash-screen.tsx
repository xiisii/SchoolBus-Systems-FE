import type { FC } from 'react';
import { Box } from '@mui/material';
import { Logo } from './logo';

export const SplashScreen: FC = () => (
  <Box
    sx={{
      alignItems: 'center',
      backgroundColor: 'background.paper',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      justifyContent: 'center',
      left: 0,
      p: 3,
      position: 'fixed',
      top: 0,
      width: '100vw',
      zIndex: 1400
    }}
  >
    <Box
      sx={{
        display: 'inline-flex',
        height: 48,
        width: 48
      }}
    >
      <Logo />
    </Box>
  </Box>
);
