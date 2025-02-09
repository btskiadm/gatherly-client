"use client";

import { Link } from "@/app/common/components/next-link";
import { getGroupDetailsQueryOptions } from "@/app/common/graphql/options/query";
import { AddOutlined } from "@mui/icons-material";
import { Box, Button, Grid2, Paper, Stack, Typography } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import { GroupHeader } from "../../_components/GroupHeader";
import { AboutCommentsList } from "./AboutCommentsList";
import { AboutEventCounterTile } from "./AboutEventCounterTile";

export const GroupAboutPage = ({ groupId }: { groupId: string }) => {
  const { data } = useSuspenseQuery(getGroupDetailsQueryOptions({ groupId }));

  const {
    title,
    description,
    upcomingLength,
    pastLength,
    cancelledLength,
    rate,
    thumbnail: { thumb },
  } = data.getGroupDetails;

  const rateLabel = `${Number.isNaN(rate) ? "-" : rate} `;

  return (
    <Stack gap={{ xs: 2, pnsm: 3 }}>
      <GroupHeader primary="About" secondary="See basic information about group." />
      <Box
        display={{
          sm: "none",
        }}
      >
        <Image
          src={thumb}
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
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 6, sm: 3 }}>
          <AboutEventCounterTile primary={`${upcomingLength}`} secondary="Upcoming" />
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 3 }}>
          <AboutEventCounterTile primary={`${pastLength}`} secondary="Zakończone" />
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 3 }}>
          <AboutEventCounterTile primary={`${cancelledLength}`} secondary="Odwołane" />
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 3 }}>
          <AboutEventCounterTile primary={rateLabel} secondary="Ocena" />
        </Grid2>
      </Grid2>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight={600}>
          Name
        </Typography>
        <Paper>
          <Box p={{ xs: 2, sm: 3 }}>
            <Typography variant="body1">{title}</Typography>
          </Box>
        </Paper>
      </Stack>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight={600}>
          Description
        </Typography>
        <Paper>
          <Box p={{ xs: 2, sm: 3 }}>
            <Typography variant="body1">{description}</Typography>
          </Box>
        </Paper>
      </Stack>
      <Stack gap={1}>
        <Stack alignItems="flex-end" direction="row" justifyContent="space-between">
          <Typography variant="body1" fontWeight={600}>
            Opinie
          </Typography>
          <Button href="about/comment" LinkComponent={Link} size="small" variant="contained" endIcon={<AddOutlined />}>
            Add
          </Button>
        </Stack>
        <Paper>
          <Box p={{ xs: 2, sm: 3 }}>
            {data.getGroupDetails.comments.length > 0 && <AboutCommentsList comments={data.getGroupDetails.comments} />}
            {data.getGroupDetails.comments.length === 0 && (
              <Typography color="error" variant="body1">
                No comments
              </Typography>
            )}
          </Box>
        </Paper>
      </Stack>
    </Stack>
  );
};
