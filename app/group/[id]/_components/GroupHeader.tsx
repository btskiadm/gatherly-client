import { TruncatedTypography } from "@/app/common/components/TruncatedTypography";
import { Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  primary: string;
  subPrimary?: string;
  secondary?: string;
  actions?: ReactNode;
}

export const GroupHeader = ({ primary, subPrimary, secondary, actions }: Props) => {
  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
        {/* min width for secondary overflow */}
        <Stack gap={1} minWidth={0}>
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
          <TruncatedTypography variant="body2" color="text.secondary">
            {secondary}
          </TruncatedTypography>
        </Stack>
        {actions}
      </Stack>
    </Stack>
  );
};
