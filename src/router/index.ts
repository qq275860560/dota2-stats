import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Heroes from "@/views/heroes/index.vue";
import Players from "@/views/players/index.vue";

export type RouteConfig = RouteRecordRaw & { title?: string; isMenu?: boolean };

export const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "heros",
    component: Heroes,
    title: "Heroes",
    isMenu: true,
  },
  {
    path: "/hero-players-rank/:id",
    name: "hero-players-rank",
    component: Players,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
