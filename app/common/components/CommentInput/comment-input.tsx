"use client";

import { Button, IconButton, Stack, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { EmojiIcon } from "../Icons/emoji-icon";

export const CommentInput = () => {
  const [value, setValue] = useState("");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  }, []);

  const handleSend = useCallback(() => {
    setValue("");
  }, []);

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
      <TextField
        placeholder="Type a comment.."
        value={value}
        multiline
        sx={{
          width: "100%",
        }}
        onChange={handleChange}
      />
      <Button variant="text" onClick={handleSend}>
        Send
      </Button>
    </Stack>
  );
};
