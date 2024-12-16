import { ArrowBack, Close } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, DialogContent, IconButton, Stack } from "@mui/material";
import { PropsWithChildren } from "react";
import { BootstrapDialog, BootstrapDialogActions, BootstrapDialogTitle } from "./../BootstrapDialog";

interface Props
  extends PropsWithChildren<{
    action?: {
      text?: string;
      onAction: () => void;
    };
    back?: {
      text?: string;
      onAction: () => void;
    };
    reset?: {
      text?: string;
      onAction: () => void;
    };
    cancel?: {
      text?: string;
      onAction: () => void;
    };
    confirm?: {
      text?: string;
      onAction: () => void;
    };
    open: boolean;
    loading?: boolean;
    title: string;
  }> {}

export const ModalTemplate = ({ open, loading, title, action, cancel, confirm, back, reset, children }: Props) => {
  const { onAction: onAction, text: actionText = "Action" } = action ?? {};
  const { onAction: onBack, text: backText = "Back" } = back ?? {};
  const { onAction: onReset, text: resetText = "Reset" } = reset ?? {};
  const { onAction: onCancel, text: cancelText = "Cancel" } = cancel ?? {};
  const { onAction: onConfirm, text: confirmText = "Confirm" } = confirm ?? {};

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
        <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
          <Stack direction="row" gap={1}>
            {onAction && (
              <Button disabled={loading} variant="contained" size="small" onClick={onAction}>
                {actionText}
              </Button>
            )}
            {onReset && (
              <Button
                disabled={loading}
                variant="text"
                size="small"
                sx={{
                  color: "text.secondary",
                }}
                onClick={onReset}
              >
                {resetText}
              </Button>
            )}
            {onBack && (
              <Button
                disabled={loading}
                variant="text"
                size="small"
                sx={{
                  color: "text.secondary",
                }}
                startIcon={<ArrowBack />}
                onClick={onBack}
              >
                {backText}
              </Button>
            )}
          </Stack>
          <Stack direction="row" gap={1}>
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
        </Stack>
      </BootstrapDialogActions>
    </BootstrapDialog>
  );
};
