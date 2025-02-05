<script setup lang="ts">
import TheHeaderDropdown from '@/components/TheHeaderDropdown.vue'
import TheHeaderSearchBar from '@/components/TheHeaderSearchBar.vue'
import { useCartStore } from "@/stores/cart";
const cartStore = useCartStore();
</script>

<style scoped>
header {
  background: var(--primary-color);
  width: 100%;
  height: 125px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
}

.header-logo {
  height: 75px;
  width: auto;
  margin-left: 1rem;
  margin-right: 2em;
}

.cart-container {
  margin-left: 7em;
  position: relative;
  display: flex;
  padding: 15px;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.3rem;
}

.cart-icon {
  color: var(--off-white-primary);
  text-shadow: var(--text-stroke);
  font-size: 45px;
  height: 40px;
  width: auto;
  background: var(--primary-color);
}

.cart-counter {
  position: absolute;
  right: 5px;
  top: 10px;
  width: 30px;
  height: 30px;
  background: var(--secondary-color);
  box-sizing: border-box;
  border: 1px solid black;
  border-radius: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--off-white-primary);
  text-shadow: var(--text-stroke);
  font-size: 20px;
}

.user-login {
  margin-left: 0.5em;
  width: 190px;
  margin-right: 1rem;
  padding: 0.5rem;
  font-size: 24px;
}

@media (max-width: 600px) {
  header {
    flex-direction: column;
  }
}
</style>

<!-- Converted from Proj2 to Proj3 -->
<template>
  <header class="container">
    <router-link :to="{name: 'home'}">
      <img
        src="/site-images/inkredible_comics_logo.png"
        alt="Inkredible Comics"
        class="header-logo"
      />
    </router-link>
    <the-header-dropdown></the-header-dropdown>
    <the-header-search-bar></the-header-search-bar>
    <router-link :to="{name: 'cart-view'}" class="cart-container">
      <div class="cart-icon">
        <i class="fas fa-cart-shopping"></i>
      </div>
      <div class="cart-counter">{{ cartStore.count }}</div>
    </router-link>
    <div class="user-login secondary-btn button default-text">Hello, Tom</div>
  </header>
</template>
