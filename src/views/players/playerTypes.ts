import type { PieData } from "@/types/d3";

export interface Player {
  account_id: number;
  avatar: string;
  personaname: string;
  radiantWinChartData: Array<PieData>;
}

export interface Match {
  radiant_win: boolean;
}
