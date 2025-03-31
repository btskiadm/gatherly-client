"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid2,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "../common/components/next-link";
import { CheckOutlined } from "@mui/icons-material";

export default function CreateNewPage() {
  const [type, setType] = React.useState<"new-group" | "new-event">("new-group");

  const handleTypeChange = (event: unknown, newValue: any) => {
    if (newValue !== null) {
      setType(newValue);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porttitor erat ac mi scelerisque euismod.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" mb={4}>
        <ToggleButtonGroup value={type} exclusive onChange={handleTypeChange}>
          <ToggleButton value="new-group">Nowa grupa</ToggleButton>
          <ToggleButton value="new-event">Nowe wydarzenie</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box textAlign="center" mb={4}>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porttitor erat ac mi scelerisque euismod.
        </Typography>
        <Typography variant="body1" color="primary">
          Get in touch with us!
        </Typography>
      </Box>

      <Box textAlign="center" mb={2}>
        <Typography variant="h5">Select the plan type</Typography>
      </Box>

      <Grid2 container spacing={2} justifyContent="center">
        <Grid2
          size={{
            xs: 12,
            sm: 6,
            md: 4,
          }}
        >
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardHeader
              sx={{
                py: "40px",
                alignItems: "center",
                justifyContent: "center",
                background: "rgb(46, 181, 201)",
              }}
              title={
                <Typography
                  variant="h2"
                  textAlign="center"
                  sx={{
                    fontSize: "2rem",
                    fontWeight: 500,
                    color: "primary.contrastText",
                  }}
                >
                  $0
                </Typography>
              }
              subheader={
                <Typography
                  variant="h5"
                  textAlign="center"
                  sx={{
                    fontSize: "1rem",
                    letterSpacing: "3px",
                    fontWeight: 400,
                    color: "secondary.contrastText",
                  }}
                >
                  STARTER
                </Typography>
              }
            ></CardHeader>
            <CardContent sx={{ py: "40px", gap: 4, display: "flex", flexDirection: "column", pb: "40px !important" }}>
              <List disablePadding={true} dense={true}>
                <ListItem>
                  <ListItemIcon>
                    <CheckOutlined />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1">Podstawowe funkcje grupy i eventów</Typography>
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckOutlined />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1">Ograniczony limit uczestników (do 100) i eventów</Typography>
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckOutlined />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1">Reklamy w interfejsie</Typography>
                  </ListItemText>
                </ListItem>
              </List>
              <Button
                sx={{
                  width: "min-content",
                  textWrap: "nowrap",
                  margin: "auto",
                }}
                variant="contained"
                LinkComponent={Link}
                href="/create-new/group"
                color="info"
              >
                Choose Starter
              </Button>
            </CardContent>
          </Card>
        </Grid2>

        <Grid2
          size={{
            xs: 12,
            sm: 6,
            md: 4,
          }}
        >
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardHeader
              sx={{
                py: "40px",
                alignItems: "center",
                justifyContent: "center",
                background: "rgb(94, 59, 183)",
              }}
              title={
                <Typography
                  variant="h2"
                  textAlign="center"
                  sx={{
                    fontSize: "2rem",
                    fontWeight: 500,
                    color: "primary.contrastText",
                  }}
                >
                  $5
                </Typography>
              }
              subheader={
                <Typography
                  variant="h5"
                  textAlign="center"
                  sx={{
                    fontSize: "1rem",
                    letterSpacing: "3px",
                    fontWeight: 400,
                    color: "secondary.contrastText",
                  }}
                >
                  PLUS
                </Typography>
              }
            ></CardHeader>
            <CardContent sx={{ py: "40px", gap: 4, display: "flex", flexDirection: "column", pb: "40px !important" }}>
              <List disablePadding={true} dense={true}>
                <ListItem>
                  <ListItemIcon>
                    <CheckOutlined />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1">Rozszerzone funkcje i personalizacja (logo, kolory)</Typography>
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckOutlined />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1">Wyższy limit uczestników (np. do 500) i więcej eventów</Typography>
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckOutlined />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1">Czat grupowy i podstawowa analityka</Typography>
                  </ListItemText>
                </ListItem>
              </List>
              <Button
                sx={{
                  width: "min-content",
                  textWrap: "nowrap",
                  margin: "auto",
                }}
                variant="contained"
                color="secondary"
                LinkComponent={Link}
                href="/create-new/group"
              >
                Choose Plus
              </Button>
            </CardContent>
          </Card>
        </Grid2>

        <Grid2
          size={{
            xs: 12,
            sm: 6,
            md: 4,
          }}
        >
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardHeader
              sx={{
                py: "40px",
                alignItems: "center",
                justifyContent: "center",
                background: "rgb(243, 151, 17)",
              }}
              title={
                <Typography
                  variant="h2"
                  textAlign="center"
                  sx={{
                    fontSize: "2rem",
                    fontWeight: 500,
                    color: "primary.contrastText",
                  }}
                >
                  $10
                </Typography>
              }
              subheader={
                <Typography
                  variant="h5"
                  textAlign="center"
                  sx={{
                    fontSize: "1rem",
                    letterSpacing: "3px",
                    fontWeight: 400,
                    color: "secondary.contrastText",
                  }}
                >
                  PREMIUM
                </Typography>
              }
            ></CardHeader>
            <CardContent sx={{ py: "40px", gap: 4, display: "flex", flexDirection: "column", pb: "40px !important" }}>
              <List disablePadding={true} dense={true}>
                <ListItem>
                  <ListItemIcon>
                    <CheckOutlined />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1">Brak reklam</Typography>
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckOutlined />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1">Nielimitowani uczestnicy i eventy</Typography>
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckOutlined />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1">Szczegółowa analityka i możliwość monetyzacji</Typography>
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckOutlined />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1">Priorytetowe wsparcie techniczne</Typography>
                  </ListItemText>
                </ListItem>
              </List>
              <Button
                sx={{
                  width: "min-content",
                  textWrap: "nowrap",
                  margin: "auto",
                }}
                variant="contained"
                LinkComponent={Link}
                href="/create-new/group"
                color="warning"
              >
                Choose Premium
              </Button>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Container>
  );
}
