<script setup>
import { ref, onMounted } from "vue";
import skillsData from "@/skills.json";

const programArray = ref([]);
const creativeArray = ref([]);

onMounted(() => {
  programArray.value = skillsData.skills.programming.map(
    (programmingSkill) => programmingSkill
  );
  creativeArray.value = skillsData.skills.creative.map(
    (creativeSkill) => creativeSkill
  );
});

const scrollUpBtn = (section) => {
  const scrollContainer = document.getElementById(section);
  if (scrollContainer) {
    scrollContainer.scrollBy({
      top: -100,
      behavior: "smooth",
    });
  }
};
const scrollDownBtn = (section) => {
  const scrollContainer = document.getElementById(section);
  if (scrollContainer) {
    scrollContainer.scrollBy({
      top: 100,
      behavior: "smooth",
    });
  }
};
</script>

<template>
  <section
    class="min-h-[100vh] min-w-[100%] bg-[#1a1a1a] overflow-hidden"
    id="skills"
  >
    <div
      class="sm:min-h-screen max-w-screen-xl mx-auto text-white flex flex-col justify-center p-4"
    >
      <div>
        <h1
          class="font-monoton sm:text-9xl text-5xl flex flex-col items-end"
          v-motion
          :initial="{ opacity: 0, x: 100, scale: 1 }"
          :visible-once="{ opacity: 1, x: 0, scale: 1 }"
          :delay="100"
          :duration="1200"
        >
          Skills
          <div
            class="bg-[#009efa] w-[120px] sm:w-[300px] sm:h-[10px] h-[5px] mb-5"
            v-motion
            :initial="{ opacity: 0, x: 100, scale: 1 }"
            :visible-once="{ opacity: 1, x: 0, scale: 1 }"
            :delay="200"
            :duration="1200"
          ></div>
        </h1>
      </div>
      <div class="grid sm:grid-cols-2 gap-4 rounded-lg">
        <div class="sm:max-h-[500px] rounded-lg p-4 my-auto">
          <div class="mb-5">
            <h1
              class="font-bold mb-3"
              v-motion
              :initial="{ opacity: 0, x: -100, scale: 1 }"
              :visible-once="{ opacity: 1, x: 0, scale: 1 }"
              :delay="300"
              :duration="1200"
            >
              <span class="bg-[#009efa] px-5 py-1">// Web Development</span>
            </h1>
            <p
              v-motion
              :initial="{ opacity: 0, x: -100, scale: 1 }"
              :visible-once="{ opacity: 1, x: 0, scale: 1 }"
              :delay="400"
              :duration="1200"
            >
              I am a skilled Full-stack Web Developer with expertise in HTML5,
              CSS, JavaScript, Node.js, React, PHP, MySQL, Python, and more. I
              have completed a Vocational Course in Full Stack Web Development
              at Zuitt Coding Bootcamp and have experience in API integration,
              REST API, and various web development frameworks and tools. My
              technical proficiency and diverse skill set make me a valuable
              asset in the field of web development.
            </p>
          </div>
          <div class="mb-5">
            <h1
              class="font-bold mb-3"
              v-motion
              :initial="{ opacity: 0, x: -100, scale: 1 }"
              :visible-once="{ opacity: 1, x: 0, scale: 1 }"
              :delay="500"
              :duration="1200"
            >
              <span class="bg-[#009efa] px-5 py-1">// Creative</span>
            </h1>
            <p
              v-motion
              :initial="{ opacity: 0, x: -100, scale: 1 }"
              :visible-once="{ opacity: 1, x: 0, scale: 1 }"
              :delay="600"
              :duration="1200"
            >
              As a Multimedia Artist and Digital Marketing Specialist, I
              specialize in creating visually stunning 3D models and animations.
              My freelance work includes developing bespoke 3D assets, managing
              social media content, and implementing SEO strategies to boost
              online visibility. At SM Ltd., I generated captivating 3D models
              and animations that drove sales and increased brand visibility,
              while my role at Versalife Innovations involved crafting
              innovative graphic design concepts and motion graphics for social
              media campaigns, significantly enhancing engagement and brand
              recognition.
            </p>
          </div>
        </div>
        <div class="min-h-[500px] rounded-lg">
          <section class="grid sm:grid-cols-2 gap-4">
            <div
              class="border border-[#009efa] rounded-xl flex flex-col items-center p-5"
              v-motion
              :initial="{ opacity: 0, y: 100, scale: 1 }"
              :visible-once="{ opacity: 1, y: 0, scale: 1 }"
              :delay="600"
              :duration="1200"
            >
              <h1 class="font-black uppercase text-center text-[#009efa] my-5">
                Web Development
              </h1>
              <button @click="scrollUpBtn('programming')">
                <i class="text-3xl pi pi-arrow-circle-up mb-5"></i>
              </button>

              <div
                class="max-h-[450px] overflow-auto remove-scrollbar text-center"
                id="programming"
              >
                <div v-for="program in programArray.sort()" :key="program.id">
                  <h3 class="my-10 text-3xl">{{ program }}</h3>
                  <hr width="100px" class="mx-auto" />
                </div>
              </div>
              <button @click="scrollDownBtn('programming')">
                <i class="text-3xl pi pi-arrow-circle-down mt-5"></i>
              </button>
            </div>

            <div
              class="border border-[#009efa] rounded-xl flex flex-col items-center p-5"
              v-motion
              :initial="{ opacity: 0, y: 100, scale: 1 }"
              :visible-once="{ opacity: 1, y: 0, scale: 1 }"
              :delay="800"
              :duration="1200"
            >
              <h1 class="font-black uppercase text-center text-[#009efa] my-5">
                Creative
              </h1>
              <button @click="scrollUpBtn('creative')">
                <i class="text-3xl pi pi-arrow-circle-up mb-5"></i>
              </button>
              <div
                class="max-h-[450px] overflow-auto remove-scrollbar text-center"
                id="creative"
              >
                <div
                  v-for="creative in creativeArray.sort()"
                  :key="creative.id"
                  class=""
                >
                  <h3 class="my-10 text-3xl">{{ creative }}</h3>
                  <hr width="100px" class="mx-auto" />
                </div>
              </div>
              <button @click="scrollDownBtn('creative')">
                <i class="text-3xl pi pi-arrow-circle-down mt-5"></i>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>
