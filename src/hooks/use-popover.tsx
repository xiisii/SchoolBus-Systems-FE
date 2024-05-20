import type { MutableRefObject } from "react";
import { useCallback, useRef, useState } from "react";

interface PopoverController<T> {
  anchorRef: MutableRefObject<T | null>;
  handleOpen: () => void;
  handleClose: () => void;
  handleToggle: () => void;
  setAnchorRef: (node: T | null) => void;
  open: boolean;
}

export function usePopover<T = HTMLElement>(): PopoverController<T> {
  const anchorRef = useRef<T | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = useCallback((): void => {
    setOpen(true);
  }, []);

  const handleClose = useCallback((): void => {
    setOpen(false);
  }, []);

  const handleToggle = useCallback((): void => {
    setOpen((prevState) => !prevState);
  }, []);

  const setAnchorRef = useCallback(
    (node: T | null): void => {
      anchorRef.current = node;
    },
    [anchorRef]
  );

  return {
    anchorRef,
    handleClose,
    handleOpen,
    handleToggle,
    setAnchorRef,
    open,
  };
}
