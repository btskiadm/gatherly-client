import {
  EventStackDto,
  EventTileDto,
  GroupDetailsDto,
  GroupTileDto,
  SearchCategoryDto,
  SearchCityDto,
  SearchTitleDto,
  SearchUserDto,
  ShortEventDto,
  ShortGroupDto,
  UserDto,
} from "./mock-api.types";
import { DBCategory, DBCity, DBGroups, DBUser } from "./mock-db";
import { Event } from "./mock-db.types";
import {
  getGroupedEvents,
  stackEventsDto,
  toEventTileDto,
  toGroupDto,
  toGroupTileDto,
  toShortEvent,
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

export const getSearchGroupTitles = (): SearchTitleDto[] =>
  DBGroups.map(({ title, id }) => ({
    type: "title",
    label: title,
    value: title,
  }));

export const getSearchEventTitles = (): SearchTitleDto[] =>
  DBGroups.map(({ events }) => events)
    .flat()
    .map(({ title }) => ({ label: title, value: title, type: "title" }));

export const getSeachUsers = (): SearchUserDto[] =>
  DBUser.map(({ id, username, thumbnails: { thumb } }) => ({
    type: "username",
    id: id,
    username: username,
    thumbnails: {
      thumb: thumb,
    },
  }));

export const getGroupTiles = ({
  cities,
  categories,
  titles,
  sponsored,
  remote,
  verified,
  minMembers,
  maxMembers,
}: {
  cities: string[];
  categories: string[];
  titles: string[];
  sponsored: boolean;
  verified: boolean;
  remote: boolean;
  minMembers: number;
  maxMembers: number;
}): GroupTileDto[] => {
  const filteredGroups = DBGroups.filter((group) => {
    const matchesCities =
      cities.length === 0 || cities.every((city) => group.cities.some((groupCity) => groupCity.value === city));

    const matchesCategories =
      categories.length === 0 ||
      categories.every((category) => group.categories.some((groupCategory) => groupCategory.value === category));

    const matchesTitles = titles.length === 0 || titles.some((title) => title === group.title);

    const matchesMinMembers = minMembers <= group.users.length;

    const hasNoMaxMembersLimit = maxMembers === 50;

    const matchesMaxMembers = hasNoMaxMembersLimit || maxMembers >= group.users.length;

    return matchesCities && matchesCategories && matchesTitles && matchesMinMembers && matchesMaxMembers;
  });

  if (filteredGroups.length <= 0) {
    return [];
  }

  const filtered = filteredGroups.filter((g) => {
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

  const roundToQuarter = (value: number): number => Math.round(value * 4) / 4;

  const cancelledLength = numOfEvents(cancelled);
  const pastLength = numOfEvents(past);
  const upcomingLength = numOfEvents(upcoming);
  const pendingLength = numOfEvents(pending);
  const eventsLength = cancelledLength + pastLength + upcomingLength + pendingLength;
  const rate = roundToQuarter(
    group.comments.reduce((prev, current) => prev + current.rate, 0) / (group.comments.length ?? 1)
  );

  return {
    ...groupDto,
    cancelled,
    past,
    pending,
    upcoming,
    cancelledLength,
    pastLength,
    upcomingLength,
    pendingLength,
    eventsLength,
    rate,
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

export const getShortEventsByUsername = (username: string): ShortEventDto[] => {
  const user = getUserApi(username);

  if (!user) {
    return [];
  }

  const events: Event[] = [];
  DBGroups.forEach((group) => {
    group.events.forEach((event) => {
      if (event.users.some((eUser) => eUser.user.id === user.id)) {
        events.push(event);
      }
    });
  });

  return events.map(toShortEvent);
};

export const getEventTiles = ({
  locations,
  categories,
  titles,
  sponsored,
  remote,
  verified,
  minMembers,
  maxMembers,
}: {
  locations: string[];
  categories: string[];
  titles: string[];
  sponsored: boolean;
  verified: boolean;
  remote: boolean;
  minMembers: number;
  maxMembers: number;
}): EventTileDto[] => {
  const events: EventTileDto[] = [];

  DBGroups.forEach((group) => {
    group.events.forEach((event) => {
      events.push(toEventTileDto(event)(group));
    });
  });

  const filteredGroups = events.filter((event) => {
    const matchesCities =
      locations.length === 0 || locations.every((location) => event.cities.some(({ value }) => value === location));

    const matchesCategories =
      categories.length === 0 ||
      categories.every((category) => event.categories.some(({ value }) => value === category));

    const matchesTitles = titles.length === 0 || titles.some((title) => title === event.title);

    const matchesMinMembers = minMembers <= event.userLength;

    const hasNoMaxMembersLimit = maxMembers === 50;

    const matchesMaxMembers = hasNoMaxMembersLimit || maxMembers >= event.userLength;

    return matchesCities && matchesCategories && matchesTitles && matchesMinMembers && matchesMaxMembers;
  });

  if (filteredGroups.length <= 0) {
    return [];
  }

  return filteredGroups.filter((e) => {
    let numToValidate = 0;
    let numToValidateCounter = 0;

    sponsored && numToValidate++;
    remote && numToValidate++;
    verified && numToValidate++;

    sponsored && e.groupMeta.sponsored && numToValidateCounter++;
    remote && e.groupMeta.remote && numToValidateCounter++;
    verified && e.groupMeta.verified && numToValidateCounter++;

    return numToValidateCounter === numToValidate;
  });
};
