import { Typography } from "@mui/material";
import { Box, BoxProps } from "@mui/system";
import React from "react";

function Steppers({
  steps,
  activeIndex,
  onClickStep,
  ...BoxProps
}: {
  steps: {
    label: string;
  }[];
  activeIndex: number;
  onClickStep?: (step: number) => void;
} & BoxProps) {
  return (
    <Box
      {...BoxProps}
      sx={{
        display: "flex",
        ...BoxProps.sx,
      }}
    >
      {steps.map((step, index) => {
        const isActive = index <= activeIndex;
        return (
          <Box
            key={index}
            sx={{
              borderColor: isActive ? "primary.main" : "divider",
              flex: 1,
              textAlign: "center",
              bgcolor: isActive ? "primary.main" : "secondary.light",
              color: isActive ? "white" : "text.primary",
              cursor: onClickStep ? "pointer" : undefined,
              pb: 0.5,
            }}
            onClick={() => onClickStep?.(index)}
          >
            <Typography variant="caption">
              {index + 1}. {step.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

export default Steppers;
