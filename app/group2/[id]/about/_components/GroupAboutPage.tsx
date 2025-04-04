"use client";

import { Link } from "@/app/common/components/next-link";
import { getGroupDetailsQueryOptions } from "@/app/common/graphql/options/query";
import {
  AddOutlined,
  CancelOutlined,
  EventAvailableOutlined,
  PeopleOutline,
  ScheduleOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid2,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { GroupHeader } from "../../_components/GroupHeader";
import { AboutCommentsListClient } from "./AboutCommentsList.client";

// lokalizacja
// dyskusja + oceny
// zdjęcia
// share social media
// kategorie

const insertLeadingZero = (val: number) => {
  if (val <= 9) {
    return "0" + val;
  }

  return val;
};

export const GroupAboutPage = ({ groupId }: { groupId: string }) => {
  const { data } = useSuspenseQuery(getGroupDetailsQueryOptions({ groupId }));

  if (!data) {
    return notFound();
  }

  const {
    title,
    description,
    upcomingLength,
    pastLength,
    cancelledLength,
    rate,
    users,
    mediumPhoto,
    comments = [],
  } = data.getGroupDetails ?? {};

  return (
    <Stack gap={{ xs: 2, sm: 3 }}>
      <GroupHeader primary="Opis" secondary="Podstawowe informacje o grupie." />
      <Box
        display={{
          sm: "none",
        }}
      >
        <Image
          src={mediumPhoto ?? ""}
          alt="group logo"
          sizes="100vw"
          width={0}
          height={0}
          style={{
            width: "100%",
            height: "100%",
            cursor: "pointer",
            objectFit: "cover",
          }}
        />
      </Box>
      <Stack gap={4}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 6, lg: 3 }}>
            <Paper
              sx={{
                boxShadow: "rgba(115, 82, 199, 0.176) 0px 0.5rem 1.25rem",
                position: "relative",
                backgroundColor: "rgb(111, 66, 193)",
                transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <Stack
                justifyContent="center"
                alignItems="center"
                gap={1}
                py={{ xs: 2, sm: 3 }}
                color="primary.contrastText"
                direction="row"
              >
                <ScheduleOutlined
                  fontSize="large"
                  sx={{
                    fontSize: "2.75rem",
                  }}
                />
                <Stack direction="column">
                  <Typography variant="h5" color="inherit">
                    {insertLeadingZero(upcomingLength ?? 0)}
                  </Typography>
                  <Typography variant="body3" color="inherit">
                    Nadchodzące
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </Grid2>
          <Grid2 size={{ xs: 6, lg: 3 }}>
            <Paper
              sx={{
                boxShadow: "rgba(115, 82, 199, 0.176) 0px 0.5rem 1.25rem;",
                position: "relative",
                backgroundColor: "rgb(228, 74, 119)",
                transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <Stack
                justifyContent="center"
                alignItems="center"
                gap={1}
                py={{ xs: 2, sm: 3 }}
                color="primary.contrastText"
                direction="row"
              >
                <EventAvailableOutlined
                  fontSize="large"
                  sx={{
                    fontSize: "2.75rem",
                  }}
                />
                <Stack direction="column">
                  <Typography variant="h5" color="inherit">
                    {insertLeadingZero(pastLength ?? 0)}
                  </Typography>
                  <Typography variant="body3" color="inherit">
                    Zakończone
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </Grid2>
          <Grid2 size={{ xs: 6, lg: 3 }}>
            <Paper
              sx={{
                boxShadow: "rgba(115, 82, 199, 0.176) 0px 0.5rem 1.25rem;",
                position: "relative",
                backgroundColor: "rgb(231, 49, 69)",
                transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <Stack
                justifyContent="center"
                alignItems="center"
                gap={1}
                py={{ xs: 2, sm: 3 }}
                color="primary.contrastText"
                direction="row"
              >
                <CancelOutlined
                  fontSize="large"
                  sx={{
                    fontSize: "2.75rem",
                  }}
                />
                <Stack direction="column">
                  <Typography variant="h5" color="inherit">
                    {insertLeadingZero(cancelledLength ?? 0)}
                  </Typography>
                  <Typography variant="body3" color="inherit">
                    Anulowane
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </Grid2>
          <Grid2 size={{ xs: 6, lg: 3 }}>
            <Paper
              sx={{
                boxShadow: "rgba(115, 82, 199, 0.176) 0px 0.5rem 1.25rem;",
                position: "relative",
                backgroundColor: "rgb(35, 188, 186)",
                transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <Stack
                justifyContent="center"
                alignItems="center"
                gap={1}
                py={{ xs: 2, sm: 3 }}
                color="primary.contrastText"
                direction="row"
              >
                <PeopleOutline
                  fontSize="small"
                  sx={{
                    strokeWidth: "10px",
                    fontSize: "2.75rem",
                  }}
                />
                <Stack direction="column">
                  <Typography variant="h5" color="inherit">
                    {insertLeadingZero(users?.length ?? 0)}
                  </Typography>
                  <Typography variant="body3" color="inherit">
                    Członkowie
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </Grid2>
        </Grid2>

        <Card
          elevation={0}
          sx={{
            width: "100%",
          }}
        >
          <CardHeader
            sx={{
              padding: "18px 24px",
            }}
            title={<Typography variant="h5">Opis grupy</Typography>}
          />
          <CardContent
            sx={{
              p: "0 24px 24px",
            }}
          >
            <Typography variant="body1">{description}</Typography>
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
              borderBottomWidth: "1px",
              borderBottomStyle: "solid",
              borderBottomColor: "divider",
            }}
            title={<Typography variant="h5">Komentarze</Typography>}
            action={
              <Button
                href="about/comment"
                LinkComponent={Link}
                size="small"
                variant="contained"
                endIcon={<AddOutlined />}
              >
                Dodaj opinie
              </Button>
            }
          />
          <CardContent
            sx={{
              p: "0 0 24px",
            }}
          >
            <Suspense fallback={<CircularProgress />}>
              <AboutCommentsListClient groupId={groupId} />
            </Suspense>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
};
