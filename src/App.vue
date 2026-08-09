<script setup>
import Navbar from "@/components/Navbar.vue";
import { RouterView } from "vue-router";
import ScrollTop from "@/components/ScrollTop.vue";
import FooterComponent from "@/components/FooterComponent.vue";
</script>

<template>
  <Navbar />
  <main id="main-content">
    <RouterView />
  </main>
  <ScrollTop />
  <FooterComponent />
</template>
