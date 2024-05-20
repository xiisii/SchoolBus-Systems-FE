import type { ChangeEvent, FC } from 'react';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import { Button, Checkbox, FormControlLabel, Menu, MenuItem, SvgIcon } from '@mui/material';
import { usePopover } from 'src/hooks/use-popover';

interface MultiSelectProps {
  label: string;
  // Same as type as the value received above
  onChange?: (value: any[]) => void;
  options: { label: string; value: unknown; }[];
  // This should accept string[], number[] or boolean[]
  value: any[];
}

export const MultiSelect: FC<MultiSelectProps> = (props) => {
  const { label, onChange, options, value = [], ...other } = props;
  const popover = usePopover<HTMLButtonElement>();

  const handleValueChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      let newValue = [...value];

      if (event.target.checked) {
        newValue.push(event.target.value);
      } else {
        newValue = newValue.filter((item) => item !== event.target.value);
      }

      onChange?.(newValue);
    },
    [onChange, value]
  );

  return (
    <>
      <Button
        color="inherit"
        endIcon={(
          <SvgIcon>
            <ChevronDownIcon />
          </SvgIcon>
        )}
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
        {...other}
      >
        {label}
      </Button>
      <Menu
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        open={popover.open}
        PaperProps={{ style: { width: 250 } }}
      >
        {options.map((option) => (
          <MenuItem key={option.label}>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={value.includes(option.value)}
                  onChange={handleValueChange}
                  value={option.value}
                />
              )}
              label={option.label}
              sx={{
                flexGrow: 1,
                mr: 0
              }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

MultiSelect.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired
};
