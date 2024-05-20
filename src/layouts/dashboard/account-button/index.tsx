import type { FC } from "react";
import User01Icon from "@untitled-ui/icons-react/build/esm/User01";
import { Avatar, Box, ButtonBase, SvgIcon } from "@mui/material";
import { usePopover } from "src/hooks/use-popover";
import { useAuth } from "src/hooks/use-auth";
import { AccountPopover } from "./account-popover";

export const AccountButton: FC = () => {
  const { user } = useAuth();
  const popover = usePopover<HTMLButtonElement>();

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
        sx={{
          alignItems: "center",
          display: "flex",
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: "divider",
          height: 40,
          width: 40,
          borderRadius: "50%",
        }}
      >
        <Avatar
          sx={{
            height: 32,
            width: 32,
          }}
          // src={user?.avatar}
        >
          <SvgIcon>
            <User01Icon />
          </SvgIcon>
        </Avatar>
      </Box>
      <AccountPopover
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        open={popover.open}
      />
    </>
  );
};
