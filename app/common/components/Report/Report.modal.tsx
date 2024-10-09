import { Close } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, DialogContent, IconButton, Stack } from "@mui/material";
import { PropsWithChildren } from "react";
import { BootstrapDialog, BootstrapDialogActions, BootstrapDialogTitle } from "../BootstrapDialog";

interface Props
  extends PropsWithChildren<{
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

export const ReportModal = ({ open, cancel, confirm, children, loading }: Props) => {
  const { onCancel } = cancel ?? {};
  const { onConfirm, text: confirmText } = confirm ?? {};

  return (
    <BootstrapDialog onClose={onCancel} open={open}>
      <BootstrapDialogTitle>Report</BootstrapDialogTitle>
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
              Cancel
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
