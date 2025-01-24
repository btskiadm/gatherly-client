import { GroupUserDto } from "@/app/mock/mock-api.types";
import { Grid2 } from "@mui/material";
import { GroupMemberTile } from "./group-member-tile";

interface Props {
  groupUsers: GroupUserDto[];
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
