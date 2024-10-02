import { Stack } from "@mui/material";
import { GroupHeader } from "../_components/GroupHeader";
import { GroupSettings } from "./_components/GroupSettings";

export default function GroupSettingsPage() {
  return (
    <Stack gap={3}>
      <GroupHeader primary="Settings" secondary="See group settings and change it." />
      <GroupSettings />
    </Stack>
  );
}
