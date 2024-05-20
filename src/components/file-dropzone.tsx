import type { FC } from "react";
import PropTypes from "prop-types";
import type { DropzoneOptions, FileWithPath } from "react-dropzone";
import { useDropzone } from "react-dropzone";
import Upload01Icon from "@untitled-ui/icons-react/build/esm/Upload01";
import XIcon from "@untitled-ui/icons-react/build/esm/X";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import { bytesToSize } from "src/utils/bytes-to-size";
import { FileIcon } from "./file-icon";
import { BoxProps } from "@mui/system";

export type File = FileWithPath;

interface FileDropzoneProps extends DropzoneOptions {
  caption?: string | React.ReactNode;
  title?: string;
  files?: File[];
  onRemove?: (file: File) => void;
  onRemoveAll?: () => void;
  onUpload?: () => void;
  type?: "single" | "multiple";
}

export const FileDropzone: FC<FileDropzoneProps & { sx?: BoxProps["sx"] }> = (
  props
) => {
  const {
    caption,
    files = [],
    onRemove,
    onRemoveAll,
    onUpload,
    title,
    type = "multiple",
    sx,
    ...other
  } = props;
  const { getRootProps, getInputProps, isDragActive } = useDropzone(other);

  const hasAnyFiles = files.length > 0;

  return (
    <div>
      <Box
        sx={{
          alignItems: "center",
          border: 1,
          borderRadius: 1,
          borderStyle: "dashed",
          borderColor: "divider",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          outline: "none",
          p: 6,
          ...(isDragActive && {
            backgroundColor: "action.active",
            opacity: 0.5,
          }),
          "&:hover":
            hasAnyFiles && type === "single"
              ? {}
              : {
                  backgroundColor: "action.hover",
                  cursor: "pointer",
                  opacity: 0.5,
                },
          ...sx,
        }}
        {...getRootProps()}
      >
        {(!hasAnyFiles || (hasAnyFiles && type === "multiple")) && (
          <>
            <input {...getInputProps()} />
            <Stack alignItems="center" direction="row" spacing={2}>
              <Avatar
                sx={{
                  height: 64,
                  width: 64,
                }}
              >
                <SvgIcon>
                  <Upload01Icon />
                </SvgIcon>
              </Avatar>
              <Stack spacing={1}>
                <Typography variant="h6">
                  {title || "Nhấn để tải lên hoặc kéo thả"}
                </Typography>
                {caption && <Typography>{caption}</Typography>}
              </Stack>
            </Stack>
          </>
        )}

        {hasAnyFiles && type === "single" ? (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                width: "100%",
                alignItems: "center",
              }}
            >
              <img
                src={"/assets/excel.png"}
                alt="preview"
                style={{
                  aspectRatio: "1/1",
                  height: "40px",
                  objectFit: "cover",
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6">Đã tải lên</Typography>
                <Typography
                  sx={{
                    color: "success.dark",
                    mt: 1,
                  }}
                >
                  {files.map((file) => file.name).join(", ")}
                </Typography>
              </Box>
              <Stack spacing={2} direction="row">
                <Button
                  onClick={() => {
                    onUpload?.();
                  }}
                  size="small"
                  type="button"
                  variant="outlined"
                >
                  Tải lại
                </Button>
                <Button
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveAll?.();
                  }}
                  size="small"
                  type="button"
                >
                  Hủy
                </Button>
              </Stack>
            </Box>
          </>
        ) : (
          <></>
        )}
      </Box>
      {hasAnyFiles && type === "multiple" && (
        <Box sx={{ mt: 2 }}>
          <List>
            {files.map((file) => {
              const extension = file.name.split(".").pop();

              return (
                <ListItem
                  key={file.path}
                  sx={{
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 1,
                    "& + &": {
                      mt: 1,
                    },
                  }}
                >
                  <ListItemIcon>
                    <FileIcon extension={extension} />
                  </ListItemIcon>
                  <ListItemText
                    primary={file.name}
                    primaryTypographyProps={{ variant: "subtitle2" }}
                    secondary={bytesToSize(file.size)}
                  />
                  <Tooltip title="Xóa">
                    <IconButton edge="end" onClick={() => onRemove?.(file)}>
                      <SvgIcon>
                        <XIcon />
                      </SvgIcon>
                    </IconButton>
                  </Tooltip>
                </ListItem>
              );
            })}
          </List>
        </Box>
      )}
    </div>
  );
};

FileDropzone.propTypes = {
  caption: PropTypes.string,
  files: PropTypes.array,
  onRemove: PropTypes.func,
  onRemoveAll: PropTypes.func,
  onUpload: PropTypes.func,
  // From Dropzone
  accept: PropTypes.objectOf(
    PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  ),
  disabled: PropTypes.bool,
  getFilesFromEvent: PropTypes.func,
  maxFiles: PropTypes.number,
  maxSize: PropTypes.number,
  minSize: PropTypes.number,
  noClick: PropTypes.bool,
  noDrag: PropTypes.bool,
  noDragEventsBubbling: PropTypes.bool,
  noKeyboard: PropTypes.bool,
  onDrop: PropTypes.func,
  onDropAccepted: PropTypes.func,
  onDropRejected: PropTypes.func,
  onFileDialogCancel: PropTypes.func,
  preventDropOnDocument: PropTypes.bool,
};
