import { Box } from "@mui/material";
import { GroupDesktopNavigation } from "./GroupDesktopNavigation";
import { GroupMobileNavitaion } from "./GroupMobileNavigation";
import { GroupDetails } from "@/app/mock/mock";

interface Props {
  groupDetails: GroupDetails;
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
