<script setup>
import { ref, onMounted } from "vue";
import skillsData from "@/skills.json";

const programArray = ref([]);
const creativeArray = ref([]);

onMounted(() => {
  programArray.value = [...skillsData.skills.programming].sort();
  creativeArray.value = [...skillsData.skills.creative].sort();
});
</script>

<template>
  <section
    class="bg-grid relative overflow-hidden bg-ink-950 py-24"
    id="skills"
  >
    <div class="mx-auto max-w-screen-xl px-6">
      <!-- Header -->
      <div
        class="mb-14 flex flex-col items-center text-center"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0 }"
        :duration="800"
      >
        <span class="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          What I Use
        </span>
        <h2 class="font-display text-4xl font-extrabold text-white sm:text-5xl">
          My <span class="text-gradient">Skills</span>
        </h2>
        <div class="mt-4 h-1 w-20 rounded-full bg-accent"></div>
      </div>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <!-- Web Development -->
        <div
          class="glass rounded-2xl p-8"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible-once="{ opacity: 1, y: 0 }"
          :duration="800"
        >
          <div class="mb-4 flex items-center gap-3">
            <span class="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent">
              <i class="pi pi-code text-xl"></i>
            </span>
            <h3 class="font-display text-xl font-bold text-white">
              Web Development
            </h3>
          </div>
          <p class="mb-6 text-sm leading-relaxed text-slate-400">
            Full-stack web developer skilled in HTML5, CSS, JavaScript, Node.js,
            React, PHP, MySQL, Python, and more — with experience in API
            integration, REST APIs, and modern frameworks.
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="program in programArray"
              :key="program"
              class="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200 transition-colors duration-200 hover:border-accent/50 hover:text-accent"
            >
              {{ program }}
            </span>
          </div>
        </div>

        <!-- Creative -->
        <div
          class="glass rounded-2xl p-8"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible-once="{ opacity: 1, y: 0 }"
          :delay="150"
          :duration="800"
        >
          <div class="mb-4 flex items-center gap-3">
            <span class="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent">
              <i class="pi pi-palette text-xl"></i>
            </span>
            <h3 class="font-display text-xl font-bold text-white">Creative</h3>
          </div>
          <p class="mb-6 text-sm leading-relaxed text-slate-400">
            Multimedia artist and digital marketing specialist creating visually
            stunning 3D models and animations, motion graphics, and graphic
            design that drive engagement and brand recognition.
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="creative in creativeArray"
              :key="creative"
              class="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200 transition-colors duration-200 hover:border-accent/50 hover:text-accent"
            >
              {{ creative }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
