import type { PaletteColor, PaletteOptions } from "@mui/material";
import {
  backdropClasses,
  filledInputClasses,
  inputBaseClasses,
  outlinedInputClasses,
  paperClasses,
  tableCellClasses,
  tableRowClasses,
} from "@mui/material";
import { common } from "@mui/material/colors";
import { alpha } from "@mui/material/styles";
import type { Components } from "@mui/material/styles/components";
import { blue } from "../colors";

interface Config {
  palette: PaletteOptions;
}

export const createComponents = ({ palette }: Config): Components => {
  return {
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: palette.neutral![200],
          color: common.black,
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          [`&:not(.${backdropClasses.invisible})`]: {
            backgroundColor: alpha(palette.neutral![900], 0.75),
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          [`&.${paperClasses.elevation1}`]: {
            boxShadow:
              "0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        icon: {
          color: palette.action!.active,
        },
        root: {
          borderColor: palette.neutral![200],
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "#nprogress .bar": {
          backgroundColor: (palette.primary as PaletteColor).main,
        },
        ".slick-dots li button": {
          "&:before": {
            fontSize: 10,
            color: (palette.primary as PaletteColor).main,
          },
        },
        ".slick-dots li.slick-active button": {
          "&:before": {
            color: (palette.primary as PaletteColor).main,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFF",
          minHeight: "57px",

          [`&.${filledInputClasses.root}`]: {
            "&:hover": {
              backgroundColor: "#FFF",
            },

            "&.Mui-focused": {
              backgroundColor: "#FFF",
            },

            backgroundColor: "#FFF",

            "&.Mui-disabled": {
              backgroundColor: palette.divider,
            },
          },
        },
        input: {
          backgroundColor: "#FFF",
          "&::placeholder": {
            color: palette.text!.secondary,
          },

          "&.Mui-disabled": {
            backgroundColor: palette.divider,
            textFillColor: palette.text!.primary,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          [`&.${inputBaseClasses.input}.${filledInputClasses.input}:focus`]: {
            backgroundColor: "#FFF",
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFF",
          borderColor: palette.neutral![200],
          "&:hover": {
            backgroundColor: palette.action!.hover,
          },
          [`&.${filledInputClasses.disabled}`]: {
            backgroundColor: "transparent",
          },
          [`&.${filledInputClasses.focused}`]: {
            backgroundColor: "transparent",
            borderColor: (palette.primary as PaletteColor).main,
            boxShadow: `${(palette.primary as PaletteColor).main} 0 0 0 2px`,
          },
          [`&.${filledInputClasses.error}`]: {
            borderColor: (palette.error as PaletteColor).main,
            boxShadow: `${(palette.error as PaletteColor).main} 0 0 0 2px`,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: palette.action!.hover,
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: palette.neutral![200],
            },
          },
          [`&.${outlinedInputClasses.focused}`]: {
            backgroundColor: "transparent",
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: (palette.primary as PaletteColor).main,
              boxShadow: `${(palette.primary as PaletteColor).main} 0 0 0 2px`,
            },
          },
          [`&.${filledInputClasses.error}`]: {
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: (palette.error as PaletteColor).main,
              boxShadow: `${(palette.error as PaletteColor).main} 0 0 0 2px`,
            },
          },
        },
        notchedOutline: {
          borderColor: palette.neutral![200],
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: palette.neutral![500],
        },
        track: {
          backgroundColor: palette.neutral![400],
          opacity: 1,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomColor: palette.divider,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          [`&.${tableRowClasses.hover}:hover`]: {
            backgroundColor: blue.alpha4,
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          [`& .${tableCellClasses.root}`]: {
            backgroundColor: palette.neutral![100],
            color: palette.neutral![700],
          },
        },
      },
    },
    // @ts-ignore
    MuiTimelineConnector: {
      styleOverrides: {
        root: {
          backgroundColor: palette.divider,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backdropFilter: "blur(6px)",
          background: alpha(palette.neutral![900], 0.8),
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
