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
import { PropsWithChildren, useState } from "react";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";
import { GroupTileData } from "../mock";

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

export const GroupTile = ({ id, title, description, members, createdAt }: PropsWithChildren<GroupTileData>) => {
  const [moreElement, setMoreElement] = useState<null | HTMLElement>(null);

  const handleOpenMore = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMoreElement(event.currentTarget);
  };

  const handleCloseMore = (reason?: "report" | "favorite") => () => {
    if (reason) {
      alert(reason);
    }

    setMoreElement(null);
  };

  const handleJoin = () => {
    alert("join");
    toast.success("You have just join a new group. Congrats !");
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
          {/* title */}
          <Stack direction="row">
            <Tooltip title={title}>
              <Typography
                variant="subtitle1"
                minWidth="0px"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {title}
              </Typography>
            </Tooltip>
          </Stack>
          {/* chips */}
          <Stack gap={1} direction="row" width="min-content">
            <Chip size="small" label={members} icon={<Group />} />
            <Chip size="small" label={formatDateDifference(createdAt)} icon={<AccessTime />} />
          </Stack>
          {/* avatars */}
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
          {/* description */}
          <Box height="100%">
            <Typography
              variant="body2"
              sx={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
                color: "text.secondary",
              }}
            >
              {description}
            </Typography>
          </Box>
          {/* actions */}
          <Box height="100%" />
          <Stack justifyContent="space-between" direction="row">
            <IconButton onClick={handleOpenMore}>
              <MoreVert />
            </IconButton>
            <Button color="primary" variant="contained" startIcon={<GroupAdd />} onClick={handleJoin}>
              Join
            </Button>
          </Stack>
        </Stack>
      </Paper>
      <Menu
        anchorEl={moreElement}
        open={open}
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
        <MenuItem onClick={handleCloseMore("favorite")} disableRipple>
          <FavoriteBorderOutlined />
          Favorite
        </MenuItem>
        <MenuItem onClick={handleCloseMore("report")} disableRipple>
          <ReportGmailerrorredOutlined color="warning" />
          Report
        </MenuItem>
      </Menu>
    </>
  );
};
