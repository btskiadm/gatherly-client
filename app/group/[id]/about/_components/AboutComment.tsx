"use client";

import { Link } from "@/app/common/components/NextLink";
import { MoreVert, ReportGmailerrorredOutlined, VerifiedOutlined } from "@mui/icons-material";
import { Avatar, IconButton, Menu, MenuItem, Rating, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-hot-toast/headless";

export const AboutComment = () => {
  const [moreElement, setMoreElement] = useState<null | HTMLElement>(null);

  const handleOpenMore = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMoreElement(event.currentTarget);
  };

  const handleCloseMore = (reason?: "report") => () => {
    if (reason === "report") {
      toast.success("Comment reported.");
    }

    setMoreElement(null);
  };

  const open = !!moreElement;

  return (
    <>
      <Stack gap={2} p={1} bgcolor="background.default">
        <Stack justifyContent="space-between" direction="row">
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
                Łódź
              </Typography>
            </Stack>
          </Stack>
          <Stack gap={1} direction="row" justifyContent="center" alignItems={{ xs: "flex-start", sm: "center" }}>
            <Typography variant="body2" color="text.secondary" display={{ xs: "none", sm: "block" }}>
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
        <Typography display={{ xs: "block", sm: "none" }} variant="body2" color="text.secondary">
          10.10.2022 6:00
        </Typography>
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
