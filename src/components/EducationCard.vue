<script setup>
import { defineProps } from "vue";

defineProps({
  edu: Object,
});
</script>

<template>
  <div
    class="glass flex items-center gap-5 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
  >
    <div
      class="hidden h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white sm:block"
    >
      <img
        :src="edu.logo"
        :alt="`${edu.institute} logo`"
        class="h-full w-full object-contain p-1"
      />
    </div>
    <div class="min-w-0">
      <h3 class="font-display text-lg font-bold text-white">
        {{ edu.course }}
      </h3>
      <p class="mt-1 font-medium text-accent">{{ edu.institute }}</p>
      <p class="text-sm text-slate-400">{{ edu.location }}</p>
      <p class="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
        {{ edu.date }}
      </p>
    </div>
  </div>
</template>
