import { Box, Stack } from "@mui/material";
import { GroupNav } from "./_components/GroupNav";

export default function GroupPage() {
  return (
    <>
      <Stack gap={4} mt={4} direction="row">
        <Box
          sx={{
            minWidth: "280px",
            flexBasis: "clamp(280px, 20%, 560px)",
          }}
        >
          <GroupNav />
        </Box>
        <Box
          sx={{
            border: "1px solid red",
            flexBasis: "100%",
          }}
        ></Box>
      </Stack>
    </>
  );
}
