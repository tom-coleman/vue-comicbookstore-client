<script setup lang="ts"></script>

<style scoped>
footer {
  background: var(--primary-color);
  color: var(--off-white-primary);
  width: 100%;
  height: 3.125rem;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
}

.copyright {
  margin-left: 1em;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
}

.social-links {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  gap: 2rem;
}

.social-icon {
  color: var(--off-white-primary);
}

.info-links {
  margin-right: 1rem;
  display: inline-flex;
  gap: 3.5rem;
}

.link {
  color: var(--off-white-primary);
}
</style>

<template>
  <footer class="container">
    <div class="copyright">&copy; 2023 Inkredible Comics</div>
    <div class="social-links">
      <router-link :to="{name: 'home'}" class="social-icon">
        <i class="fa-brands fa-square-facebook"></i>
      </router-link>
      <router-link :to="{name: 'home'}" class="social-icon">
        <i class="fa-brands fa-square-x-twitter"></i>
      </router-link>
      <router-link :to="{name: 'home'}" class="social-icon">
        <i class="fa-brands fa-square-instagram"></i>
      </router-link>
    </div>
    <div class="info-links">
      <router-link :to="{name: 'home'}" class="link">Contact Us</router-link>
      <router-link :to="{name: 'home'}" class="link">Directions</router-link>
    </div>
  </footer>
</template>
