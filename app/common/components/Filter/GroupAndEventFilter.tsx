"use client";

import { Popover } from "@/app/common/components/Popover";
import { FilterAttribute, FilterAttributeKeys, filterAttributeLabel } from "@/app/groups/mock";
import {
  CloudOutlined,
  ExpandMoreOutlined,
  FilterAltOutlined,
  FmdGoodOutlined,
  StarBorderRounded,
  VerifiedOutlined,
} from "@mui/icons-material";
import { Button, Chip, FormControl, FormLabel, Slider, Stack, TextField, ToggleButton } from "@mui/material";
import React, { useCallback, useState } from "react";

const min = 1;
const max = 50;
const diff = 5;

const attrs: FilterAttribute[] = [
  { key: "remote", value: false },
  { key: "stationary", value: false },
  { key: "verified", value: false },
  { key: "sponsored", value: false },
];

const stringify = (n: number, suffix?: string) => {
  if (suffix) {
    return n + suffix;
  }

  return `${n}`;
};

export const GroupAndEventFilter = () => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [minInput, setMinInput] = useState(stringify(min));
  const [maxInput, setMaxInput] = useState(stringify(max, "+"));
  const [range, setRange] = useState<number[]>([min, max]);
  const [attributes, setAttributes] = useState<FilterAttribute[]>(attrs);

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

  const hasAttribute = useCallback(
    (key: FilterAttributeKeys) => {
      return attributes.some((attribute) => attribute.key === key && attribute.value);
    },
    [attributes]
  );

  const toggleAttribute = useCallback((key: FilterAttributeKeys) => {
    setAttributes((prevAttributes) => {
      return prevAttributes.map((attribute) => {
        if (attribute.key === key) {
          return { key: key, value: !attribute.value };
        }
        return attribute;
      });
    });
  }, []);

  const handleReset = useCallback(() => {
    setMinInput(`${min}`);
    setMaxInput(`${max}+`);
    setRange([min, max]);
    setAttributes(attrs);
  }, []);

  const handleApply = useCallback(() => {
    setAnchor(null);
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
        <Stack width="320px" gap={3}>
          <FormControl>
            <FormLabel>Atrybuty</FormLabel>
            <Stack direction="row" gap={1} mt={1} flexWrap="wrap">
              <Chip
                variant="outlined"
                color={hasAttribute("sponsored") ? "primary" : "default"}
                label={filterAttributeLabel["sponsored"]}
                icon={<StarBorderRounded fontSize="small" />}
                onClick={() => toggleAttribute("sponsored")}
              />
              <Chip
                variant="outlined"
                color={hasAttribute("verified") ? "primary" : "default"}
                label={filterAttributeLabel["verified"]}
                icon={<VerifiedOutlined fontSize="small" />}
                onClick={() => toggleAttribute("verified")}
              />
              <Chip
                variant="outlined"
                color={hasAttribute("remote") ? "primary" : "default"}
                label={filterAttributeLabel["remote"]}
                icon={<CloudOutlined fontSize="small" />}
                onClick={() => toggleAttribute("remote")}
              />
              <Chip
                variant="outlined"
                color={hasAttribute("stationary") ? "primary" : "default"}
                label={filterAttributeLabel["stationary"]}
                icon={<FmdGoodOutlined fontSize="small" />}
                onClick={() => toggleAttribute("stationary")}
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
