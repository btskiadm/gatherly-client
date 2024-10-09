import { Close } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, DialogContent, IconButton, Skeleton, Stack } from "@mui/material";
import { PropsWithChildren } from "react";
import {
  BootstrapDialog,
  BootstrapDialogActions,
  BootstrapDialogTitle,
  DialogLoadingActions,
  DialogLoadingContent,
} from "../../BootstrapDialog";
import { Link } from "../../NextLink";

interface Props
  extends PropsWithChildren<{
    title: string;
    action?: {
      onAction: () => void;
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
    dialogLoading?: boolean;
  }> {}

export const EventInfoModal = ({ open, title, cancel, action, confirm, children, loading, dialogLoading }: Props) => {
  const { onCancel } = cancel ?? {};
  const { onConfirm, text } = confirm ?? {};
  const { onAction } = action ?? {};

  return (
    <BootstrapDialog onClose={onCancel} open={open}>
      <BootstrapDialogTitle>
        {dialogLoading ? <Skeleton width="80%" height="32px" variant="rectangular" /> : title}
      </BootstrapDialogTitle>
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
        {dialogLoading && <DialogLoadingContent />}
        {!dialogLoading && (
          <Box minWidth="280px" width="clamp(280px, 50vw, 540px)" maxWidth="540px">
            {children}
          </Box>
        )}
      </DialogContent>
      <BootstrapDialogActions>
        {dialogLoading && <DialogLoadingActions />}
        {!dialogLoading && (
          <>
            {onAction && (
              <Button
                disabled={loading}
                variant="text"
                size="small"
                LinkComponent={Link}
                href="/event/123-456-789"
                sx={{
                  color: "text.secondary",
                }}
                onClick={onAction}
              >
                Details
              </Button>
            )}
            <Stack direction="row" gap={1}>
              {onCancel && (
                <Button disabled={loading} variant="text" color="error" size="small" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              {onConfirm && (
                <LoadingButton loading={loading} variant="outlined" onClick={onConfirm}>
                  {text}
                </LoadingButton>
              )}
            </Stack>
          </>
        )}
      </BootstrapDialogActions>
    </BootstrapDialog>
  );
};
