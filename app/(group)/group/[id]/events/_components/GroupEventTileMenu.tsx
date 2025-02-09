"use client";

import { ConfirmModal } from "@/app/common/components/Modal/confirm-modal";
import { Link } from "@/app/common/components/next-link";
import {
  CloseOutlined,
  EditOutlined,
  FavoriteBorderOutlined,
  Login,
  Logout,
  MoreVert,
  PreviewOutlined,
  ReportGmailerrorredOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";

const isAdmin = true;
const isModerator = false;
const isMember = false;

export const GroupEventTileMenu = () => {
  const [moreElement, setMoreElement] = useState<null | HTMLElement>(null);
  const [openCancelEvent, setOpenCancelEvent] = useState(false);
  const [openJoinEvent, setOpenJoinEvent] = useState(false);
  const [openLeaveEvent, setOpenLeaveEvent] = useState(false);

  const canEdit = isAdmin;
  const canJoin = !isAdmin && !isModerator && !isMember;
  const canLeave = isAdmin || isMember || isModerator;
  const canCancel = isAdmin || isModerator;

  const handleOpenMore = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setMoreElement(event.currentTarget);
  }, []);

  const handleCloseMore = useCallback(() => {
    setMoreElement(null);
  }, []);

  // cancel event
  const handleCancelEventOpen = useCallback(() => {
    setOpenCancelEvent(true);
    handleCloseMore();
  }, [handleCloseMore]);

  const cancelCancelEvent = useMemo(
    () => ({
      onCancel: () => {
        setOpenCancelEvent(false);
      },
      text: "Cancel",
    }),
    []
  );

  const confirmCancelEvent = useMemo(
    () => ({
      onConfirm: () => {
        setOpenCancelEvent(false);
      },
      text: "Cancel",
    }),
    []
  );

  // join event
  const handleJoinEventOpen = useCallback(() => {
    setOpenJoinEvent(true);
    handleCloseMore();
  }, [handleCloseMore]);

  const cancelJoinEvent = useMemo(
    () => ({
      onCancel: () => {
        setOpenJoinEvent(false);
      },
      text: "Cancel",
    }),
    []
  );

  const confirmJoinEvent = useMemo(
    () => ({
      onConfirm: () => {
        setOpenJoinEvent(false);
      },
      text: "Join",
    }),
    []
  );

  const handleLeaveEventOpen = useCallback(() => {
    setOpenLeaveEvent(true);
    handleCloseMore();
  }, [handleCloseMore]);

  const cancelLeaveEvent = useMemo(
    () => ({
      onCancel: () => {
        setOpenLeaveEvent(false);
      },
      text: "Cancel",
    }),
    []
  );

  const confirmLeaveEvent = useMemo(
    () => ({
      onConfirm: () => {
        setOpenLeaveEvent(false);
      },
      text: "Leave",
    }),
    []
  );

  return (
    <>
      <Box display={{ sm: "none" }}>
        <IconButton size="small" onClick={handleOpenMore}>
          <MoreVert />
        </IconButton>
      </Box>
      <Box display={{ xs: "none", sm: "block" }}>
        <IconButton onClick={handleOpenMore}>
          <MoreVert />
        </IconButton>
      </Box>
      <Menu
        anchorEl={moreElement}
        open={!!moreElement}
        onClose={handleCloseMore}
        sx={{
          "& .MuiPaper-root": {
            "& .MuiMenuItem-root": {
              "& .MuiSvgIcon-root": {
                marginRight: (theme) => theme.spacing(1),
              },
            },
          },
        }}
      >
        {canJoin && (
          <MenuItem onClick={handleJoinEventOpen} disableRipple>
            <Login color="action" />
            Join
          </MenuItem>
        )}

        {canLeave && (
          <MenuItem onClick={handleLeaveEventOpen} disableRipple>
            <Logout color="action" />
            Leave
          </MenuItem>
        )}
        <Link href="123-456-789" underline="none">
          <MenuItem disableRipple sx={{ color: "text.primary" }}>
            <PreviewOutlined color="action" />
            Preview
          </MenuItem>
        </Link>
        <MenuItem onClick={handleCloseMore} disableRipple>
          <FavoriteBorderOutlined color="action" />
          Favorite
        </MenuItem>
        <Link
          href={{
            pathname: "/report",
            query: {
              type: "event",
              id: "123-456-789",
            },
          }}
          underline="none"
        >
          <MenuItem disableRipple sx={{ color: "text.primary" }} onClick={handleCloseMore}>
            <ReportGmailerrorredOutlined color="action" />
            Report
          </MenuItem>
        </Link>
        {(canEdit || canCancel) && <Divider />}
        {canEdit && (
          <Link href="editEvent" underline="none">
            <MenuItem disableRipple sx={{ color: "text.primary" }} onClick={handleCloseMore}>
              <EditOutlined color="action" />
              Edit
            </MenuItem>
          </Link>
        )}
        {canCancel && (
          <MenuItem disableRipple sx={{ color: "text.primary" }} onClick={handleCancelEventOpen}>
            <CloseOutlined color="action" />
            Cancel
          </MenuItem>
        )}
      </Menu>

      {openCancelEvent && (
        <ConfirmModal
          title="Cancel event"
          open={openCancelEvent}
          cancel={cancelCancelEvent}
          confirm={confirmCancelEvent}
        >
          <Typography variant="body1">
            Are you sure you want to cancel <b>EVENT TITLE</b> event ?
          </Typography>
        </ConfirmModal>
      )}

      {openJoinEvent && (
        <ConfirmModal title="Join event" open={openJoinEvent} cancel={cancelJoinEvent} confirm={confirmJoinEvent}>
          <Typography variant="body1">
            Are you sure you want to join <b>EVENT TITLE</b> event ?
          </Typography>
        </ConfirmModal>
      )}

      {openLeaveEvent && (
        <ConfirmModal title="Leave event" open={openLeaveEvent} cancel={cancelLeaveEvent} confirm={confirmLeaveEvent}>
          <Typography variant="body1">
            Are you sure you want to leave <b>EVENT TITLE</b> event ?
          </Typography>
        </ConfirmModal>
      )}
    </>
  );
};
