"use client";

import { LoginData, SignIn } from "@/app/common/components/SignIn/SignIn";
import { SignInCard } from "@/app/common/components/SignIn/SignInCard";
import { SignInContainer } from "@/app/common/components/SignIn/SignInContainer";
import { SignUp } from "@/app/common/components/SignUp/SignUp";
import { loginMutationFn } from "@/app/common/graphql/options/mutation/loginMutationFn";
import { meQueryKey } from "@/app/common/graphql/options/query/meQueryOptions";
import { ArrowBack } from "@mui/icons-material";
import { Button, GlobalStyles } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export const SignUpPage = () => {
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

      router.replace("/groups");
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
    <>
      <GlobalStyles
        styles={{
          ".MuiToolbar-root": {
            display: "none !important",
          },
        }}
      />
      <SignInContainer>
        <SignInCard>
          <Button
            size="small"
            sx={{
              color: "text.secondary",
              position: "absolute",
              right: (theme) => theme.spacing(1),
              top: (theme) => theme.spacing(1),
            }}
            startIcon={<ArrowBack fontSize="small" />}
            onClick={handleClose}
          >
            Powrót
          </Button>
          <SignUp loading={loading} onSubmit={handleSubmit} />
        </SignInCard>
      </SignInContainer>
    </>
  );
};
