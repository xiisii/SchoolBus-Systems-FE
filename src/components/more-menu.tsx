import type { FC } from 'react';
import ArchiveIcon from '@untitled-ui/icons-react/build/esm/Archive';
import ClipboardIcon from '@untitled-ui/icons-react/build/esm/Clipboard';
import DotsHorizontalIcon from '@untitled-ui/icons-react/build/esm/DotsHorizontal';
import Download01Icon from '@untitled-ui/icons-react/build/esm/Download01';
import FileCheck03Icon from '@untitled-ui/icons-react/build/esm/FileCheck03';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  SvgIcon,
  Tooltip
} from '@mui/material';
import { usePopover } from 'src/hooks/use-popover';

export const MoreMenu: FC = (props) => {
  const popover = usePopover<HTMLButtonElement>();

  return (
    <>
      <Tooltip title="More options">
        <IconButton
          onClick={popover.handleOpen}
          ref={popover.anchorRef}
          {...props}
        >
          <SvgIcon>
            <DotsHorizontalIcon />
          </SvgIcon>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={popover.anchorRef.current}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom'
        }}
        onClose={popover.handleClose}
        open={popover.open}
        PaperProps={{
          sx: {
            maxWidth: '100%',
            width: 200
          }
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }}
      >
        <MenuItem onClick={popover.handleClose}>
          <ListItemIcon>
            <SvgIcon>
              <Download01Icon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText primary="Import" />
        </MenuItem>
        <MenuItem onClick={popover.handleClose}>
          <ListItemIcon>
            <SvgIcon>
              <FileCheck03Icon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText primary="Export" />
        </MenuItem>
        <MenuItem onClick={popover.handleClose}>
          <ListItemIcon>
            <SvgIcon>
              <ClipboardIcon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText primary="Copy" />
        </MenuItem>
        <MenuItem onClick={popover.handleClose}>
          <ListItemIcon>
            <SvgIcon>
              <ArchiveIcon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText primary="Archive" />
        </MenuItem>
      </Menu>
    </>
  );
};
