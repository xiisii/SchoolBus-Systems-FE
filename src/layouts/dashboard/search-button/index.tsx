import type { FC } from 'react';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import { IconButton, SvgIcon, Tooltip } from '@mui/material';
import { useDialog } from 'src/hooks/use-dialog';
import { SearchDialog } from './search-dialog';

export const SearchButton: FC = () => {
  const dialog = useDialog();

  return (
    <>
      <Tooltip title="Search">
        <IconButton onClick={dialog.handleOpen}>
          <SvgIcon>
            <SearchMdIcon />
          </SvgIcon>
        </IconButton>
      </Tooltip>
      <SearchDialog
        onClose={dialog.handleClose}
        open={dialog.open}
      />
    </>
  );
};
