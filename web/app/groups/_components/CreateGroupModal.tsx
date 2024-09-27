"use client";

import { BootstrapDialog, BootstrapDialogActions, BootstrapDialogTitle } from "@/app/common/components/BootstrapDialog";
import { delay } from "@/app/common/utils/delay";
import { AddCircleOutlineRounded, Close } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import React, { useCallback, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { CreateGroup, CreateGroupRef } from "../../common/components/Group/Create/CreateGroup.component";

export const CreateGroupModal = () => {
  const ref = useRef<CreateGroupRef>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleReset = useCallback(() => {
    ref.current?.reset();
  }, []);

  const handleSave = useCallback(async () => {
    const input = ref.current?.save();
    console.dir({ input });

    if (!input) {
      toast.error("Validation error. Please check the form.");
      return;
    }

    setLoading(true);
    await delay(3000);
    setLoading(false);

    toast.success("Group created successfully.");
    handleClose();
  }, []);

  return (
    <React.Fragment>
      <Button
        color="secondary"
        sx={(theme) => ({
          ".MuiSvgIcon-root": {
            display: {
              display: "none",
              [theme.breakpoints.up("md")]: {
                display: "block",
              },
            },
          },
        })}
        startIcon={<AddCircleOutlineRounded fontSize="small" />}
        onClick={handleOpen}
      >
        Create a group
      </Button>
      <BootstrapDialog onClose={handleClose} open={open}>
        <BootstrapDialogTitle>Create a new group</BootstrapDialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
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
          <CreateGroup ref={ref} />
        </DialogContent>
        <BootstrapDialogActions>
          <Button disabled={loading} variant="text" color="error" onClick={handleReset}>
            Reset
          </Button>
          <LoadingButton loading={loading} variant="outlined" onClick={handleSave}>
            Create
          </LoadingButton>
        </BootstrapDialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};
