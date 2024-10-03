import { ArrowBack, Close } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, DialogContent, IconButton, Stack } from "@mui/material";
import { PropsWithChildren } from "react";
import { BootstrapDialog, BootstrapDialogActions, BootstrapDialogTitle } from "../../BootstrapDialog";

interface Props
  extends PropsWithChildren<{
    back?: {
      onBack: () => void;
    };
    cancel?: {
      onCancel: () => void;
    };
    create?: {
      onCreate: () => void;
    };
    next?: {
      onNext: () => void;
    };
    open: boolean;
    loading: boolean;
  }> {}

export const CreateEventModal = ({ open, cancel, create, next, back, children, loading }: Props) => {
  const { onBack } = back ?? {};
  const { onCancel } = cancel ?? {};
  const { onCreate } = create ?? {};
  const { onNext } = next ?? {};

  return (
    <BootstrapDialog onClose={onCancel} open={open}>
      <BootstrapDialogTitle>Create an event</BootstrapDialogTitle>
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
            {onCreate && (
              <LoadingButton loading={loading} variant="outlined" onClick={onCreate}>
                Create
              </LoadingButton>
            )}
            {onNext && (
              <LoadingButton loading={loading} variant="outlined" onClick={onNext}>
                Next
              </LoadingButton>
            )}
          </Stack>
        </Stack>
      </BootstrapDialogActions>
    </BootstrapDialog>
  );
};
