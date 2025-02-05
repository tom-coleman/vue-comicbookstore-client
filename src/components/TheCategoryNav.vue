<script setup lang="ts">
import type { CategoryItem } from '@/types'
import { apiUrl } from "@/api"
import { useCategoryStore } from "@/stores/category";
const categoryStore = useCategoryStore();
</script>

<style scoped>
.nav-container {
  height: 100%;
  width: 40%;
  background-color: var(--secondary-color);
}

.category-btn {
  width: 200px;
  background-color: var(--primary-color);
  border-radius: 20px;
  display: block;
  padding: 10px;
  font-size: 24px;
  text-align: center;
  text-shadow: var(--text-stroke);
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

ul {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 3em 0;
  gap: 2.5rem;
}

.category-btn:hover {
  background-color: var(--primary-color-dark);
}
</style>

<template>
  <div class="nav-container default-text">
    <ul>
      <li v-for="category in categoryStore.categoryList" :key="category.categoryId">
        <router-link :to="{ name: 'category-view', params: { name: category.name } }"
                     class="button category-btn">
          {{ category.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
