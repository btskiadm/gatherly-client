import { Box, Button, Paper, Stack } from "@mui/material";
import { GroupHeader } from "../_components/GroupHeader";
import { CreateGroup } from "@/app/common/components/Group/Create/CreateGroup.component";
import { LoadingButton } from "@mui/lab";

export default function GroupSettingsPage() {
  return (
    <Stack gap={3}>
      <GroupHeader primary="Settings" secondary="See group settings and change it." />
      <Paper>
        <Stack p={2} gap={4}>
          <CreateGroup />
          <Stack direction="row" justifyContent="space-between">
            <Button
              disabled={false}
              variant="text"
              color="error"
              // onClick={onReset}
            >
              Reset
            </Button>
            <LoadingButton
              loading={false}
              variant="outlined"
              // onClick={onCreate}
            >
              Save
            </LoadingButton>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
