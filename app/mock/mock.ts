interface User {
  id: string;
  username: string;
  email: string;
}

interface Group {
  id: string;
  tile: string;
  description: string;
  createdAt: string;
  members: User[];
  hosts: User[];
  moderators: User[];
  events: Event[];
}

interface Event {
  id: string;
  title: string;
  startAt: string;
  endAt: string;
  city: string;
  street: string;
  members: User[];
  hosts: User[];
  moderators: User[];
}

export const hostUser = {
  username: "seoquesto",
  email: "seoquesto@gmail.com",
};

export const group = {};

export const event = {};
