"use client";

import { delay } from "@/app/common/utils/delay";
import { CloudDownloadOutlined } from "@mui/icons-material";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const GroupTileLoadMore = () => {
  const [loading, setLoading] = useState(false);

  const handleLoading = () => {
    setLoading(true);

    delay(2000).then((_) => {
      setLoading(false);
      toast.success("New groups has just fetched.");
    });
  };

  return (
    <Stack height="100%" alignItems="center" justifyContent="center" gap={2}>
      {!loading && (
        <CloudDownloadOutlined
          fontSize="large"
          color="action"
          sx={{
            fontSize: "6rem",
          }}
        />
      )}
      {loading && (
        <CircularProgress
          thickness={4}
          size="6rem"
          sx={{
            my: "2rem",
          }}
        />
      )}
      {!loading && (
        <>
          <Button color="primary" variant="outlined" onClick={handleLoading}>
            Load more
          </Button>
          <Typography variant="caption" color="text.secondary">
            Load more groups.
          </Typography>
        </>
      )}
    </Stack>
  );
};
