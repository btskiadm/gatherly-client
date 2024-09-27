"use client";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { flattenIssues, loginSchema, ZodFlattenIssue } from "../../../utils/zod";
import { Link } from "../../NextLink";

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginProps {
  loading: boolean;
  onSubmit: (data: LoginData) => void;
}

export const Login = ({ loading, onSubmit }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<ZodFlattenIssue>({});

  const handleSave = useCallback(() => {
    const { success, error } = loginSchema.safeParse({
      username,
      password,
    });

    if (success) {
      onSubmit({
        username,
        password,
      });

      return;
    }

    setErrors(flattenIssues(error.issues));
  }, [username, password, onSubmit]);

  const handleUsername = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }, []);

  const handlePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const handlePasswordVisibility = useCallback(() => setShowPassword((show) => !show), []);

  const usernameError = errors["username"];
  const passwordError = errors["password"];

  return (
    <Stack gap={3} width="100%">
      <FormControl required error={!!usernameError}>
        <FormLabel>Username</FormLabel>
        <OutlinedInput notched={false} value={username} onChange={handleUsername} />
        <FormHelperText>{usernameError && usernameError.message}</FormHelperText>
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
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <FormControl>
          <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Remember me" />
        </FormControl>
        <Typography variant="body2">Forget password?</Typography>
      </Stack>
      <LoadingButton size="large" loading={loading} color="primary" variant="contained" onClick={handleSave}>
        Sign in
      </LoadingButton>
      <Stack direction="row" gap={1} alignContent="center" justifyContent="center">
        <Typography align="center" variant="body2">
          Don&apos;t have an account?
        </Typography>
        <Link href="/signUp" variant="body2">
          Sign up
        </Link>
      </Stack>
    </Stack>
  );
};
