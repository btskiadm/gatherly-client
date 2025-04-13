"use client";

import { FriendRequest, Friendship, Notification, NotificationType, User } from "@/app/model/model";
import {
  ArrowForwardOutlined,
  ChatOutlined,
  MarkUnreadChatAltOutlined,
  MoreHoriz,
  PersonAdd,
  PersonAddOutlined,
} from "@mui/icons-material";
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
import { Fragment, useCallback, useState } from "react";
import { Link } from "../next-link";
import { useNotificationSubscription } from "../../graphql/hooks/useNotificationSubscription";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { NotificationsQuery } from "@/app/model/operations";
import {
  notificationsQueryKey,
  notificationsQueryOptions,
} from "../../graphql/options/query/notificationsQueryOptions";
import { create } from "mutative";
import { configQueryOptions } from "../../graphql/options/query/configQueryOptions";

const getNotificationData = (notification: Notification) => {
  switch (notification.type) {
    case NotificationType.FriendAccepted: {
      return notification.data as Friendship;
    }
    case NotificationType.FriendRequest: {
      return notification.data as FriendRequest;
    }
  }
  return notification.data;
};

const getNotificationDataFriendRequest = (notification: Notification) => {
  return notification.data as FriendRequest;
};

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
  const queryClient = useQueryClient();
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const { data, isFetching } = useQuery(notificationsQueryOptions({ skip: 0, take: 6 }));
  const { data: configData } = useQuery(configQueryOptions({}));

  const notificationSubscriptionHandler = useCallback((notification: Notification) => {
    const notifications = queryClient.getQueryData<NotificationsQuery>(notificationsQueryKey(0, 6));

    if (!notifications) {
      console.warn("Cannot mutate notifications requests because query data does not exist.");
      return null;
    }

    const newNotifications = create(notifications, (draft) => {
      draft.notifications.count += 1;
      draft.notifications.notifications.unshift(notification);
      draft.notifications.notifications.splice(0, 6);
    });

    queryClient.setQueryData(notificationsQueryKey(0, 6), newNotifications);
  }, []);

  useNotificationSubscription(me.id, notificationSubscriptionHandler);

  const handleMenuClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(e.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setMenuAnchor(null);
  }, []);

  const notifications = data?.notifications.notifications ?? [];

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
              {notifications.map((notification) => (
                <Fragment key={notification.id}>
                  {notification.type === NotificationType.FriendRequest && (
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
                        <Avatar
                          variant="rounded"
                          alt={`username avatar`}
                          src={getNotificationDataFriendRequest(notification).sender.smallPhoto}
                        >
                          {getNotificationDataFriendRequest(notification).sender.username[0]}
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
                                mr: 0.5,
                                textDecoration: "unset",
                              }}
                            >
                              {getNotificationDataFriendRequest(notification).sender.username}
                            </Typography>
                            wysłał Tobie zaproszenie do grona znajomych.
                            <Stack direction="row" gap={0.5} mt={0.5} alignItems="center">
                              <PersonAddOutlined sx={{ fontSize: "1.25rem", color: "info.light" }} />
                              <Typography variant="body3">
                                {new Date(notification.createdAt).toLocaleString()}
                              </Typography>
                            </Stack>
                          </>
                        }
                      />
                    </ListItemButton>
                  )}
                </Fragment>
              ))}
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
