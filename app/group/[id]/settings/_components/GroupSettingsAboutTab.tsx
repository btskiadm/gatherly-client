"use client";

import { CreateGroup, CreateGroupRef } from "@/app/common/components/Group/Create/CreateGroup.component";
import { delay } from "@/app/common/utils/delay";
import { GroupDetails } from "@/app/mock/mock";
import { LoadingButton } from "@mui/lab";
import { Button, Paper, Stack } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-hot-toast";

interface Props {
  groupDetails: GroupDetails;
}

export const GroupSettingsAboutTab = ({ groupDetails }: Props) => {
  const ref = useRef<CreateGroupRef>(null);
  const [loading, setLoading] = useState(false);
  const { title, description, categories, cities } = groupDetails;

  const handleSave = useCallback(async () => {
    const data = ref.current?.save();

    if (!data?.success) {
      toast.error("Group validation error. Please check a form.");
      return;
    }

    setLoading(true);
    await delay(2000);
    setLoading(false);
    toast.success("Group updated successfully.");
  }, []);

  const handleReset = useCallback(() => {
    ref.current?.reset();
  }, []);

  return (
    <Paper>
      <Stack p={{ xs: 2, sm: 3 }} gap={{ xs: 2, sm: 3 }}>
        <CreateGroup ref={ref} name={title} description={description} categories={categories} city={cities[0]} />
        <Stack direction="row" justifyContent="space-between">
          <Button disabled={loading} variant="text" color="error" onClick={handleReset}>
            Reset
          </Button>
          <LoadingButton loading={loading} variant="outlined" onClick={handleSave}>
            Save
          </LoadingButton>
        </Stack>
      </Stack>
    </Paper>
  );
};
