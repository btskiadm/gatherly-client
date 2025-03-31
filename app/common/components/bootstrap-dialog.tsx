import { CircularProgress, Dialog, DialogActions, DialogTitle, Skeleton, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BootstrapDialogTitle = styled(DialogTitle)(({ theme }) => ({}));

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "100%",
    margin: theme.spacing(4),
  },
  "& .MuiDialogTitle-root": {
    padding: theme.spacing(2, 3),
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2, 3),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2, 3),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

export const BootstrapDialogActions = styled(DialogActions)(({ theme }) => ({}));

export const DialogLoadingContent = () => (
  <Stack
    justifyContent="center"
    alignItems="center"
    height="30vh"
    minWidth="280px"
    width="clamp(280px, 50vw, 560px)"
    maxWidth="560px"
  >
    <CircularProgress size="3rem" />
  </Stack>
);

export const DialogLoadingActions = () => {
  return (
    <>
      <Skeleton width="84px" height="36.5px" variant="rectangular" />
      <Stack direction="row" gap={1}>
        <Skeleton width="84px" height="36.5px" variant="rectangular" />
        <Skeleton width="84px" height="36.5px" variant="rectangular" />
      </Stack>
    </>
  );
};
