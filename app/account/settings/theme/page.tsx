"use client";

import { ContrastOutlined, DarkModeOutlined, WbSunnyOutlined } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Divider, Grid2, IconButton, Stack, Typography } from "@mui/material";

export default function Page() {
  return (
    <Stack gap={4}>
      <Stack direction="column" gap={2}>
        <Typography variant="h3">Ustawienia motywu</Typography>
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
              title={<Typography variant="h5">Wygląd</Typography>}
              subheader={
                <Typography variant="body2" color="text.secondary">
                  Dostosuj wygląd, aby zmniejszyć odblaski i dać oczom odpoczynek.
                </Typography>
              }
            />
            <CardContent
              sx={{
                p: "0 24px 24px",
              }}
            >
              <Stack direction="row" gap={2} flexWrap="wrap">
                <IconButton
                  size="large"
                  sx={{
                    background: "rgba(71, 82, 89, 0.04)",
                  }}
                  onClick={() => alert("Not implemented.")}
                >
                  <DarkModeOutlined
                    sx={{
                      fontSize: "1.5rem",
                    }}
                  />
                </IconButton>
                <IconButton
                  size="large"
                  sx={{
                    background: "rgba(71, 82, 89, 0.04)",
                  }}
                  onClick={() => alert("Not implemented.")}
                >
                  <ContrastOutlined
                    sx={{
                      fontSize: "1.5rem",
                    }}
                  />
                </IconButton>
                <IconButton
                  size="large"
                  color="secondary"
                  sx={{
                    background: "rgba(71, 82, 89, 0.04)",
                  }}
                  onClick={() => alert("Not implemented.")}
                >
                  <WbSunnyOutlined
                    sx={{
                      fontSize: "1.5rem",
                    }}
                  />
                </IconButton>
              </Stack>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Stack>
  );
}
