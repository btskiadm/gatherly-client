import { TruncatedTypography } from "@/app/common/components/truncated-typography";
import { Stack, Typography } from "@mui/material";
import { GroupHeaderButton } from "./group-header-button";

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
          <Typography variant="h5" fontWeight="600">
            {primary}
          </Typography>
          {subPrimary && (
            <Typography variant="body2" fontWeight="600" color="text.secondary">
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
