"use client";

import { TruncatedFormHelperText } from "@/app/common/components/truncated-form-helper-text";
import { AddOutlined } from "@mui/icons-material";
import {
  Button,
  Chip,
  FormControl,
  FormLabel,
  Grid2,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";

// Define constants
const LOOKING_FOR = {
  practiceHobbies: "Practice Hobbies",
  socialize: "Socialize",
  makeFriends: "Make Friends",
  professionallyNetwork: "Professionally network",
};

const LIFE_STAGES = {
  recentGraduate: "Recent Graduate",
  student: "Student",
  newInTown: "New In Town",
  newEmptyNester: "New Empty Nester",
  newlyRetired: "Newly Retired",
  newParent: "New Parent",
  career: "Career",
};

const MONTHS = {
  january: "January",
  february: "February",
  march: "March",
  april: "April",
  may: "May",
  june: "June",
  july: "July",
  august: "August",
  september: "September",
  october: "October",
  november: "November",
  december: "December",
};

const MONTHS_WITH_EMPTY = {
  "": "",
  ...MONTHS,
};

// Type aliases for better readability
type LookingForKey = keyof typeof LOOKING_FOR;
type LifeStageKey = keyof typeof LIFE_STAGES;
type MonthKey = keyof typeof MONTHS_WITH_EMPTY;

export default function Page() {
  const [month, setMonth] = useState<MonthKey>("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");
  const [lookingFor, setLookingFor] = useState<string[]>([]);
  const [lifeStages, setLifeStages] = useState<string[]>([]);

  // Utility function to toggle selections in the array
  const toggleSelection = useCallback(
    (key: string, setter: React.Dispatch<React.SetStateAction<string[]>>, currentSelection: string[]) => {
      const isSelected = currentSelection.includes(key);
      setter(isSelected ? currentSelection.filter((item) => item !== key) : [...currentSelection, key]);
    },
    []
  );

  const handleMonth = useCallback((e: SelectChangeEvent) => setMonth(e.target.value as MonthKey), []);
  const handleDay = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setDay(e.target.value), []);
  const handleYear = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setYear(e.target.value), []);
  const handleGender = useCallback((e: SelectChangeEvent) => setGender(e.target.value), []);

  const hasSelection = useCallback((key: string, currentSelection: string[]) => currentSelection.includes(key), []);

  return (
    <Paper>
      <Stack p={{ xs: 2, sm: 3 }} gap={{ xs: 2, sm: 3 }}>
        <Stack direction="column">
          <Typography variant="h5" fontWeight="600">
            Personal information
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Informacje będą widoczne dla wszystkich użytkowników.
          </Typography>
        </Stack>
        <FormControl>
          <FormLabel>Birthdate</FormLabel>
          <Grid2 container spacing={1}>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Select
                displayEmpty
                fullWidth
                value={month}
                notched={false}
                size="small"
                label="Birthdate"
                onChange={handleMonth}
                renderValue={(value: MonthKey) =>
                  value ? MONTHS_WITH_EMPTY[value] : <Typography sx={{ opacity: 0.4 }}>Month</Typography>
                }
              >
                <MenuItem value="">
                  <Typography sx={{ opacity: 0.4 }}>&#8202;</Typography>
                </MenuItem>
                {Object.entries(MONTHS).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
              <TruncatedFormHelperText>Month MM format</TruncatedFormHelperText>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField fullWidth placeholder="Day" size="small" value={day} onChange={handleDay} />
              <TruncatedFormHelperText>Day DD format</TruncatedFormHelperText>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField fullWidth placeholder="Year" size="small" value={year} onChange={handleYear} />
              <TruncatedFormHelperText>Year YYYY format</TruncatedFormHelperText>
            </Grid2>
          </Grid2>
        </FormControl>
        <FormControl>
          <FormLabel>Gender</FormLabel>
          <Select
            displayEmpty
            value={gender}
            notched={false}
            size="small"
            label="Gender"
            onChange={handleGender}
            renderValue={(value: string) => (value ? value : <Typography sx={{ opacity: 0.4 }}>Gender</Typography>)}
          >
            <MenuItem value="">
              <Typography sx={{ opacity: 0.4 }}>&#8202;</Typography>
            </MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="non-binary">Non-Binary</MenuItem>
            <MenuItem value="not-listed">Not listed</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>What are you looking for?</FormLabel>
          <Stack direction="row" gap={1} flexWrap="wrap">
            {Object.entries(LOOKING_FOR).map(([key, label]) => (
              <Chip
                key={key}
                variant="outlined"
                color={hasSelection(key, lookingFor) ? "primary" : "default"}
                label={label}
                icon={<AddOutlined fontSize="small" />}
                onClick={() => toggleSelection(key, setLookingFor, lookingFor)}
              />
            ))}
          </Stack>
        </FormControl>
        <FormControl>
          <FormLabel>Life stages</FormLabel>
          <Stack direction="row" gap={1} flexWrap="wrap">
            {Object.entries(LIFE_STAGES).map(([key, label]) => (
              <Chip
                key={key}
                variant="outlined"
                color={hasSelection(key, lifeStages) ? "primary" : "default"}
                label={label}
                icon={<AddOutlined fontSize="small" />}
                onClick={() => toggleSelection(key, setLifeStages, lifeStages)}
              />
            ))}
          </Stack>
        </FormControl>
        <Stack direction="row" justifyContent="flex-end">
          <Button variant="contained">Save</Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
