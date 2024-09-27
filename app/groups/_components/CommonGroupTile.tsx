"use client";

import { Paper } from "@mui/material";
import { PropsWithChildren } from "react";

export const CommonGroupTile = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Paper
      sx={(theme) => ({
        width: "100%",
        height: "14rem",
        boxShadow: 1,
        [theme.breakpoints.up("sm")]: {
          width: "16rem",
          height: "16rem",
          transition: "all 0.2s",
          "&:hover": {
            scale: 1.001,
            boxShadow: 3,
          },
        },
      })}
    >
      {children}
    </Paper>
  );
};
