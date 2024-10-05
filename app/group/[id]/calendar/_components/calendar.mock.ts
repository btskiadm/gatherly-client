import { EventSourceInput } from "@fullcalendar/core/index.js";
import { blue, green, orange, pink, purple, red, yellow } from "@mui/material/colors";

const colors = {
  blue: blue[500],
  green: green[500],
  orange: orange[500],
  pink: pink[500],
  purple: purple[500],
  red: red[500],
  yellow: yellow[500],
  default: "transparent",
};

type EventColor = keyof typeof colors;

const mapColor = (color: EventColor) => (color in colors ? colors[color] : colors["default"]);

let eventGuid = 0;
let today = new Date();
let todayStr = today.toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

// Funkcja pomocnicza do generowania dat w przeszłości i przyszłości
function getFutureDateStr(daysAhead: number): string {
  return new Date(new Date().setDate(today.getDate() + daysAhead)).toISOString().replace(/T.*$/, ""); // YYYY-MM-DD
}

function getPastDateStr(daysAgo: number): string {
  return new Date(new Date().setDate(today.getDate() - daysAgo)).toISOString().replace(/T.*$/, ""); // YYYY-MM-DD
}

export const INITIAL_EVENTS: EventSourceInput = {
  events: [
    // Wydarzenia z przeszłości (miesiąc wstecz)
    {
      id: createEventId(),
      title: "Warsztaty malarstwa",
      start: getPastDateStr(30) + "T10:00:00",
      end: getPastDateStr(30) + "T14:00:00",
      backgroundColor: orange[600],
    },
    {
      id: createEventId(),
      title: "Spotkanie literackie",
      start: getPastDateStr(28) + "T17:00:00",
      end: getPastDateStr(28) + "T19:00:00",
      backgroundColor: purple[500],
    },
    {
      id: createEventId(),
      title: "Warsztaty jogi",
      start: getPastDateStr(25) + "T08:00:00",
      end: getPastDateStr(25) + "T09:30:00",
      backgroundColor: green[500],
    },
    {
      id: createEventId(),
      title: "Kurs gotowania",
      start: getPastDateStr(22) + "T14:00:00",
      end: getPastDateStr(22) + "T16:00:00",
      backgroundColor: blue[600],
    },
    {
      id: createEventId(),
      title: "Pokaz filmu dokumentalnego",
      start: getPastDateStr(20) + "T18:00:00",
      end: getPastDateStr(20) + "T20:00:00",
      backgroundColor: red[600],
    },
    {
      id: createEventId(),
      title: "Sympozjum naukowe",
      start: getPastDateStr(18) + "T09:00:00",
      end: getPastDateStr(18) + "T17:00:00",
      backgroundColor: purple[700],
    },
    {
      id: createEventId(),
      title: "Spotkanie przy kawie",
      start: getPastDateStr(15) + "T11:00:00",
      end: getPastDateStr(15) + "T12:30:00",
      backgroundColor: orange[400],
    },
    {
      id: createEventId(),
      title: "Wykład o technologii",
      start: getPastDateStr(12) + "T10:00:00",
      end: getPastDateStr(12) + "T12:00:00",
      backgroundColor: blue[500],
    },
    {
      id: createEventId(),
      title: "Turniej szachowy",
      start: getPastDateStr(10) + "T09:00:00",
      end: getPastDateStr(10) + "T15:00:00",
      backgroundColor: green[700],
    },
    {
      id: createEventId(),
      title: "Festiwal muzyczny",
      start: getPastDateStr(7) + "T17:00:00",
      end: getPastDateStr(7) + "T23:00:00",
      backgroundColor: red[500],
    },
    {
      id: createEventId(),
      title: "Warsztaty fotograficzne",
      start: getPastDateStr(5) + "T12:00:00",
      end: getPastDateStr(5) + "T15:00:00",
      backgroundColor: yellow[600],
    },
    {
      id: createEventId(),
      title: "Kurs pierwszej pomocy",
      start: getPastDateStr(3) + "T09:00:00",
      end: getPastDateStr(3) + "T12:00:00",
      backgroundColor: pink[400],
    },
    {
      id: createEventId(),
      title: "Spotkanie z autorem książki",
      start: getPastDateStr(1) + "T17:00:00",
      end: getPastDateStr(1) + "T19:00:00",
      backgroundColor: purple[400],
    },

    // Wydarzenia bieżące (dzisiejsze i nadchodzące)
    {
      id: "test-id",
      title: "Całodniowe wydarzenie",
      start: todayStr,
      backgroundColor: yellow[800],
    },
    {
      id: createEventId(),
      title: "Piłka nożna dla amatorów",
      start: todayStr + "T12:00:00",
      end: todayStr + "T13:00:00",
      backgroundColor: green[600],
    },
    {
      id: createEventId(),
      title: "Szkolenie z react.js i next.js",
      start: todayStr + "T14:00:00",
      end: todayStr + "T16:00:00",
      backgroundColor: green[600],
    },

    // Wydarzenia w przyszłości (miesiąc do przodu)
    {
      id: createEventId(),
      title: "Warsztaty programowania w Pythonie",
      start: getFutureDateStr(2) + "T10:00:00",
      end: getFutureDateStr(2) + "T13:00:00",
      backgroundColor: blue[500],
    },
    {
      id: createEventId(),
      title: "Maraton biegowy",
      start: getFutureDateStr(5) + "T07:00:00",
      end: getFutureDateStr(5) + "T12:00:00",
      backgroundColor: green[700],
    },
    {
      id: createEventId(),
      title: "Kurs rysunku",
      start: getFutureDateStr(8) + "T06:00:00",
      end: getFutureDateStr(8) + "T12:30:00",
      backgroundColor: orange[500],
    },

    {
      id: createEventId(),
      title: "Kurs księgowości",
      start: getFutureDateStr(8) + "T10:00:00",
      end: getFutureDateStr(8) + "T17:30:00",
      backgroundColor: purple[500],
    },

    {
      id: createEventId(),
      title: "Szkolenie c#",
      start: getFutureDateStr(8) + "T16:00:00",
      end: getFutureDateStr(8) + "T18:30:00",
      backgroundColor: green[500],
    },
    {
      id: createEventId(),
      title: "Bieg 1000m",
      start: getFutureDateStr(8) + "T19:00:00",
      end: getFutureDateStr(8) + "T20:00:00",
      backgroundColor: red[500],
    },
    {
      id: createEventId(),
      title: "Kręgle sukcesja",
      start: getFutureDateStr(8) + "T20:30:00",
      end: getFutureDateStr(8) + "T21:30:00",
      backgroundColor: pink[500],
    },
    {
      id: createEventId(),
      title: "Warsztaty kreatywnego pisania",
      start: getFutureDateStr(10) + "T09:00:00",
      end: getFutureDateStr(10) + "T12:00:00",
      backgroundColor: pink[500],
    },
    {
      id: createEventId(),
      title: "Spotkanie z dietetykiem",
      start: getFutureDateStr(12) + "T11:00:00",
      end: getFutureDateStr(12) + "T13:00:00",
      backgroundColor: red[400],
    },
    {
      id: createEventId(),
      title: "Sympozjum o sztucznej inteligencji",
      start: getFutureDateStr(15) + "T10:00:00",
      end: getFutureDateStr(15) + "T16:00:00",
      backgroundColor: purple[600],
    },
    {
      id: createEventId(),
      title: "Kurs tańca",
      start: getFutureDateStr(17) + "T18:00:00",
      end: getFutureDateStr(17) + "T20:00:00",
      backgroundColor: green[500],
    },
    {
      id: createEventId(),
      title: "Warsztaty fotografii portretowej",
      start: getFutureDateStr(20) + "T10:00:00",
      end: getFutureDateStr(20) + "T13:00:00",
      backgroundColor: yellow[600],
    },
    {
      id: createEventId(),
      title: "Pokaz filmów krótkometrażowych",
      start: getFutureDateStr(25) + "T19:00:00",
      end: getFutureDateStr(25) + "T21:00:00",
      backgroundColor: red[700],
    },
    {
      id: createEventId(),
      title: "Turniej gier planszowych",
      start: getFutureDateStr(28) + "T14:00:00",
      end: getFutureDateStr(28) + "T18:00:00",
      backgroundColor: blue[400],
    },
    {
      id: createEventId(),
      title: "Warsztaty origami",
      start: getFutureDateStr(30) + "T10:00:00",
      end: getFutureDateStr(30) + "T12:00:00",
      backgroundColor: pink[600],
    },
  ],
};

export function createEventId() {
  return String(eventGuid++);
}
