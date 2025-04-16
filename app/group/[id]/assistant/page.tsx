// "use client";
import { getGroupDetailsQueryOptions } from "@/app/common/graphql/options/query";
import { EditOutlined } from "@mui/icons-material";
import { Card, CardContent, CardHeader, IconButton, Stack, Typography } from "@mui/material";
import { QueryClient } from "@tanstack/react-query";
import { GroupParams } from "../groupParams";

export default async function Page({ params: promiseParams }: { params: GroupParams }) {
  const queryClient = new QueryClient();
  const { id } = await promiseParams;

  return (
    <Stack direction="column" gap={4}>
      <Card
        elevation={1}
        sx={{
          width: "100%",
        }}
      >
        <CardHeader
          sx={{
            padding: "18px 24px",
          }}
          title={<Typography variant="h5">Informacje</Typography>}
          subheader={
            <Typography variant="body2" color="text.secondary">
              Podstawowe informacje o grupie
            </Typography>
          }
          action={
            <IconButton
              color="secondary"
              size="small"
              sx={{
                borderWidth: 1,
                borderStyle: "solid",
              }}
              // onClick={() => alert("Not implemented.")}
            >
              <EditOutlined fontSize="small" />
            </IconButton>
          }
        />
        <CardContent
          sx={{
            p: "0 24px 24px",
          }}
        ></CardContent>
      </Card>
    </Stack>
  );
}
