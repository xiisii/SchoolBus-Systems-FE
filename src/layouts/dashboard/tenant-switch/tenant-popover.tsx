import type { FC } from 'react';
import { MenuItem, Popover } from '@mui/material';

interface TenantPopoverProps {
  anchorEl: null | Element;
  onChange?: (tenant: string) => void;
  onClose?: () => void;
  open?: boolean;
  tenants: string[];
}

export const TenantPopover: FC<TenantPopoverProps> = (props) => {
  const { anchorEl, onChange, onClose, open = false, tenants, ...other } = props;

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'bottom'
      }}
      disableScrollLock
      transformOrigin={{
        horizontal: 'right',
        vertical: 'top'
      }}
      keepMounted
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 180 } }}
      {...other}
    >
      {tenants.map((tenant) => (
        <MenuItem
          key={tenant}
          onClick={() => onChange?.(tenant)}
        >
          {tenant}
        </MenuItem>
      ))}
    </Popover>
  );
};
