"use client";

import { ArrowBack } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { ReactNode, useCallback } from "react";

interface Props {
  primary: string;
  subPrimary?: string;
  secondary?: string;
  actions?: ReactNode;
}

export const GroupHeader = ({ primary, subPrimary, secondary, actions }: Props) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, []);

  return (
    <Stack>
      <Button
        variant="text"
        sx={{
          width: "min-content",
        }}
        startIcon={<ArrowBack />}
        onClick={handleBack}
      >
        Back
      </Button>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
        <Stack gap={1}>
          <Stack direction="row" gap={1} alignItems="center">
            <Typography variant="h4" fontWeight="600">
              {primary}
            </Typography>
            {subPrimary && (
              <Typography variant="body1" fontWeight="600" color="text.secondary">
                {subPrimary}
              </Typography>
            )}
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {secondary}
          </Typography>
        </Stack>
        {actions}
      </Stack>
    </Stack>
  );
};
