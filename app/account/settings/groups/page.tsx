"use client";

import { ClampTypography } from "@/app/common/components/clamp-typography";
import { meQueryOptions } from "@/app/common/graphql/options/query/meQueryOptions";
import {
  AddOutlined,
  CalendarMonthOutlined,
  EditOutlined,
  ExpandMoreOutlined,
  FilterAltOutlined,
  Remove,
  SearchOutlined,
  SwapVert,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  AvatarGroup,
  Button,
  Chip,
  Divider,
  FormControl,
  Grid2,
  InputAdornment,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  "&": {
    borderRadius: theme.shape.borderRadius,
    ".MuiAccordionDetails-root": {
      padding: "16px 16px 16px 66px",
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    ".MuiAccordionSummary-expandIconWrapper": {
      borderRadius: "4px",
      border: "1px solid rgb(222, 226, 230)",
      color: "rgb(133, 149, 166)",
    },
  },
  "& .MuiAccordionSummary-root": {
    display: "flex",
    gap: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    flexDirection: "row-reverse",
  },
  "&.Mui-expanded": {
    ".MuiAccordionSummary-root": {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    ".MuiAccordionSummary-expandIconWrapper": {},
  },
}));

export default function Page() {
  const { data } = useSuspenseQuery(meQueryOptions());

  return (
    <Stack gap={4}>
      <Stack direction="column" gap={2}>
        <Stack direction="row" position="relative">
          <Typography variant="h3">Grupy</Typography>
          <Button
            variant="contained"
            startIcon={<AddOutlined />}
            sx={{
              position: "absolute",
              right: 0,
              top: "-6px",
            }}
          >
            Utwórz grupę
          </Button>
        </Stack>
        <Divider variant="fullWidth" />
      </Stack>

      <Stack direction="column" gap={2}>
        <Stack direction="row" justifyContent="space-between" width="100%" gap={2}>
          <FormControl
            sx={{
              width: "100%",
              maxWidth: "320px",
            }}
          >
            <TextField
              placeholder="Nazwa grupy"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlined />
                    </InputAdornment>
                  ),
                },
              }}
              size="small"
              variant="outlined"
            />
          </FormControl>

          <Stack direction="row" justifyContent="flex-end" gap={1}>
            <Button
              variant="outlined"
              startIcon={<FilterAltOutlined fontSize="small" />}
              endIcon={<ExpandMoreOutlined fontSize="small" />}
            >
              Filter
            </Button>
            <Button
              variant="outlined"
              startIcon={<SwapVert fontSize="small" />}
              endIcon={<ExpandMoreOutlined fontSize="small" />}
            >
              Sort
            </Button>
          </Stack>
        </Stack>
        <StyledAccordion>
          <AccordionSummary expandIcon={<Remove />}>
            <Grid2 container spacing={3}>
              <Grid2 size={{ xs: 6 }} display="flex" direction="row" gap={3}>
                <Avatar
                  src="https://placehold.co/128x128"
                  variant="rounded"
                  sx={{
                    width: "64px",
                    height: "64px",
                  }}
                />
                <Stack direction="column" gap={0.25} justifyContent="center">
                  <ClampTypography clamp={2} variant="h4" fontSize="0.875rem">
                    Amet officia dolore duis ut qui ipsum eiusmod dolor. Qui non tempor sit nulla cillum et nisi nulla.
                    Tempor consequat laborum duis tempor reprehenderit pariatur elit. Sint culpa adipisicing voluptate
                    mollit. Eu nisi elit incididunt est cupidatat adipisicing do labore sit sit commodo deserunt Lorem.
                    Commodo cupidatat proident cupidatat nulla enim excepteur in non. Est id minim cillum dolore elit
                    occaecat voluptate nostrud labore. Irure laborum qui et reprehenderit. Reprehenderit reprehenderit
                    laboris occaecat excepteur eiusmod.
                  </ClampTypography>
                  <Stack direction="row" gap={1} alignItems="center">
                    <CalendarMonthOutlined
                      fontSize="small"
                      sx={{
                        color: "text.secondary",
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      12.12.022
                    </Typography>
                  </Stack>
                </Stack>
              </Grid2>
              <Grid2 size={{ lg: 1 }} />
              <Grid2 size={{ xs: 3 }} display="flex" direction="row" justifyContent="flex-start">
                <Stack direction="column" gap={0.25} justifyContent="flex-start">
                  <Typography variant="body2" color="text.secondary">
                    Status
                  </Typography>
                  <Stack gap={0.5} direction="row">
                    <Chip size="small" color="default" label="Oczekujące" />
                  </Stack>
                </Stack>
              </Grid2>
              <Grid2
                size={{ xs: 2 }}
                sx={{
                  display: {
                    xs: "none",
                    lg: "flex",
                  },
                }}
                display="flex"
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
              >
                <AvatarGroup spacing="small" max={3}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </AvatarGroup>
              </Grid2>
            </Grid2>
          </AccordionSummary>
          <AccordionDetails>
            <Stack gap={2}>
              <Stack gap={1}>
                <Typography variant="h5" fontSize="1rem">
                  Opis
                </Typography>
                <Typography variant="body2" color="text.secondary" fontSize="0.875rem">
                  Qui excepteur do velit excepteur occaecat ut qui dolore sint elit ullamco reprehenderit esse elit.
                  Fugiat ullamco proident excepteur enim non magna nulla pariatur voluptate sit dolore non dolor. Id
                  ullamco irure excepteur qui veniam consectetur occaecat sunt qui. Pariatur irure ea laborum pariatur
                  occaecat laboris deserunt cillum do deserunt fugiat voluptate adipisicing. Aliqua labore consequat
                  reprehenderit ipsum Lorem magna exercitation proident quis. Non pariatur consectetur Lorem
                  consectetur. Lorem reprehenderit cupidatat consequat cillum ullamco ad Lorem anim. Cillum dolor elit
                  occaecat aliqua in minim occaecat exercitation. Amet sit Lorem amet voluptate tempor esse occaecat
                  eiusmod laboris id aliquip tempor. Lorem tempor duis proident duis pariatur et mollit quis. Cupidatat
                  veniam fugiat ad occaecat dolore cillum esse anim ut eu id labore. Deserunt duis irure ex non
                  adipisicing consectetur officia magna enim mollit. Dolore et culpa nisi ipsum irure do non cillum et
                  ex. Aliquip elit do deserunt nisi. Cillum commodo non enim sunt velit in occaecat dolore adipisicing
                  proident elit. Pariatur commodo voluptate deserunt aute ullamco esse irure laboris exercitation dolor
                  laboris est. Lorem laborum labore amet culpa id fugiat sint. Quis fugiat culpa pariatur id irure.
                  Incididunt cupidatat duis aliqua proident dolore aute. Esse officia est elit ex amet ad in cillum non
                  enim deserunt. Sint laboris anim quis non incididunt incididunt mollit laborum. Do incididunt quis
                  labore exercitation duis laborum quis commodo labore laboris. Deserunt occaecat voluptate ut non
                  officia. Tempor cupidatat ad pariatur ea non aliquip aliqua. Ea ullamco consectetur quis nostrud
                  nostrud incididunt officia eu sunt nulla minim deserunt est sint. Est culpa in sunt eu dolor mollit
                  commodo laboris est id enim sint enim sit. Eu eiusmod dolore sit aliquip ut duis excepteur deserunt ad
                  exercitation.
                </Typography>
              </Stack>
              <Stack
                gap={1}
                sx={{
                  display: {
                    xs: "block",
                    lg: "none",
                  },
                }}
              >
                <Typography variant="h5" fontSize="1rem">
                  Uczestnicy
                </Typography>
                <AvatarGroup
                  spacing="small"
                  max={5}
                  sx={{
                    justifyContent: "flex-end",
                  }}
                >
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </AvatarGroup>
              </Stack>
            </Stack>
          </AccordionDetails>
          <AccordionActions>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<EditOutlined fontSize="small" />}
              onClick={() => alert("not implemented")}
            >
              Settings
            </Button>
          </AccordionActions>
        </StyledAccordion>
        <StyledAccordion>
          <AccordionSummary expandIcon={<Remove />}>
            <Grid2 container spacing={3}>
              <Grid2 size={{ xs: 6 }} display="flex" direction="row" gap={3}>
                <Avatar
                  src="https://placehold.co/128x128"
                  variant="rounded"
                  sx={{
                    width: "64px",
                    height: "64px",
                  }}
                />
                <Stack direction="column" gap={0.25} justifyContent="center">
                  <ClampTypography clamp={2} variant="h4" fontSize="0.875rem">
                    Amet officia dolore duis ut qui ipsum eiusmod dolor. Qui non tempor sit nulla cillum et nisi nulla.
                    Tempor consequat laborum duis tempor reprehenderit pariatur elit. Sint culpa adipisicing voluptate
                    mollit. Eu nisi elit incididunt est cupidatat adipisicing do labore sit sit commodo deserunt Lorem.
                    Commodo cupidatat proident cupidatat nulla enim excepteur in non. Est id minim cillum dolore elit
                    occaecat voluptate nostrud labore. Irure laborum qui et reprehenderit. Reprehenderit reprehenderit
                    laboris occaecat excepteur eiusmod.
                  </ClampTypography>
                  <Stack direction="row" gap={1} alignItems="center">
                    <CalendarMonthOutlined
                      fontSize="small"
                      sx={{
                        color: "text.secondary",
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      12.12.022
                    </Typography>
                  </Stack>
                </Stack>
              </Grid2>
              <Grid2 size={{ lg: 1 }} />
              <Grid2 size={{ xs: 3 }} display="flex" direction="row" justifyContent="flex-start">
                <Stack direction="column" gap={0.25} justifyContent="flex-start">
                  <Typography variant="body2" color="text.secondary">
                    Status
                  </Typography>
                  <Stack gap={0.5} direction="row">
                    <Chip size="small" color="success" label="Verified" />
                  </Stack>
                </Stack>
              </Grid2>
              <Grid2
                size={{ xs: 2 }}
                sx={{
                  display: {
                    xs: "none",
                    lg: "flex",
                  },
                }}
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
              >
                <AvatarGroup spacing="small" max={3}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </AvatarGroup>
              </Grid2>
            </Grid2>
          </AccordionSummary>
          <AccordionDetails>
            <Stack gap={2}>
              <Stack gap={1}>
                <Typography variant="h5" fontSize="1rem">
                  Opis
                </Typography>
                <Typography variant="body2" color="text.secondary" fontSize="0.875rem">
                  Qui excepteur do velit excepteur occaecat ut qui dolore sint elit ullamco reprehenderit esse elit.
                  Fugiat ullamco proident excepteur enim non magna nulla pariatur voluptate sit dolore non dolor. Id
                  ullamco irure excepteur qui veniam consectetur occaecat sunt qui. Pariatur irure ea laborum pariatur
                  occaecat laboris deserunt cillum do deserunt fugiat voluptate adipisicing. Aliqua labore consequat
                  reprehenderit ipsum Lorem magna exercitation proident quis. Non pariatur consectetur Lorem
                  consectetur. Lorem reprehenderit cupidatat consequat cillum ullamco ad Lorem anim. Cillum dolor elit
                  occaecat aliqua in minim occaecat exercitation. Amet sit Lorem amet voluptate tempor esse occaecat
                  eiusmod laboris id aliquip tempor. Lorem tempor duis proident duis pariatur et mollit quis. Cupidatat
                  veniam fugiat ad occaecat dolore cillum esse anim ut eu id labore. Deserunt duis irure ex non
                  adipisicing consectetur officia magna enim mollit. Dolore et culpa nisi ipsum irure do non cillum et
                  ex. Aliquip elit do deserunt nisi. Cillum commodo non enim sunt velit in occaecat dolore adipisicing
                  proident elit. Pariatur commodo voluptate deserunt aute ullamco esse irure laboris exercitation dolor
                  laboris est. Lorem laborum labore amet culpa id fugiat sint. Quis fugiat culpa pariatur id irure.
                  Incididunt cupidatat duis aliqua proident dolore aute. Esse officia est elit ex amet ad in cillum non
                  enim deserunt. Sint laboris anim quis non incididunt incididunt mollit laborum. Do incididunt quis
                  labore exercitation duis laborum quis commodo labore laboris. Deserunt occaecat voluptate ut non
                  officia. Tempor cupidatat ad pariatur ea non aliquip aliqua. Ea ullamco consectetur quis nostrud
                  nostrud incididunt officia eu sunt nulla minim deserunt est sint. Est culpa in sunt eu dolor mollit
                  commodo laboris est id enim sint enim sit. Eu eiusmod dolore sit aliquip ut duis excepteur deserunt ad
                  exercitation.
                </Typography>
              </Stack>
              <Stack
                gap={1}
                sx={{
                  display: {
                    xs: "block",
                    lg: "none",
                  },
                }}
              >
                <Typography variant="h5" fontSize="1rem">
                  Uczestnicy
                </Typography>
                <AvatarGroup
                  spacing="small"
                  max={5}
                  sx={{
                    justifyContent: "flex-end",
                  }}
                >
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </AvatarGroup>
              </Stack>
            </Stack>
          </AccordionDetails>
          <AccordionActions>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<EditOutlined fontSize="small" />}
              onClick={() => alert("not implemented")}
            >
              Settings
            </Button>
          </AccordionActions>
        </StyledAccordion>
        <StyledAccordion>
          <AccordionSummary expandIcon={<Remove />}>
            <Grid2 container spacing={3}>
              <Grid2 size={{ xs: 6 }} display="flex" direction="row" gap={3}>
                <Avatar
                  src="https://placehold.co/128x128"
                  variant="rounded"
                  sx={{
                    width: "64px",
                    height: "64px",
                  }}
                />
                <Stack direction="column" gap={0.25} justifyContent="center">
                  <ClampTypography clamp={2} variant="h4" fontSize="0.875rem">
                    Amet officia dolore duis ut qui ipsum eiusmod dolor. Qui non tempor sit nulla cillum et nisi nulla.
                    Tempor consequat laborum duis tempor reprehenderit pariatur elit. Sint culpa adipisicing voluptate
                    mollit. Eu nisi elit incididunt est cupidatat adipisicing do labore sit sit commodo deserunt Lorem.
                    Commodo cupidatat proident cupidatat nulla enim excepteur in non. Est id minim cillum dolore elit
                    occaecat voluptate nostrud labore. Irure laborum qui et reprehenderit. Reprehenderit reprehenderit
                    laboris occaecat excepteur eiusmod.
                  </ClampTypography>
                  <Stack direction="row" gap={1} alignItems="center">
                    <CalendarMonthOutlined
                      fontSize="small"
                      sx={{
                        color: "text.secondary",
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      12.12.022
                    </Typography>
                  </Stack>
                </Stack>
              </Grid2>
              <Grid2 size={{ lg: 1 }} />
              <Grid2 size={{ xs: 3 }} display="flex" direction="row" justifyContent="flex-start">
                <Stack direction="column" gap={0.25} justifyContent="flex-start">
                  <Typography variant="body2" color="text.secondary">
                    Status
                  </Typography>
                  <Stack gap={0.5} direction="row">
                    <Chip size="small" color="warning" label="Zablokowane" />
                  </Stack>
                </Stack>
              </Grid2>
              <Grid2
                size={{ xs: 2 }}
                sx={{
                  display: {
                    xs: "none",
                    lg: "flex",
                  },
                }}
                display="flex"
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
              >
                <AvatarGroup spacing="small" max={3}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </AvatarGroup>
              </Grid2>
            </Grid2>
          </AccordionSummary>
          <AccordionDetails>
            <Stack gap={2}>
              <Stack gap={1}>
                <Typography variant="h5" fontSize="1rem">
                  Opis
                </Typography>
                <Typography variant="body2" color="text.secondary" fontSize="0.875rem">
                  Qui excepteur do velit excepteur occaecat ut qui dolore sint elit ullamco reprehenderit esse elit.
                  Fugiat ullamco proident excepteur enim non magna nulla pariatur voluptate sit dolore non dolor. Id
                  ullamco irure excepteur qui veniam consectetur occaecat sunt qui. Pariatur irure ea laborum pariatur
                  occaecat laboris deserunt cillum do deserunt fugiat voluptate adipisicing. Aliqua labore consequat
                  reprehenderit ipsum Lorem magna exercitation proident quis. Non pariatur consectetur Lorem
                  consectetur. Lorem reprehenderit cupidatat consequat cillum ullamco ad Lorem anim. Cillum dolor elit
                  occaecat aliqua in minim occaecat exercitation. Amet sit Lorem amet voluptate tempor esse occaecat
                  eiusmod laboris id aliquip tempor. Lorem tempor duis proident duis pariatur et mollit quis. Cupidatat
                  veniam fugiat ad occaecat dolore cillum esse anim ut eu id labore. Deserunt duis irure ex non
                  adipisicing consectetur officia magna enim mollit. Dolore et culpa nisi ipsum irure do non cillum et
                  ex. Aliquip elit do deserunt nisi. Cillum commodo non enim sunt velit in occaecat dolore adipisicing
                  proident elit. Pariatur commodo voluptate deserunt aute ullamco esse irure laboris exercitation dolor
                  laboris est. Lorem laborum labore amet culpa id fugiat sint. Quis fugiat culpa pariatur id irure.
                  Incididunt cupidatat duis aliqua proident dolore aute. Esse officia est elit ex amet ad in cillum non
                  enim deserunt. Sint laboris anim quis non incididunt incididunt mollit laborum. Do incididunt quis
                  labore exercitation duis laborum quis commodo labore laboris. Deserunt occaecat voluptate ut non
                  officia. Tempor cupidatat ad pariatur ea non aliquip aliqua. Ea ullamco consectetur quis nostrud
                  nostrud incididunt officia eu sunt nulla minim deserunt est sint. Est culpa in sunt eu dolor mollit
                  commodo laboris est id enim sint enim sit. Eu eiusmod dolore sit aliquip ut duis excepteur deserunt ad
                  exercitation.
                </Typography>
              </Stack>
              <Stack
                gap={1}
                sx={{
                  display: {
                    xs: "block",
                    lg: "none",
                  },
                }}
              >
                <Typography variant="h5" fontSize="1rem">
                  Uczestnicy
                </Typography>
                <AvatarGroup
                  spacing="small"
                  max={5}
                  sx={{
                    justifyContent: "flex-end",
                  }}
                >
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </AvatarGroup>
              </Stack>
            </Stack>
          </AccordionDetails>
          <AccordionActions>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<EditOutlined fontSize="small" />}
              onClick={() => alert("not implemented")}
            >
              Settings
            </Button>
          </AccordionActions>
        </StyledAccordion>
        <StyledAccordion>
          <AccordionSummary expandIcon={<Remove />}>
            <Grid2 container spacing={3}>
              <Grid2 size={{ xs: 6 }} display="flex" direction="row" gap={3}>
                <Avatar
                  src="https://placehold.co/128x128"
                  variant="rounded"
                  sx={{
                    width: "64px",
                    height: "64px",
                  }}
                />
                <Stack direction="column" gap={0.25} justifyContent="center">
                  <ClampTypography clamp={2} variant="h4" fontSize="0.875rem">
                    Amet officia dolore duis ut qui ipsum eiusmod dolor. Qui non tempor sit nulla cillum et nisi nulla.
                    Tempor consequat laborum duis tempor reprehenderit pariatur elit. Sint culpa adipisicing voluptate
                    mollit. Eu nisi elit incididunt est cupidatat adipisicing do labore sit sit commodo deserunt Lorem.
                    Commodo cupidatat proident cupidatat nulla enim excepteur in non. Est id minim cillum dolore elit
                    occaecat voluptate nostrud labore. Irure laborum qui et reprehenderit. Reprehenderit reprehenderit
                    laboris occaecat excepteur eiusmod.
                  </ClampTypography>
                  <Stack direction="row" gap={1} alignItems="center">
                    <CalendarMonthOutlined
                      fontSize="small"
                      sx={{
                        color: "text.secondary",
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      12.12.022
                    </Typography>
                  </Stack>
                </Stack>
              </Grid2>
              <Grid2 size={{ lg: 1 }} />
              <Grid2 size={{ xs: 3 }} display="flex" direction="row" justifyContent="flex-start">
                <Stack direction="column" gap={0.25} justifyContent="flex-start">
                  <Typography variant="body2" color="text.secondary">
                    Status
                  </Typography>
                  <Stack gap={0.5} direction="row">
                    <Chip size="small" color="error" label="Dezaktyowana" />
                  </Stack>
                </Stack>
              </Grid2>
              <Grid2
                size={{ xs: 2 }}
                sx={{
                  display: {
                    xs: "none",
                    lg: "flex",
                  },
                }}
                display="flex"
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
              >
                <AvatarGroup spacing="small" max={3}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </AvatarGroup>
              </Grid2>
            </Grid2>
          </AccordionSummary>
          <AccordionDetails>
            <Stack gap={2}>
              <Stack gap={1}>
                <Typography variant="h5" fontSize="1rem">
                  Opis
                </Typography>
                <Typography variant="body2" color="text.secondary" fontSize="0.875rem">
                  Qui excepteur do velit excepteur occaecat ut qui dolore sint elit ullamco reprehenderit esse elit.
                  Fugiat ullamco proident excepteur enim non magna nulla pariatur voluptate sit dolore non dolor. Id
                  ullamco irure excepteur qui veniam consectetur occaecat sunt qui. Pariatur irure ea laborum pariatur
                  occaecat laboris deserunt cillum do deserunt fugiat voluptate adipisicing. Aliqua labore consequat
                  reprehenderit ipsum Lorem magna exercitation proident quis. Non pariatur consectetur Lorem
                  consectetur. Lorem reprehenderit cupidatat consequat cillum ullamco ad Lorem anim. Cillum dolor elit
                  occaecat aliqua in minim occaecat exercitation. Amet sit Lorem amet voluptate tempor esse occaecat
                  eiusmod laboris id aliquip tempor. Lorem tempor duis proident duis pariatur et mollit quis. Cupidatat
                  veniam fugiat ad occaecat dolore cillum esse anim ut eu id labore. Deserunt duis irure ex non
                  adipisicing consectetur officia magna enim mollit. Dolore et culpa nisi ipsum irure do non cillum et
                  ex. Aliquip elit do deserunt nisi. Cillum commodo non enim sunt velit in occaecat dolore adipisicing
                  proident elit. Pariatur commodo voluptate deserunt aute ullamco esse irure laboris exercitation dolor
                  laboris est. Lorem laborum labore amet culpa id fugiat sint. Quis fugiat culpa pariatur id irure.
                  Incididunt cupidatat duis aliqua proident dolore aute. Esse officia est elit ex amet ad in cillum non
                  enim deserunt. Sint laboris anim quis non incididunt incididunt mollit laborum. Do incididunt quis
                  labore exercitation duis laborum quis commodo labore laboris. Deserunt occaecat voluptate ut non
                  officia. Tempor cupidatat ad pariatur ea non aliquip aliqua. Ea ullamco consectetur quis nostrud
                  nostrud incididunt officia eu sunt nulla minim deserunt est sint. Est culpa in sunt eu dolor mollit
                  commodo laboris est id enim sint enim sit. Eu eiusmod dolore sit aliquip ut duis excepteur deserunt ad
                  exercitation.
                </Typography>
              </Stack>
              <Stack
                gap={1}
                sx={{
                  display: {
                    xs: "block",
                    lg: "none",
                  },
                }}
              >
                <Typography variant="h5" fontSize="1rem">
                  Uczestnicy
                </Typography>
                <AvatarGroup
                  spacing="small"
                  max={5}
                  sx={{
                    justifyContent: "flex-end",
                  }}
                >
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </AvatarGroup>
              </Stack>
            </Stack>
          </AccordionDetails>
          <AccordionActions>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<EditOutlined fontSize="small" />}
              onClick={() => alert("not implemented")}
            >
              Settings
            </Button>
          </AccordionActions>
        </StyledAccordion>
      </Stack>
    </Stack>
  );
}
