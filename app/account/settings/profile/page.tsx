"use client";

import { meQueryOptions } from "@/app/common/graphql/options/query/meQueryOptions";
import {
  AddOutlined,
  EditOutlined,
  Facebook,
  HomeOutlined,
  Instagram,
  MusicNote,
  Phone,
  X,
  YouTube,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid2,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
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
  const { data } = useSuspenseQuery(meQueryOptions());

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
    <Stack gap={4}>
      <Stack direction="column" gap={2}>
        <Typography variant="h3">Profil</Typography>
        <Divider variant="fullWidth" />
      </Stack>
      <Stack direction="column" gap={4}>
        <Stack width="100%" direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" alignItems="center" justifyContent="flex-start" gap={3}>
            <Badge
              slotProps={{
                badge: {
                  style: {
                    borderRadius: "50%",
                    backgroundColor: "rgb(114, 214, 58)",
                    right: "1px",
                    top: "1px",
                    width: "16px",
                    height: "16px",
                  },
                },
              }}
              color="success"
              variant="dot"
              anchorOrigin={{
                horizontal: "right",
                vertical: "top",
              }}
            >
              <Avatar
                variant="rounded"
                src={data?.me?.smallPhoto ?? ""}
                sx={{
                  width: "96px",
                  height: "96px",
                }}
              />
            </Badge>
            <Stack direction="column">
              <Typography fontWeight={500} variant="h5">
                {data.me?.username}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Łódź, Polska
              </Typography>
            </Stack>
          </Stack>
          <IconButton
            color="secondary"
            size="small"
            sx={{
              borderWidth: 1,
              borderStyle: "solid",
            }}
            onClick={() => alert("Not implemented.")}
          >
            <EditOutlined fontSize="small" />
          </IconButton>
        </Stack>
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
            title={<Typography variant="h5">O mnie</Typography>}
            subheader={
              <Typography variant="body2" color="text.secondary">
                Kilka słów o mnie
              </Typography>
            }
            action={
              <IconButton
                color="secondary"
                size="small"
                sx={{
                  borderWidth: 1,
                  borderStyle: "solid",
                }}
                onClick={() => alert("Not implemented.")}
              >
                <EditOutlined fontSize="small" />
              </IconButton>
            }
          />
          <CardContent
            sx={{
              p: "0 24px 24px",
            }}
          >
            <Typography variant="body1">
              Sunt exercitation labore eiusmod ad reprehenderit velit fugiat Lorem consectetur voluptate ut commodo.
              Consequat sint veniam eiusmod exercitation labore minim ex et anim ea mollit. Laboris amet incididunt
              tempor adipisicing ad esse officia do in excepteur commodo ea Lorem. Cillum consectetur officia dolore
              commodo aliquip nulla cupidatat. Ex eu ut ex incididunt elit in fugiat proident aliquip. Ex irure magna
              exercitation ullamco sunt et laborum aute commodo. Voluptate cillum reprehenderit reprehenderit culpa
              Lorem magna exercitation aliquip excepteur dolore esse consequat. Est adipisicing do qui dolor mollit
              irure incididunt. Mollit magna culpa enim reprehenderit pariatur velit eu aliquip proident.
            </Typography>
          </CardContent>
        </Card>
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
            title={<Typography variant="h5">Zainteresowania</Typography>}
            subheader={
              <Typography variant="body2" color="text.secondary">
                Pomogą nam lepiej dopasować grupy oraz wydarzenia. Pomoże innym dopasować Twój profil.
              </Typography>
            }
            action={
              <IconButton
                color="secondary"
                size="small"
                sx={{
                  borderWidth: 1,
                  borderStyle: "solid",
                }}
                onClick={() => alert("Not implemented.")}
              >
                <EditOutlined fontSize="small" />
              </IconButton>
            }
          />
          <CardContent
            sx={{
              p: "0 24px 24px",
            }}
          >
            <Stack direction="row" gap={2} flexWrap="wrap">
              <Chip label="Zloty motocyklowe" />
              <Chip label="Siłownia" />
              <Chip label="Trójbój siłowy" />
              <Chip label="Siatkówka" />
              <Chip label="Piłka ręczna" />
            </Stack>
          </CardContent>
        </Card>

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
            title={<Typography variant="h5">Lokalizacja</Typography>}
            subheader={
              <Typography variant="body2" color="text.secondary">
                Pierwszy wybór określa miejsce zamieszkania, kolejne są opcjonalne – określają miejsca, w których można
                wyszukać Twój profil
              </Typography>
            }
            action={
              <IconButton
                color="secondary"
                size="small"
                sx={{
                  borderWidth: 1,
                  borderStyle: "solid",
                }}
                onClick={() => alert("Not implemented.")}
              >
                <EditOutlined fontSize="small" />
              </IconButton>
            }
          />
          <CardContent
            sx={{
              p: "0 24px 24px",
            }}
          >
            <Stack direction="row" gap={2} flexWrap="wrap">
              <Chip icon={<HomeOutlined fontSize="small" />} label="Łódź" />
              <Chip label="Warszawa" />
              <Chip label="Kraków" />
              <Chip label="Turek" />
              <Chip label="Pabianice" />
            </Stack>
          </CardContent>
        </Card>
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
            title={<Typography variant="h5">Informacje personalne</Typography>}
            subheader={
              <Typography variant="body2" color="text.secondary">
                Pomogą nam lepiej dopasować wydarzenia oraz grupy
              </Typography>
            }
            action={
              <Stack gap={2} direction="row" alignItems="center">
                <FormControlLabel
                  labelPlacement="start"
                  control={<Switch size="medium" />}
                  // label="Wyświetl na profilu"
                  label={<Typography variant="body2">Wyświetl na profilu</Typography>}
                />
                <IconButton
                  color="secondary"
                  size="small"
                  sx={{
                    borderWidth: 1,
                    borderStyle: "solid",
                  }}
                  onClick={() => alert("Not implemented.")}
                >
                  <EditOutlined fontSize="small" />
                </IconButton>
              </Stack>
            }
          />
          <CardContent
            sx={{
              p: "0 24px 24px",
            }}
          >
            <Stack direction="column" gap={{ xs: 2, sm: 3 }}>
              <Stack direction="column">
                <FormLabel>Birthdate</FormLabel>
                <Grid2 container spacing={1}>
                  <Grid2 size={{ xs: 12, sm: 4 }}>
                    <FormControl fullWidth>
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
                    </FormControl>
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 4 }}>
                    <FormControl fullWidth>
                      <OutlinedInput fullWidth placeholder="Day" size="small" value={day} onChange={handleDay} />
                    </FormControl>
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 4 }}>
                    <FormControl fullWidth>
                      <OutlinedInput fullWidth placeholder="Year" size="small" value={year} onChange={handleYear} />
                    </FormControl>
                  </Grid2>
                </Grid2>
              </Stack>
              <FormControl
                sx={(theme) => ({
                  width: "100%",
                  [theme.breakpoints.up("sm")]: {
                    width: "calc(260px, 40%, 600px)",
                  },
                })}
              >
                <FormLabel>Gender</FormLabel>
                <Select
                  displayEmpty
                  value={gender}
                  notched={false}
                  size="small"
                  label="Gender"
                  onChange={handleGender}
                  renderValue={(value: string) =>
                    value ? value : <Typography sx={{ opacity: 0.4 }}>Gender</Typography>
                  }
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
            </Stack>
          </CardContent>
        </Card>
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
            title={<Typography variant="h5">Kontakt</Typography>}
            action={
              <IconButton
                color="secondary"
                size="small"
                sx={{
                  borderWidth: 1,
                  borderStyle: "solid",
                }}
                onClick={() => alert("Not implemented.")}
              >
                <EditOutlined fontSize="small" />
              </IconButton>
            }
          />
          <CardContent
            sx={{
              p: "0 24px 24px",
            }}
          >
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, md: 6, xl: 3 }}>
                <Stack direction="row" gap={2}>
                  <Instagram />
                  <Stack direction="column" alignItems="flex-start">
                    <Typography fontSize="0.875rem" variant="body2" color="text.secondary">
                      E-mail
                    </Typography>
                    <Typography fontSize="0.875rem" variant="body1" color="primary">
                      email@email.com
                    </Typography>
                  </Stack>
                </Stack>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6, xl: 3 }}>
                <Stack direction="row" gap={2}>
                  <Facebook />
                  <Stack direction="column" alignItems="flex-start">
                    <Typography fontSize="0.875rem" variant="body2" color="text.secondary">
                      Facebook
                    </Typography>
                    <Typography fontSize="0.875rem" variant="body1" color="primary">
                      username.123
                    </Typography>
                  </Stack>
                </Stack>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6, xl: 3 }}>
                <Stack direction="row" gap={2}>
                  <X />
                  <Stack direction="column" alignItems="flex-start">
                    <Typography fontSize="0.875rem" variant="body2" color="text.secondary">
                      X
                    </Typography>
                    <Typography fontSize="0.875rem" variant="body1" color="primary">
                      username.123
                    </Typography>
                  </Stack>
                </Stack>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6, xl: 3 }}>
                <Stack direction="row" gap={2}>
                  <MusicNote />
                  <Stack direction="column" alignItems="flex-start">
                    <Typography fontSize="0.875rem" variant="body2" color="text.secondary">
                      TikTok
                    </Typography>
                    <Typography fontSize="0.875rem" variant="body1" color="primary">
                      username.123
                    </Typography>
                  </Stack>
                </Stack>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6, xl: 3 }}>
                <Stack direction="row" gap={2}>
                  <YouTube />
                  <Stack direction="column" alignItems="flex-start">
                    <Typography fontSize="0.875rem" variant="body2" color="text.secondary">
                      YouTube
                    </Typography>
                    <Typography fontSize="0.875rem" variant="body1" color="primary">
                      username.123
                    </Typography>
                  </Stack>
                </Stack>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6, xl: 3 }}>
                <Stack direction="row" gap={2}>
                  <Phone />
                  <Stack direction="column" alignItems="flex-start">
                    <Typography fontSize="0.875rem" variant="body2" color="text.secondary">
                      Telefon
                    </Typography>
                    <Typography fontSize="0.875rem" variant="body1" color="primary">
                      123-456-789
                    </Typography>
                  </Stack>
                </Stack>
              </Grid2>
            </Grid2>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
}
