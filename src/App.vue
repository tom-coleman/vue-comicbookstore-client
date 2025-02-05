<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { useCategoryStore } from "@/stores/category";
const categoryStore = useCategoryStore;
categoryStore().fetchCategories();
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
const route = useRoute();
</script>

<style scoped>
main {
  display: flex;
  width: 1200px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background: var(--off-white-primary, #fff3dc);
}

#app {
  border: 1px solid black;
}
</style>

<template>
  <div id="app">
    <the-header></the-header>
    <router-view :key="route.fullPath"></router-view>
    <the-footer></the-footer>
  </div>
</template>
