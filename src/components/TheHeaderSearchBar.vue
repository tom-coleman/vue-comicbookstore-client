<script setup lang="ts"></script>

<style scoped>
.search {
  margin-left: 2em;
}

input[type='text'] {
  margin: 0.5em 0;
  width: 12em;
}

.search-bar {
  background: var(--off-white-primary);
  border: 2px solid black;
  border-radius: 20px;
  width: 15em;
  padding: 10px;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  color: var(--primary-color);
}
</style>

<template>
  <form class="search">
    <input type="text" class="search-bar" />
  </form>
</template>
