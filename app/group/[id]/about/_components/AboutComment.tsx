"use client";

import { Link } from "@/app/common/components/NextLink";
import { MoreVert, ReportGmailerrorredOutlined, VerifiedOutlined } from "@mui/icons-material";
import { Avatar, IconButton, Menu, MenuItem, Rating, Stack, Typography } from "@mui/material";
import { useCallback, useState } from "react";

export const AboutComment = () => {
  const [moreElement, setMoreElement] = useState<null | HTMLElement>(null);

  const handleOpenMore = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMoreElement(event.currentTarget);
  };

  const handleCloseMore = useCallback(() => {
    setMoreElement(null);
  }, []);

  const open = !!moreElement;

  return (
    <>
      <Stack gap={2} p={1} bgcolor="background.default">
        <Stack justifyContent="space-between" direction="row" height="min-content" alignItems="center">
          <Stack gap={1} direction="row" alignItems="center">
            <Avatar />
            <Stack>
              <Stack direction="row" gap={{ xs: 0.5, sm: 1 }}>
                <Link
                  underline="none"
                  href="#"
                  variant="body1"
                  color="text.primary"
                  minWidth="0px"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  Adam Bartski
                </Link>
                <VerifiedOutlined fontSize="small" color="info" />
              </Stack>
              <Typography variant="body2" color="text.secondary">
                10.10.2022 6:00
              </Typography>
            </Stack>
          </Stack>
          <IconButton size="small" onClick={handleOpenMore} sx={{ height: "min-content" }}>
            <MoreVert fontSize="small" />
          </IconButton>
        </Stack>
        <Stack>
          <Rating name="size-small" defaultValue={2} size="small" readOnly />
          <Typography variant="body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Typography>
        </Stack>
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
