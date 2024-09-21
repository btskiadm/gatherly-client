"use client";

import { ArrowBack } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export const DemoBack = () => {
  const router = useRouter();

  return (
    <Box width="min-content">
      <Button startIcon={<ArrowBack />} type="button" onClick={() => router.back()}>
        Dashboard
      </Button>
    </Box>
  );
};
