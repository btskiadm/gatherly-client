import { Link } from "@/app/common/components/NextLink";
import { TruncatedTypography } from "@/app/common/components/TruncatedTypography";
import { ShortEventDto } from "@/app/mock/mock-api.types";
import { Group, StarBorderRounded, VerifiedOutlined } from "@mui/icons-material";
import { Avatar, Box, Chip, Stack, Tooltip } from "@mui/material";
import Image from "next/image";
import { PropsWithChildren } from "react";
import { ClampTypography } from "../../ClampTypography";

export const ShortEventTile = ({
  shortEvent: { id, title, users, verified, sponsored },
}: PropsWithChildren<{ shortEvent: ShortEventDto }>) => {
  return (
    <>
      <Link
        href={`/event/${id}`}
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
      <Stack gap={1} p={1} height="100%" justifyContent="space-between">
        <Tooltip title={title}>
          <ClampTypography clamp={3} variant="body2">
            {title}
          </ClampTypography>
        </Tooltip>
        <Stack
          gap={0.5}
          direction="row"
          flexShrink={0}
          width="min-content"
          sx={{
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
          <Tooltip title="Number of members">
            <Chip size="small" label={users} icon={<Group />} />
          </Tooltip>
          {verified && (
            <Tooltip title="Verified group">
              <Chip
                size="small"
                sx={{
                  ".MuiChip-label": {
                    px: "4px",
                  },
                }}
                icon={<VerifiedOutlined fontSize="small" />}
              />
            </Tooltip>
          )}
          {sponsored && (
            <Tooltip title="Sponsored group">
              <Chip
                size="small"
                sx={{
                  ".MuiChip-label": {
                    px: "4px",
                  },
                }}
                icon={<StarBorderRounded fontSize="small" />}
              />
            </Tooltip>
          )}
        </Stack>
      </Stack>
    </>
  );
};
