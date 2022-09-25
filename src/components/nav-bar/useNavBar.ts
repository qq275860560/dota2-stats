import { ref } from "vue";
import { routes } from "@/router/index";
import type { RouteConfig } from "@/router/index";

export function useNavBar() {
  const menuList = ref([] as Array<RouteConfig>);

  function getMenuList() {
    menuList.value = routes.filter((i) => i.isMenu);
  }

  return { getMenuList, menuList };
}
