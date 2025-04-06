import { GroupedEvents } from "@/app/model/model";
import {
  ArrowRightAltOutlined,
  CalendarMonthOutlined,
  CategoryOutlined,
  ComputerOutlined,
  ExpandMoreOutlined,
  PeopleOutlined,
  PlaceOutlined,
  SentimentVeryDissatisfied,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { GroupEventTile } from "./GroupEventTile";
import { ClampTypography } from "@/app/common/components/clamp-typography";
import { LocalTime } from "@/app/common/components/LocalTime/LocalTime";

interface Props {
  events: GroupedEvents[];
}

const formatMonth = (iso: string) =>
  new Intl.DateTimeFormat("pl-PL", {
    month: "long",
  }).format(new Date(iso));

export const GroupEventsList = ({ events }: Props) => {
  if (!events.length) {
    return (
      <Stack p={2} direction="column" gap={1} justifyContent="center" alignItems="center">
        <SentimentVeryDissatisfied
          sx={{
            fontSize: "4rem",
          }}
        />
        <Typography variant="h5">NO EVENTS</Typography>
      </Stack>
    );
  }

  return (
    <Stack gap={2}>
      {events.map((eventStack) => (
        <Stack key={eventStack.monthReference} gap={1}>
          <Typography textTransform="capitalize" variant="body1" fontWeight="500" color="text.secondary">
            {formatMonth(eventStack.monthReference)}
          </Typography>
          <List disablePadding sx={{ gap: 3 }}>
            {eventStack.events.map(
              ({
                canceled,
                categories,
                cities,
                createdAt,
                description,
                endAt,
                id,
                startAt,
                title,
                usersCount,
                eventType,
                largePhoto,
                mediumPhoto,
                smallPhoto,
                updatedAt,
              }) => (
                <ListItem disableGutters key={id}>
                  <Paper
                    sx={{
                      direction: "row",
                      display: "flex",
                      width: "100%",
                      gap: 3,
                      px: "24px",
                      py: "16px",
                      alignItems: "flex-start",
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        src={smallPhoto}
                        sx={{
                          width: "128px",
                          height: "128px",
                        }}
                      />
                    </ListItemAvatar>
                    <Stack pt={0.5} direction="row" justifyContent="space-between" width="100%">
                      <Stack gap={1} direction="column" justifyContent="flex-start" alignItems="flex-start">
                        {categories.length > 0 && (
                          <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            startIcon={<CategoryOutlined />}
                            endIcon={categories.length > 1 && <ExpandMoreOutlined />}
                            onClick={() => alert("Not implemented.")}
                            sx={{
                              fontWeight: "400",
                              borderRadius: 0.5,
                              py: "2px",
                              px: 1,
                              fontSize: "0.75rem",
                            }}
                          >
                            {categories.length > 1
                              ? `${categories[0].label}, +${categories.length - 1} inne`
                              : categories[0].label}
                          </Button>
                        )}
                        <ClampTypography variant="h4" clamp={1}>
                          {title}
                        </ClampTypography>
                        <Stack direction="row" gap={0.5} alignItems="center">
                          {cities.length > 0 && (
                            <Button
                              variant="text"
                              onClick={() => alert("Not implemented.")}
                              endIcon={cities.length > 1 ? <ExpandMoreOutlined /> : undefined}
                              startIcon={<PlaceOutlined />}
                              sx={{
                                color: "text.secondary",
                                fontWeight: "400",
                              }}
                            >
                              {cities.length > 1 ? `${cities[0].label}, +${cities.length - 1} inne` : cities[0].label}
                            </Button>
                          )}
                          {cities.length === 0 && (
                            <Stack
                              direction="row"
                              gap={1}
                              mr={1}
                              alignItems="center"
                              sx={{
                                color: "text.secondary",
                                fontWeight: "400",
                              }}
                            >
                              <ComputerOutlined fontSize="small" />
                              <Typography variant="body2">Online</Typography>
                            </Stack>
                          )}
                          <Divider
                            orientation="vertical"
                            sx={{
                              height: "45%",
                            }}
                          />
                          <Stack
                            direction="row"
                            gap={1}
                            ml={1}
                            alignItems="center"
                            sx={{
                              color: "text.secondary",
                              fontWeight: "400",
                            }}
                          >
                            <PeopleOutlined fontSize="small" />
                            <Typography variant="body2"> {usersCount} members</Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>
                    <Stack gap={2} pt={1} alignItems="flex-end">
                      <Stack direction="row" gap={2} alignItems="center">
                        <CalendarMonthOutlined color="secondary" />
                        <Typography variant="h4" color="secondary" noWrap fontWeight="500">
                          <LocalTime date={startAt} formatter={(d) => d.toLocaleString()} />
                        </Typography>
                      </Stack>
                      <Button
                        size="large"
                        color="secondary"
                        endIcon={<ArrowRightAltOutlined fontSize="large" />}
                        sx={{
                          textWrap: "nowrap",
                          width: "min-content",
                        }}
                      >
                        Zobacz wydarzenie
                      </Button>
                    </Stack>
                  </Paper>
                </ListItem>
              )
            )}
          </List>
        </Stack>
      ))}
    </Stack>
  );
};
