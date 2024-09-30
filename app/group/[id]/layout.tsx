"use client";

import { useAppBarHeight } from "@/app/common/utils/hooks/useAppBarHeight";
import { Box, Container, Stack } from "@mui/material";
import { GroupNav } from "./_components/GroupNav";

export default function GroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const minHeight = useAppBarHeight();

  return (
    <Container
      sx={{
        minHeight: `calc(98vh - ${minHeight}px)`, // 64px toolbar
      }}
    >
      <Stack py={8} gap={4} direction="row" height="100%">
        <Box
          sx={{
            minWidth: "280px",
            flexBasis: "clamp(280px, 20%, 560px)",
          }}
        >
          <GroupNav />
        </Box>
        <Box
          sx={{
            flexBasis: "100%",
          }}
        >
          {children}
        </Box>
      </Stack>
    </Container>
  );
}
