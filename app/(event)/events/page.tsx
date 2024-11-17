import { GroupStackAttributes } from "@/app/(group)/groups/_components/GroupStackAttributes";
import { getStackedEvents } from "@/app/mock/mock-api";
import { Stack } from "@mui/material";
import { EventTiles } from "./_components/EventTiles";

export default function EventsPage() {
  const stackedEvents = getStackedEvents();

  return (
    <>
      {stackedEvents.map(({ attributes, tiles }, idx) => (
        <Stack key={idx} gap={2} width="100%">
          <GroupStackAttributes attributes={attributes} />
          <EventTiles tiles={tiles} />
        </Stack>
      ))}
    </>
  );
}
