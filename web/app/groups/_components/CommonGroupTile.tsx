import { Paper } from "@mui/material";
import { PropsWithChildren } from "react";

export const CommonGroupTile = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Paper
      sx={{
        width: "16rem",
        height: "16rem",
        transition: "all 0.2s",
        boxShadow: 1,
        "&:hover": {
          scale: 1.001,
          boxShadow: 3,
        },
      }}
    >
      {children}
    </Paper>
  );
};
