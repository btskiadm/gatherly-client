import { StaticImageData } from "next/image";
import { DBCategory, DBCity, DBGroups, DBUser } from "./mock-db";

export type DateISO = string;

export interface SponsoredAttribute {
  id: string;
  value: boolean;
}

export interface VerifiedAttribute {
  id: string;
  value: boolean;
}

export interface RemoteAttribute {
  id: string;
  value: boolean;
}

export interface Thumbnails {
  id: string;
  thumb: string;
}

export interface Group {
  id: string;
  title: string;
  description: string;
  createdAt: DateISO;
  sponsored: SponsoredAttribute;
  verified: VerifiedAttribute;
  remote: RemoteAttribute;
  cities: City[];
  categories: Category[];
  events: Event[];
  users: GroupUser[];
  comments: Comment[];
  thumbnails: Thumbnails;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  createdAt: DateISO;
  rate: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  createdAt: DateISO;
  canceled: boolean;
  sponsored: SponsoredAttribute;
  verified: VerifiedAttribute;
  remote: RemoteAttribute;
  users: EventUser[];
  date: EventDate;
  cities: City[];
  categories: Category[];
}

export interface EventDate {
  id: string;
  startAt: DateISO;
  endAt: DateISO;
}

export interface GroupUser {
  isHost: boolean;
  isModerator: boolean;
  user: User;
}

export interface EventUser {
  isHost: boolean;
  isModerator: boolean;
  user: User;
}

export interface UserDetails {
  description: string;
  city: City;
}

export interface User {
  id: string;
  username: string;
  thumbnails: Thumbnails;
  staticImageData: StaticImageData;
  verifiedAt?: DateISO;
  userDetails: UserDetails;
}

export interface UserShortDetails extends User {
  allEvents: number;
  finishedEvents: number;
}

export interface Category {
  value: string; // id
  label: string;
}

export interface City {
  value: string; // id
  label: string;
}

// dto's
export interface EventStack {
  monthReference: DateISO;
  events: Event[];
}

export interface Attributes {
  sponsored: boolean;
  verified: boolean;
  remote: boolean;
}

export interface StackedGroupAttributes extends Attributes {
  city: City;
  category: Category;
}

export type GroupTile = Pick<
  Group,
  "id" | "title" | "description" | "thumbnails" | "createdAt" | "cities" | "categories"
> & {
  eventsLength: number;
  userLength: number;
} & Attributes;

export interface StackedGroups {
  attributes: StackedGroupAttributes;
  tiles: GroupTile[];
}

const city: City = DBCity[0];
const category: Category = DBCategory[0];
const sponsored = false;
const remote = false;
const verified = false;

export const getStackedGroups = (): StackedGroups[] => {
  const groupsByCity = DBGroups.filter((group) => group.cities.some((c) => c.value === city.value)) ?? [];
  const groupsByCategory =
    groupsByCity.filter((group) => group.categories.some((c) => c.value === category.value)) ?? [];

  if (groupsByCategory.length <= 0) {
    return [];
  }

  const filtered = groupsByCategory.filter((g) => {
    let numToValidate = 0;
    let numToValidateCounter = 0;

    sponsored && numToValidate++;
    remote && numToValidate++;
    verified && numToValidate++;

    sponsored && g.sponsored.value && numToValidateCounter++;
    remote && g.remote.value && numToValidateCounter++;
    verified && g.verified.value && numToValidateCounter++;

    return numToValidateCounter === numToValidate;
  });

  return [
    {
      attributes: {
        category: category,
        city: city,
        remote: remote,
        sponsored: sponsored,
        verified: verified,
      },
      tiles: filtered.map<GroupTile>((group) => {
        return {
          id: group.id,
          title: group.title,
          createdAt: group.createdAt,
          description: group.description,
          eventsLength: group.events.length,
          userLength: group.users.length,
          remote: group.remote.value,
          sponsored: group.sponsored.value,
          thumbnails: group.thumbnails,
          verified: group.verified.value,
          categories: group.categories,
          cities: group.cities,
        };
      }),
    },
  ];
};

export type GroupDetails = Group & {
  upcoming: EventStack[];
  pending: EventStack[];
  past: EventStack[];
  cancelled: EventStack[];
};

const groupEventsByMonth = (upcoming: Event[]): EventStack[] => {
  const sortedEvents = upcoming.sort(
    (prev, next) => new Date(prev.createdAt).getTime() - new Date(next.createdAt).getTime()
  );

  const eventMap = new Map<string, Event[]>();

  sortedEvents.forEach((event) => {
    const eventDate = new Date(event.createdAt);
    const monthYearKey = `${eventDate.getFullYear()}-${eventDate.getMonth()}`;

    if (!eventMap.has(monthYearKey)) {
      eventMap.set(monthYearKey, []);
    }

    eventMap.get(monthYearKey)?.push(event);
  });

  const eventStacks: EventStack[] = Array.from(eventMap.entries()).map(([key, events]) => {
    const [year, month] = key.split("-").map(Number);
    const monthReference = new Date(year, month, 1).toISOString(); // Create refMonth as the first day of that month

    return { monthReference, events };
  });

  return eventStacks;
};

export const getGroupDetails = (groupId: string): GroupDetails | null => {
  const group = DBGroups.find((g) => g.id === groupId);
  const now = new Date();

  if (!group) {
    return null;
  }

  const upcomingEvents: Event[] = [];
  const pendingEvents: Event[] = [];
  const recurringEvents: Event[] = [];
  const pastEvents: Event[] = [];
  const cancelledEvents: Event[] = [];

  group.events.forEach((event) => {
    if (event.canceled) {
      cancelledEvents.push(event);
      return;
    }

    const startAt = new Date(event.date.startAt);
    const endAt = new Date(event.date.endAt);

    if (now < startAt) {
      upcomingEvents.push(event);
      return;
    }

    if (now >= startAt && endAt >= now) {
      pendingEvents.push(event);
      return;
    }

    if (now >= endAt) {
      pastEvents.push(event);
    }
  });

  const upcoming = groupEventsByMonth(upcomingEvents);
  const pending = groupEventsByMonth(pendingEvents);
  const past = groupEventsByMonth(pastEvents);
  const cancelled = groupEventsByMonth(cancelledEvents);

  return {
    ...group,
    cancelled,
    past,
    pending,
    upcoming,
  };
};

export const getAllGroupTitles = () =>
  DBGroups.map(({ title, id }) => ({
    category: "name" as const,
    label: title,
    value: id,
  }));

export const getAllCities = () =>
  DBCity.map(({ label, value }) => ({
    category: "city" as const,
    label: label,
    value: value,
  }));

export const getAllUsers = () => DBUser;
