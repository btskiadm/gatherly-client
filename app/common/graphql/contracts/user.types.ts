import { Prisma } from "@prisma/client";

export const userPopulated = Prisma.validator<Prisma.UserInclude>()({});

export const userWithProfile = Prisma.validator<Prisma.UserInclude>()({
  profile: true,
});

export type User = Prisma.UserGetPayload<{ select: typeof userWithProfile }>;

export type UserWithProfile = Prisma.UserGetPayload<{ select: typeof userWithProfile }>;
