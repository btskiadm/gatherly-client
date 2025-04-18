"use client";

import { Link } from "@/app/common/components/next-link";
import { TruncatedTypography } from "@/app/common/components/truncated-typography";
import { meQueryOptions } from "@/app/common/graphql/options/query/meQueryOptions";
import {
  EmojiPeopleOutlined,
  ExpandMoreOutlined,
  FilterAltOutlined,
  InboxOutlined,
  OutboxOutlined,
  PersonAddOutlined,
  SearchOutlined,
  SwapVert,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Divider,
  FormControl,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { InviteUser, inviteUserRef } from "@/app/common/components/InviteUser/InviteUser";
import { ModalTemplate } from "@/app/common/components/Modal/modal-template";
import { sendFriendRequestMutationFn } from "@/app/common/graphql/options/mutation/sendFriendRequestMutationFn";
import { getSentFriendRequestsRootQueryKey } from "@/app/common/graphql/options/query/getSentFriendRequestsQueryOptions";
import { FriendRequest } from "@/app/model/model";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";

const InviteFriends = ({ onClose }: { onClose: (friendRequests: FriendRequest[]) => void }) => {
  const mutation = useMutation({
    mutationFn: sendFriendRequestMutationFn,
  });
  const [loading, setLoading] = useState(false);
  const inviteUserRef = useRef<inviteUserRef>(null);

  const invite = useMemo(() => {
    return {
      onAction: async () => {
        const data = inviteUserRef.current?.invite();

        if (!data?.success) {
          toast.error("Validation error. Please check the form.");
          return;
        }

        try {
          setLoading(true);
          const reponse = await mutation.mutateAsync(
            {
              receiverIds: data.data.inviteIds,
            },
            {
              onError: () => {
                toast.error("Internal server error. Please try again later.");
              },
              onSuccess: () => {
                toast.success("Zaproszenie wysłane.");
              },
            }
          );

          setLoading(false);

          onClose(reponse.sendFriendRequest);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      },
      text: "Zaproś",
    };
  }, [onClose]);

  const cancel = useMemo(
    () => ({
      onAction: () => onClose([]),
    }),
    [onClose]
  );

  return (
    <ModalTemplate title="Wyślij zaproszenie" open={true} loading={loading} cancel={cancel} confirm={invite}>
      <InviteUser ref={inviteUserRef} />
    </ModalTemplate>
  );
};

const navigationItems = [
  {
    href: "/account/settings/friends",
    icon: <EmojiPeopleOutlined fontSize="small" />,
    text: "Moji znajomi",
  },
  {
    href: "/account/settings/friends/received",
    icon: <InboxOutlined fontSize="small" />,
    text: "Otrzymane zaproszenia",
  },
  {
    href: "/account/settings/friends/sent",
    icon: <OutboxOutlined fontSize="small" />,
    text: "Wysłane zaproszenia",
  },
];
const StyledList = styled(List)(({ theme }) => ({
  "&": {
    width: "100%",
  },
  "& .MuiListSubheader-root": {
    backgroundColor: "transparent",
    fontWeight: 400,
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontSize: "12px",
    padding: "12px 16px",
    lineHeight: "normal",
  },
  "& .MuiListItemButton-root": {
    width: "100%",
    borderRadius: "12px",
    marginTop: "1px",
    marginBottom: "1px",
  },
  "& .MuiDivider-root": {
    marginTop: theme.spacing(2),
  },
  "& .MuiListItemIcon-root": {
    minWidth: theme.spacing(4),
  },
}));

export default function Layout({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(meQueryOptions());
  const [openInviteFriendModal, setOpenInviteFriendModal] = useState(false);

  const handleCloseModal = useCallback(async (friendRequests: FriendRequest[]) => {
    await queryClient.invalidateQueries({
      predicate: (query) => query.queryKey[0] === getSentFriendRequestsRootQueryKey,
    });

    setOpenInviteFriendModal(false);
  }, []);

  const pathname = usePathname();

  return (
    <>
      {openInviteFriendModal && <InviteFriends onClose={handleCloseModal} />}
      <Stack gap={4}>
        <Stack direction="column" gap={2}>
          <Stack direction="row" position="relative">
            <Typography variant="h3">Znajomi</Typography>
          </Stack>
          <Divider variant="fullWidth" />
        </Stack>

        <Stack direction="row" gap={3}>
          <Stack
            direction="column"
            gap={3}
            sx={{
              minWidth: "240px",
              maxWidth: "240px",
            }}
          >
            <Stack direction="row" gap={2}>
              <Avatar
                src={data.me?.smallPhoto}
                sx={{
                  height: "60px",
                  width: "60px",
                }}
                alt="avatar"
              >
                {data.me?.username?.[0]}
              </Avatar>
              <Stack direction="column" justifyContent="center" minWidth={0}>
                <TruncatedTypography variant="body1">{data.me?.username}</TruncatedTypography>
              </Stack>
            </Stack>
            <Button
              variant="contained"
              startIcon={<PersonAddOutlined />}
              onClick={() => setOpenInviteFriendModal(true)}
            >
              Dodaj znajomego
            </Button>
            <StyledList dense disablePadding>
              {navigationItems.map((item, groupIndex) => (
                <ListItem key={item.href} disablePadding>
                  <ListItemButton LinkComponent={Link} href={item.href} selected={pathname === item.href}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={<Typography variant="body2">{item.text}</Typography>} />
                  </ListItemButton>
                </ListItem>
              ))}
            </StyledList>
          </Stack>

          <Stack direction="column" gap={2} width="100%">
            <Card
              elevation={1}
              sx={{
                width: "100%",
              }}
            >
              <CardHeader
                sx={{
                  padding: "18px 24px",
                  borderBottomWidth: "1px",
                  borderBottomStyle: "solid",
                  borderBottomColor: "divider",
                  "& > .MuiCardHeader-action": {
                    alignSelf: "center",
                    m: 0,
                  },
                }}
                title={
                  <FormControl
                    sx={{
                      width: "100%",
                      maxWidth: "320px",
                    }}
                  >
                    <TextField
                      placeholder="Wyszukaj użytkownika"
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchOutlined />
                            </InputAdornment>
                          ),
                        },
                      }}
                      size="small"
                      variant="outlined"
                    />
                  </FormControl>
                }
                action={
                  <Stack direction="row" justifyContent="space-between" width="100%" gap={2}>
                    <Stack direction="row" justifyContent="flex-end" gap={1}>
                      <Button
                        variant="outlined"
                        startIcon={<FilterAltOutlined fontSize="small" />}
                        endIcon={<ExpandMoreOutlined fontSize="small" />}
                      >
                        Filter
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<SwapVert fontSize="small" />}
                        endIcon={<ExpandMoreOutlined fontSize="small" />}
                      >
                        Sort
                      </Button>
                    </Stack>
                  </Stack>
                }
              />
              {children}
            </Card>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
