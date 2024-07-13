<script setup>
import { defineProps } from "vue";

defineProps({
  title: {
    type: String,
    default: "Title Here",
  },
  subtitle: {
    type: String,
    default: "Subtitle Here",
  },
  alignment: {
    type: String,
    default: "center",
  },
});
</script>

<template>
  <section class="bg-[#1a1a1a]">
    <div class="container min-h-[100vh] mx-auto flex flex-col justify-center">
      <div class="text-white">
        <h1
          :class="`sm:text-[10rem] font-monoton leading-none text-[#009efa] flex justify-${alignment}`"
        >
          {{ title }}
        </h1>
        <h3
          :class="`sm:text-[3rem] font-bold leading-none flex justify-${alignment}`"
        >
          {{ subtitle }}
        </h3>
      </div>
    </div>
  </section>
</template>
