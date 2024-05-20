import type { Components } from "@mui/material/styles/components";
import {
  createTheme,
  inputLabelClasses,
  tableCellClasses,
} from "@mui/material";

// Used only to create transitions
const muiTheme = createTheme();

export const createComponents = (): Components => {
  return {
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          textTransform: "none",
        },
        sizeSmall: {
          padding: "6px 16px",
        },
        sizeMedium: {
          padding: "8px 20px",
        },
        sizeLarge: {
          padding: "11px 24px",
        },
        textSizeSmall: {
          padding: "7px 12px",
        },
        textSizeMedium: {
          padding: "9px 16px",
        },
        textSizeLarge: {
          padding: "12px 16px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "32px 24px",
          "&:last-child": {
            paddingBottom: "32px",
          },
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: "h6",
        },
        subheaderTypographyProps: {
          variant: "body2",
        },
      },
      styleOverrides: {
        root: {
          padding: "32px 24px 16px",
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        checkedIcon: (
          <svg
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M9 3.5C5.68629 3.5 3 6.18629 3 9.5V15.5C3 18.8137 5.68629 21.5 9 21.5H15C18.3137 21.5 21 18.8137 21 15.5V9.5C21 6.18629 18.3137 3.5 15 3.5H9ZM16.7179 10.1961C17.1024 9.79966 17.0926 9.16657 16.6961 8.7821C16.2997 8.39763 15.6666 8.40737 15.2821 8.80385L10.6667 13.5635L8.7179 11.5539C8.33343 11.1574 7.70034 11.1476 7.30385 11.5321C6.90737 11.9166 6.89763 12.5497 7.2821 12.9461L9.94877 15.6961C10.1371 15.8904 10.3961 16 10.6667 16C10.9372 16 11.1962 15.8904 11.3846 15.6961L16.7179 10.1961Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        ),
        color: "primary",
        icon: (
          <svg
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              height="16"
              rx="5"
              stroke="currentColor"
              strokeWidth="2"
              width="16"
              x="4"
              y="4.5"
            />
          </svg>
        ),
        indeterminateIcon: (
          <svg
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M9 5.5H15C17.2091 5.5 19 7.29086 19 9.5V15.5C19 17.7091 17.2091 19.5 15 19.5H9C6.79086 19.5 5 17.7091 5 15.5V9.5C5 7.29086 6.79086 5.5 9 5.5ZM3 9.5C3 6.18629 5.68629 3.5 9 3.5H15C18.3137 3.5 21 6.18629 21 9.5V15.5C21 18.8137 18.3137 21.5 15 21.5H9C5.68629 21.5 3 18.8137 3 15.5V9.5ZM8 11.5C7.44772 11.5 7 11.9477 7 12.5C7 13.0523 7.44772 13.5 8 13.5H16C16.5523 13.5 17 13.0523 17 12.5C17 11.9477 16.5523 11.5 16 11.5H8Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        ),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        html: {
          MozOsxFontSmoothing: "grayscale",
          WebkitFontSmoothing: "antialiased",
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
        },
        body: {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
        },
        "#root, #__next": {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        },
        "#nprogress": {
          pointerEvents: "none",
        },
        "#nprogress .bar": {
          height: 3,
          left: 0,
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 2000,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        sizeSmall: {
          padding: 4,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&::placeholder": {
            opacity: 1,
          },
        },

        root: {
          "&.Mui-disabled": {
            backgroundColor: muiTheme.palette.divider,
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        input: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: "24px",
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          borderRadius: 8,
          borderStyle: "solid",
          borderWidth: 1,
          overflow: "hidden",
          transition: muiTheme.transitions.create([
            "border-color",
            "box-shadow",
          ]),
          "&:before": {
            display: "none",
          },
          "&:after": {
            display: "none",
          },
        },
        input: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: "24px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: "24px",
        },
        notchedOutline: {
          transition: muiTheme.transitions.create([
            "border-color",
            "box-shadow",
          ]),
        },
      },
    },

    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 500,
          [`&.${inputLabelClasses.filled}`]: {
            transform: "translate(12px, 18px) scale(1)",
          },
          [`&.${inputLabelClasses.shrink}`]: {
            [`&.${inputLabelClasses.standard}`]: {
              transform: "translate(0, -1.5px) scale(0.85)",
            },
            [`&.${inputLabelClasses.filled}`]: {
              transform: "translate(12px, 6px) scale(0.85)",
            },
            [`&.${inputLabelClasses.outlined}`]: {
              transform: "translate(14px, -9px) scale(0.85)",
            },
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          overflow: "hidden",
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "hover",
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          marginRight: "16px",
          minWidth: "unset",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiPopover: {
      defaultProps: {
        elevation: 16,
      },
    },
    MuiRadio: {
      defaultProps: {
        color: "primary",
      },
    },
    MuiSwitch: {
      defaultProps: {
        color: "primary",
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: 1.71,
          minWidth: "auto",
          paddingLeft: 0,
          paddingRight: 0,
          textTransform: "none",
          "& + &": {
            marginLeft: 24,
          },
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "16px 8px",
          fontSize: "1rem",
          borderWidth: 1,
          borderColor: muiTheme.palette.divider,
          borderStyle: "solid",
        },
        sizeSmall: {
          padding: "8px 8px",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          borderBottom: "none",
          [`& .${tableCellClasses.root}`]: {
            borderBottom: "none",
            fontSize: 16,
            fontWeight: 500,
            lineHeight: 1.6,
          },
          [`& .${tableCellClasses.paddingCheckbox}`]: {
            paddingTop: 4,
            paddingBottom: 4,
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "filled",
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "20px",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "16px 24px",
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
      styleOverrides: {
        shrink: true,
      },
    },
  };
};
