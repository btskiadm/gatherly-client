"use client";

import { ConfirmModal } from "@/app/common/components/Modal/confirm-modal";
import { UploadIntercepted } from "@/app/common/components/Upload/upload-intercepted";
import { DeleteOutlined, EditOutlined, UploadFileRounded } from "@mui/icons-material";
import { Avatar, Button, Card, CardContent, CardHeader, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

interface Props {}

export const GroupSettingsLogo = ({}: Props) => {
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
          title={<Typography variant="h5">Logo</Typography>}
          subheader={
            <Typography variant="body2" color="text.secondary">
              Główny obrazek grupy
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
          <Stack direction="row" gap={{ xs: 2, lg: 3 }} alignItems="center">
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
                src=""
                // src={groupDetails.mediumPhoto}
                alt="logo"
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
        </CardContent>
      </Card>

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
    </>
  );
};
