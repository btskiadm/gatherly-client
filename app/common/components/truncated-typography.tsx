"use client";

import { Typography, styled } from "@mui/material";

export const TruncatedTypography = styled(Typography)`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
