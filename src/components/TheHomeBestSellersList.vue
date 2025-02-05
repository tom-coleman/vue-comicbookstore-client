<script setup lang="ts">
import { defineProps } from 'vue' // needed if you don't want an error below
import type { BestSellerItem } from '@/types'
import TheHomeBestSellerListItem from '@/components/TheHomeBestSellersListItem.vue'
const props = defineProps<{
  bestSellerList: BestSellerItem[]
}>()
</script>

<style scoped>
.best-sellers-books {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 60px;
}
</style>

<template>
  <ul class="best-sellers-books">
    <template v-for="book in props.bestSellerList" :key="book.bookId">
      <the-home-best-seller-list-item :book="book"></the-home-best-seller-list-item>
    </template>
  </ul>
</template>
