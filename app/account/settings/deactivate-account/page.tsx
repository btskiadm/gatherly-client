"use client";

import { SentimentDissatisfiedOutlined } from "@mui/icons-material";
import { Button, Card, CardContent, CardHeader, Divider, Grid2, Stack, Typography } from "@mui/material";

export default function Page() {
  return (
    <Stack gap={4}>
      <Stack direction="column" gap={2}>
        <Typography variant="h3">Dezaktywacja konta</Typography>
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
              title={<Typography variant="h5">Dezaktywacja konta</Typography>}
              subheader={
                <Typography variant="body2" color="text.secondary">
                  Jeśli zdecydujesz się użyć serwisu ponownie, będziesz musiał stworzyć nowe konto.
                </Typography>
              }
            />
            <CardContent
              sx={{
                p: "0 24px 24px",
              }}
            >
              <Button
                startIcon={<SentimentDissatisfiedOutlined />}
                variant="contained"
                color="error"
                onClick={() => alert("Not implemented.")}
              >
                Dezaktywuj konto
              </Button>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Stack>
  );
}
