import { Auditable } from "./auditable";

export type Setting = Auditable & {
  id: string;
  value: string;
};

