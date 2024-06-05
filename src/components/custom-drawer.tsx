import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Drawer,
  Paper,
  Typography,
  DrawerProps,
  Button,
} from "@mui/material";
import React, { ReactNode } from "react";

function CustomDrawer({
  DrawerProps,
  title,
  subtitle,
  cancelText,
  submitText,
  onCancel,
  onSubmit,
  disabled,
  bottom,
  children,
}: {
  DrawerProps?: DrawerProps;
  title: string;
  subtitle?: string;
  cancelText?: string;
  submitText?: string;
  onCancel?: () => void;
  onSubmit?: () => void;
  disabled?: boolean;
  bottom?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Drawer
      anchor="right"
      disableEscapeKeyDown
      {...DrawerProps}
      PaperProps={{
        sx: { maxWidth: "640px", ...DrawerProps?.PaperProps?.sx },
        ...DrawerProps?.PaperProps,
      }}
    >
      <Paper elevation={16} sx={{ borderRadius: 0, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            p: 3,
            pb: bottom ? 0 : 3,
          }}
        >
          <Box>
            <Box
              sx={{ cursor: "pointer" }}
              onClick={() => DrawerProps?.onClose?.({}, "backdropClick")}
            >
              <Typography variant="body2" sx={{ mb: 1 }}>
                <ArrowBack
                  fontSize="small"
                  sx={{
                    verticalAlign: "middle",
                  }}
                />{" "}
                Đóng
              </Typography>
            </Box>
            <Typography variant="h4">{title}</Typography>
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                color: "text.secondary",
              }}
            >
              {subtitle}
            </Typography>
          </Box>
          <div>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
              }}
            >
              {onCancel && (
                <Button
                  color="inherit"
                  variant="contained"
                  onClick={onCancel}
                  className=" text-white bg-[#0284c7]"
                >
                  {cancelText || "Hủy bỏ"}
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={onSubmit}
                className=" text-white bg-[#0284c7]"
              >
                {submitText || "Xác nhận"}
              </Button>
            </Box>
          </div>
        </Box>
        {bottom}
      </Paper>
      {children}
    </Drawer>
  );
}

export default CustomDrawer;
