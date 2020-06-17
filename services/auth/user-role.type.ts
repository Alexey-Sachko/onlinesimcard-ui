import { Permissions } from "./permissions.enum";

export type UserRole = {
  name: string;
  permissions: [Permissions];
};
