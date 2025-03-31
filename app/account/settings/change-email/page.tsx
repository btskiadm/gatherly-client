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
import Link from "next/link";
import ForgotPasswordImage from "../../../public/assets/forgot-pass.png";

export default function Page() {
  return (
    <Stack gap={4}>
      <Stack direction="column" gap={2}>
        <Typography variant="h3">Zmiana e-mail</Typography>
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
                <Typography variant="h5">Zmień e-mail</Typography>
                <ul
                  style={{
                    margin: 0,
                  }}
                >
                  <li>
                    <Typography variant="body2" color="text.secondary">
                      Aktualne hasło jest wymagane do zmiany adresu email.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" color="text.secondary">
                      Aktualne adres e-mail: <b>email@email.com</b>
                    </Typography>
                  </li>
                </ul>

                <FormGroup sx={{ gap: 2 }}>
                  <FormControl fullWidth>
                    <OutlinedInput fullWidth placeholder="Nowy e-mail" size="small" />
                  </FormControl>
                  <FormControl fullWidth>
                    <OutlinedInput fullWidth placeholder="Potwierdz nowy e-mail" size="small" />
                  </FormControl>
                  <FormControl fullWidth>
                    <OutlinedInput fullWidth placeholder="Hasło" size="small" />
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
            <Stack direction="column" gap={2}>
              <Stack direction="row" gap={1}>
                <Typography variant="h3">email@email.com</Typography>
                <Typography variant="h3" color="primary">
                  - Primary
                </Typography>
              </Stack>
              <Stack direction="row" gap={1}>
                <Typography color="warning" variant="body1">
                  Unverified
                </Typography>
                <Typography
                  color="info"
                  sx={{
                    textDecoration: "none",
                  }}
                  variant="body1"
                  component={Link}
                  href="#"
                >
                  - Resend Verification Email
                </Typography>
              </Stack>
              <Typography color="text.secondary" variant="body2">
                Unverified email addresses cannot receive notifications or be used to reset your password.
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
}
