import {
  EventStackDto,
  GroupDetailsDto,
  GroupTileDto,
  SearchCategoryDto,
  SearchCityDto,
  SearchGroupDto,
  SearchUserDto,
  ShortGroupDto,
  StackedGroupTilesDto,
  UserDto,
} from "./mock-api.types";
import { DBCategory, DBCity, DBGroups, DBUser } from "./mock-db";
import { getGroupedEvents, stackEventsDto, toGroupDto, toGroupTileDto, toShortGroup } from "./mock-helpers";

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

const city = DBCity[0];
const category = DBCategory[0];
const sponsored = false;
const remote = false;
const verified = false;

export const getStackedGroupTiles = (): StackedGroupTilesDto[] => {
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
      tiles: filtered.map<GroupTileDto>(toGroupTileDto),
    },
  ];
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
