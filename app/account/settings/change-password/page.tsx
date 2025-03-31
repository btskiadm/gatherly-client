"use client";

import {
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormGroup,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";

import ForgotPasswordImage from "../../../public/assets/forgot-pass.png";

export default function Page() {
  return (
    <Stack gap={4}>
      <Stack direction="column" gap={2}>
        <Typography variant="h3">Zmiana hasła</Typography>
        <Divider variant="fullWidth" />
      </Stack>
      <Stack direction="column" gap={4}>
        <Card
          elevation={1}
          sx={{
            width: "100%",
          }}
        >
          <CardContent
            sx={{
              p: "24px",
            }}
          >
            <Stack direction="row" gap={2}>
              <Image src={ForgotPasswordImage} alt="#" />
              <Stack direction="column" gap={2} width="100%">
                <Typography variant="h5">Zmień hasło</Typography>
                <Typography variant="body2" color="text.secondary">
                  Aktualne hasło jest wymagane do zmiany istniejącego hasła na nowe.
                </Typography>
                <FormGroup sx={{ gap: 2 }}>
                  <FormControl fullWidth>
                    <OutlinedInput fullWidth placeholder="Obecne hasło" size="small" />
                  </FormControl>
                  <FormControl fullWidth>
                    <OutlinedInput fullWidth placeholder="Nowe hasło" size="small" />
                  </FormControl>
                  <FormControl fullWidth>
                    <OutlinedInput fullWidth placeholder="Potwierdz nowe hasło" size="small" />
                  </FormControl>
                  <Button
                    variant="contained"
                    sx={{
                      width: "min-content",
                      textWrap: "nowrap",
                    }}
                  >
                    Zapisz
                  </Button>
                </FormGroup>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
}
