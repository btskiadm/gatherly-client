export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Group {
  id: string;
  tile: string;
  description: string;
  createdAt: string;
  members: User[];
  hosts: User[];
  moderators: User[];
  events: Event[];
}

export interface Event {
  id: string;
  title: string;
  startAt: string;
  endAt: string;
  city: string;
  street: string;
  members: User[];
  hosts: User[];
  moderators: User[];
  comments: Comment[];
}

export interface Comment {
  id: string;
  user: User;
  createdAt: Date;
  content: string;
  rate: number;
}

export const hostUser = {
  username: "seoquesto",
  email: "seoquesto@gmail.com",
};

export const group = {};

export const event = {};
