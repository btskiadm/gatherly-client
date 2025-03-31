import { Role } from "@/app/model/model";

export const getRole = (role?: Role | null) => {
  return {
    isNone: !role,
    isMember: role === Role.Member,
    isModerator: role === Role.Moderator,
    isHost: role === Role.Host,
  };
};
