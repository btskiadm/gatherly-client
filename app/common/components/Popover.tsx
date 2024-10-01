import { Popover as MUIPopover, PopoverProps, Stack } from "@mui/material";

export const Popover = (props: PopoverProps) => {
  return (
    <MUIPopover {...props}>
      <Stack
        sx={{
          p: 2,
          boxShadow: 24,
          bgcolor: "background.paper",
        }}
      >
        {props.children}
      </Stack>
    </MUIPopover>
  );
};
