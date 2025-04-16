"use client";

import { LocalTime } from "@/app/common/components/LocalTime/LocalTime";
import { TruncatedTypography } from "@/app/common/components/truncated-typography";
import {
  getGroupJoinInvitationRequestsQueryKey,
  getGroupJoinInvitationRequestsQueryOptions,
} from "@/app/common/graphql/options/query/getGroupJoinInvitationRequestsQueryOptions";
import { getGroupJoinRequestsQueryOptions } from "@/app/common/graphql/options/query/getGroupJoinRequestsQueryOptions";
import { EditOutlined } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid2,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import { QueryClient, useQuery } from "@tanstack/react-query";

export const RequestsPage = ({ groupId }: { groupId: string }) => {
  const { data: getGroupJoinRequests, isFetching: isFetchingGetGroupJoinRequests } = useQuery(
    getGroupJoinRequestsQueryOptions({ groupId: groupId, status: [] })
  );
  const { data: getGroupJoinInvitationRequests, isFetching: isFetchingGetGroupJoinInvitationRequests } = useQuery(
    getGroupJoinInvitationRequestsQueryOptions({ groupId: groupId, status: [] })
  );

  return (
    <Stack direction="column" gap={4}>
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
          }}
          title={<Typography variant="h5">Oczekujące</Typography>}
          subheader={
            <Typography variant="body2" color="text.secondary">
              Lista osób oczekująca na akceptecję dołączenia do grupy
            </Typography>
          }
        />
        <CardContent
          sx={{
            p: "0 0 24px",
          }}
        >
          {isFetchingGetGroupJoinRequests && <CircularProgress />}
          <List disablePadding></List>
          {getGroupJoinRequests?.getGroupJoinRequests.map((request) => (
            <ListItem
              secondaryAction={
                <Stack gap={1} direction="row" flexWrap="nowrap">
                  <Button color="error" variant="contained">
                    Odrzuć
                  </Button>
                  <Button color="primary" variant="contained">
                    Zaakceptuj
                  </Button>
                </Stack>
              }
              key={request.id}
              sx={{
                gap: 2,
                p: 0,
                alignItems: "center",
                borderBottomWidth: "1px",
                borderBottomStyle: "solid",
                borderBottomColor: "divider",
                display: "flex",
              }}
            >
              <ListItemButton
                sx={{
                  px: "24px",
                  py: "16px",
                }}
              >
                <Grid2 container width="100%">
                  <Grid2
                    size={{
                      xs: 4,
                    }}
                    sx={{
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      variant="rounded"
                      src={request.user.smallPhoto}
                      sx={{
                        width: "64px",
                        height: "64px",
                      }}
                    />
                    <TruncatedTypography>{request.user.username}</TruncatedTypography>
                  </Grid2>
                  <Grid2
                    size={{
                      xs: 3,
                    }}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TruncatedTypography variant="body3" color="text.secondary">
                      Utworzono
                    </TruncatedTypography>
                    <TruncatedTypography variant="body2">
                      <LocalTime date={new Date(request.createdAt)} formatter={(d) => d.toLocaleString()} />
                    </TruncatedTypography>
                  </Grid2>
                  <Grid2
                    size={{
                      xs: 3,
                    }}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TruncatedTypography variant="body3" color="text.secondary">
                      Status konta
                    </TruncatedTypography>
                    <TruncatedTypography variant="body2">{request.user.status}</TruncatedTypography>
                  </Grid2>
                  <Grid2
                    size={{
                      xs: 2,
                    }}
                  ></Grid2>
                </Grid2>
              </ListItemButton>
            </ListItem>
          ))}
        </CardContent>
      </Card>
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
          }}
          title={<Typography variant="h5">Wysłane</Typography>}
          subheader={
            <Typography variant="body2" color="text.secondary">
              Lista osób które otrymały zaproszenie dołączenia do grupy
            </Typography>
          }
        />
        <CardContent
          sx={{
            p: "0 0 24px",
          }}
        >
          {isFetchingGetGroupJoinInvitationRequests && <CircularProgress />}
          <List disablePadding>
            {getGroupJoinInvitationRequests?.getGroupJoinInvitationRequests.map((request) => (
              <ListItem
                secondaryAction={
                  <Button color="error" variant="outlined">
                    Anuluj
                  </Button>
                }
                key={request.id}
                sx={{
                  p: 0,
                  borderBottomWidth: "1px",
                  borderBottomStyle: "solid",
                  borderBottomColor: "divider",
                  display: "flex",
                }}
              >
                <ListItemButton
                  sx={{
                    px: "24px",
                    py: "16px",
                    alignItems: "center",
                  }}
                >
                  <Grid2 container width="100%">
                    <Grid2
                      size={{
                        xs: 2,
                      }}
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        variant="rounded"
                        src={request.user.smallPhoto}
                        sx={{
                          width: "64px",
                          height: "64px",
                        }}
                      />
                      <TruncatedTypography>{request.user.username}</TruncatedTypography>
                    </Grid2>
                    <Grid2
                      size={{
                        xs: 2,
                      }}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TruncatedTypography variant="body3" color="text.secondary">
                        Zapraszający
                      </TruncatedTypography>
                      <TruncatedTypography variant="body2">{request.sender?.username ?? "---"}</TruncatedTypography>
                    </Grid2>
                    <Grid2
                      size={{
                        xs: 3,
                      }}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TruncatedTypography variant="body3" color="text.secondary">
                        Utworzono
                      </TruncatedTypography>
                      <TruncatedTypography variant="body2">
                        <LocalTime date={new Date(request.createdAt)} formatter={(d) => d.toLocaleString()} />
                      </TruncatedTypography>
                    </Grid2>
                    <Grid2
                      size={{
                        xs: 3,
                      }}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TruncatedTypography variant="body3" color="text.secondary">
                        Status konta
                      </TruncatedTypography>
                      <TruncatedTypography variant="body2">{request.user.status}</TruncatedTypography>
                    </Grid2>
                    <Grid2
                      size={{
                        xs: 2,
                      }}
                    >
                      {/* button placeholder */}
                    </Grid2>
                  </Grid2>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Stack>
  );
};
