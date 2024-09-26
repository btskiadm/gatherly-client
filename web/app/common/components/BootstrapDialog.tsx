import { DialogActions, DialogTitle } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";

export const BootstrapDialogTitle = styled(DialogTitle)(({ theme }) => ({
  m: 0,
  p: 2,
}));

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

export const BootstrapDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(6),
}));
