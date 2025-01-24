import { Paper } from "@mui/material";
import { PropsWithChildren } from "react";

export const ShortCommonEventTile = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Paper
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        transition: "all .2s",
        "&:hover": {
          boxShadow: 4,
        },
      }}
    >
      {children}
    </Paper>
  );
};
