<script setup lang="ts">
import CartTable from "@/components/CartTable.vue";
import { useCartStore } from "@/stores/cart";
const cartStore = useCartStore();
const clearCart = function () {
  cartStore.clearCart();
};
</script>
<style scoped>

.cart-view {
  background: var(--off-white-primary);
}

</style>

<template>
  <div class="cart-view">
    <cart-table></cart-table>
  </div>
</template>