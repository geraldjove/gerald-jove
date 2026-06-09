<script setup>
import Cover from "@/components/Cover.vue";
import profilePhoto from "@/assets/img/profile-photo.jpg";
import ExperienceCard from "@/components/ExperienceCard.vue";
import EducationCard from "@/components/EducationCard.vue";
import experienceData from "@/experiences.json";
import educationData from "@/education.json";
import skillsData from "@/skills.json";
import { ref, onMounted } from "vue";

const workArray = ref([]);
const educationArray = ref([]);
const programArray = ref([]);
const creativeArray = ref([]);

onMounted(() => {
  workArray.value = experienceData.experiences;
  educationArray.value = educationData.education;
  programArray.value = [...skillsData.skills.programming].sort();
  creativeArray.value = [...skillsData.skills.creative].sort();
});
</script>

<template>
  <Cover title="About" subtitle="Gerald Jove — Web Developer & Multimedia Artist" />

  <!-- Summary -->
  <section class="bg-ink-900 py-24" id="next-section">
    <div class="mx-auto max-w-screen-xl px-6">
      <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-5">
        <div
          class="lg:col-span-2"
          v-motion
          :initial="{ opacity: 0, x: -40 }"
          :visible-once="{ opacity: 1, x: 0 }"
          :duration="900"
        >
          <div class="relative mx-auto max-w-sm">
            <div class="absolute -inset-3 rounded-3xl border border-accent/20"></div>
            <img
              :src="profilePhoto"
              alt="Portrait of Gerald Jove"
              class="img-ring relative rounded-3xl object-cover"
            />
          </div>
        </div>
        <div
          class="lg:col-span-3"
          v-motion
          :initial="{ opacity: 0, x: 40 }"
          :visible-once="{ opacity: 1, x: 0 }"
          :duration="900"
        >
          <span class="mb-3 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Summary
          </span>
          <h2 class="mb-5 font-display text-4xl font-extrabold text-white sm:text-5xl">
            Hi, I'm <span class="text-gradient">Gerald</span>
          </h2>
          <p class="text-lg leading-relaxed text-slate-400">
            Dedicated Full-stack Web Developer with expertise in multimedia arts
            and digital marketing. Proficient in HTML5, CSS3, JavaScript,
            React.js, Node.js, PHP, and MySQL, and skilled in creating visually
            stunning 3D models and animations. I'm always seeking opportunities
            to contribute my expertise and creativity to dynamic projects.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Experience -->
  <section class="bg-grid bg-ink-950 py-24">
    <div class="mx-auto max-w-screen-xl px-6">
      <div
        class="mb-12 flex flex-col items-start"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0 }"
        :duration="800"
      >
        <span class="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Career
        </span>
        <h2 class="font-display text-4xl font-extrabold text-white sm:text-5xl">
          Work <span class="text-gradient">Experience</span>
        </h2>
        <div class="mt-4 h-1 w-20 rounded-full bg-accent"></div>
      </div>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <ExperienceCard
          v-for="(exp, index) in workArray"
          :key="exp.id"
          :exp="exp"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible-once="{ opacity: 1, y: 0 }"
          :delay="index * 150"
          :duration="800"
        />
      </div>
    </div>
  </section>

  <!-- Education -->
  <section class="bg-ink-900 py-24">
    <div class="mx-auto max-w-screen-xl px-6">
      <div
        class="mb-12 flex flex-col items-end text-right"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0 }"
        :duration="800"
      >
        <span class="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Background
        </span>
        <h2 class="font-display text-4xl font-extrabold text-white sm:text-5xl">
          <span class="text-gradient">Education</span>
        </h2>
        <div class="mt-4 h-1 w-20 rounded-full bg-accent"></div>
      </div>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <EducationCard
          v-for="(edu, index) in educationArray"
          :key="edu.id"
          :edu="edu"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible-once="{ opacity: 1, y: 0 }"
          :delay="index * 120"
          :duration="800"
        />
      </div>
    </div>
  </section>

  <!-- Skills -->
  <section class="bg-grid bg-ink-950 py-24">
    <div class="mx-auto max-w-screen-xl px-6">
      <div
        class="mb-12 flex flex-col items-center text-center"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0 }"
        :duration="800"
      >
        <span class="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Toolbox
        </span>
        <h2 class="font-display text-4xl font-extrabold text-white sm:text-5xl">
          My <span class="text-gradient">Skills</span>
        </h2>
        <div class="mt-4 h-1 w-20 rounded-full bg-accent"></div>
      </div>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div class="glass rounded-2xl p-8">
          <div class="mb-5 flex items-center gap-3">
            <span class="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent">
              <i class="pi pi-code text-xl"></i>
            </span>
            <h3 class="font-display text-xl font-bold text-white">Web Development</h3>
          </div>
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
        <div class="glass rounded-2xl p-8">
          <div class="mb-5 flex items-center gap-3">
            <span class="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent">
              <i class="pi pi-palette text-xl"></i>
            </span>
            <h3 class="font-display text-xl font-bold text-white">Creative</h3>
          </div>
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
