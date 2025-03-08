"use client";

import { ConfirmModal } from "@/app/common/components/Modal/confirm-modal";
import { ModalTemplate } from "@/app/common/components/Modal/modal-template";
import { GroupDetails } from "@/app/model/model";
import {
  DeleteOutline,
  GppGoodOutlined,
  LocalPoliceOutlined,
  MoreVert,
  PermIdentityOutlined,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useCallback, useMemo, useRef, useState } from "react";

interface Props {
  groupDetails: GroupDetails;
}

export const GroupSettingsMembersTab = ({ groupDetails: { members } }: Props) => {
  const moreContext = useRef({ username: "", id: "" });
  const [moreElement, setMoreElement] = useState<null | HTMLElement>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openRole, setOpenRole] = useState(false);
  const [role, setRole] = useState("member");

  const handleRole = useCallback((_: unknown, newAlignment: string) => {
    setRole(newAlignment);
  }, []);

  const handleOpenMore =
    ({ username, id }: { username: string; id: string }) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      moreContext.current = { username, id };
      setMoreElement(event.currentTarget);
    };

  const handleCloseMore = (reason?: "delete" | "role") => () => {
    if (reason === "delete") {
      handleDeleteOpen();
    } else if (reason === "role") {
      handleOpenRole();
    } else {
      moreContext.current = { username: "", id: "" };
    }

    setMoreElement(null);
  };

  const handleDeleteOpen = useCallback(() => {
    setOpenDelete(true);
  }, []);

  const handleOpenRole = useCallback(() => {
    setOpenRole(true);
  }, []);

  const cancelDelete = useMemo(
    () => ({
      onCancel: () => {
        setOpenDelete(false);
      },
      text: "Cancel",
    }),
    []
  );

  const confirmDelete = useMemo(
    () => ({
      onConfirm: () => {
        setOpenDelete(false);
      },
      text: "Delete",
    }),
    []
  );

  const cancelRole = useMemo(
    () => ({
      onAction: () => {
        setOpenRole(false);
      },
      text: "Cancel",
    }),
    []
  );

  const confirmRole = useMemo(
    () => ({
      onAction: () => {
        setOpenRole(false);
      },
      text: "Save",
    }),
    []
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map(({ user, isHost, isModerator }, index) => (
              <TableRow key={user.username} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {user.username}
                </TableCell>
                <TableCell component="th" scope="row">
                  {isHost && "Host"}
                  {isModerator && "Moderator"}
                  {!isHost && !isModerator && "Member"}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={handleOpenMore({ id: user.id, username: user.username })}>
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Menu
        anchorEl={moreElement}
        open={!!moreElement}
        onClose={handleCloseMore()}
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
        <MenuItem onClick={handleCloseMore("role")} disableRipple>
          <PermIdentityOutlined color="action" />
          Role
        </MenuItem>
        <MenuItem
          onClick={handleCloseMore("delete")}
          disableRipple
          sx={{
            color: "text.primary",
          }}
        >
          <DeleteOutline color="action" />
          Delete
        </MenuItem>
      </Menu>

      {openDelete && (
        <ConfirmModal title="Delete member" open={openDelete} cancel={cancelDelete} confirm={confirmDelete}>
          <Typography variant="body1">
            Are you sure you want to delete <b>{moreContext.current.username}</b> from this group ?
          </Typography>
        </ConfirmModal>
      )}

      {openRole && (
        <ModalTemplate open title="Change member role" cancel={cancelRole} confirm={confirmRole}>
          <Stack gap={2}>
            <Typography variant="body1">
              Setting role for <b>{moreContext.current.username}</b>.
            </Typography>
            <Box
              display={{
                xs: "none",
                sm: "inline-flex",
              }}
            >
              <ToggleButtonGroup value={role} exclusive onChange={handleRole} aria-label="Role">
                <ToggleButton value="member">
                  <Stack gap={1} direction="row">
                    <PermIdentityOutlined />
                    Member
                  </Stack>
                </ToggleButton>
                <ToggleButton color="secondary" value="moderator">
                  <Stack gap={1} direction="row">
                    <GppGoodOutlined />
                    Moderator
                  </Stack>
                </ToggleButton>
                <ToggleButton color="primary" value="host">
                  <Stack gap={1} direction="row">
                    <LocalPoliceOutlined />
                    Host
                  </Stack>
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box
              display={{
                xs: "inline-flex",
                sm: "none",
              }}
            >
              <ToggleButtonGroup
                fullWidth
                orientation="vertical"
                value={role}
                exclusive
                onChange={handleRole}
                aria-label="Role"
              >
                <ToggleButton value="member">
                  <Stack gap={1} direction="row">
                    <PermIdentityOutlined />
                    Member
                  </Stack>
                </ToggleButton>
                <ToggleButton color="secondary" value="moderator">
                  <Stack gap={1} direction="row">
                    <GppGoodOutlined />
                    Moderator
                  </Stack>
                </ToggleButton>
                <ToggleButton color="primary" value="host">
                  <Stack gap={1} direction="row">
                    <LocalPoliceOutlined />
                    Host
                  </Stack>
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Stack>
        </ModalTemplate>
      )}
    </>
  );
};
