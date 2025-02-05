<script setup lang="ts">
import ConfirmationTable from "@/components/ConfirmationTable.vue";

import { useCategoryStore } from "@/stores/category";
const categoryStore = useCategoryStore();

import { useOrderDetailsStore } from "@/stores/orderDetails";
import { computed } from "vue";
const orderDetailsStore = useOrderDetailsStore();
const orderDetails = orderDetailsStore.orderDetails;

const orderDate = computed(function () {
  let date = new Date(orderDetails.order.dateCreated);
  return date.toLocaleTimeString();
});

const ccExpDate = computed(function (): Date {
  return new Date(orderDetails.customer.ccExpDate);
});

const ccExpYear = computed(function (): number {
  return ccExpDate.value.getFullYear();
});

const ccExpMonth = computed(function (): string {
  let month = ccExpDate.value.getMonth() + 1;
  let result = "" + month;
  if (month < 10) {
    result = "0" + month;
  }
  return result;
});
</script>

<style scoped>
#confirmationView {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 22px;
}
ul {
  text-align: left;
}
</style>

<template>
  <div id="confirmationView">
    <ul>
      <li>Confirmation #: {{ orderDetails.order.confirmationNumber }}</li>
      <li>Time: {{ orderDate }}</li>
    </ul>
    <confirmation-table> </confirmation-table>
    <ul>
      <li>{{ orderDetails.customer.customerName }}</li>
      <li>{{ orderDetails.customer.address }}</li>
      <li>{{ orderDetails.customer.email }}</li>
      <li>{{ orderDetails.customer.phone }}</li>
      <li>**** **** **** {{ orderDetails.customer.ccNumber.slice(-4) }} ({{ ccExpMonth }}-{{ ccExpYear%100 }})</li>
    </ul>
    <div id="customerInfo"></div>
  </div>
</template>
