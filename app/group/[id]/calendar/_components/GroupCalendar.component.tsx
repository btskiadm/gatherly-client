"use client";

import { TruncatedTypography } from "@/app/common/components/TruncatedTypography";
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
import { useCallback, useRef, useState } from "react";
import { INITIAL_EVENTS } from "./calendar.mock";
import { toast } from "react-hot-toast";
import { grey } from "@mui/material/colors";

export const CalendarWrapper = styled("div")(
  ({ theme }) => `
  min-height: 600px;
  max-height: 1000px;
  height: clamp(600px, 80vh, 1000px);

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

export const GroupCalendar = () => {
  const ref = useRef<FullCalendar>(null);
  const [loaded, setLoaded] = useState(false);

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

  const handleEventClick = useCallback((event: EventClickArg) => {
    console.dir({ event });
    toast(event.event.title);
  }, []);

  return (
    <Stack gap={1}>
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
          initialEvents={INITIAL_EVENTS}
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
  return (
    <TruncatedTypography variant="caption" fontWeight={600}>
      {args.view.type === "dayGridMonth" && args.text}
      {args.view.type === "timeGridWeek" &&
        new Intl.DateTimeFormat("pl-PL", {
          day: "2-digit",
          month: "2-digit",
        }).format(args.date)}

      {args.view.type == "timeGridDay" &&
        new Intl.DateTimeFormat("pl-PL", {
          day: "2-digit",
          month: "2-digit",
          weekday: "long",
        }).format(args.date)}
    </TruncatedTypography>
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
                <Typography variant="body1" display={{ xs: "none", sm: "block" }}>
                  {eventInfo.event.start &&
                    new Intl.DateTimeFormat("pl-PL", {
                      hour: "numeric",
                      minute: "numeric",
                    }).format(new Date(eventInfo.event.start))}
                </Typography>
              )}
              {eventInfo.timeText && (
                <Typography variant="caption" display={{ xs: "block", sm: "none" }}>
                  {eventInfo.event.start &&
                    new Intl.DateTimeFormat("pl-PL", {
                      hour: "numeric",
                      minute: "numeric",
                    }).format(new Date(eventInfo.event.start))}
                </Typography>
              )}
              <TruncatedTypography display={{ xs: "none", sm: "block" }} variant="body1">
                {eventInfo.event.title}
              </TruncatedTypography>
              <TruncatedTypography display={{ xs: "block", sm: "none" }} variant="caption">
                {eventInfo.event.title}
              </TruncatedTypography>
            </Stack>
          </Tooltip>
        </>
      )}
      {eventInfo.view.type === "timeGridWeek" && (
        <Tooltip title={eventInfo.event.title}>
          <TruncatedTypography variant="body2">{eventInfo.event.title}</TruncatedTypography>
        </Tooltip>
      )}
      {eventInfo.view.type === "timeGridDay" && (
        <TruncatedTypography variant="body2">{eventInfo.event.title}</TruncatedTypography>
      )}
    </>
  );
}
