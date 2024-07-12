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

const scrollUp = () => {};
</script>

<template>
  <section class="min-h-[100vh] bg-[#1a1a1a]" id="skills">
    <div
      class="sm:min-h-screen max-w-screen-xl mx-auto text-white flex flex-col justify-center p-4"
    >
      <div>
        <h1 class="font-monoton sm:text-9xl text-5xl flex flex-col items-end">
          Skills
          <div
            class="bg-[#009efa] w-[120px] sm:w-[300px] sm:h-[10px] h-[5px] mb-5"
          ></div>
        </h1>
      </div>
      <div class="grid sm:grid-cols-2 gap-4 rounded-lg">
        <div class="max-h-[500px] rounded-lg p-4 flex flex-col justify-center">
          <div class="mb-5">
            <h1 class="font-bold mb-3">
              <span class="bg-[#009efa] px-5 py-1">// Programming</span>
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
              veniam fuga minima maiores ea neque possimus, ex deleniti eaque at
              vitae soluta illo facilis aliquid, dolores esse amet quia ab?
            </p>
          </div>
          <div class="mb-5">
            <h1 class="font-bold mb-3">
              <span class="bg-[#009efa] px-5 py-1">// Creative</span>
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
              veniam fuga minima maiores ea neque possimus, ex deleniti eaque at
              vitae soluta illo facilis aliquid, dolores esse amet quia ab?
            </p>
          </div>
        </div>
        <div class="min-h-[500px] rounded-lg">
          <section class="grid sm:grid-cols-2 gap-4">
            <div
              class="border border-[#009efa] rounded-xl flex flex-col items-center p-5"
            >
              <h1 class="font-black uppercase text-center text-[#009efa] my-5">
                Web Development
              </h1>
              <i class="text-3xl pi pi-arrow-circle-up mb-5"></i>
              <div
                class="max-h-[450px] overflow-auto remove-scrollbar text-center"
              >
                <div v-for="program in programArray.sort()" :key="program.id">
                  <h3 class="my-10 text-3xl">{{ program }}</h3>
                  <hr width="100px" class="mx-auto" />
                </div>
              </div>
              <i class="text-3xl pi pi-arrow-circle-down mt-5"></i>
            </div>

            <div
              class="border border-[#009efa] rounded-xl flex flex-col items-center p-5"
            >
              <h1 class="font-black uppercase text-center text-[#009efa] my-5">
                Creative
              </h1>
              <i class="text-3xl pi pi-arrow-circle-up mb-5"></i>
              <div
                class="max-h-[450px] overflow-auto remove-scrollbar text-center"
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
              <i class="text-3xl pi pi-arrow-circle-down mt-5"></i>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>
