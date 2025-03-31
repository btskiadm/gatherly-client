import { GroupUser } from "@/app/model/model";
import { Grid2 } from "@mui/material";
import { GroupMemberTile } from "./GroupMemberTile";

interface Props {
  users: GroupUser[];
}

export const GroupMembersList = ({ user }: Props) => {
  return (
    <Grid2 container spacing={2}>
      {users.map((user) => (
        <Grid2 key={user.user.id} size={{ xs: 6, sm: 6, md: 4 }}>
          <GroupMemberTile member={user} />
        </Grid2>
      ))}
    </Grid2>
  );
};
