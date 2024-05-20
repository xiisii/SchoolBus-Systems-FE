import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogProps,
  ButtonPropsColorOverrides,
  ButtonTypeMap,
} from "@mui/material";
import { ReactNode } from "react";

export const ConfirmDialog = ({
  title,
  children,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  loading,
  color,
  ...DialogProps
}: {
  title: string;
  children: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  color?: ButtonTypeMap["props"]["color"];
} & DialogProps) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      {...DialogProps}
      PaperProps={{
        sx: { borderRadius: 2, ...DialogProps?.PaperProps?.sx },
        ...DialogProps.PaperProps,
      }}
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>{children}</DialogContent>

      <DialogActions>
        <Button color="inherit" onClick={onCancel}>
          {cancelText || "Hủy bỏ"}
        </Button>
        <Button
          variant="contained"
          color={color}
          onClick={onConfirm}
          disabled={loading}
        >
          {confirmText || "Xác nhận"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
