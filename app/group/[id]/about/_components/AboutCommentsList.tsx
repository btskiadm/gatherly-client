import { Stack } from "@mui/material";
import { AboutComment } from "./AboutComment";

export const AboutCommentsList = () => {
  return (
    <Stack gap={2}>
      <AboutComment />
      <AboutComment />
      <AboutComment />
    </Stack>
  );
};
