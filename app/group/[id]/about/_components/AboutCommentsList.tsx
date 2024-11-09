import { Divider, Stack } from "@mui/material";
import { AboutComment } from "./AboutComment";
import { Comment } from "@/app/mock/mock";
import { Fragment } from "react";

interface Props {
  comments: Comment[];
}

export const AboutCommentsList = ({ comments }: Props) => {
  return (
    <Stack gap={2}>
      {comments.map((comment, index) => (
        <Fragment key={comment.id}>
          {index !== 0 && <Divider />}
          <AboutComment key={comment.id} comment={comment} />
        </Fragment>
      ))}
    </Stack>
  );
};
