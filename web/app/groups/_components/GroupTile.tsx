"use client";

import {
  AccessTime,
  Group,
  GroupAdd,
  MoreVert,
  ReportGmailerrorredOutlined,
  FavoriteBorderOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";

const GROUP_NAME = "Pellentesque malesuada sapien eu dolor rutrum";
const GROUP_DESCRIPTION =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque malesuada sapien eu dolor rutrum pulvinar.";
const GROUP_MEMBERS = 299;
const GROUP_CREATED_AT = new Date("2023-09-18");

function formatDateDifference(dateInput: Date) {
  const now = new Date();
  // @ts-ignore: It is valid operation
  const differenceInMilliseconds = now - dateInput;
  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

  if (differenceInHours < 24) {
    return "new";
  } else if (differenceInDays < 7) {
    return `${Math.floor(differenceInDays)} d.`;
  } else {
    const differenceInWeeks = Math.floor(differenceInDays / 7);
    return `${differenceInWeeks} w.`;
  }
}

export const GroupTile = () => {
  const [moreElement, setMoreElement] = useState<null | HTMLElement>(null);

  const handleOpenMore = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMoreElement(event.currentTarget);
  };

  const handleCloseMore = () => {
    setMoreElement(null);
  };

  const handleJoin = () => {
    alert("join");
  };

  const open = !!moreElement;

  return (
    <>
      <Paper
        sx={{
          width: "16rem",
          height: "16rem",
          transition: "all 0.2s",
          boxShadow: 1,
          "&:hover": {
            scale: 1.001,
            boxShadow: 3,
          },
        }}
      >
        <Stack gap={1} p={1} height="100%">
          <Stack direction="row">
            <Tooltip title={GROUP_NAME}>
              <Typography
                variant="subtitle1"
                minWidth="0px"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {GROUP_NAME}
              </Typography>
            </Tooltip>
          </Stack>
          <Stack gap={1} direction="row" width="min-content">
            <Chip size="small" label={GROUP_MEMBERS} icon={<Group />} />
            <Chip size="small" label={formatDateDifference(GROUP_CREATED_AT)} icon={<AccessTime />} />
          </Stack>
          <AvatarGroup
            slotProps={{
              additionalAvatar: {
                sx: {
                  width: "1.5rem",
                  height: "1.5rem",
                  fontSize: "0.75rem",
                },
              },
            }}
            sx={{
              marginRight: "auto", // to left
            }}
            max={9}
          >
            <Avatar sx={{ width: "1.5rem", height: "1.5rem" }} alt="Remy Sharp" />
            <Avatar sx={{ width: "1.5rem", height: "1.5rem" }} alt="Travis Howard" />
            <Avatar sx={{ width: "1.5rem", height: "1.5rem" }} alt="Agnes Walker" />
            <Avatar sx={{ width: "1.5rem", height: "1.5rem" }} alt="Trevor Henderson" />
            <Avatar sx={{ width: "1.5rem", height: "1.5rem" }} alt="Remy Sharp" />
            <Avatar sx={{ width: "1.5rem", height: "1.5rem" }} alt="Travis Howard" />
            <Avatar sx={{ width: "1.5rem", height: "1.5rem" }} alt="Agnes Walker" />
            <Avatar sx={{ width: "1.5rem", height: "1.5rem" }} alt="Trevor Henderson" />
            <Avatar sx={{ width: "1.5rem", height: "1.5rem" }} alt="Remy Sharp" />
            <Avatar sx={{ width: "1.5rem", height: "1.5rem" }} alt="Travis Howard" />
            <Avatar sx={{ width: "1.5rem", height: "1.5rem" }} alt="Agnes Walker" />
            <Avatar sx={{ width: "1.5rem", height: "1.5rem" }} alt="Trevor Henderson" />
            <Avatar sx={{ width: "1.5rem", height: "1.5rem" }} alt="Remy Sharp" />
            <Avatar sx={{ width: "1.5rem", height: "1.5rem" }} alt="Travis Howard" />
            <Avatar sx={{ width: "1.5rem", height: "1.5rem" }} alt="Agnes Walker" />
            <Avatar sx={{ width: "1.5rem", height: "1.5rem" }} alt="Trevor Henderson" />
          </AvatarGroup>
          <Box height="100%">
            <Typography
              variant="body2"
              sx={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
              }}
            >
              {GROUP_DESCRIPTION}
            </Typography>
          </Box>
          <Box height="100%" />
          <Stack justifyContent="space-between" direction="row">
            <IconButton onClick={handleOpenMore}>
              <MoreVert />
            </IconButton>
            <Button color="success" variant="contained" startIcon={<GroupAdd />} onClick={handleJoin}>
              Join
            </Button>
          </Stack>
        </Stack>
      </Paper>
      <Menu
        anchorEl={moreElement}
        open={open}
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
        <MenuItem onClick={handleCloseMore} disableRipple>
          <FavoriteBorderOutlined />
          Favorite
        </MenuItem>
        <MenuItem onClick={handleCloseMore} disableRipple>
          <ReportGmailerrorredOutlined color="warning" />
          Edit
        </MenuItem>
      </Menu>
    </>
  );
};
