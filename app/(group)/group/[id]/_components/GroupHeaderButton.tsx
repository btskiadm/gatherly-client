"use client";

import { Link } from "@/app/common/components/NextLink";
import {
  ArrowDropDown,
  GroupAdd,
  InsertInvitationOutlined,
  PersonAddAltOutlined,
  ReportGmailerrorredOutlined,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, ButtonGroup, Divider, Menu, MenuItem } from "@mui/material";
import { useCallback, useRef, useState } from "react";

const isMember = false;
const isModerator = false;
const isHost = true;
const loading = false;

const isNotMember = !isMember && !isModerator && !isHost;

export const GroupHeaderButton = () => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    setAnchor(e.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchor(null);
  }, []);

  const handleCloseReason = (reason?: string) => () => {
    // switch (reason) {
    //   case "join":
    //     break;
    //   case "leave":
    //     break;
    //   case "preview":
    //     router.push("/event/123-456-789");
    //     break;
    //   case "favorite":
    //     break;
    //   case "report":
    //     break;
    //   case "close":
    //     close();
    //     break;
    //   default:
    //     const _exhaustiveCheck: never = reason;
    //     return _exhaustiveCheck;
    // }
    // toast(reason);
    handleClose();
  };

  return (
    <>
      <Menu
        anchorEl={anchor}
        open={!!anchor}
        onClose={handleClose}
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
        {(isMember || isModerator || isHost) && (
          <Link href="invite" underline="none">
            <MenuItem disableRipple sx={{ color: "text.primary" }} onClick={handleCloseReason("close")}>
              <GroupAdd color="action" />
              Invite
            </MenuItem>
          </Link>
        )}

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
          <MenuItem disableRipple sx={{ color: "text.primary" }} onClick={handleCloseReason("close")}>
            <ReportGmailerrorredOutlined color="action" />
            Report
          </MenuItem>
        </Link>

        {(isHost || isModerator) && <Divider />}
        {(isHost || isModerator) && (
          <Link href="createEvent" underline="none">
            <MenuItem disableRipple sx={{ color: "text.primary" }} onClick={handleCloseReason("close")}>
              <InsertInvitationOutlined color="action" />
              New event
            </MenuItem>
          </Link>
        )}
      </Menu>

      <ButtonGroup disabled={loading} variant="outlined" aria-label="Button group with a nested menu">
        <LoadingButton
          loading={loading}
          ref={btnRef}
          sx={{
            height: "min-content",
          }}
          onClick={handleClick}
          startIcon={isNotMember ? <PersonAddAltOutlined /> : null}
        >
          {isNotMember && "Join"}
          {isMember && "Member"}
          {isModerator && "Moderator"}
          {isHost && "Host"}
        </LoadingButton>
        <Button
          size="small"
          aria-controls={!anchor ? "split-button-menu" : undefined}
          aria-expanded={!anchor ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleClick}
        >
          <ArrowDropDown />
        </Button>
      </ButtonGroup>
    </>
  );
};
