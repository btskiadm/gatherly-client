export interface EventGroupItem {
  id: string;
  title: string;
  startAt: string;
  endAt: string;
  city: string;
  street: string;
  members: number;
}

export interface EventsGroup {
  startMonth: string;
  events: EventGroupItem[];
}

export const EVENTS: EventsGroup[] = [
  {
    startMonth: "2024-09-01T00:00:00.000Z",
    events: [
      {
        id: "1",
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam arcu dui, laoreet ultricies egesta",
        startAt: "2024-09-01T10:00:00.000Z",
        endAt: "2024-09-01T14:00:00.000Z",
        city: "Warszawa",
        street: "Al. Włókniarzy 222",
        members: 5,
      },
      {
        id: "2",
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam arcu dui, laoreet ultricies egesta",
        startAt: "2024-09-04T14:00:00.000Z",
        endAt: "2024-09-04T17:00:00.000Z",
        city: "Warszawa",
        street: "Al. Włókniarzy 222",
        members: 1221,
      },
    ],
  },
  {
    startMonth: "2024-10-01T00:00:00.000Z",
    events: [
      {
        id: "1",
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam arcu dui, laoreet ultricies egesta",
        startAt: "2024-10-09T14:00:00.000Z",
        endAt: "2024-10-09T17:00:00.000Z",
        city: "Warszawa",
        street: "Al. Włókniarzy 222",
        members: 34,
      },
      {
        id: "2",
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam arcu dui, laoreet ultricies egesta",
        startAt: "2024-10-22T14:00:00.000Z",
        endAt: "2024-10-22T17:00:00.000Z",
        city: "Warszawa",
        street: "Al. Włókniarzy 222",
        members: 55,
      },
    ],
  },
];
