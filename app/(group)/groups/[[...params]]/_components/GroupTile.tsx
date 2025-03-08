"use client";

import { ClampTypography } from "@/app/common/components/clamp-typography";
import { Link } from "@/app/common/components/next-link";
import { TruncatedTypography } from "@/app/common/components/truncated-typography";
import { GroupTile as GroupTileType } from "@/app/model/model";
import {
  AccessTime,
  ArrowDropDown,
  CalendarMonthOutlined,
  CloudOutlined,
  FavoriteBorderOutlined,
  Group,
  GroupAdd,
  InterestsOutlined,
  MoreVert,
  PlaceOutlined,
  ReportGmailerrorredOutlined,
  StarBorderRounded,
  VerifiedOutlined,
} from "@mui/icons-material";
import { Avatar, Box, Button, Chip, IconButton, Menu, MenuItem, Popover, Stack, Tooltip } from "@mui/material";
import { PropsWithChildren, useCallback, useState } from "react";
import { toast } from "react-hot-toast";

// todo: translation
function formatDateDifference(dateInput: Date) {
  const now = new Date();
  const differenceInMilliseconds = now.getTime() - dateInput.getTime();
  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

  if (differenceInHours < 24) {
    return "new";
  } else if (differenceInDays < 7) {
    return `${Math.floor(differenceInDays)} d.`;
  } else {
    const differenceInWeeks = Math.floor(differenceInDays / 7);
    return `${differenceInWeeks} w.`;
  }
}

