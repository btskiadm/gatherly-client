import {
  EventStackDto,
  EventTileDto,
  GroupDetailsDto,
  GroupTileDto,
  SearchCategoryDto,
  SearchCityDto,
  SearchGroupDto,
  SearchUserDto,
  ShortGroupDto,
  UserDto,
} from "./mock-api.types";
import { DBCategory, DBCity, DBGroups, DBUser } from "./mock-db";
import {
  getGroupedEvents,
  stackEventsDto,
  toEventTileDto,
  toGroupDto,
  toGroupTileDto,
  toShortGroup,
} from "./mock-helpers";

export const getSearchCategories = (): SearchCategoryDto[] =>
  DBCategory.map(({ label, value }) => ({
    type: "category",
    label: label,
    value: value,
  }));

export const getSearchCities = (): SearchCityDto[] =>
  DBCity.map(({ label, value }) => ({
    type: "city",
    label: label,
    value: value,
  }));

export const getSearchGroups = (): SearchGroupDto[] =>
  DBGroups.map(({ title, id }) => ({
    type: "title",
    label: title,
    value: id,
  }));

export const getSeachUsers = (): SearchUserDto[] =>
  DBUser.map(({ id, username, thumbnails: { thumb } }) => ({
    type: "username",
    id: id,
    username: username,
    thumbnails: {
      thumb: thumb,
    },
  }));

// const g_city = DBCity[0];
// const g_category = DBCategory[0];
const g_city: any = null;
const g_category: any = null;
const g_sponsored = false;
const g_remote = false;
const g_verified = false;

export const getGroupTiles = (): GroupTileDto[] => {
  const groupsByCity = g_city
    ? DBGroups.filter((group) => group.cities.some((c) => c.value === g_city.value)) ?? []
    : DBGroups;
  const groupsByCategory = g_category
    ? groupsByCity.filter((group) => group.categories.some((c) => c.value === g_category.value)) ?? []
    : groupsByCity;

  if (groupsByCategory.length <= 0) {
    return [];
  }

  const filtered = groupsByCategory.filter((g) => {
    let numToValidate = 0;
    let numToValidateCounter = 0;

    g_sponsored && numToValidate++;
    g_remote && numToValidate++;
    g_verified && numToValidate++;

    g_sponsored && g.sponsored.value && numToValidateCounter++;
    g_remote && g.remote.value && numToValidateCounter++;
    g_verified && g.verified.value && numToValidateCounter++;

    return numToValidateCounter === numToValidate;
  });

  return filtered.map(toGroupTileDto);
};

export const getGroupDetailsApi = (groupId: string): GroupDetailsDto | null => {
  const group = DBGroups.find((g) => g.id === groupId);

  if (!group) {
    return null;
  }

  const { upcoming: _upcoming, cancelled: _cancelled, past: _past, pending: _pending } = getGroupedEvents(group.events);

  const upcoming = stackEventsDto(_upcoming);
  const pending = stackEventsDto(_pending);
  const past = stackEventsDto(_past);
  const cancelled = stackEventsDto(_cancelled);
  const groupDto = toGroupDto(group);

  const numOfEvents = (dtos: EventStackDto[]) => dtos.reduce((prev, current) => prev + current.events.length, 0);

  return {
    ...groupDto,
    cancelled,
    past,
    pending,
    upcoming,
    cancelledLength: numOfEvents(cancelled),
    pastLength: numOfEvents(past),
    upcomingLength: numOfEvents(upcoming),
    pendingLength: numOfEvents(pending),
  };
};

export const getUserApi = (username: string): UserDto | null => {
  return DBUser.find((user) => user.username === username) ?? null;
};

export const getShortGroupsByUsername = (username: string): ShortGroupDto[] => {
  const user = getUserApi(username);

  if (!user) {
    return [];
  }

  const groups = DBGroups.filter((group) => group.users.some((groupUser) => groupUser.user.id === user.id));

  return groups.map(toShortGroup);
};

const e_city = DBCity[0];
const e_category = DBCategory[0];
const e_sponsored = false;
const e_remote = false;
const e_verified = false;

export const getEventTiles = (): EventTileDto[] => {
  const events: EventTileDto[] = [];

  DBGroups.forEach((group) => {
    group.events.forEach((event) => {
      events.push(toEventTileDto(event)(group));
    });
  });

  const eventsByCity = events.filter((event) => event.cities.some((c) => c.value === e_city.value)) ?? [];

  const eventsByCategory =
    eventsByCity.filter((event) => event.categories.some((c) => c.value === e_category.value)) ?? [];

  if (eventsByCategory.length <= 0) {
    return [];
  }

  return eventsByCategory.filter((e) => {
    let numToValidate = 0;
    let numToValidateCounter = 0;

    e_sponsored && numToValidate++;
    e_remote && numToValidate++;
    e_verified && numToValidate++;

    e_sponsored && e.groupMeta.sponsored && numToValidateCounter++;
    e_remote && e.groupMeta.remote && numToValidateCounter++;
    e_verified && e.groupMeta.verified && numToValidateCounter++;

    return numToValidateCounter === numToValidate;
  });
};
