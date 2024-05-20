import { useMemo, type FC } from "react";
import PropTypes from "prop-types";
import Menu01Icon from "@untitled-ui/icons-react/build/esm/Menu01";
import type { Theme } from "@mui/material";
import {
  Box,
  IconButton,
  Stack,
  SvgIcon,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { ContactsButton } from "../contacts-button";
import { NotificationsButton } from "../notifications-button";
import { AccountButton } from "../account-button";
import CustomSelect from "./custom-select";
import { useStationsContext } from "src/contexts/stations/stations-context";
import { useRouter } from "next/router";

const TOP_NAV_HEIGHT: number = 64;
const SIDE_NAV_WIDTH: number = 280;

interface TopNavProps {
  onMobileNavOpen?: () => void;
}

export const TopNav: FC<TopNavProps> = (props) => {
  const { onMobileNavOpen, ...other } = props;
  // const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

  const router = useRouter();
  const { getStationsApi, currentStation } = useStationsContext();
  const stationOptions = useMemo(() => {
    return (getStationsApi.data || []).map((station) => {
      // const stationPath = router.pathname.replace(
      //   /dashboard\/(can-da|can-gach)\/\d+/g,
      //   ""
      // );
      return {
        value: station.id,
        href: router.pathname.replace("[stationId]", station.id.toString()),
        label: station.name,
      };
    });
  }, [getStationsApi.data, router.pathname]);

  return (
    <Box
      component="header"
      sx={{
        backdropFilter: "blur(6px)",
        backgroundColor: (theme) =>
          alpha(theme.palette.background.default, 0.8),
        position: "sticky",
        left: {
          lg: `${SIDE_NAV_WIDTH}px`,
        },
        top: 0,
        width: {
          lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
        },
        zIndex: (theme) => theme.zIndex.appBar,
      }}
      {...other}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{
          minHeight: TOP_NAV_HEIGHT,
          px: 2,
        }}
      >
        <Stack alignItems="center" direction="row" spacing={2}>
          {/* {!lgUp && (
            <IconButton onClick={onMobileNavOpen}>
              <SvgIcon>
                <Menu01Icon />
              </SvgIcon>
            </IconButton>
          )} */}
          {/* <SearchButton /> */}

          {currentStation && (
            <CustomSelect
              value={currentStation?.id || 0}
              options={stationOptions}
              onSelect={(value) => console.log("value", value)}
            />
          )}
        </Stack>
        <Stack alignItems="center" direction="row" spacing={2}>
          {/* <LanguageSwitch /> */}
          <NotificationsButton />
          <ContactsButton />
          <AccountButton />
        </Stack>
      </Stack>
    </Box>
  );
};

TopNav.propTypes = {
  onMobileNavOpen: PropTypes.func,
};
