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

interface Props
  extends PropsWithChildren<{
    title: string;
    cancel?: {
      onCancel: () => void;
    };
    submit?: {
      text: string;
      onSubmit: () => void;
    };
    open: boolean;
    loading: boolean;
    dialogLoading?: boolean;
  }> {}

export const SeeEventModal = ({ open, title, cancel, submit, children, loading, dialogLoading }: Props) => {
  const { onCancel } = cancel ?? {};
  const { onSubmit, text } = submit ?? {};

  return (
    <BootstrapDialog onClose={onCancel} open={open}>
      <BootstrapDialogTitle>
        {dialogLoading ? <Skeleton width="60%" height="32px" variant="rectangular" /> : title}
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
            <Box />
            <Stack direction="row" gap={1}>
              {onCancel && (
                <Button disabled={loading} variant="text" color="error" size="small" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              {onSubmit && (
                <LoadingButton loading={loading} variant="outlined" onClick={onSubmit}>
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
