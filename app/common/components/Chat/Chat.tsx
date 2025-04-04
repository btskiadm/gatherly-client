"use client";

import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Chip,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  OutlinedInput,
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
import { MoreHorizOutlined, SendOutlined } from "@mui/icons-material";

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

  const ChatItem = ({ index }: any) => (
    <Stack gap={2} direction="row" minWidth="0">
      <ListItemAvatar
        sx={{
          minWidth: "0",
        }}
      >
        <Badge
          slotProps={{
            badge: {
              style: {
                borderColor: "white",
                borderWidth: "2px",
                borderStyle: "solid",
                borderRadius: "50%",
                backgroundColor: "rgb(114, 214, 58)",
                right: "4px",
                top: "4px",
                width: "10px",
                height: "10px",
              },
            },
          }}
          color="success"
          variant="dot"
          anchorOrigin={{
            horizontal: "right",
            vertical: "top",
          }}
        >
          <Avatar sx={{ width: "36px", height: "36px" }} alt="test" src={`https://picsum.photos/id/${index}/200/300`} />
        </Badge>
      </ListItemAvatar>
      <Stack direction="column" minWidth="0">
        <TruncatedTypography variant="h5" fontSize="0.75rem">
          Adam Adam
        </TruncatedTypography>
        <TruncatedTypography variant="body3" color="text.secondary">
          Ipsum quis pariatur cupidatat reprehenderit duis qui excepteur sunt. Minim nulla do eu adipisicing consequat
          aliquip nostrud amet labore velit id excepteur. Est aliqua cupidatat est culpa Lorem. Occaecat esse nostrud
          elit eu elit commodo.
        </TruncatedTypography>
      </Stack>
    </Stack>
  );

  const MultiChatItem = ({ index }: any) => (
    <Stack gap={2} direction="row" minWidth="0">
      <ListItemAvatar
        sx={{
          minWidth: "0",
        }}
      >
        <AvatarGroup
          max={1}
          spacing="small"
          sx={{
            width: "36px",
            position: "relative",
          }}
        >
          <Avatar
            sx={{
              width: "28px",
              height: "28px",
              marginLeft: "-16px",
              position: "relative",
              left: "5px",
              bottom: "-5px",
            }}
            alt="test"
            src={`https://picsum.photos/id/${index}/200/300`}
          />
          <Avatar
            sx={{
              width: "28px",
              height: "28px",
              position: "relative",
              right: "-5px",
              top: "-5px",
            }}
            alt="test"
            src={`https://picsum.photos/id/${index + 1}/200/300`}
          />
        </AvatarGroup>
      </ListItemAvatar>
      <Stack direction="column" minWidth="0">
        <Typography variant="h5" fontSize="0.75rem">
          seoquesto, <small>+10 more</small>
        </Typography>
        <TruncatedTypography variant="body3" color="text.secondary">
          Ipsum quis pariatur cupidatat reprehenderit duis qui excepteur sunt. Minim nulla do eu adipisicing consequat
          aliquip nostrud amet labore velit id excepteur. Est aliqua cupidatat est culpa Lorem. Occaecat esse nostrud
          elit eu elit commodo.
        </TruncatedTypography>
      </Stack>
    </Stack>
  );

  const MessagesHead = () => (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      minWidth="0"
      sx={{
        borderBottom: "1px solid transparent",
        borderBottomColor: "divider",
      }}
    >
      <Stack direction="row" minWidth="0" gap={2} alignItems="center">
        <Avatar sx={{ width: "36px", height: "36px" }} alt="test" src={`https://picsum.photos/id/${66 + 1}/200/300`} />
        <Typography variant="h4" fontSize="1rem">
          Adam Adam
        </Typography>
      </Stack>
      <IconButton
        size="small"
        sx={{
          height: "min-content",
        }}
        onClick={() => alert("not impl.")}
      >
        <MoreHorizOutlined fontSize="small" />
      </IconButton>
    </Stack>
  );

  const FeedHeader = () => (
    <Stack direction="row" gap={2} p={2} alignItems="center">
      <Badge
        slotProps={{
          badge: {
            style: {
              borderColor: "white",
              borderWidth: "2px",
              borderStyle: "solid",
              borderRadius: "50%",
              backgroundColor: "rgb(114, 214, 58)",
              right: "6px",
              top: "6px",
              width: "12px",
              height: "12px",
            },
          },
        }}
        color="success"
        variant="dot"
        anchorOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
      >
        <Avatar sx={{ width: "40px", height: "40px" }} alt="test" src={`https://picsum.photos/id/${66 + 7}/200/300`} />
      </Badge>
      <TruncatedTypography variant="h5" fontSize="0.875rem">
        Adam Adam
      </TruncatedTypography>
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
          <FeedHeader />
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
                <ListItemButton>
                  <ChatItem index={111} />
                </ListItemButton>
                <ListItemButton>
                  <MultiChatItem index={1} />
                </ListItemButton>
                <ListItemButton>
                  <ChatItem index={121} />
                </ListItemButton>
                <ListItemButton>
                  <MultiChatItem index={1} />
                </ListItemButton>
                <ListItemButton>
                  <ChatItem index={41} />
                </ListItemButton>
                <ListItemButton>
                  <MultiChatItem index={1} />
                </ListItemButton>
                <ListItemButton>
                  <ChatItem index={411} />
                </ListItemButton>
                <ListItemButton>
                  <MultiChatItem index={15} />
                </ListItemButton>
              </StyledList>
            </CustomTabPanel>
            <CustomTabPanel value={value} index="groups"></CustomTabPanel>
          </Scrollbars>
        </Stack>
        <Stack direction="column" minWidth="0" width="100%">
          <MessagesHead />
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
              <Avatar sx={{ width: "36px", height: "36px" }} alt="test" src="#" />
              <Stack direction="column" minWidth="0" gap={0.5}>
                <Typography variant="body4" color="text.secondary">
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
                size="small"
                label="20 April"
                variant="outlined"
                sx={{ zIndex: 1, position: "relative", background: "white", borderColor: "divider" }}
              />
            </Box>
            <Stack direction="row" p={2} minWidth="0" justifyContent="flex-end">
              <Stack direction="column" minWidth="0" gap={0.5} justifyContent="flex-end">
                <Typography variant="body4" color="text.secondary" textAlign="end">
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
          <Stack
            direction="row"
            gap={0.5}
            p={1}
            alignItems="center"
            bgcolor="background.default"
            sx={{
              borderTop: "1px solid transparent",
              borderTopColor: "divider",
            }}
          >
            <OutlinedInput
              fullWidth
              size="small"
              placeholder="Type a messsage.."
              sx={{
                bgcolor: "background.paper",
                fontSize: "0.875rem",
              }}
            />
            <IconButton size="small" color="primary">
              <SendOutlined fontSize="medium" />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};
