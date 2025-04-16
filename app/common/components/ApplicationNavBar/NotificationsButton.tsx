// Komponent NotificationsButton - kompletny, zrefaktoryzowany kod
"use client";

import {
  CheckOutlined,
  DeleteOutline,
  EmojiPeopleOutlined,
  ExpandMore,
  MoreHoriz,
  NotificationsOutlined,
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
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Stack,
  Typography,
  keyframes,
  styled,
} from "@mui/material";
import { useInfiniteQuery, useMutation, useQueryClient, InfiniteData } from "@tanstack/react-query";
import { useCallback, useRef, useState, Fragment } from "react";
import toast from "react-hot-toast";
import { create } from "mutative";

import { Link } from "../next-link";
import { Notification, NotificationType, User, FriendRequest, Friendship } from "@/app/model/model";
import { NotificationsQuery } from "@/app/model/operations";
import { deleteNotificationMutationFn } from "../../graphql/options/mutation/deleteNotificationMutationFn";
import { markAsReadMutationFn } from "../../graphql/options/mutation/markAsReadMutationFn";
import {
  notificationsQueryKey,
  notificationsQueryOptions,
} from "../../graphql/options/query/notificationsQueryOptions";
import { useNotificationSubscription } from "../../graphql/hooks/useNotificationSubscription";

const notificationsPerPage = 6;

const blink = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const StyledList = styled(List)(({ theme }) => ({
  width: "100%",
  ".MuiListItemAvatar-root": {
    minWidth: 48,
    marginTop: theme.spacing(1),
  },
}));

const StyledList2 = styled(List)(({ theme }) => ({
  ".MuiListItemButton-root": { width: "100%" },
  ".MuiListItemIcon-root": { minWidth: theme.spacing(4) },
}));

const BlinkedBox = styled("div")({
  backgroundColor: "pink",
  width: 8,
  height: 8,
  borderRadius: "100%",
  animation: `${blink} 1.1s linear infinite`,
});

interface Props {
  me: User;
}

