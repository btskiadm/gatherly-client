import { Stack, Typography } from "@mui/material";
import { GroupEvents } from "../events.mock";
import { EventTile } from "./EventTile";

interface Props {
  groupEvents: GroupEvents[];
}

const formatMonth = (iso: string) =>
  new Intl.DateTimeFormat("pl-PL", {
    month: "long",
  }).format(new Date(iso));

export const GroupEventsList = ({ groupEvents }: Props) => {
  return (
    <Stack gap={2}>
      {groupEvents.map((event) => (
        <Stack key={event.startMonth} gap={1}>
          <Typography textTransform="capitalize" variant="body1" fontWeight="600" color="text.secondary">
            {formatMonth(event.startMonth)}
          </Typography>
          {event.events.map((eventItem) => (
            <EventTile key={eventItem.id} item={eventItem} />
          ))}
        </Stack>
      ))}
    </Stack>
  );
};
