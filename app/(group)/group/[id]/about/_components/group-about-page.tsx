import { Link } from "@/app/common/components/next-link";
import { GroupDetailsDto } from "@/app/mock/mock-api.types";
import { AddOutlined } from "@mui/icons-material";
import { Box, Button, Grid2, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { GroupHeader } from "../../_components/group-header";
import { AboutCommentsList } from "./about-comments-list";
import { AboutEventCounterTile } from "./about-event-counter-tile";

interface Props {
  groupDetails: GroupDetailsDto;
}

export const GroupAboutPage = ({ groupDetails }: Props) => {
  const {
    title,
    description,
    upcomingLength,
    pastLength,
    cancelledLength,
    rate,
    thumbnails: { thumb },
  } = groupDetails;

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
            {groupDetails.comments.length > 0 && <AboutCommentsList comments={groupDetails.comments} />}
            {groupDetails.comments.length === 0 && (
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
