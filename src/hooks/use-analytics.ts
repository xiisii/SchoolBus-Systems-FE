import { useEffect } from 'react';
import type { GTMConfig } from 'src/libs/gtm';
import { gtm } from 'src/libs/gtm';

export function useAnalytics(config: GTMConfig) {
  useEffect(
    () => {
      gtm.initialize(config);
    },
    [config]
  );
}
