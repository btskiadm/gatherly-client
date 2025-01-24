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
import React, { useState, useCallback } from "react";
import { Link } from "../../next-link";

export interface SignUpData {
  username: string;
  email: string;
  password: string;
}

export interface Props {
  loading: boolean;
  onSubmit: (data: SignUpData) => void;
}

export const SignUp = ({ loading, onSubmit }: Props) => {
  // State for form data and errors
  const [formData, setFormData] = useState<SignUpData>({ username: "", email: "", password: "" });
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
    const { success, error } = signUpSchema.safeParse(formData);

    if (success) {
      onSubmit(formData);
    } else {
      setErrors(flattenIssues(error.issues));
    }
  }, [formData, onSubmit]);

  // Error messages
  const { username: usernameError, email: emailError, password: passwordError } = errors;

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
        {usernameError && <FormHelperText>{usernameError.message}</FormHelperText>}
      </FormControl>

      {/* Email Field */}
      <FormControl required error={!!emailError}>
        <FormLabel>Email</FormLabel>
        <OutlinedInput
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          notched={false}
        />
        {emailError && <FormHelperText>{emailError.message}</FormHelperText>}
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
        {passwordError && <FormHelperText>{passwordError.message}</FormHelperText>}
      </FormControl>

      {/* Submit Button */}
      <LoadingButton size="large" loading={loading} color="primary" variant="contained" onClick={handleSubmit}>
        Sign up
      </LoadingButton>

      {/* Sign In Link */}
      <Stack direction="row" gap={1} justifyContent="center">
        <Typography variant="body2">Already have an account?</Typography>
        <Link href="/login" variant="body2">
          Sign in
        </Link>
      </Stack>
    </Stack>
  );
};
