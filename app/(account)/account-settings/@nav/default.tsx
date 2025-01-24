import { Box } from "@mui/material";
import { AccountNavigation } from "../_components/account-navigation";

export default function Default() {
  return (
    <>
      {/* Mobile Navigation */}
      <Box display={{ xs: "flex", sm: "none" }}>
        <AccountNavigation mobile={true} />
      </Box>

      {/* Desktop Navigation */}
      <Box display={{ xs: "none", sm: "flex" }}>
        <AccountNavigation />
      </Box>
    </>
  );
}
