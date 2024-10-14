"use client";

import { users as allUsers } from "@/app/group/[id]/events/_components/mock";
import { DeleteOutline, MoreVert, PermIdentityOutlined } from "@mui/icons-material";
import {
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";

function createData(username: string, id: string) {
  return { username, id };
}

const rows = allUsers.map((m) => createData(m.name, m.id));

export const GroupSettingsMembersTab = () => {
  const [moreElement, setMoreElement] = useState<null | HTMLElement>(null);

  const handleOpenMore = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMoreElement(event.currentTarget);
  };

  const handleCloseMore = (reason?: "delete" | "role") => () => {
    setMoreElement(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.username} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.username}
                </TableCell>
                <TableCell component="th" scope="row">
                  {index === 0 && "Host"}
                  {index === 1 && "Moderator"}
                  {index === 2 && "Moderator"}
                  {index > 2 && "Member"}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={handleOpenMore}>
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
    </>
  );
};
