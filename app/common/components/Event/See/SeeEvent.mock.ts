export type EventMemberType = "host" | "moderator" | "member";

export type EventMember = {
  id: string;
  username: string;
  role: EventMemberType;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  startAt: string;
  endAt: string;
  city: string;
  street: string;
  locationId: string;
  members: EventMember[];
};

export const eventMock: Event = {
  id: "eventMockId1",
  title: "Non amet ullamco occaecat amet.",
  description:
    "Laborum irure non occaecat anim occaecat minim in consequat. Excepteur ut labore est mollit aliquip incididunt mollit in magna officia in exercitation excepteur tempor. Aliqua do sint qui excepteur in cupidatat qui et fugiat minim ad amet. Ad anim laborum et id do occaecat pariatur eiusmod fugiat irure aute excepteur elit. Consequat labore commodo tempor consequat dolor elit consequat qui dolore ex sit mollit. Sunt nostrud consectetur pariatur dolor laborum aliquip.",
  city: "Warszawa",
  street: "Aleja Jana Pawła 2",
  startAt: "2020-10-10 20:30",
  endAt: "2020-10-10 21:30",
  locationId: "mapMockId",
  members: [
    {
      id: "userMockId1",
      role: "host",
      username: "user123",
    },
    {
      id: "userMockId2",
      role: "moderator",
      username: "techwizard",
    },
    {
      id: "userMockId3",
      role: "member",
      username: "codemaverick",
    },
    {
      id: "userMockId4",
      role: "member",
      username: "conversionking",
    },
    {
      id: "userMockId5",
      role: "member",
      username: "uxvisionary",
    },
  ],
};
