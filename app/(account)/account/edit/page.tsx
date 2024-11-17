"use client";

import { ConfirmModal } from "@/app/common/components/Modal/Confirm.modal";
import { Textarea } from "@/app/common/components/Textarea";
import { TruncatedFormHelperText } from "@/app/common/components/TruncatedFormHelperText";
import { UploadIntercepted } from "@/app/common/components/Upload/Upload.intercepted";
import { ZodFlattenIssue } from "@/app/common/utils/zod";
import GroupImage4x3 from "@/app/public/assets/group_4x3.webp";
import { DeleteOutlined, UploadFileRounded } from "@mui/icons-material";
import {
  Autocomplete,
  Avatar,
  Button,
  FormControl,
  FormLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

export default function Page() {
  const [openUpload, setOpenUpoad] = useState(false);
  const [openDeleteAvatar, setOpenDeleteAvatar] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState<ZodFlattenIssue>({});

  const avatarError = errors["avatar"];
  const locationError = errors["location"];
  const bioError = errors["bio"];

  const handleBio = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  }, []);

  /**
   * Upload avatar
   */
  const handleUploadOpen = useCallback(() => {
    setOpenUpoad(true);
  }, []);

  const handleUploadClose = useCallback(() => {
    setOpenUpoad(false);
  }, []);

  const handleUploadConfirm = useCallback((file: File) => {
    setOpenUpoad(false);
  }, []);

  /**
   * Delete avatar
   */
  const handleDeleteAvatarOpen = useCallback(() => {
    setOpenDeleteAvatar(true);
  }, []);

  const deleteAvatarCancel = useMemo(
    () => ({
      onCancel: () => {
        setOpenDeleteAvatar(false);
      },
      text: "Cancel",
    }),
    []
  );

  const deleteAvatar = useMemo(
    () => ({
      onConfirm: () => {
        setOpenDeleteAvatar(false);
      },
      text: "Delete",
    }),
    []
  );

  return (
    <>
      {openUpload && (
        <UploadIntercepted open={openUpload} onClose={handleUploadClose} onConfirm={handleUploadConfirm} />
      )}
      {openDeleteAvatar && (
        <ConfirmModal title="Delete avatar" open={openDeleteAvatar} cancel={deleteAvatarCancel} confirm={deleteAvatar}>
          <Typography variant="body1">Are you sure you want to delete your profile avatar ?</Typography>
        </ConfirmModal>
      )}
      <Paper>
        <Stack p={{ xs: 2, sm: 3 }} gap={{ xs: 2, sm: 3 }}>
          <Typography variant="h5" fontWeight="600">
            Personal information
          </Typography>
          <FormControl error={!!bioError} fullWidth>
            <FormLabel>Avatar</FormLabel>
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
            <TruncatedFormHelperText>
              {!bioError ? <>{/* Dostępne znaki: {content.length}/{maxReportContent} */}</> : bioError.message}
            </TruncatedFormHelperText>
          </FormControl>
          <FormControl error={!!bioError} fullWidth>
            <FormLabel>Location</FormLabel>
            <Autocomplete
              options={[]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      placeholder: "Location",
                    },
                  }}
                />
              )}
            />
            <TruncatedFormHelperText>
              {!bioError ? <>{/* Dostępne znaki: {content.length}/{maxReportContent} */}</> : bioError.message}
            </TruncatedFormHelperText>
          </FormControl>
          <FormControl error={!!bioError} fullWidth>
            <FormLabel>Bio</FormLabel>
            <Textarea placeholder="Description.." minRows={6} value={bio} onChange={handleBio} />
            <TruncatedFormHelperText>
              {!bioError ? <>{/* Dostępne znaki: {content.length}/{maxReportContent} */}</> : bioError.message}
            </TruncatedFormHelperText>
          </FormControl>
          <Stack direction="row" justifyContent="flex-end">
            <Button variant="contained">Save</Button>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
}
