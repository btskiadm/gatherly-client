import { Close } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, DialogContent, IconButton, Stack } from "@mui/material";
import { PropsWithChildren } from "react";
import { BootstrapDialog, BootstrapDialogActions, BootstrapDialogTitle } from "../BootstrapDialog";

interface Props
  extends PropsWithChildren<{
    title: string;
    cancel?: {
      text: string;
      onCancel: () => void;
    };
    confirm?: {
      text: string;
      onConfirm: () => void;
    };
    open: boolean;
    loading?: boolean;
  }> {}

export const ConfirmModal = ({ title, open, cancel, confirm, children, loading }: Props) => {
  const { onCancel, text: cancelText } = cancel ?? {};
  const { onConfirm, text: confirmText } = confirm ?? {};

  return (
    <BootstrapDialog onClose={onCancel} open={open}>
      <BootstrapDialogTitle>{title}</BootstrapDialogTitle>
      <IconButton
        aria-label="close"
        onClick={onCancel}
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
      <BootstrapDialogActions>
        <Stack direction="row" gap={1} ml="auto">
          {onCancel && (
            <Button disabled={loading} variant="text" color="error" size="small" onClick={onCancel}>
              {cancelText}
            </Button>
          )}
          {onConfirm && (
            <LoadingButton loading={loading} variant="outlined" onClick={onConfirm}>
              {confirmText}
            </LoadingButton>
          )}
        </Stack>
      </BootstrapDialogActions>
    </BootstrapDialog>
  );
};
