import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BootstrapDialogTitle = styled(DialogTitle)(({ theme }) => ({}));

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "100%",
    margin: theme.spacing(4),
  },
  "& .MuiDialogTitle-root": {
    padding: theme.spacing(2, 3),
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2, 3),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2, 3),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

export const BootstrapDialogActions = styled(DialogActions)(({ theme }) => ({}));
