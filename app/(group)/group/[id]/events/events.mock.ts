let today = new Date();
let todayStr = today.toISOString().replace(/T.*$/, "");

function getFutureDateStr(daysAhead: number): string {
  return new Date(new Date().setDate(today.getDate() + daysAhead)).toISOString().replace(/T.*$/, ""); // YYYY-MM-DD
}

function getPastDateStr(daysAgo: number): string {
  return new Date(new Date().setDate(today.getDate() - daysAgo)).toISOString().replace(/T.*$/, ""); // YYYY-MM-DD
}

type DateISO = string;

export type GroupEventItem = {
  id: string;
  title: string;
  startAt: string;
  endAt: string;
  city: string;
  street: string;
  members: number;
};

export type GroupEvents = {
  startMonth: DateISO;
  events: GroupEventItem[];
};

export const UPCOMING_EVENTS: GroupEvents[] = [
  {
    startMonth: getFutureDateStr(1) + "T00:00:00",
    events: [
      {
        id: "1",
        city: "Warszawa",
        street: "Komputerowa 10",
        startAt: getFutureDateStr(1) + "T09:00:00",
        endAt: getFutureDateStr(1) + "T12:00:00",
        members: 10,
        title: "Warsztaty malarstwa",
      },
      {
        id: "2",
        city: "Kraków",
        street: "Rynek Główny 5",
        startAt: getFutureDateStr(2) + "T14:00:00",
        endAt: getFutureDateStr(2) + "T15:00:00",
        members: 15,
        title: "Pokaz rzeźbienia w drewnie",
      },
      {
        id: "3",
        city: "Gdańsk",
        street: "Długa 7",
        startAt: getFutureDateStr(3) + "T11:00:00",
        endAt: getFutureDateStr(3) + "T14:00:00",
        members: 20,
        title: "Warsztaty fotografii",
      },
      {
        id: "4",
        city: "Wrocław",
        street: "Nowa 12",
        startAt: getFutureDateStr(4) + "T12:00:00",
        endAt: getFutureDateStr(4) + "T15:00:00",
        members: 8,
        title: "Pokaz mody",
      },
      {
        id: "5",
        city: "Poznań",
        street: "Święty Marcin 23",
        startAt: getFutureDateStr(5) + "T13:00:00",
        endAt: getFutureDateStr(5) + "T16:00:00",
        members: 25,
        title: "Spotkanie autorskie",
      },
      {
        id: "7",
        city: "Katowice",
        street: "Chorzowska 21",
        startAt: getFutureDateStr(6) + "T09:00:00",
        endAt: getFutureDateStr(6) + "T12:00:00",
        members: 18,
        title: "Warsztaty programowania",
      },
      {
        id: "8",
        city: "Szczecin",
        street: "Plac Grunwaldzki 3",
        startAt: getFutureDateStr(7) + "T11:00:00",
        endAt: getFutureDateStr(7) + "T14:00:00",
        members: 12,
        title: "Pokaz filmów krótkometrażowych",
      },
      {
        id: "9",
        city: "Lublin",
        street: "Lubartowska 15",
        startAt: getFutureDateStr(7) + "T16:00:00",
        endAt: getFutureDateStr(7) + "T19:00:00",
        members: 22,
        title: "Warsztaty teatralne",
      },
      {
        id: "10",
        city: "Rzeszów",
        street: "Rynek 10",
        startAt: getFutureDateStr(7) + "T20:30:00",
        endAt: getFutureDateStr(7) + "T22:30:00",
        members: 14,
        title: "Spotkanie literackie",
      },
    ],
  },
  {
    startMonth: getFutureDateStr(30) + "T00:00:00",
    events: [
      {
        id: "1",
        city: "Warszawa",
        street: "Komputerowa 10",
        startAt: getFutureDateStr(30) + "T09:00:00",
        endAt: getFutureDateStr(30) + "T12:00:00",
        members: 10,
        title: "Warsztaty malarstwa",
      },
    ],
  },
  {
    startMonth: getFutureDateStr(66) + "T00:00:00",
    events: [
      {
        id: "1",
        city: "Warszawa",
        street: "Komputerowa 10",
        startAt: getFutureDateStr(66) + "T09:00:00",
        endAt: getFutureDateStr(66) + "T12:00:00",
        members: 10,
        title: "Warsztaty malarstwa",
      },
    ],
  },
];