export const NotificationsButton = ({ me }: Props) => {
  const queryClient = useQueryClient();
  const selectedNotificationRef = useRef<Notification | null>(null);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [notificationsPopover, setNotificationsPopover] = useState<HTMLElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery(
    notificationsQueryOptions({ itemsPerPage: notificationsPerPage })
  );

  const markAsReadMutation = useMutation({
    mutationFn: markAsReadMutationFn,
    onMutate: ({ id }) => {
      const prev = queryClient.getQueryData<InfiniteData<NotificationsQuery>>(
        notificationsQueryKey(notificationsPerPage)
      );
      if (!prev) return null;
      const updated = create(prev, (draft) => {
        draft.pages.forEach((page) => {
          const n = page.notifications.notifications.find((n) => n.id === id);
          if (n) n.read = true;
        });
      });
      queryClient.setQueryData(notificationsQueryKey(notificationsPerPage), updated);
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(notificationsQueryKey(notificationsPerPage), ctx.prev);
      toast.error("Błąd przy oznaczaniu jako przeczytane.");
    },
    onSuccess: () => toast.success("Notyfikacja oznaczona jako przeczytana."),
    onSettled: () => {
      queryClient.invalidateQueries({ predicate: (q) => q.queryKey[0] === notificationsQueryKey(-1)[0] });
    },
  });

  const deleteNotificationMutation = useMutation({
    mutationFn: deleteNotificationMutationFn,
    onMutate: ({ id }) => {
      const prev = queryClient.getQueryData<InfiniteData<NotificationsQuery>>(
        notificationsQueryKey(notificationsPerPage)
      );
      if (!prev) return null;
      const updated = create(prev, (draft) => {
        draft.pages.forEach((page) => {
          page.notifications.notifications = page.notifications.notifications.filter((n) => n.id !== id);
          page.notifications.count--;
        });
      });
      queryClient.setQueryData(notificationsQueryKey(notificationsPerPage), updated);
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(notificationsQueryKey(notificationsPerPage), ctx.prev);
      toast.error("Błąd przy usuwaniu notyfikacji.");
    },
    onSuccess: () => toast.success("Notyfikacja usunięta."),
    onSettled: () => {
      queryClient.invalidateQueries({ predicate: (q) => q.queryKey[0] === notificationsQueryKey(-1)[0] });
    },
  });

  const handleSubscription = useCallback(
    (notification: Notification) => {
      const prev = queryClient.getQueryData<InfiniteData<NotificationsQuery>>(
        notificationsQueryKey(notificationsPerPage)
      );
      if (!prev) return;
      const updated = create(prev, (draft) => {
        draft.pages[0].notifications.notifications.unshift(notification);
        draft.pages[0].notifications.count++;
      });
      queryClient.setQueryData(notificationsQueryKey(notificationsPerPage), updated);
    },
    [queryClient]
  );

  useNotificationSubscription(me.id, handleSubscription);

  const handleMarkAsRead = useCallback(() => {
    const id = selectedNotificationRef.current?.id;
    if (!id) return;
    markAsReadMutation.mutate({ id });
    setMenuAnchor(null);
  }, [markAsReadMutation]);

  const handleDeleteNotification = useCallback(() => {
    const id = selectedNotificationRef.current?.id;
    if (!id) return;
    deleteNotificationMutation.mutate({ id });
    setMenuAnchor(null);
  }, [deleteNotificationMutation]);

  const openMenu = useCallback((e: React.MouseEvent<HTMLElement>, notification: Notification) => {
    selectedNotificationRef.current = notification;
    setMenuAnchor(e.currentTarget);
  }, []);

  const handleNextPage = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage]);

  const handleNotificationPopoverOpen = (e: React.MouseEvent<HTMLElement>) => {
    setNotificationsPopover(e.currentTarget);
  };

  const handleNotificationPopoverClose = () => {
    setNotificationsPopover(null);
  };

  if (status === "error") {
    return <div>Wystąpił błąd podczas ładowania powiadomień.</div>;
  }

  return (
    <Badge
      color="warning"
      variant="dot"
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
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
    >
      <IconButton
        onClick={handleNotificationPopoverOpen}
        size="medium"
        sx={{
          flexShrink: 0,
          width: "40px",
          height: "40px",
          bgcolor: "background.paper",
          boxShadow: "rgba(0, 0, 0, 0.086) 0px 5px 10px",
          "&:hover": {
            "& .MuiSvgIcon-root": { color: "text.primary" },
            bgcolor: "background.paper",
          },
        }}
      >
        <NotificationsOutlined fontSize="small" />
      </IconButton>

      <Popover
        anchorEl={notificationsPopover}
        open={!!notificationsPopover}
        onClose={handleNotificationPopoverClose}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <Card sx={{ width: "360px" }}>
          <CardHeader
            title={
              <Typography fontSize="1.1rem" variant="h5">
                Powiadomienia
              </Typography>
            }
            action={
              <IconButton size="small">
                <MoreHoriz fontSize="small" />
              </IconButton>
            }
          />

          <CardContent sx={{ p: 0 }}>
            <StyledList dense disablePadding>
              {data?.pages.map((page) =>
                page.notifications.notifications.map((notification) => (
                  <Fragment key={notification.id}>
                    <ListItem
                      disablePadding
                      secondaryAction={
                        <Stack direction="row" alignItems="center">
                          {!notification.read && <BlinkedBox />}
                          <IconButton edge="end" size="small" onClick={(e) => openMenu(e, notification)}>
                            <MoreHoriz fontSize="small" />
                          </IconButton>
                        </Stack>
                      }
                    >
                      <ListItemButton dense>
                        <ListItemAvatar>
                          <Avatar
                            variant="rounded"
                            src={
                              notification.type === NotificationType.FriendRequest
                                ? (notification.data as FriendRequest).sender.smallPhoto
                                : (notification.data as Friendship).user2.smallPhoto
                            }
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <>
                              <Typography
                                variant="body2"
                                color="secondary"
                                component={Link}
                                href={`/profile/$
                                  {
                                    notification.type === NotificationType.FriendRequest
                                      ? (notification.data as FriendRequest).sender.id
                                      : (notification.data as Friendship).user2.id
                                  }
                                `}
                                sx={{ mr: 0.5, textDecoration: "none" }}
                              >
                                {notification.type === NotificationType.FriendRequest
                                  ? (notification.data as FriendRequest).sender.username
                                  : (notification.data as Friendship).user2.username}
                              </Typography>
                              {notification.type === NotificationType.FriendRequest
                                ? " wysłał Ci zaproszenie do znajomych."
                                : " zaakceptował Twoje zaproszenie."}
                              <Stack direction="row" gap={0.5} mt={0.5} alignItems="center">
                                {notification.type === NotificationType.FriendRequest ? (
                                  <PersonAddOutlined sx={{ fontSize: "1.25rem", color: "info.light" }} />
                                ) : (
                                  <EmojiPeopleOutlined sx={{ fontSize: "1.25rem", color: "success.light" }} />
                                )}
                                <Typography variant="body3">
                                  {new Date(notification.createdAt).toLocaleString()}
                                </Typography>
                              </Stack>
                            </>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  </Fragment>
                ))
              )}
            </StyledList>
          </CardContent>

          <CardActions>
            <Button
              color="secondary"
              disabled={isFetchingNextPage || !hasNextPage}
              fullWidth
              variant="text"
              endIcon={<ExpandMore sx={{ fontSize: "0.875rem !important" }} />}
              onClick={handleNextPage}
              sx={{ fontWeight: 400, fontSize: "0.75rem" }}
            >
              {hasNextPage ? "Wczytaj więcej" : "Brak powiadomień"}
            </Button>
          </CardActions>
        </Card>
      </Popover>

      <Popover
        anchorEl={menuAnchor}
        open={!!menuAnchor}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <StyledList2 dense disablePadding>
          <ListItemButton onClick={handleMarkAsRead}>
            <ListItemIcon>
              <CheckOutlined fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Zaznacz jako odczytane" />
          </ListItemButton>
          <ListItemButton onClick={handleDeleteNotification}>
            <ListItemIcon>
              <DeleteOutline fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Usuń" />
          </ListItemButton>
        </StyledList2>
      </Popover>
    </Badge>
  );
};
