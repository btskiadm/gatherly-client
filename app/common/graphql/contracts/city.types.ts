import { Prisma } from "@prisma/client";

export const cityPopulated = Prisma.validator<Prisma.CityInclude>()({});

export type City = Prisma.CityGetPayload<{ include: typeof cityPopulated }>;
