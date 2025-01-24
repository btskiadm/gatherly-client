import { Stack, Typography } from "@mui/material";
import { EventTile } from "./event-tile";
import { SentimentVeryDissatisfied } from "@mui/icons-material";
import { EventStackDto } from "@/app/mock/mock-api.types";

interface Props {
  events: EventStackDto[];
}

const formatMonth = (iso: string) =>
  new Intl.DateTimeFormat("pl-PL", {
    month: "long",
  }).format(new Date(iso));

export const GroupEventsList = ({ events }: Props) => {
  if (!events.length) {
    return (
      <Stack p={2} direction="column" gap={1} justifyContent="center" alignItems="center">
        <SentimentVeryDissatisfied
          sx={{
            fontSize: "4rem",
          }}
        />
        <Typography variant="h5">NO EVENTS</Typography>
      </Stack>
    );
  }

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
