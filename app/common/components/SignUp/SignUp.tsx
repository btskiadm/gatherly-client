"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useCallback, useState } from "react";
import { FacebookIcon, GoogleIcon, SitemarkIcon } from "./_components/CustomIcons";
import ForgotPassword from "./_components/ForgotPassword";
import { flattenIssues, ZodFlattenIssue } from "../../utils/zod";
import { z } from "zod";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TruncatedFormHelperText } from "../truncated-form-helper-text";

export interface LoginData {
  provider: "credentials" | "facebook" | "google";
  username: string;
  email: string;
  password: string;
}

export interface Props {
  loading: boolean;
  onSubmit: (data: LoginData) => void;
}

export const SignInValidation = (() => {
  const minUsername = 3;
  const maxUsername = 25;
  const minPassword = 5;
  const maxPassword = 250;

  const usernameSchema = z.string().min(minUsername).max(maxUsername);
  const passwordSchema = z.string().min(minPassword).max(maxPassword);

  const sigInInScheme = z.object({
    username: usernameSchema,
    password: passwordSchema,
  });

  return {
    vars: {
      minUsername,
      maxUsername,
      minPassword,
      maxPassword,
    },
    sigInInScheme,
  };
})();

export type SignInScheme = z.infer<typeof SignInValidation.sigInInScheme>;

export const SignUp = ({ loading, onSubmit }: Props) => {
  // State management
  const [formData, setFormData] = useState<LoginData>({
    provider: "credentials",
    username: "",
    password: "",
    email: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
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
    const { success, error } = SignInValidation.sigInInScheme.safeParse(formData);

    if (success) {
      setErrors({});
      onSubmit(formData);
    } else {
      setErrors(flattenIssues(error.issues));
    }
  }, [formData, onSubmit]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  // Error messages
  const usernameError = errors["username"]?.message;
  const emailError = errors["username"]?.message;
  const passwordError = errors["password"]?.message;

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        width: "100%",
        gap: (theme) => theme.spacing(2),
      }}
    >
      <SitemarkIcon />
      <Typography component="h1" variant="h4" sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}>
        Sign up
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
        }}
      >
        <FormControl error={!!usernameError}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <OutlinedInput
            autoFocus
            required
            fullWidth
            id="username"
            type="username"
            name="username"
            placeholder="username"
            autoComplete="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          {usernameError && <TruncatedFormHelperText>{usernameError}</TruncatedFormHelperText>}
        </FormControl>
        <FormControl error={!!emailError}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <OutlinedInput
            required
            fullWidth
            id="email"
            type="email"
            name="email"
            placeholder="email@email.com"
            autoComplete="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {usernameError && <TruncatedFormHelperText>{usernameError}</TruncatedFormHelperText>}
        </FormControl>
        <FormControl error={!!passwordError}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <OutlinedInput
            required
            fullWidth
            id="password"
            type="password"
            name="password"
            placeholder="********"
            autoComplete="password"
            value={formData.password}
            onChange={handleInputChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handlePasswordVisibilityToggle} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {passwordError && <TruncatedFormHelperText>{passwordError}</TruncatedFormHelperText>}
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="I want to receive updates via email."
        />
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button loading={loading} type="submit" fullWidth variant="contained" onClick={handleSubmit}>
          Sign up
        </Button>
      </Box>
      <Divider>or</Divider>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button fullWidth variant="outlined" onClick={() => alert("Sign in with Google")} startIcon={<GoogleIcon />}>
          Sign up with Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("Sign in with Facebook")}
          startIcon={<FacebookIcon />}
        >
          Sign up with Facebook
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          Already have an account? {/* should not be next link but normal link not to trigger intercepted route! */}
          <Link href="/auth/sign-in" variant="body2" sx={{ alignSelf: "center" }}>
            Sign in
          </Link>
        </Typography>
      </Box>
    </Stack>
  );
};
