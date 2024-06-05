import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogProps,
  Typography,
  Stack,
  DialogContent,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import useFunction from "src/hooks/use-function";

function TitleConfirmRemoveDialog({
  titleText,
  content,
  onConfirm = async () => {},
  ...dialogProps
}: DialogProps & {
  titleText: string;
  content: string;
  onConfirm?: () => Promise<void>;
}) {
  const onConfirmHelper = useFunction(onConfirm, {
    successMessage: "Đã xoá!",
  });

  return (
    <Dialog fullWidth maxWidth="xs" {...dialogProps}>
      <DialogTitle sx={{ pt: 4 }}>
        <Typography variant="h6">{titleText}</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle2" color="text.secondary">
          {content}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="error"
          onClick={async (e) => {
            const { error } = await onConfirmHelper.call({});
            if (!error) {
              dialogProps.onClose?.(e, "escapeKeyDown");
            }
          }}
          disabled={onConfirmHelper.loading}
          className=" text-white bg-[#cd3333]"
        >
          Xoá dữ liệu
        </Button>
        <Button
          variant="contained"
          color={"inherit"}
          disabled={onConfirmHelper.loading}
          onClick={(e) => {
            dialogProps.onClose?.(e, "escapeKeyDown");
          }}
        >
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TitleConfirmRemoveDialog;
