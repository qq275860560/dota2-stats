import { ref } from "vue";
import { useHeroStore } from "@/store/hero";
import type { Sorting } from "@/views/heroes/heroTypes";
import { sortArrayByField } from "@/utils/utils";

export default function () {
  const heroStore = useHeroStore();
  const tableData = ref([]);

  function getHeroesList(
    pagingParam: { pageNum: number; pageSize: number },
    sorting: Sorting
  ) {
    //get top ten heroes list
    return heroStore.getTopTenHeroes().then((heroes) => {
      //order by field
      if (sorting.order) {
        sortArrayByField(
          heroes,
          sorting.field,
          sorting.fieldValueType,
          sorting.order
        );
      }

      //get page data
      let start = pagingParam.pageSize * (pagingParam.pageNum - 1);
      let end = start + pagingParam.pageSize;
      let list = heroes.slice(start, end);

      return { list: list, total: heroes.length };
    });
  }

  return {
    tableData,
    getHeroesList,
  };
}
