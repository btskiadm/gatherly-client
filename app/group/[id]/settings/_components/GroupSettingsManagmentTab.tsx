"use client";

import { ConfirmModal } from "@/app/common/components/Modal/confirm-modal";
import { deleteGroupMutationFn } from "@/app/common/graphql/options/mutation/deleteGroupMutationFn";
import { GroupDetails } from "@/app/model/model";
import { LoadingButton } from "@mui/lab";
import { Paper, Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

interface Props {
  groupDetails: GroupDetails;
}

export const GroupSettingsManagmentTab = ({ groupDetails }: Props) => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const mutation = useMutation({
    mutationFn: deleteGroupMutationFn,
  });

  const handleDelete = useCallback(async () => {
    setLoading(true);
    await mutation.mutateAsync(
      {
        groupId: groupDetails.id,
      },
      {
        onSuccess: ({ deleteGroup: { success } }) => {
          if (success) {
            toast.success("Group deleted.");
          } else {
            toast.success("You cannot delete this group.");
          }
        },
        onError: () => {
          toast.error("Internal error. Cannot delete this group. Please try again later.");
        },
      }
    );
    setLoading(false);
  }, []);

  // join event
  const handleOpenConfirm = useCallback(() => {
    setOpenConfirmModal(true);
  }, []);

  const handleCancel = useMemo(
    () => ({
      onCancel: () => {
        setOpenConfirmModal(false);
      },
      text: "Cancel",
    }),
    []
  );

  const handleConfirm = useMemo(
    () => ({
      onConfirm: () => {
        handleDelete();
        setOpenConfirmModal(false);
      },
      text: "Confirm",
    }),
    [handleDelete]
  );

  return (
    <>
      <Paper>
        <Stack p={{ xs: 2, sm: 3 }} gap={{ xs: 2, sm: 3 }}>
          <Stack gap={1}>
            <Typography variant="body1">Delete group</Typography>
            <Typography variant="body2">
              When you delete a group, the information will still be visible, but no actions can be performed.
            </Typography>
            <LoadingButton
              onClick={handleOpenConfirm}
              loading={loading}
              variant="contained"
              sx={{
                width: "min-content",
                whiteSpace: "nowrap",
              }}
            >
              Delete group
            </LoadingButton>
          </Stack>
        </Stack>
      </Paper>
      <ConfirmModal
        open={openConfirmModal}
        title={`Delete group: ${groupDetails.title}`}
        confirm={handleConfirm}
        cancel={handleCancel}
      >
        <Typography variant="body1">
          Are you sure you want to delete <b>{groupDetails.title}</b> group ?
        </Typography>
      </ConfirmModal>
    </>
  );
};
