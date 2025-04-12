"use client";

import { User } from "@/app/model/model";
import { ArrowForwardOutlined, ChatOutlined, MarkUnreadChatAltOutlined, MoreHoriz } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Popover,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { Link } from "../next-link";

const StyledList = styled(List)(({ theme }) => ({
  "&": {
    width: "100%",
  },
  "& .MuiListItemAvatar-root": {
    minWidth: "48px",
    marginTop: theme.spacing(1),
  },
}));

interface Props {
  me: User;
}

export const MessagesButton = ({ me }: Props) => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const handleMenuClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(e.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setMenuAnchor(null);
  }, []);

  return (
    <>
      <Badge
        slotProps={{
          badge: {
            style: {
              borderRadius: "50%",
              borderColor: "white",
              borderWidth: "2px",
              borderStyle: "solid",
              right: "6px",
              top: "6px",
              width: "12px",
              height: "12px",
            },
          },
        }}
        color="warning"
        variant="dot"
        anchorOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
      >
        <IconButton
          size="medium"
          sx={{
            flexShrink: 0,
            width: "40px",
            height: "40px",
            bgcolor: "background.paper",
            boxShadow: "rgba(0, 0, 0, 0.086) 0px 5px 10px",
            "&:hover": {
              "& .MuiSvgIcon-root": {
                color: "text.primary",
              },
              bgcolor: "background.paper",
            },
          }}
          onClick={handleMenuClick}
        >
          <ChatOutlined fontSize="small" />
        </IconButton>
      </Badge>

      <Popover
        anchorEl={menuAnchor}
        open={!!menuAnchor}
        onClose={handleMenuClose}
        anchorOrigin={{
          horizontal: "left",
          vertical: "bottom",
        }}
      >
        <Card
          elevation={1}
          sx={{
            width: "360px",
          }}
        >
          <CardHeader
            sx={{
              padding: "18px 24px",
              borderBottomWidth: "1px",
              borderBottomStyle: "solid",
              borderBottomColor: "divider",
            }}
            title={
              <Typography fontSize="1.1rem" variant="h5">
                Wiadomości
              </Typography>
            }
            action={
              <IconButton size="small">
                <MoreHoriz fontSize="small" />
              </IconButton>
            }
          />
          <CardContent
            sx={{
              p: "0 0 0",
            }}
          >
            <StyledList dense disablePadding>
              <ListItemButton
                sx={{
                  gap: 1,
                  py: 1,
                  alignItems: "flex-start",
                  borderBottomWidth: "1px",
                  borderBottomStyle: "solid",
                  borderBottomColor: "divider",
                }}
              >
                <ListItemAvatar>
                  <Avatar variant="rounded" alt={`username avatar`} src={""}>
                    A{/* {username[0]} */}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  slotProps={{
                    primary: {
                      color: "text.secondary",
                    },
                  }}
                  primary={
                    <>
                      <Typography
                        variant="body2"
                        color="secondary"
                        component={Link}
                        href={`/profile/123-456-789`}
                        sx={{
                          mr: 1,
                          textDecoration: "unset",
                        }}
                      >
                        seoseo123
                      </Typography>
                      in consequat fugiat id sit deserunt dolor culpa et adipisicing dolor dolor eu.
                      <Stack direction="row" gap={0.5} mt={0.5} alignItems="center">
                        <MarkUnreadChatAltOutlined sx={{ fontSize: "1.25rem", color: "success.light" }} />
                        <Typography variant="body3">9:00 am</Typography>
                      </Stack>
                    </>
                  }
                />
              </ListItemButton>
            </StyledList>
          </CardContent>
          <CardActions>
            <Button
              color="secondary"
              fullWidth
              variant="text"
              endIcon={
                <ArrowForwardOutlined
                  sx={{
                    fontSize: "0.875rem !important",
                  }}
                />
              }
              LinkComponent={Link}
              href="/settings/account/notifications"
              sx={{
                fontWeight: 400,
                fontSize: "0.75rem",
              }}
            >
              Zobacz wszystkie
            </Button>
          </CardActions>
        </Card>
      </Popover>
    </>
  );
};
