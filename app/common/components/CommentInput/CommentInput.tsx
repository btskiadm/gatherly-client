"use client";

import { Button, IconButton, Stack } from "@mui/material";
import { EmojiIcon } from "../Icons/EmojiIcon";
import { Textarea } from "../Textarea";

export const CommentInput = () => {
  return (
    <Stack direction="row" gap={0.5} alignItems="center">
      <IconButton
        sx={{
          width: "min-content",
          height: "min-content",
        }}
      >
        <EmojiIcon />
      </IconButton>
      <Textarea
        placeholder="Write your comment here.."
        sx={{
          width: "100%",
        }}
      />
      <Button variant="text">Send</Button>
    </Stack>
  );
};
