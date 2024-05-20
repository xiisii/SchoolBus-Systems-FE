import type { FC } from "react";
import { useMemo } from "react";
import PropTypes from "prop-types";
import Menu01Icon from "@untitled-ui/icons-react/build/esm/Menu01";
import type { Theme } from "@mui/material";
import { Box, IconButton, Stack, SvgIcon, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Logo } from "src/components/logo";
import { RouterLink } from "src/components/router-link";
import { Scrollbar } from "src/components/scrollbar";
import { usePathname } from "src/hooks/use-pathname";
import { paths } from "src/paths";
import type { NavColor } from "src/types/settings";
import { ContactsButton } from "../contacts-button";
import type { Section } from "../config/config";
import { LanguageSwitch } from "../language-switch";
import { NotificationsButton } from "../notifications-button";
import { TenantSwitch } from "../tenant-switch";
import { TopNavSection } from "./top-nav-section";

const useCssVars = (color: NavColor): Record<string, string> => {
  const theme = useTheme();

  return useMemo((): Record<string, string> => {
    switch (color) {
      case "blend-in":
        if (theme.palette.mode === "dark") {
          return {
            "--nav-bg": theme.palette.background.default,
            "--nav-color": theme.palette.neutral[100],
            "--nav-divider-color": theme.palette.neutral[800],
            "--nav-border-color": theme.palette.neutral[700],
            "--nav-logo-border": theme.palette.neutral[700],
            "--nav-item-color": theme.palette.neutral[400],
            "--nav-item-hover-bg": "rgba(255, 255, 255, 0.04)",
            "--nav-item-active-bg": "rgba(255, 255, 255, 0.04)",
            "--nav-item-active-color": theme.palette.text.primary,
            "--nav-item-disabled-color": theme.palette.neutral[600],
            "--nav-item-icon-color": theme.palette.neutral[500],
            "--nav-item-icon-active-color": theme.palette.primary.main,
            "--nav-item-icon-disabled-color": theme.palette.neutral[700],
            "--nav-item-chevron-color": theme.palette.neutral[700],
            "--nav-scrollbar-color": theme.palette.neutral[400],
          };
        } else {
          return {
            "--nav-bg": theme.palette.background.default,
            "--nav-color": theme.palette.text.primary,
            "--nav-divider-color": theme.palette.divider,
            "--nav-border-color": theme.palette.neutral[100],
            "--nav-logo-border": theme.palette.neutral[100],
            "--nav-section-title-color": theme.palette.neutral[400],
            "--nav-item-color": theme.palette.text.secondary,
            "--nav-item-hover-bg": theme.palette.action.hover,
            "--nav-item-active-bg": theme.palette.action.selected,
            "--nav-item-active-color": theme.palette.text.primary,
            "--nav-item-disabled-color": theme.palette.neutral[400],
            "--nav-item-icon-color": theme.palette.neutral[400],
            "--nav-item-icon-active-color": theme.palette.primary.main,
            "--nav-item-icon-disabled-color": theme.palette.neutral[400],
            "--nav-item-chevron-color": theme.palette.neutral[400],
            "--nav-scrollbar-color": theme.palette.neutral[900],
          };
        }

      case "discreet":
        if (theme.palette.mode === "dark") {
          return {
            "--nav-bg": theme.palette.neutral[900],
            "--nav-color": theme.palette.neutral[100],
            "--nav-divider-color": theme.palette.neutral[800],
            "--nav-border-color": theme.palette.neutral[700],
            "--nav-logo-border": theme.palette.neutral[700],
            "--nav-item-color": theme.palette.neutral[400],
            "--nav-item-hover-bg": "rgba(255, 255, 255, 0.04)",
            "--nav-item-active-bg": "rgba(255, 255, 255, 0.04)",
            "--nav-item-active-color": theme.palette.text.primary,
            "--nav-item-disabled-color": theme.palette.neutral[600],
            "--nav-item-icon-color": theme.palette.neutral[500],
            "--nav-item-icon-active-color": theme.palette.primary.main,
            "--nav-item-icon-disabled-color": theme.palette.neutral[700],
            "--nav-item-chevron-color": theme.palette.neutral[700],
            "--nav-scrollbar-color": theme.palette.neutral[400],
          };
        } else {
          return {
            "--nav-bg": theme.palette.neutral[50],
            "--nav-color": theme.palette.text.primary,
            "--nav-divider-color": theme.palette.neutral[200],
            "--nav-border-color": theme.palette.divider,
            "--nav-logo-border": theme.palette.neutral[200],
            "--nav-section-title-color": theme.palette.neutral[500],
            "--nav-item-color": theme.palette.neutral[500],
            "--nav-item-hover-bg": theme.palette.action.hover,
            "--nav-item-active-bg": theme.palette.action.selected,
            "--nav-item-active-color": theme.palette.text.primary,
            "--nav-item-disabled-color": theme.palette.neutral[400],
            "--nav-item-icon-color": theme.palette.neutral[400],
            "--nav-item-icon-active-color": theme.palette.primary.main,
            "--nav-item-icon-disabled-color": theme.palette.neutral[400],
            "--nav-item-chevron-color": theme.palette.neutral[400],
            "--nav-scrollbar-color": theme.palette.neutral[900],
          };
        }

      case "evident":
        if (theme.palette.mode === "dark") {
          return {
            "--nav-bg": theme.palette.neutral[800],
            "--nav-color": theme.palette.common.white,
            "--nav-divider-color": theme.palette.neutral[700],
            "--nav-border-color": "transparent",
            "--nav-logo-border": theme.palette.neutral[700],
            "--nav-item-color": theme.palette.neutral[400],
            "--nav-item-hover-bg": "rgba(255, 255, 255, 0.04)",
            "--nav-item-active-bg": "rgba(255, 255, 255, 0.04)",
            "--nav-item-active-color": theme.palette.common.white,
            "--nav-item-disabled-color": theme.palette.neutral[500],
            "--nav-item-icon-color": theme.palette.neutral[400],
            "--nav-item-icon-active-color": theme.palette.primary.main,
            "--nav-item-icon-disabled-color": theme.palette.neutral[500],
            "--nav-item-chevron-color": theme.palette.neutral[600],
            "--nav-scrollbar-color": theme.palette.neutral[400],
          };
        } else {
          return {
            "--nav-bg": theme.palette.neutral[800],
            "--nav-color": theme.palette.common.white,
            "--nav-divider-color": theme.palette.neutral[700],
            "--nav-border-color": "transparent",
            "--nav-logo-border": theme.palette.neutral[700],
            "--nav-item-color": theme.palette.neutral[400],
            "--nav-item-hover-bg": "rgba(255, 255, 255, 0.04)",
            "--nav-item-active-bg": "rgba(255, 255, 255, 0.04)",
            "--nav-item-active-color": theme.palette.common.white,
            "--nav-item-disabled-color": theme.palette.neutral[500],
            "--nav-item-icon-color": theme.palette.neutral[400],
            "--nav-item-icon-active-color": theme.palette.primary.main,
            "--nav-item-icon-disabled-color": theme.palette.neutral[500],
            "--nav-item-chevron-color": theme.palette.neutral[600],
            "--nav-scrollbar-color": theme.palette.neutral[400],
          };
        }

      default:
        return {};
    }
  }, [theme, color]);
};

