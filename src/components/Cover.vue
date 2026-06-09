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
  <section
    class="bg-grid relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-ink-950 px-6 pt-28 pb-16"
    id="cover"
  >
    <!-- Ambient glow -->
    <div
      class="pointer-events-none absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]"
    ></div>

    <div class="relative flex flex-col items-center text-center">
      <h1
        class="font-display text-6xl font-extrabold uppercase leading-none tracking-tight text-white sm:text-8xl"
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :enter="{ opacity: 1, y: 0 }"
        :duration="900"
      >
        {{ title }}
      </h1>
      <div
        class="mt-5 h-1 w-24 rounded-full bg-accent"
        v-motion
        :initial="{ opacity: 0, scaleX: 0 }"
        :enter="{ opacity: 1, scaleX: 1 }"
        :delay="400"
        :duration="800"
      ></div>
      <h3
        class="mt-6 max-w-2xl text-lg font-medium text-slate-300 sm:text-2xl"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0 }"
        :delay="500"
        :duration="800"
      >
        {{ subtitle }}
      </h3>
    </div>

    <ScrollDown class="absolute bottom-6 left-1/2 -translate-x-1/2" />
  </section>
</template>
