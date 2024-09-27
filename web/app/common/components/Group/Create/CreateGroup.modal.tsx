"use client";

import { Close } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, DialogContent, IconButton } from "@mui/material";
import { PropsWithChildren } from "react";
import { BootstrapDialog, BootstrapDialogActions, BootstrapDialogTitle } from "../../BootstrapDialog";

interface CreateGroupModalProps
  extends PropsWithChildren<{
    onClose: () => void;
    onReset: () => void;
    onCreate: () => void;
    open: boolean;
    loading: boolean;
  }> {}

export const CreateGroupModal = ({ open, onCreate, onReset, onClose, children, loading }: CreateGroupModalProps) => {
  return (
    <BootstrapDialog onClose={onClose} open={open}>
      <BootstrapDialogTitle>Create a new group</BootstrapDialogTitle>
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
        <Box minWidth="280px" width="clamp(320px, 50vw, 560px)" maxWidth="560px">
          {children}
        </Box>
      </DialogContent>
      <BootstrapDialogActions>
        <Button disabled={loading} variant="text" color="error" onClick={onReset}>
          Reset
        </Button>
        <LoadingButton loading={loading} variant="outlined" onClick={onCreate}>
          Create
        </LoadingButton>
      </BootstrapDialogActions>
    </BootstrapDialog>
  );
};
