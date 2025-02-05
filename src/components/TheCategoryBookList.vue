<script setup lang="ts">
import type { BookItem } from '@/types'
import TheCategoryBookListItem from '@/components/TheCategoryBookListItem.vue'
import {useBookStore} from "@/stores/book";
const bookStore = useBookStore();
</script>

<style scoped>
ul {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 1em;
  column-gap: 2rem;
  row-gap: 3rem;
  width: 1500px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>

<template>
  <ul>
    <template v-for="book in bookStore.bookList" :key="book.bookId">
      <the-category-book-list-item :book="book"></the-category-book-list-item>
    </template>
  </ul>
</template>
