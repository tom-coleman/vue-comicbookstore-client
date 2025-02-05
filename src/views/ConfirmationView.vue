<script setup lang="ts">
import { useCategoryStore } from "@/stores/category";
import { useOrderDetailsStore } from "@/stores/orderDetails";
import Confirmation from "@/components/Confirmation.vue";

const categoryStore = useCategoryStore();
const orderDetailsStore = useOrderDetailsStore();
</script>

<style scoped>
.thanks {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: black;
  margin: 1.5rem;
}

.continue {
  font-size: 25px;
}
</style>

<template>
  <div class="thanks default-text">
    <div v-if="orderDetailsStore.hasOrderDetails()">
      <div class="thanks">Thank you for your order!</div>
      <confirmation></confirmation>
    </div>
    <div v-else>
      <div class="thanks">You do not have a current order.</div>
    </div>
    <div>
      <router-link :to="{ name: 'category-view', params: { name: categoryStore.selectedCategoryName }}"
                   @click=orderDetailsStore.clearOrderDetails()>
        <button class="secondary-btn button cart-action-btn default-text continue">
          Continue Shopping
        </button>
      </router-link>
    </div>
  </div>
</template>