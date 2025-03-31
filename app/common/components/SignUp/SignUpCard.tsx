"use client";

import { styled } from "@mui/material";
import MuiCard from "@mui/material/Card";

export const SignUpCard = styled(MuiCard)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(4),
  margin: "auto",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow: "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow: "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));
