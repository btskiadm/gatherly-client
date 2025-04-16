"use client";

import { ConfirmModal } from "@/app/common/components/Modal/confirm-modal";
import { deleteGroupMutationFn } from "@/app/common/graphql/options/mutation/deleteGroupMutationFn";
import { GroupDetails } from "@/app/model/model";
import { EditOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Card, CardContent, CardHeader, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

interface Props {}

export const GroupSettingsManage = ({}: Props) => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const mutation = useMutation({
    mutationFn: deleteGroupMutationFn,
  });

  const handleDelete = useCallback(async () => {
    setLoading(true);
    await mutation.mutateAsync(
      {
        // groupId: groupDetails.id,
        groupId: "",
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
      <Card
        elevation={1}
        sx={{
          width: "100%",
        }}
      >
        <CardHeader
          sx={{
            padding: "18px 24px",
          }}
          title={<Typography variant="h5">Usuń grupę</Typography>}
          subheader={
            <Typography variant="body2" color="text.secondary">
              When you delete a group, the information will still be visible, but no actions can be performed.
            </Typography>
          }
          action={
            <IconButton
              color="secondary"
              size="small"
              sx={{
                borderWidth: 1,
                borderStyle: "solid",
              }}
              onClick={() => alert("Not implemented.")}
            >
              <EditOutlined fontSize="small" />
            </IconButton>
          }
        />
        <CardContent
          sx={{
            p: "0 24px 24px",
          }}
        >
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
        </CardContent>
      </Card>

      <ConfirmModal
        open={openConfirmModal}
        // title={`Delete group: ${groupDetails.title}`}
        title=""
        confirm={handleConfirm}
        cancel={handleCancel}
      >
        <Typography variant="body1">
          {/* Are you sure you want to delete <b>{groupDetails.title}</b> group ? */}
          Are you sure you want to delete <b>{"1234"}</b> group ?
        </Typography>
      </ConfirmModal>
    </>
  );
};
