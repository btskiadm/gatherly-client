import { Stack } from "@mui/material";
import { GroupsListing } from "./GroupsListing";
import { getGroupTiles } from "@/app/mock/mock-api";
import { GroupTilesList } from "./GroupTilesList";

interface Props {
  categories: string[];
  locations: string[];
}

export const GroupsPage = ({ locations, categories }: Props) => {
  const tiles = getGroupTiles({ locations, categories });

  return (
    <Stack gap={3}>
      <GroupsListing />
      <GroupTilesList tiles={tiles} />
    </Stack>
  );
};
