<script setup>
import { defineProps } from "vue";
defineProps({
  project: Object,
});
</script>

<template>
  <div
    class="min-h-[300px] max-h-[300px] max-w-[300px] rounded-lg overflow-hidden"
  >
    <a :href="project.link" target="_blank"
      ><img :src="project.img" class="rounded-t-xl w-full sm:scale-100"
    /></a>
  </div>
</template>
