"use client";

import { ZodFlattenIssue, flattenIssues, signUpSchema } from "@/app/common/utils/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { Link } from "../../NextLink";

export interface SignUpData {
  username: string;
  email: string;
  password: string;
}

export interface SignUpProps {
  loading: boolean;
  onSubmit: (data: SignUpData) => void;
}

export const SignUp = ({ loading, onSubmit }: SignUpProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<ZodFlattenIssue>({});

  const handleSave = useCallback(() => {
    const { success, error } = signUpSchema.safeParse({
      username,
      email,
      password,
    });

    if (success) {
      onSubmit({
        username,
        email,
        password,
      });

      return;
    }

    setErrors(flattenIssues(error.issues));
  }, [username, email, password, onSubmit]);

  const handleUsername = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }, []);

  const handleEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handlePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const handlePasswordVisibility = useCallback(() => setShowPassword((show) => !show), []);

  const usernameError = errors["username"];
  const emailError = errors["email"];
  const passwordError = errors["password"];

  return (
    <Stack gap={3} width="100%">
      <FormControl required error={!!usernameError}>
        <FormLabel>Username</FormLabel>
        <OutlinedInput notched={false} value={username} onChange={handleUsername} />
        <FormHelperText>{usernameError && usernameError.message}</FormHelperText>
      </FormControl>
      <FormControl required error={!!emailError}>
        <FormLabel>Email</FormLabel>
        <OutlinedInput notched={false} value={email} onChange={handleEmail} />
        <FormHelperText>{emailError && emailError.message}</FormHelperText>
      </FormControl>
      <FormControl required error={!!passwordError}>
        <FormLabel>Password</FormLabel>
        <OutlinedInput
          notched={false}
          value={password}
          onChange={handlePassword}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={handlePasswordVisibility} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
        <FormHelperText>{passwordError && passwordError.message}</FormHelperText>
      </FormControl>
      <LoadingButton size="large" loading={loading} color="primary" variant="contained" onClick={handleSave}>
        Sign up
      </LoadingButton>
      <Stack direction="row" gap={1} alignContent="center" justifyContent="center">
        <Typography align="center" variant="body2">
          Already have an account?
        </Typography>
        <Link href="/login" variant="body2">
          Sign in
        </Link>
      </Stack>
    </Stack>
  );
};