export const GroupTile = ({
  tile: {
    id,
    title,
    description,
    createdAt,
    membersCount,
    isSponsored,
    isVerified,
    mediumPhoto,
    eventsCount,
    cities,
    categories,
  },
}: PropsWithChildren<{ tile: GroupTileType }>) => {
  const [moreMenuElement, setMoreMenuElement] = useState<HTMLElement | null>(null);
  const [citiesMoreElement, setCitiesMoreElement] = useState<HTMLElement | null>(null);
  const [categoriesMoreElement, setCategoriesMoreElement] = useState<HTMLElement | null>(null);

  const handleOpenMenuMore = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setMoreMenuElement(event.currentTarget);
  }, []);

  const handleOpenCities = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setCitiesMoreElement(event.currentTarget);
  }, []);

  const handleOpenCategories = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setCategoriesMoreElement(event.currentTarget);
  }, []);

  const handleCloseCities = useCallback(() => {
    setCitiesMoreElement(null);
  }, []);

  const handleCloseCategories = useCallback(() => {
    setCategoriesMoreElement(null);
  }, []);

  const handleCloseMenuMore = useCallback(() => {
    setMoreMenuElement(null);
  }, []);

  const handleJoin = useCallback(() => {
    toast.success("You have just joined the group. Congrats!");
  }, []);

  const createdAtDate = new Date(createdAt);

  return (
    <>
      <Link
        href={`/group/${id}/about`}
        sx={{
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
        <Avatar
          alt="logo"
          variant="rounded"
          sizes="100vw"
          src={mediumPhoto}
          sx={{
            width: "100%",
            height: "13rem",
          }}
        />

        <Stack gap={1} p={2} height="100%">
          {/* Title */}
          <Stack direction="row">
            <Tooltip title={title}>
              <TruncatedTypography variant="subtitle1" minWidth="0px">
                {title}
              </TruncatedTypography>
            </Tooltip>
          </Stack>
          {/* Chips */}
          <Stack
            gap={0.5}
            direction="row"
            flexShrink={0}
            width="min-content"
            sx={{
              flexWrap: "wrap",
              overflowY: "hidden",
              overflowX: "auto",
              width: "100%",
              padding: 0,
              "::-webkit-scrollbar": {
                background: "transparent",
                width: 0,
                height: 0,
              },
            }}
          >
            {cities.length === 0 && (
              <Tooltip title="Remote group">
                <Chip
                  size="small"
                  variant="outlined"
                  sx={{
                    zIndex: 1,
                    ".MuiChip-label": {
                      px: "4px",
                    },
                  }}
                  icon={<CloudOutlined fontSize="small" />}
                />
              </Tooltip>
            )}
            {cities.length === 1 && (
              <Tooltip title={`${cities[0].label} location`}>
                <Chip
                  size="small"
                  variant="outlined"
                  label={cities[0].label}
                  sx={{
                    zIndex: 1,
                  }}
                  icon={<PlaceOutlined />}
                />
              </Tooltip>
            )}
            {cities.length > 1 && (
              <Tooltip title={`${cities[0].label} and ${cities.length - 1} more locations`}>
                <Chip
                  clickable
                  size="small"
                  variant="outlined"
                  label={`${cities[0].label} +${cities.length - 1}`}
                  sx={{
                    zIndex: 1,
                  }}
                  icon={<PlaceOutlined />}
                  deleteIcon={<ArrowDropDown fontSize="small" />}
                  onClick={handleOpenCities}
                  onDelete={handleOpenCities}
                />
              </Tooltip>
            )}

            {categories.length === 1 && (
              <Tooltip title={`${categories[0].label} category`}>
                <Chip
                  size="small"
                  variant="outlined"
                  label={categories[0].label}
                  sx={{
                    zIndex: 1,
                  }}
                  icon={<InterestsOutlined />}
                />
              </Tooltip>
            )}
            {categories.length > 1 && (
              <Tooltip title={`${categories[0].label} and ${categories.length - 1} more categories`}>
                <Chip
                  clickable
                  size="small"
                  variant="outlined"
                  label={`${categories[0].label} +${categories.length - 1}`}
                  sx={{
                    zIndex: 1,
                  }}
                  icon={<InterestsOutlined />}
                  deleteIcon={<ArrowDropDown fontSize="small" />}
                  onClick={handleOpenCategories}
                  onDelete={handleOpenCategories}
                />
              </Tooltip>
            )}

            <Tooltip title={`${membersCount} members`}>
              <Chip
                size="small"
                variant="outlined"
                label={membersCount}
                sx={{
                  zIndex: 1,
                }}
                icon={<Group />}
              />
            </Tooltip>

            <Tooltip title={`${eventsCount} events`}>
              <Chip
                size="small"
                variant="outlined"
                label={eventsCount}
                sx={{ zIndex: 1 }}
                icon={<CalendarMonthOutlined />}
              />
            </Tooltip>

            {createdAt && (
              <Tooltip title={`Created at ${createdAtDate.toISOString()}`}>
                <Chip
                  size="small"
                  variant="outlined"
                  label={formatDateDifference(createdAtDate)}
                  sx={{ zIndex: 1 }}
                  icon={<AccessTime />}
                />
              </Tooltip>
            )}

            {isVerified && (
              <Tooltip title="Group verified">
                <Chip
                  size="small"
                  variant="outlined"
                  sx={{
                    zIndex: 1,
                    ".MuiChip-label": {
                      px: "4px",
                    },
                  }}
                  icon={<VerifiedOutlined fontSize="small" />}
                />
              </Tooltip>
            )}

            {isSponsored && (
              <Tooltip title="Group sponsored">
                <Chip
                  size="small"
                  variant="outlined"
                  sx={{
                    zIndex: 1,
                    ".MuiChip-label": {
                      px: "4px",
                    },
                  }}
                  icon={<StarBorderRounded fontSize="small" />}
                />
              </Tooltip>
            )}
          </Stack>

          {/* Description */}
          <Box height="100%">
            <ClampTypography variant="body2" clamp={3} color="text.secondary">
              {description}
            </ClampTypography>
          </Box>

          {/* Actions */}
          <Box height="100%" />
          <Stack justifyContent="space-between" direction="row">
            <IconButton
              size="small"
              onClick={handleOpenMenuMore}
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

      <Popover
        open={!!citiesMoreElement}
        anchorEl={citiesMoreElement}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={handleCloseCities}
      >
        <Stack direction="column" gap={1} px={1} py={2}>
          {cities.slice(1).map((city) => (
            <Chip key={city.id} size="small" variant="outlined" label={city.label} icon={<PlaceOutlined />} />
          ))}
        </Stack>
      </Popover>

      <Popover
        open={!!categoriesMoreElement}
        anchorEl={categoriesMoreElement}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={handleCloseCategories}
      >
        <Stack direction="column" gap={1} px={1} py={2}>
          {categories.slice(1).map((category) => (
            <Chip
              key={category.id}
              size="small"
              variant="outlined"
              label={category.label}
              icon={<InterestsOutlined />}
            />
          ))}
        </Stack>
      </Popover>

      <Menu
        open={!!moreMenuElement}
        anchorEl={moreMenuElement}
        onClose={handleCloseMenuMore}
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
        <MenuItem onClick={handleCloseMenuMore} disableRipple>
          <FavoriteBorderOutlined color="action" />
          Favorite
        </MenuItem>
        <Link
          href={{
            pathname: "/report",
            query: {
              type: "group",
              id: id,
            },
          }}
          underline="none"
        >
          <MenuItem
            disableRipple
            sx={{
              color: "text.primary",
            }}
            onClick={handleCloseMenuMore}
          >
            <ReportGmailerrorredOutlined color="action" />
            Report
          </MenuItem>
        </Link>
      </Menu>
    </>
  );
};
