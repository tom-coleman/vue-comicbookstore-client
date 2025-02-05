<script setup lang="ts">
import sourceData from '@/db.json'
import type { BestSellerItem } from '@/types'
import TheHomeBestSellersList from '@/components/TheHomeBestSellersList.vue'
const bestSellerList = sourceData['best-sellers'] as BestSellerItem[]
</script>

<style scoped>
.best-sellers {
  background: var(--off-white-primary);
  width: 100%;
  height: 435px;
  padding: 0 1rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.best-sellers-banner {
  background: var(--primary-color);
  position: absolute;
  top: 0;
  left: 0;
  display: inline;
  padding: 10px 1.5rem;
  font-size: 30px;
  text-shadow: var(--text-stroke);
}
</style>

<template>
  <div class="best-sellers">
    <label class="best-sellers-banner">Check out some of our best sellers!</label>
    <the-home-best-sellers-list :bestSellerList="bestSellerList"></the-home-best-sellers-list>
  </div>
</template>
