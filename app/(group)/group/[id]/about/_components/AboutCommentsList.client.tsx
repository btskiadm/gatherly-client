import { getGroupCommentsQueryOptions } from "@/app/common/graphql/options/query/getGroupCommentsQueryOptions";
import { Divider, Stack, Typography } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import { AboutComment } from "./AboutComment";

interface Props {
  groupId: string;
}

export const AboutCommentsListClient = ({ groupId }: Props) => {
  const { data } = useSuspenseQuery(getGroupCommentsQueryOptions({ groupId }));

  const comments = data.getGroupComments.comments;

  if (comments.length <= 0) {
    return (
      <Typography color="error" variant="body1">
        No comments
      </Typography>
    );
  }

  return (
    <Stack gap={2} width="100%" alignItems="stretch" justifyContent="center">
      {data.getGroupComments.comments.map((comment, index) => (
        <Fragment key={comment.id}>
          {index !== 0 && <Divider />}
          <AboutComment key={comment.id} comment={comment} />
        </Fragment>
      ))}
    </Stack>
  );
};
