<script setup lang="ts">
import { defineProps } from 'vue'
import type { BestSellerItem } from '@/types'
const props = defineProps<{
  book: BestSellerItem
}>()
const bookImageFileName = function (book: BestSellerItem): string {
  let name = book.title.toLowerCase()
  name = name.replace(/ /g, '-')
  name = name.replace(/':/g, '')
  return `${name}.jpeg`
}
const bookImagePrefix = `${import.meta.env.BASE_URL}/book-images`
</script>

<style scoped>
.basic-book-box {
  height: 300px;
  width: 180px;
  background: var(--primary-color);
  border-radius: 20px;
  padding: 20px 10px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}

.basic-book-img {
  box-sizing: border-box;
  border: 5px solid var(--off-white-primary);
  height: 210px;
  width: auto;
}

.basic-book-title {
  margin-top: 5px;
  font-size: 18px;
  text-align: center;
  text-shadow: var(--text-stroke);
}

.basic-book-description {
  text-align: left;
  font-size: 15px;
}
</style>

<template>
  <li class="basic-book-box">
    <img
      :src="`${bookImagePrefix}/${bookImageFileName(book)}`"
      :alt="book.title"
      class="basic-book-img"
    />

    <p class="basic-book-title">{{ book.title }}</p>
    <p class="basic-book-description">{{ book.description }}</p>
  </li>
</template>
