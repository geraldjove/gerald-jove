<script setup>
import Navbar from "@/components/Navbar.vue";
import { RouterView } from "vue-router";
import FooterComponent from "@/components/FooterComponent.vue";
</script>

<template>
  <Navbar />
  <RouterView />
  <FooterComponent />
</template>
