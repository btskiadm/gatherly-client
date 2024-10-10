import { ZodIssue, z } from "zod";

// common
export const minUsername = 3;
export const maxUsername = 25;
export const minPassword = 3;
export const maxPassword = 25;

const usernameSchema = z.string().min(minUsername).max(maxUsername);
const locationSchema = z.string();
const emailSchema = z.string().email();
const passwordSchema = z.string().min(minPassword).max(maxPassword);

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

// create event
export const minEventName = 5;
export const maxEventName = 50;
export const minEventDescription = 5;
export const maxEventDescription = 250;
export const minEventCategories = 1;
export const maxEventCategories = 5;

const eventNameSchema = z.string().min(minEventName).max(maxEventName);
const eventDescriptionSchema = z.string().min(minEventDescription).max(maxEventDescription);
const eventCategorySchema = z.string().min(2).max(25);
const eventDateSchema = z.string().date();
const eventFromSchema = z.string().time();
const eventToSchema = z.string().time();

export const createEventDetailsSchema = z.object({
  name: eventNameSchema,
  description: eventDescriptionSchema,
  categories: z.array(eventCategorySchema).min(minEventCategories).max(maxEventCategories),
});

export const createEventDateAndLocationSchema = z.object({
  date: eventDateSchema,
  from: eventFromSchema,
  to: eventToSchema,
});

export type CreateEventDetailsInput = z.infer<typeof createEventDetailsSchema>;
export type CreateEventDateAndLocationInput = z.infer<typeof createEventDateAndLocationSchema>;

// invite
const inviteMemberIdSchema = z.string().min(1);

export const inviteMemberSchema = z.object({
  inviteIds: z.array(inviteMemberIdSchema),
});

export type InviteMemberInput = z.infer<typeof inviteMemberSchema>;

// report
export const minReportContent = 5;
export const maxReportContent = 250;

const reportContentSchema = z.string().min(minReportContent).max(maxReportContent);

export const reportSchema = z.object({
  content: reportContentSchema,
});

export type ReportInput = z.infer<typeof reportSchema>;

// account edit
const avatarSchema = z.string().url();

export const accountScheme = z.object({
  avatarUrl: avatarSchema,
  username: usernameSchema,
  location: locationSchema,
});

export type AccountInput = z.infer<typeof accountScheme>;

// sign in
export const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export type LoginInput = z.infer<typeof loginSchema>;

// sign up
export const signUpSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
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
