import { CheckCircleOutlined } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

export const UploadSuccess = () => {
  return (
    <Stack alignItems="center" gap={2}>
      <CheckCircleOutlined
        color="success"
        sx={{
          fontSize: "10rem",
        }}
      />
      <Typography
        fontSize="body2"
        sx={{
          whiteSpace: "wrap",
          textAlign: "center",
        }}
      >
        Photo uploaded successfully.
      </Typography>
    </Stack>
  );
};
