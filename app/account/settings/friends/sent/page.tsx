"use client";

import { TruncatedTypography } from "@/app/common/components/truncated-typography";
import { acceptFriendRequestMutationFn } from "@/app/common/graphql/options/mutation/acceptFriendRequestMutationFn";
import { cancelFriendRequestMutationFn } from "@/app/common/graphql/options/mutation/cancelFriendRequestMutationFn";
import { getFriendListQueryKey } from "@/app/common/graphql/options/query/getFriendsListQueryOptions";
import { getReceivedFriendRequestsQueryKey } from "@/app/common/graphql/options/query/getReceivedFriendRequestsQueryOptions";
import {
  getSentFriendRequestsQueryKey,
  getSentFriendRequestsQueryOptions,
} from "@/app/common/graphql/options/query/getSentFriendRequestsQueryOptions";
import { FriendRequest, FriendRequestStatus } from "@/app/model/model";
import { GetSentFriendRequestsQuery } from "@/app/model/operations";
import { CheckOutlined, CloseOutlined, MoreHoriz } from "@mui/icons-material";
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
import { sentItemsPerPage } from "./config";

const StyledList = styled(List)(({ theme }) => ({
  "& .MuiListItemButton-root": {
    width: "100%",
  },

  "& .MuiListItemIcon-root": {
    minWidth: theme.spacing(4),
  },
}));

