"use client";

import { TruncatedTypography } from "@/app/common/components/truncated-typography";
import { cancelFriendshipMutationFn } from "@/app/common/graphql/options/mutation/cancelFriendshipMutationFn";
import {
  getFriendListQueryKey,
  getFriendsListQueryOptions,
} from "@/app/common/graphql/options/query/getFriendsListQueryOptions";
import { Friend, User } from "@/app/model/model";
import { GetFriendsListQuery } from "@/app/model/operations";
import { CloseOutlined, MoreHoriz } from "@mui/icons-material";
import {
  Avatar,
  Box,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  Grid2,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Pagination,
  Popover,
  styled,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { create } from "mutative";
import { useCallback, useRef, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import toast from "react-hot-toast";
import { friendsPerPage } from "./config";

const StyledList = styled(List)(({ theme }) => ({
  "& .MuiListItemButton-root": {
    width: "100%",
  },

  "& .MuiListItemIcon-root": {
    minWidth: theme.spacing(4),
  },
}));

export default function Page() {
  const selectedFriendRef = useRef<Friend>(null);
  const queryClient = useQueryClient();
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [page, setPage] = useState(1);
  const skip = (page - 1) * friendsPerPage;

  const cancelFriendshipMutation = useMutation({
    mutationFn: cancelFriendshipMutationFn,
    onMutate: (args) => {
      const prevGetFriendsList = queryClient.getQueryData<GetFriendsListQuery>(
        getFriendListQueryKey(skip, friendsPerPage)
      );

      if (!prevGetFriendsList) {
        console.warn("Cannot mutate cancel freindship requests because query data does not exist.");
        return null;
      }

      const newGetFriendsList = create(prevGetFriendsList, (draft) => {
        const index = draft.getFriendsList.friends.findIndex((rq) => rq.id === args.friendshipId);
        if (index >= 0) {
          draft.getFriendsList.count -= 1;
          draft.getFriendsList.friends.splice(0, 1);
        }
      });

      queryClient.setQueryData(getFriendListQueryKey(skip, friendsPerPage), newGetFriendsList);

      return {
        prevGetFriendsList,
        newGetFriendsList,
      };
    },
    onError: (error, variables, context) => {
      if (context?.prevGetFriendsList) {
        queryClient.setQueryData(getFriendListQueryKey(skip, friendsPerPage), context.prevGetFriendsList);
      }
      toast.error("Odrzucenie nie powiodło się. Spróbuj ponownie później.");
    },
    onSettled: async (data, error, variables) => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === getFriendListQueryKey(-1, -1)[0],
      });
    },
    onSuccess: async () => {
      toast.success("Pomyślnie usunięto z listy znajomych.");
    },
  });

  const handleMenuClick = useCallback((e: React.MouseEvent<HTMLElement>, friend: Friend) => {
    selectedFriendRef.current = friend;
    e.stopPropagation();
    setMenuAnchor(e.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    selectedFriendRef.current = null;
    setMenuAnchor(null);
  }, []);

  const handleCancelFriendship = useCallback(async () => {
    const friendshipId = selectedFriendRef.current?.id;
    handleMenuClose();
    if (friendshipId) {
      await cancelFriendshipMutation.mutateAsync({
        friendshipId: friendshipId,
      });
    }
  }, []);

  const { data, isFetching } = useQuery(getFriendsListQueryOptions({ skip: skip, take: friendsPerPage }));
  const { friends, count } = data?.getFriendsList ?? { friends: [], count: 0 };

  const totalPages = Math.ceil(count / friendsPerPage);

  const isLoading = isFetching || cancelFriendshipMutation.isPending;

  return (
    <>
      <CardContent
        sx={{
          p: "0",
          ...(isFetching ? { pointerEvents: "none", opacity: 0.6 } : {}),
        }}
      >
        {isLoading && (
          <Box
            position="absolute"
            top="50%"
            marginTop="36px"
            left="50%"
            sx={{
              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <ListItem
          sx={{
            bgcolor: "background.default",
            gap: 1,
            px: "24px",
            py: "8px",
            alignItems: "center",
            borderBottomWidth: "1px",
            borderBottomStyle: "solid",
            borderBottomColor: "divider",
          }}
        >
          <Grid2 container spacing={2} width="100%">
            <Grid2
              display="flex"
              alignItems="center"
              direction="row"
              gap={2}
              size={{
                xs: 4,
              }}
            >
              <TruncatedTypography color="text.secondary" variant="body2">
                Nazwa Użytkownika
              </TruncatedTypography>
            </Grid2>
            <Grid2
              display="flex"
              alignItems="center"
              size={{
                xs: 4,
              }}
            >
              <TruncatedTypography color="text.secondary" variant="body2">
                Data dodania
              </TruncatedTypography>
            </Grid2>
            <Grid2
              display="flex"
              alignItems="center"
              justifyContent="center"
              size={{
                xs: 2,
              }}
            >
              <TruncatedTypography color="text.secondary" variant="body2">
                Status
              </TruncatedTypography>
            </Grid2>
            <Grid2
              display="flex"
              alignItems="center"
              justifyContent="end"
              size={{
                xs: 2,
              }}
            >
              <TruncatedTypography color="text.secondary" variant="body2">
                Akcja
              </TruncatedTypography>
            </Grid2>
          </Grid2>
        </ListItem>

        <Scrollbars
          style={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            height: "100%",
          }}
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHeight
          autoHeightMin={350}
          thumbMinSize={30}
          universal={true}
          autoHeightMax="unset"
          renderView={(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => (
            <div
              {...props}
              style={{
                minHeight: "15px",
                maxHeight: "unset",
                position: "absolute",
                inset: "0px",
                overflow: "scroll",
                marginRight: "-18px",
                marginBottom: "-18px",
              }}
            />
          )}
        >
          <List disablePadding>
            {friends.map((friend) => (
              <ListItem
                key={friend.id}
                sx={{
                  gap: 1,
                  px: "24px",
                  py: "16px",
                  alignItems: "center",
                  borderBottomWidth: "1px",
                  borderBottomStyle: "solid",
                  borderBottomColor: "divider",
                }}
              >
                <Grid2 container spacing={2} width="100%">
                  <Grid2
                    display="flex"
                    alignItems="center"
                    direction="row"
                    gap={2}
                    size={{
                      xs: 4,
                    }}
                  >
                    <Avatar
                      variant="rounded"
                      src={friend.user.smallPhoto}
                      sx={{
                        width: "48px",
                        height: "48px",
                      }}
                    />
                    <TruncatedTypography variant="body2">{friend.user.username}</TruncatedTypography>
                  </Grid2>
                  <Grid2
                    display="flex"
                    alignItems="center"
                    size={{
                      xs: 4,
                    }}
                  >
                    <TruncatedTypography variant="body2">
                      {new Date(friend.createdAt).toLocaleString()}
                    </TruncatedTypography>
                  </Grid2>
                  <Grid2
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    size={{
                      xs: 2,
                    }}
                  >
                    <Chip color="success" label="Accepted" size="small" />
                  </Grid2>
                  <Grid2
                    display="flex"
                    alignItems="center"
                    justifyContent="end"
                    size={{
                      xs: 2,
                    }}
                  >
                    <IconButton size="small" onClick={(e) => handleMenuClick(e, friend)}>
                      <MoreHoriz fontSize="small" />
                    </IconButton>
                  </Grid2>
                </Grid2>
              </ListItem>
            ))}
          </List>
        </Scrollbars>
      </CardContent>
      {count > friendsPerPage && (
        <CardActions sx={{ display: "flex", justifyContent: "end" }}>
          <Pagination count={totalPages} variant="text" shape="rounded" onChange={(e, page) => setPage(page)} />
        </CardActions>
      )}
      <Popover
        anchorEl={menuAnchor}
        open={!!menuAnchor}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <StyledList dense disablePadding>
          <ListItemButton onClick={handleCancelFriendship}>
            <ListItemIcon sx={{ color: "error.main" }}>
              <CloseOutlined fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Odrzuć" />
          </ListItemButton>
        </StyledList>
      </Popover>
    </>
  );
}
