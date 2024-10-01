"use client";

import { Link } from "@/app/common/components/NextLink";
import { MoreVert, ReportGmailerrorredOutlined, VerifiedOutlined } from "@mui/icons-material";
import { Avatar, IconButton, Menu, MenuItem, Rating, Stack, Typography } from "@mui/material";
import { useState } from "react";

export const AboutComment = () => {
  const [moreElement, setMoreElement] = useState<null | HTMLElement>(null);

  const handleOpenMore = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMoreElement(event.currentTarget);
  };

  const handleCloseMore = (reason?: "report") => () => {
    if (reason) {
      alert(reason);
    }

    setMoreElement(null);
  };

  const open = !!moreElement;

  return (
    <>
      <Stack gap={2} p={2} bgcolor="background.default">
        <Stack justifyContent="space-between" direction="row">
          <Stack gap={1} direction="row" alignItems="center">
            <Avatar />
            <Stack>
              <Stack direction="row" gap={1}>
                <Link underline="none" href="#" variant="body1" color="text.primary">
                  Adam Bartski
                </Link>
                <VerifiedOutlined fontSize="small" color="info" />
              </Stack>
              <Typography variant="body2" color="text.secondary">
                Łódź
              </Typography>
            </Stack>
          </Stack>
          <Stack gap={1} direction="row" justifyContent="center" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              10.10.2022 6:00
            </Typography>
            <IconButton size="small" onClick={handleOpenMore}>
              <MoreVert fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
        <Stack>
          <Rating name="size-small" defaultValue={2} size="small" readOnly />
          <Typography variant="body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Typography>
        </Stack>
      </Stack>
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
        <MenuItem onClick={handleCloseMore("report")} disableRipple>
          <ReportGmailerrorredOutlined color="action" />
          Report
        </MenuItem>
      </Menu>
    </>
  );
};
