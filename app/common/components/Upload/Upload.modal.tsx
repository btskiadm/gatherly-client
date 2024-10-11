import { ArrowBack, Close } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, DialogContent, IconButton, Stack } from "@mui/material";
import { PropsWithChildren } from "react";
import { BootstrapDialog, BootstrapDialogActions, BootstrapDialogTitle } from "../BootstrapDialog";

interface Props
  extends PropsWithChildren<{
    back?: {
      onBack: () => void;
    };
    cancel?: {
      onCancel: () => void;
    };
    confirm?: {
      text: string;
      onConfirm: () => void;
    };
    open: boolean;
    loading: boolean;
  }> {}

export const UploadZoneModal = ({ open, cancel, confirm, back, children, loading }: Props) => {
  const { onBack } = back ?? {};
  const { onCancel } = cancel ?? {};
  const { onConfirm, text: confirmText } = confirm ?? {};

  return (
    <BootstrapDialog onClose={onCancel} open={open}>
      <BootstrapDialogTitle>Upload photo</BootstrapDialogTitle>
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
          <Box>
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
                Back
              </Button>
            )}
          </Box>
          <Stack direction="row" gap={1}>
            {onCancel && (
              <Button disabled={loading} variant="text" color="error" size="small" onClick={onCancel}>
                Cancel
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
