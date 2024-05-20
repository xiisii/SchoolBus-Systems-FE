import { Stack, StackProps, Typography } from "@mui/material";

export const TitleChip = ({
  label,
  title,
  bgcolor = "secondary.light",
  ...props
}: {
  label: string;
  title: string;
  bgcolor?: StackProps["bgcolor"];
} & StackProps) => {
  return (
    <Stack
      bgcolor={bgcolor}
      py={1}
      px={1.5}
      {...props}
      sx={{ borderRadius: 2, maxWidth: 240, ...props.sx }}
    >
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h6">{title}</Typography>
    </Stack>
  );
};
