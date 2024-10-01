import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BootstrapDialogTitle = styled(DialogTitle)(({ theme }) => ({
  p: 0,
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
  p: 0,
}));
