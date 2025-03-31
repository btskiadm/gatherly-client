"use client";

import {
  Autocomplete,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid2,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function Page() {
  return (
    <Stack gap={4}>
      <Stack direction="column" gap={2}>
        <Typography variant="h3">Język i region</Typography>
        <Divider variant="fullWidth" />
      </Stack>
      <Grid2 container spacing={4}>
        <Grid2
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Card
            elevation={1}
            sx={{
              width: "100%",
            }}
          >
            <CardHeader
              sx={{
                padding: "18px 24px",
              }}
              title={<Typography variant="h5">Język aplikacji</Typography>}
              subheader={
                <Typography variant="body2" color="text.secondary">
                  Wyświetlaj przyciski, tytuły i inne teksty w preferowanym przez Ciebie języku.
                </Typography>
              }
            />
            <CardContent
              sx={{
                p: "0 24px 24px",
              }}
            >
              <Autocomplete
                sx={{ width: "100%", maxWidth: "320px" }}
                options={[]}
                autoHighlight
                renderInput={(params) => <TextField {...params} label="Wybierz język" />}
              />
            </CardContent>
          </Card>
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Card
            elevation={1}
            sx={{
              width: "100%",
            }}
          >
            <CardHeader
              sx={{
                padding: "18px 24px",
              }}
              title={<Typography variant="h5">Ustawienia regionalne</Typography>}
              subheader={
                <Typography variant="body2" color="text.secondary">
                  Wyświetlaj daty, godziny i liczby w preferowanym przez Ciebie języku.
                </Typography>
              }
            />
            <CardContent
              sx={{
                p: "0 24px 24px",
              }}
            >
              <Autocomplete
                sx={{ width: "100%", maxWidth: "320px" }}
                options={[]}
                autoHighlight
                renderInput={(params) => <TextField {...params} label="Region" />}
              />
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Stack>
  );
}
