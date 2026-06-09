<script setup>
import Cover from "@/components/Cover.vue";
import ProjectCard from "@/components/ProjectCard.vue";
import PortfolioLinkCard from "@/components/PortfolioLinkCard.vue";
import CreativeCard from "@/components/CreativeCard.vue";
import worksData from "@/projects.json";
import gDrive from "@/assets/img/g-drive.jpg";

import { ref, onMounted } from "vue";

const programArray = ref([]);
const creativeArray = ref([]);

onMounted(() => {
  programArray.value = worksData.projects.programming;
  creativeArray.value = worksData.projects.creative;
});

const portfolioLinks = [
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxdlKpU7l3bZcJvxXBChhxKebZGu3Q_TusVA&s",
    title: "ArtStation",
    link: "https://www.artstation.com/geraldjove",
  },
  {
    image:
      "https://1000logos.net/wp-content/uploads/2020/11/Behance-Logo-2005-500x213.jpg",
    title: "Behance",
    link: "https://www.behance.net/gkbjove",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHyWp6EGwy3_zRBG283TbBSyPeU4byviEejA&s",
    title: "GitHub",
    link: "https://github.com/geraldjove",
  },
  {
    image: gDrive,
    title: "Google Drive",
    link: "https://drive.google.com/drive/folders/1mbLQnjr1s5Rlz8P0uOk0NkL-9cye9a_H?usp=drive_link",
  },
];
</script>

<template>
  <Cover title="Works" subtitle="Web Development & Multimedia Arts" />

  <section class="bg-ink-900 py-24" id="next-section">
    <div class="mx-auto max-w-screen-xl px-6">
      <!-- Portfolio platforms -->
      <div
        class="mb-20 grid grid-cols-2 gap-4 sm:grid-cols-4"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0 }"
        :duration="800"
      >
        <PortfolioLinkCard
          v-for="link in portfolioLinks"
          :key="link.title"
          :image="link.image"
          :title="link.title"
          :link="link.link"
        />
      </div>

      <!-- Web Development -->
      <div
        class="mb-12 flex flex-col items-center text-center"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0 }"
        :duration="800"
      >
        <span class="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Code
        </span>
        <h2 class="font-display text-4xl font-extrabold text-white sm:text-5xl">
          Web <span class="text-gradient">Development</span>
        </h2>
        <div class="mt-4 h-1 w-20 rounded-full bg-accent"></div>
      </div>
      <div class="mb-24 grid grid-cols-1 gap-6 md:grid-cols-3">
        <ProjectCard
          v-for="(program, index) in programArray"
          :key="program.id"
          :project="program"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible-once="{ opacity: 1, y: 0 }"
          :delay="index * 120"
          :duration="800"
        />
      </div>

      <!-- Creative -->
      <div
        class="mb-12 flex flex-col items-center text-center"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0 }"
        :duration="800"
      >
        <span class="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Art
        </span>
        <h2 class="font-display text-4xl font-extrabold text-white sm:text-5xl">
          <span class="text-gradient">Creative</span>
        </h2>
        <div class="mt-4 h-1 w-20 rounded-full bg-accent"></div>
      </div>
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <CreativeCard
          v-for="art in creativeArray"
          :key="art.id"
          :project="art"
        />
      </div>
    </div>
  </section>
</template>
