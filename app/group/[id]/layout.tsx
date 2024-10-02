"use client";

import { useAppBarHeight } from "@/app/common/utils/hooks/useAppBarHeight";
import { Box, Container, Stack, Tab, Tabs } from "@mui/material";
import { GroupNav } from "./_components/GroupNav";
import { Link } from "@/app/common/components/NextLink";
import { GroupMobileNav } from "./_components/GroupMobileNav";

export default function GroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const minHeight = useAppBarHeight();

  return (
    <Container
      sx={{
        minHeight: `calc(98vh - ${minHeight}px)`,
        maxWidth: "100vw",
      }}
    >
      <Stack
        py={{
          xs: 4,
          sm: 6,
        }}
        gap={4}
        direction={{
          xs: "column",
          sm: "row",
        }}
      >
        <Box
          position="sticky"
          display={{
            xs: "block",
            sm: "none",
          }}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <GroupMobileNav />
        </Box>
        <Box
          display={{
            xs: "none",
            sm: "flex",
          }}
          position="sticky"
          top={minHeight}
          minWidth="260px"
          height="min-content"
          flexBasis="clamp(260px, 20%, 560px)"
        >
          <GroupNav />
        </Box>
        <Box flexBasis="100%" maxWidth="100%">
          {children}
        </Box>
      </Stack>
    </Container>
  );
}
