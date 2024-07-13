<script setup>
import Cover from "@/components/Cover.vue";
import ProjectCard from "@/components/ProjectCard.vue";
import worksData from "@/projects.json";

import { ref, onMounted } from "vue";

const programArray = ref([]);
const creativeArray = ref([]);

onMounted(() => {
  programArray.value = worksData.projects.programming.map((program) => {
    return program;
  });
  creativeArray.value = worksData.projects.creative.map((art) => {
    return art;
  });
});
</script>

<template>
  <Cover
    title="Works"
    subtitle="Web Development & Multimedia Arts"
    alignment="center"
  />
  <section class="min-h-[100vh] bg-[#1a1a1a]" id="next-section">
    <div class="container mx-auto p-5">
      <!-- Web Development Sections -->
      <div class="flex flex-col justify-center items-center">
        <h1
          class="font-monoton sm:text-7xl text-3xl text-white uppercase"
          v-motion
          :initial="{ opacity: 0, x: 0, scale: 0 }"
          :visible-once="{ opacity: 1, x: 0, scale: 1 }"
          :delay="200"
          :duration="1200"
        >
          Web Development
        </h1>
        <div
          class="bg-[#009efa] w-[120px] sm:w-[500px] sm:h-[5px] h-[5px] mb-5"
          v-motion
          :initial="{ opacity: 0, x: 100, scale: 1 }"
          :visible-once="{ opacity: 1, x: 0, scale: 1 }"
          :delay="200"
          :duration="1200"
        ></div>
      </div>
      <div class="grid sm:grid-cols-3 gap-2 mb-5">
        <ProjectCard
          v-for="(program, index) in programArray"
          :key="program.id"
          :project="program"
          v-motion
          :initial="{ opacity: 0, y: 0, scale: 0 }"
          :visible-once="{ opacity: 1, y: 0, scale: 1 }"
          :delay="200 + index * 200"
          :duration="1200"
        />
      </div>
      <!-- Creative Section -->
      <div class="flex flex-col justify-center items-center">
        <h1
          class="font-monoton sm:text-7xl text-3xl text-white uppercase"
          v-motion
          :initial="{ opacity: 0, x: 0, scale: 0 }"
          :visible-once="{ opacity: 1, x: 0, scale: 1 }"
          :delay="200"
          :duration="1200"
        >
          Creative
        </h1>
        <div
          class="bg-[#009efa] w-[120px] sm:w-[500px] sm:h-[5px] h-[5px] mb-5"
          v-motion
          :initial="{ opacity: 0, x: 100, scale: 1 }"
          :visible-once="{ opacity: 1, x: 0, scale: 1 }"
          :delay="200"
          :duration="1200"
        ></div>
      </div>
      <div class="grid sm:grid-cols-3 gap-2 mb-5">
        <ProjectCard
          v-for="(art, index) in creativeArray"
          :key="art.id"
          :project="art"
          v-motion
          :initial="{ opacity: 0, y: 0, scale: 0 }"
          :visible-once="{ opacity: 1, y: 0, scale: 1 }"
          :delay="200 + index * 200"
          :duration="1200"
        />
      </div>
    </div>
  </section>
</template>
