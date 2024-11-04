import { Stack } from "@mui/material";
import { AboutComment } from "./AboutComment";
import { Comment } from "@/app/mock/mock";

interface Props {
  comments: Comment[];
}

export const AboutCommentsList = ({ comments }: Props) => {
  return (
    <Stack gap={2}>
      {comments.map((comment) => (
        <AboutComment key={comment.id} comment={comment} />
      ))}
    </Stack>
  );
};
