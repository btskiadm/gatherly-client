import { Paper } from "@mui/material";
import { PropsWithChildren } from "react";

export const ShortCommonGroupTile = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Paper
      sx={{
        position: "relative",
        width: "100%",
        height: "min-content",
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
