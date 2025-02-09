"use client";

import { ClampTypography } from "@/app/common/components/clamp-typography";
import { Link } from "@/app/common/components/next-link";
import { TruncatedTypography } from "@/app/common/components/truncated-typography";
import { GroupTileDto } from "@/app/common/graphql/dto";
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
  // @ts-ignore: It is valid operation
  const differenceInMilliseconds = now - dateInput;
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
    thumbnail: { thumb },
    createdAt,
    usersLength,
    sponsored,
    verified,
    remote,
    eventsLength,
    cities,
    categories,
  },
}: PropsWithChildren<{ tile: GroupTileDto }>) => {
  const [moreElement, setMoreElement] = useState<HTMLElement | null>(null);
  const [citiesMoreElement, setCitiesMoreElement] = useState<HTMLElement | null>(null);
  const [categoriesMoreElement, setCategoriesMoreElement] = useState<HTMLElement | null>(null);

  const handleOpenMore = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setMoreElement(event.currentTarget);
  }, []);

  const handleOpenCities = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setCitiesMoreElement(event.currentTarget);
  }, []);

  const handleOpenCategories = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setCategoriesMoreElement(event.currentTarget);
  }, []);

  const handleCloseCities = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setCitiesMoreElement(null);
  }, []);

  const handlecCloseCategories = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setCategoriesMoreElement(null);
  }, []);

  const handleCloseMore = useCallback(() => {
    setMoreElement(null);
  }, []);

  const handleJoin = useCallback(() => {
    toast.success("You have just join to the group. Congrats !");
  }, []);

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
          src={thumb}
          sx={{
            width: "100%",
            height: "13rem",
          }}
        />

        <Stack gap={1} p={2} height="100%">
          {/* title */}
          <Stack direction="row">
            <Tooltip title={title}>
              <TruncatedTypography variant="subtitle1" minWidth="0px">
                {title}
              </TruncatedTypography>
            </Tooltip>
          </Stack>
          {/* chips */}
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
            {/* location chip */}
            {cities.length <= 1 && (
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
                  onClick={handleOpenCities as any}
                  onDelete={handleOpenCities}
                />
              </Tooltip>
            )}

            {/* category chip */}
            {categories.length <= 1 && (
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
              <Tooltip title={`${categories[0].label} and ${categories.length - 1} more locations`}>
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
                  onClick={handleOpenCategories as any}
                  onDelete={handleOpenCategories}
                />
              </Tooltip>
            )}

            {/* member chip */}
            <Tooltip title={`${usersLength} members`}>
              <Chip
                size="small"
                variant="outlined"
                label={usersLength}
                sx={{
                  zIndex: 1,
                }}
                icon={<Group />}
              />
            </Tooltip>

            {/* event chip */}
            <Tooltip title={`${eventsLength} events`}>
              <Chip
                size="small"
                variant="outlined"
                label={eventsLength}
                sx={{ zIndex: 1 }}
                icon={<CalendarMonthOutlined />}
              />
            </Tooltip>

            {/* created at chip */}
            <Tooltip title={`Created at ${new Date(createdAt).toISOString()}`}>
              <Chip
                size="small"
                variant="outlined"
                label={formatDateDifference(new Date(createdAt))}
                sx={{ zIndex: 1 }}
                icon={<AccessTime />}
              />
            </Tooltip>

            {/* verified chip */}
            {verified && (
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

            {/* sponsored chip */}
            {sponsored && (
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

            {/* remote chip */}
            {remote && (
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
          </Stack>

          {/* description */}
          <Box height="100%">
            <ClampTypography variant="body2" clamp={3} color="text.secondary">
              {description}
            </ClampTypography>
          </Box>

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
            <Chip key={city.value} size="small" variant="outlined" label={city.label} icon={<InterestsOutlined />} />
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
        onClose={handlecCloseCategories}
      >
        <Stack direction="column" gap={1} px={1} py={2}>
          {categories.slice(1).map((category) => (
            <Chip
              key={category.value}
              size="small"
              variant="outlined"
              label={category.label}
              icon={<InterestsOutlined />}
            />
          ))}
        </Stack>
      </Popover>

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
        <MenuItem onClick={handleCloseMore} disableRipple>
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