export const PENDING_EVENTS: GroupEvents[] = [
  {
    startMonth: getFutureDateStr(0) + "T00:00:00",
    events: [
      {
        id: "pending",
        city: "Rzeszów",
        street: "Rynek 10",
        startAt: getFutureDateStr(0) + "T00:00:00",
        endAt: getFutureDateStr(0) + "T24:00:00",
        members: 14,
        title: "Spotkanie literackie",
      },
    ],
  },
];

export const PAST_EVENTS: GroupEvents[] = [
  {
    startMonth: getPastDateStr(1) + "T00:00:00",
    events: [
      {
        id: "9",
        city: "Lublin",
        street: "Lubartowska 15",
        startAt: getPastDateStr(7) + "T16:00:00",
        endAt: getPastDateStr(7) + "T19:00:00",
        members: 22,
        title: "Warsztaty teatralne",
      },
      {
        id: "10",
        city: "Rzeszów",
        street: "Rynek 10",
        startAt: getPastDateStr(7) + "T20:30:00",
        endAt: getPastDateStr(7) + "T22:30:00",
        members: 14,
        title: "Spotkanie literackie",
      },
    ],
  },
  {
    startMonth: getPastDateStr(30) + "T00:00:00",
    events: [
      {
        id: "1",
        city: "Warszawa",
        street: "Komputerowa 10",
        startAt: getPastDateStr(30) + "T09:00:00",
        endAt: getPastDateStr(30) + "T12:00:00",
        members: 10,
        title: "Warsztaty malarstwa",
      },
    ],
  },
  {
    startMonth: getPastDateStr(66) + "T00:00:00",
    events: [
      {
        id: "1",
        city: "Warszawa",
        street: "Komputerowa 10",
        startAt: getPastDateStr(66) + "T09:00:00",
        endAt: getPastDateStr(66) + "T12:00:00",
        members: 10,
        title: "Warsztaty malarstwa",
      },
    ],
  },
];

export const CANCELED_EVENTS: GroupEvents[] = [
  {
    startMonth: getPastDateStr(1) + "T00:00:00",
    events: [
      {
        id: "9",
        city: "Lublin",
        street: "Lubartowska 15",
        startAt: getPastDateStr(7) + "T16:00:00",
        endAt: getPastDateStr(7) + "T19:00:00",
        members: 22,
        title: "Warsztaty teatralne",
      },
      {
        id: "10",
        city: "Rzeszów",
        street: "Rynek 10",
        startAt: getPastDateStr(7) + "T20:30:00",
        endAt: getPastDateStr(7) + "T22:30:00",
        members: 14,
        title: "Spotkanie literackie",
      },
    ],
  },
  {
    startMonth: getPastDateStr(30) + "T00:00:00",
    events: [
      {
        id: "1",
        city: "Warszawa",
        street: "Komputerowa 10",
        startAt: getPastDateStr(30) + "T09:00:00",
        endAt: getPastDateStr(30) + "T12:00:00",
        members: 10,
        title: "Warsztaty malarstwa",
      },
    ],
  },
  {
    startMonth: getPastDateStr(66) + "T00:00:00",
    events: [
      {
        id: "1",
        city: "Warszawa",
        street: "Komputerowa 10",
        startAt: getPastDateStr(66) + "T09:00:00",
        endAt: getPastDateStr(66) + "T12:00:00",
        members: 10,
        title: "Warsztaty malarstwa",
      },
    ],
  },
];
