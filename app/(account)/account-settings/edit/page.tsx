"use client";

import { ConfirmModal } from "@/app/common/components/Modal/confirm-modal";
import { Textarea } from "@/app/common/components/textarea";
import { TruncatedFormHelperText } from "@/app/common/components/truncated-form-helper-text";
import { UploadIntercepted } from "@/app/common/components/Upload/upload-intercepted";
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
import { useCallback, useMemo, useState } from "react";

export default function Page() {
  const [openUpload, setOpenUpload] = useState(false);
  const [openDeleteAvatar, setOpenDeleteAvatar] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState<ZodFlattenIssue>({});

  const avatarError = errors["avatar"];
  const locationError = errors["location"];
  const bioError = errors["bio"];

  const handleBioChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  }, []);

  const handleUploadOpen = useCallback(() => {
    setOpenUpload(true);
  }, []);

  const handleUploadClose = useCallback(() => {
    setOpenUpload(false);
  }, []);

  const handleUploadConfirm = useCallback((file: File) => {
    setOpenUpload(false);
    setAvatar(URL.createObjectURL(file)); // Example: setting the uploaded file as the avatar
  }, []);

  const handleDeleteAvatarOpen = useCallback(() => {
    setOpenDeleteAvatar(true);
  }, []);

  const deleteAvatarCancel = useMemo(
    () => ({
      onCancel: () => setOpenDeleteAvatar(false),
      text: "Cancel",
    }),
    []
  );

  const deleteAvatarConfirm = useMemo(
    () => ({
      onConfirm: () => {
        setOpenDeleteAvatar(false);
        setAvatar(""); // Clear avatar
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
        <ConfirmModal
          title="Delete avatar"
          open={openDeleteAvatar}
          cancel={deleteAvatarCancel}
          confirm={deleteAvatarConfirm}
        >
          <Typography variant="body1">Are you sure you want to delete your profile picture?</Typography>
        </ConfirmModal>
      )}

      <Paper>
        <Stack p={{ xs: 2, sm: 3 }} gap={{ xs: 2, sm: 3 }}>
          <Stack direction="column">
            <Typography variant="h5" fontWeight="600">
              Edit Profile
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Information will be visible to all users.
            </Typography>
          </Stack>

          <FormControl error={!!avatarError} fullWidth>
            <FormLabel>User Picture</FormLabel>
            <Stack direction="row" gap={2} alignItems="center">
              <Avatar
                alt="User Avatar"
                variant="rounded"
                src={avatar || GroupImage4x3.src}
                sx={{ width: 128, height: 128 }}
              />

              <Stack
                width={{ xs: "100%", sm: "unset" }}
                direction={{ xs: "column", sm: "row" }}
                gap={{ xs: 1, sm: 2 }}
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
            <TruncatedFormHelperText>{avatarError?.message || null}</TruncatedFormHelperText>
          </FormControl>

          <FormControl error={!!locationError} fullWidth>
            <FormLabel>Location</FormLabel>
            <Autocomplete
              options={[]}
              renderInput={(params) => <TextField {...params} size="small" placeholder="Location" />}
            />
            <TruncatedFormHelperText>{locationError?.message || null}</TruncatedFormHelperText>
          </FormControl>

          <FormControl error={!!bioError} fullWidth>
            <FormLabel>Bio</FormLabel>
            <Textarea placeholder="Bio..." minRows={6} value={bio} onChange={handleBioChange} />
            <TruncatedFormHelperText>{bioError?.message || null}</TruncatedFormHelperText>
          </FormControl>

          <Stack direction="row" justifyContent="flex-end">
            <Button variant="contained">Save</Button>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
}
