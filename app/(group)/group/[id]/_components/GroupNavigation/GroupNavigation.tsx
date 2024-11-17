import { Box } from "@mui/material";
import { GroupDesktopNavigation } from "./GroupDesktopNavigation";
import { GroupMobileNavitaion } from "./GroupMobileNavigation";
import { GroupDetailsDto } from "@/app/mock/mock-api.types";

interface Props {
  groupDetails: GroupDetailsDto;
}

export function GroupNavigation({ groupDetails }: Props) {
  return (
    <>
      <Box
        display={{
          xs: "none",
          sm: "block",
        }}
      >
        <GroupDesktopNavigation groupDetails={groupDetails} />
      </Box>
      <Box
        display={{
          sm: "none",
        }}
      >
        <GroupMobileNavitaion groupDetails={groupDetails} />
      </Box>
    </>
  );
}
