<script setup lang="ts">
import type { BookItem } from "@/types";
import { useCartStore } from "@/stores/cart";
import {asDollarsAndCents} from "@/utils";
import {bookImageFile} from "@/utils";
import {useCategoryStore} from "@/stores/category";

const cartStore = useCartStore();
const categoryStore = useCategoryStore();

const updateCart = function (book: BookItem, quantity: number) {
  cartStore.updateBookQuantity(book, quantity);
};
</script>

<style scoped>
/* Table Formatting */

.cart-table {
  display: grid;
  grid-template-columns: max-content minmax(10em, 20em) repeat(3, max-content);
  row-gap: 1em;
  width: fit-content;
  margin: 0 auto;
  background-color: var(--off-white-primary);
  color: black;
  border: 2px solid black;
}

ul {
  display: contents;
}

ul > li {
  display: contents;
}

/* Heading Details */

.table-heading {
  background-color: #333;
  color: white;
}

.table-heading > * {
  background-color: #333;
  padding: 0.5em;
}

.heading-book {
  grid-column: 1 / 3;
  padding-left: 1.5rem;
  text-align: left;
}

.heading-price {
  grid-column: 3 / 4;
  text-align: right;
}

.heading-quantity {
  grid-column: 4 / 5;
  text-align: center;
}

.heading-subtotal {
  text-align: right;
  grid-column: -2 / -1;
}

/* Book Information */

.cart-book-image {
  padding: 0 1em;
}

.cart-book-image > * {
  margin-left: auto;
  margin-right: 0;
}

img {
  border: 4px solid var(--off-white-primary);
  box-sizing: border-box;
  height: 125px;
  width: auto;
}

.book-info {
  padding-top: 1rem;
}

.book-title {
  font-size: 18px;
  font-weight: bold;
}

.book-description {
  font-style: italic;
}

.cart-book-price {
  padding-top: 1rem;
  padding-left: 1rem;
  text-align: right;
}

.cart-book-quantity {
  margin-top: 0;
  padding-top: 1rem;
  padding-left: 1em;
  padding-right: 1em;
}

.cart-book-total {
  text-align: right;
  padding-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

/* Row separators in the table */

.line-sep {
  display: block;
  height: 2px;
  background-color: gray;
  grid-column: 1 / -1;
}

/* Increment/decrement buttons */

.icon-button {
  border: none;
  cursor: pointer;
}

.inc-button {
  font-size: 1.125rem;
  color: var(--primary-color);
  margin-right: 0.25em;
}

.inc-button:hover {
  color: var(--primary-color-dark);
}

.dec-button {
  font-size: 1.125rem;
  color: var(--secondary-color);
}

.dec-button:hover {
  color: var(--secondary-color-dark);
}

/* Other Buttons and Info */
.cart-subtotal {
  margin: 2rem;
  text-align: center;
  color: black;
  font-size: 20px;
}

.cart-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding: 0 13.5rem;
}

.cart-action-btn {
  font-size: 20px;
}

.no-items {
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 3rem;
  color: black;
}

</style>

<template>
  <div class="cart-subtotal">
    <div v-if="cartStore.count>1">Your cart has {{ cartStore.count }} items.</div>
    <div v-else-if="cartStore.count==1">Your cart has {{ cartStore.count }} item.</div>
    <div v-else>Your cart is empty.</div>
    <div v-if="cartStore.count>0">Cart Subtotal: {{ asDollarsAndCents(cartStore.cart.subtotal) }} </div>
  </div>
  <div class="cart-actions" v-if="cartStore.count>0">
    <div>
      <router-link :to="{ name: 'category-view', params: { name: categoryStore.selectedCategoryName }}">
        <button class="secondary-btn button cart-action-btn default-text">
          Continue Shopping
        </button>
      </router-link>
    </div>
    <div>
      <button @click="cartStore.clearCart()"
              class="secondary-btn button cart-action-btn default-text">
        Clear Cart
      </button>
    </div>
    <div>
      <router-link :to="{ name: 'checkout-view'}">
        <button class="primary-btn button cart-action-btn default-text">
          Proceed to Checkout
        </button>
      </router-link>
    </div>
  </div>
  <div v-else class="no-items">
    <div>
      <router-link :to="{ name: 'category-view', params: { name: categoryStore.selectedCategoryName }}">
        <button class="secondary-btn button cart-action-btn default-text">
          Continue Shopping
        </button>
      </router-link>
    </div>
  </div>
  <div class="cart-table" v-if="cartStore.count>0">
    <ul>
      <li class="table-heading">
        <div class="heading-book">Book</div>
        <div class="heading-price">Price</div>
        <div class="heading-quantity">Quantity</div>
        <div class="heading-subtotal">Amount</div>
      </li>

      <template v-for="item in cartStore.cart.items" :key="item.book.bookId">
        <li>
          <div class="cart-book-image">
            <img
                :src="bookImageFile(item.book)"
                :alt="item.book.title"
                width="100px"
                height="auto"
            />
          </div>
          <div class="book-info">
            <div class="book-title">{{ item.book.title }}</div>
            <div class="book-description">{{ item.book.description }}</div>
          </div>
          <div class="cart-book-price">
            {{ asDollarsAndCents(item.book.price) }}
          </div>
          <div class="cart-book-quantity">
            <span class="quantity">{{ item.quantity }}</span
            >&nbsp;
            <button
                class="icon-button inc-button"
                @click="updateCart(item.book, item.quantity + 1)"
            >
              <i class="fas fa-plus-circle"></i>
            </button>
            <button
                class="icon-button dec-button"
                @click="updateCart(item.book, item.quantity - 1)"
            >
              <i class="fas fa-minus-circle"></i>
            </button>
          </div>
          <div class="cart-book-total">{{ asDollarsAndCents(item.book.price * item.quantity) }}</div>
        </li>
        <li class="line-sep"></li>
      </template>
    </ul>
  </div>
  <div v-else class="no-items">
    Add some items to your cart to see them here!
  </div>
</template>