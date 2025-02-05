<script setup lang="ts">
import TheHomeBestSellers from '@/components/TheHomeBestSellers.vue'
</script>

<style scoped>
.welcome-banner {
  background: var(--secondary-color);
  width: 100%;
  padding: 3rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10%;
}

.welcome-banner p {
  font-size: 3rem;
  text-shadow: var(--text-stroke);
  text-align: center;
}

.find-books-btn {
  background: var(--primary-color);
  text-transform: uppercase;
  font-size: 30px;
}
</style>

<template>
  <div class="welcome-banner container">
    <p>Welcome to Inkredible Comics!!</p>
    <router-link :to="{ name: 'category-view', params: { name: 'Popular DC' }}">
      <button class="find-books-btn primary-btn button default-text">Find Comics!</button>
    </router-link>
  </div>
  <the-home-best-sellers></the-home-best-sellers>
</template>
