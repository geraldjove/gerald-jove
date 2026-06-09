<script setup>
import { defineProps } from "vue";

defineProps({
  image: String,
  title: String,
  link: String,
});
</script>

<template>
  <a :href="link" target="_blank" rel="noopener" class="group block">
    <div
      class="glass flex h-full flex-col items-center gap-4 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
    >
      <div
        class="grid h-20 w-20 place-items-center overflow-hidden rounded-2xl bg-white p-3"
      >
        <img :src="image" :alt="`${title} logo`" class="max-h-full max-w-full object-contain" />
      </div>
      <h3 class="font-display text-lg font-bold text-white">{{ title }}</h3>
      <span
        class="mt-auto inline-flex items-center gap-1 text-sm font-medium text-accent"
      >
        Visit <i class="pi pi-arrow-up-right text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></i>
      </span>
    </div>
  </a>
</template>
