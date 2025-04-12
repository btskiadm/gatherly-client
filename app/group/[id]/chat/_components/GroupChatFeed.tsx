"use client";
// import { CommentInput } from "@/app/common/components/CommentInput/comment-input";
import { Link } from "@/app/common/components/next-link";
import { stringToColor } from "@/app/common/utils/string-to-color";
import { MoreVert, ReportGmailerrorredOutlined } from "@mui/icons-material";
import { Avatar, Divider, IconButton, Menu, MenuItem, Paper, Stack, Typography } from "@mui/material";
import { useCallback, useState } from "react";

interface MessageProps {
  content: string;
  dir: "left" | "right";
}

const Message = ({ content, dir }: MessageProps) => {
  const right = dir === "right";
  const left = dir === "left";

  return (
    <Stack width="fit-content" maxWidth="75%" direction="column" ml={right ? "auto" : 0}>
      <Stack direction="row" alignItems="flex-end" gap={1}>
        {left && (
          <Avatar sx={{ width: "36px", height: "36px", bgcolor: stringToColor("btskiadm") }} alt="AB">
            AB
          </Avatar>
        )}
        <Stack>
          <Typography
            sx={{
              borderRadius: 1,
              p: 0.5,
              bgcolor: right ? "primary.light" : "background.default",
              color: right ? "primary.contrastText" : "text.primary",
            }}
          >
            {content}
          </Typography>
        </Stack>
      </Stack>
      <Typography
        variant="caption"
        sx={{
          opacity: 0.6,
          textAlign: "end",
        }}
      >
        {new Intl.DateTimeFormat("pl-PL", {
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "short",
        }).format(new Date("2020-10-10T12:00:00"))}
      </Typography>
    </Stack>
  );
};

export const GroupChatFeed = () => {
  const [moreElement, setMoreElement] = useState<HTMLElement | null>(null);

  const handleOpenMore = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setMoreElement(event.currentTarget);
  }, []);

  const handleCloseMore = useCallback(() => {
    setMoreElement(null);
  }, []);

  return (
    <>
      <Paper sx={{ minHeight: "520px", maxheight: "800px", height: "clamp(520px, 70vh, 800px)" }}>
        <Stack p={{ xs: 2 }} gap={2} height="100%">
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">Messages</Typography>
            <IconButton size="small" onClick={handleOpenMore}>
              <MoreVert />
            </IconButton>
          </Stack>
          <Divider
            sx={{
              mx: -2,
            }}
          />
          <Stack
            gap={0.5}
            height="100%"
            sx={{
              overflowY: "auto",
            }}
          >
            <Message
              dir="left"
              content="Velit reprehenderit proident sunt quis.Velit reprehenderit proident sunt quis.Velit reprehenderit proident sunt quis. "
            />
            <Message dir="right" content="Velit reprehenderit proident sunt quis. " />
            <Message dir="right" content="Velit reprehenderit proident sunt quis. " />
          </Stack>
          <Divider
            sx={{
              mx: -2,
            }}
          />
          {/* <CommentInput /> */}
        </Stack>
      </Paper>
      <Menu
        open={!!moreElement}
        anchorEl={moreElement}
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
              type: "chat",
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
            onClick={handleCloseMore}
          >
            <ReportGmailerrorredOutlined color="action" />
            Report
          </MenuItem>
        </Link>
      </Menu>
    </>
  );
};
