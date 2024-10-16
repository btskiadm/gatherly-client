"use client";

import { TruncatedFormHelperText } from "@/app/common/components/TruncatedFormHelperText";
import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";

export default function Page() {
  const [language, setLanguage] = useState("");

  const handleLanguage = useCallback((e: SelectChangeEvent) => {
    setLanguage(e.target.value);
  }, []);

  return (
    <Paper>
      <Stack p={{ xs: 2, sm: 3 }} gap={{ xs: 2, sm: 3 }}>
        <Typography variant="h5" fontWeight="600">
          Account managment
        </Typography>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <OutlinedInput size="small" placeholder="Email" defaultValue="username@gmail.com" />
          <TruncatedFormHelperText>Month MM fromat</TruncatedFormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Language</FormLabel>
          <Select
            value={language}
            notched={false}
            size="small"
            placeholder="Language"
            label="Language"
            onChange={handleLanguage}
            defaultValue="en-US"
          >
            <MenuItem value="en-US">English</MenuItem>
            <MenuItem value="pl-PL">Polski</MenuItem>
          </Select>
          <TruncatedFormHelperText>Your gender is not visible to others</TruncatedFormHelperText>
        </FormControl>
        <Stack direction="row" justifyContent="flex-end">
          <Button variant="contained">Save</Button>
        </Stack>
        <Divider />

        <Stack gap={1}>
          <Typography variant="body1">Change your password</Typography>
          <Typography variant="body2">
            When you change your password, you will be automatically signed out from your other sessions
          </Typography>
          <Button
            variant="contained"
            sx={{
              width: "min-content",
              textWrap: "nowrap",
            }}
          >
            Change password
          </Button>
        </Stack>

        <Stack gap={1}>
          <Typography variant="body1">Deactivate your account</Typography>
          <Typography variant="body2">
            If you decide to use Meetup again, you’ll need to create a new account
          </Typography>
          <Button
            variant="contained"
            sx={{
              width: "min-content",
              textWrap: "nowrap",
            }}
          >
            Deactivate account
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
