"use client";

import { CreateGroup, CreateGroupRef } from "@/app/common/components/Group/Create/CreateGroup.component";
import { delay } from "@/app/common/utils/delay";
import { LoadingButton } from "@mui/lab";
import { Button, Paper, Stack } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-hot-toast";

export const GroupSettings = () => {
  const ref = useRef<CreateGroupRef>(null);
  const [loading, setLoading] = useState(false);

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
      <Stack p={2} gap={4}>
        <CreateGroup
          ref={ref}
          name="Lorem ipsum dolor sit amet."
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam arcu dui, laoreet ultricies egesta"
          categories={[
            { key: "category", label: "Bieganie", value: "running" },
            { key: "category", label: "Wspinaczka", value: "climbing" },
            { key: "category", label: "Taniec", value: "dancing" },
          ]}
          city={{
            key: "city",
            label: "Warszawa",
            value: "warsaw",
          }}
        />
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
