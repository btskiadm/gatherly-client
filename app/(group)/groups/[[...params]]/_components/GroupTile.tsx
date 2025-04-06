"use client";

import {
  AccessTime,
  CalendarMonthOutlined,
  CloudOutlined,
  ExpandMore,
  Group,
  InterestsOutlined,
  PlaceOutlined,
} from "@mui/icons-material";
import { Avatar, Box, Button, Chip, Popover, Stack, Tooltip } from "@mui/material";
import React, { PropsWithChildren, useCallback, useState } from "react";

import { ClampTypography } from "@/app/common/components/clamp-typography";
import { Link } from "@/app/common/components/next-link";
import { TruncatedTypography } from "@/app/common/components/truncated-typography";
import { GroupTile as GroupTileType } from "@/app/model/model";
import { LocalTime } from "@/app/common/components/LocalTime/LocalTime";

/**
 * Formats the date difference into a human-readable format.
 * Returns "new" if less than 24 hours, days if within a week, or weeks otherwise.
 */
function formatDateDifference(dateInput: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - dateInput.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffHours < 24) return "new";
  if (diffDays < 7) return `${Math.floor(diffDays)} d.`;
  return `${Math.floor(diffDays / 7)} w.`;
}

export const GroupTile = ({
  tile: { id, title, description, createdAt, usersCount, largePhoto, eventsCount, cities, categories },
}: PropsWithChildren<{ tile: GroupTileType }>) => {
  // ---------------------------
  // State & Handlers for Popovers
  // ---------------------------
  const [citiesPopoverEl, setCitiesPopoverEl] = useState<HTMLElement | null>(null);
  const [categoriesPopoverEl, setCategoriesPopoverEl] = useState<HTMLElement | null>(null);

  // Handlers for cities popover
  const openCitiesPopover = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setCitiesPopoverEl(event.currentTarget);
  }, []);
  const closeCitiesPopover = useCallback(() => setCitiesPopoverEl(null), []);

  // Handlers for categories popover
  const openCategoriesPopover = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setCategoriesPopoverEl(event.currentTarget);
  }, []);
  const closeCategoriesPopover = useCallback(() => setCategoriesPopoverEl(null), []);

  const createdAtDate = new Date(createdAt);

  return (
    <>
      {/* Full-card clickable link */}
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
        {/* Group Image */}
        <Avatar
          alt="logo"
          variant="rounded"
          sizes="100vw"
          src={largePhoto}
          sx={{
            width: "100%",
            height: "18rem",
            borderEndEndRadius: 0,
            borderEndStartRadius: 0,
          }}
        />

        <Stack gap={1.5} py={2} px={3} height="100%">
          {/* Group Title */}
          <Stack direction="row">
            <Tooltip title={title}>
              <TruncatedTypography variant="h5">{title}</TruncatedTypography>
            </Tooltip>
          </Stack>

          {/* Chips Row */}
          <Stack direction="row" gap={0.5} flexShrink={0} flexWrap="wrap" maxHeight="56px" overflow="hidden">
            {/* Cities */}
            {cities.length > 0 && (
              <Tooltip title={`Available cities: ${cities.map(({ label }) => label).join(", ")}`}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<PlaceOutlined />}
                  endIcon={<ExpandMore sx={{ fontSize: "0.875rem" }} />}
                  sx={{
                    borderColor: "var(--palette-Chip-defaultBorder)",
                    color: "text.primary",
                    height: "24px",
                    px: "2px",
                    py: "0",
                    fontWeight: "400",
                    zIndex: 1,
                    "& .MuiButton-startIcon": { color: "text.secondary", marginLeft: 0, marginRight: "3px" },
                    "& .MuiButton-endIcon": { color: "text.secondary", marginLeft: "3px", marginRight: 0 },
                  }}
                  onClick={openCitiesPopover}
                >
                  {cities.length > 1
                    ? `${cities[0].label} +${cities.length - 1}`
                    : cities.length === 1
                    ? cities[0].label
                    : "Remote Group"}
                </Button>
              </Tooltip>
            )}

            {cities.length === 0 && (
              <Tooltip title="Remote Group">
                <Chip
                  size="small"
                  variant="outlined"
                  icon={<CloudOutlined fontSize="small" />}
                  sx={{ zIndex: 1, ".MuiChip-label": { px: "4px" } }}
                />
              </Tooltip>
            )}

            {/* Categories */}
            {categories.length > 0 && (
              <Tooltip title={`Available categories: ${categories.map(({ label }) => label).join(", ")}`}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<InterestsOutlined />}
                  endIcon={<ExpandMore sx={{ fontSize: "0.875rem" }} />}
                  sx={{
                    borderColor: "divider",
                    color: "text.primary",
                    height: "24px",
                    px: "2px",
                    py: "0",
                    fontWeight: "400",
                    zIndex: 1,
                    "& .MuiButton-startIcon": { color: "text.secondary", marginLeft: 0, marginRight: "3px" },
                    "& .MuiButton-endIcon": { color: "text.secondary", marginLeft: "3px", marginRight: 0 },
                  }}
                  onClick={openCategoriesPopover}
                >
                  {categories.length > 1
                    ? `${categories[0].label} +${categories.length - 1}`
                    : categories.length === 1
                    ? categories[0].label
                    : "No Categories"}
                </Button>
              </Tooltip>
            )}

            {/* Members Count */}
            <Tooltip title={`${usersCount} members`}>
              <Chip size="small" variant="outlined" label={usersCount} icon={<Group />} sx={{ zIndex: 1 }} />
            </Tooltip>

            {/* Events Count */}
            <Tooltip title={`${eventsCount} events`}>
              <Chip
                size="small"
                variant="outlined"
                label={eventsCount}
                icon={<CalendarMonthOutlined />}
                sx={{ zIndex: 1 }}
              />
            </Tooltip>

            {/* Creation Date */}
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
          </Stack>

          {/* Group Description */}
          <Box height="100%">
            <ClampTypography variant="body2" clamp={2} color="text.secondary">
              {description}
            </ClampTypography>
          </Box>
        </Stack>
      </Stack>

      {/* Popover for additional cities */}
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

      {/* Popover for additional categories */}
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
    </>
  );
};
