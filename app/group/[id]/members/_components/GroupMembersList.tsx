import { Grid2 } from "@mui/material";
import { GroupMemberTile } from "./GroupMemberTile";

export const GroupMembersList = () => {
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={4}>
        <GroupMemberTile />
      </Grid2>
      <Grid2 size={4}>
        <GroupMemberTile />
      </Grid2>
      <Grid2 size={4}>
        <GroupMemberTile />
      </Grid2>
      <Grid2 size={4}>
        <GroupMemberTile />
      </Grid2>
      <Grid2 size={4}>
        <GroupMemberTile />
      </Grid2>
      <Grid2 size={4}>
        <GroupMemberTile />
      </Grid2>
    </Grid2>
  );
};
