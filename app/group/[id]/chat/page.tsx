import { Stack } from "@mui/material";
import { GroupHeader } from "../_components/GroupHeader";

export default function GroupChatPage() {
  return (
    <Stack gap={3}>
      <GroupHeader primary="Chat" secondary="Chat with group members." />
    </Stack>
  );
}
