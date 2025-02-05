<script setup lang="ts">
import { useCategoryStore } from "@/stores/category";

const categoryStore = useCategoryStore();
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: black;
  margin: 3rem;
  row-gap: 2rem;
}

.continue {
  font-size: 25px;
}
</style>

<template>
  <div class="not-found default-text">
    <div>Uh oh! The page you are looking for does not exist.</div>
    <div>
      <router-link :to="{ name: 'home' }">
        <button class="primary-btn button default-text continue">Go to Home</button>
      </router-link>
    </div>
  </div>
</template>