interface TopNavProps {
  color?: NavColor;
  onMobileNav?: () => void;
  sections?: Section[];
}

export const TopNav: FC<TopNavProps> = (props) => {
  const { color = "evident", onMobileNav, sections = [] } = props;
  const pathname = usePathname();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const cssVars = useCssVars(color);

  return (
    <Box
      component="header"
      sx={{
        ...cssVars,
        backgroundColor: "var(--nav-bg)",
        borderBottomColor: "var(--nav-border-color)",
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        color: "var(--nav-color)",
        left: 0,
        position: "sticky",
        top: 0,
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{
          px: 3,
          py: 1,
        }}
      >
        <Stack alignItems="center" direction="row" spacing={2}>
          {!mdUp && (
            <IconButton onClick={onMobileNav}>
              <SvgIcon>
                <Menu01Icon />
              </SvgIcon>
            </IconButton>
          )}
          <Box
            component={RouterLink}
            href={paths.index}
            sx={{
              borderColor: "var(--nav-logo-border)",
              borderRadius: 1,
              borderStyle: "solid",
              borderWidth: 1,
              display: "inline-flex",
              height: 40,
              p: "4px",
              width: 40,
            }}
          >
            <Logo />
          </Box>
          <TenantSwitch />
        </Stack>
        <Stack alignItems="center" direction="row" spacing={2}>
          <LanguageSwitch />
          <NotificationsButton />
          <ContactsButton />
        </Stack>
      </Stack>
      {mdUp && (
        <Box
          sx={{
            borderTopWidth: 1,
            borderTopStyle: "solid",
            borderTopColor: "var(--nav-divider-color)",
          }}
        >
          <Scrollbar
            sx={{
              "& .simplebar-scrollbar:before": {
                background: "var(--nav-scrollbar-color)",
              },
            }}
          >
            <Stack
              alignItems="center"
              component="nav"
              direction="row"
              spacing={1}
              sx={{
                px: 2,
                py: 1.5,
              }}
            >
              {sections.map((section, index) => (
                <TopNavSection
                  items={section.items}
                  key={index}
                  pathname={pathname}
                  subheader={section.subheader}
                />
              ))}
            </Stack>
          </Scrollbar>
        </Box>
      )}
    </Box>
  );
};

TopNav.propTypes = {
  color: PropTypes.oneOf<NavColor>(["blend-in", "discreet", "evident"]),
  onMobileNav: PropTypes.func,
  sections: PropTypes.array,
};
