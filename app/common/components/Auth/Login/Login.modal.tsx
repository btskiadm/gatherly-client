"use client";

import { Close } from "@mui/icons-material";
import { Box, DialogContent, IconButton } from "@mui/material";
import { PropsWithChildren } from "react";
import { BootstrapDialog, BootstrapDialogTitle } from "../../BootstrapDialog";

interface LoginModal
  extends PropsWithChildren<{
    onClose: () => void;
    open: boolean;
  }> {}

export const LoginModal = ({ open, onClose, children }: LoginModal) => {
  return (
    <BootstrapDialog onClose={onClose} open={open}>
      <BootstrapDialogTitle>Sign in</BootstrapDialogTitle>
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
      <DialogContent dividers>
        <Box minWidth="280px" width="clamp(280px, 50vw, 560px)" maxWidth="560px">
          {children}
        </Box>
      </DialogContent>
    </BootstrapDialog>
  );
};
