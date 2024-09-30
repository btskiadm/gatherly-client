import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Pagination, Paper, Stack, Typography } from "@mui/material";

export default function GroupMembersPage() {
  return (
    <Stack gap={4}>
      <Stack>
        <Button
          variant="text"
          startIcon={<ArrowBack />}
          sx={{
            width: "min-content",
          }}
        >
          Back
        </Button>
        <Stack direction="row" alignItems="end" gap={1}>
          <Typography variant="h4">Members</Typography>
          <Typography variant="h6">(231)</Typography>
        </Stack>
      </Stack>
      <Stack p={2} direction="row" flexWrap="wrap" gap={2} justifyContent="center">
        <Paper>
          <Box width="16rem" height="16rem"></Box>
        </Paper>
        <Paper>
          <Box width="16rem" height="16rem"></Box>
        </Paper>
        <Paper>
          <Box width="16rem" height="16rem"></Box>
        </Paper>
        <Paper>
          <Box width="16rem" height="16rem"></Box>
        </Paper>
        <Paper>
          <Box width="16rem" height="16rem"></Box>
        </Paper>
        <Paper>
          <Box width="16rem" height="16rem"></Box>
        </Paper>
      </Stack>
      <Stack direction="row" justifyContent="center">
        <Pagination count={10} />
      </Stack>
    </Stack>
  );
}
