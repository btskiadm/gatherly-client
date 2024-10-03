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
  {
    startMonth: "2024-11-01T00:00:00.000Z",
    events: [
      {
        id: "1",
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam arcu dui, laoreet ultricies egesta",
        startAt: "2024-11-09T14:00:00.000Z",
        endAt: "2024-11-09T17:00:00.000Z",
        city: "Warszawa",
        street: "Al. Włókniarzy 222",
        members: 34,
      },
      {
        id: "2",
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam arcu dui, laoreet ultricies egesta",
        startAt: "2024-11-24T14:00:00.000Z",
        endAt: "2024-11-24T17:00:00.000Z",
        city: "Warszawa",
        street: "Al. Włókniarzy 222",
        members: 55,
      },
    ],
  },
];

export interface User {
  name: string;
  id: string;
}

export const users: User[] = [
  { id: "f47ac10b-58cc-4372-a567-0e02b2c3d479", name: "seoquesto" },
  { id: "f27c9d4b-8c91-489f-a72a-ec1923f3f0b5", name: "techwizard" },
  { id: "b4f4bc78-e1c5-44b3-b4af-021aa9ed64b5", name: "marketingguru" },
  { id: "c2b66e0e-663b-4e8d-a6e4-1845c4fbdf0f", name: "designmaster" },
  { id: "a57b5fd3-3b27-4f11-bf3d-839e4b79231b", name: "codemaverick" },
  { id: "7ad9b292-1d2e-4fc2-8175-0c31d965d3c2", name: "analyticspro" },
  { id: "d91ff2cd-f89b-44b6-b33d-5741c4f12514", name: "webcreator" },
  { id: "42f6d06f-6b34-4b99-b676-215c97f681b8", name: "growthhacker" },
  { id: "ff48e1df-4bde-4563-b5b4-65fd0d8c909b", name: "adexperto" },
  { id: "2a5c8f18-3ff4-4b0b-93b6-48b0ef17e7c1", name: "conversionking" },
  { id: "e5b8db69-9c48-4b21-9182-61a282f72e3e", name: "contentninja" },
  { id: "cd88d305-daff-4a72-a7f2-7585279beed8", name: "trafficgenius" },
  { id: "85e073df-5de7-409f-a1b3-0b6ad4b98790", name: "brandbuilder" },
  { id: "94d93bfb-b671-4a55-81c4-5d89d5fd632f", name: "leadstrategist" },
  { id: "a9b5f4da-97e1-4d85-b32e-0ec2aaf5b86e", name: "devopschamp" },
  { id: "e3cb6e7d-10b1-4c5b-92ea-e18421c9c93b", name: "frontenddev" },
  { id: "cb764b8b-dedf-4ef7-a614-1336a6019820", name: "backendwizard" },
  { id: "23a6e9c9-5f56-45bb-b1eb-8b7e742a9de2", name: "uxvisionary" },
  { id: "1d931f19-5edb-46fb-899f-9799a71658e7", name: "datawhisperer" },
  { id: "f1b9ef1d-1c4e-4ae3-93e0-769d6a9f84f4", name: "socialsavant" },
];
