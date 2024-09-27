"use client";
import { Close } from "@mui/icons-material";
import { DialogContent, IconButton } from "@mui/material";
import { PropsWithChildren } from "react";
import { BootstrapDialog, BootstrapDialogTitle } from "../../BootstrapDialog";

interface SignUpModalProps
  extends PropsWithChildren<{
    onClose: () => void;
    open: boolean;
  }> {}

export const SignUpModal = ({ open, onClose, children }: SignUpModalProps) => {
  return (
    <BootstrapDialog onClose={onClose} open={open}>
      <BootstrapDialogTitle>Sign up</BootstrapDialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <Close />
      </IconButton>
      <DialogContent dividers>{children}</DialogContent>
    </BootstrapDialog>
  );
};
