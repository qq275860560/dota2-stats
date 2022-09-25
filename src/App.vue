<script setup lang="ts">
import NavBar from "@/components/nav-bar/index.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <NavBar />
  <div class="content-wrap flex-column">
    <div class="bg-wrap"></div>
    <div class="content flex-column">
      <router-view v-slot="{ Component }">
        <transition name="move" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content-wrap {
  position: relative;
  flex: 1;
  overflow-y: hidden;

  .bg-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-image: url("@/assets/images/content-bg.jpg");
    filter: blur(10px);
  }
}
.content {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  max-width: 1280px;
  min-width: 768px;
  overflow-y: hidden;
  color: #fff;
}
</style>
