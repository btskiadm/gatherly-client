"use client";

import { Link } from "@/app/common/components/NextLink";
import { TruncatedTypography } from "@/app/common/components/TruncatedTypography";
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
import { Avatar, Box, Button, Chip, IconButton, Menu, MenuItem, Stack, Tooltip, Typography } from "@mui/material";
import { PropsWithChildren, useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { GroupTile as GroupTileData } from "../mock";

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

export const GroupTile = ({ id, title, description, members, createdAt, img }: PropsWithChildren<GroupTileData>) => {
  const [moreElement, setMoreElement] = useState<HTMLElement | null>(null);

  const handleOpenMore = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setMoreElement(event.currentTarget);
  }, []);

  const handleCloseMore = useCallback(
    (reason?: "favorite") => () => {
      if (reason === "favorite") {
        toast.success("Group added to favorite.");
      }

      setMoreElement(null);
    },
    []
  );

  const handleJoin = useCallback(() => {
    toast.success("You have just join to the group. Congrats !");
  }, []);

  return (
    <>
      <Link
        href={`/group/${id}/about`}
        sx={{
          height: 0,
          width: 0,
          "&:after": {
            zIndex: 1,
            bottom: 0,
            content: "''",
            left: 0,
            position: "absolute",
            right: 0,
            top: 0,
          },
        }}
      />
      <Stack height="100%">
        <Avatar
          alt="logo"
          variant="rounded"
          sizes="100vw"
          sx={{
            width: "100%",
            height: "12rem",
          }}
        >
          <Image
            fill
            src={img}
            alt="logo"
            style={{
              objectFit: "cover",
              // objectFit: "none",
            }}
          />
        </Avatar>
        <Stack gap={1} p={2} height="100%">
          {/* title */}
          <Stack direction="row">
            <Tooltip title={title}>
              <TruncatedTypography variant="subtitle1" minWidth="0px">
                {title}
              </TruncatedTypography>
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
            <IconButton
              size="small"
              onClick={handleOpenMore}
              sx={{
                zIndex: 2,
              }}
            >
              <MoreVert />
            </IconButton>
            <Button
              size="small"
              variant="outlined"
              startIcon={<GroupAdd fontSize="small" />}
              onClick={handleJoin}
              sx={{
                zIndex: 2,
              }}
            >
              Join
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Menu
        open={!!moreElement}
        anchorEl={moreElement}
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
        <Link
          href={{
            pathname: "/report",
            query: {
              type: "group",
              id: "123-456-789",
            },
          }}
          underline="none"
        >
          <MenuItem
            disableRipple
            sx={{
              color: "text.primary",
            }}
            onClick={handleCloseMore()}
          >
            <ReportGmailerrorredOutlined color="action" />
            Report
          </MenuItem>
        </Link>
      </Menu>
    </>
  );
};
