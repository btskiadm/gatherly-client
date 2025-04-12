"use client";
import { getGroupCommentsQueryOptions } from "@/app/common/graphql/options/query/getGroupCommentsQueryOptions";
import {
  Box,
  CardActions,
  CardContent,
  CircularProgress,
  List,
  Pagination,
  Stack,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { commentsItemsPerPage, commentsLimitToScroll } from "../config";
import { AboutComment } from "./AboutComment";

interface CommentsContentProps {
  groupId: string;
  initialData: {
    rate: number;
  };
}
const cardContentStyles: SxProps<Theme> = { p: "0 0 24px" };

export const AboutCommentsContent = ({ groupId, initialData }: CommentsContentProps) => {
  const [page, setPage] = useState(1);
  const skip = (page - 1) * commentsItemsPerPage;

  const { data, isFetching } = useQuery(getGroupCommentsQueryOptions({ groupId, skip, take: commentsItemsPerPage }));
  const { comments, count } = data?.getGroupComments ?? { comments: [], count: 0 };
  const totalPages = Math.ceil(count / commentsItemsPerPage);

  if (count === 0) {
    return (
      <CardContent sx={cardContentStyles}>
        <Stack direction="column" justifyContent="center" alignItems="center" gap={1} pt={6} pb={4}>
          <Typography textAlign="center" variant="h5">
            Nikt nie dodał jeszcze opinii na temat tej grupy.
          </Typography>
          <Typography textAlign="center" variant="body2" color="text.secondary">
            Nie wahaj się! Bądź pierwszy i wyraź swoją opinię :)
          </Typography>
        </Stack>
      </CardContent>
    );
  }

  return (
    <>
      <CardContent sx={{ ...cardContentStyles, ...(isFetching ? { pointerEvents: "none", opacity: 0.6 } : {}) }}>
        {isFetching && (
          <Box
            position="absolute"
            top="50%"
            left="50%"
            sx={{
              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {count > commentsLimitToScroll && (
          <Scrollbars
            style={{
              position: "relative",
              overflow: "hidden",
              width: "100%",
              height: "100%",
            }}
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            autoHeight
            autoHeightMin={350}
            thumbMinSize={30}
            universal={true}
            autoHeightMax="unset"
            renderView={(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => (
              <div
                {...props}
                style={{
                  minHeight: "15px",
                  maxHeight: "unset",
                  position: "absolute",
                  inset: "0px",
                  overflow: "scroll",
                  marginRight: "-18px",
                  marginBottom: "-18px",
                }}
              />
            )}
          >
            <List disablePadding>
              {comments.map((comment) => (
                <AboutComment key={comment.id} comment={comment} />
              ))}
            </List>
          </Scrollbars>
        )}
        {commentsLimitToScroll >= count && (
          <List disablePadding>
            {comments.map((comment) => (
              <AboutComment key={comment.id} comment={comment} />
            ))}
          </List>
        )}
      </CardContent>
      {count > commentsItemsPerPage && (
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination count={totalPages} variant="text" shape="rounded" onChange={(e, page) => setPage(page)} />
        </CardActions>
      )}
    </>
  );
};
