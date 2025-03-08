import { Prisma } from "@prisma/client";
import { cityPopulated } from "./city.types";
import { categoryPopulated } from "./category.types";

export const groupTitlePopulated = Prisma.validator<Prisma.GroupSelect>()({
  id: true,
  title: true,
});

export const groupTilePopulated = Prisma.validator<Prisma.GroupInclude>()({
  _count: {
    select: {
      members: true,
      events: true,
    },
  },
  cities: {
    include: {
      city: cityPopulated,
    },
  },
  categories: {
    include: {
      category: categoryPopulated,
    },
  },
});

export type GroupTitle = Pick<Prisma.GroupGetPayload<{ select: typeof groupTitlePopulated }>, "id"> & {
  label: string;
  value: string;
};

export type GroupTile = Omit<Prisma.GroupGetPayload<{ include: typeof groupTilePopulated }>, "_count"> & {
  eventsCount: number;
  membersCount: number;
  isSponsored: boolean;
};
