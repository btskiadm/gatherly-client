"use client";

import {
  AccessTime,
  FavoriteBorderOutlined,
  Group,
  GroupAdd,
  MoreVert,
  ReportGmailerrorredOutlined,
  StarBorderRounded,
  VerifiedOutlined,
} from "@mui/icons-material";
import { Box, Button, Chip, IconButton, Menu, MenuItem, Stack, Tooltip, Typography } from "@mui/material";
import { PropsWithChildren, useState } from "react";
import { toast } from "react-hot-toast";
import { GroupTileData } from "../mock";
import { CommonGroupTile } from "./CommonGroupTile";

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
      <CommonGroupTile>
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
          <Stack
            gap={0.5}
            direction="row"
            flexShrink={0}
            width="min-content"
            sx={{
              overflowY: "hidden",
              overflowX: "auto",
              width: "100%",
              padding: 0,
              "::-webkit-scrollbar": {
                background: "transparent",
                width: 0,
                height: 0,
              },
            }}
          >
            <Tooltip title="Number of members">
              <Chip size="small" label={members} icon={<Group />} />
            </Tooltip>
            <Tooltip title="Date of creating">
              <Chip size="small" label={formatDateDifference(createdAt)} icon={<AccessTime />} />
            </Tooltip>
            <Tooltip title="Verified group">
              <Chip
                size="small"
                sx={{
                  ".MuiChip-label": {
                    px: "4px",
                  },
                }}
                icon={<VerifiedOutlined fontSize="small" />}
              />
            </Tooltip>
            <Tooltip title="Sponsored group">
              <Chip
                size="small"
                sx={{
                  ".MuiChip-label": {
                    px: "4px",
                  },
                }}
                icon={<StarBorderRounded fontSize="small" />}
              />
            </Tooltip>
          </Stack>
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
            <IconButton size="small" onClick={handleOpenMore}>
              <MoreVert />
            </IconButton>
            <Button size="small" variant="outlined" startIcon={<GroupAdd fontSize="small" />} onClick={handleJoin}>
              Join
            </Button>
          </Stack>
        </Stack>
      </CommonGroupTile>
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
          <FavoriteBorderOutlined color="action" />
          Favorite
        </MenuItem>
        <MenuItem onClick={handleCloseMore("report")} disableRipple>
          <ReportGmailerrorredOutlined color="action" />
          Report
        </MenuItem>
      </Menu>
    </>
  );
};
