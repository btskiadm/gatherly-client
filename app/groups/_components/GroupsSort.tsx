"use client";

import { Popover } from "@/app/common/components/Popover";
import { ExpandMoreOutlined, SwapVert } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  ToggleButton,
} from "@mui/material";
import { useCallback, useState } from "react";

export const GroupsSort = () => {
  const [anchor, setAnchor] = useState(null);
  const [dateOfAdding, setDateOfAdding] = useState("newest");
  const [numberOfMembers, setNumberOfMembers] = useState("");

  const handleClick = useCallback((event: any) => {
    setAnchor(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchor(null);
  }, []);

  const handleDateOfAddingChange = useCallback((_: unknown, value: string) => {
    setDateOfAdding(value);
  }, []);

  const handleNumberOfMembersChange = useCallback((_: unknown, value: string) => {
    setNumberOfMembers(value);
  }, []);

  return (
    <>
      <Popover
        open={!!anchor}
        anchorEl={anchor}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={handleClose}
      >
        <Stack width="280px" gap={3}>
          <FormControl>
            <FormLabel>Data dodania</FormLabel>
            <RadioGroup value={dateOfAdding} onChange={handleDateOfAddingChange}>
              <FormControlLabel value="newest" control={<Radio size="small" />} label="Newest" />
              <FormControlLabel value="oldest" control={<Radio size="small" />} label="Oldest" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Ilość osób</FormLabel>
            <RadioGroup value={numberOfMembers} onChange={handleNumberOfMembersChange}>
              <FormControlLabel value="" control={<Radio size="small" />} label="Default" />
              <FormControlLabel value="ascending" control={<Radio size="small" />} label="Ascending" />
              <FormControlLabel value="decending" control={<Radio size="small" />} label="Decending" />
            </RadioGroup>
          </FormControl>
        </Stack>
      </Popover>
      <Button
        variant="outlined"
        size="small"
        sx={(theme) => ({
          [theme.breakpoints.down("sm")]: {
            display: "none",
          },
        })}
        startIcon={<SwapVert fontSize="small" />}
        endIcon={<ExpandMoreOutlined fontSize="small" />}
        onClick={handleClick}
      >
        Sort
      </Button>
      <ToggleButton
        value="check"
        size="small"
        selected={!!anchor}
        sx={(theme) => ({
          [theme.breakpoints.up("sm")]: {
            display: "none",
          },
        })}
        onClick={handleClick}
      >
        <SwapVert fontSize="small" />
      </ToggleButton>
    </>
  );
};
