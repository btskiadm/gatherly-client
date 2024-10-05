import { Stack, Typography } from "@mui/material";
import { EventTile } from "./EventTile";
import { EVENTS } from "./mock";
import { GroupEvents, UPCOMING_EVENTS } from "../events.mock";

export const EventMonth = ({ text }: { text: string }) => {
  return (
    <Typography textTransform="capitalize" variant="body1" fontWeight="600" color="text.secondary">
      {text}
    </Typography>
  );
};

interface Props {
  groupEvents: GroupEvents[];
}

export const GroupEventsList = ({ groupEvents }: Props) => {
  return (
    <Stack gap={2}>
      {groupEvents.map((event) => {
        return (
          <Stack key={event.startMonth} gap={1}>
            <EventMonth
              text={new Intl.DateTimeFormat("pl-PL", {
                month: "long",
              }).format(new Date(event.startMonth))}
            />
            {event.events.map((eventItem) => (
              <EventTile key={eventItem.id} item={eventItem} />
            ))}
          </Stack>
        );
      })}
    </Stack>
  );
};
