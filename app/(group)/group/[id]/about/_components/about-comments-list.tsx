import { CommentDto } from "@/app/mock/mock-api.types";
import { Divider, Stack } from "@mui/material";
import { Fragment } from "react";
import { AboutComment } from "./about-comment";

interface Props {
  comments: CommentDto[];
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
