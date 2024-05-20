import type { FC, ReactNode } from "react";
import { useCallback, useState } from "react";
import PropTypes from "prop-types";

import { Box, ButtonBase, Collapse, SvgIcon } from "@mui/material";
import { RouterLink } from "src/components/router-link";

interface MobileNavItemProps {
  active?: boolean;
  children?: ReactNode;
  depth?: number;
  disabled?: boolean;
  external?: boolean;
  icon?: ReactNode;
  label?: ReactNode;
  open?: boolean;
  path?: string;
  title: string;
}

export const MobileNavItem: FC<MobileNavItemProps> = (props) => {
  const {
    active,
    children,
    depth = 0,
    disabled,
    external,
    icon,
    label,
    open: openProp,
    path,
    title,
  } = props;
  const [open, setOpen] = useState<boolean>(!!openProp);

  const handleToggle = useCallback((): void => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  // Icons can be defined at top level only, deep levels have bullets instead of actual icons.

  let startIcon: ReactNode;

  if (depth === 0) {
    startIcon = icon;
  } else {
    startIcon = (
      <Box
        sx={{
          alignItems: "center",
          display: "center",
          height: 20,
          justifyContent: "center",
          width: 20,
        }}
      >
        <Box
          sx={{
            borderRadius: "50%",
            backgroundColor: "var(--nav-item-icon-color)",
            height: 4,
            opacity: 0, // remove this if you want it to be visible
            width: 4,
            ...(active && {
              backgroundColor: "var(--nav-item-icon-active-color)",
              height: 6,
              opacity: 1,
              width: 6,
            }),
          }}
        />
      </Box>
    );
  }

  const offset = depth === 0 ? 0 : (depth - 1) * 16;

  // Branch

  if (children) {
    return (
      <li>
        <ButtonBase
          disabled={disabled}
          onClick={handleToggle}
          sx={{
            alignItems: "center",
            borderRadius: 1,
            display: "flex",
            justifyContent: "flex-start",
            pl: `${16 + offset}px`,
            pr: "16px",
            py: "6px",
            textAlign: "left",
            width: "100%",
            ...(active && {
              ...(depth === 0 && {
                backgroundColor: "var(--nav-item-active-bg)",
              }),
            }),
            "&:hover": {
              backgroundColor: "var(--nav-item-hover-bg)",
            },
          }}
        >
          {startIcon && (
            <Box
              component="span"
              sx={{
                alignItems: "center",
                color: "var(--nav-item-icon-color)",
                display: "inline-flex",
                justifyContent: "center",
                mr: 2,
                ...(active && {
                  color: "var(--nav-item-icon-active-color)",
                }),
              }}
            >
              {startIcon}
            </Box>
          )}
          <Box
            component="span"
            sx={{
              color: "var(--nav-item-color)",
              flexGrow: 1,
              fontFamily: (theme) => theme.typography.fontFamily,
              fontSize: depth > 0 ? 13 : 14,
              fontWeight: depth > 0 ? 500 : 600,
              lineHeight: "24px",
              whiteSpace: "nowrap",
              ...(active && {
                color: "var(--nav-item-active-color)",
              }),
              ...(disabled && {
                color: "var(--nav-item-disabled-color)",
              }),
            }}
          >
            {title}
          </Box>
          <SvgIcon
            sx={{
              color: "var(--nav-item-chevron-color)",
              fontSize: 16,
              ml: 2,
            }}
          >
            {open ? (
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            ) : (
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            )}
          </SvgIcon>
        </ButtonBase>
        <Collapse in={open} sx={{ mt: 0.5 }}>
          {children}
        </Collapse>
      </li>
    );
  }

  // Leaf

  const linkProps = path
    ? external
      ? {
          component: "a",
          href: path,
          target: "_blank",
        }
      : {
          component: RouterLink,
          href: path,
        }
    : {};

  return (
    <li>
      <ButtonBase
        disabled={disabled}
        sx={{
          alignItems: "center",
          borderRadius: 1,
          display: "flex",
          justifyContent: "flex-start",
          pl: `${16 + offset}px`,
          pr: "16px",
          py: "6px",
          textAlign: "left",
          width: "100%",
          ...(active && {
            ...(depth === 0 && {
              backgroundColor: "var(--nav-item-active-bg)",
            }),
          }),
          "&:hover": {
            backgroundColor: "var(--nav-item-hover-bg)",
          },
        }}
        {...linkProps}
      >
        {startIcon && (
          <Box
            component="span"
            sx={{
              alignItems: "center",
              color: "var(--nav-item-icon-color)",
              display: "inline-flex",
              justifyContent: "center",
              mr: 2,
              ...(active && {
                color: "var(--nav-item-icon-active-color)",
              }),
            }}
          >
            {startIcon}
          </Box>
        )}
        <Box
          component="span"
          sx={{
            color: "var(--nav-item-color)",
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: depth > 0 ? 13 : 14,
            fontWeight: depth > 0 ? 500 : 600,
            lineHeight: "24px",
            whiteSpace: "nowrap",
            ...(active && {
              color: "var(--nav-item-active-color)",
            }),
            ...(disabled && {
              color: "var(--nav-item-disabled-color)",
            }),
          }}
        >
          {title}
        </Box>
        {label && (
          <Box component="span" sx={{ ml: 2 }}>
            {label}
          </Box>
        )}
      </ButtonBase>
    </li>
  );
};

MobileNavItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  depth: PropTypes.number,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  open: PropTypes.bool,
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
};
