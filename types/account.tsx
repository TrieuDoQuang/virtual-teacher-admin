import { Auditable } from "./auditable";

export type Account = Auditable & {
  id: string;
  username: string;
  role: string;
  email: string;
};

export const accounts: Account[] = [
  {
    id: "1",
    username: "John Doe",
    role: "admin",
    email: "john.doe@example.com",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "2",
    username: "Jane Doe",
    role: "admin",
    email: "jane.doe@example.com",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "3",
    username: "John Doe",
    role: "admin",
    email: "john.doe@example.com",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "4",
    username: "Jane Doe",
    role: "admin",
    email: "jane.doe@example.com",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },

  
];
