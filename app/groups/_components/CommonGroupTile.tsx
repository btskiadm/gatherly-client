"use client";

import { Paper } from "@mui/material";
import { PropsWithChildren } from "react";

export const CommonGroupTile = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Paper
      sx={(theme) => ({
        position: "relative",
        width: "100%",
        height: "14rem",
        boxShadow: 1,
        [theme.breakpoints.up("sm")]: {
          height: "16rem",
          transition: "all 0.2s",
          "&:hover": {
            boxShadow: 6,
          },
        },
      })}
    >
      {children}
    </Paper>
  );
};
