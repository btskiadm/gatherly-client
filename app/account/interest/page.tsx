import { Box, Paper, Typography } from "@mui/material";

export default function Page() {
  return (
    <Paper>
      <Box p={{ xs: 2, sm: 3 }}>
        <Typography>Interest (categories you are in)</Typography>
      </Box>
    </Paper>
  );
}
