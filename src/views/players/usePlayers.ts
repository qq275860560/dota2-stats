import { ref } from "vue";
import { useHeroStore } from "@/store/hero";
import { get } from "../../utils/request";
import type { Ref } from "vue";
import type { Hero } from "@/views/heroes/heroTypes";
import type { Player, Match } from "@/views/players/playerTypes";

export default function () {
  const heroStore = useHeroStore();

  let players = ref([] as Array<Player>);
  let flag = ref(0);
  let selectedHero: Ref<Hero | null> = ref(null);

  const getTopTenPlayersOfHero = async (heroId: number) => {
    let res = await get("api/rankings", { hero_id: heroId });
    if (!res || !res.rankings || !Array.isArray(res.rankings)) return;

    let list: Array<Player> = res.rankings.slice(0, 10);
    players.value = list;
    flag.value++;

    //get past 20 games data for every player
    let promiseList = list.map((item: Player) => {
      return get(`api/players/${item.account_id}/recentMatches`);
    });
    Promise.all(promiseList).then((res) => {
      list.forEach((player, index) => {
        let radiantWinSum = res[index].reduce((prev: number, curr: Match) => {
          if (curr.radiant_win) {
            prev += 1;
          }
          return prev;
        }, 0);

        let loseMatchNum = res[index].length - radiantWinSum;
        player.radiantWinChartData = [
          { name: "win", value: radiantWinSum },
          { name: "lose", value: loseMatchNum },
        ];
      });
      flag.value++;
    });
  };

  async function getSelectedHero(heroId: number) {
    if (heroStore.selectedHero) {
      selectedHero.value = heroStore.selectedHero;
    } else {
      selectedHero.value = await heroStore.getHeroById(heroId);
    }
  }

  return {
    getTopTenPlayersOfHero,
    players,
    flag,
    getSelectedHero,
    selectedHero,
  };
}
