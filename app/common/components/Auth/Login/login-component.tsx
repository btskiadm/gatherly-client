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
import React, { useState, useCallback } from "react";
import { ZodFlattenIssue, flattenIssues, loginSchema } from "../../../utils/zod";
import { Link } from "../../next-link";
import { TruncatedTypography } from "../../truncated-typography";

export interface LoginData {
  username: string;
  password: string;
}

export interface Props {
  loading: boolean;
  onSubmit: (data: LoginData) => void;
}

export const Login = ({ loading, onSubmit }: Props) => {
  // State management
  const [formData, setFormData] = useState<LoginData>({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<ZodFlattenIssue>({});

  // Handlers
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handlePasswordVisibilityToggle = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleSubmit = useCallback(() => {
    const { success, error } = loginSchema.safeParse(formData);

    if (success) {
      onSubmit(formData);
    } else {
      setErrors(flattenIssues(error.issues));
    }
  }, [formData, onSubmit]);

  // Error messages
  const usernameError = errors["username"]?.message;
  const passwordError = errors["password"]?.message;

  return (
    <Stack gap={3} width="100%">
      {/* Username Field */}
      <FormControl required error={!!usernameError}>
        <FormLabel>Username</FormLabel>
        <OutlinedInput
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Enter your username"
          notched={false}
        />
        {usernameError && <FormHelperText>{usernameError}</FormHelperText>}
      </FormControl>

      {/* Password Field */}
      <FormControl required error={!!passwordError}>
        <FormLabel>Password</FormLabel>
        <OutlinedInput
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          notched={false}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={handlePasswordVisibilityToggle} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        {passwordError && <FormHelperText>{passwordError}</FormHelperText>}
      </FormControl>

      {/* Remember Me and Forgot Password */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <FormControlLabel
          control={<Checkbox size="small" defaultChecked />}
          label={<TruncatedTypography variant="body1">Remember me</TruncatedTypography>}
        />
        <TruncatedTypography variant="body2">Forgot password?</TruncatedTypography>
      </Stack>

      {/* Submit Button */}
      <LoadingButton size="large" loading={loading} color="primary" variant="contained" onClick={handleSubmit}>
        Sign in
      </LoadingButton>

      {/* Sign Up Link */}
      <Stack direction="row" gap={1} justifyContent="center">
        <Typography variant="body2">Don&apos;t have an account?</Typography>
        <Link href="/signUp" variant="body2">
          Sign up
        </Link>
      </Stack>
    </Stack>
  );
};
