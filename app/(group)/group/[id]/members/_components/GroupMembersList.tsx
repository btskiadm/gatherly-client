import { GroupUser } from "@/app/model/model";
import { Grid2 } from "@mui/material";
import { GroupMemberTile } from "./GroupMemberTile";

interface Props {
  members: GroupUser[];
}

export const GroupMembersList = ({ members }: Props) => {
  return (
    <Grid2 container spacing={2}>
      {members.map((member) => (
        <Grid2 key={member.user.id} size={{ xs: 6, sm: 6, md: 4 }}>
          <GroupMemberTile member={member} />
        </Grid2>
      ))}
    </Grid2>
  );
};
