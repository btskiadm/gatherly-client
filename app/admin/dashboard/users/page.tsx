"use client";

import { ModalTemplate } from "@/app/common/components/Modal/modal-template";
import { Link } from "@/app/common/components/next-link";
import { usersQueryOptions } from "@/app/common/graphql/options/query/admin/usersQueryOptions";
import { AccountStatus, AppRole, UserWithStatus } from "@/app/model/model";
import {
  ContentCopyOutlined,
  GppGoodOutlined,
  LocalPoliceOutlined,
  MoreHoriz,
  PermIdentityOutlined,
  PersonOutline,
  SecurityOutlined,
  VerifiedOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useRef, useState } from "react";

export default function Page() {
  const userMenuRef = useRef<UserWithStatus | null>(null);

  const [openAppRole, setOpenAppRole] = useState(false);
  const [appRole, setAppRole] = useState<AppRole | null>();

  const [openAccountStatus, setOpenAccountStatus] = useState(false);
  const [accountStatus, setAccountStatus] = useState<AccountStatus | null>();

  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const { data } = useSuspenseQuery(usersQueryOptions());

  const handleMenuClick = useCallback((e: React.MouseEvent<HTMLElement>, user: UserWithStatus) => {
    userMenuRef.current = user;
    setMenuAnchor(e.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setMenuAnchor(null);
  }, []);

  const handleCopyId = useCallback((id: string) => {
    navigator.clipboard.writeText(id);
  }, []);

  // role
  const handleOpenAppRole = useCallback(() => {
    setAppRole(userMenuRef.current?.role ?? AppRole.User);
    setOpenAppRole(true);
    handleMenuClose();
  }, []);

  const handleAppRole = useCallback((_: unknown, role: AppRole) => {
    setAppRole(role);
  }, []);

  const cancelAppRole = useMemo(
    () => ({
      onAction: () => {
        setOpenAppRole(false);
      },
      text: "Cancel",
    }),
    []
  );

  const confirmAppRole = useMemo(
    () => ({
      onAction: () => {
        setOpenAppRole(false);
      },
      text: "Save",
    }),
    []
  );

  // status
  const handleOpenStatus = useCallback(() => {
    setAccountStatus(userMenuRef.current?.status ?? null);
    setOpenAccountStatus(true);
    handleMenuClose();
  }, []);

  const handleAccountStatus = useCallback((_: unknown, status: AccountStatus) => {
    setAccountStatus(status);
  }, []);

  const cancelAccountStatus = useMemo(
    () => ({
      onAction: () => {
        setAccountStatus(null);
        setOpenAccountStatus(false);
      },
      text: "Cancel",
    }),
    []
  );

  const confirmAccountStatus = useMemo(
    () => ({
      onAction: () => {
        setAccountStatus(null);
        setOpenAccountStatus(false);
      },
      text: "Save",
    }),
    []
  );

  return (
    <>
      <Stack gap={4}>
        <Stack direction="column" gap={2}>
          <Stack direction="row" position="relative">
            <Typography variant="h3">Użytkownicy</Typography>
          </Stack>
          <Divider variant="fullWidth" />
        </Stack>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Użytkownik</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.users.map((user) => {
                const { id, smallPhoto, username, email, role, status } = user;

                return (
                  <TableRow key={id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell scope="row">
                      <Stack direction="row" gap={1} alignItems="center">
                        <Avatar sx={{ width: "48px", height: "48px" }} src={smallPhoto} />
                        <Stack direction="column">
                          <Typography variant="body2">{username}</Typography>
                          <Typography variant="body3" color="text.secondary">
                            {email}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" gap={0.5} alignItems="center">
                        {/* todo: fix this copy id function */}
                        <IconButton size="small" onClick={() => handleCopyId(id)}>
                          <ContentCopyOutlined fontSize="small" />
                        </IconButton>
                        {id}
                      </Stack>
                    </TableCell>

                    <TableCell>
                      {role === AppRole.Admin && <Chip size="small" label={role} color="primary" />}
                      {role === AppRole.Moderator && <Chip size="small" label={role} color="secondary" />}
                      {role === AppRole.User && <Chip size="small" label={role} />}
                    </TableCell>
                    <TableCell>
                      {status === AccountStatus.Active && <Chip size="small" color="primary" label={status} />}
                      {status === AccountStatus.Banned && <Chip size="small" color="error" label={status} />}
                      {status === AccountStatus.Inactive && <Chip size="small" color="default" label={status} />}
                      {status === AccountStatus.PendingVerification && (
                        <Chip size="small" color="success" label={status} />
                      )}
                      {status === AccountStatus.Suspended && <Chip size="small" color="warning" label={status} />}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={(e) => handleMenuClick(e, user)}>
                        <MoreHoriz />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      <Menu
        anchorEl={menuAnchor}
        open={!!menuAnchor}
        onClose={handleMenuClose}
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
        <MenuItem disableRipple>
          <Link
            sx={{
              display: "flex",
              alignItems: "center",
              color: "text.secondary",
              fontSize: "small",
              textDecoration: "none",
              verticalAlign: "center",
            }}
            href={`/profile/${userMenuRef.current?.id}`}
          >
            <PersonOutline fontSize="small" sx={{ color: "text.primary" }} />
            Profil
          </Link>
        </MenuItem>
        <MenuItem disableRipple>
          <Link
            sx={{
              display: "flex",
              alignItems: "center",
              color: "text.secondary",
              fontSize: "small",
              textDecoration: "none",
              verticalAlign: "center",
            }}
            href="#"
            onClick={handleOpenAppRole}
          >
            <SecurityOutlined fontSize="small" sx={{ color: "text.primary" }} />
            Role
          </Link>
        </MenuItem>
        <MenuItem disableRipple>
          <Link
            sx={{
              display: "flex",
              alignItems: "center",
              color: "text.secondary",
              fontSize: "small",
              textDecoration: "none",
              verticalAlign: "center",
            }}
            href="#"
            onClick={handleOpenStatus}
          >
            <VerifiedOutlined fontSize="small" sx={{ color: "text.primary" }} />
            Status
          </Link>
        </MenuItem>
      </Menu>

      {openAppRole && userMenuRef.current && (
        <ModalTemplate open title="Application role" cancel={cancelAppRole} confirm={confirmAppRole}>
          <Stack gap={3}>
            <Typography variant="body1">
              Application role for <b>{userMenuRef.current.username}</b>.
            </Typography>
            <Box
              display={{
                xs: "none",
                sm: "inline-flex",
              }}
            >
              <ToggleButtonGroup value={appRole} exclusive onChange={handleAppRole}>
                <ToggleButton value={AppRole.User}>
                  <Stack gap={1} direction="row">
                    <PermIdentityOutlined />
                    Użytkownik
                  </Stack>
                </ToggleButton>
                <ToggleButton color="secondary" value={AppRole.Moderator}>
                  <Stack gap={1} direction="row">
                    <GppGoodOutlined />
                    Moderator
                  </Stack>
                </ToggleButton>
                <ToggleButton color="primary" value={AppRole.Admin}>
                  <Stack gap={1} direction="row">
                    <LocalPoliceOutlined />
                    Admin
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
                exclusive
                fullWidth
                orientation="vertical"
                value={appRole}
                onChange={handleAppRole}
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

      {openAccountStatus && userMenuRef.current && (
        <ModalTemplate open title="Account status" cancel={cancelAccountStatus} confirm={confirmAccountStatus}>
          <Stack gap={3}>
            <Typography variant="body1">
              Account status for <b>{userMenuRef.current.username}</b>.
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="account-settings-label">Status</InputLabel>
              <Select
                labelId="account-settings-label"
                id="account-settings"
                value={accountStatus}
                label="Status"
                onChange={(e, v) => handleAccountStatus(null, e.target.value as AccountStatus)}
              >
                <MenuItem value={AccountStatus.Active}>{AccountStatus.Active}</MenuItem>
                <MenuItem value={AccountStatus.Banned}>{AccountStatus.Banned}</MenuItem>
                <MenuItem value={AccountStatus.Inactive}>{AccountStatus.Inactive}</MenuItem>
                <MenuItem value={AccountStatus.PendingVerification}>{AccountStatus.PendingVerification}</MenuItem>
                <MenuItem value={AccountStatus.Suspended}>{AccountStatus.Suspended}</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <TextField multiline id="account-settings" label="Reason" minRows={5} />
            </FormControl>
          </Stack>
        </ModalTemplate>
      )}
    </>
  );
}