export default function Page() {
  const selectedFriendRequestRef = useRef<FriendRequest>(null);
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const skip = (page - 1) * sentItemsPerPage;

  const { data, isFetching } = useQuery(getSentFriendRequestsQueryOptions({ skip: skip, take: sentItemsPerPage }));
  const cancelFriendRequestMutation = useMutation({
    mutationFn: cancelFriendRequestMutationFn,
    onMutate: (args) => {
      const prevSentFriendRequests = queryClient.getQueryData<GetSentFriendRequestsQuery>(
        getSentFriendRequestsQueryKey(skip, sentItemsPerPage)
      );

      if (!prevSentFriendRequests) {
        console.warn("Cannot mutate sent friend requests because query data does not exist.");
        return null;
      }

      const newSentFriendRequests = create(prevSentFriendRequests, (draft) => {
        const index = draft.getSentFriendRequests.friendRequests.findIndex((rq) => rq.id === args.requestId);
        if (index >= 0) {
          draft.getSentFriendRequests.friendRequests[index].status = FriendRequestStatus.Declined;
        }
      });

      queryClient.setQueryData(getSentFriendRequestsQueryKey(skip, sentItemsPerPage), newSentFriendRequests);

      return {
        prevSentFriendRequests,
        newSentFriendRequests,
      };
    },
    onError: (error, variables, context) => {
      if (context?.prevSentFriendRequests) {
        queryClient.setQueryData(
          getReceivedFriendRequestsQueryKey(skip, sentItemsPerPage),
          context.prevSentFriendRequests
        );
      }
      toast.error("Odrzucenie nie powiodło się. Spróbuj ponownie później.");
    },
    onSettled: async (data, error, variables) => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === getFriendListQueryKey(-1, -1)[0],
      });
    },
    onSuccess: async () => {
      toast.success("Zaproszenie zostało odrzucone.");
    },
  });

  const acceptFriendRequestMutation = useMutation({
    mutationFn: acceptFriendRequestMutationFn,
    onMutate: (args) => {
      const prevSentFriendRequests = queryClient.getQueryData<GetSentFriendRequestsQuery>(
        getSentFriendRequestsQueryKey(skip, sentItemsPerPage)
      );

      if (!prevSentFriendRequests) {
        console.warn("Cannot mutate sent friend requests because query data does not exist.");
        return null;
      }

      const newSentFriendRequests = create(prevSentFriendRequests, (draft) => {
        const index = draft.getSentFriendRequests.friendRequests.findIndex((rq) => rq.id === args.requestId);
        if (index >= 0) {
          draft.getSentFriendRequests.friendRequests[index].status = FriendRequestStatus.Accepted;
        }
      });

      queryClient.setQueryData(getReceivedFriendRequestsQueryKey(skip, sentItemsPerPage), newSentFriendRequests);

      return {
        prevSentFriendRequests,
        newSentFriendRequests,
      };
    },
    onError: (error, variables, context) => {
      if (context?.prevSentFriendRequests) {
        queryClient.setQueryData(
          getReceivedFriendRequestsQueryKey(skip, sentItemsPerPage),
          context.prevSentFriendRequests
        );
      }
      toast.error("Akceptacja zaproszenia nie powiodła się. Spróbuj ponownie później.");
    },
    onSettled: async (data, error, variables) => {
      await queryClient.invalidateQueries({
        predicate: (query) =>
          // query.queryKey[0] === getReceivedFriendRequestsQueryKey(-1, -1)[0] ||
          query.queryKey[0] === getFriendListQueryKey(-1, -1)[0],
      });
    },
    onSuccess: async () => {
      toast.success("Zaproszenie zostało zaakceptowane.");
    },
  });

  const { friendRequests, count } = data?.getSentFriendRequests ?? { friendRequests: [], count: 0 };
  const totalPages = Math.ceil(count / sentItemsPerPage);

  const handleMenuClick = useCallback((e: React.MouseEvent<HTMLElement>, friendRequest: FriendRequest) => {
    selectedFriendRequestRef.current = friendRequest;
    e.stopPropagation();
    setMenuAnchor(e.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    selectedFriendRequestRef.current = null;
    setMenuAnchor(null);
  }, []);

  const handleCancelFriendRequest = useCallback(async () => {
    const requestId = selectedFriendRequestRef.current?.id;
    handleMenuClose();
    if (requestId) {
      await cancelFriendRequestMutation.mutateAsync({
        requestId: requestId,
      });
    }
  }, []);

  const handleAcceptFriendRequest = useCallback(async () => {
    const requestId = selectedFriendRequestRef.current?.id;
    handleMenuClose();

    if (requestId) {
      await acceptFriendRequestMutation.mutateAsync({
        requestId: requestId,
      });
    }
  }, []);

  const isLoading = isFetching || acceptFriendRequestMutation.isPending || cancelFriendRequestMutation.isPending;

  return (
    <>
      <CardContent
        sx={{
          p: "0",
          ...(isLoading ? { pointerEvents: "none", opacity: 0.6 } : {}),
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
                xs: 3,
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
                xs: 3,
              }}
            >
              <TruncatedTypography color="text.secondary" variant="body2">
                Data wysłania
              </TruncatedTypography>
            </Grid2>
            <Grid2
              display="flex"
              alignItems="center"
              size={{
                xs: 3,
              }}
            >
              <TruncatedTypography color="text.secondary" variant="body2">
                Data Aktualizacji
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
                xs: 1,
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
            {friendRequests.map((friend) => (
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
                      xs: 3,
                    }}
                  >
                    <Avatar
                      variant="rounded"
                      src={friend.receiver.smallPhoto}
                      sx={{
                        width: "48px",
                        height: "48px",
                      }}
                    />
                    <TruncatedTypography variant="body2">{friend.receiver.username}</TruncatedTypography>
                  </Grid2>
                  <Grid2
                    display="flex"
                    alignItems="center"
                    size={{
                      xs: 3,
                    }}
                  >
                    <TruncatedTypography variant="body2">
                      {new Date(friend.createdAt).toLocaleString()}
                    </TruncatedTypography>
                  </Grid2>
                  <Grid2
                    display="flex"
                    alignItems="center"
                    size={{
                      xs: 3,
                    }}
                  >
                    <TruncatedTypography variant="body2">
                      {new Date(friend.updatedAt).toLocaleString()}
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
                    {friend.status === FriendRequestStatus.Accepted && (
                      <Chip color="success" label="Zaakceptowane" size="small" />
                    )}
                    {friend.status === FriendRequestStatus.Pending && (
                      <Chip color="warning" label="Oczekujące" size="small" />
                    )}
                    {friend.status === FriendRequestStatus.Declined && (
                      <Chip color="error" label="Odrzucone" size="small" />
                    )}
                  </Grid2>
                  <Grid2
                    display="flex"
                    alignItems="center"
                    justifyContent="end"
                    size={{
                      xs: 1,
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
      {count > sentItemsPerPage && (
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
          <ListItem disablePadding onClick={handleMenuClose}>
            <ListItemButton onClick={handleAcceptFriendRequest}>
              <ListItemIcon sx={{ color: "success.main" }}>
                <CheckOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Zaakceptuj" />
            </ListItemButton>
          </ListItem>
          <ListItemButton onClick={handleCancelFriendRequest}>
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
