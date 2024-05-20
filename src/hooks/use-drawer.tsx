import { useCallback, useState } from "react";

interface DrawerController<T> {
  data?: T;
  handleClose: () => void;
  handleOpen: (data?: T) => void;
  open: boolean;
}

export function useDrawer<T = unknown>(): DrawerController<T> {
  const [state, setState] = useState<{ open: boolean; data?: T }>({
    open: false,
    data: undefined,
  });

  const handleOpen = useCallback((data?: T): void => {
    setState({
      open: true,
      data,
    });
  }, []);

  const handleClose = useCallback((): void => {
    setState({
      open: false,
    });
  }, []);

  return {
    data: state.data,
    handleClose,
    handleOpen,
    open: state.open,
  };
}
