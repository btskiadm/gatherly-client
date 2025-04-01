"use client";

import {
  Avatar,
  Box,
  Chip,
  List,
  ListItemAvatar,
  ListItemButton,
  Paper,
  Stack,
  styled,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { TruncatedTypography } from "../truncated-typography";

const StyledList = styled(List)(({ theme }) => ({
  "& > .MuiListItemButton-root": {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box minWidth={0} hidden={value !== index} {...other}>
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}

export const Chat = () => {
  const [value, setValue] = useState("messages");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const item = (
    <Stack gap={2} direction="row" minWidth="0">
      <ListItemAvatar
        sx={{
          minWidth: "0",
        }}
      >
        <Avatar sx={{ width: "40px", height: "40px" }} alt="test" src="#" />
      </ListItemAvatar>
      <Stack direction="column" minWidth="0">
        <Typography variant="h5" fontSize="0.875rem">
          Adam Adam
        </Typography>
        <TruncatedTypography variant="body3" color="text.secondary">
          Ipsum quis pariatur cupidatat reprehenderit duis qui excepteur sunt. Minim nulla do eu adipisicing consequat
          aliquip nostrud amet labore velit id excepteur. Est aliqua cupidatat est culpa Lorem. Occaecat esse nostrud
          elit eu elit commodo.
        </TruncatedTypography>
      </Stack>
    </Stack>
  );

  return (
    <Paper
      elevation={1}
      sx={{
        display: "flex",
        flex: 1,
      }}
    >
      <Stack direction="row" flex={1} minWidth="0">
        <Stack
          direction="column"
          width="280px"
          maxWidth="280px"
          sx={{
            borderWidth: "1px",
            borderStyle: "solid",
            borderRightColor: "divider",
            borderLeft: 0,
            borderBottom: 0,
            borderTop: 0,
          }}
        >
          <Stack direction="row" gap={2} p={2} alignItems="center">
            <Avatar sx={{ width: "48px", height: "48px" }} alt="test" src="#" />
            <Stack direction="column" minWidth="0" gap={0.5}>
              <Typography variant="h5" fontSize="1rem">
                Adam Adam
              </Typography>
              <TruncatedTypography variant="body2" color="text.secondary">
                Ipsum quis pariatur cupidatat reprehenderit duis qui excepteur sunt. Minim nulla do eu adipisicing
                consequat aliquip nostrud amet labore velit id excepteur. Est aliqua cupidatat est culpa Lorem. Occaecat
                esse nostrud elit eu elit commodo.
              </TruncatedTypography>
            </Stack>
          </Stack>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            textColor="secondary"
            indicatorColor="secondary"
            sx={{
              px: 1,
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "divider",
              borderLeftColor: "transparent",
              borderTopColor: "transparent",
              borderRightColor: "transparent",
              borderBottomColor: "divder",
              "& .MuiTab-root": {
                minWidth: "64px",
                px: 0,
              },
            }}
          >
            <Tab sx={{ fontSize: "0.75rem" }} value="messages" label="Wiadomości" />
            <Tab sx={{ fontSize: "0.75rem" }} value="groups" label="Grupy" />
            <Tab sx={{ fontSize: "0.75rem" }} value="events" label="Wydarzenia" />
          </Tabs>

          <Scrollbars
            style={{
              position: "relative",
              overflow: "hidden",
              width: "100%",
              height: "100%",
            }}
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            autoHeight
            autoHeightMin={0}
            thumbMinSize={30}
            universal={true}
            autoHeightMax="unset"
            renderView={(props) => (
              <div
                {...props}
                style={{
                  minHeight: "15px",
                  maxHeight: "unset",
                  position: "absolute",
                  inset: "0px",
                  overflow: "scroll",
                  marginRight: "-18px",
                  marginBottom: "-18px",
                }}
              />
            )}
          >
            <CustomTabPanel value={value} index="messages">
              <StyledList>
                <ListItemButton>{item}</ListItemButton>
                <ListItemButton>{item}</ListItemButton>
                <ListItemButton>{item}</ListItemButton>
                <ListItemButton>{item}</ListItemButton>
                <ListItemButton>{item}</ListItemButton>
                <ListItemButton>{item}</ListItemButton>
                <ListItemButton>{item}</ListItemButton>
                <ListItemButton>{item}</ListItemButton>
              </StyledList>
            </CustomTabPanel>
            <CustomTabPanel value={value} index="groups"></CustomTabPanel>
          </Scrollbars>
        </Stack>
        <Stack direction="column" minWidth="0">
          <Stack
            direction="row"
            gap={2}
            p={2}
            minWidth="0"
            sx={{
              borderBottom: "1px solid transparent",
              borderBottomColor: "divider",
            }}
          >
            <Avatar sx={{ width: "40px", height: "40px" }} alt="test" src="#" />
            <Stack direction="column" minWidth="0" gap={0.5}>
              <Typography variant="h5" fontSize="1rem">
                Adam Adam
              </Typography>
              <TruncatedTypography variant="body2" color="text.secondary">
                Ipsum quis pariatur cupidatat reprehenderit duis qui excepteur sunt. Minim nulla do eu adipisicing
                consequat aliquip nostrud amet labore velit id excepteur. Est aliqua cupidatat est culpa Lorem. Occaecat
                esse nostrud elit eu elit commodo.
              </TruncatedTypography>
            </Stack>
          </Stack>
          <Scrollbars
            style={{
              position: "relative",
              overflow: "hidden",
              width: "100%",
              height: "100%",
            }}
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            autoHeight
            autoHeightMin={0}
            thumbMinSize={30}
            universal={true}
            autoHeightMax="unset"
            renderView={(props) => (
              <div
                {...props}
                style={{
                  minHeight: "15px",
                  maxHeight: "unset",
                  position: "absolute",
                  inset: "0px",
                  overflow: "scroll",
                  marginRight: "-18px",
                  marginBottom: "-18px",
                }}
              />
            )}
          >
            <Stack direction="row" gap={2} p={2} minWidth="0">
              <Avatar sx={{ width: "40px", height: "40px" }} alt="test" src="#" />
              <Stack direction="column" minWidth="0" gap={0.5}>
                <Typography variant="body3" color="text.secondary">
                  Adam Adam - 2:00 AM
                </Typography>
                <Paper
                  elevation={0}
                  sx={{
                    bgcolor: "rgb(115, 82, 199)",
                    fontWeight: 400,
                    px: 2,
                    py: 1,
                  }}
                >
                  <Typography variant="body3" color="primary.contrastText">
                    Ipsum quis pariatur cupidatat reprehenderit duis qui excepteur sunt. Minim nulla do eu adipisicing
                    consequat aliquip nostrud amet labore velit id excepteur. Est aliqua cupidatat est culpa Lorem.
                    Occaecat esse nostrud elit eu elit commodo.
                  </Typography>
                </Paper>
              </Stack>
            </Stack>
            <Box
              sx={{
                position: "relative",
                textAlign: "center",

                "&::after": {
                  display: "inline-block",
                  content: "''",
                  position: "absolute",
                  left: "0",
                  right: "0",
                  height: "1px",
                  top: "50%",
                  zIndex: 0,
                  transform: "translateY(-50%)",
                  backgroundColor: "rgb(222, 226, 230)",
                },
              }}
            >
              <Chip
                label="20 April"
                variant="outlined"
                sx={{ zIndex: 1, position: "relative", background: "white", borderColor: "divider" }}
              />
            </Box>
            <Stack direction="row" p={2} minWidth="0" justifyContent="flex-end">
              <Stack direction="column" minWidth="0" gap={0.5} justifyContent="flex-end">
                <Typography variant="body3" color="text.secondary" textAlign="end">
                  2:00 AM
                </Typography>
                <Paper
                  elevation={0}
                  sx={{
                    bgcolor: "rgb(222, 226, 230);",
                    fontWeight: 400,
                    px: 2,
                    py: 1,
                  }}
                >
                  <Typography variant="body3">
                    Ipsum quis pariatur cupidatat reprehenderit duis qui excepteur sunt.
                  </Typography>
                </Paper>
              </Stack>
            </Stack>
          </Scrollbars>
        </Stack>
      </Stack>
    </Paper>
  );
};
