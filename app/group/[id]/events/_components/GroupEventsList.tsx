import { EventStack } from "@/app/mock/mock";
import { Stack, Typography } from "@mui/material";
import { EventTile } from "./EventTile";

interface Props {
  events: EventStack[];
}

const formatMonth = (iso: string) =>
  new Intl.DateTimeFormat("pl-PL", {
    month: "long",
  }).format(new Date(iso));

export const GroupEventsList = ({ events }: Props) => {
  return (
    <Stack gap={2}>
      {events.map((eventStack) => (
        <Stack key={eventStack.monthReference} gap={1}>
          <Typography textTransform="capitalize" variant="body1" fontWeight="600" color="text.secondary">
            {formatMonth(eventStack.monthReference)}
          </Typography>
          {eventStack.events.map((event) => (
            <EventTile key={event.id} event={event} />
          ))}
        </Stack>
      ))}
    </Stack>
  );
};
