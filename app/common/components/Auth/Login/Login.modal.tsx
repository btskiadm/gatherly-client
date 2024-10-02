"use client";

import { Close } from "@mui/icons-material";
import { Box, DialogContent, IconButton } from "@mui/material";
import { PropsWithChildren } from "react";
import { BootstrapDialog, BootstrapDialogTitle } from "../../BootstrapDialog";

interface Props
  extends PropsWithChildren<{
    onClose: () => void;
    open: boolean;
  }> {}

export const LoginModal = ({ open, onClose, children }: Props) => {
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
        <Box minWidth="260px" width="clamp(260px, 50vw, 560px)" maxWidth="560px">
          {children}
        </Box>
      </DialogContent>
    </BootstrapDialog>
  );
};
