import { DateOfAdding, NumberOfMembers } from "@/app/common/components/Sort/GroupAndEventSort";
import { Stack } from "@mui/material";
import { GroupTilesList } from "./GroupTilesList";
import { GroupsListing } from "./GroupsListing";

interface Props {
  cities: string[];
  categories: string[];
  titles: string[];
  sponsored: boolean;
  verified: boolean;
  remote: boolean;
  minMembers: number;
  maxMembers: number;
  numberOfMembers: NumberOfMembers;
  dateOfAdding: DateOfAdding;
}

export const GroupsPage = ({
  cities,
  categories,
  titles,
  remote,
  sponsored,
  verified,
  minMembers,
  maxMembers,
  numberOfMembers,
  dateOfAdding,
}: Props) => {
  return (
    <Stack gap={3}>
      <GroupsListing
        cities={cities}
        titles={titles}
        categories={categories}
        remote={remote}
        sponsored={sponsored}
        verified={verified}
        minMembers={minMembers}
        maxMembers={maxMembers}
        numberOfMembers={numberOfMembers}
        dateOfAdding={dateOfAdding}
      />
      <GroupTilesList
        cities={cities}
        titles={titles}
        categories={categories}
        remote={remote}
        sponsored={sponsored}
        verified={verified}
        minMembers={minMembers}
        maxMembers={maxMembers}
        numberOfMembers={numberOfMembers}
        dateOfAdding={dateOfAdding}
      />
    </Stack>
  );
};
