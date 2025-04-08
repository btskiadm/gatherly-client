"use client";

import { ClampTypography } from "@/app/common/components/clamp-typography";
import { TruncatedTypography } from "@/app/common/components/truncated-typography";
import { GroupDetails } from "@/app/model/model";
import {
  AllDayContentArg,
  DayCellContentArg,
  DayHeaderContentArg,
  EventClickArg,
  EventContentArg,
  MoreLinkArg,
} from "@fullcalendar/core/index.js";
import daygrid from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import timegrid from "@fullcalendar/timegrid";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Button, ButtonGroup, Skeleton, Stack, Tooltip, Typography, alpha, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";

export const CalendarWrapper = styled("div")(
  ({ theme }) => `
  flex: 1;

  .fc-header-toolbar {
    display: none !important;
  }
  .fc-popover {
    height: 0;
    width: 0;
    overflow: hidden;
  }
  .fc-day-today {
    background: none !important;
  }
  .fc-event {
    color: ${theme.palette.primary.contrastText} !important;
    border: 0 !important;
    cursor: pointer;
    transition: all 0.2s;
  }
  .fc-event:hover {
    filter: brightness(120%);
  }
  .fc-daygrid-dot-event {
    color: ${theme.palette.primary.contrastText} !important;
    background: ${theme.palette.info.main};
  }
  .fc-daygrid-dot-event:hover {
    background: ${theme.palette.info.dark} !important;
  }
  .fc-day-past {
    background: ${alpha(theme.palette.action.disabledBackground, 0.05)} !important;
  }
  .fc-day-past .fc-event  {
    background: ${grey[400]} !important;
  }
  .fc-day-past .fc-event:hover  {
    background: ${grey[600]} !important;
  }
  .moreLinkClassNames, .fc-h-event {
    color: ${theme.palette.primary.contrastText} !important;
    background: ${theme.palette.info.main} !important;
  }
  .moreLinkClassNames:hover,.fc-h-event:hover {
    background: ${theme.palette.info.dark} !important;
  }
`
);

interface Props {
  groupDetails: GroupDetails;
}

export const GroupCalendar = ({ groupDetails }: Props) => {
  const ref = useRef<FullCalendar>(null);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  const handleLoaded = useCallback(() => {
    setLoaded(true);
  }, []);

  const handleMoreLinkClick = useCallback((args: MoreLinkArg) => {
    const calendarApi = ref?.current?.getApi();

    if (!calendarApi) {
      return;
    }

    calendarApi.changeView("timeGridDay", args.date);
  }, []);

  const handlePrev = useCallback(() => {
    const calendarApi = ref?.current?.getApi();
    if (!calendarApi) {
      return;
    }

    calendarApi.prev();
  }, []);

  const handleNext = useCallback(() => {
    const calendarApi = ref?.current?.getApi();
    if (!calendarApi) {
      return;
    }

    calendarApi.next();
  }, []);

  const handleToday = useCallback(() => {
    const calendarApi = ref?.current?.getApi();
    if (!calendarApi) {
      return;
    }

    calendarApi.today();
  }, []);

  const handleDayGridMonth = useCallback(() => {
    const calendarApi = ref?.current?.getApi();

    if (!calendarApi) {
      return;
    }

    calendarApi.changeView("dayGridMonth");
  }, []);

  const handleTimeGridWeek = useCallback(() => {
    const calendarApi = ref?.current?.getApi();
    if (!calendarApi) {
      return;
    }

    calendarApi.changeView("timeGridWeek");
  }, []);

  const handleTimeGridDay = useCallback(() => {
    const calendarApi = ref?.current?.getApi();

    if (!calendarApi) {
      return;
    }

    calendarApi.changeView("timeGridDay");
  }, []);

  const handleEventClick = useCallback(
    (event: EventClickArg) => {
      router.push(event.event._def.publicId);
    },
    [router]
  );

  const events = useMemo(
    () =>
      groupDetails.events.map((e) => ({
        id: e.id,
        title: e.title,
        start: e.startAt,
        end: e.endAt,
      })),
    [groupDetails]
  );

  return (
    <Stack gap={1} flex={1}>
      <Stack direction="row" justifyContent="space-between" gap={1}>
        <ButtonGroup size="small">
          <Button onClick={handleDayGridMonth}>Month</Button>
          <Button onClick={handleTimeGridWeek}>Week</Button>
          <Button onClick={handleTimeGridDay}>Day</Button>
        </ButtonGroup>
        <ButtonGroup size="small">
          <Button onClick={handlePrev}>
            <KeyboardArrowLeft />
          </Button>
          <Button onClick={handleNext}>
            <KeyboardArrowRight />
          </Button>
          <Button onClick={handleToday}>Today</Button>
        </ButtonGroup>
      </Stack>
      <CalendarWrapper>
        {!loaded && <Skeleton height="100%" width="100%" variant="rounded" />}
        <FullCalendar
          ref={ref}
          height="100%"
          eventDidMount={handleLoaded}
          plugins={[daygrid, timegrid]}
          headerToolbar={{
            left: undefined,
            right: undefined,
          }}
          initialView="dayGridMonth"
          dayMaxEvents={true}
          initialEvents={events}
          dayHeaderContent={renderDayHeaderContent}
          allDayContent={renderAllDayContent}
          slotLabelContent={renderSlotLabelContent}
          moreLinkClick={handleMoreLinkClick}
          dayCellContent={renderDayCellContent}
          moreLinkContent={renderMoreLinkContent}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          moreLinkText="more"
          moreLinkClassNames="moreLinkClassNames"
          eventInteractive={false} // disable active state from event
        />
      </CalendarWrapper>
    </Stack>
  );
};

