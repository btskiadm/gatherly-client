import { Stack } from "@mui/material";
import { GroupHeader } from "../../_components/group-header";
import { GroupChatFeed } from "./group-chat-feed";

export const GroupChatPage = () => {
  return (
    <Stack gap={{ xs: 2, sm: 3 }} height="100%">
      <GroupHeader primary="Chat" secondary="Chat with group members." />
      <GroupChatFeed />
    </Stack>
  );
};
