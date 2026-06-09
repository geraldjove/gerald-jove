<script setup>
import { defineProps } from "vue";
defineProps({
  project: Object,
});
</script>

<template>
  <a
    :href="project.link"
    target="_blank"
    rel="noopener"
    class="group relative block aspect-square overflow-hidden rounded-xl border border-white/10"
  >
    <img
      :src="project.img"
      :alt="project.title || 'Creative artwork by Gerald Jove'"
      loading="lazy"
      class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
    <div
      class="absolute inset-0 flex items-end bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    >
      <span
        class="flex w-full items-center justify-between p-3 text-sm font-medium text-white"
      >
        {{ project.title || "View Artwork" }}
        <i class="pi pi-arrow-up-right"></i>
      </span>
    </div>
  </a>
</template>
