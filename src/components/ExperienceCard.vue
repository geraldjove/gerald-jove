<script setup>
import { defineProps } from "vue";

defineProps({
  exp: Object,
});
</script>

<template>
  <div
    class="glass group flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
  >
    <div class="mb-4 flex items-center justify-between">
      <span
        class="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 font-display font-bold text-accent"
      >
        {{ exp.id }}
      </span>
      <i class="pi pi-briefcase text-accent/60"></i>
    </div>
    <h3 class="font-display text-xl font-bold text-white">
      {{ exp.title }}
    </h3>
    <p class="mt-1 font-medium text-accent">{{ exp.company }}</p>
    <p class="text-sm text-slate-400">{{ exp.location }}</p>
    <p class="mb-4 mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
      {{ exp.date }}
    </p>
    <ul class="mt-auto space-y-2">
      <li
        v-for="(responsibility, i) in exp.responsibilities"
        :key="i"
        class="flex gap-2 text-sm leading-relaxed text-slate-400"
      >
        <i class="pi pi-check-circle mt-0.5 shrink-0 text-xs text-accent"></i>
        <span>{{ responsibility }}</span>
      </li>
    </ul>
  </div>
</template>
