<script setup lang="ts">
import type { CategoryItem } from '@/types'
import { apiUrl } from "@/api";
import { useCategoryStore } from "@/stores/category";
const categoryStore = useCategoryStore();
</script>

<style scoped>
.categories-dropdown {
  position: relative;
}

.categories-btn {
  background: var(--secondary-color);
  border-radius: 20px;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.25);
  display: inline-flex;
  min-width: 5em;
  padding: 0.5em;
  justify-content: center;
  align-items: center;
  color: var(--off-white-primary);
  font-size: 20px;
  text-shadow: var(--text-stroke);
  gap: 10px;
}

.categories-btn:hover,
.categories-btn:active {
  background: var(--secondary-color-dark);
  color: var(--off-white-primary);
}

ul {
  background: black;
  display: block;
  position: absolute;
  left: 5px;
  min-width: 5em;
  z-index: 1;
  cursor: pointer;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.5s;
}

.categories-dropdown:hover ul {
  max-height: 10em;
}

li a {
  background: var(--off-white-primary);
  padding: 0.25em 0.5em;
  display: block;
  color: black;
  text-decoration: none;
  width: 100%;
}

li a:hover {
  background: var(--off-white-dark);
}

li + li {
  margin-top: 0.1em;
}
</style>

<!-- Converted HTML from Proj2 to Proj3 -->
<template>
  <div class="categories-dropdown">
    <button class="categories-btn button default-text">
      Categories<i class="fa-solid fa-caret-down"></i>
    </button>
    <ul>
      <li v-for="category in categoryStore.categoryList" :key="category.categoryId">
        <router-link :to="{ name: 'category-view', params: { name: category.name } }">
          {{ category.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
