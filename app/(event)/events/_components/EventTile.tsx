"use client";

import { ClampTypography } from "@/app/common/components/ClampTypography";
import { Link } from "@/app/common/components/NextLink";
import { TruncatedTypography } from "@/app/common/components/TruncatedTypography";
import { EventTileDto } from "@/app/mock/mock-api.types";
import {
  AccessTime,
  CalendarMonth,
  FavoriteBorderOutlined,
  Group,
  GroupAdd,
  MoreVert,
  Place,
  ReportGmailerrorredOutlined,
  StarBorderRounded,
  VerifiedOutlined,
} from "@mui/icons-material";
import { Avatar, Box, Button, Chip, Divider, Grid2, IconButton, Menu, MenuItem, Stack, Tooltip } from "@mui/material";
import { PropsWithChildren, useCallback, useState } from "react";
import { toast } from "react-hot-toast";

const time = (isoStart: string, isoEnd: string) =>
  `${new Intl.DateTimeFormat("pl-PL", {
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(isoStart))} - ${new Intl.DateTimeFormat("pl-PL", {
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(isoEnd))}`;

const shortDay1 = (iso: string) =>
  new Intl.DateTimeFormat("pl-PL", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(new Date(iso));

export const EventTile = ({
  tile: {
    id: eventId,
    title: eventTile,
    description,
    createdAt,
    userLength,
    categories,
    cities,
    date: { startAt, endAt },
    groupMeta: { id: groupId, title: groupTile, remote, sponsored, thumbnail, verified },
  },
}: PropsWithChildren<{ tile: EventTileDto }>) => {
  const [moreElement, setMoreElement] = useState<HTMLElement | null>(null);

  const handleOpenMore = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setMoreElement(event.currentTarget);
  }, []);

  const handleCloseMore = useCallback(
    (reason?: "favorite") => () => {
      if (reason === "favorite") {
        toast.success("Event added to favorite.");
      }

      setMoreElement(null);
    },
    []
  );

  const handleJoin = useCallback(() => {
    toast.success("You have just join to the event. Congrats !");
  }, []);

  return (
    <>
      <Link
        href={`/event/${eventId}`}
        sx={{
          zIndex: 1,
          height: 0,
          width: 0,
          "&:after": {
            zIndex: 1,
            bottom: 0,
            content: "''",
            left: 0,
            position: "absolute",
            right: 0,
            top: 0,
          },
        }}
      />
      <Stack height="100%">
        <Stack gap={1} p={2} height="100%">
          <Box position="relative">
            <Link
              href={`/group/${groupId}`}
              sx={{
                zIndex: 2,
                height: 0,
                width: 0,
                "&:after": {
                  zIndex: 1,
                  bottom: 0,
                  content: "''",
                  left: 0,
                  position: "absolute",
                  right: 0,
                  top: 0,
                },
              }}
            />
            <Stack direction="row" gap={1} alignItems="center">
              <Avatar
                src={thumbnail.thumb}
                variant="rounded"
                sx={{
                  height: "3rem",
                  width: "3rem",
                }}
              />
              <Tooltip title={groupTile}>
                <ClampTypography clamp={2} variant="body2">
                  {groupTile}
                </ClampTypography>
              </Tooltip>
              <Stack direction="row" gap={0.5}>
                {verified && (
                  <Chip
                    size="small"
                    sx={{
                      ".MuiChip-label": {
                        px: "4px",
                      },
                    }}
                    icon={
                      <VerifiedOutlined
                        fontSize="small"
                        sx={{
                          color: "text.secondary",
                        }}
                      />
                    }
                  />
                )}
                {sponsored && (
                  <Chip
                    size="small"
                    sx={{
                      ".MuiChip-label": {
                        px: "4px",
                      },
                    }}
                    icon={
                      <StarBorderRounded
                        fontSize="small"
                        sx={{
                          color: "text.secondary",
                        }}
                      />
                    }
                  />
                )}
              </Stack>
            </Stack>
          </Box>
          <Divider />

          {/* title */}
          <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
            <Tooltip title={eventTile}>
              <ClampTypography variant="subtitle2" minWidth="0px" clamp={2}>
                {eventTile}
              </ClampTypography>
            </Tooltip>
          </Stack>

          {/* date and location */}
          <Grid2 container spacing={1}>
            <Grid2 size={7}>
              <Stack direction="row" gap={0.5} alignItems="center">
                <CalendarMonth
                  fontSize="small"
                  sx={{
                    color: "text.secondary",
                  }}
                />
                <TruncatedTypography variant="body2" color="text.secondary">
                  {shortDay1(startAt)}
                </TruncatedTypography>
              </Stack>
            </Grid2>
            <Grid2 size={5}>
              <Stack direction="row" gap={0.5} alignItems="center">
                <Place
                  fontSize="small"
                  sx={{
                    color: "text.secondary",
                  }}
                />
                <TruncatedTypography variant="body2" color="text.secondary">
                  {cities[0].label}
                </TruncatedTypography>
              </Stack>
            </Grid2>
          </Grid2>

          {/* time and members */}
          <Grid2 container spacing={1}>
            <Grid2 size={7}>
              <Stack direction="row" gap={0.5} alignItems="center">
                <AccessTime
                  fontSize="small"
                  sx={{
                    color: "text.secondary",
                  }}
                />
                <TruncatedTypography variant="body2" color="text.secondary">
                  {time(startAt, endAt)}
                </TruncatedTypography>
              </Stack>
            </Grid2>
            <Grid2 size={5}>
              <Stack direction="row" gap={0.5} alignItems="center">
                <Group
                  fontSize="small"
                  sx={{
                    color: "text.secondary",
                  }}
                />
                <TruncatedTypography variant="body2" color="text.secondary">
                  {userLength} participants
                </TruncatedTypography>
              </Stack>
            </Grid2>
          </Grid2>

          {/* actions */}
          <Box height="100%" />
          <Stack justifyContent="space-between" direction="row">
            <IconButton
              size="small"
              onClick={handleOpenMore}
              sx={{
                zIndex: 2,
              }}
            >
              <MoreVert />
            </IconButton>
            <Button
              size="small"
              variant="outlined"
              startIcon={<GroupAdd fontSize="small" />}
              onClick={handleJoin}
              sx={{
                zIndex: 2,
              }}
            >
              Join
            </Button>
          </Stack>
        </Stack>
      </Stack>

      {/* menu */}
      <Menu
        open={!!moreElement}
        anchorEl={moreElement}
        onClose={handleCloseMore()}
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
        <MenuItem onClick={handleCloseMore("favorite")} disableRipple>
          <FavoriteBorderOutlined color="action" />
          Favorite
        </MenuItem>
        <Link
          href={{
            pathname: "/report",
            query: {
              type: "event",
              id: eventId,
            },
          }}
          underline="none"
        >
          <MenuItem
            disableRipple
            sx={{
              color: "text.primary",
            }}
            onClick={handleCloseMore()}
          >
            <ReportGmailerrorredOutlined color="action" />
            Report
          </MenuItem>
        </Link>
      </Menu>
    </>
  );
};
