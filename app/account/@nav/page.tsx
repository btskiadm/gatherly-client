import { Box, Paper } from "@mui/material";
import { AccountNavigation } from "../_components/AccountNavigation";

export default function Page() {
  return (
    <>
      <Box
        display={{
          xs: "flex",
          sm: "none",
        }}
      >
        <AccountNavigation mobile={true} />
      </Box>
      <Box
        display={{
          xs: "none",
          sm: "flex",
        }}
      >
        <AccountNavigation />
      </Box>
    </>
  );
}
