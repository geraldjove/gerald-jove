<script setup>
import Cover from "@/components/Cover.vue";
import ProjectCard from "@/components/ProjectCard.vue";
import PortfolioLinkCard from "@/components/PortfolioLinkCard.vue";
import CreativeCard from "@/components/CreativeCard.vue";
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
      <div class="grid sm:grid-cols-3 gap-4 mb-10">
        <PortfolioLinkCard
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxdlKpU7l3bZcJvxXBChhxKebZGu3Q_TusVA&s"
          title="ArtStation"
          link="https://www.artstation.com/geraldjove"
        />
        <PortfolioLinkCard
          image="https://1000logos.net/wp-content/uploads/2020/11/Behance-Logo-2005-500x213.jpg"
          title="Behance"
          link="https://www.behance.net/gkbjove"
        />
        <PortfolioLinkCard
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHyWp6EGwy3_zRBG283TbBSyPeU4byviEejA&s"
          title="GitHub"
          link="https://github.com/geraldjove"
        />
      </div>
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
          class="bg-[#009efa] w-[120px] sm:w-[500px] sm:h-[5px] h-[5px] mb-10"
          v-motion
          :initial="{ opacity: 0, x: 100, scale: 1 }"
          :visible-once="{ opacity: 1, x: 0, scale: 1 }"
          :delay="200"
          :duration="1200"
        ></div>
      </div>
      <div class="grid sm:grid-cols-3 gap-2 mb-20">
        <ProjectCard
          v-for="program in programArray"
          :key="program.id"
          :project="program"
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
          class="bg-[#009efa] w-[120px] sm:w-[500px] sm:h-[5px] h-[5px] mb-10"
          v-motion
          :initial="{ opacity: 0, x: 100, scale: 1 }"
          :visible-once="{ opacity: 1, x: 0, scale: 1 }"
          :delay="200"
          :duration="1200"
        ></div>
      </div>

      <div class="grid sm:grid-cols-5 justify-items-center gap-1 mb-20`,">
        <CreativeCard
          v-for="(art, index) in creativeArray"
          :key="index"
          :project="art"
        />
      </div>
    </div>
  </section>
</template>
