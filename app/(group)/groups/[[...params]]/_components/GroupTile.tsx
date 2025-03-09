"use client";

import React, { PropsWithChildren, useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { Avatar, Box, Button, Chip, IconButton, Menu, MenuItem, Popover, Stack, Tooltip } from "@mui/material";
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

import { ClampTypography } from "@/app/common/components/clamp-typography";
import { Link } from "@/app/common/components/next-link";
import { TruncatedTypography } from "@/app/common/components/truncated-typography";
import { GroupTile as GroupTileType } from "@/app/model/model";

/**
 * Formatuje różnicę dat do czytelnego formatu.
 */
function formatDateDifference(dateInput: Date) {
  const now = new Date();
  const diffMs = now.getTime() - dateInput.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffHours < 24) return "new";
  if (diffDays < 7) return `${Math.floor(diffDays)} d.`;
  return `${Math.floor(diffDays / 7)} w.`;
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
  // State dla menu i popoverów
  const [moreMenuEl, setMoreMenuEl] = useState<HTMLElement | null>(null);
  const [citiesPopoverEl, setCitiesPopoverEl] = useState<HTMLElement | null>(null);
  const [categoriesPopoverEl, setCategoriesPopoverEl] = useState<HTMLElement | null>(null);

  // Handlery dla menu "więcej"
  const openMoreMenu = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setMoreMenuEl(event.currentTarget);
  }, []);
  const closeMoreMenu = useCallback(() => setMoreMenuEl(null), []);

  // Handlery dla popoverów miast
  const openCitiesPopover = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setCitiesPopoverEl(event.currentTarget);
  }, []);
  const closeCitiesPopover = useCallback(() => setCitiesPopoverEl(null), []);

  // Handlery dla popoverów kategorii
  const openCategoriesPopover = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setCategoriesPopoverEl(event.currentTarget);
  }, []);
  const closeCategoriesPopover = useCallback(() => setCategoriesPopoverEl(null), []);

  const handleJoin = useCallback(() => {
    toast.success("You have just joined the group. Congrats!");
  }, []);

  const createdAtDate = new Date(createdAt);

  return (
    <>
      {/* Link pokrywający całą kartę */}
      <Link
        href={`/group/${id}/about`}
        sx={{
          height: 0,
          width: 0,
          "&:after": {
            content: "''",
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 1,
          },
        }}
      />
      <Stack height="100%">
        {/* Obrazek */}
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
          {/* Tytuł */}
          <Stack direction="row">
            <Tooltip title={title}>
              <TruncatedTypography variant="subtitle1" minWidth="0px">
                {title}
              </TruncatedTypography>
            </Tooltip>
          </Stack>

          {/* Chipsy */}
          <Stack
            direction="row"
            gap={0.5}
            flexShrink={0}
            sx={{
              flexWrap: "wrap",
              width: "100%",
              overflowX: "auto",
              padding: 0,
              "::-webkit-scrollbar": {
                background: "transparent",
                width: 0,
                height: 0,
              },
            }}
          >
            {/* Miasta */}
            {cities.length === 0 && (
              <Tooltip title="Remote group">
                <Chip
                  size="small"
                  variant="outlined"
                  icon={<CloudOutlined fontSize="small" />}
                  sx={{ zIndex: 1, ".MuiChip-label": { px: "4px" } }}
                />
              </Tooltip>
            )}
            {cities.length === 1 && (
              <Tooltip title={`${cities[0].label} location`}>
                <Chip
                  size="small"
                  variant="outlined"
                  label={cities[0].label}
                  icon={<PlaceOutlined />}
                  sx={{ zIndex: 1 }}
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
                  icon={<PlaceOutlined />}
                  deleteIcon={<ArrowDropDown fontSize="small" />}
                  onClick={openCitiesPopover}
                  onDelete={openCitiesPopover}
                  sx={{ zIndex: 1 }}
                />
              </Tooltip>
            )}

            {/* Kategorie */}
            {categories.length === 1 && (
              <Tooltip title={`${categories[0].label} category`}>
                <Chip
                  size="small"
                  variant="outlined"
                  label={categories[0].label}
                  icon={<InterestsOutlined />}
                  sx={{ zIndex: 1 }}
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
                  icon={<InterestsOutlined />}
                  deleteIcon={<ArrowDropDown fontSize="small" />}
                  onClick={openCategoriesPopover}
                  onDelete={openCategoriesPopover}
                  sx={{ zIndex: 1 }}
                />
              </Tooltip>
            )}

            {/* Liczba członków */}
            <Tooltip title={`${membersCount} members`}>
              <Chip size="small" variant="outlined" label={membersCount} icon={<Group />} sx={{ zIndex: 1 }} />
            </Tooltip>

            {/* Liczba wydarzeń */}
            <Tooltip title={`${eventsCount} events`}>
              <Chip
                size="small"
                variant="outlined"
                label={eventsCount}
                icon={<CalendarMonthOutlined />}
                sx={{ zIndex: 1 }}
              />
            </Tooltip>

            {/* Data utworzenia */}
            {createdAt && (
              <Tooltip title={`Created at ${createdAtDate.toISOString()}`}>
                <Chip
                  size="small"
                  variant="outlined"
                  label={formatDateDifference(createdAtDate)}
                  icon={<AccessTime />}
                  sx={{ zIndex: 1 }}
                />
              </Tooltip>
            )}

            {/* Weryfikacja */}
            {isVerified && (
              <Tooltip title="Group verified">
                <Chip
                  size="small"
                  variant="outlined"
                  icon={<VerifiedOutlined fontSize="small" />}
                  sx={{ zIndex: 1, ".MuiChip-label": { px: "4px" } }}
                />
              </Tooltip>
            )}

            {/* Sponsorowane */}
            {isSponsored && (
              <Tooltip title="Group sponsored">
                <Chip
                  size="small"
                  variant="outlined"
                  icon={<StarBorderRounded fontSize="small" />}
                  sx={{ zIndex: 1, ".MuiChip-label": { px: "4px" } }}
                />
              </Tooltip>
            )}
          </Stack>

          {/* Opis */}
          <Box height="100%">
            <ClampTypography variant="body2" clamp={3} color="text.secondary">
              {description}
            </ClampTypography>
          </Box>

          {/* Akcje */}
          <Stack direction="row" justifyContent="space-between">
            <IconButton size="small" onClick={openMoreMenu} sx={{ zIndex: 2 }}>
              <MoreVert />
            </IconButton>
            <Button
              size="small"
              variant="outlined"
              startIcon={<GroupAdd fontSize="small" />}
              onClick={handleJoin}
              sx={{ zIndex: 2 }}
            >
              Join
            </Button>
          </Stack>
        </Stack>
      </Stack>

      {/* Popover - dodatkowe miasta */}
      <Popover
        open={Boolean(citiesPopoverEl)}
        anchorEl={citiesPopoverEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={closeCitiesPopover}
      >
        <Stack direction="column" gap={1} px={1} py={2}>
          {cities.slice(1).map((city) => (
            <Chip key={city.id} size="small" variant="outlined" label={city.label} icon={<PlaceOutlined />} />
          ))}
        </Stack>
      </Popover>

      {/* Popover - dodatkowe kategorie */}
      <Popover
        open={Boolean(categoriesPopoverEl)}
        anchorEl={categoriesPopoverEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={closeCategoriesPopover}
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

      {/* Menu "więcej" */}
      <Menu
        open={Boolean(moreMenuEl)}
        anchorEl={moreMenuEl}
        onClose={closeMoreMenu}
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
        <MenuItem onClick={closeMoreMenu} disableRipple>
          <FavoriteBorderOutlined color="action" />
          Favorite
        </MenuItem>
        <Link
          href={{
            pathname: "/report",
            query: { type: "group", id },
          }}
          underline="none"
        >
          <MenuItem onClick={closeMoreMenu} disableRipple sx={{ color: "text.primary" }}>
            <ReportGmailerrorredOutlined color="action" />
            Report
          </MenuItem>
        </Link>
      </Menu>
    </>
  );
};
