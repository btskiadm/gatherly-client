import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BootstrapDialogTitle = styled(DialogTitle)(({ theme }) => ({}));

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    margin: theme.spacing(1),
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

export const BootstrapDialogActions = styled(DialogActions)(({ theme }) => ({}));
