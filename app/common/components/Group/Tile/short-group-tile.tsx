import { Link } from "@/app/common/components/next-link";
import { TruncatedTypography } from "@/app/common/components/truncated-typography";
import { ShortGroupDto } from "@/app/mock/mock-api.types";
import { Group, StarBorderRounded, VerifiedOutlined } from "@mui/icons-material";
import { Avatar, Chip, Stack, Tooltip } from "@mui/material";
import Image from "next/image";
import { PropsWithChildren } from "react";

export const ShortGroupTile = ({
  shortGroup: { id, title, users, thumbnails, verified, sponsored },
}: PropsWithChildren<{ shortGroup: ShortGroupDto }>) => {
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
      <Stack gap={1} height="100%">
        <Avatar
          alt="logo"
          variant="rounded"
          sizes="100vw"
          sx={{
            width: "100%",
            height: "128px",
          }}
        >
          <Image
            fill
            src={thumbnails.thumb}
            alt="logo"
            style={{
              objectFit: "cover",
            }}
          />
        </Avatar>
        <Stack gap={1} px={1} pb={1}>
          <Tooltip title={title}>
            <TruncatedTypography variant="body2">{title}</TruncatedTypography>
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
      </Stack>
    </>
  );
};
