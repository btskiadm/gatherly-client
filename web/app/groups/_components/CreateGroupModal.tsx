"use client";

import { BootstrapDialog } from "@/app/common/components/BootstrapDialog";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import React, { useCallback, useRef } from "react";
import { CreateGroup, CreateGroupRef } from "./CreateGroup";

export const CreateGroupModal = () => {
  const [open, setOpen] = React.useState(false);
  const ref = useRef<CreateGroupRef>(null);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleReset = useCallback(() => {
    ref.current?.reset();
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
          <Button variant="text" color="error" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleClose}>Create</Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};
