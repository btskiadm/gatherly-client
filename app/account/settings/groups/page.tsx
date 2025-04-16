"use client";

import { ClampTypography } from "@/app/common/components/clamp-typography";
import { LocalTime } from "@/app/common/components/LocalTime/LocalTime";
import {
  getGroupTilesByUserIdQueryKey,
  getGroupTilesByUserIdQueryOptions,
} from "@/app/common/graphql/options/query/getGroupTilesByUserIdQueryOptions";
import { meQueryOptions } from "@/app/common/graphql/options/query/meQueryOptions";
import { GroupStatus } from "@/app/model/model";
import {
  AddOutlined,
  CalendarMonthOutlined,
  EditOutlined,
  ExpandMoreOutlined,
  FilterAltOutlined,
  HomeOutlined,
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
  const { data } = useSuspenseQuery(
    getGroupTilesByUserIdQueryOptions({
      skip: 0,
      take: 1000,
    })
  );

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

      <Stack direction="column" gap={1}>
        <Stack direction="row" justifyContent="space-between" width="100%" gap={2} pb={1}>
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
        {data.getGroupTilesByUserId.groups.map((group) => (
          <StyledAccordion key={group.id}>
            <AccordionSummary
              expandIcon={<Remove />}
              sx={{
                display: "block",
              }}
            >
              <Grid2 container spacing={3} width="100%">
                <Grid2 size={{ xs: 8, lg: 6 }} display="flex" direction="row" gap={3}>
                  <Avatar
                    src={group.smallPhoto}
                    variant="rounded"
                    sx={{
                      width: "64px",
                      height: "64px",
                    }}
                  />
                  <Stack direction="column" gap={0.25} justifyContent="center" width="100%" flexGrow="1">
                    <ClampTypography clamp={2} variant="h4" fontSize="0.875rem">
                      {group.title}
                    </ClampTypography>
                    <Stack direction="row" gap={1} alignItems="center">
                      <CalendarMonthOutlined
                        fontSize="small"
                        sx={{
                          color: "text.secondary",
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        <LocalTime date={new Date(group.createdAt)} formatter={(d) => d.toLocaleString()} />
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid2>
                <Grid2
                  size={{ xs: 4, lg: 3 }}
                  display="flex"
                  direction="row"
                  justifyContent={{ xs: "flex-end", lg: "flex-start" }}
                >
                  <Stack direction="column" gap={0.25} justifyContent="flex-start">
                    <Typography variant="body2" color="text.secondary">
                      Status
                    </Typography>
                    {group.status === GroupStatus.Active && <Chip color="success" label="Aktywna" size="small" />}
                    {group.status === GroupStatus.Banned && <Chip color="error" label="Zbanowana" size="small" />}
                    {group.status === GroupStatus.Inactive && <Chip color="default" label="Nieaktywna" size="small" />}
                    {group.status === GroupStatus.PendingVerification && (
                      <Chip color="secondary" label="W trakcie weryfikacji" size="small" />
                    )}
                    {group.status === GroupStatus.Suspended && <Chip color="warning" label="Zawieszona" size="small" />}
                  </Stack>
                </Grid2>
                <Grid2
                  size={{ xs: 3 }}
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
                  <AvatarGroup
                    spacing="medium"
                    max={group.users.length}
                    renderSurplus={(e) => (
                      <Avatar
                        alt={"+10"}
                        src="/"
                        sx={{
                          fontSize: "0.875rem",
                        }}
                      >
                        {group.usersCount - group.users.length}
                      </Avatar>
                    )}
                  >
                    {group.users.map((user) => (
                      <Avatar alt={user.username} src={user.smallPhoto} />
                    ))}
                  </AvatarGroup>
                </Grid2>
              </Grid2>
            </AccordionSummary>
            <AccordionDetails>
              <Stack gap={3}>
                <Stack gap={1}>
                  <Typography variant="h5" fontSize="1rem">
                    Opis
                  </Typography>
                  <Typography variant="body2" color="text.secondary" fontSize="0.875rem">
                    {group.description}
                  </Typography>
                </Stack>
                <Stack gap={1}>
                  <Typography variant="h5" fontSize="1rem">
                    Kategorie
                  </Typography>
                  <Stack direction="row" gap={2} flexWrap="wrap">
                    {group.categories.map((category) => (
                      <Chip label={category.label} />
                    ))}
                  </Stack>
                </Stack>
                <Stack gap={1}>
                  <Typography variant="h5" fontSize="1rem">
                    Lokalizacje
                  </Typography>
                  <Stack direction="row" gap={2} flexWrap="wrap">
                    {group.cities.map((city, index) => {
                      return (
                        <Chip icon={index === 0 ? <HomeOutlined fontSize="small" /> : undefined} label={city.label} />
                      );
                    })}
                  </Stack>
                </Stack>
                <Stack
                  gap={1}
                  sx={{
                    display: {
                      xs: "flex",
                      lg: "none",
                    },
                  }}
                >
                  <Typography variant="h5" fontSize="1rem">
                    Uczestnicy
                  </Typography>
                  <AvatarGroup
                    sx={{
                      justifyContent: "flex-end",
                    }}
                    spacing="medium"
                    max={group.users.length}
                    renderSurplus={(e) => (
                      <Avatar
                        alt={"+10"}
                        src="/"
                        sx={{
                          fontSize: "0.875rem",
                        }}
                      >
                        {group.usersCount - group.users.length}
                      </Avatar>
                    )}
                  >
                    {group.users.map((user) => (
                      <Avatar alt={user.username} src={user.smallPhoto} />
                    ))}
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
        ))}
      </Stack>
    </Stack>
  );
}
