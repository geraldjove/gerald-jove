<script setup>
import { defineProps } from "vue";
import ScrollDown from "@/components/ScrollDown.vue";

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
  <section class="bg-[#1a1a1a] p-5">
    <div class="container min-h-[100vh] mx-auto flex flex-col justify-center">
      <div class="text-white my-auto">
        <h1
          :class="`sm:text-[15rem] text-[3.5rem] font-monoton leading-none text-[#009efa] flex justify-${alignment} items-center pt-10`"
        >
          <span
            v-for="(letter, index) in title.split('')"
            :key="index"
            v-motion
            :initial="{ opacity: 0, y: -1000, scale: 0 }"
            :enter="{ opacity: 1, y: 0, rotate: 0, scale: 1 }"
            :delay="200 + index * 100"
            :duration="1200"
          >
            {{ letter }}
          </span>
        </h1>
        <h3
          v-motion
          :initial="{ opacity: 0, x: 0, scale: 0 }"
          :enter="{ opacity: 1, x: 0, scale: 1 }"
          :delay="200"
          :duration="1200"
          :class="`sm:text-[3rem] font-bold leading-none flex justify-${alignment}`"
        >
          {{ subtitle }}
        </h3>
      </div>
      <ScrollDown class="my-auto" />
    </div>
  </section>
</template>
