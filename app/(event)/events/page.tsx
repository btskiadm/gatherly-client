import { getEventTiles } from "@/app/mock/mock-api";
import { Stack } from "@mui/material";
import { EventTiles } from "./_components/EventTiles";

export default function EventsPage() {
  const tiles = getEventTiles();

  return (
    <Stack gap={2} width="100%">
      <EventTiles tiles={tiles} />
    </Stack>
  );
}
