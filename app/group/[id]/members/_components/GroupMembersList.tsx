import { Grid2 } from "@mui/material";
import { GroupMemberTile } from "./GroupMemberTile";

export const GroupMembersList = () => {
  return (
    <Grid2 container spacing={{ xs: 1, md: 3 }}>
      <Grid2 size={{ xs: 6, md: 4 }}>
        <GroupMemberTile />
      </Grid2>
      <Grid2 size={{ xs: 6, md: 4 }}>
        <GroupMemberTile />
      </Grid2>
      <Grid2 size={{ xs: 6, md: 4 }}>
        <GroupMemberTile />
      </Grid2>
      <Grid2 size={{ xs: 6, md: 4 }}>
        <GroupMemberTile />
      </Grid2>
      <Grid2 size={{ xs: 6, md: 4 }}>
        <GroupMemberTile />
      </Grid2>
      <Grid2 size={{ xs: 6, md: 4 }}>
        <GroupMemberTile />
      </Grid2>
    </Grid2>
  );
};
