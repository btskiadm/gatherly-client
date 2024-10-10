import { Box, Paper, Typography } from "@mui/material";

export default function Page() {
  return (
    <Paper>
      <Box p={{ xs: 2, sm: 3 }}>
        <Typography>
          Managment (password change, email change, deactivate or delete account, language, timezone)
        </Typography>
      </Box>
    </Paper>
  );
}
