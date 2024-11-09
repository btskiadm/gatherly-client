import { Grid2 } from "@mui/material";
import { GroupMemberTile } from "./GroupMemberTile";
import { GroupUser } from "@/app/mock/mock";

interface Props {
  groupUsers: GroupUser[];
}

export const GroupMembersList = ({ groupUsers }: Props) => {
  return (
    <Grid2 container spacing={2}>
      {groupUsers.map((groupUser) => (
        <Grid2 key={groupUser.user.id} size={{ xs: 6, sm: 6, md: 4 }}>
          <GroupMemberTile groupUser={groupUser} />
        </Grid2>
      ))}
    </Grid2>
  );
};
