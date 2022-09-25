<script setup lang="ts">
import { ref } from "vue";
import { useNavBar } from "@/components/nav-bar/useNavBar";
import type { RouteConfig } from "@/router/index";

const activeIndex = ref("");
const { menuList, getMenuList } = useNavBar();
getMenuList();

if (menuList.value.length) {
  let defaultMenu: RouteConfig = menuList.value[0];
  activeIndex.value = defaultMenu.path;
}
</script>

<template>
  <div class="nav-wrap">
    <el-menu :default-active="activeIndex" class="nav" mode="horizontal" router>
      <el-menu-item v-for="item in menuList" :index="item.path">{{
        item.title
      }}</el-menu-item>
      <el-menu-item index="#">Dota 2</el-menu-item>
      <el-menu-item index="#1">About Us</el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.nav-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #141414;
}
.nav {
  width: 1200px;
  @media (max-width: 768px) {
    width: 100vw;
  }
  &.el-menu--horizontal > .el-menu-item {
    font-size: 18px;
    font-weight: 600;
    text-transform: uppercase;
  }
}
</style>
