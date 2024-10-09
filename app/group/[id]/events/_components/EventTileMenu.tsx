"use client";

import {
  FavoriteBorderOutlined,
  Login,
  Logout,
  MoreVert,
  PreviewOutlined,
  ReportGmailerrorredOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

type MenuAction = "join" | "leave" | "preview" | "favorite" | "report" | "close";

export const EventTileMenu = () => {
  const router = useRouter();
  const [moreElement, setMoreElement] = useState<null | HTMLElement>(null);

  const handleOpenMore = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMoreElement(event.currentTarget);
  };

  const handleCloseMore = (reason: MenuAction) => () => {
    const close = () => setMoreElement(null);

    switch (reason) {
      case "join":
        break;
      case "leave":
        break;
      case "preview":
        router.push("123-456-789");
        break;
      case "favorite":
        break;
      case "report":
        break;
      case "close":
        close();
        break;
      default:
        const _exhaustiveCheck: never = reason;
        return _exhaustiveCheck;
    }

    toast(reason);
    close();
  };

  return (
    <>
      <Box display={{ sm: "none" }}>
        <IconButton size="small" onClick={handleOpenMore}>
          <MoreVert />
        </IconButton>
      </Box>
      <Box display={{ xs: "none", sm: "block" }}>
        <IconButton onClick={handleOpenMore}>
          <MoreVert />
        </IconButton>
      </Box>
      <Menu
        anchorEl={moreElement}
        open={!!moreElement}
        onClose={handleCloseMore("close")}
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
        <MenuItem onClick={handleCloseMore("join")} disableRipple>
          <Login color="action" />
          Join
        </MenuItem>
        <MenuItem onClick={handleCloseMore("leave")} disableRipple>
          <Logout color="action" />
          Leave
        </MenuItem>
        <MenuItem onClick={handleCloseMore("preview")} disableRipple>
          <PreviewOutlined color="action" />
          Preview
        </MenuItem>
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
