import {
  CategoryDto,
  CityDto,
  CommentDto,
  EventDateDto,
  EventDto,
  EventStackDto,
  EventUserDto,
  GroupDto,
  GroupTileDto,
  ShortGroupDto,
  ThumbnailsDto,
  UserDetailsDto,
  UserDto,
} from "./mock-api.types";
import { Category, City, Event, EventDate, Group, Thumbnails, User, Comment, UserDetails } from "./mock-db.types";

export const toUserDetailsDto = ({ city, description }: UserDetails): UserDetailsDto => ({
  description: description,
  city: city,
});

export const toCommentDto = (comment: Comment): CommentDto => ({
  id: comment.id,
  content: comment.content,
  rate: comment.rate,
  createdAt: comment.createdAt,
  user: toUserDto(comment.user),
});

export const toCityDto = (city: City): CityDto => ({
  label: city.label,
  value: city.value,
});

export const toCategoryDto = (category: Category): CategoryDto => ({
  label: category.label,
  value: category.value,
});

export const toEventDateDto = (date: EventDate): EventDateDto => ({
  id: date.id,
  startAt: date.startAt,
  endAt: date.endAt,
});

export const toThumbnailsDto = (thumbnails: Thumbnails): ThumbnailsDto => ({
  thumb: thumbnails.thumb,
});

export const toUserDto = ({ id, username, verifiedAt, staticImageData, thumbnails, userDetails }: User): UserDto => ({
  id: id,
  username: username,
  verifiedAt: verifiedAt,
  staticImageData: staticImageData,
  thumbnails: toThumbnailsDto(thumbnails),
  userDetails: toUserDetailsDto(userDetails),
});

export const toEventDto = ({ id, title, description, canceled, city, createdAt, date, users }: Event): EventDto => ({
  id: id,
  title: title,
  description: description,
  canceled: canceled,
  createdAt: createdAt,
  users: users.map<EventUserDto>(({ isHost, isModerator, user }) => ({
    isHost,
    isModerator,
    user: toUserDto(user),
  })),
  city: toCityDto(city),
  date: toEventDateDto(date),
});

export const toGroupDto = ({
  id,
  title,
  description,
  categories,
  cities,
  comments,
  createdAt,
  events,
  remote,
  sponsored,
  thumbnails,
  users,
  verified,
}: Group): GroupDto => ({
  id,
  title,
  description,
  verified,
  createdAt,
  thumbnails: toThumbnailsDto(thumbnails),
  sponsored: {
    id: sponsored.id,
    value: sponsored.value,
  },
  remote: {
    id: remote.id,
    value: remote.value,
  },
  cities: cities.map(toCityDto),
  categories: categories.map(toCategoryDto),
  comments: comments.map(toCommentDto),
  events: events.map(toEventDto),
  users: users.map(({ isHost, isModerator, user }) => ({
    isHost,
    isModerator,
    user: toUserDto(user),
  })),
});

export const toGroupTileDto = (group: Group): GroupTileDto => ({
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
  categories: group.categories.map(toCategoryDto),
  cities: group.cities.map(toCityDto),
});

export const getGroupedEvents = (
  events: Event[]
): {
  cancelled: Event[];
  past: Event[];
  pending: Event[];
  upcoming: Event[];
} => {
  const now = new Date();

  const upcoming: Event[] = [];
  const pending: Event[] = [];
  const recurring: Event[] = [];
  const past: Event[] = [];
  const cancelled: Event[] = [];

  events.forEach((event) => {
    if (event.canceled) {
      cancelled.push(event);
      return;
    }

    const startAt = new Date(event.date.startAt);
    const endAt = new Date(event.date.endAt);

    if (now < startAt) {
      upcoming.push(event);
      return;
    }

    if (startAt <= now && now <= endAt) {
      pending.push(event);
      return;
    }

    if (now >= endAt) {
      past.push(event);
      return;
    }
  });

  return {
    cancelled,
    past,
    pending,
    upcoming,
  };
};

export const stackEventsDto = (events: Event[]): EventStackDto[] => {
  const sortedEvents = events.sort(
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

  const eventStacks: EventStackDto[] = Array.from(eventMap.entries()).map(([key, events]) => {
    const [year, month] = key.split("-").map(Number);
    const monthReference = new Date(year, month, 1).toISOString();

    return {
      monthReference,
      events: events.map<EventDto>(toEventDto),
    };
  });

  return eventStacks;
};

export const toShortGroup = ({ id, title, users, thumbnails, sponsored, verified }: Group): ShortGroupDto => ({
  id,
  title,
  users: users.length,
  sponsored: sponsored.value,
  verified: verified.value,
  thumbnails: toThumbnailsDto(thumbnails),
});
