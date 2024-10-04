import { Container } from "@mui/material";
import React from "react";

export const GroupsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <Container>{children}</Container>;
};
