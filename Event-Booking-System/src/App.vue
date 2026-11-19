<script setup>
import { useRoute } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

const route = useRoute();
</script>

<template>
  <Navbar />
  <div class="main-wrapper">
    <div :class="{ container: !route.meta.fullWidth }">
      <RouterView />
    </div>
  </div>
  <Footer />
</template>
