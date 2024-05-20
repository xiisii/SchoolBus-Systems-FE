import { useEffect } from 'react';
import { gtm } from 'src/libs/gtm';

export const usePageView = (): void => {
  useEffect(
    () => {
      gtm.push({ event: 'page_view' });
    },
    []
  );
};