function renderDayHeaderContent(args: DayHeaderContentArg) {
  if (args.view.type == "timeGridDay") {
    return (
      <TruncatedTypography variant="body3" fontWeight={600} color="text.secondary">
        {new Intl.DateTimeFormat("pl-PL", {
          day: "2-digit",
          month: "2-digit",
          weekday: "long",
        }).format(args.date)}
      </TruncatedTypography>
    );
  }

  return (
    <Stack direction="column" justifyContent="center">
      <TruncatedTypography variant="body3" fontWeight={600} color="text.secondary">
        {new Intl.DateTimeFormat("pl-PL", {
          day: "2-digit",
          month: "2-digit",
        }).format(args.date)}
      </TruncatedTypography>
      <TruncatedTypography variant="body3" fontWeight={600} color="text.secondary">
        {new Intl.DateTimeFormat("pl-PL", {
          weekday: "short",
        }).format(args.date)}
      </TruncatedTypography>
    </Stack>
  );
}

function renderAllDayContent(args: AllDayContentArg) {
  return (
    <TruncatedTypography variant="caption" fontWeight={400}>
      {args.text}
    </TruncatedTypography>
  );
}

function renderSlotLabelContent(args: AllDayContentArg) {
  return (
    <TruncatedTypography variant="caption" fontWeight={400}>
      {args.text}
    </TruncatedTypography>
  );
}

function renderDayCellContent(args: DayCellContentArg) {
  return (
    <>
      {args.isTday && (
        <TruncatedTypography variant="body1" fontWeight={600}>
          {args.dayNumberText}
        </TruncatedTypography>
      )}
      {!args.isToday && <TruncatedTypography variant="body1">{args.dayNumberText}</TruncatedTypography>}
    </>
  );
}

function renderMoreLinkContent(args: DayHeaderContentArg) {
  return <Typography variant="body2">{args.text}</Typography>;
}

function renderEventContent(eventInfo: EventContentArg) {
  return (
    <>
      {eventInfo.view.type === "dayGridMonth" && (
        <>
          <Tooltip title={eventInfo.event.title}>
            <Stack direction={{ sm: "column" }} gap={0} minWidth={0}>
              {eventInfo.timeText && (
                <Typography variant="body2">
                  {eventInfo.event.start &&
                    new Intl.DateTimeFormat("pl-PL", {
                      hour: "numeric",
                      minute: "numeric",
                    }).format(new Date(eventInfo.event.start))}
                </Typography>
              )}
              <TruncatedTypography variant="body3">{eventInfo.event.title}</TruncatedTypography>
            </Stack>
          </Tooltip>
        </>
      )}
      {eventInfo.view.type === "timeGridWeek" && (
        <Tooltip title={eventInfo.event.title}>
          <ClampTypography clamp={4} variant="body3">
            {eventInfo.event.title}
          </ClampTypography>
        </Tooltip>
      )}
      {eventInfo.view.type === "timeGridDay" && (
        <ClampTypography clamp={4} variant="body2">
          {eventInfo.event.title}
        </ClampTypography>
      )}
    </>
  );
}
