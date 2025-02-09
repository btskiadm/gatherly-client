import { Paper, Stack, Typography } from "@mui/material";

interface Props {
  primary: string;
  secondary: string;
}

export const AboutEventCounterTile = ({ primary, secondary }: Props) => {
  return (
    <Paper>
      <Stack justifyContent="center" alignItems="center" gap={1} height="100%" py={{ xs: 2, sm: 3 }}>
        <Typography variant="body2" color="text.secondary">
          {secondary}
        </Typography>
        <Typography variant="h4" fontWeight="600">
          {primary}
        </Typography>
      </Stack>
    </Paper>
  );
};
