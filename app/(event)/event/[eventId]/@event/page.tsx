import { Box, Paper } from "@mui/material";
import { EventPage } from "../_component/event-page";

export default function Page() {
  return (
    <Paper>
      <Box p={{ xs: 2, sm: 3 }}>
        <EventPage />
      </Box>
    </Paper>
  );
}
