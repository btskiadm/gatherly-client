"use client";

import { BootstrapDialog } from "@/app/common/components/bootstrap-dialog";
import { LoginData, SignIn } from "@/app/common/components/SignIn/SignIn";
import { loginMutationFn } from "@/app/common/graphql/options/mutation/loginMutationFn";
import { meQueryKey } from "@/app/common/graphql/options/query/meQueryOptions";
import { Close } from "@mui/icons-material";
import { Box, DialogContent, IconButton } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: loginMutationFn,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: ({ login }) => {
      if (login) {
        localStorage.setItem("accessToken", login.accessToken);
        localStorage.setItem("user", JSON.stringify(login.user));
      }

      queryClient.refetchQueries({
        queryKey: meQueryKey(),
      });

      router.back();
    },
    onError: (error) => {
      toast.error("Login error.. Try again later.");
      console.error("Login error:", error);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  const handleSubmit = useCallback(
    async (data: LoginData) => {
      await mutation.mutateAsync({
        username: data.username,
        password: data.password,
      });
    },
    [queryClient]
  );

  return (
    <BootstrapDialog onClose={handleClose} open={true}>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <Close />
      </IconButton>
      <DialogContent dividers>
        <Box p={2} width="100%">
          <SignIn loading={loading} onSubmit={handleSubmit} />
        </Box>
      </DialogContent>
    </BootstrapDialog>
  );
}
