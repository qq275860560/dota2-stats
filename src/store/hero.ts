import { defineStore } from "pinia";
import { get } from "@/utils/request";
import globalConfig from "@/config/global";
import type { Hero } from "@/views/heroes/heroTypes";

type ApiResponse = {
  message: string;
  data: any;
};

export const useHeroStore = defineStore({
  id: "hero",
  state: () => {
    return {
      selectedHero: null as Hero | null,
      topTenHeroes: [] as Hero[],
    };
  },
  actions: {
    updateSelectedHero(hero: Hero) {
      this.selectedHero = hero;
    },
    async getHeroById(heroId: number): Promise<Hero | null> {
      let topTenHeroes = await this.getTopTenHeroes();

      let hero = topTenHeroes.find((i) => i.id === heroId);
      if (hero) {
        return hero;
      } else {
        return null;
      }
    },
    async getTopTenHeroes() {
      if (this.topTenHeroes.length) return this.topTenHeroes;

      let allHeroes: Hero[] = (await get("api/heroStats")) || [];

      //order by pro win rate
      allHeroes.sort((a: Hero, b: Hero) => {
        return b.pro_win / b.pro_pick - a.pro_win / a.pro_pick;
      });

      //get top 10 heroes
      const topTenHeroes = allHeroes.slice(0, 10);

      //set win rates & img url
      topTenHeroes.forEach((item) => {
        item.img = globalConfig.BASE_URL + item.img;

        if (item.pro_pick) {
          item.proWinRate = `${Math.round(
            (item.pro_win / item.pro_pick) * 100
          )} %`;
        }
      });

      this.topTenHeroes = topTenHeroes;
      return topTenHeroes;
    },
  },
});
