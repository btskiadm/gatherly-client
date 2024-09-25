import { ZodIssue, z } from "zod";

// todo: validity
export const minGroupName = 5;
export const maxGroupName = 50;
export const minGroupDescription = 5;
export const maxGroupDescription = 250;
export const minGroupCategories = 1;
export const maxGroupCategories = 5;

// todo: messages
const groupNameSchema = z.string().min(minGroupName).max(maxGroupName);
const groupDescriptionSchema = z.string().min(minGroupDescription).max(maxGroupDescription);
const groupCitySchema = z.string().min(2).max(25);
const groupCategorySchema = z.string().min(2).max(25);

export const createGroupSchema = z.object({
  name: groupNameSchema,
  description: groupDescriptionSchema,
  city: groupCitySchema.optional(),
  categories: z.array(groupCategorySchema).min(minGroupCategories).max(maxGroupCategories),
});

export type CreateGroupInput = z.infer<typeof createGroupSchema>;

export interface ZodFlattenIssue {
  [path: string]: { message: string };
}

export const flattenIssues = (issues: ZodIssue[]): ZodFlattenIssue => {
  return issues.reduce(
    (prev, current) => ({
      ...prev,
      [current.path[0] as string]: { message: current.message },
    }),
    {}
  );
};
