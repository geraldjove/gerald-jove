<script setup>
import Cover from "@/components/Cover.vue";
import profilePhoto from "@/assets/img/profile-photo.jpg";
import ExperienceCard from "@/components/ExperienceCard.vue";
import EducationCard from "@/components/EducationCard.vue";
import experienceData from "@/experiences.json";
import educationData from "@/education.json";
import skillsData from "@/skills.json";
import { defineProps, ref, onMounted } from "vue";

const workArray = ref([]);
const educationArray = ref([]);
const programArray = ref([]);
const creativeArray = ref([]);

onMounted(() => {
  workArray.value = experienceData.experiences.map((exp) => {
    return {
      id: exp.id,
      title: exp.title,
      company: exp.company,
      location: exp.location,
      date: exp.date,
      responsibilities: exp.responsibilities,
    };
  });

  educationArray.value = educationData.education.map((edu) => {
    return {
      id: edu.id,
      course: edu.course,
      institute: edu.institute,
      location: edu.location,
      date: edu.date,
      logo: edu.logo,
    };
  });

  programArray.value = skillsData.skills.programming.map(
    (programmingSkill) => programmingSkill
  );

  creativeArray.value = skillsData.skills.creative.map(
    (creativeSkill) => creativeSkill
  );
});
</script>

