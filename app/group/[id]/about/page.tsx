import { Divider, Grid2, Paper, Stack, Typography } from "@mui/material";
import { GroupHeader } from "../_components/GroupHeader";
import { AboutCommentsList } from "./_components/AboutCommentsList";
import { AboutEventCounterTile } from "./_components/AboutEventCounterTile";

export default function GroupMembersPage() {
  return (
    <Stack gap={3}>
      <GroupHeader primary="About" secondary="See basic information about group." />
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
      <Paper>
        <Stack p={2} gap={2}>
          <Typography variant="h6">Name</Typography>
          <Divider />
          <Typography variant="body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit cursus.</Typography>
        </Stack>
      </Paper>
      <Paper>
        <Stack p={2} gap={2}>
          <Typography variant="h6">Description</Typography>
          <Divider />
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at urna sem. Integer sit amet augue congue,
            convallis est quis, imperdiet libero. Nunc pharetra luctus lorem nec mollis. Morbi et consequat tellus. Ut
            mattis quis metus in condimentum. Morbi pulvinar ultricies nisl a vestibulum. Cras nec ultricies dui. Aenean
            egestas justo sit amet libero varius, eget maximus ex aliquam. Donec est diam, tempus nec diam eget, dapibus
            volutpat odio. Morbi enim enim, laoreet quis pulvinar eu, blandit eu est. Nulla facilisi. Quisque tincidunt
            erat sed enim pharetra facilisis. Donec lectus nunc, hendrerit ultricies suscipit nec, ullamcorper ut nunc.
            Curabitur luctus scelerisque mi, at bibendum nisi consequat ut. Sed nunc sapien, lobortis eget commodo eu,
            vestibulum ut nulla. Quisque feugiat quam quis metus molestie sollicitudin. Duis finibus a libero vel
            cursus.
          </Typography>
        </Stack>
      </Paper>
      <Paper>
        <Stack p={2} gap={2}>
          <Typography variant="h6">Opinie</Typography>
          <Divider />
          <AboutCommentsList />
        </Stack>
      </Paper>
    </Stack>
  );
}
