import { Close } from "@mui/icons-material";
import {
  TextField,
  MenuItem,
  Typography,
  IconButton,
  Menu,
  Stack,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface CustomerSelectOption {
  value: string | number;
  label: string;
  href?: string;
}
const CustomSelect = ({
  value,
  options,
  onSelect,
}: {
  value: string | number;
  options: CustomerSelectOption[];
  onSelect: (value: string | number) => void;
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  const handleOpenMenu = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSelectOption = (option: CustomerSelectOption) => {
    onSelect(option.value);
    if (option.href) {
      router.push(option.href);
    }
    handleCloseMenu();
  };

  const menuItemStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const closeStyle = {
    marginLeft: "8px",
  };

  return (
    <>
      <TextField
        label="Chi nhánh"
        onClick={handleOpenMenu}
        value={options.find((o) => o.value == value)?.label}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        style={{ marginTop: "8px" }}
      >
        <Stack direction="row" alignItems="center" px={2}>
          <Typography variant="h6">Công ty/Chi nhánh</Typography>
          <IconButton style={closeStyle} onClick={handleCloseMenu}>
            <Close />
          </IconButton>
        </Stack>
        {options.map((option: CustomerSelectOption) => (
          <MenuItem
            key={option.value}
            style={menuItemStyle}
            onClick={() => handleSelectOption(option)}
            selected={option.value == value}
          >
            <Typography>{option.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default CustomSelect;
