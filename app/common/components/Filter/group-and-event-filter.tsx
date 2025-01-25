"use client";

import {
  CloudOutlined,
  ExpandMoreOutlined,
  FilterAltOutlined,
  StarBorderRounded,
  VerifiedOutlined,
} from "@mui/icons-material";
import { Button, Chip, FormControl, FormLabel, Popover, Slider, Stack, TextField, ToggleButton } from "@mui/material";
import React, { useCallback, useState } from "react";

const min = 1;
const max = 50;
const diff = 5;

//todo: translation
export const filterTagLabel: Record<"remote" | "sponsored" | "verified", string> = {
  remote: "Remote",
  sponsored: "Sponsored",
  verified: "Verified",
};

const stringify = (n: number, suffix?: string) => {
  if (suffix) {
    return n + suffix;
  }

  return `${n}`;
};

interface Props {
  sponsored: boolean;
  verified: boolean;
  remote: boolean;
  minMembers: number;
  maxMembers: number;
  onChange(sponsored: boolean, verified: boolean, remote: boolean, minMembers: number, maxMembers: number): void;
}

export const GroupAndEventFilter = ({
  remote: _remote,
  sponsored: _sponsored,
  verified: _verified,
  minMembers: _minMembers,
  maxMembers: _maxMembers,
  onChange,
}: Props) => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const [sponsored, setSponsored] = useState(_sponsored);
  const [verified, setVerified] = useState(_verified);
  const [remote, setRemote] = useState(_remote);

  const [minInput, setMinInput] = useState(stringify(_minMembers ?? min));
  const [maxInput, setMaxInput] = useState(stringify(_maxMembers ?? max, "+"));
  const [range, setRange] = useState<number[]>([_minMembers ?? min, _maxMembers ?? max]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    setAnchor(e.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchor(null);
  }, []);

  const handleRange = useCallback((event: unknown, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    let _min = min;
    let _max = max;

    if (newValue[1] - newValue[0] < diff) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], max - diff);
        _min = clamped;
        _max = clamped + diff;
      } else {
        const clamped = Math.max(newValue[1], diff);
        _min = clamped - diff;
        _max = clamped;
      }
    } else {
      const values = newValue as number[];
      _min = values[0];
      _max = values[1];
    }

    setRange([_min, _max]);
    setMinInput(stringify(_min));
    setMaxInput(_max >= max ? stringify(_max, "+") : stringify(_max));
  }, []);

  const handleMin = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    setMinInput(targetValue);
  }, []);

  const handleMax = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    setMaxInput(targetValue);
  }, []);

  const handleMinBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const targetValue = Number.parseInt(e.target.value);
      const maxInputValue = Number.parseInt(minInput);

      if (Number.isNaN(targetValue) || targetValue < min || targetValue >= max || targetValue >= maxInputValue) {
        setMinInput(stringify(min));
      } else {
        setMinInput(stringify(targetValue));
      }
    },
    [minInput]
  );

  const handleMaxBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const targetValue = Number.parseInt(e.target.value);
      const minInputValue = Number.parseInt(minInput);

      if (Number.isNaN(targetValue) || targetValue >= max || targetValue <= minInputValue) {
        setMaxInput(stringify(targetValue, "+"));
      } else {
        setMaxInput(stringify(targetValue));
      }
    },
    [minInput]
  );

  const handleReset = useCallback(() => {
    setMinInput(`${min}`);
    setMaxInput(`${max}+`);
    setRange([min, max]);
    setSponsored(false);
    setRemote(false);
    setVerified(false);
  }, []);

  const handleApply = useCallback(() => {
    setAnchor(null);
    onChange(sponsored, verified, remote, Number.parseInt(minInput), Number.parseInt(maxInput));
  }, [onChange, sponsored, verified, remote, minInput, maxInput]);

  const handleSponsored = useCallback(() => {
    setSponsored(!sponsored);
  }, [sponsored]);

  const handleVerified = useCallback(() => {
    setVerified(!verified);
  }, [verified]);

  const handleRemote = useCallback(() => {
    setRemote(!remote);
  }, [remote]);

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
        <Stack
          sx={{
            p: 2,
            boxShadow: 24,
            bgcolor: "background.paper",
          }}
        >
          <Stack width="320px" gap={3}>
            <FormControl>
              <FormLabel>Atrybuty</FormLabel>
              <Stack direction="row" gap={1} mt={1} flexWrap="wrap">
                <Chip
                  variant="outlined"
                  color={sponsored ? "primary" : "default"}
                  label={filterTagLabel["sponsored"]}
                  icon={<StarBorderRounded fontSize="small" />}
                  onClick={handleSponsored}
                />
                <Chip
                  variant="outlined"
                  color={verified ? "primary" : "default"}
                  label={filterTagLabel["verified"]}
                  icon={<VerifiedOutlined fontSize="small" />}
                  onClick={handleVerified}
                />
                <Chip
                  variant="outlined"
                  color={remote ? "primary" : "default"}
                  label={filterTagLabel["remote"]}
                  icon={<CloudOutlined fontSize="small" />}
                  onClick={handleRemote}
                />
              </Stack>
            </FormControl>
            <FormControl>
              <FormLabel>Ilość uczestników</FormLabel>
              <Stack gap={1} mt={1} flexWrap="wrap">
                <Slider min={min} max={max} value={range} valueLabelDisplay="auto" onChange={handleRange} />
                <Stack direction="row" gap={1}>
                  <TextField
                    placeholder="min."
                    size="small"
                    value={minInput}
                    onChange={handleMin}
                    onBlur={handleMinBlur}
                  />
                  <TextField
                    placeholder="max."
                    size="small"
                    value={maxInput}
                    onChange={handleMax}
                    onBlur={handleMaxBlur}
                  />
                </Stack>
              </Stack>
            </FormControl>
            <Stack direction="row" justifyContent="space-between">
              <Button variant="text" color="error" onClick={handleReset}>
                Reset
              </Button>
              <Button variant="contained" onClick={handleApply}>
                Apply
              </Button>
            </Stack>
          </Stack>
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
        onClick={handleClick}
        startIcon={<FilterAltOutlined fontSize="small" />}
        endIcon={<ExpandMoreOutlined fontSize="small" />}
      >
        Filter
      </Button>
      <ToggleButton
        color="primary"
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
        <FilterAltOutlined fontSize="small" />
      </ToggleButton>
    </>
  );
};
