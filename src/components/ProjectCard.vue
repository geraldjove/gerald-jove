<script setup>
import { ref, defineProps, computed } from "vue";

const showFullDescription = ref(false);

const props = defineProps({
  project: Object,
});

const truncatedDescription = computed(() => {
  const description = props.project.description || "";
  if (!showFullDescription.value && description.length > 90) {
    return description.substring(0, 90) + "...";
  }
  return description;
});

const isLong = computed(() => (props.project.description || "").length > 90);

const toggleShowFullDescription = () => {
  showFullDescription.value = !showFullDescription.value;
};
</script>

<template>
  <div
    class="glass group flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
  >
    <div class="h-48 overflow-hidden">
      <img
        :src="project.img"
        :alt="project.title"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div class="flex flex-grow flex-col p-6">
      <h3 class="font-display text-lg font-bold text-white">
        {{ project.title }}
      </h3>
      <div class="my-3 h-px w-full bg-white/10"></div>
      <p class="text-sm leading-relaxed text-slate-400">
        {{ truncatedDescription }}
        <button
          v-if="isLong"
          @click="toggleShowFullDescription"
          class="font-medium text-accent hover:underline"
        >
          {{ showFullDescription ? "Show Less" : "Show More" }}
        </button>
      </p>

      <!-- Buttons -->
      <div class="mt-6 flex gap-3" v-if="project.hasCode">
        <a :href="project.code" target="_blank" rel="noopener" class="flex-1">
          <button
            class="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:border-accent/60 hover:text-accent"
          >
            <i class="pi pi-github"></i> Code
          </button>
        </a>
        <a :href="project.live" target="_blank" rel="noopener" class="flex-1">
          <button
            class="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-ink-900 transition-colors duration-200 hover:bg-accent-light"
          >
            <i class="pi pi-external-link"></i> Live
          </button>
        </a>
      </div>
      <div class="mt-6" v-else>
        <a :href="project.link" target="_blank" rel="noopener">
          <button
            class="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-ink-900 transition-colors duration-200 hover:bg-accent-light"
          >
            <i class="pi pi-external-link"></i> View Project
          </button>
        </a>
      </div>
    </div>
  </div>
</template>
