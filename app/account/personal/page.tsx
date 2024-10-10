import { Box, Paper, Typography } from "@mui/material";

export default function Page() {
  return (
    <Paper>
      <Box p={{ xs: 2, sm: 3 }}>
        <Typography>Personal (age, gender, what are you looking are?, life stage (student, retired etc..)</Typography>
      </Box>
    </Paper>
  );
}
