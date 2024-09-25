"use client";

import { BootstrapDialog } from "@/app/common/components/BootstrapDialog";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import React, { useCallback, useRef, useState } from "react";
import { CreateGroup, CreateGroupRef } from "./CreateGroup";
import { toast } from "react-hot-toast";
import { delay } from "@/app/common/utils/delay";
import { LoadingButton } from "@mui/lab";

export const CreateGroupModal = () => {
  const [open, setOpen] = React.useState(false);
  const ref = useRef<CreateGroupRef>(null);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReset = useCallback(() => {
    ref.current?.reset();
  }, []);

  const handleSave = useCallback(async () => {
    const input = ref.current?.save();
    console.dir({ input });

    setLoading(true);
    await delay(3000);
    setLoading(false);

    if (!input) {
      toast.error("Validation error. Please check the form.");
      return;
    }

    toast.success("Group created successfully.");
    handleClose();
  }, []);

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleOpen}>
        Open dialog
      </Button>
      <BootstrapDialog onClose={handleClose} open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }}>Create a new group</DialogTitle>
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
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <CreateGroup ref={ref} />
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} variant="text" color="error" onClick={handleReset}>
            Reset
          </Button>
          {/* <Button disabled={loading} onClick={handleSave}>
            Create
          </Button> */}
          <LoadingButton loading={loading} variant="outlined" onClick={handleSave}>
            Create
          </LoadingButton>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};
