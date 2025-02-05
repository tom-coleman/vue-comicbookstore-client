<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
const cartStore = useCartStore();
import { defineProps } from 'vue'
import type { BookItem } from '@/types'
import {bookImageFile} from "@/utils";

const props = defineProps<{
  book: BookItem
}>()
</script>

<style scoped>
.book-box {
  width: 350px;
  background-color: var(--primary-color);
  border-radius: 20px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  display: flex;
  padding: 1em;
  justify-content: flex-start;
  align-items: center;
  gap: 1em;
  position: relative;
}

.book-img {
  border: 4px solid var(--off-white-primary);
  box-sizing: border-box;
  height: 200px;
  width: 135px;
}

.read-now {
  position: absolute;
  bottom: 25px;
  left: 25px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: auto;
  width: auto;
  padding: 7px;
}

.read-now img {
  height: 28px;
  width: 28px;
}

.book-info {
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  height: 200px;
  width: 100%;
  justify-content: space-between;
  font-weight: 500;
}

.title-description {
  align-self: flex-start;
}

.price-cart {
  align-self: flex-start;
}

.book-title {
  text-align: left;
  font-size: 20px;
  text-shadow: var(--text-stroke);
}

.book-description {
  text-align: left;
  font-size: 15px;
  text-shadow: var(--text-stroke);
}

.book-author {
  font-size: 15px;
}

.book-price {
  font-size: 24px;
  text-shadow: var(--text-stroke);
}

.add-to-cart {
  border: 0;
  margin-top: 5px;
  background-color: var(--secondary-color);
  border-radius: 20px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  gap: 6px;
  padding: 5px 10px;
}

.add-to-cart img {
  border: none;
  height: 18px;
  width: auto;
}

.add-to-cart:hover {
  background-color: var(--secondary-color-dark);
}
</style>

<template>
  <li v-if="book.isPublic" class="book-box">
    <img
      :src="bookImageFile(book)"
      :alt="book.title"
      class="book-img"
    />
    <button v-if="book.isFeatured" class="read-now button secondary-btn">
      <img src="/site-images/read-icon-white.png" alt="Read Now"/>
    </button>

    <div class="book-info">
      <div class="title-description">
        <p class="book-title">{{ book.title }}</p>
        <p class="book-description">*{{ book.description }}*</p>
        <p class="book-author">{{ book.author }}</p>
      </div>
      <div class="price-cart">
        <p class="book-price">${{ (book.price / 100).toFixed(2) }}</p>
        <button @click="cartStore.addToCart(book)" class="add-to-cart button">
          <i class="fa-solid fa-cart-plus"></i>
          Add to Cart
        </button>
      </div>
    </div>
  </li>
</template>
