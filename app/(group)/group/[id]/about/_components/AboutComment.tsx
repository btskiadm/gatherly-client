"use client";

import { Link } from "@/app/common/components/next-link";
import { TruncatedTypography } from "@/app/common/components/truncated-typography";
import { stringToColor } from "@/app/common/utils/string-to-color";
import { Comment } from "@/app/model/model";
import { MoreVert, ReportGmailerrorredOutlined } from "@mui/icons-material";
import { Avatar, IconButton, Menu, MenuItem, Rating, Stack, Typography } from "@mui/material";
import { useCallback, useState } from "react";

interface Props {
  comment: Comment;
}

export const AboutComment = ({ comment }: Props) => {
  const [moreElement, setMoreElement] = useState<null | HTMLElement>(null);

  const {
    content,
    createdAt,
    rate,
    user: { smallPhoto, username },
  } = comment;

  const handleOpenMore = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMoreElement(event.currentTarget);
  };

  const handleCloseMore = useCallback(() => {
    setMoreElement(null);
  }, []);

  const open = !!moreElement;

  return (
    <>
      <Stack gap={2}>
        <Stack justifyContent="space-between" direction="row" height="min-content" alignItems="center">
          <Stack gap={1} direction="row" alignItems="center" minWidth={0}>
            <Avatar
              alt={username}
              sx={{
                bgcolor: stringToColor(username),
              }}
              src={smallPhoto ?? ""}
            >
              {username[0]}
            </Avatar>
            <Stack minWidth={0}>
              <Stack direction="row" gap={{ xs: 0.5, sm: 1 }}>
                <Link
                  underline="none"
                  href={`/profile/${username}`}
                  variant="body1"
                  color="text.primary"
                  minWidth="0px"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {username}
                </Link>
              </Stack>
              <Stack direction="row" gap={0.5}>
                <TruncatedTypography variant="body2" color="text.secondary">
                  {new Intl.DateTimeFormat("pl-PL", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(createdAt))}
                </TruncatedTypography>
                <Rating name="size-small" defaultValue={rate} size="small" readOnly />
              </Stack>
            </Stack>
          </Stack>
          <IconButton size="small" onClick={handleOpenMore} sx={{ height: "min-content" }}>
            <MoreVert fontSize="small" />
          </IconButton>
        </Stack>
        <Typography variant="body1">{content}</Typography>
      </Stack>
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
        <Link
          href={{
            pathname: "/report",
            query: {
              type: "comment",
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
      </Menu>
    </>
  );
};
