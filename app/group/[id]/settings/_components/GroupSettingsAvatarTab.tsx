"use client";

import { ConfirmModal } from "@/app/common/components/Modal/Confirm.modal";
import { UploadIntercepted } from "@/app/common/components/Upload/Upload.intercepted";
import GroupImage4x3 from "@/app/public/assets/group_4x3.webp";
import { DeleteOutlined, UploadFileRounded } from "@mui/icons-material";
import { Avatar, Button, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

export const GroupSettingsAvatarTab = () => {
  const [openUpload, setOpenUpoad] = useState(false);
  const [openDeleteAvatar, setOpenDeleteAvatar] = useState(false);

  const handleUploadClose = useCallback(() => {
    setOpenUpoad(false);
  }, []);

  const handleUploadOpen = useCallback(() => {
    setOpenUpoad(true);
  }, []);

  const handleUploadConfirm = useCallback((file: File) => {
    setOpenUpoad(false);
  }, []);

  const handleDeleteAvatarOpen = useCallback(() => {
    setOpenDeleteAvatar(true);
  }, []);

  const handleDeleteAvatarCancel = useMemo(
    () => ({
      onCancel: () => {
        setOpenDeleteAvatar(false);
      },
      text: "Cancel",
    }),
    []
  );

  const handleDeleteAvatarConfirm = useMemo(
    () => ({
      onConfirm: () => {
        setOpenDeleteAvatar(false);
      },
      text: "Confirm",
    }),
    []
  );

  return (
    <>
      {openUpload && (
        <UploadIntercepted open={openUpload} onClose={handleUploadClose} onConfirm={handleUploadConfirm} />
      )}
      {openDeleteAvatar && (
        <ConfirmModal
          title="Delete avatar"
          open={openDeleteAvatar}
          cancel={handleDeleteAvatarCancel}
          confirm={handleDeleteAvatarConfirm}
        >
          <Typography variant="body1">Are you sure you want to delete your profile avatar ?</Typography>
        </ConfirmModal>
      )}
      <Paper>
        <Stack p={{ xs: 2, sm: 3 }} gap={{ xs: 2, sm: 3 }}>
          <Stack direction="row" gap={2} alignItems="center">
            <Avatar
              alt="logo"
              variant="rounded"
              sizes="100vw"
              sx={{
                width: "128px",
                height: "128px",
              }}
            >
              <Image
                fill
                src={GroupImage4x3}
                alt={"logo"}
                style={{
                  objectFit: "cover",
                }}
              />
            </Avatar>
            <Stack
              width={{
                xs: "100%",
                sm: "unset",
              }}
              direction={{
                xs: "column",
                sm: "row",
              }}
              gap={{
                xs: 1,
                sm: 2,
              }}
              alignItems="center"
            >
              <Button fullWidth variant="contained" startIcon={<UploadFileRounded />} onClick={handleUploadOpen}>
                Upload
              </Button>

              <Button
                fullWidth
                variant="outlined"
                color="error"
                startIcon={<DeleteOutlined />}
                onClick={handleDeleteAvatarOpen}
              >
                Delete
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
};
