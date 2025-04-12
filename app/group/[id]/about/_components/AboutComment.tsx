"use client";

import { ClampTypography } from "@/app/common/components/clamp-typography";
import { LocalTime } from "@/app/common/components/LocalTime/LocalTime";
import { Link } from "@/app/common/components/next-link";
import { stringToColor } from "@/app/common/utils/string-to-color";
import { Comment } from "@/app/model/model";
import { MoreHorizOutlined, ReportGmailerrorredOutlined } from "@mui/icons-material";
import { Avatar, IconButton, ListItem, ListItemAvatar, Menu, MenuItem, Rating, Stack, Typography } from "@mui/material";
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
    user: { id, smallPhoto, username },
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
      <ListItem
        sx={{
          gap: 1,
          px: "24px",
          py: "16px",
          alignItems: "flex-start",
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
          borderBottomColor: "divider",
        }}
      >
        <ListItemAvatar>
          <Avatar
            variant="rounded"
            alt={`${username} avatar`}
            src={smallPhoto}
            sx={{
              bgcolor: stringToColor(username),
              width: "48px",
              height: "48px",
            }}
          >
            {username[0]}
          </Avatar>
        </ListItemAvatar>
        <Stack direction="column" gap={1} width="100%">
          <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
            <Stack direction="row" gap={0.5} alignItems="center">
              <Link
                href={`/profile/${id}`}
                sx={{
                  textDecoration: "none",
                }}
              >
                <ClampTypography variant="body1" clamp={1} color="secondary">
                  {username}
                </ClampTypography>
              </Link>
              <Rating
                defaultValue={rate}
                size="small"
                readOnly
                slotProps={{
                  icon: {
                    style: {
                      fontSize: "0.875rem",
                    },
                  },
                }}
              />
            </Stack>
            <Stack direction="row" gap={0.5} alignItems="center">
              <Typography noWrap variant="body3" color="text.secondary">
                <LocalTime date={createdAt} formatter={(d) => d.toLocaleString()} />
              </Typography>
              <IconButton size="small" onClick={handleOpenMore} sx={{ height: "min-content" }}>
                <MoreHorizOutlined fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </Stack>
      </ListItem>
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
