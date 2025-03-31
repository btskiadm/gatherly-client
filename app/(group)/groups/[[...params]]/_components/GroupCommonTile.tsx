import { Paper } from "@mui/material";
import { PropsWithChildren } from "react";

export const CommonGroupTile = ({ children }: PropsWithChildren<{}>) => (
  <Paper
    elevation={0}
    variant="outlined"
    sx={(theme) => ({
      position: "relative",
      width: "100%",
      minHeight: "16rem",
      height: "min-content",
      [theme.breakpoints.up("sm")]: {
        height: "30rem",
        transition: "all .2s",
        "&:hover": {
          background: "rgba(0,0,0,0.01)",
        },
      },
    })}
  >
    {children}
  </Paper>
);
