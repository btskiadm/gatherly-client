"use client";

import { Paper } from "@mui/material";
import { PropsWithChildren } from "react";

export const CommonEventTile = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Paper
      sx={(theme) => ({
        position: "relative",
        width: "100%",
        height: "min-content",
        [theme.breakpoints.up("sm")]: {
          height: "19rem",
          transition: "all .2s",
          "&:hover": {
            boxShadow: 4,
          },
        },
      })}
    >
      {children}
    </Paper>
  );
};
