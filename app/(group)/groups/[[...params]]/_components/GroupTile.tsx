"use client";

import {
  AccessTime,
  ArrowDropDown,
  CalendarMonthOutlined,
  CloudOutlined,
  Group,
  InterestsOutlined,
  PlaceOutlined,
} from "@mui/icons-material";
import { Avatar, Box, Chip, Popover, Stack, Tooltip, Typography } from "@mui/material";
import React, { PropsWithChildren, useCallback, useState } from "react";

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
  tile: { id, title, description, createdAt, usersCount, largePhoto, eventsCount, cities, categories },
}: PropsWithChildren<{ tile: GroupTileType }>) => {
  const [citiesPopoverEl, setCitiesPopoverEl] = useState<HTMLElement | null>(null);
  const [categoriesPopoverEl, setCategoriesPopoverEl] = useState<HTMLElement | null>(null);

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
          src={largePhoto}
          sx={{
            width: "100%",
            height: "18rem",
            borderEndEndRadius: 0,
            borderEndStartRadius: 0,
          }}
        />
        <Stack gap={1.5} py={2} px={3} height="100%">
          {/* Tytuł */}
          <Stack direction="row">
            <Tooltip title={title}>
              <TruncatedTypography variant="h5">{title}</TruncatedTypography>
            </Tooltip>
          </Stack>
  3
          {/* Opis */}
          <Box height="100%">
            <ClampTypography variant="body2" clamp={2} color="text.secondary">
              {description}
            </ClampTypography>
          </Box>
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
    </>
  );
};
