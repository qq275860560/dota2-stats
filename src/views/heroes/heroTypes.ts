export interface Hero {
  id: number;
  localized_name: string;
  roles: string[];
  img: string;
  hero_id: number;
  pro_ban: number;
  pro_win: number;
  pro_pick: number;
  proWinRate?: string;
  [propName: string]: any;
}

export type Order = null | "descending" | "ascending";

export type Sorting = {
  field: string;
  fieldValueType: "string" | "number" | "";
  order: Order;
};
