"use client";

import { Paper } from "@mui/material";
import { PropsWithChildren } from "react";

export const CommonGroupTile = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Paper
      sx={(theme) => ({
        position: "relative",
        width: "100%",
        minHeight: "14rem",
        height: "min-content",
        [theme.breakpoints.up("sm")]: {
          height: "30rem",
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
