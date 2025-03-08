import { Prisma } from "@prisma/client";

export const categoryPopulated = Prisma.validator<Prisma.CategoryInclude>()({});

export type Category = Prisma.CategoryGetPayload<{ include: typeof categoryPopulated }>;
