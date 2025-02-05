<script setup lang="ts">
import { bookImageFile } from "@/utils";
import { useCartStore } from "@/stores/cart";
const cartStore = useCartStore();
import { asDollarsAndCents } from "@/utils";

import { useOrderDetailsStore } from "@/stores/orderDetails";
import type { BookItem, OrderDetails } from "@/types";

const orderDetailsStore = useOrderDetailsStore();
const orderDetails: OrderDetails = orderDetailsStore.orderDetails;

// A helper function - optional to use
const bookAt = function (orderDetails: OrderDetails, index: number): BookItem {
  return orderDetails.books[index];
};
</script>


<style scoped>
table {
  border: 1px black solid;
  width: fit-content;
  margin-top: 1em;
  margin-bottom: 1em;
}

td {
  display: table-cell;
  padding: 0.5em 0.5em;
  background-color: white;
  vertical-align: middle;
}

tr:nth-child(even) > td {
  background-color: lightgray;
}

td:nth-child(1) {
  text-align: left;
}

td:nth-child(2) {
  text-align: center;
}

td:nth-child(3) {
  text-align: right;
}
</style>


<template>
  <table>
    <tr
        v-for="(item, index) in orderDetails.lineItems"
        :key="item.bookId"
    >
      <td>
        {{ bookAt(orderDetails, index).title }}
      </td>
      <td>{{ item.quantity }}</td>
      <td>{{ asDollarsAndCents(bookAt(orderDetails, index).price) }}</td>
    </tr>
  </table>
</template>

