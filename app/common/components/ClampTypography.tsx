"use client";

import { Typography, styled } from "@mui/material";

export const ClampTypography = styled(Typography)<{ clamp?: number }>`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => props.clamp ?? 1};
  -webkit-box-orient: vertical;
`;
