import { CommentInput } from "@/app/common/components/CommentInput/CommentInput";
import { Box, Grid2, Paper, Stack, Typography } from "@mui/material";
import { GroupHeader } from "../../_components/GroupHeader";
import { AboutCommentsList } from "./AboutCommentsList";
import { AboutEventCounterTile } from "./AboutEventCounterTile";
import { GroupDetails } from "@/app/mock/mock";
import Image from "next/image";

interface Props {
  groupDetails: GroupDetails;
}

export const GroupAboutPage = ({ groupDetails }: Props) => {
  const { title, description, src } = groupDetails;

  return (
    <Stack gap={{ xs: 2, sm: 3 }}>
      <GroupHeader primary="About" secondary="See basic information about group." />
      <Box
        display={{
          sm: "none",
        }}
      >
        <Image
          src={src}
          alt="group logo"
          sizes="100vw"
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
          <AboutEventCounterTile primary="42" secondary="Zakończone" />
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 3 }}>
          <AboutEventCounterTile primary="5" secondary="Odwołane" />
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 3 }}>
          <AboutEventCounterTile primary="12" secondary="Upcoming" />
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 3 }}>
          <AboutEventCounterTile primary="4.2" secondary="Ocena" />
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
        <Typography variant="body1" fontWeight={600}>
          Opinie
        </Typography>
        <Paper>
          <Box p={{ xs: 2, sm: 3 }}>
            <AboutCommentsList comments={groupDetails.comments} />
          </Box>
        </Paper>
      </Stack>
      <CommentInput />
    </Stack>
  );
};
