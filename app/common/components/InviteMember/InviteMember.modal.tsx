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
    invite?: {
      onInvite: () => void;
    };
    open: boolean;
    loading: boolean;
  }> {}

export const InviteMemberModal = ({ open, cancel, invite, children, loading }: Props) => {
  const { onCancel } = cancel ?? {};
  const { onInvite } = invite ?? {};

  return (
    <BootstrapDialog onClose={onCancel} open={open}>
      <BootstrapDialogTitle>Invite members</BootstrapDialogTitle>
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
          {onInvite && (
            <LoadingButton loading={loading} variant="outlined" onClick={onInvite}>
              Invite
            </LoadingButton>
          )}
        </Stack>
      </BootstrapDialogActions>
    </BootstrapDialog>
  );
};
