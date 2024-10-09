import { TruncatedTypography } from "@/app/common/components/TruncatedTypography";
import { ArrowDownwardOutlined, ArrowDropDown } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import { GroupHeaderButton } from "./GroupHeaderButton";

interface Props {
  primary: string;
  subPrimary?: string;
  secondary?: string;
}

export const GroupHeader = ({ primary, subPrimary, secondary }: Props) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="flex-end" gap={1}>
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
      <GroupHeaderButton />
    </Stack>
  );
};
