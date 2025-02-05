<script setup lang="ts">
import TheCategoryNav from "@/components/TheCategoryNav.vue";
import TheCategoryBookList from "@/components/TheCategoryBookList.vue";
import {useRoute} from "vue-router";
import {useBookStore} from "@/stores/book";
import {useCategoryStore} from "@/stores/category";
import {watch} from "vue";
import router from "@/router";

const route = useRoute();

const bookStore = useBookStore();
const categoryStore = useCategoryStore();

watch(
    () => route.params.name,
    async (newName) => {
      try {
        await bookStore.fetchBooks(newName as string)
        categoryStore.setSelectedCategoryName(newName as string)
      } catch (e) {
        await router.push({name: "not-found"})
      }
    },
    { immediate: true }
);
</script>

<style scoped>
.category {
  width: 100%;
  height: 625px;
  background-color: var(--off-white-primary);
  display: flex;
}
</style>

<template>
  <div class="category">
    <the-category-nav></the-category-nav>
    <the-category-book-list></the-category-book-list>
  </div>
</template>
