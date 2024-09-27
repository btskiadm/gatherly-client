import { ZodIssue, z } from "zod";

// create group
export const minGroupName = 5;
export const maxGroupName = 50;
export const minGroupDescription = 5;
export const maxGroupDescription = 250;
export const minGroupCategories = 1;
export const maxGroupCategories = 5;

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

// sign in
export const minUsername = 5;
export const minPassword = 5;

const authUsername = z.string().min(minUsername);
const authEmail = z.string().email();
const authPassword = z.string().min(minPassword);

export const signInSchema = z.object({
  username: authUsername,
  password: authPassword,
});

export type SignInInput = z.infer<typeof signInSchema>;

// sign up
export const signUpSchema = z.object({
  username: authUsername,
  email: authEmail,
  password: authPassword,
});

export type SignUpInput = z.infer<typeof signUpSchema>;

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
