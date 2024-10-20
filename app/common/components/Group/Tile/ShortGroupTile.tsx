import { Link } from "@/app/common/components/NextLink";
import { TruncatedTypography } from "@/app/common/components/TruncatedTypography";
import { GroupTileData } from "@/app/groups/mock";
import GroupImage4x3 from "@/app/public/assets/group_4x3.webp";
import { Group, StarBorderRounded, VerifiedOutlined } from "@mui/icons-material";
import { Avatar, Chip, Stack, Tooltip } from "@mui/material";
import Image from "next/image";
import { PropsWithChildren } from "react";

export const ShortGroupTile = ({ id, title, members }: PropsWithChildren<GroupTileData>) => {
  return (
    <>
      <Link
        href={`/profile/${id}`}
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
            src={GroupImage4x3}
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
              <Chip size="small" label={members} icon={<Group />} />
            </Tooltip>
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
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
