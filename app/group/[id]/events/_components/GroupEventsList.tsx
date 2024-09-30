import { Stack, Typography } from "@mui/material";
import { EventTile } from "./EventTile";

export const EventMonth = ({ text }: { text: string }) => {
  return (
    <Typography variant="body1" fontWeight="600" color="text.secondary">
      {text}
    </Typography>
  );
};

export const GroupEventsList = () => {
  return (
    <Stack gap={2}>
      <Stack gap={1}>
        <EventMonth text="May" />
        <EventTile />
        <EventTile />
        <EventTile />
      </Stack>
      <Stack gap={1}>
        <EventMonth text="December" />
        <EventTile />
        <EventTile />
        <EventTile />
      </Stack>
    </Stack>
  );
};
