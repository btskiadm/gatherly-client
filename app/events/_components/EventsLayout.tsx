import { GroupAndEventAutocomplete } from "@/app/common/components/Autocomplete/GroupAndEventAutocomplete";
import { GroupAndEventFilter } from "@/app/common/components/Filter/GroupAndEventFilter";
import { GroupAndEventSort } from "@/app/common/components/Sort/GroupAndEventSort";
import { Container, Stack } from "@mui/material";
import React from "react";

export const EventsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Container>
      <Stack gap={3} py={{ xs: 3, sm: 6 }}>
        <Stack direction="row" gap={1}>
          <GroupAndEventAutocomplete />
          <GroupAndEventFilter />
          <GroupAndEventSort />
        </Stack>
        {children}
      </Stack>
    </Container>
  );
};