<template>
  <Cover title="About Me" subtitle="Gerald Jove" alignment="center" />
  <section
    class="overflow-hidden max-h-[100vh] bg-[#1a1a1a] p-5"
    id="next-section"
  >
    <div
      class="container mx-auto min-h-[100vh] flex justify-center items-center"
    >
      <div class="grid sm:grid-cols-2">
        <div
          v-motion
          :initial="{ opacity: 0, x: 0, scale: 0 }"
          :visible-once="{ opacity: 1, x: 0, scale: 1 }"
          :delay="100"
          :duration="1200"
        >
          <img :src="profilePhoto" alt="profile-photo" class="rounded-xl" />
        </div>
        <div class="min-h-[100px] my-auto p-5">
          <div class="flex flex-col justify-center items-start text-white">
            <h1
              v-motion
              :initial="{ opacity: 0, x: 0, scale: 0 }"
              :visible-once="{ opacity: 1, x: 0, scale: 1 }"
              :delay="200"
              :duration="1200"
              class="font-monoton sm:text-[5rem] text-[2rem] leading-none text-white"
            >
              Gerald Jove
            </h1>

            <h3
              v-motion
              :initial="{ opacity: 0, x: 0, scale: 0 }"
              :visible-once="{ opacity: 1, x: 0, scale: 1 }"
              :delay="200"
              :duration="1200"
              class="font-bold sm:text-[2rem] leading-none mb-2 italic text-[#009efa]"
            >
              Summary
            </h3>
            <p
              v-motion
              :initial="{ opacity: 0, x: 0, scale: 1 }"
              :visible-once="{ opacity: 1, x: 0, scale: 1 }"
              :delay="800"
              :duration="1200"
            >
              Dedicated Full-stack Web Developer with expertise in multimedia
              arts and digital marketing. Proficient in HTML5, CSS3, JavaScript,
              React.js, Node.js, PHP, and MySQL. Skilled in creating visually
              stunning 3D models and animations. Seeking opportunities to
              contribute expertise and creativity to dynamic projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="overflow-hidden max-h-[100%] bg-[#1a1a1a] p-5">
    <div
      class="container mx-auto min-h-[100vh] flex flex-col justify-center text-white"
    >
      <div class="flex flex-col items-start">
        <h1
          v-motion
          :initial="{ opacity: 0, x: 0, scale: 0 }"
          :visible-once="{ opacity: 1, x: 0, scale: 1 }"
          :delay="200"
          :duration="1200"
          class="sm:text-[5rem] text-[2rem] font-monoton"
        >
          Work Experience
        </h1>
        <div
          class="bg-[#009efa] w-[120px] sm:w-[300px] sm:h-[10px] h-[5px] mb-5"
          v-motion
          :initial="{ opacity: 0, x: 100, scale: 1 }"
          :visible-once="{ opacity: 1, x: 0, scale: 1 }"
          :delay="200"
          :duration="1200"
        ></div>
      </div>
      <div class="grid sm:grid-cols-3 gap-4">
        <!-- Exprience Card -->
        <ExperienceCard
          v-for="(exp, index) in workArray"
          :key="index"
          v-motion
          :initial="{ opacity: 0, y: 0, scale: 0 }"
          :visible-once="{ opacity: 1, y: 0, scale: 1 }"
          :delay="200 + index * 200"
          :duration="1200"
          :exp="exp"
        />
      </div>
    </div>
  </section>
  <section class="overflow-hidden max-h-[100%] bg-[#1a1a1a] p-5">
    <div
      class="container mx-auto min-h-[100vh] flex flex-col justify-center text-white"
    >
      <div class="flex flex-col items-center">
        <h1
          v-motion
          :initial="{ opacity: 0, x: 0, scale: 0 }"
          :visible-once="{ opacity: 1, x: 0, scale: 1 }"
          :delay="200"
          :duration="1200"
          class="sm:text-[5rem] text-[2rem] font-monoton"
        >
          Education
        </h1>
        <div
          class="bg-[#009efa] w-[120px] sm:w-[300px] sm:h-[10px] h-[5px] mb-5"
          v-motion
          :initial="{ opacity: 0, x: 100, scale: 1 }"
          :visible-once="{ opacity: 1, x: 0, scale: 1 }"
          :delay="200"
          :duration="1200"
        ></div>
      </div>

      <div class="grid sm:grid-cols-1 gap-4">
        <!-- Education Card -->
        <EducationCard
          v-for="(edu, index) in educationArray"
          :key="index"
          v-motion
          :initial="{ opacity: 0, x: 300, scale: 1 }"
          :visible-once="{ opacity: 1, x: 0, scale: 1 }"
          :delay="200 + index * 200"
          :duration="1200"
          :edu="edu"
        />
      </div>
    </div>
  </section>
  <section class="overflow-hidden max-h-[100%] bg-[#1a1a1a] p-5">
    <div
      class="container mx-auto min-h-[100vh] flex flex-col justify-center text-white"
    >
      <div class="flex flex-col items-end">
        <h1
          v-motion
          :initial="{ opacity: 0, x: 0, scale: 0 }"
          :visible-once="{ opacity: 1, x: 0, scale: 1 }"
          :delay="200"
          :duration="1200"
          class="sm:text-[5rem] text-[2rem] font-monoton"
        >
          Skills
        </h1>
        <div
          class="bg-[#009efa] w-[120px] sm:w-[300px] sm:h-[10px] h-[5px]"
          v-motion
          :initial="{ opacity: 0, x: 100, scale: 1 }"
          :visible-once="{ opacity: 1, x: 0, scale: 1 }"
          :delay="200"
          :duration="1200"
        ></div>
      </div>
      <div
        class="flex justify-center p-5 font-black uppercase text-[#009efa] sm:text-3xl"
      >
        <h1
          v-motion
          :initial="{ opacity: 0, x: 0, scale: 0 }"
          :visible-once="{ opacity: 1, x: 0, scale: 1 }"
          :delay="200"
          :duration="1200"
        >
          Web Development
        </h1>
      </div>
      <div class="grid sm:grid-cols-10 gap-4">
        <!-- Programming Card -->
        <div
          v-for="(program, index) in programArray.sort()"
          :key="program.id"
          v-motion
          :initial="{ opacity: 0, y: 0, scale: 0 }"
          :visible-once="{ opacity: 1, y: 0, scale: 1 }"
          :delay="200 + index * 200"
          :duration="1200"
          class="text-white font-bold uppercase border border-[#009efa] rounded-lg flex justify-center items-center min-h-[100px] p-5"
        >
          {{ program }}
        </div>
      </div>
      <div
        class="flex justify-center p-5 font-black uppercase text-[#009efa] sm:text-3xl"
      >
        <h1
          v-motion
          :initial="{ opacity: 0, x: 0, scale: 0 }"
          :visible-once="{ opacity: 1, x: 0, scale: 1 }"
          :delay="200"
          :duration="1200"
        >
          Creative
        </h1>
      </div>
      <div class="grid sm:grid-cols-10 gap-4">
        <!-- Creative Card -->
        <div
          v-for="(creative, index) in creativeArray.sort()"
          :key="creative.id"
          v-motion
          :initial="{ opacity: 0, y: 0, scale: 0 }"
          :visible-once="{ opacity: 1, y: 0, scale: 1 }"
          :delay="200 + index * 200"
          :duration="1200"
          class="text-white font-bold uppercase border border-[#009efa] rounded-lg flex justify-center items-center min-h-[100px] p-5"
        >
          {{ creative }}
        </div>
      </div>
    </div>
  </section>
</template>
