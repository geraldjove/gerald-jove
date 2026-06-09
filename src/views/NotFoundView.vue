<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <section
    class="bg-grid relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink-950 px-6 text-center"
  >
    <div
      class="pointer-events-none absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]"
    ></div>

    <h1
      class="relative font-display text-[8rem] font-extrabold leading-none text-white sm:text-[12rem]"
      v-motion
      :initial="{ opacity: 0, scale: 0.8 }"
      :enter="{ opacity: 1, scale: 1 }"
      :duration="900"
    >
      4<span class="text-gradient">0</span>4
    </h1>
    <h2 class="relative mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
      Page Not Found
    </h2>
    <p class="relative mt-3 max-w-md text-slate-400">
      The page you're looking for doesn't exist or may have been moved.
    </p>
    <RouterLink to="/" class="relative mt-8">
      <button
        class="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-bold text-ink-900 transition-all duration-200 hover:bg-accent-light hover:shadow-[0_0_40px_-8px_rgba(0,158,250,0.8)]"
      >
        <i class="pi pi-home"></i> Back to Home
      </button>
    </RouterLink>
  </section>
</template>
