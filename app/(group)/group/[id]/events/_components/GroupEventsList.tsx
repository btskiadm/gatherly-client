import { GroupedEventsDto } from "@/app/common/graphql/dto";
import { SentimentVeryDissatisfied } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { GroupEventTile } from "./GroupEventTile";

interface Props {
  events: GroupedEventsDto[];
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
            <GroupEventTile key={event.id} event={event} />
          ))}
        </Stack>
      ))}
    </Stack>
  );
};
